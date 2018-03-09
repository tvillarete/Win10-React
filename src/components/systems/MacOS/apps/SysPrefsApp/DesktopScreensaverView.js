import React, { Component } from 'react';

class DesktopScreensaverView extends Component {
   constructor(props) {
      super(props);
      this.handleEvent = this.handleEvent.bind(this);
      this.getDesktopBgIcons = this.getDesktopBgIcons.bind(this);
   }

   handleEvent(options) {
      this.props.onEvent(options);
   }

   getDesktopBgIcons() {
      const backgrounds = this.props.backgrounds;
      let bgIcons = [];

      for (let background in backgrounds) {
         let name = backgrounds[background];

         bgIcons.push(
            <BackgroundIcon
             key={name}
             onEvent={this.handleEvent}
             name={name}/>
         )
      }
      return bgIcons;
   }

   render() {
      return (
         <div className="view desktop-settings-view">
            <div className="tab-content-container">
               <div className="preview-container">
                  <img alt="Background Preview" src={this.props.desktopBg}/>
						<div className="preview-info-container">
							<p>{`${this.props.desktopBg}`}</p>
							<select>
								<option value="volvo">Fill Screen</option>
								<option value="saab">Fit to Screen</option>
								<option value="opel">Stretch to Fill Screen</option>
								<option value="audi">Center</option>
							</select>
						</div>
               </div>
            </div>
				<div className="wallpaper-select-container">
               {this.getDesktopBgIcons()}
				</div>
         </div>
      );
   }
}

class BackgroundIcon extends Component {
   constructor(props) {
      super(props);
      this.handleEvent = this.handleEvent.bind(this);
   }

   handleEvent(options) {
      console.log(options);
      this.props.onEvent(options);
   }

   render() {
      return(
         <div className="background-icon"
          onClick={()=>this.handleEvent({
            type: 'desktop',
            setting: 'background',
            value: `files/images/macos/wallpapers/${this.props.name}.jpg`
          })}
          style={{background: `url("files/images/macos/wallpapers/icons/${this.props.name}.jpg")`}}></div>
      );
   }
}

export default DesktopScreensaverView;

