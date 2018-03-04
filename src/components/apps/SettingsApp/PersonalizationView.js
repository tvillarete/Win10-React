import React, { Component } from 'react';

class PersonalizationView extends Component {
   constructor(props) {
      super(props);
      this.handleSettingsChange = this.handleSettingsChange.bind(this);
   }

   handleSettingsChange(options) {
      this.props.onSettingsChange(options);
   }

   render() {
      return (
         <div className="view">
            <h1>Personalization</h1>
            <button onClick={() => {this.handleSettingsChange({
               type: 'desktop',
               setting: 'background',
               value: 'files/images/bg2.jpg'
            })}}>Change Background</button>
         </div>
      );
   }
}

export default PersonalizationView;

