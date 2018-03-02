import React, { Component } from 'react';

class Titlebar extends Component {
   constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
   }

   handleClick = (type) => {
      let content = this.props.content;
      this.props.onButtonClick({name: content.name, type: `${type}`});
   }

   render() {
      let name = this.props.content.name;
      return (
         <div className="titlebar" onDoubleClick={()=>this.handleClick('maximize')}>
            <div className="titlebar-container">
               <p className="title">{name}</p>
            </div>
            <div className="titlebar-container">
               <p onClick={() => {this.handleClick('maximize')}} className="titlebar-nav-button">+</p>
               <p onClick={() => {this.handleClick('minimize')}} className="titlebar-nav-button">&minus;</p>
               <p onClick={() => {this.handleClick('close')}} className="titlebar-nav-button">&times;</p>
            </div>
         </div>
      );
   }
}

export default Titlebar;
