import React from 'react'
import { makeStyles } from '@material-ui/core'
import { Badge } from '@material-ui/core'
const useStyles = makeStyles(theme => ({
    count: {
        marginRight: 17,
        color: 'white',
        background: '#3A8DFF',
        padding: 3,
        borderRadius: '40px',
        height: '25px',
        minWidth: '25px',
        width: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}))

const UnreadMessages = ({ count }) => {
    const classes = useStyles();
    return (
        <Badge className={classes.count}>
            {count}
        </Badge>
    )
}

export default UnreadMessages;
