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
      if (options === 'MacOS' || options === 'Windows10') {
         this.setState(state=> {
            state.activeOS = options;
            return state;
         })
      } else {
         this.setState((state) => {
            if (state.activeOS === 'MacOS') {
               state.activeOS = 'Windows10';
            } else {
               state.activeOS = 'MacOS';
            }
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
         activeOS: '',
      });
   }

   getCurrentView() {
      if (!this.state.activeOS) {
         return <BootSelector
          list={this.state.list}
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
      const {cursor, selected} = this.state;

      if (e.key === 39 && cursor < this.state.list.length-1) {
         this.setState(prevState => ({
            cursor: prevState.cursor + 1
         }))
      } else if (e.key === 37 && cursor > 0) {
         this.setState(prevState => ({
            cursor: prevState.cursor - 1
         }))
      }
      console.log(cursor);
   }

   render() {
      return (
         <div className="boot-manager" onKeyPress={this.handleKeydown}>
            <h1>Select OS</h1>
            <div className="os-container">
               <BootItem
                text="Windows10"
                selected={this.state.selected === "Windows10"}
                img="files/images/icons/windows_black.svg"
                onEvent={this.handleEvent}/>
               <BootItem
                text="MacOS"
                selected={this.state.selected === 'MacOS'}
                img="files/images/icons/apple.svg"
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
            <img src={this.props.img} />
            <h3>{this.props.text}</h3>
         </div>
      );
   }
}

export default BootManager
