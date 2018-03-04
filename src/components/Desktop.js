import React, { Component } from 'react';
import Taskbar from './Taskbar';
import WindowManager from './WindowManager';
import ShortcutManager from './ShortcutManager';
import SpotiFreeApp from './apps/SpotiFreeApp/SpotiFreeApp';
import SettingsApp from './apps/SettingsApp/SettingsApp';
import StartMenuApp from './apps/StartMenuApp/StartMenuApp';
import CortanaApp from './apps/CortanaApp/CortanaApp';

class Desktop extends Component {
   constructor(props) {
      super(props);
      this.handleEvent = this.handleEvent.bind(this);
      this.setApplicationState = this.setApplicationState.bind(this);
      this.setDesktopState = this.setDesktopState.bind(this);
      this.handleDesktopClick = this.handleDesktopClick.bind(this);
      this.closePendingApps = this.closePendingApps.bind(this);
      this.focusWindow = this.focusWindow.bind(this);
      this.blurWindow = this.blurWindow.bind(this);
      this.isFocused = this.isFocused.bind(this);
      this.handleWindowFocus = this.handleWindowFocus.bind(this);
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
               html: <StartMenuApp onEvent={this.handleEvent}/>
            }, Cortana: {
               name: 'Cortana',
               id: 'cortana-app',
               isInTaskbar: true,
               noMinimize: true,
               noWindowStyle: true,
               altClassName: 'cortana',
               img: 'cortana.png',
               viewStack: [],
               html: <CortanaApp onEvent={this.handleEvent}/>
            }, SpotiFree: {
               name: 'SpotiFree',
               id: 'spotifree-app',
               isInTaskbar: true,
               img: 'spotifree.svg',
               viewStack: [],
               html: <SpotiFreeApp onEvent={this.handleEvent}/>
            }, Settings: {
               name: 'Settings',
               id: 'settings-app',
               isInTaskbar: true,
               img: 'settings.svg',
               invertIconColor: true,
               viewStack: [],
               html: <SettingsApp onEvent={this.handleEvent}/>
            },
         },
         desktop: {
            background: 'files/images/bg1.jpg',
         },
         activeApps: [],
         appsToClose: [],
      }
   }

   handleEvent(options) {
      if (options.type === 'desktop') {
         this.setDesktopState(options);
      } else {
         this.setApplicationState(options);
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

         switch(options.action) {
            case 'open':
               state.apps[app].isOpen = true;
               break;
            case 'close':
               state.apps[app].isClosing = true;
               state.appsToClose.push(app);
               break;
            case 'minimize':
               state.apps[app].isMinimized = true;
               break;
            case 'maximize':
               if (options.value !== undefined) {
                  state.apps[app].isMaximized = options.value;
               } else {
                  state.apps[app].isMaximized = !isMaximized;
               }
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
                  if (isMinimized || !isOpen || !this.isFocused(app)) {
                     state.activeApps = this.focusWindow(app);
                  } else {
                     state.activeApps = this.blurWindow(app);
                  }
                  state.apps[app].isMinimized = isOpen && !isMinimized && !this.isFocused(app);
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

   setDesktopState(options) {
      switch(options.setting) {
         case 'background':
         default:
            this.setState((state) => {
               localStorage.desktopBackground = options.value;
               state.desktop.background = options.value;
               return state;
            });
            break;
      }
      console.log(this.state);
   }

   focusWindow(app) {
      let activeApps = this.state.activeApps;
      for (let i=activeApps.length-1; i>=0; i--) {
         if (activeApps[i] === app) {
            activeApps.splice(i, 1);
         }
      }
      activeApps.unshift(app);
      return activeApps;
   }

   blurWindow(app) {
      let activeApps = this.state.activeApps;
      for (let i=activeApps.length-1; i>=0; i--) {
         if (activeApps[i] === app) {
            activeApps.splice(i, 1);
         }
      }
      activeApps.push(app);
      return activeApps;
   }

   isFocused(app) {
      const activeApps = this.state.activeApps;
      return activeApps[0] === app;
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


   /** Any apps waiting to be closed will be removed from the DOM at this point.
    * setTimeout is used to ensure that the closing animation plays.
    */
   componentDidUpdate() {
      if (this.state.appsToClose.length) {
         setTimeout(() => {
            this.closePendingApps();
         }, 150);
      }
   }

   handleDesktopClick() {
      console.log("CLICKED");
   }

   handleWindowFocus(focusedWindow) {
      this.setState((state, props) => {
         state.activeApps = this.focusWindow(focusedWindow);
         return state;
      });
   }

   componentWillMount() {
      if (localStorage.desktopBackground) {
         this.setState((state) => {
            state.desktop.background = localStorage.desktopBackground;
            return state;
         });
      }
   }

   render() {
      return (
         <div id="desktop" style={{background: `url(${this.state.desktop.background})`}}>
            <WindowManager
             callbackParent={this.handleEvent}
             onWindowFocus={this.handleWindowFocus}
             appStates={this.state.apps}
             activeApps={this.state.activeApps}/>
            <ShortcutManager
             onEvent={this.handleEvent}/>
            <Taskbar
             apps={this.state.apps}
             activeApps={this.state.activeApps}
             callbackParent={this.setApplicationState}/>
         </div>
      );
   }
}

export default Desktop;
