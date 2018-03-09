import React, { Component } from 'react';

class Titlebar extends Component {
   constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
      this.getBackButton = this.getBackButton.bind(this);
      this.navButtonsOnLeft = this.navButtonsOnLeft.bind(this);
      this.navButtonsOnRight = this.navButtonsOnRight.bind(this);
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
            </div>
         );
      }
      return false;
   }

   navButtonsOnRight(name) {
      return (
         <div className="titlebar-container">
            <div className="titlebar-section">
               {this.getBackButton()}
               <p className="title">{name}</p>
            </div>
            <div className="titlebar-section nav-buttons">
               <p onClick={() => {this.handleClick({type: 'minimize'})}} className="titlebar-nav-button">&minus;</p>
               <p onClick={() => {this.handleClick({type: 'maximize'})}} className="titlebar-nav-button">&#9633;</p>
               <p onClick={() => {this.handleClick({type: 'close'})}} className="titlebar-nav-button red">&times;</p>
            </div>
         </div>
      );
   }

   navButtonsOnLeft(name) {
      return (
         <div className="titlebar-container">
            <div className="titlebar-section">
					<div className="nav-buttons">
						<div className="tb-button close" onClick={() => {this.handleClick({type: 'close'})}}>
							<a className="closebutton"><span><strong>&times;</strong></span></a>
						</div>
						<div className="tb-button minimize" onClick={() => {this.handleClick({type: 'minimize'})}}>
							<a className="minimizebutton"><span><strong>&ndash;</strong></span></a>
						</div>
						<div className="tb-button zoom" onClick={() => {this.handleClick({type: 'maximize'})}} >
							<a className="zoombutton"><span><strong>+</strong></span></a>
						</div>
					</div>
               {this.getBackButton()}
            </div>
            <div className="titlebar-section">
               <p className="title">{name}</p>
            </div>
            <div className="titlebar-section"></div>
         </div>
      )
   }

   render() {
      let name = this.props.content.name;
      return (
         <div className={`titlebar ${this.props.osType} ${this.props.theme || ''}`}
          style={{background: this.props.background}}
          onDoubleClick={()=>this.handleClick({type: 'maximize'})}>
            {this.props.osType === 'windows-10' ? this.navButtonsOnRight(name) : this.navButtonsOnLeft(name)}
         </div>
      );
   }
}

export default Titlebar;
