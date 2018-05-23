import React, { Component } from "react";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Grid from 'material-ui/Grid';

import "./search.css";

class SearchComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            langue: 'Toutes',
            population: 'Toutes',
            acces: 'Tous',
            listLangues: undefined,
            listPopulation: undefined,
        };

        this.handleLangueChanged = this.handleLangueChanged.bind(this);
        this.handlePopulationChanged = this.handlePopulationChanged.bind(this);
        this.handleAccesChanged = this.handleAccesChanged.bind(this);
    }

    updateLists(listLangues, listPopulation) {
        this.setState({
            listLangues, listPopulation
        });
    }

    handleLangueChanged(event) {
        this.setState({ langue: event.target.value },
            this.props.langueChanged(event.target.value)
        );
    }

    handlePopulationChanged(event) {
        this.setState({ population: event.target.value },
            this.props.populationChanged(event.target.value)
        );
    }

    handleAccesChanged(event) {
        this.setState({ acces: event.target.value },
            this.props.accesChanged(event.target.value)
        );

    }

    renderLangues() {
        return (
            <Select
                value={this.state.langue}
                onChange={this.handleLangueChanged}
                displayEmpty
                name="Accès"
            >
                <MenuItem value={'Toutes'}>Toutes</MenuItem>
                {this.state.listLangues ?
                    Array.from(this.state.listLangues.values()).map((langue, index) => {
                        return (
                            <MenuItem key={index} value={langue}>{langue}</MenuItem>

                        );
                    })
                    : null
                }
            </Select>
        );
    }

    renderPopulations() {
        if (!this.state.listPopulation) { return; }
        return (
            <Select
                value={this.state.population}
                onChange={this.handlePopulationChanged}
                displayEmpty
                name="Accès"
            >
                <MenuItem value={'Toutes'}>Toutes</MenuItem>
                {
                    Array.from(this.state.listPopulation.values()).map((population, index) => {
                        return (
                            <MenuItem key={index} value={population}>{population}</MenuItem>

                        );
                    })
                }
            </Select>
        );
    }

    render() {
        return (
            <Card style={{ marginTop: 10 }} className={this.props.searchopen}>
                <CardContent>
                    <Grid container style={{ justifyContent: 'space-evenly' }}>
                        <Grid item xs={2}>
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
                        </Grid>
                        <Grid item xs={2}>

                            <FormControl>
                                <FormHelperText>Langue</FormHelperText>
                                {this.renderLangues()}
                            </FormControl>
                        </Grid>

                        <Grid item xs={2}>

                            <FormControl>
                                <FormHelperText>Population</FormHelperText>
                                {this.renderPopulations()}
                            </FormControl>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }
}

export default SearchComponent;
