// React imports
import React, { Component } from "react";

// MaterialUI imports
import Grid from "material-ui/Grid";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import Search from "@material-ui/icons/Search";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";

// HTTP
import axios from "axios";

// My components
import Entry from "./../entry/entry";
import AppTopBar from "./../appbar/appbar";
import CardsList from "./../list/list";

// Styles
import "./homepage.css";

const allEntries = [];
const baseUrlCowaboo = "http://groups.cowaboo.net/2018/group08/public/api";
const urlGetUserCowaboo = "/user?secretKey=";
const urlPostUserCowaboo = "/user?email=";
const regEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

class HomePage extends Component {
  constructor(props) {
    super(props);

    // get all the data

    axios
      .get(
        "http://groups.cowaboo.net/2018/group08/public/api/observatory?observatoryId=DHL"
      )
      .then(response => {
        const entries = response.data.dictionary.entries;
        for (let key in entries) {
          const entry = entries[key];
          let parsedEntry;
          try {
            parsedEntry = JSON.parse(entry.value);
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
                parsedEntry.population
              )
            );
          } catch (error) {}
        }
        this.list.current.newData(allEntries);
      });
    // binds
    this.handleChangeRequest = this.handleChangeRequest.bind(this);
    this.handleMakeRequest = this.handleMakeRequest.bind(this);
    this.handleCloseCreateAccount = this.handleCloseCreateAccount.bind(this);
    this.handleCloseAuthentification = this.handleCloseAuthentification.bind(
      this
    );
    this.renderModalAuthentification = this.renderModalAuthentification.bind(
      this
    );
    this.handleCreateAccount = this.handleCreateAccount.bind(this);
    this.renderModalCreateAccount = this.renderModalCreateAccount.bind(this);
    this.handleCloseNotif = this.handleCloseNotif.bind(this);

    // state
    this.state = {
      request: "",
      madeFirstRequest: true,
      modalOpen: false,
      modalCreateAccount: false,
      email: "",
      emailCorrect: true,
      emailDoesntExist: true,
      notif: false,
      notifConnected: false,
      connected: false,
      accountCreated: false,
      user: {}
    };

    this.list = React.createRef();
  }

  // events
  handleChangeRequest(event) {
    this.setState({
      request: event.target.value
    });
  }

  handleCloseCreateAccount() {
    this.setState({ modalCreateAccount: false });
  }

  handleCreateAccount() {
    if (regEmail.test(this.state.email)) {
      this.setState({ emailCorrect: true });
      axios
        .post(baseUrlCowaboo + urlPostUserCowaboo + this.state.email)
        .then(response => {
          this.setState({ accountCreated: true });
        })
        .catch(e => {
          this.setState({ emailDoesntExist: !e.response.status === 409 });
        });
    } else {
      this.setState({ emailCorrect: false, emailDoesntExist: true });
    }
  }

  handleCloseAuthentification() {
    this.setState({ modalOpen: false });
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
        this.setState({ modalOpen: !this.state.modalOpen });
      });
  }

  handleCloseNotif() {
    this.setState({ notifConnected: false, notif: false });
  }

  handleMakeRequest() {
    this.setState({ madeFirstRequest: false });
    this.filterContent();
  }

  filterContent() {
    const requestEntry = new Entry(
      0,
      this.state.request,
      [this.state.request],
      null,
      null,
      null,
      null,
      null,
      null,
      null
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
      <Dialog
        open={this.state.modalCreateAccount}
        onClose={this.handleCloseCreateAccount}
        aria-labelledby="form-dialog-title"
        disableEnforceFocus
      >
        <DialogTitle id="form-dialog-title">Inscription</DialogTitle>
        {!this.state.accountCreated && (
          <DialogContent>
            <DialogContentText>
              Merci de bien vouloir nous fournir votre adresse mail pour que
              nous puissions vous envoyer votre clé secrète.
            </DialogContentText>
            <TextField
              margin="dense"
              label="Email Address"
              type="email"
              onKeyUp={event => {
                if (event.keyCode === 13) {
                  this.state.accountCreated
                    ? this.handleCloseCreateAccount()
                    : this.handleCreateAccount();
                }
              }}
              onChange={e => {
                this.setState({ email: e.target.value });
              }}
              fullWidth
            />
            {!this.state.emailCorrect && (
              <DialogContentText
                style={{ color: "red", fontSize: 12, fontStyle: "italic" }}
              >
                Email incorrect, merci de respecter le type de format suivant :
                exemple@exemple.com
              </DialogContentText>
            )}
            {!this.state.emailDoesntExist && (
              <DialogContentText
                style={{ color: "red", fontSize: 12, fontStyle: "italic" }}
              >
                Email déjà existant, merci d'en rentrer un autre.
              </DialogContentText>
            )}
          </DialogContent>
        )}
        {this.state.accountCreated && (
          <DialogContent>
            <DialogContentText>
              Nous vous remercions pour votre inscription. Un mail avec votre
              clé secrète va vous être envoyé.
            </DialogContentText>
          </DialogContent>
        )}
        <DialogActions>
          {!this.state.accountCreated && (
            <Button onClick={this.handleCloseCreateAccount} color="primary">
              Annuler
            </Button>
          )}
          <Button
            onClick={
              this.state.accountCreated
                ? this.handleCloseCreateAccount
                : this.handleCreateAccount
            }
            color="primary"
          >
            Valider
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  renderModalAuthentification() {
    return (
      <Dialog
        open={this.state.modalOpen}
        onClose={this.handleCloseAuthentification}
        aria-labelledby="responsive-dialog-title"
        disableEnforceFocus
      >
        <DialogTitle id="responsive-dialog-title">
          {"Erreur d'authentification"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Nous n'avons malheureusement pas réussi à vous identifier. Veuillez
            réessayer d'entrer votre clé privée ou de vous créer un compte si
            vous n'en avez pas encore un.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCloseAuthentification} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  renderNotif() {
    return (
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
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
        <AppTopBar
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
            this.setState({
              emailCorrect: true,
              emailDoesntExist: true,
              modalCreateAccount: !this.state.modalCreateAccount
            });
          }}
          connected={this.state.connected}
        />
        <Grid container className="flex-column-center">
          <Grid item style={{ paddingTop: 10 }}>
            <img
              className={this.state.madeFirstRequest ? "active" : "collapsed"}
              src={require("./../assets/images/logoHealth.svg")}
              alt="Digital Health Literacy Logo"
              width="200"
            />
          </Grid>

          <Grid item xs={12} style={{ width: "40%" }}>
            <FormControl style={{ width: "100%" }}>
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
          </Grid>
        </Grid>
        {this.renderNotif()}
        {this.renderModalAuthentification()}
        {this.renderModalCreateAccount()}

        <div className={this.state.madeFirstRequest ? "hidden" : "show"}>
          <Grid container>
            <Grid item lg={2} xs={false} />
            <Grid item lg={8} xs={12}>
              <CardsList ref={this.list} />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default HomePage;
