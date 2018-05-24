// React
import React, { Component } from "react";
import Step1 from "./step1";
import Step2 from "./step2";

import Dialog from "@material-ui/core/Dialog";
import StepZilla from "react-stepzilla";

import "./main.css";

class AjoutModifEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      pathologie: "",
      theme: "",
      societe: "",
      siteWeb: "",
      langue: "",
      population: "",
      typeReference: "",
      lien: "",
      date: "",
      acces: "",
      nbEntries: 0
    };

  }

  getStore() {
    return this.state;
  }

  updateStore(key, value) {
    this.setState({ [key]: value });
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
            getStore={() => this.getStore()}
            updateStore={(key, value) => {
              this.updateStore(key, value);
            }}
          />
        )
      },
      {
        name: "Informations complémentaires",
        component: (
          <Step2
            closeModal={() => {
              this.setState({ modalOpen: false });
            }}
            getStore={() => this.getStore()}
            updateStore={(key, value) => {
              this.updateStore(key, value);
            }}
          />
        )
      }
    ];
    return (
      <Dialog open={true /*this.state.modalOpen*/} fullWidth maxWidth={"sm"}>
        <div style={{ justifyContent: "center" }}>
          <div className={"step-progress"} style={{ justifyContent: "center" }}>
            <StepZilla
              steps={steps}
              showNavigation={false}
              hocValidationAppliedTo={[1, 2]}
              startAtStep={1}
            />
          </div>
        </div>
      </Dialog>
    );
  }
}

export default AjoutModifEntry;
