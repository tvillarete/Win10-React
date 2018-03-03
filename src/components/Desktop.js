import React, { Component } from 'react';
import Taskbar from './Taskbar';
import WindowManager from './WindowManager';
import SpotiFreeApp from './apps/SpotiFreeApp';
import SettingsApp from './apps/SettingsApp';
import StartMenuApp from './apps/StartMenuApp';
import CortanaApp from './apps/CortanaApp';

class Desktop extends Component {
   constructor(props) {
      super(props);
      this.setApplicationState = this.setApplicationState.bind(this);
      this.handleDesktopClick = this.handleDesktopClick.bind(this);
      this.closePendingApps = this.closePendingApps.bind(this);
      this.state = {
         /* Default application states. */
         apps: {
            'Start Menu': {
               name: 'Start Menu',
               id: 'startmenu-app',
               isInTaskbar: true,
               noMinimize: true,
               noWindowStyle: true,
               altClassName: 'start-menu',
               img: 'windows.png',
               viewStack: [],
               html: <StartMenuApp onButtonClick={this.setApplicationState}/>
            }, Cortana: {
               name: 'Cortana',
               id: 'cortana-app',
               isInTaskbar: true,
               noMinimize: true,
               noWindowStyle: true,
               altClassName: 'cortana',
               img: 'cortana.png',
               viewStack: [],
               html: <CortanaApp onButtonClick={this.setApplicationState}/>
            }, SpotiFree: {
               name: 'SpotiFree',
               id: 'spotifree-app',
               isInTaskbar: true,
               img: 'spotifree.svg',
               viewStack: [],
               html: <SpotiFreeApp onButtonClick={this.setApplicationState}/>
            }, Settings: {
               name: 'Settings',
               id: 'settings-app',
               isInTaskbar: true,
               img: 'settings.svg',
               invertIconColor: true,
               viewStack: [],
               html: <SettingsApp onButtonClick={this.setApplicationState}/>
            },
         },
         appsToClose: [],
      }
   }

   /* All app navigation clicks will propagate up to this point.
    * The state will then be pushed to each individual app.
    */
   setApplicationState(options) {
      let app = options.name;
      this.setState((state, props) => {
         var isOpen = state.apps[app].isOpen;
         var isMinimized = state.apps[app].isMinimized;
         var isMaximized = state.apps[app].isMaximized;

         switch(options.type) {
            case 'close':
               state.apps[app].isClosing = true;
               state.appsToClose.push(app);
               break;
            case 'minimize':
               state.apps[app].isMinimized = true;
               break;
            case 'maximize':
               state.apps[app].isMaximized = !isMaximized;
               break;
            case 'change-view':
               state.apps[app].viewStack.push(options.view);
               break;
            case 'back':
               state.apps[app].viewStack.pop();
               break;
            default:
               if (state.apps[app].noMinimize) {
                  if (state.apps[app].isOpen) {
                     state.apps[app].isClosing = true;
                     state.appsToClose.push(app);
                  } else {
                     state.apps[app].isOpen = true;
                  }
               } else {
                  state.apps[app].isMinimized = isOpen && !isMinimized;
                  state.apps[app].isOpen = true;
               }
               break;
         }
         /** Close Cortana and Start Menu if any other app is opened
          */
         if (app !== 'Start Menu' && app !== 'Cortana') {
            if (state.apps['Start Menu'].isOpen) {
               state.apps['Start Menu'].isClosing = true;
               state.appsToClose.push('Start Menu');
            } else if (state.apps.Cortana.isOpen) {
               state.apps['Cortana'].isClosing = true;
               state.appsToClose.push('Cortana');
            }
         } else if (app === 'Start Menu' || app === 'Cortana') {
            if (app === 'Start Menu' && state.apps.Cortana.isOpen) {
               state.apps['Cortana'].isClosing = true;
               state.appsToClose.push('Cortana');
            } else if (app === 'Cortana' && state.apps['Start Menu'].isOpen) {
               state.apps['Start Menu'].isClosing = true;
               state.appsToClose.push('Start Menu');
            }
         }
         return state;
      });
   }

   handleDesktopClick() {
      console.log("CLICKED");
   }

   /** Apps that have been scheduled to close will be processed here.
    */
   closePendingApps() {
      let appsToClose = this.state.appsToClose;
      let state = this.state;
      let shouldUpdateState = false;

      appsToClose.forEach(function(app, index) {
         state.apps[app].isOpen = false;
         state.apps[app].isClosing = false;
         state.apps[app].viewStack = [];
         shouldUpdateState = true;
      });
      state.appsToClose = [];
      if (shouldUpdateState) {
         this.setState(state);
      }
   }

   componentDidUpdate() {
      /** Any apps waiting to be closed will be removed from DOM at this point.
       * setTimeout is used to ensure that the closing animation plays.
       */
      if (this.state.appsToClose.length) {
         setTimeout(() => {
            this.closePendingApps();
         }, 150);
      }
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
