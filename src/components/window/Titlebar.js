import React, { Component } from 'react';

class Titlebar extends Component {
   constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
      this.getBackButton = this.getBackButton.bind(this);
   }

   handleClick = (options) => {
      let content = this.props.content;
      this.props.onButtonClick({
         name: content.name,
         action: options.type,
      });
   }

   getBackButton() {
      const content = this.props.content;
      if (content.viewStack.length) {
         return (
            <div className="back-button"
             onClick={()=>this.handleClick({type: 'back'})}>
               <img alt="back button" src="files/images/icons/back-arrow.svg"/>
            </div>
         );
      }
      return false;
   }

   render() {
      let name = this.props.content.name;
      return (
         <div className={`titlebar ${this.props.osType}`}
          onDoubleClick={()=>this.handleClick({type: 'maximize'})}>
            <div className="titlebar-container">
               {this.getBackButton()}
               <p className="title">{name}</p>
            </div>
            <div className="titlebar-container">
               <p onClick={() => {this.handleClick({type: 'minimize'})}} className="titlebar-nav-button">&minus;</p>
               <p onClick={() => {this.handleClick({type: 'maximize'})}} className="titlebar-nav-button">&#9633;</p>
               <p onClick={() => {this.handleClick({type: 'close'})}} className="titlebar-nav-button red">&times;</p>
            </div>
         </div>
      );
   }
}

export default Titlebar;
