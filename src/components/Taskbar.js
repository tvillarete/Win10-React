import React, { Component } from 'react';
import TaskbarItem from './TaskbarItem';

class Taskbar extends Component {
   constructor(props) {
      super(props);
      this.handleItemClick = this.handleItemClick.bind(this);
   }

   handleItemClick(app) {
      this.props.callbackParent(app);
   }

   render() {
      return (
         <div id="taskbar">
            <TaskbarItem app="StartMenu" src="windows.png"
             callbackParent={this.handleItemClick}/>
            <TaskbarItem app="SpotiFree" src="spotifree.svg"
             callbackParent={this.handleItemClick}/>
         </div>
      );
   }
}

export default Taskbar;
