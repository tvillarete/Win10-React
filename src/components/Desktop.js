import React, { Component } from 'react';
import Taskbar from './Taskbar';
import WindowManager from './WindowManager';
import SpotiFreeApp from './apps/SpotiFreeApp';
import SettingsApp from './apps/SettingsApp';
import StartMenuApp from './apps/StartMenuApp';

class Desktop extends Component {
   constructor(props) {
      super(props);
      this.setApplicationState = this.setApplicationState.bind(this);
      this.state = {
         apps: {
            'Start Menu': {
               name: 'Start Menu',
               isOpen: false,
               isMinimized: false,
               isMaximized: false,
               isInTaskbar: true,
               noMinimize: true,
               noWindowStyle: true,
               altClassName: 'start-menu',
               img: 'windows.png',
               html: <StartMenuApp />
            },
            SpotiFree: {
               name: 'SpotiFree',
               isOpen: false,
               isMinimized: false,
               isMaximized: false,
               isInTaskbar: true,
               img: 'spotifree.svg',
               html: <SpotiFreeApp />
            },
            Settings: {
               name: 'Settings',
               isOpen: false,
               isMinimized: false,
               isMaximized: false,
               isInTaskbar: true,
               img: 'settings.svg',
               invertIconColor: true,
               html: <SettingsApp />
            },
         }
      }
   }

   setApplicationState(options) {
      let app = options.name;
      this.setState((state, props) => {
         var isOpen = state.apps[app].isOpen;
         var isMinimized = state.apps[app].isMinimized;
         var isMaximized = state.apps[app].isMaximized;

         if (options.type === 'close') {
            state.apps[app].isOpen = false;
         } else if (options.type === 'minimize') {
            state.apps[app].isMinimized = true;
         } else if (options.type === 'maximize') {
            state.apps[app].isMaximized = !isMaximized;
         } else if (state.apps[app].noMinimize) {
            isOpen = !isOpen;
            state.apps[app].isOpen = isOpen;
         } else {
            isMinimized = isOpen && !isMinimized;
            isOpen = true;
            state.apps[app].isOpen = isOpen;
            state.apps[app].isMinimized = isMinimized;
         }
         return state;
      });
   }

   render() {
      return (
         <div id="desktop">
            <WindowManager callbackParent={this.setApplicationState}
             appStates={this.state.apps} />
            <Taskbar apps={this.state.apps} callbackParent={this.setApplicationState}/>
         </div>
      );
   }
}

export default Desktop;
