import React, { Component } from 'react';
import Windows10 from './systems/Windows10/Windows10';
import MacOS from './systems/MacOS/MacOS';

class BootManager extends Component {
   constructor(props) {
      super(props);
      this.handleOSChange = this.handleOSChange.bind(this);
      this.getCurrentView = this.getCurrentView.bind(this);
   }

   handleOSChange(options) {
      console.log(options);
      if (options === 'MacOS' || options === 'Windows10') {
         this.setState(state=> {
            state.activeOS = options;
            return state;
         })
      } else {
         this.setState((state) => {
            state.activeOS = '';
            return state;
         });
      }
   }

   componentWillMount() {
      this.setState({
         list: {
            MacOS: <MacOS
                    onOSChange={this.handleOSChange}/>,
            Windows10: <Windows10
                        onOSChange={this.handleOSChange}/>
         },
         names: ['Windows10', 'MacOS'],
         activeOS: '',
      });
   }

   getCurrentView() {
      if (!this.state.activeOS) {
         return <BootSelector
          names={this.state.names}
          onEvent={this.handleOSChange}/>
      } else {
         return this.state.list[this.state.activeOS];
      }
   }

   render() {
      return (
         this.getCurrentView()
      );
   }
}

class BootSelector extends Component {
   constructor(props) {
      super(props);
      this.handleEvent = this.handleEvent.bind(this);
      this.handleKeydown = this.handleKeydown.bind(this);
      this.state = {
         cursor: 0,
         selected: 'Windows10'
      }
   }

   handleEvent(text) {
      this.setState({
         selected: text
      });
      this.props.onEvent(text)
   }

   handleKeydown(e) {
      const {cursor} = this.state;
      const listSize = this.props.names.length;
      let pos = cursor;

      if ((e.keyCode === 37 || e.keyCode === 38) && pos > 0) {
         pos--;
         this.setState(prevState => ({
            cursor: pos,
            selected: this.props.names[pos],
         }));
      } else if ((e.keyCode === 39 || e.keyCode === 40) && pos < listSize-1) {
         pos++;
         this.setState(prevState => ({
            cursor: pos,
            selected: this.props.names[pos],
         }));
      } else if (e.keyCode === 13) {
         this.handleEvent(this.props.names[pos])
      }
   }

   componentWillMount() {
      document.addEventListener("keydown", this.handleKeydown);
   }

   componentWillUnmount() {
      document.removeEventListener("keydown", this.handleKeydown);
   }

   render() {
      return (
         <div className="boot-manager" onKeyDown={this.handleKeydown}>
            <h1>Select OS</h1>
            <div className="os-container">
               <BootItem
                text="Windows10"
                selected={this.state.selected === "Windows10"}
                img="/files/images/icons/windows_black.svg"
                onEvent={this.handleEvent}/>
               <BootItem
                text="MacOS"
                selected={this.state.selected === 'MacOS'}
                img="/files/images/icons/apple.svg"
                onEvent={this.handleEvent}/>
            </div>
         </div>
      );
   }
}

class BootItem extends Component {
   render() {
      return (
         <div
          className={`os-item ${this.props.selected ? 'selected' : ''}`}
          onClick={()=>{this.props.onEvent(this.props.text)}}>
            <img alt={this.props.text} src={this.props.img} />
            <h3>{this.props.text}</h3>
         </div>
      );
   }
}

export default BootManager
