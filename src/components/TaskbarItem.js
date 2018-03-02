import React, { Component } from 'react';

class TaskbarItem extends Component {
   constructor(props) {
      super(props);
      this.handleItemClick = this.handleItemClick.bind(this);
   }

   handleItemClick() {
      this.props.callbackParent(this.props.app);
   }

   render() {
      return (
         <div onClick={this.handleItemClick}
          className={`taskbar-item ${this.props.inverted ? 'inverted' : ''}`}>
            <img src={`files/images/icons/${this.props.src}`} alt="Taskbar Icon"/>
         </div>
      );
   }
}

export default TaskbarItem;
