import React from 'react';
import axios from 'axios';

const method = {
    getTopics: function () {
        axios.get('/api/topics')
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    },
    login: function () {
        axios.post('/api/user/login', {
            accessToken: '73eca09c-da35-42af-a3d0-22e457b07ed1',
        })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    },
    markAll: function () {
        axios.post('/api/message/mark_all?needAccessToken=true')
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    },
};


const Test = () => (
    <div>
        <button onClick={method.getTopics} >Topics</button>
        <button onClick={method.login} >login</button>
        <button onClick={method.markAll} >markAll</button>
    </div>
);

export default Test;
