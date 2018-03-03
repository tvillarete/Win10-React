import React, { Component } from 'react';
import Titlebar from './window/Titlebar';

class Window extends Component {
   constructor(props) {
      super(props);
      this.createWindow = this.createWindow.bind(this);
      this.setupTitlebar = this.setupTitlebar.bind(this);
      this.handleButtonClick = this.handleButtonClick.bind(this);
      this.hideLoadingScreen = this.hideLoadingScreen.bind(this);
      this.getWindowHtml = this.getWindowHtml.bind(this);
      this.state = {loadingScreenShown: true}
   }

   /* Used to propagate app button clicks to the overall "App State" manager
    * in Desktop.js. Can also be used by specific apps to change their local
    * state.
    */
   handleButtonClick = button => {
      this.props.onButtonClick(button);
   }

   /** Sets up the titlebar and HTML for the specific app being rendered.
    *  Also checks whether or not to delay showing the app until after the
    *  loading screen has been displayed (For a more realistic experience).
    */
   createWindow = () => {
      var content = this.props.content;
      if (content.hasLoadingScreen && this.state.loadingScreenShown) {
         this.hideLoadingScreen();
      }
      return (
         <div className={`${content.altClassName || 'app-window'}
            ${content.isMinimized ? ' minimized' : ''}
            ${content.isMaximized ? ' maximized' : ''}
            ${content.isClosing ? 'app-closing' : ''}`}
          id={content.id}
          key={content.name}>
            {this.setupTitlebar(content)}
            <div className="window-contents">
               {this.getWindowHtml(content)}
            </div>
         </div>
      );
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

   render() {
      return (
         this.createWindow()
      );
   }
}

export default Window;
