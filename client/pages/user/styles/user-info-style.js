export default (theme) => (
    {
        root: {
            padding: 16,
            minHeight: 400,
        },
        gridContainer: {
            height: '100%',
        },
        paper: {
            height: '100%',
        },
        partTitle: {
            lineHeight: '40px',
            paddingLeft: 20,
            backgroundColor: theme.palette.primary[700],
            color: '#fff',
        },
        '@medida screen add (max-width:480px)': {
            root: {
                padding: 10,
                minHeight: 300,
            },
        },
    }

);
