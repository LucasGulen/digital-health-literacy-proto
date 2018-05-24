// React
import React, { Component } from "react";
import Step1 from "./step1";
import Step2 from "./step2";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import StepZilla from "react-stepzilla";

import "./main.css";

class AjoutModifEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    };
  }

  openModal() {
    this.setState({ modalOpen: true });
  }

  render() {
    const steps = [
      {
        name: "Informations de base",
        component: (
          <Step1
            closeModal={() => {
              this.setState({ modalOpen: false });
            }}
          />
        )
      },
      { name: "Informations complémentaires", component: <Step2 /> }
    ];
    return (
      <Dialog open={this.state.modalOpen} fullWidth maxWidth={"sm"}>
        <div style={{ justifyContent: "center" }}>
          <div className={"step-progress"} style={{ justifyContent: "center" }}>
            <StepZilla
              steps={steps}
              showNavigation={false}
              hocValidationAppliedTo={[1, 2]}
            />
          </div>
        </div>
      </Dialog>
    );
  }
}

export default AjoutModifEntry;
