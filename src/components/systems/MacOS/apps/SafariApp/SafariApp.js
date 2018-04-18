import React, { Component } from 'react';

class SafariApp extends Component {
   render() {
      return (
         <div className="main-screen">
            <iframe title="Safari Browser Window" src="https://bing.com"></iframe>
         </div>
      );
   }
}

export default SafariApp;
