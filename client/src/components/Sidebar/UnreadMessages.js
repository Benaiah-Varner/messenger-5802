import React from 'react'
import { makeStyles } from '@material-ui/core'

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
        textAlign: 'center'
    }
}))

const UnreadMessages = ({ count }) => {
    const classes = useStyles()
    return (
        <div className={classes.count}>
            {count}
        </div>
    )
}

export default UnreadMessages;
