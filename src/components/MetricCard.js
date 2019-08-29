import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    card: {
        maxWidth: 275,
        margin: 12
    },
    name: {
        fontSize: 14
    },
    value: {
        fontSize: 18
    }
})

export default function MetricCard() {

    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography className={classes.name} component="p" variant="subtitle1">
                    Metric Name 
                </Typography>
                <Typography className={classes.value} component="h2">
                    Metric Value
                </Typography>
            </CardContent>
        </Card>
    )
}