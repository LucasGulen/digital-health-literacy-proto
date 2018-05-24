// React
import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class Step1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pathologie: "",
      societe: "",
      siteWeb: "",
      theme: ""
    };

    this.isValidated = this.isValidated.bind(this);
  }

  isValidated() {
    return (
      this.state.pathologie !== "" &&
      this.state.societe !== "" &&
      this.state.siteWeb !== "" &&
      this.state.theme !== ""
    );
  }

  render() {
    return (
      <div
        style={{
          flexDirection: "column",
          display: "flex",
          paddingLeft: 40,
          paddingRight: 40,
          paddingBottom: 20,
          paddingTop: 10
        }}
      >
        <TextField
          margin="dense"
          label="Pathologie"
          type="text"
          onChange={e => {
            this.setState({ pathologie: e.target.value });
          }}
        />
        <TextField
          margin="dense"
          label="Société / Organisation / Association"
          type="text"
          onChange={e => {
            this.setState({ societe: e.target.value });
          }}
        />
        <TextField
          margin="dense"
          label="Site Web"
          type="text"
          onChange={e => {
            this.setState({ siteWeb: e.target.value });
          }}
        />
        <TextField
          margin="dense"
          label="Thème"
          type="text"
          onChange={e => {
            this.setState({ theme: e.target.value });
          }}
        />
        <div
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            display: "flex",
            paddingTop: 40
          }}
        >
          <Button
            variant="flat"
            color="primary"
            aria-label="more"
            onClick={() => {
              this.props.closeModal();
            }}
          >
            Annuler
          </Button>

          <Button
            variant="flat"
            color="primary"
            aria-label="more"
            disabled={!this.isValidated()}
            onClick={() => {
              this.props.jumpToStep(1);
            }}
          >
            Suivant
          </Button>
        </div>
      </div>
    );
  }
}

export default Step1;
