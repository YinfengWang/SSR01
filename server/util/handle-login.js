const router = require('express').Router();
const axios = require('axios');


const baseUrl = 'https://cnodejs.org/api/v1';

router.post('/login', function (req, res, next) {
    axios.post(`${baseUrl}/accesstoken`, {
        accesstoken: req.body.accessToken,
    })
        .then((resq) => {
            if (resq.status === 200 && resq.data.success) {
                req.session.user = {
                    accessToken: req.body.accessToken,
                    loginName: resq.data.loginname,
                    id: resq.data.id,
                    avatarUrl: resq.data.avatar_url,
                };
            }
            res.json({
                success: true,
                data: resq.data,
            });
        })
        .catch((err) => {
            if (err.response) {
                res.json({
                    success: true,
                    data: err.response.data,
                });
            } else {
                next(err);
            }
        });
});
module.exports = router;
