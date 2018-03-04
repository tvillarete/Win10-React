import React, { Component } from 'react';
import Windows10 from './systems/Windows10/Windows10';
import MacOS from './systems/MacOS/MacOS';

class BootManager extends Component {
   constructor(props) {
      super(props);
      this.handleOSChange = this.handleOSChange.bind(this);
   }

   handleOSChange(options) {
      this.setState((state) => {
         if (state.activeOS === 'MacOS') {
            state.activeOS = 'Windows10';
         } else {
            state.activeOS = 'MacOS';
         }
         return state;
      });
   }

   componentWillMount() {
      this.setState({
         list: {
            MacOS: <MacOS
                    onOSChange={this.handleOSChange}/>,
            Windows10: <Windows10
                        onOSChange={this.handleOSChange}/>
         },
         activeOS: 'MacOS',
      })
   }

   render() {
      return (
         this.state.list[this.state.activeOS]
      );
   }
}

export default BootManager
