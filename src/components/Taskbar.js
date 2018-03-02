import React, { Component } from 'react';
import TaskbarItem from './TaskbarItem';

class Taskbar extends Component {
   constructor(props) {
      super(props);
      this.handleItemClick = this.handleItemClick.bind(this);
      this.getTaskbarItems = this.getTaskbarItems.bind(this);
   }

   handleItemClick(app) {
      this.props.callbackParent({name: app});
   }

   getTaskbarItems() {
      const apps = this.props.apps;
      let taskbarItems = [];

      for (let app in apps) {
         app = apps[app];
         if (app.isInTaskbar) {
            taskbarItems.push(
               <TaskbarItem
                inverted={app.invertIconColor}
                key={app.name}
                app={app.name}
                src={app.img}
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
