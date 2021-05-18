const axios = require('axios');
const queryString = require('query-string');
const baseUrl = 'https://cnodejs.org/api/v1';


module.exports = function (req, res, next) {
    const path = req.path;
    const user = req.session.user || {};
    const needAccessToken = req.query.needAccessToken;
    if (needAccessToken && !user.accessToken) {
        res.status(401).send({
            succcess: false,
            msg: 'need login ',
        });
    }
    const query = Object.assign({}, req.query, {
        accesstoken: (needAccessToken && req.method === 'GET') ? user.accessToken : '',
    });
    if (query.needAccessToken) {delete query.needAccessToken;}

    axios(`${baseUrl}${path}`, {
        method: req.method,
        params: query,
        data: queryString.stringify(Object.assign({}, req.body, {
            accesstoken: (needAccessToken && req.method === 'POST') ? user.accessToken : '',
        })),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
        .then((resp) => {
            if (resp.status === 200) {
                res.send(resp.data);
            } else {
                res.status(resp.status).send(resp.data);
            }
        })
        .catch((err) => {
            // 测试创建话题返回接口
            if (path === '/topics') {
                res.status(200).send({
                    success: true,
                    data: {
                        success: true,
                        // eslint-disable-next-line camelcase
                        topic_id: '134242423432',
                    }});
            } else if (err.response) {
                res.status(500).send(err.response.data);
            } else {
                res.status(500).send({
                    success: false,
                    msg: '未知错误',
                });
            }
        });
};
