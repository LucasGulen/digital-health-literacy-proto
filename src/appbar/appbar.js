// React
import React, { Component } from "react";

// MaterialUI
import Button from "material-ui/Button";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";
import TextField from "material-ui/TextField";
import Menu, { MenuItem } from "material-ui/Menu";

// Styles
import "./appbar.css";

class AppTopBar extends Component {
  state = {
    anchorElement: null,
    privateKey: ""
  };

  handleCreatedAccount = _ => {
    this.handleClose();
    this.props.creatingAccount();
  };

  handleDisconnected = _ => {
    this.setState({
      privateKey: ""
    }, () => { this.props.disconnecting() });
  };

  handleConnectedEvent = _ => {
    this.props.connecting(this.state.privateKey);
  };

  handleKeyPress = event => {
    if (event.keyCode === 13) {
      this.handleConnectedEvent();
    }
  };

  handleChange = event => {
    this.setState({ privateKey: event.target.value });
  };

  handleMenu = event => {
    this.setState({ anchorElement: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorElement: null });
  };

  renderConnected() {
    if (!this.props.connected) {
      return (
        <Grid container className="flex-row">
          <Grid item>
            <Button color="inherit" onClick={this.handleMenu}>
              Login
            </Button>
            <Menu
              id="menu-appbar"
              anchorEl={this.state.anchorElement}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={this.state.anchorElement !== null}
              onClose={this.handleClose}
            >
              <MenuItem>
                <TextField
                  id="private_key"
                  label="Insérez votre private key :"
                  value={this.state.privateKey}
                  onChange={this.handleChange}
                  onKeyUp={this.handleKeyPress}
                />
              </MenuItem>
              <MenuItem
                style={{ justifyContent: "center", marginTop: 20 }}
                onClick={this.handleConnectedEvent}
              >
                Login
              </MenuItem>
              <MenuItem
                style={{ color: "blue", fontSize: 12 }}
                onClick={this.handleCreatedAccount}
              >
                Pas encore de compte ?
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>
      );
    } else {
      return (
        <Grid container className="flex-row">
          <Grid item>
            <Button color="inherit" onClick={this.handleDisconnected}>
              Logout
            </Button>
          </Grid>
        </Grid>
      );
    }
  }

  render() { 
    document.body.style.overflow = 'visible';                
    return (
      <AppBar position="fixed">
        <Toolbar>
          <Grid container className="flex-row-space-between">
            <Grid item>
              <Typography variant="title" color="inherit">
                {this.props.title}
              </Typography>
            </Grid>
            <Grid item>{this.renderConnected()}</Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

export default AppTopBar;
