// React
import React, { Component } from "react";
import StepZilla from "react-stepzilla";
import Step1 from "./step1";
import Step2 from "./step2";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const steps = [
  { name: "Informations de base", component: <Step1 /> },
  { name: "Informations complémentaires", component: <Step2 /> }
];

class AjoutModifEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Dialog
        open
      >
      {console.log("Dialog")}
        <StepZilla steps={steps}/>
      </Dialog>
    );
  }
}

export default AjoutModifEntry;
