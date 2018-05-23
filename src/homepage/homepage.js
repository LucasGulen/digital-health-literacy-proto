// React imports
import React, { Component } from "react";

// MaterialUI imports
import Grid from 'material-ui/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Search from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import FilterList from '@material-ui/icons/FilterList';
import Add from '@material-ui/icons/Add';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Tooltip from '@material-ui/core/Tooltip';

import ModalAuthentification from "../modal/modalAuthentification.js";
import ModalCreateAccount from "../modal/modalCreateAccount.js";

import Snackbar from "@material-ui/core/Snackbar";

import SearchComponent from "./../search/search";
// HTTP
import axios from "axios";

// My components
import Entry from "./../entry/entry";
import AppTopBar from "./../appbar/appbar";
import CardsList from "./../list/list";
import { animateScroll } from 'react-scroll'



// Styles
import "./homepage.css";

const allEntries = [];
const langues = new Set();
const populations = new Set();
const baseUrlCowaboo = "http://groups.cowaboo.net/2018/group08/public/api";
const urlGetUserCowaboo = "/user?secretKey=";

class HomePage extends Component {
  constructor(props) {
    super(props);

    // get all the data
    this.getAllEntries();

    // binds
    this.handleChangeRequest = this.handleChangeRequest.bind(this);
    this.handleMakeRequest = this.handleMakeRequest.bind(this);
    this.handleCloseNotif = this.handleCloseNotif.bind(this);

    // state
    this.state = {
      request: "",
      madeFirstRequest: false,
      hasFetchedData: false,
      searchOpen: false,
      acces: "Tous",
      langue: "Toutes",
      population: "Toutes",
      modalOpen: false,
      modalCreateAccount: false,
      notif: false,
      notifConnected: false,
      connected: false,
      user: {}
    };

    // refs
    this.list = React.createRef();
    this.search = React.createRef();
    this.modalAuthentification = React.createRef();
    this.modalCreateAccount = React.createRef();
  }

  //data
  async getAllEntries() {
    axios
      .get(
        "http://groups.cowaboo.net/2018/group08/public/api/observatory?observatoryId=DHL"
      )
      .then(response => {
        this.setState({ hasFetchedData: true });
        const entries = response.data.dictionary.entries;
        for (let key in entries) {
          const entry = entries[key];
          let parsedEntry;
          try {
            parsedEntry = JSON.parse(entry.value);
            langues.add(parsedEntry.langue);
            populations.add(parsedEntry.population);
            allEntries.push(
              new Entry(
                parsedEntry.entryNo,
                parsedEntry.pathologie,
                parsedEntry.themes,
                parsedEntry.typeReference,
                parsedEntry.lienRessource,
                parsedEntry.acces,
                parsedEntry.societe,
                parsedEntry.date.substring(0, parsedEntry.date.length - 2),
                parsedEntry.langue,
                parsedEntry.population,
                parsedEntry.verifie
              )
            );
          } catch (error) { }
        }
        populations.delete("na");
        if (this.state.madeFirstRequest) {
          this.filterContent();
        } else {
          this.list.current.newData(allEntries);
        }
        this.search.current.updateLists(langues, populations);
      });
  }

  // events
  handleChangeRequest(event) {
    this.setState({
      request: event.target.value
    });
  }

  connectToCowaboo(privateKey) {
    axios
      .get(baseUrlCowaboo + urlGetUserCowaboo + privateKey)
      .then(response => {
        this.setState({
          connected: !this.state.connected,
          user: response.data,
          notifConnected: true,
          notif: true
        });
      })
      .catch(e => {
        this.modalAuthentification.current.toogleModal();
      });
  }

  handleCloseNotif() {
    this.setState({ notifConnected: false, notif: false });
  }

  handleMakeRequest() {
    this.setState({ madeFirstRequest: true });
    if (this.state.hasFetchedData) {
      this.filterContent();
    }
  }

  filterContent() {
    const requestEntry = new Entry(
      0,
      this.state.request,
      [this.state.request],
      null,
      null,
      this.state.acces,
      null,
      null,
      this.state.langue,
      this.state.population,
      true
    );
    let filteredEntries = [];
    allEntries.forEach(entry => {
      if (entry.equals(requestEntry)) {
        filteredEntries.push(entry);
      }
    });
    this.list.current.newData(filteredEntries);
  }

  renderModalCreateAccount() {
    return (
      <ModalCreateAccount
        open={this.state.modalCreateAccount}
        ref={this.modalCreateAccount}
        title={"Inscription"}
        contentText={
          "Merci de bien vouloir nous fournir votre adresse mail pour que nous puissions vous envoyer votre clé secrète."
        }
        buttonCancelText={"Annuler"}
        buttonValidate={"Valider"}
      />
    );
  }

  renderModalAuthentification() {
    return (
      <ModalAuthentification
        open={this.state.modalOpen}
        ref={this.modalAuthentification}
        title={"Erreur d'authentification"}
        contentText={
          "Nous n'avons malheureusement pas réussi à vous identifier. Veuillez réessayer d'entrer votre clé privée ou de vous créer un compte si vous n'en avez pas encore un."
        }
        buttonName={"Ok"}
      />
    );
  }

  renderNotif() {
    return (
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={this.state.notif}
        onClose={this.handleCloseNotif}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        autoHideDuration={3000}
        message={
          <span id="message-id">
            Vous êtes maintenant{" "}
            {this.state.notifConnected ? "connecté" : "déconnecté"}
          </span>
        }
      />
    );
  }

  // render
  render() {
    return (
      <div>
        <AppTopBar style={{ position: 'fixed' }}
          title="Digital Health Literacy"
          connecting={privateKey => {
            this.connectToCowaboo(privateKey);
          }}
          disconnecting={privateKey => {
            this.setState({
              connected: !this.state.connected,
              user: {},
              notif: true,
              notifConnected: false
            });
          }}
          creatingAccount={_ => {
            this.modalCreateAccount.current.openModal();
          }}
          connected={this.state.connected}
        />
        <Grid container className="flex-column-center">
          <Grid item style={{ paddingTop: 65 }}>
            <img
              className={this.state.madeFirstRequest ? "collapsed" : "active"}
              src={require("./../assets/images/logoHealth.svg")}
              alt="Digital Health Literacy Logo"
              width="200"
            />
          </Grid>

          <Grid item xs={12} style={{ width: "40%" }}>
            <div style={{ backgroundColor: 'white', width: '100%' }}>
              <span className={"hidden"}>
                <Button
                  variant="fab"
                  color="primary"
                  aria-label="add"
                  disabled={true}
                >
                  <FilterList />
                </Button>
              </span>
              <FormControl style={{ width: "79%" }}>
                <InputLabel htmlFor="adornment-recherche">
                  Votre recherche
              </InputLabel>
                <Input
                  id="adornment-recherche"
                  type={"text"}
                  value={this.state.request}
                  onChange={this.handleChangeRequest}
                  onKeyUp={event => {
                    if (event.keyCode === 13) {
                      this.handleMakeRequest();
                    }
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Rechercher"
                        onClick={this.handleMakeRequest}
                      >
                        <Search />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <span className={this.state.madeFirstRequest ? "show" : "hidden"}>
                <Button
                  variant="fab"
                  color="primary"
                  aria-label="add"
                  disabled={!this.state.madeFirstRequest}
                  onClick={() => {
                    this.setState({ searchOpen: !this.state.searchOpen });
                  }}
                >
                  <FilterList />
                </Button>
              </span>
            </div>
          </Grid>
        </Grid>
        {this.renderNotif()}
        {this.renderModalAuthentification()}
        {this.renderModalCreateAccount()}
        <div>
          <Grid container>
            <Grid item lg={2} xs={false} />
            <Grid item lg={8} xs={12}>
              <SearchComponent
                searchopen={
                  this.state.searchOpen ? "search-show" : "search-hide"
                }
                ref={this.search}
                langueChanged={langue => {
                  this.setState({ langue }, () => this.filterContent());
                }}
                populationChanged={population => {
                  this.setState({ population }, () => this.filterContent());
                }}
                accesChanged={acces => {
                  this.setState({ acces }, () => this.filterContent());
                }}
              />
            </Grid>
          </Grid>
        </div>

        <div className={this.state.madeFirstRequest ? "show" : "hidden"}>
          <Grid container>
            <Grid item lg={2} xs={false} />
            <Grid item lg={8} xs={12}>
              <CardsList ref={this.list} />
            </Grid>
          </Grid>
        </div>
        <span style={{ position: 'fixed', right: '6%', bottom: '16%' }}>
          <Button
            variant="fab"
            color="primary"
            aria-label="add"
            onClick={() => {
              animateScroll.scrollToTop();
            }}
          >
            <ArrowUpward />
          </Button>
        </span>

        <span style={{ position: 'fixed', right: '6%', bottom: '7%' }}>
          <Tooltip placement="left" title="Veuillez vous connecter afin proposer du contenu">
            <div>
              <Button
                variant="fab"
                color="primary"
                aria-label="add"
                onClick={() => {
                  animateScroll.scrollToTop();
                }}
                disabled={!this.state.connected}
              >
                <Add />
              </Button>
            </div>
          </Tooltip>
        </span>
      </div>


    );
  }
}

export default HomePage;
