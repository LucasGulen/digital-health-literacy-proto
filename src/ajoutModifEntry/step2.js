// React
import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "material-ui/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "material-ui/Form";
import axios from "axios";

const encodeURIComponent = require('decode-uri-component');


const regUrl = /(www|http:|https:)+[^\s]+[\w]/;
const references = [
  { id: 0, type: "Recommandation" },
  { id: 1, type: "Boîte à outils" },
  { id: 2, type: "Newsletter" },
  { id: 3, type: "Alerte" },
  { id: 4, type: "Journal" },
  { id: 5, type: "Ouvrage" }
];
const acces = [{ id: 0, type: "Payant" }, { id: 1, type: "Libre" }];

const population = [{ id: 0, name: "Adultes" }, { id: 1, name: "Enfants" }];

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

  postEntryCowaboo() {


    axios
    .get(
      "http://groups.cowaboo.net/2018/group08/public/api/observatory?observatoryId=DHL"
    )
    .then(response => {
        const tag = Object.keys(response.data.dictionary.entries).length;
        console.log(tag);
        const value = "{\"date\":\""+this.state.date+"\",\"themes\":[\""+this.props.getStore().theme+"\"],\"entryNo\":"+tag+",\"siteWeb\":\""+encodeURIComponent(this.props.getStore().siteWeb) +"\",\"pathologie\":\""+ this.props.getStore().pathologie +"\",\"typeReference\":\""+ this.props.getStore().typeReference +" \",\"acces\":\""+ this.state.acces +"\",\"langue\":\""+ this.state.langue +"\",\"societe\":\""+ this.props.getStore().societe +"\",\"lienRessource\":\""+ encodeURIComponent(this.props.getStore().lien) +"\",\"population\":\""+ this.state.population +"\",\"verifie\":\"false\"}"        
        console.log(JSON.stringify(value));
        const secret = "SD6OWJLTF2U2CYVALP2ZENKXWVBVRSJSX36SKPWIY3RDALYDTMZJSHSN";
        axios
        .post("http://groups.cowaboo.net/2018/group08/public/api/entry?secretKey="+secret+"&observatoryId=test&tags="+tag+"&value=")
        .then(response => {
          console.log("entry posted");
        })
        .catch(e => {
          console.log("error boy");
        });
    });
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

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

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
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <div>
            <label>Type de référence :</label>
            <RadioGroup
              aria-label="gender"
              name="typeReference"
              value={this.props.getStore().typeReference}
              onChange={e => {
                this.props.updateStore(e.target.name, e.target.value);
                this.setState({ typeReference: e.target.value });
              }}
              style={{ paddingLeft: 25 }}
            >
              {references.map(typeRef => (
                <FormControlLabel
                  key={typeRef.id}
                  value={typeRef.type}
                  control={<Radio color="primary" />}
                  label={typeRef.type}
                />
              ))}
            </RadioGroup>
          </div>

          <div>
            <label>Accès : </label>
            <RadioGroup
              aria-label="gender"
              name="acces"
              value={this.props.getStore().acces}
              style={{ paddingLeft: 20 }}
              onChange={e => {
                this.props.updateStore(e.target.name, e.target.value);
                this.setState({ acces: e.target.value });
              }}
            >
              {acces.map(typeAcces => (
                <FormControlLabel
                  key={typeAcces.id}
                  value={typeAcces.type}
                  control={<Radio color="primary" />}
                  label={typeAcces.type}
                />
              ))}
            </RadioGroup>
            <div
              style={{
                justifyContent: "flex-end",
                flexDirection: "column",
                display: "flex",
                paddingRight: 10,
                paddingTop: 25
              }}
            >
              <InputLabel htmlFor="age-simple">Population</InputLabel>
              <Select
                input={<Input name="age" id="age-simple" />}
                value={this.props.getStore().population}
                onChange={e => {
                  this.setState({ population: e.target.value });
                  this.props.updateStore(e.target.name, e.target.value);
                }}
                name="population"
              >
                {population.map(typePopulation => (
                  <MenuItem key={typePopulation.id} value={typePopulation.name}>
                    {typePopulation.name}
                  </MenuItem>
                ))}
                <MenuItem
                  style={{ display: "none" }}
                  selected
                  key="placeholder"
                  value={"placeholder"}
                >
                  Population
                </MenuItem>
              </Select>
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
            </div>
          </div>
        </div>

        <Tooltip
          placement="top-end"
          className="tooltipPlacementRight"
          title="Le lien doit commencer par 'http://' ou 'https://' "
        >
          <div style={{ marginTop: 5 }}>
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
              this.postEntryCowaboo();
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
