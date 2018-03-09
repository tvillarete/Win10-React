   import React, { Component } from 'react';

   export default class Statusbar extends Component {
      constructor(props) {
         super(props);
         this.state = {
            showDropdown: false,
         }
      }
      handleStatusbarClick() {
         this.setState(state => {
            state.showDropdown = !state.showDropdown;
            return state;
         });
      }

      render() {
         return(
            <div className={`statusbar ${this.props.osType} ${this.state.showDropdown ? 'active' : ''}`}
             onClick={this.handleStatusbarClick.bind(this)}>
               <div className="statusbar-bg"
                style={{background: `url("${this.props.desktopBg}") no-repeat center center fixed`}}></div>
               <StatusbarItem
                title=""
                desktopBg={this.props.desktopBg}/>
               <StatusbarItem
                bold
                title={this.props.activeApps.length ? this.props.activeApps[0] : 'Finder'}
                desktopBg={this.props.desktopBg}/>
               <StatusbarItem
                title="File"
                desktopBg={this.props.desktopBg}/>
         </div>
      );
   }
}

class StatusbarItem extends Component {
   render() {
      return (
         <div className="statusbar-item">
            <p className={`statusbar-text ${this.props.bold ? 'bold' : ''}`}>{this.props.title}</p>
            <div className="statusbar-dropdown hidden">
               <div className="statusbar-dropdown-bg"
                style={{background: `url("${this.props.desktopBg}") no-repeat center center fixed`}}></div>
               <div className="section">
                  <p className="statusbar-dropdown-item">Item</p>
                  <p className="statusbar-dropdown-item">Item</p>
                  <p className="statusbar-dropdown-item">Item</p>
               </div>
               <div className="section">
                  <p className="statusbar-dropdown-item">Item</p>
                  <p className="statusbar-dropdown-item">Item</p>
                  <p className="statusbar-dropdown-item">Item</p>
               </div>
            </div>
         </div>
      );
   }
}
