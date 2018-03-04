import React, { Component } from 'react';
import PersonalizationView from './PersonalizationView';

class SettingsApp extends Component {
   constructor(props) {
      super(props);
      this.state = {
         navSections: {
            System: {
               id: 'system-settings',
               details: 'Display, notifications, power',
            }, Devices: {
               id: 'devices-settings',
               details: 'Bluetooth, printers, mouse',

            }, Phone: {
               id: 'phone-settings',
               details: 'Link your Android, iPhone',

            }, 'Network & Internet': {
               id: 'network-settings',
               details: 'Wi-Fi, airplane mode, VPN',

            }, Personalization: {
               id: 'personalization-settings',
               details: 'Background, lock screen, colors',

            }, 'Apps': {
               id: 'apps-settings',
               details: 'Uninstall, defaults, optional features',

            }, Accounts: {
               id: 'accounts-settings',
               details: 'Your accounts, email, sync, work, family',

            }, 'Time & Language': {
               id: 'time-settings',
               details: 'Speech, region, date',

            }, Gaming: {
               id: 'gaming-settings',
               details: 'Game bar, DVR, broadcasting, Game Mode',

            }, 'Ease of Access': {
               id: 'access-settings',
               details: 'Narrator, magnifier, high contrast',

            }, Cortana: {
               id: 'cortana-settings',
               details: 'Cortana language, permissions, notifications',

            }, Privacy: {
               id: 'privacy-settings',
               details: 'Location, camera',

            }, 'Update & Security': {
               id: 'update-settings',
               details: 'Windows Update, recovery, backup',

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

      for (let section in navSections) {
         let sectionContent = navSections[section];

         buttons.push(
            <MainNavButton
             key={section}
             name={section}
             content={sectionContent}
             onEvent={this.handleEvent}/>
         );
      }
      return buttons;
   }

   getCurrentView() {
      var viewStack = this.props.content.viewStack;

      if (!viewStack.length) {
         return <MainScreenView navButtons={this.getMainNavButtons()}/>
      } else {
         switch(viewStack[0]) {
            case 'personalization-settings':
               return <PersonalizationView
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
         name: 'Settings',
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
            <div className="search-container">
               <h1 className="header">Windows Settings</h1>
               <input className="text-input" type="text" placeholder="Find a setting"></input>
            </div>
            <div className="button-container">
               {this.props.navButtons}
            </div>
         </div>
      );
   }
}

export default SettingsApp;
