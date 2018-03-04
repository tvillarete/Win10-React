import React, { Component } from 'react';

class SafariApp extends Component {
   render() {
      return (
         <div className="main-screen">
            <iframe title="SpotiFree" src="http://tannerv.ddns.net:12345/SpotiFree/"></iframe>
         </div>
      );
   }
}

export default SafariApp;
