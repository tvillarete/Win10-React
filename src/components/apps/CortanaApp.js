import React, { Component } from 'react';

class CortanaApp extends Component {
   constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
   }

   handleClick(options) {
      this.props.onButtonClick(options);
   }

   render() {
      return (
         <div className="cortana-container">
         </div>
      );
   }
}

export default CortanaApp;
