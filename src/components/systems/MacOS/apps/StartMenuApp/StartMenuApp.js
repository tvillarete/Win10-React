import React, { Component } from 'react';

class StartMenuApp extends Component {
   constructor(props) {
      super(props);
      this.state = {
         'Life at a Glance': {
            Settings: {
               src: 'files/images/icons/settings.svg',
               inverted: true,
            }, SpotiFree: {
               src: 'files/images/icons/spotifree.svg',
            },
         }, 'General': {
            Settings: {
               src: 'files/images/icons/settings.svg',
               inverted: true,
            }, SpotiFree: {
               src: 'files/images/icons/spotifree.svg',
            }
         }
      }
      this.getSections = this.getSections.bind(this);
      this.handleClick = this.handleClick.bind(this);
   }

   handleClick(options) {
      this.props.onEvent(options);
   }

   getSections() {
      let components = [];
      const sections = this.state;

      for (let name in sections) {
         let content = sections[name];
         components.push(
            <StartMenuSection
             key={name}
             sectionTitle={name}
             content={content}
             parentCallback={this.handleClick}/>
         );
      }
      return components;
   }

   render() {
      return (
         <div className="sm-container">
            <div className="sm-sidebar">
               Sidebar
            </div>
            <div className="sm-content">
               {this.getSections()}
            </div>
         </div>
      );
   }
}

class StartMenuSection extends Component {
   constructor(props) {
      super(props);
      this.getTiles = this.getTiles.bind(this);
      this.handleClick = this.handleClick.bind(this);
   }

   handleClick(options) {
      this.props.parentCallback(options);
   }

   getTiles() {
      let tiles = [];
      const content = this.props.content;

      for (let tile in content) {
         let tileContent = content[tile];
         tiles.push(
            <StartMenuTile
             key={tile}
             name={tile}
             img={tileContent.src}
             inverted={tileContent.inverted}
             parentCallback={this.handleClick}/>
         );
      }
      return tiles;
   }

   render() {
      return (
         <div className="sm-section">
            <p className="sm-section-title">{this.props.sectionTitle}</p>
            <div className="sm-section-tile-container">
               {this.getTiles()}
            </div>
         </div>
      );
   }
}

class StartMenuTile extends Component {
   constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
   }

   handleClick() {
      this.props.parentCallback({
         name: this.props.name,
         action: 'open',
      });
   }

   render() {
      return (
         <div className={`sm-tile${this.props.inverted ? ' inverted' : ''}`} onClick={this.handleClick}>
            <img alt={`${this.props.name} tile`} src={this.props.img}/>
            <p className="tile-title">{this.props.name}</p>
         </div>
      );
   }
}

export default StartMenuApp;
