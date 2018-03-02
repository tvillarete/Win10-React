import React, { Component } from 'react';

class Titlebar extends Component {
   render() {
      return (
         <div className="titlebar">
            <div className="titlebar-container">
               <p className="title">{this.props.title}</p>
            </div>
            <div className="titlebar-container">
               <p className="titlebar-nav-button">+</p>
               <p className="titlebar-nav-button">&minus;</p>
               <p className="titlebar-nav-button">&times;</p>
            </div>
         </div>
      );
   }
}

export default Titlebar;
