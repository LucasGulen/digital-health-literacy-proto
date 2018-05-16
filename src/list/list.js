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

class CardsList extends Component {
    render() {
        const list = this.props.entries.map((entry) =>
            <CardEntry key={entry.id} entry={entry}/>
        );
        return <div>{list}</div>;
    }
}

export default CardsList;
