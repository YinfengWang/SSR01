export const tabs = {
    all: '全部',
    share: '分享',
    job: '工作',
    ask: '问答',
    qood: '精品',
    dev: '测试',
};
export const topicSchema = {
    id: '',
    // eslint-disable-next-line camelcase
    author_id: '',
    tab: '',
    content: '',
    title: '',
    // eslint-disable-next-line camelcase
    last_reply_at: '',
    good: false,
    top: false,
    // eslint-disable-next-line camelcase
    reply_count: 0,
    // eslint-disable-next-line camelcase
    visit_count: 0,
    // eslint-disable-next-line camelcase
    create_at: '',
    author: {
        loginname: '',
        // eslint-disable-next-line camelcase
        avatar_url: '',
    },
};

export const replySchema = {
    id: '',
    author: {
        loginname: '',
        // eslint-disable-next-line camelcase
        avatar_url: '',
    },
    content: '',
    // eslint-disable-next-line camelcase
    ups: [],
    // eslint-disable-next-line camelcase
    create_at: '',
    // eslint-disable-next-line camelcase
    reply_id: null,
    // eslint-disable-next-line camelcase
    is_uped: false,

};
