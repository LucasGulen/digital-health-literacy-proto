// React import
import React, { Component } from 'react';

// MaterialUIComponents
import Grid from 'material-ui/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

// MaterialUIIcons
import Check from '@material-ui/icons/Check';
import Warning from '@material-ui/icons/Warning';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import Create from '@material-ui/icons/Create';

// Helper functions
const decodeUriComponent = require('decode-uri-component');

class CardEntry extends Component {

    renderVerifie() {
        if (this.props.entry.verifie) {
            return <Check style={{ color: 'green' }} />
        }
        return <Warning style={{ color: 'orange' }} />;
    }

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
                        <Grid item xs={3}>
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
                        <Grid item xs={1}>
                            <div>
                                {this.renderVerifie()}
                                <Create />                                
                            </div>
                            <div>
                                <ThumbUp />                                
                                <ThumbDown />
                            </div>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }
}

export default CardEntry;
