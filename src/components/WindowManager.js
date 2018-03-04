import React, { Component } from 'react';
import Window from './Window';

class WindowManager extends Component {
   constructor(props) {
      super(props);
      this.setupWindows = this.setupWindows.bind(this);
      this.handleButtonClick = this.handleButtonClick.bind(this);
      this.getWindowIndex = this.getWindowIndex.bind(this);
      this.isFocused = this.isFocused.bind(this);
   }

   handleButtonClick = button => {
      this.props.callbackParent(button);
   }

   handleWindowFocus = focusedWindow => {
      this.props.onWindowFocus(focusedWindow);
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
                zIndex={this.getWindowIndex(app)}
                isFocused={this.isFocused(app)}
                onWindowFocus={this.handleWindowFocus}
                onButtonClick={this.handleButtonClick}/>
            );
         }
      }
      return appWindows;
   }

   isFocused(app) {
      return this.props.activeApps[0] === app;
   }

   getWindowIndex(app) {
      if (app === 'Start Menu' || app === 'Cortana') {
         return 10;
      }
      const activeApps = this.props.activeApps;
      for (let i=0; i<activeApps.length; i++) {
         if (activeApps[i] === app)
            return activeApps.length-i;
      }
      return -1;
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
