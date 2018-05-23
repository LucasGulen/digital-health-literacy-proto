// React
import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";

class Step1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <TextField margin="dense" label="Email Address" type="email" autoFocus />
    );
  }
}

export default Step1;
