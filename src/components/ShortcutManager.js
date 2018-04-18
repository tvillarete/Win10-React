import React, { Component } from 'react';

class ShortcutManager extends Component {
   constructor(props) {
      super(props);
      this.handleEvent = this.handleEvent.bind(this);
      this.getShortcuts = this.getShortcuts.bind(this);
      this.state = {
         shortcuts: {
            'OSSwap': {
               text: 'Change OS',
               img: 'files/images/icons/clover.png',
               action: {
                  type: 'desktop',
                  setting: 'change-os',
                  value: 'macOS',
               }
            }
         }
      }
   }

   handleEvent(options) {
      if (options === 'close-sm') {
         this.props.onEvent({
            name: 'Start Menu',
            action: 'close',
         });
         this.props.onEvent({
            name: 'Cortana',
            action: 'close',
         });
      } else {
         this.props.onEvent(options);
      }
   }

   getShortcuts() {
      const shortcuts = this.state.shortcuts;
      let components = [];

      for (var shortcut in shortcuts) {
         let content = shortcuts[shortcut];
         components.push(
            <Shortcut
             key={content.text}
             text={content.text}
             img={content.img}
             onEvent={this.handleEvent}
             action={content.action}/>
         )
      }
      return components;
   }

   render() {
      return (
         <div className={`shortcut-container ${this.props.osType}`}
          onClick={() => {this.handleEvent('close-sm')}}>
            {this.getShortcuts()}
         </div>
      );
   }
}

class Shortcut extends Component {
   constructor(props) {
      super(props);
      this.handleEvent = this.handleEvent.bind(this);
   }

   handleEvent(options) {
      this.props.onEvent(options);
   }

   render() {
      return (
         <div className="shortcut"
          onClick={()=>{this.handleEvent(this.props.action)}}
          >
            <img alt={this.props.text} src={this.props.img}/>
            <p className="shortcut-text">{this.props.text}</p>
         </div>
      );
   }
}

export default ShortcutManager;
