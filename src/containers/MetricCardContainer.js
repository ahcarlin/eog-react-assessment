import React from 'react';
import MetricCard from '../components/MetricCard';
import { Grid } from '@material-ui/core';
import { useSelectedMetrics, useMultipleMeasurements } from '../hooks/selectors';

export default function MetricCardContainer(state) {

    const getSelected = useSelectedMetrics();
    const getValue = useMultipleMeasurements();

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