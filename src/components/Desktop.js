import React, { Component } from 'react';
import Taskbar from './Taskbar';
import WindowManager from './WindowManager';

class Desktop extends Component {
   constructor(props) {
      super(props);
      this.setApplicationState = this.setApplicationState.bind(this);
      this.state = {
         apps: {
            SpotiFree: {
               name: 'SpotiFree',
               isOpen: false,
               isMinimized: false,
            },
            StartMenu: {
               name: 'Start Menu',
               isOpen: false,
               isMinimized: false,
               noMinimize: true,
               noWindowStyle: true,
               altClassName: 'start-menu',
            }
         }
      }
   }

   setApplicationState(app) {
      this.setState((state, props) => {
         var isOpen = state.apps[app].isOpen;
         var isMinimized = state.apps[app].isMinimized;

         if (state.apps[app].noMinimize) {
            isOpen = !isOpen;
         } else {
            isMinimized = isOpen && !isMinimized;
            isOpen = true;
         }

         state.apps[app].isOpen = isOpen;
         state.apps[app].isMinimized = isMinimized;
         return state;
      });
      console.log(this.state);
   }

   render() {
      return (
         <div id="desktop">
            <WindowManager appStates={this.state.apps} />
            <Taskbar callbackParent={this.setApplicationState}/>
         </div>
      );
   }
}

export default Desktop;
