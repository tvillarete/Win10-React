import React, { Component } from 'react';
import TaskbarIcon from './TaskbarIcon';

class Taskbar extends Component {
   render() {
      return (
         <div id="taskbar">
            <TaskbarIcon src="windows.png"/>
         </div>
      );
   }
}

export default Taskbar;
