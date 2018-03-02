import React, { Component } from 'react';
import Titlebar from './window/Titlebar';

class WindowManager extends Component {
   constructor(props) {
      super(props);
      this.setupWindows = this.setupWindows.bind(this);
      this.createWindow = this.createWindow.bind(this);
      this.setupTitlebar = this.setupTitlebar.bind(this);
   }

   setupTitlebar = content => {
      if (!content.noWindowStyle) {
         return (
            <Titlebar title={content.name} />
         );
      }
      return false;
   }

   createWindow = content => {
      return (
         <div className={`${content.altClassName || 'app-window'}
          ${content.isMinimized ? 'minimized' : ''}`}
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
            appWindows.push(this.createWindow(content));
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
