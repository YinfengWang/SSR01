import React from 'react';
import SimpleMDE from 'react-simplemde-editor';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';

import TextFiled from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import IconReply from '@material-ui/icons/Reply';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles} from '@material-ui/core/styles';

import Container from '../layout/Container';
import createStyles from './styles';
import {tabs} from '../../util/variable-define';


@inject((stores) => ({
    topicStore: stores.topicStore,
}))
@observer
class TopicCreate extends React.Component {
    constructor () {
        super();
        this.state = {
            title: '',
            tab: 'dev',
            content: '',
            open: false,
            message: '',
        };
    }
    handleTitleChange=(e) => {
        this.setState({
            title: e.target.value.trim(),
        });
    }
    handleContentChange=(value) => {
        this.setState({
            content: value,
        });
    }
    handleTabChange=(e) => {
        this.setState({
            tab: e.currentTarget.value,
        });
    }
    handleCreate=() => {
        const {title, tab, content} = this.state;
        if (!title) {
            this.showMessage('title 必须填写');
            return;
        } else if (!content) {
            this.showMessage('content 必须填写');
            return;
        }
        return this.props.topicStore.createTopic(title, tab, content)
            .then(() => {
                this.props.history.push('/list');
            })
            .catch((err) => {
                if (err.response) {
                    this.showMessage(err.response.data.error_msg);
                } else {
                    this.showMessage(err.message);
                }
            });
    }
    showMessage=(message) => {
        this.setState({
            open: true,
            message,
        });
    }
    handleClose =() => {
        this.setState({
            open: false,
        });
    }
    render () {
        const {classes} = this.props;
        const {message, open} = this.state;
        return (
            <Container>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    message={message}
                    open={open}
                    onClose={this.handleClose}
                />
                <div className={classes.root}>
                    <TextFiled
                        className={classes.title}
                        label='标题'
                        value={this.state.title}
                        onChange={this.handleTitleChange}
                        fullWidth
                    />
                    <SimpleMDE
                        onChange={this.handleContentChange}
                        value={this.state.newReplly}
                        options={{
                            toolbar: false,
                            spellChecker: false,
                            placeholder: '发表你的精彩意见',
                        }}
                    />
                    <div>
                        {
                            Object.keys(tabs).map((tab) => {
                                if (tab !== 'all' && tab !== 'good') {
                                    return (
                                        <span className={classes.selectItem}>
                                            <Radio
                                                value={tab}
                                                checked={tab === this.state.tab}
                                                onChange={this.handleTabChange}
                                            />
                                            {
                                                tabs[tab]
                                            }
                                        </span>
                                    );
                                }
                                return null;
                            })
                        }
                    </div>
                    <Button variant="contained" color="primary" onClick={this.handleCreate} className={classes.replayButton} >
                        <IconReply />
                    </Button>
                </div>
            </Container>
        );
    }
}
TopicCreate.wrappedComponent.propTypes = {
    topicStore: PropTypes.object.isRequired,
};
TopicCreate.propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};
export default withStyles(createStyles)(TopicCreate) ;
