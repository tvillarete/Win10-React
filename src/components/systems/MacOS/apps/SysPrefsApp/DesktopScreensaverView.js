import React, { Component } from 'react';

class DesktopScreensaverView extends Component {
   constructor(props) {
      super(props);
      this.handleSettingsChange = this.handleSettingsChange.bind(this);
   }

   handleSettingsChange(options) {
      this.props.onSettingsChange(options);
   }

   render() {
      console.log(this.props);
      return (
         <div className="view desktop-settings-view">
            <div className="tab-content-container">
               <div className="preview-container">
                  <img alt="Background Preview" src={this.props.desktopBg}/>
						<div className="preview-info-container">
							<p>{`${window.innerWidth} x ${window.innerHeight}`}</p>
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

				</div>
            <button onClick={() => {this.handleSettingsChange({
               type: 'desktop',
               setting: 'background',
               value: 'files/images/macos.jpg'
            })}}>Background 1</button>
            <button onClick={() => {this.handleSettingsChange({
               type: 'desktop',
               setting: 'background',
               value: 'files/images/bg2.jpg'
            })}}>Background 2</button>
            <button onClick={() => {this.handleSettingsChange({
               type: 'desktop',
               setting: 'background',
               value: 'files/images/bg3.jpg'
            })}}>Background 3</button>
         </div>
      );
   }
}

export default DesktopScreensaverView;

