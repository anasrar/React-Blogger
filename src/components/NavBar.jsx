import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Container from '@material-ui/core/Container'
import Drawer from '@material-ui/core/Drawer'

import Avatar from '@material-ui/core/Avatar'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import LabelIcon from '@material-ui/icons/Label'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import MuiExpansionPanel from '@material-ui/core/ExpansionPanel'
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'

import { fade, withStyles } from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import { Box, Link } from '@material-ui/core';

const styles = theme => ({
    root: {
        flexGrow: 1,
        position: 'sticky',
        top: 0,
        zIndex: 999
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 10px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    profileMe: {
        padding: theme.spacing(2),
        textAlign: "center"
    },
    avatarMe: {
        marginRight: "auto",
        marginLeft: "auto",
        marginBottom: theme.spacing(1),
        width: "120px",
        height: "120px"
    },
    list: {
        width: 250
    },
    listParent: {
        width: "100%"
    },
    ListItem: {
        paddingLeft: theme.spacing(4)
    },
})

const ExpansionPanel = withStyles({
    root: {
        boxShadow: 'none',
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiExpansionPanel)

const ExpansionPanelSummary = withStyles(theme => ({
    root: {
        padding: theme.spacing(0, 2),
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
}))(MuiExpansionPanelSummary)

const ExpansionPanelDetails = withStyles(theme => ({
    root: {
        padding: theme.spacing(0),
    },
}))(MuiExpansionPanelDetails)

class NavBar extends Component {
    state = {
        isDrawerOpen: false,
        expandTags: true
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Container maxWidth="lg">
                        <Toolbar>
                            <IconButton
                                edge="start"
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="Open Drawer"
                                onClick={() => {
                                    this.setState({ isDrawerOpen: true })
                                }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography className={classes.title} variant="h6" noWrap>React Blogger</Typography>
                            <form className={classes.search} action="/search/">
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    placeholder="Search…"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                    name="q"
                                />
                            </form>
                        </Toolbar>
                    </Container>
                </AppBar>
                <Drawer
                    open={Boolean(this.state.isDrawerOpen)}
                    onClose={() => {
                        this.setState({ isDrawerOpen: false })
                    }}
                >
                    <div
                        className={classes.list}
                        role="presentation"
                    >
                        <div className={classes.drawerHeader}>
                            <IconButton onClick={() => {
                                this.setState({ isDrawerOpen: false })
                            }}>
                                <ChevronLeftIcon />
                            </IconButton>
                        </div>
                        <Divider />
                        <Box className={classes.profileMe} component="div">
                            <Avatar alt="Anas RAR" src="//avatars0.githubusercontent.com/u/38805204?v=4" className={classes.avatarMe} />
                            <Typography variant="h5" component="h1" gutterBottom>Anas RAR</Typography>
                            <Typography variant="caption" gutterBottom>I Hate Everything on This Universe</Typography>
                        </Box>
                        <Divider />
                        <ExpansionPanel square expanded={this.state.expandTags} onChange={() => {
                            this.setState(prefState => {
                                return { expandTags: !prefState.expandTags }
                            })
                        }}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="tags-content"
                                id="tags-header"
                            >

                                <Typography >Labels</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <List className={classes.listParent}>
                                    {this.props.label.sort((a, b) => (a.term > b.term) ? 1 : ((b.term > a.term) ? -1 : 0)).map((arr, i) => (
                                        <Link color="inherit"
                                            underline="none"
                                            href={"/search/label/" + arr.term}
                                            component="a"
                                            key={i}
                                        >
                                            <ListItem button className={classes.ListItem}>
                                                <ListItemIcon><LabelIcon /></ListItemIcon>
                                                <ListItemText primary={arr.term} />
                                            </ListItem>
                                        </Link>
                                    ))}
                                </List>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <Divider />
                    </div>
                </Drawer>
            </div >
        )
    }
}

export default withStyles(styles)(NavBar)