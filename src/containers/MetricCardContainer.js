import React from 'react';
import MetricCard from '../components/MetricCard';
import { useSelector } from 'react-redux';

export default function MetricCardContainer() {

    const getSelected = useSelector(state => {
        return state.metric.selectedMetrics;
    })

    const renderCards = () => {
        return getSelected.map((name) =>{
            return <MetricCard key={name} name={name} />
        })
    }

    return (
        <div>
            {renderCards()}
        </div>
    )
}