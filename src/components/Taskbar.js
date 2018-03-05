import React, { Component } from 'react';

class Taskbar extends Component {
   constructor(props) {
      super(props);
      this.handleItemClick = this.handleItemClick.bind(this);
      this.getTaskbarItems = this.getTaskbarItems.bind(this);
      this.isFocused = this.isFocused.bind(this);
   }

   handleItemClick(app) {
      this.props.callbackParent({name: app});
   }

   isFocused(app) {
      const activeApps = this.props.activeApps;
      return activeApps[0] === app;
   }

   getTaskbarItems() {
      const apps = this.props.apps;
      let taskbarItems = [];

      for (let app in apps) {
         let appContent = apps[app];
         if (appContent.isInTaskbar) {
            taskbarItems.push(
               <TaskbarItem
                osType={this.props.osType}
                inverted={appContent.invertIconColor}
                key={appContent.name}
                app={appContent.name}
                src={appContent.img}
                hideStyles={appContent.noWindowStyle}
                isActive={appContent.isOpen}
                isFocused={this.isFocused(app)}
                isMinimized={appContent.isMinimized}
                callbackParent={this.handleItemClick}/>
            );
         }
      }
      return taskbarItems;
   }

   render() {
      return (
         <div id="taskbar" className={this.props.osType}>
            <div className="taskbar-bg-container">
               <div className="taskbar-bg"
                style={{background: `url(${this.props.bg}) no-repeat center center fixed`}}>
               </div>
            </div>
            {this.getTaskbarItems()}
         </div>
      );
   }
}

class TaskbarItem extends Component {
   constructor(props) {
      super(props);
      this.handleItemClick = this.handleItemClick.bind(this);
   }

   handleItemClick() {
      this.props.callbackParent(this.props.app);
   }

   render() {
      let isMinimized = this.props.isMinimized && !this.props.hideStyles;
      let isActive = this.props.isActive && !this.props.hideStyles;
      return (
         <div onClick={this.handleItemClick}
          className={`taskbar-item
             ${this.props.isFocused ? 'focused' : ''}
             ${isMinimized ? 'minimized' : isActive ? 'active' : ''}
             ${this.props.inverted ? 'inverted' : ''}`}>
            <img src={`files/images/icons/${this.props.src}`} alt="Taskbar Icon"/>
         </div>
      );
   }
}

export default Taskbar;
