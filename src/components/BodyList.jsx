import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box';

import PostList from './PostList'
import PostPage from './PostPage'

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    box: {
        paddingTop: theme.spacing(1.5),
        paddingBottom: theme.spacing(1.5),
        [theme.breakpoints.up('sm')]: {
            paddingLeft: theme.spacing(1.5),
            paddingRight: theme.spacing(1.5)
        }
    },
})

class BodyList extends Component {
    state = {}
    render() {
        const { classes } = this.props
        return (
            <Box>
                <Container maxWidth="lg">
                    <Box className={classes.box}>
                        <div className={classes.root}>
                            <Grid container justify="center">
                                <Router>
                                    <Switch>
                                        <Route path="/" exact render={props => <PostList {...props} updateLabel={this.props.updateLabel} />} />
                                        <Route path="/([0-9]+)/([0-9]+)/([\.\-\w\S]+)" exact render={props => <PostPage {...props} updateLabel={this.props.updateLabel} />} />
                                        <Route path="/search/label/:label([\w\s]+)" exact render={props => <PostList {...props} updateLabel={this.props.updateLabel} isLabelPage={true} />} />
                                        <Route path="/search" exact render={props => <PostList {...props} updateLabel={this.props.updateLabel} isSearchPage={true} />} />
                                    </Switch>
                                </Router>
                            </Grid>
                        </div>
                    </Box>
                </Container>
            </Box>
        );
    }
}

export default withStyles(styles)(BodyList)