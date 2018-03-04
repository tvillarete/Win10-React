import React, { Component } from 'react';

class ShortcutManager extends Component {
   constructor(props) {
      super(props);
      this.handleEvent = this.handleEvent.bind(this);
   }

   handleEvent(options) {
      if (options === 'close-sm') {
         this.props.onEvent({
            name: 'Start Menu',
            action: 'close',
         });
         this.props.onEvent({
            name: 'Cortana',
            action: 'close',
         });
      }
   }

   render() {
      return (
         <div className="shortcut-container"
          onClick={() => {this.handleEvent('close-sm')}}></div>
      );
   }
}

export default ShortcutManager;
