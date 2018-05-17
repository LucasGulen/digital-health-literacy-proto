// React imports
import React, { Component } from 'react';

// MaterialUI imports
import Grid from 'material-ui/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Search from '@material-ui/icons/Search';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Button from '@material-ui/core/Button';
import StellarSdk from 'stellar-sdk';

// HTTP
import axios from 'axios';

// My components
import Entry from './../entry/entry';
import AppTopBar from './../appbar/appbar';
import CardsList from './../list/list';

// Styles
import './homepage.css';

const allEntries = [];

class HomePage extends Component {

  constructor(props) {
    super(props);

    // get all the data

    axios.get("http://groups.cowaboo.net/2018/group08/public/api/observatory?observatoryId=DHL")
      .then((response) => {
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
          }
          catch (error) {
          }
        }
        this.list.current.newData(allEntries);
      })
    // binds
    this.handleChangeRequest = this.handleChangeRequest.bind(this);
    this.handleMakeRequest = this.handleMakeRequest.bind(this);

    // state
    this.state = {
      request: '',
      madeFirstRequest: true,
      modalOpen: false,
    };

    this.handleClose = this.handleClose.bind(this);

    this.list = React.createRef();
  }

  // events
  handleChangeRequest(event) {
    this.setState({
      request: event.target.value
    });
  }

  connectToStellar(privateKey) {

    try {
      // Derive Keypair object and public key (that starts with a G) from the secret
      var sourceKeypair = StellarSdk.Keypair.fromSecret(privateKey);
      var sourcePublicKey = sourceKeypair.publicKey();
      // Configure StellarSdk to talk to the horizon instance hosted by Stellar.org
      // To use the live network, set the hostname to 'horizon.stellar.org'
      var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
      StellarSdk.Network.useTestNetwork();
      server.loadAccount(sourcePublicKey)
        .then(function (account) {
          var transaction = new StellarSdk.TransactionBuilder(account)
            .build();
          console.log(account);
        })
        .catch(function (e) {
          console.log(e);
        });
    } catch (error) {
      this.setState({ modalOpen: !this.state.modalOpen });
    }

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
      null,
    );
    let filteredEntries = [];
    allEntries.forEach((entry) => {
      if (entry.equals(requestEntry)) {
        filteredEntries.push(entry);
      }
    });
    this.list.current.newData(filteredEntries);
  }

  handleClose() {
    this.setState({ modalOpen: false });
  };

  // render
  render() {
    return (
      <div>
        <AppTopBar
          title="Digital Health Literacy"
          connecting={(privateKey) => {
            this.connectToStellar(privateKey);
          }}
          disconnecting={(privateKey) => {
            console.log("disconnecting");
          }}
          creatingAccount={() => {
            console.log("Need to create account");
          }}
          connected={false}
        />
        <Grid container className="flex-column-center">
          <Grid item style={{ paddingTop: 10 }}>
            <img className={this.state.madeFirstRequest ? "active" : "collapsed"} src={require("./../assets/images/logoHealth.svg")} alt="Digital Health Literacy Logo" width="200" />
          </Grid>

          <Grid item xs={12} style={{ width: '40%' }}>
            <FormControl style={{ width: '100%' }}>
              <InputLabel htmlFor="adornment-recherche">Votre recherche</InputLabel>
              <Input
                id="adornment-recherche"
                type={'text'}
                value={this.state.request}
                onChange={this.handleChangeRequest}
                onKeyUp={(event) => {
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


        <Dialog
          open={this.state.modalOpen}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Use Google's location service?"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Agree
            </Button>
          </DialogActions>
        </Dialog>

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
