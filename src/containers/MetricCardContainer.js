import React from 'react';
import MetricCard from '../components/MetricCard';
import { useSelector } from 'react-redux';

export default function MetricCardContainer() {

    const getSelected = useSelector(state => {
        return state.metric.selectedMetrics;
    })

    const getValue = useSelector(state => {
        return state.metric.getMultipleMeasurements;
    })

    function renderCards() {

        return getSelected.map((name) => {
            for (let value of getValue) {
                if (value.metric === name) {
                    let lastIndex = value.measurements.length - 1;
                    return (
                        <MetricCard 
                            key={name} 
                            name={name} 
                            value={value.measurements[lastIndex].value} 
                            unit={value.measurements[lastIndex].unit} 
                        />
                    )
                }
            }
            return null;
        })
    }

    return (
        <div>
            {renderCards()}
        </div>
    )
}