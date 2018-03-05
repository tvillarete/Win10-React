import React, { Component } from 'react';
import Desktop from '../../Desktop';
import SpotiFreeApp from './apps/SpotiFreeApp/SpotiFreeApp';
import SettingsApp from './apps/SettingsApp/SettingsApp';
import EdgeApp from './apps/EdgeApp/EdgeApp';
import StartMenuApp from './apps/StartMenuApp/StartMenuApp';
import CortanaApp from './apps/CortanaApp/CortanaApp';

class Windows10 extends Component {
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
            'Start Menu': {
               name: 'Start Menu',
               id: 'startmenu-app',
               isInTaskbar: true,
               noMinimize: true,
               noWindowStyle: true,
               altClassName: 'start-menu',
               img: 'windows.png',
               viewStack: [],
               html: <StartMenuApp/>
            }, Cortana: {
               name: 'Cortana',
               id: 'cortana-app',
               isInTaskbar: true,
               noMinimize: true,
               noWindowStyle: true,
               altClassName: 'cortana',
               img: 'cortana.png',
               viewStack: [],
               html: <CortanaApp/>
            }, Settings: {
               name: 'Settings',
               id: 'settings-app',
               isInTaskbar: true,
               img: 'settings.svg',
               invertIconColor: true,
               viewStack: [],
               html: <SettingsApp/>
            }, SpotiFree: {
               name: 'SpotiFree',
               id: 'spotifree-app',
               isInTaskbar: true,
               img: 'spotifree.svg',
               viewStack: [],
               html: <SpotiFreeApp/>
            }, Edge: {
               name: 'Edge',
               id: 'edge-app',
               isInTaskbar: true,
               img: 'edge.svg',
               viewStack: [],
               html: <EdgeApp/>
            },
         },
      });
   }

   render() {
      return (
         <Desktop
          system="Windows10"
          osType="windows-10"
          onEvent={this.handleEvent}
          defaultBackground="files/images/windows.jpg"
          apps={this.state.apps}/>
      );
   }
}

export default Windows10;
