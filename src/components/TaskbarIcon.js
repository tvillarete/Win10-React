import React, { Component } from 'react';

class TaskbarIcon extends Component {
   constructor(props) {
      super(props);
   }
   render() {
      console.log(this.props);
      return (
         <div className="taskbar-icon">
            <img src={"files/images/icons/"}/>
         </div>
      );
   }
}

export default TaskbarIcon;
