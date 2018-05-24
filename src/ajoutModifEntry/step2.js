// React
import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

const regUrl = /(www|http:|https:)+[^\s]+[\w]/;

class Step2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeReference: this.props.getStore().typeReference,
      acces: this.props.getStore().acces,
      lien: this.props.getStore().lien,
      date: this.props.getStore().date,
      langue: this.props.getStore().langue,
      population: this.props.getStore().population
    };

    this.isValidated = this.isValidated.bind(this);
  }

  isValidated() {
    return (
      this.state.typeReference !== "" &&
      this.state.acces !== "" &&
      this.state.lien !== "" &&
      this.state.lien !== "http://" &&
      this.state.date !== "" &&
      this.state.langue !== "" &&
      this.state.population !== ""
    );
  }

  render() {
    document.onkeypress = e => {
      if (e.keyCode === 13 && this.isValidated()) {
        console.log("envoi requête à cowaboowww");
      }
    };
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
          label="Type de référence"
          type="text"
          name="typeReference"
          onChange={e => {
            this.setState({ typeReference: e.target.value });
            this.props.updateStore(e.target.name, e.target.value);
          }}
          defaultValue={this.props.getStore().typeReference}
        />

        <Tooltip
          placement="bottom-end"
          className="tooltipPlacementRight"
          title="Le lien doit commencer par 'http://' ou 'https://' "
        >
          <div style={{width: '100%'}}>
            <TextField
              margin="dense"
              label="Lien"
              type="url"
              name="lien"
              fullWidth
              onChange={e => {
                this.setState({ lien: e.target.value });
                this.props.updateStore(e.target.name, e.target.value);
              }}
              defaultValue={
                this.props.getStore().lien === ""
                  ? "http://"
                  : this.props.getStore().lien
              }
            />
          </div>
        </Tooltip>

        <TextField
          margin="dense"
          label="Date (année)"
          type="text"
          name="date"
          onChange={e => {
            this.setState({ date: e.target.value });
            this.props.updateStore(e.target.name, e.target.value);
          }}
          defaultValue={this.props.getStore().date}
        />
        <TextField
          margin="dense"
          label="Accès"
          type="text"
          name="acces"
          onChange={e => {
            this.setState({ acces: e.target.value });
            this.props.updateStore(e.target.name, e.target.value);
          }}
          defaultValue={this.props.getStore().acces}
        />
        <TextField
          margin="dense"
          label="Population"
          type="text"
          name="population"
          onChange={e => {
            this.setState({ population: e.target.value });
            this.props.updateStore(e.target.name, e.target.value);
          }}
          defaultValue={this.props.getStore().population}
        />
        <TextField
          margin="dense"
          label="Langue"
          type="text"
          name="langue"
          onChange={e => {
            this.setState({ langue: e.target.value });
            this.props.updateStore(e.target.name, e.target.value);
          }}
          defaultValue={this.props.getStore().langue}
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
            onClick={() => {
              this.props.jumpToStep(0);
            }}
          >
            Précédent
          </Button>

          <Button
            variant="flat"
            color="primary"
            aria-label="more"
            disabled={!this.isValidated()}
            onClick={() => {
              console.log("envoi requête à cowaboowww");
            }}
          >
            Envoyer
          </Button>
        </div>
      </div>
    );
  }
}

export default Step2;
