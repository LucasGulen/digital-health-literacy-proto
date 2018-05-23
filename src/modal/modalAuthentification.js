// React imports
import React, { Component } from "react";

// MaterialUI imports
import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class ModalAuthentification extends Component {
  constructor(props) {
    super(props);

    // state
    this.state = {
      open: false,
    };

    //binds
    this.toogleModal = this.toogleModal.bind(this);
  }

  toogleModal() {
    this.setState({ open: !this.state.open });
  }

  // render
  render() {
    return (
      <Dialog
        open={this.state.open}
        onClose={this.toogleModal}
        aria-labelledby="responsive-dialog-title"
        disableEnforceFocus
      >
        <DialogTitle id="responsive-dialog-title">
          {this.props.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {this.props.contentText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.toogleModal} color="primary">
            {this.props.buttonName}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default ModalAuthentification;
