import React, { Component } from 'react';
import AppTopBar from './../appbar/appbar';
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

const decodeUriComponent = require('decode-uri-component');

class CardEntry extends Component {
    render() {
        return (
            <Card style={{ backgroundColor: '#efefef', marginTop: 10 }}>
                <CardContent>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography gutterBottom variant="headline" component="h2">
                                {this.props.entry.pathologie}
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography component="p">
                                Thème(s): {this.props.entry.themes}
                            </Typography>
                            <Typography component="p">
                                {this.props.typeSource}
                                    <a href={decodeUriComponent(this.props.entry.lienSource)}>
                                    {decodeUriComponent(this.props.entry.lienSource)}
                                    </a>
                            </Typography>
                            <Typography component="p">
                                Accès:{this.props.entry.acces}
                            </Typography>
                            <Typography component="p">
                                Société : {this.props.entry.societe}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography component="p">
                                Date: {this.props.entry.date}
                            </Typography>

                            <Typography component="p">
                                Langue: {this.props.entry.langue}
                            </Typography>
                            <Typography component="p">
                                Population: {this.props.entry.population}
                             </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }
}

export default CardEntry;
