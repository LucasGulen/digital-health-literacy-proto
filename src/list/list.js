import React, { Component } from 'react';
import AppTopBar from './../appbar/appbar';
import CardEntry from './../card/card';
import Grid from 'material-ui/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Search from '@material-ui/icons/Search';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import InfiniteScroll from 'react-infinite-scroll-component';

const numberOfCardsToShow = 10;
class CardsList extends Component {

    constructor(props) {
        super(props);
        this.fetchData = this.fetchData.bind(this);

        this.state = {
            allEntries: [],
            itemsToShow: [],
            nextIndex: 0,
            hasMore: true,
        };
    }

    fetchData() {
        if (this.state.itemsToShow.length >= this.state.allEntries.length) {
            this.setState({ hasMore: false });
            return;
        }
        this.setState({
            itemsToShow: this.state.itemsToShow.concat(this.state.allEntries.splice(this.state.nextIndex, numberOfCardsToShow)),
            nextIndex: this.state.nextIndex + numberOfCardsToShow,
        });
    }

    newData(data) {

        this.setState({
            nextIndex: numberOfCardsToShow,
            allEntries: data,
            itemsToShow: data.splice(0, numberOfCardsToShow),
            hasMore: true,
        });
    }

    render() {
        return (
            <InfiniteScroll
                dataLength={this.state.itemsToShow.length} //This is important field to render the next data
                next={this.fetchData}
                hasMore={this.state.hasMore}
                loader={<div style={{ textAlign: 'center', minHeight: 50 }}><CircularProgress /></div>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Nous n'avons plus de références à vous afficher!</b>
                    </p>
                }>
                {this.state.itemsToShow.map((entry) =>
                    <CardEntry key={entry.id} entry={entry} />
                )}
            </InfiniteScroll>
        );
    }

}

export default CardsList;
