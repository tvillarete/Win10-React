import React, { Component } from 'react';
import Titlebar from './window/Titlebar';
import Draggable from 'react-draggable';

class Window extends Component {
   constructor(props) {
      super(props);
      this.createWindow = this.createWindow.bind(this);
      this.setupTitlebar = this.setupTitlebar.bind(this);
      this.handleButtonClick = this.handleButtonClick.bind(this);
      this.hideLoadingScreen = this.hideLoadingScreen.bind(this);
      this.getWindowHtml = this.getWindowHtml.bind(this);
      this.handleDrag = this.handleDrag.bind(this);
      this.handleDragStop = this.handleDragStop.bind(this);
      this.handleDragStart = this.handleDragStart.bind(this);
      this.state = {
         loadingScreenShown: true,
         isDragging: false,
      }
   }

   /* Used to propagate app button clicks to the overall "App State" manager
    * in Desktop.js. Can also be used by specific apps to change their local
    * state.
    */
   handleButtonClick = button => {
      this.props.onButtonClick(button);
   }

   handleDragStart() {
      this.props.onWindowFocus(this.props.content.name)
   }

   handleDrag() {
      this.props.onWindowFocus(this.props.content.name);
      this.props.onButtonClick({
         name: this.props.content.name,
         action: 'maximize',
         value: false
      })
      this.setState((state) => {
         state.isDragging = true;
         return state;
      });
   }

   handleDragStop() {
      this.setState((state) => {
         state.isDragging = false;
         return state;
      });
   }

   hideLoadingScreen()  {
      let self = this;
      window.setTimeout(function() {
         console.log("HIDDEN");
         self.setState({loadingScreenShown: false});
      }, 500);
   }

   setupTitlebar = content => {
      if (!content.noWindowStyle) {
         return (
            <Titlebar
             osType={this.props.osType}
             content={content}
             onButtonClick={this.handleButtonClick}/>
         );
      }
      return false;
   }

   getWindowHtml(content) {
      return React.cloneElement(
         content.html,
         {content: content},
      );
   }

   /** Sets up the titlebar and HTML for the specific app being rendered.
    *  Also checks whether or not to delay showing the app until after the
    *  loading screen has been displayed (For a more realistic experience).
    */
   createWindow = () => {
      var content = this.props.content;
      const zIndex = this.props.zIndex - 1;
      const defaultPosition = content.altClassName ? {x: 0, y: 0} :
       {x: zIndex * 10, y: zIndex * 10};

      if (content.hasLoadingScreen && this.state.loadingScreenShown) {
         this.hideLoadingScreen();
      }

      return (
         <Draggable
          handle=".titlebar"
          onStart={this.handleDragStart}
          onDrag={this.handleDrag}
          onStop={this.handleDragStop}
          defaultPosition={defaultPosition}>
            <div className={`
               ${content.altClassName || 'app-window'}
               ${this.props.osType}
               ${content.isMinimized ? ' minimized' : ''}
               ${content.isMaximized ? ' maximized' : ''}
               ${content.isClosing ? 'app-closing' : ''}
               ${this.props.isFocused ? 'focused' : ''}
               ${this.state.isDragging ? 'app-dragging' : ''}
             `}
             id={content.id}
             key={content.name}
             style={{zIndex: zIndex + 1}}>
               {this.setupTitlebar(content)}
               <div className="window-contents" onClick={this.handleDragStart}>
                  <div className="content-cover"></div>
                  {this.getWindowHtml(content)}
               </div>
            </div>
         </Draggable>
      );
   }

   render() {
      return (
         this.createWindow()
      );
   }
}

export default Window;
