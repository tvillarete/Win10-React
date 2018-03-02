import React, { Component } from 'react';
import Titlebar from './window/Titlebar';

class Window extends Component {
   constructor(props) {
      super(props);
      this.createWindow = this.createWindow.bind(this);
      this.setupTitlebar = this.setupTitlebar.bind(this);
      this.handleButtonClick = this.handleButtonClick.bind(this);
      this.hideLoadingScreen = this.hideLoadingScreen.bind(this);
      this.state = {loadingScreenShown: true}
   }

   handleButtonClick = button => {
      this.props.onButtonClick(button);
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

   hideLoadingScreen()  {
      let self = this;
      window.setTimeout(function() {
         console.log("HIDDEN");
         self.setState({loadingScreenShown: false});
      }, 500);
   }

   createWindow = () => {
      var content = this.props.content;
      if (content.hasLoadingScreen && this.state.loadingScreenShown) {
         this.hideLoadingScreen();
      }
      return (
         <div className={`${content.altClassName || 'app-window'}
          ${content.isMinimized ? 'minimized' : ''}
          ${content.isMaximized ? 'maximized' : ''}`}
          key={content.name}>
            {this.setupTitlebar(content)}
            <div className="window-contents">
               {content.html}
            </div>
         </div>
      );
   }

   render() {
      return (
         this.createWindow()
      );
   }
}

export default Window;
