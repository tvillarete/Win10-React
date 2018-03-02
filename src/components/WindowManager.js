import React, { Component } from 'react';
import Window from './Window';

class WindowManager extends Component {
   constructor(props) {
      super(props);
      this.setupWindows = this.setupWindows.bind(this);
      this.handleButtonClick = this.handleButtonClick.bind(this);
   }

   handleButtonClick = button => {
      this.props.callbackParent(button);
   }

   createWindow = content => {
      return (
         <div className={`${content.altClassName || 'app-window'}
          ${content.isMinimized ? 'minimized' : ''}
          ${content.isMaximized ? 'maximized' : ''}`}
          key={content.name}>
            {this.setupTitlebar(content)}
         </div>
      );
   }

   setupWindows() {
      var appWindows = [];
      const apps = this.props.appStates;

      for (let app in apps) {
         let content = apps[app];
         if (content.isOpen) {
            appWindows.push(
               <Window key={content.name}
                content={content}
                onButtonClick={this.handleButtonClick}/>
            );
         }
      }
      return appWindows;
   }

   render() {
      return (
         <div className="window-container">
            {this.setupWindows()}
         </div>
      );
   }
}

export default WindowManager;
