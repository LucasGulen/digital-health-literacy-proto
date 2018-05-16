// React import
import React, { Component } from 'react';

// MaterialUI
import Grid from 'material-ui/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

// Helper functions
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
                                Thème(s): {this.props.entry.themes.join(", ")}
                            </Typography>
                            <Typography component="p" noWrap>
                                {this.props.typeSource}
                                    <a target="_blank" href={decodeUriComponent(this.props.entry.lienSource)}>
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
