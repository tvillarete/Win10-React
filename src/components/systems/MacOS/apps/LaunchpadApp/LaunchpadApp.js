import React, { Component } from 'react';

export default class LaunchpadApp extends Component {
   constructor(props) {
      super(props);
      this.getSystemApps = this.getSystemApps.bind(this);
   }

   handleBackgroundClick(options) {
      console.log("Parent");
      this.props.onEvent({
         action: 'close',
         name: 'Launchpad',
         closeDuration: 350,
      });
   }

   handleItemEvent(options) {
      this.props.onEvent(options);
      this.props.onEvent({
         action: 'close',
         name: 'Launchpad',
         closeDuration: 350,
      });
   }

   getSystemApps() {
      const apps = this.props.systemApps;
      let launchpadApps = [];

      for (let app in apps) {
         let appContents = apps[app];
         if (!appContents.hideActiveApp) {
            launchpadApps.push(
               <LaunchpadAppItem
                key={app}
                src={`files/images/icons/${appContents.img}`}
                name={app}
                onEvent={this.handleItemEvent.bind(this)}/>
            );
         }
      }
      return launchpadApps;
   }

   render() {
      return (
         <div className="launchpad-contents" onClick={this.handleBackgroundClick.bind(this)}>
            <div className="launchpad-background" style={{background: `url("${this.props.desktopBg}") no-repeat center center fixed`}}></div>
            <div className="launchpad-item-container">
               {this.getSystemApps()}
            </div>
         </div>
      );
   }
}

class LaunchpadAppItem extends Component {
   handleEvent(e) {
      e.stopPropagation();
      this.props.onEvent({
         type: 'open',
         name: this.props.name
      });
   }

   render() {
      return (
         <div className="launchpad-item" onClick={this.handleEvent.bind(this)}>
            <img alt="Launchpad App" src={this.props.src}/>
            <p>{this.props.name}</p>
         </div>
      );
   }
}
