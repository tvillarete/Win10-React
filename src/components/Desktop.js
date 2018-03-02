import React, { Component } from 'react';
import Taskbar from './Taskbar';

class Desktop extends Component {
   render() {
      return (
         <div id="desktop">
            <Taskbar />
         </div>
      );
   }
}

export default Desktop;
