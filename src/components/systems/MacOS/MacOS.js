import React, { Component } from 'react';
import Desktop from '../../Desktop';
import SpotiFreeApp from './apps/SpotiFreeApp/SpotiFreeApp';
import SettingsApp from './apps/SettingsApp/SettingsApp';
import SafariApp from './apps/SafariApp/SafariApp';

class MacOS extends Component {
   constructor(props) {
      super(props);
      this.handleEvent = this.handleEvent.bind(this);
   }

   handleEvent(options) {
      this.props.onOSChange(options);
   }

   componentWillMount() {
      this.setState({
         apps: {
           Settings: {
               name: 'Settings',
               id: 'settings-app',
               isInTaskbar: true,
               img: 'settings.svg',
               invertIconColor: true,
               viewStack: [],
               html: <SettingsApp onEvent={this.handleEvent}/>
            }, SpotiFree: {
               name: 'SpotiFree',
               id: 'spotifree-app',
               isInTaskbar: true,
               theme: 'dark',
               background: 'rgb(30, 30, 30)',
               img: 'spotifree.svg',
               viewStack: [],
               html: <SpotiFreeApp onEvent={this.handleEvent}/>
            }, Edge: {
               name: 'Safari',
               id: 'safari-app',
               isInTaskbar: true,
               img: 'safari.png',
               viewStack: [],
               html: <SafariApp onEvent={this.handleEvent}/>
            },
         },
      });
   }

   render() {
      return (
         <Desktop
          system="Mac OS High Sierra"
          osType="mac-os"
          defaultBackground="files/images/macos.jpg"
          onEvent={this.handleEvent}
          apps={this.state.apps}/>
      );
   }
}

export default MacOS;
