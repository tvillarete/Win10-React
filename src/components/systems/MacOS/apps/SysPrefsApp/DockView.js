import React, { Component } from 'react';

class DockView extends Component {
   constructor(props) {
      super(props);
      this.handleSettingsChange = this.handleSettingsChange.bind(this);
   }

   handleSettingsChange(options) {
      this.props.onSettingsChange(options);
   }

   render() {
      return (
         <div className="view dock-settings-view">
            <input type="radio" onClick={()=>{this.handleSettingsChange({
               type: 'desktop',
               setting: 'dock',
               value: 'left'
            })}}/>
            <input type="radio" onClick={()=>{this.handleSettingsChange({
               type: 'desktop',
               setting: 'dock',
               value: 'bottom'
            })}}/>
         </div>
      );
   }
}

export default DockView;

