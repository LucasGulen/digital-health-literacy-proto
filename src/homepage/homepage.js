import React, { Component } from 'react';
import AppTopBar from './../appbar/appbar';

import './homepage.css';

class HomePage extends Component {

  render() {
    return (
      <AppTopBar 
        title="Digital Health Literacy" 
        connecting={(privateKey) => {
          console.log(privateKey);
        }}
        disconnecting={(privateKey) => {
          console.log("disconnecting");
        }}
        connected={false}
      />
    );
  }
}

export default HomePage;
