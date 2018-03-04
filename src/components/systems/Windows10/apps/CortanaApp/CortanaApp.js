import React, { Component } from 'react';

class CortanaApp extends Component {
   constructor(props) {
      super(props);
      this.handleEvent = this.handleEvent.bind(this);
   }

   handleEvent(options) {
      this.props.onEvent(options);
   }

   render() {
      return (
         <div className="cortana-container">
         </div>
      );
   }
}

export default CortanaApp;
