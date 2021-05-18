
export const topicPrimaryStyle = (theme) => ({
    root: {
        dispaly: 'flex',
        alignItems: 'center',
    },
    title: {
        color: '#555',
    },
    tab: {
        backgroundColor: theme.palette.primary[500],
        textAlign: 'center',
        dispaly: 'inline-block',
        padding: '0 6px',
        color: '#fff',
        boderRadius: '3px',
        marginRight: '20px',
        fontSize: '12px',
    },
    top: {
        backgroundColor: theme.palette.secondary[300],
    },
});
export const topicSecondaryStyle = (theme) => ({
    root: {
        dispaly: 'flex',
        alignItems: 'center',
        paddingTop: 3,
    },
    count: {
        textAlign: 'center',
        marginRight: '20px',
    },
    username: {
        marginRight: '20px',
        color: '9e9e9e',
    },
    accendColor: {
        color: theme.palette.secondary[300],
    },
});
// export default topicPrimaryStyle;
