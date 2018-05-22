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
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import FilterList from '@material-ui/icons/FilterList';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';


// HTTP
import axios from 'axios';

// My components
import Entry from './../entry/entry';
import AppTopBar from './../appbar/appbar';
import CardsList from './../list/list';

// Styles
import './homepage.css';

const allEntries = [];
const langues = new Set();
const populations = new Set();

class HomePage extends Component {

  constructor(props) {
    super(props);

    // get all the data
    this.getAllEntries();

    // binds
    this.handleChangeRequest = this.handleChangeRequest.bind(this);
    this.handleMakeRequest = this.handleMakeRequest.bind(this);
    this.handleAccesChanged = this.handleAccesChanged.bind(this);
    this.handleLangueChanged = this.handleLangueChanged.bind(this);
    this.handlePopulationChanged = this.handlePopulationChanged.bind(this);
    // state
    this.state = {
      request: '',
      madeFirstRequest: false,
      searchOpen: false,
      acces: 'Tous',
      langue: 'Toutes',
      population: 'Toutes',
    };

    // refs
    this.list = React.createRef();
  }

  //data
  async getAllEntries() {
    axios.get("http://groups.cowaboo.net/2018/group08/public/api/observatory?observatoryId=DHL")
      .then((response) => {
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
                parsedEntry.population
              )
            );
          }
          catch (error) {
          }
        }
        populations.delete('na');
        this.list.current.newData(allEntries);
      })
  }

  // events
  handleChangeRequest(event) {
    this.setState({
      request: event.target.value
    });
  }

  handleMakeRequest() {
    this.setState({ madeFirstRequest: true });
    this.filterContent();
  }

  handleAccesChanged(event) {
    this.setState({ acces: event.target.value },
      () => { this.filterContent() });
  }

  handleLangueChanged(event) {
    this.setState({ langue: event.target.value },
      () => { this.filterContent() }
    );
  }

  handlePopulationChanged(event) {
    this.setState({ population: event.target.value },
      () => { this.filterContent() }
    );
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
            <img className={this.state.madeFirstRequest ? "collapsed" : "active"} src={require("./../assets/images/logoHealth.svg")} alt="Digital Health Literacy Logo" width="200" />
          </Grid>

          <Grid item xs={12} style={{ width: '40%', flexDirection: 'column' }}>
            <FormControl style={{ width: '80%' }}>
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
            <span className={this.state.madeFirstRequest ? "show" : "hidden"}>
              <Button
                variant="fab"
                color="primary"
                aria-label="add"
                onClick={() => {
                  this.setState({ searchOpen: !this.state.searchOpen });
                }}
              >
                <FilterList />
              </Button>
            </span>
          </Grid>
        </Grid>

        <div >
          <Grid container >
            <Grid item lg={2} xs={false} />
            <Grid item lg={8} xs={12}>
              <Card style={{ marginTop: 10 }} className={this.state.searchOpen ? "search-show" : "search-hide"}>
                <CardContent>
                  <FormControl>
                    <FormHelperText>Accès</FormHelperText>

                    <Select
                      value={this.state.acces}
                      onChange={this.handleAccesChanged}
                      displayEmpty
                      name="Accès"
                    >
                      <MenuItem value={'Tous'}>Tous</MenuItem>
                      <MenuItem value={'Payant'}>Payants</MenuItem>
                      <MenuItem value={'Libre'}>Libres</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl>
                    <FormHelperText>Langue</FormHelperText>

                    <Select
                      value={this.state.langue}
                      onChange={this.handleLangueChanged}
                      displayEmpty
                      name="Accès"
                    >
                      <MenuItem value={'Toutes'}>Toutes</MenuItem>
                      { 
                        Array.from(langues.values()).map((langue, index) => {
                          return (
                            <MenuItem key={index} value={langue}>{langue}</MenuItem>

                          );
                        })
                      }
                    </Select>
                  </FormControl>

                  <FormControl>
                    <FormHelperText>Population</FormHelperText>

                    <Select
                      value={this.state.population}
                      onChange={this.handlePopulationChanged}
                      displayEmpty
                      name="Accès"
                    >
                      <MenuItem value={'Toutes'}>Toutes</MenuItem>
                      { 
                        Array.from(populations.values()).map((population, index) => {
                          return (
                            <MenuItem key={index} value={population}>{population}</MenuItem>

                          );
                        })
                      }
                    </Select>
                  </FormControl>
                </CardContent>
              </Card>
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
      </div>
    );
  }
}

export default HomePage;
