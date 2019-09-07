import React from 'react';
import MetricCard from '../components/MetricCard';
import { useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';

export default function MetricCardContainer() {

    const getSelected = useSelector(state => {
        return state.metric.selectedMetrics;
    })

    const getValue = useSelector(state => {
        return state.metric.getMultipleMeasurements;
    })

    const renderCards = () => {
        return getSelected.map((name) => {
            for (let value of getValue) {
                if (value.metric === name) {
                    let lastIndex = value.measurements.length - 1;
                    return (
                        <Grid key={name} item>
                            <MetricCard 
                                name={name} 
                                value={value.measurements[lastIndex].value} 
                                unit={value.measurements[lastIndex].unit} 
                            />
                        </Grid>
                    )
                }
            }
            return null;
        })
    }

    return (
        <div>
            <Grid container>
                {renderCards()}
            </Grid>
        </div>
    )
}