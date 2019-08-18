import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Skeleton from '@material-ui/lab/Skeleton'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'

import Link from '@material-ui/core/Link'

import Button from '@material-ui/core/Button'
import Badge from '@material-ui/core/Badge'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'

import CommentIcon from '@material-ui/icons/Comment'
import ShareIcon from '@material-ui/icons/Share'

import { indigo, grey } from '@material-ui/core/colors'

import axios from 'axios'
import jsonpAdapter from 'axios-jsonp'
import LinesEllipsis from 'react-lines-ellipsis'
import TimeAgo from 'react-timeago'
import qs from 'qs'

const styles = theme => ({
    media: {
        height: 200,
    },
    box: {
        paddingTop: theme.spacing(1.5),
        paddingBottom: theme.spacing(1.5),
        [theme.breakpoints.up('sm')]: {
            paddingLeft: theme.spacing(1.5),
            paddingRight: theme.spacing(1.5)
        }
    },
    avatar: {
        backgroundColor: indigo[500]
    },
    avatarTransparent: {
        backgroundColor: "transparent"
    },
    dateClass: {
        color: grey[500]
    },
    optionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'inline-flex',
        }
    },
    optionMobile: {
        display: 'inline-flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        }
    },
    columnReverse: {
        flexDirection: 'column-reverse',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
        }
    },
    skeletonTitle: {
        margin: theme.spacing(1, 0)
    },
    skeletonAvatar: {
        margin: theme.spacing(0)
    },
    skeletoSubHeader: {
        margin: theme.spacing(0.5, 0)
    },
    lastPageText: {
        color: grey[500]
    },
    loadingMargin: {
        margin: theme.spacing(0, 2.5, 0, 0)
    }
})

class PostList extends Component {
    state = {
        isFetch: false,
        listPosts: [],
        listPerPage: 6,
        onPage: 1,
        setAnchorEl: null,
        shareURL: "",
        loadingBar: false
    }

    componentDidMount() {
        const { onPage, listPerPage } = this.state
        const url = this.props.isLabelPage ? "feeds/posts/default/-/" + this.props.match.params.label : "feeds/posts/default"
        const query = this.props.isSearchPage && qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).q ? "&q=" + qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).q : ""
        axios({
            url: `${process.env.NODE_ENV === "development" ? "//usereact.blogspot.com" : ""}/${url}?orderby=published&start-index=${onPage}&max-results=${listPerPage}&alt=json-in-script${query}`,
            adapter: jsonpAdapter,
            callbackParamName: 'c'
        }).then(res => {
            if (res.data.feed.entry) {
                const listPosts = res.data.feed.entry
                this.setState({ listPosts, isFetch: true, isLastPage: res.data.feed.entry.length !== 6 })
                this.props.updateLabel(res.data.feed.category)
            } else {
                this.setState({ isFetch: true, isLastPage: true })
                this.props.updateLabel(res.data.feed.category)
            }
        })
    }

    loadMore(event) {
        const { onPage, listPerPage, listPosts } = this.state
        this.setState({ loadingBar: true })
        const url = this.props.isLabelPage ? "feeds/posts/default/-/" + this.props.match.params.label : "feeds/posts/default"
        const query = this.props.isSearchPage && qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).q ? "&q=" + qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).q : ""
        axios({
            url: `${process.env.NODE_ENV === "development" ? "//usereact.blogspot.com" : ""}/${url}?orderby=published&start-index=${onPage * listPerPage + 1}&max-results=${listPerPage}&alt=json-in-script${query}`,
            adapter: jsonpAdapter,
            callbackParamName: 'c'
        }).then(res => {
            if (res.data.feed.entry) {
                const newListPosts = res.data.feed.entry
                this.setState({ listPosts: [...listPosts, ...newListPosts], onPage: onPage + 1, isLastPage: newListPosts.length !== 6, loadingBar: false })
            } else {
                this.setState({ isLastPage: true, loadingBar: false })
            }
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                {!this.state.isFetch ? ([...new Array(6)].map((arr, i) =>
                    <Grid item xs={12} sm={4} key={i} className={classes.box}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    <Skeleton height={19} className={classes.skeletonTitle} />
                                    <Skeleton height={19} className={classes.skeletonTitle} />
                                </Typography>
                            </CardContent>
                            <Skeleton variant="rect" className={classes.media} />
                            <CardHeader
                                avatar={
                                    <Skeleton variant="circle" width={40} height={40} className={classes.Avatar} />
                                }
                                title={
                                    <Skeleton height={16} className={classes.skeletoSubHeader} />
                                }
                                subheader={
                                    <Skeleton height={11} width="40%" className={classes.skeletoSubHeader} />
                                }
                            />
                        </Card>
                    </Grid>
                )) : null}
                {this.state.listPosts.map((post, i) =>
                    <Grid item xs={12} sm={4} key={i} className={classes.box}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    <Link
                                        color="inherit"
                                        underline="none"
                                        href={post.link.filter(arr => arr.rel === "alternate").map(arr => arr.href).toString()}
                                        component="a"
                                    ><LinesEllipsis text={post.title.$t} maxLine='2' ellipsis='...' trimRight basedOn='letters' /></Link>

                                </Typography>
                            </CardContent>
                            {post.media$thumbnail ? (
                                <CardMedia
                                    className={classes.media}
                                    image={post.media$thumbnail.url.replace("/s72-c/", "/s240/").replace(/^(https?:|)/, '')}
                                    title={post.title.$t}
                                />
                            ) : (
                                    <Skeleton variant="rect" className={classes.media} />
                                )}
                            <CardHeader
                                avatar={post.author[0].gd$image.src === "https://img1.blogblog.com/img/b16-rounded.gif" ? (<Avatar aria-label="photos" className={classes.avatar}>{post.author[0].name.$t[0]}</Avatar>) : (<Avatar aria-label="photos" src={post.author[0].gd$image.src} className={classes.avatarTransparent}></Avatar>)
                                }
                                action={
                                    <React.Fragment>
                                        <IconButton aria-label="Comment" className={classes.optionDesktop}>
                                            <Badge badgeContent={post.thr$total.$t} color="secondary">
                                                <CommentIcon />
                                            </Badge>
                                        </IconButton>
                                        <IconButton aria-label="Share" aria-controls="Share-menu" aria-haspopup="true" onClick={(event) => {
                                            const url = post.link.filter(arr => arr.rel === "alternate").map(arr => arr.href).toString()
                                            this.setState({ setAnchorEl: event.currentTarget, shareURL: url })
                                        }}>
                                            <ShareIcon />
                                        </IconButton>
                                    </React.Fragment>
                                }
                                title={post.author[0].name.$t}
                                subheader={
                                    <Typography variant="caption" display="block" className={classes.dateClass}><TimeAgo date={post.published.$t} /></Typography>
                                }
                            />
                        </Card>
                    </Grid>
                )}
                {
                    this.state.isLastPage ? null : (<Grid item xs={12} className={classes.box}><Box textAlign="center"><Button variant="contained" size="large" color="primary" disabled={this.state.loadingBar} onClick={(e) => {
                        this.loadMore()
                    }}>{this.state.loadingBar ? (<CircularProgress size={30} thickness={5} className={classes.loadingMargin} />) : null}Load More</Button></Box></Grid>)
                }
                <Menu
                    id="Share-menu"
                    anchorEl={this.state.setAnchorEl}
                    keepMounted
                    open={Boolean(this.state.setAnchorEl)}
                    onClose={() => {
                        this.setState({ setAnchorEl: null })
                    }}
                >
                    <Link
                        color="inherit"
                        component="a"
                        underline="none"
                        href={"//twitter.com/share?url=" + this.state.shareURL}
                        target="_blank"
                        rel="noreferrer"
                    ><MenuItem>Twitter</MenuItem></Link>
                    <Link
                        color="inherit"
                        component="a"
                        underline="none"
                        href={"//www.facebook.com/sharer/sharer.php?u=" + this.state.shareURL}
                        target="_blank"
                        rel="noreferrer"
                    ><MenuItem>Facebook</MenuItem></Link>
                </Menu>
            </React.Fragment >
        )
    }
}

export default withStyles(styles)(PostList)