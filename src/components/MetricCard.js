import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    card: {
        maxWidth: 175,
        minWidth: 175,
        margin: '12px 0 12px 12px'
    },
    name: {
        fontSize: 14
    },
    value: {
        fontSize: 20,
        fontWeight: "bold"
    }
})

export default function MetricCard(props) {

    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography className={classes.name} component="p" variant="subtitle1">
                    {props.name}
                </Typography>
                <Typography className={classes.value} component="h2">
                    {props.value} {props.unit}
                </Typography>
            </CardContent>
        </Card>
    )
}