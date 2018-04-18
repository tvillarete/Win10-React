import React, { Component } from 'react';
import Desktop from '../../Desktop';
import SpotiFreeApp from './apps/SpotiFreeApp/SpotiFreeApp';
import SysPrefsApp from './apps/SysPrefsApp/SysPrefsApp';
import SafariApp from './apps/SafariApp/SafariApp';
import LaunchpadApp from './apps/LaunchpadApp/LaunchpadApp';

class MacOS extends Component {
   constructor(props) {
      super(props);
      this.handleEvent = this.handleEvent.bind(this);
      this.state = {
         backgrounds: [
            'High Sierra', 'Sierra', 'El Capitan', 'Yosemite 5', 'Wave',
            'Rolling Waves', 'Galaxy', 'Color Burst 2', 'Pink Lotus Flower']
      }
   }

   handleEvent(options) {
      this.props.onOSChange(options);
   }

   componentWillMount() {
      this.setState(state => {
         state.apps =  {
           'System Preferences': {
               name: 'System Preferences',
               id: 'sys-prefs-app',
               isInTaskbar: true,
               img: 'system_preferences.png',
               backgrounds: state.backgrounds,
               viewStack: [],
               html: <SysPrefsApp/>
            }, SpotiFree: {
               name: 'SpotiFree',
               id: 'spotifree-app',
               isInTaskbar: true,
               theme: 'dark',
               background: 'rgb(30, 30, 30)',
               img: 'spotifree.svg',
               viewStack: [],
               html: <SpotiFreeApp />
            }, Safari: {
               name: 'Safari',
               id: 'safari-app',
               isInTaskbar: true,
               img: 'safari.png',
               viewStack: [],
               html: <SafariApp/>
            }, Launchpad: {
               name: 'Launchpad',
               id: 'launchpad-app',
               altClassName: 'launchpad-app',
               noWindowStyle: true,
               isInTaskbar: true,
               hideActiveApp: true,
               noWindowIndex: true,
               noMinimize: true,
               img: 'launchpad.png',
               viewStack: [],
               html: <LaunchpadApp />
            },
         };
         return state;
      });
   }

   render() {
      return (
         <Desktop
          system="Mac OS High Sierra"
          osType="mac-os"
          showStatusbar
          defaultBackground="files/images/macos.jpg"
          onEvent={this.handleEvent}
          apps={this.state.apps}/>
      );
   }
}

export default MacOS;
