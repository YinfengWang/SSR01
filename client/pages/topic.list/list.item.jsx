import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import {withStyles} from '@material-ui/core/styles';
import cx from 'classnames';
import dateformat from 'dateformat';

import { topicPrimaryStyle, topicSecondaryStyle} from './styles';
import { tabs } from '../../util/variable-define';


const Primary = ({classes, topic}) => {
    const className = cx({
        [classes.tab]: true,
        [classes.top]: topic.top,
    });
    return (
        <span className={classes.root}>
            <span className={className}>{topic.top ? '置顶' : tabs[topic.tab]}</span>
            <span className={classes.title}>{topic.title}</span>
        </span>
    );
};
Primary.propTypes = {
    topic: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
};
const StylePrimary = withStyles(topicPrimaryStyle)(Primary);

const Secondary = ({classes, topic}) => (
    <span className={classes.root}>
        <span className={classes.username}>{topic.author.loginname}</span>
        <span className={classes.count}>
            <span className={classes.accendColor}>{topic.reply_count}</span>
            <span>/</span>
            <span >{topic.visit_count}</span>
        </span>
        <span>创建时间：{dateformat(topic.create_at, 'yyyy-mm-dd HH:MM')}</span>
    </span>
);
Secondary.propTypes = {
    topic: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
};
const StyleSecondary = withStyles(topicSecondaryStyle)(Secondary);

const TopicListItem = ({onClick, topic}) => (
    <ListItem button onClick={onClick} >
        <ListItemAvatar>
            <Avatar src={topic.author.avatar_url} />
        </ListItemAvatar>
        <ListItemText primary={<StylePrimary topic={topic}/>} secondary={<StyleSecondary topic={topic}/>}/>
    </ListItem>
);
TopicListItem.propTypes = {
    onClick: PropTypes.func.isRequired,
    topic: PropTypes.object.isRequired,
};
export default TopicListItem;
