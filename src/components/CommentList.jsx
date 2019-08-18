import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'

import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Typography from '@material-ui/core/Typography'
import Skeleton from '@material-ui/lab/Skeleton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import CardContent from '@material-ui/core/CardContent'

import Link from '@material-ui/core/Link'

import MoreVertIcon from '@material-ui/icons/MoreVert'
import ReplyIcon from '@material-ui/icons/Reply'
import DeleteIcon from '@material-ui/icons/Delete'

import { indigo, grey } from '@material-ui/core/colors'

import TimeAgo from 'react-timeago'
import { Box } from '@material-ui/core';

const styles = theme => ({
    avatar: {
        backgroundColor: indigo[500]
    },
    avatarTransparent: {
        backgroundColor: "transparent"
    },
    dateClass: {
        color: grey[500]
    },
    box: {
        paddingTop: theme.spacing(1.5),
        paddingBottom: theme.spacing(1.5),
        [theme.breakpoints.up('sm')]: {
            paddingLeft: theme.spacing(1.5),
            paddingRight: theme.spacing(1.5)
        }
    },
    card: {
        marginBottom: theme.spacing(2)
    },
    cardReply: {
        marginLeft: theme.spacing(4),
        marginBottom: theme.spacing(2)
    },
    commentContent: {
        padding: theme.spacing(0, 2, 2)
    },
    skeletonTitle: {
        margin: theme.spacing(1, 0)
    },
    skeletoSubHeader: {
        margin: theme.spacing(0, 0, 0.5, 0)
    },
    skeletonContent: {
        paddingBottom: theme.spacing(0)
    },
    skeletoText: {
        marginBottom: theme.spacing(1)
    },
    iconMarginRight: {
        marginRight: theme.spacing(1.5)
    }
})

class CommentList extends Component {
    state = {
        setAnchorEl: null,
        isReply: false,
        replyID: "",
        showOn: ""
    }
    render() {
        const { classes } = this.props
        return (
            <React.Fragment>
                {!this.props.isFetchComment ? ([...new Array(parseInt(this.props.totalComment))].map((arr, i) =>
                    <Card key={i} className={classes.card}>
                        <CardHeader
                            avatar={
                                <Skeleton variant="circle" width={40} height={40} className={classes.Avatar} />
                            }
                            title={
                                <Skeleton height={14} className={classes.skeletoSubHeader} />
                            }
                            subheader={
                                <Skeleton height={12} width="40%" className={classes.skeletoSubHeader} />
                            }
                        />
                        <Box className={classes.commentContent}>
                            <Skeleton height={16} className={classes.skeletoSubHeader} />
                        </Box>
                    </Card>
                )) : (
                        <React.Fragment>
                            {this.props.commentList.map((comment, i) => (
                                <React.Fragment key={i}>
                                    <Card className={classes.card}>
                                        <CardHeader
                                            avatar={comment.author[0].gd$image.src === "https://img1.blogblog.com/img/b16-rounded.gif" ? (<Avatar aria-label="photos" className={classes.avatar}>{comment.author[0].name.$t[0]}</Avatar>) : (<Avatar aria-label="photos" src={comment.author[0].gd$image.src} className={classes.avatarTransparent}></Avatar>)
                                            }
                                            action={
                                                <IconButton aria-label="Comment Option" aria-controls="Comment-menu" aria-haspopup="true" onClick={(event) => {
                                                    this.setState({ setAnchorEl: event.currentTarget, isReply: true, replyID: comment.id })
                                                }}>
                                                    <MoreVertIcon />
                                                </IconButton>
                                            }
                                            title={comment.author[0].name.$t}
                                            subheader={
                                                <Typography variant="caption" display="block" className={classes.dateClass}><TimeAgo date={comment.published.$t} /></Typography>
                                            }
                                        />

                                        <Box className={classes.commentContent}>
                                            {comment.content.$t}
                                        </Box>
                                    </Card>
                                    {!this.props.isComment && this.state.showOn === comment.id ? (
                                        <Card className={classes.cardReply}>
                                            <CardContent>
                                                <iframe title="iframe-comment" frameBorder="0" src={"//www.blogger.com/comment-iframe.g?blogID=" + this.props.blogID + "&postID=" + this.props.postID + "&parentID=" + comment.id + "&skin=contempo"} width="100%" height={this.props.iFrameHeight}></iframe>
                                            </CardContent>
                                        </Card>
                                    ) : null}
                                    {this.props.commentReplyList.filter(arr => arr.related === comment.id).map(reply => (
                                        <Card className={classes.cardReply} key={reply.id}>
                                            <CardHeader
                                                avatar={reply.author[0].gd$image.src === "https://img1.blogblog.com/img/b16-rounded.gif" ? (<Avatar aria-label="photos" className={classes.avatar}>{reply.author[0].name.$t[0]}</Avatar>) : (<Avatar aria-label="photos" src={reply.author[0].gd$image.src} className={classes.avatarTransparent}></Avatar>)
                                                }
                                                title={reply.author[0].name.$t}
                                                subheader={
                                                    <Typography variant="caption" display="block" className={classes.dateClass}><TimeAgo date={reply.published.$t} /></Typography>
                                                }
                                                action={
                                                    <IconButton aria-label="Comment Option" aria-controls="Comment-menu" aria-haspopup="true" onClick={(event) => {
                                                        this.setState({ setAnchorEl: event.currentTarget, isReply: false, replyID: reply.id })
                                                    }}>
                                                        <MoreVertIcon />
                                                    </IconButton>
                                                }
                                            />
                                            <Box className={classes.commentContent}>
                                                {reply.content.$t}
                                            </Box>
                                        </Card>
                                    ))}
                                </React.Fragment>
                            ))}
                            <Menu
                                id="Comment-menu"
                                anchorEl={this.state.setAnchorEl}
                                keepMounted
                                open={Boolean(this.state.setAnchorEl)}
                                onClose={() => {
                                    this.setState({ setAnchorEl: null })
                                }}
                            >
                                {this.state.isReply ? (<Box onClick={
                                    () => {
                                        this.setState({ setAnchorEl: null, showOn: this.state.replyID })
                                        this.props.newReply()
                                    }
                                }><MenuItem>
                                        <ReplyIcon className={classes.iconMarginRight} /> Reply
                                </MenuItem></Box>) : null}
                                <Link
                                    color="inherit"
                                    component="a"
                                    underline="none"
                                    href={"//www.blogger.com/delete-comment.g?blogID=" + this.props.blogID + "&postID=" + this.state.replyID}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <MenuItem><DeleteIcon className={classes.iconMarginRight} /> Delete</MenuItem>
                                </Link>
                            </Menu>
                        </React.Fragment>
                    )}
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(CommentList)