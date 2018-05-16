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
    };

    this.list = React.createRef();
  }

  // events
  handleChangeRequest(event) {
    this.setState({
      request: event.target.value
    });
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

  // render
  render() {
    return (
      <div>
        <AppTopBar
          title="Digital Health Literacy"
          connecting={(privateKey) => {
            console.log(privateKey);
          }}
          disconnecting={(privateKey) => {
            console.log("disconnecting");
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
