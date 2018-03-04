import React, { Component } from 'react';
import TaskbarItem from './TaskbarItem';

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
         <div id="taskbar">
            {this.getTaskbarItems()}
         </div>
      );
   }
}

export default Taskbar;
