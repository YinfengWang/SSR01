import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import dateFormat from 'dateformat';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';

import UserWrapper from './user';
import infoStyles from './styles/user-info-style';

const TopicItem = ((topic) => {
    const currentTopic = topic.topic;
    return (
        <ListItem>
            <Avatar src={currentTopic.author.avatar_url} />
            <ListItemText primary={currentTopic.title} secondary={`最新回复：${dateFormat(currentTopic.last_reply_at, 'yyyy-mm-dd HH:MM')}`} />
        </ListItem>
    );
});

@inject((stores) => ({
    appStore: stores.appStore,
    user: stores.appStore.user,
}))
@observer
class UserInfo extends Component {
    constructor (props) {
        super(props);
        this.state = {
            accesstoken: '',
            helpText: '',
        };
    }
    componentDidMount () {
        this.props.appStore.getUserDetail();
        this.props.appStore.getUserCollection();
    }
    handleOnClick =(e, id) => {
        debugger;
        this.props.history.push(`/detail/${id}`);
    }
    render () {
        const { classes } = this.props;
        const topics = this.props.user.detail.recentTopics;
        const replies = this.props.user.detail.recentReplies;
        const conllection = this.props.user.collection.list;
        return (
            <UserWrapper>
                <div className={classes.root}>
                    <Grid container spacing={10} alignItems='stretch'>
                        <Grid item xs={12} md={4}>
                            <Paper elevation={2}>
                                <Typography className={classes.partTitle}>
                                    <span>最近发布的话题</span>
                                </Typography>
                                <List>
                                    {
                                        topics.length > 0
                                            ? topics.map((topic) =>
                                                <div onClick={(e) => this.handleOnClick(e, topic.id)} key={topic.id}>
                                                    <TopicItem topic={topic} key={topic.id} />
                                                </div>)
                                            : <Typography align="center" >
                                               最新没有发布话题
                                            </Typography>
                                    }
                                </List>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Paper elevation={2}>
                                <Typography className={classes.partTitle}>
                                    <span>新的回复</span>
                                </Typography>
                                <List>
                                    {
                                        replies.length > 0
                                            ? replies.map((topic) =>
                                                <div onClick={(e) => this.handleOnClick(e, topic.id)} key={topic.id}>
                                                    <TopicItem topic={topic} key={topic.id} />
                                                </div>)
                                            : <Typography align="center" >
                                               最新没有新的回复
                                            </Typography>
                                    }
                                </List>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Paper elevation={2}>
                                <Typography className={classes.partTitle}>
                                    <span>收藏的话题</span>
                                </Typography>
                                <List>
                                    {
                                        conllection.length > 0
                                            ? conllection.map((topic) =>
                                                <div onClick={(e) => this.handleOnClick(e, topic.id)} key={topic.id}>
                                                    <TopicItem topic={topic} key={topic.id} />
                                                </div>)
                                            : <Typography align="center" >
                        还没收藏话题哦
                                            </Typography>
                                    }
                                </List>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </UserWrapper>
        );
    }
}
UserInfo.propTypes = {
    classes: PropTypes.object.isRequired,
};
UserInfo.wrappedComponent.propTypes = {
    appStore: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};
export default withStyles(infoStyles)(UserInfo);

