import React, { Component } from 'react';
import DesktopScreensaverView from './DesktopScreensaverView';

class SysPrefsApp extends Component {
   constructor(props) {
      super(props);
      this.state = {
         navSections: {
            General: {
               id: 'general-settings',
               row: 1,
            }, 'Desktop & Screen Saver': {
               id: 'desktop-settings',
               row: 1,
            }, Dock: {
               id: 'dock-settings',
               row: 1,
            }, 'Mission Control': {
               id: 'mission-control-settings',
               row: 1,
            }, 'Language & Region': {
               id: 'language-settings',
               row: 1,
            }, 'Security & Privacy': {
               id: 'security-settings',
               row: 1,
            }, Spotlight: {
               id: 'spotlight-settings',
               row: 1,
            }, Notifications: {
               id: 'notifications-settings',
               row: 1,
            }, Displays: {
               id: 'displays-settings',
               row: 2,
            }, 'Energy Saver': {
               id: 'energy-settings',
               row: 2,
            }, Keyboard: {
               id: 'keyboard-settings',
               row: 2,
            }, Mouse: {
               id: 'mouse-settings',
               row: 2,
            }, Trackpad: {
               id: 'trackpad-settings',
               row: 2,
            }, 'Printers & Scanners': {
               id: 'printer-settings',
               row: 2,
            }, Sound: {
               id: 'sound-settings',
               row: 2,
            }, 'Startup Disk': {
               id: 'startup-settings',
               row: 2,
            }, iCloud: {
               id: 'icloud-settings',
               row: 3,
            }, 'Internet Accounts': {
               id: 'internet-settings',
               row: 3,
            }, 'App Store': {
               id: 'app-store-settings',
               row: 3,
            }, Network: {
               id: 'network-settings',
               row: 3,
            }, Bluetooth: {
               id: 'bluetooth-settings',
               row: 3,
            }, 'Extensions': {
               id: 'extensions-settings',
               row: 3,
            }, Sharing: {
               id: 'sharing-settings',
               row: 3,
            }, 'Users & Groups': {
               id: 'user-settings',
               row: 4,
            }, 'Parental Controls': {
               id: 'parental-settings',
               row: 4,
            }, Siri: {
               id: 'siri-settings',
               row: 4,
            }, 'Date & Time': {
               id: 'date-settings',
               row: 4,
            }, 'Time Machine': {
               id: 'time-machine-settings',
               row: 4,
            }, Accessibility: {
               id: 'update-settings',
            }
         }
      }
      this.getMainNavButtons = this.getMainNavButtons.bind(this);
      this.handleEvent = this.handleEvent.bind(this);
      this.getCurrentView = this.getCurrentView.bind(this);
   }

   handleEvent(options) {
      this.props.onEvent(options);
   }

   /* Returns an array of MainNavButton components for the main screen.
    */
   getMainNavButtons() {
      const navSections = this.state.navSections;
      const buttons = [];
      const rows = [[],[],[],[]];

      for (let section in navSections) {
         let sectionContent = navSections[section];
         if (sectionContent.row) {

         rows[sectionContent.row-1].push(
            <MainNavButton
             key={section}
             name={section}
             content={sectionContent}
             onEvent={this.handleEvent}/>
         )
         }
      }
      for (var i = 0; i<rows.length; i++) {
         buttons.push(
            <div className="row" key={`row-${i}`}>
               {rows[i]}
            </div>
         )
      }
      return buttons;
   }

   getCurrentView() {
      var viewStack = this.props.content.viewStack;

      if (!viewStack.length) {
         return <MainScreenView navButtons={this.getMainNavButtons()}/>
      } else {
         switch(viewStack[0]) {
            case 'desktop-settings':
               return <DesktopScreensaverView
                       desktopBg={this.props.desktopBg}
                       onSettingsChange={this.handleEvent}/>
            default:
               return false;
         }
      }
   }

   render() {
      return (
         this.getCurrentView()
      );
   }
}

/* Navigation buttons that are present on the main settings screeen
 */
class MainNavButton extends Component {
   constructor(props) {
      super(props);
      this.handleEvent = this.handleEvent.bind(this);
      this.handleSettingsChange = this.handleSettingsChange.bind(this);
   }

   handleEvent = () => {
      this.props.onEvent({
         name: 'System Preferences',
         action: 'change-view',
         view: this.props.content.id,
      });
   }

   handleSettingsChange(options) {
      this.props.onEvent(options);
   }

   render() {
      return (
         <div className="main-nav-button" onClick={this.handleEvent}>
            <div className={`button-icon ${this.props.content.id}`}></div>
            <h3 className="main-nav-button-title">{this.props.name}</h3>
            <h4 className="main-nav-button-details">{this.props.content.details}</h4>
         </div>
      );
   }
}

class MainScreenView extends Component {
   render() {
      return (
         <div className="view main-screen">
            <div className="button-container">
               {this.props.navButtons}
            </div>
         </div>
      );
   }
}

export default SysPrefsApp;
