// React
import React, { Component } from 'react';

// MaterialUI
import CircularProgress from '@material-ui/core/CircularProgress';

// Scroll component
import InfiniteScroll from 'react-infinite-scroll-component';

// My Components
import CardEntry from './../card/card';

// Global variables
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
            loading: true,
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
            loading: false,
        });
    }

    render() {
        if (this.state.loading) {
            return (
                <div style={{ textAlign: 'center', minHeight: 50 }}><CircularProgress /></div>
            );
        }
        /*if (Object.keys(this.state.allEntries).length === 0) {
            return (
                <p style={{ textAlign: 'center' }}>
                    <b>Aucune référence ne correspond à votre recherche !</b>
                </p>
            );
        }*/
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
