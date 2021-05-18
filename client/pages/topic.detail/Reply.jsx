import { Avatar, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import marked from 'marked';
import React from 'react';
import dateformat from 'dateformat';
import {replyStyle} from './styles';

const Reply = ({reply, classes}) => (
    <div className={classes.root}>
        <div className={classes.left}>
            <Avatar src={reply.author.avatar_url}/>
        </div>
        <div className={classes.right}>
            <span>{`${reply.author.loginname}  ${dateformat(reply.create_at, 'yyyy-mm-dd HH:MM')}`}</span>
            {/* <p dangerouslySetInnerHTML={{_html: marked(reply.content)}} /> */}
            <p>{reply.content}</p>
        </div>
    </div>
);
Reply.propTypes = {
    reply: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
};
export default withStyles(replyStyle)(Reply);
