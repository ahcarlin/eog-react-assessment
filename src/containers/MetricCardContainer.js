import React from 'react';
import MetricCard from '../components/MetricCard';
import { useDispatch } from 'react-redux';

export default function MetricCardContainer() {

    const dispatch = useDispatch();

    return (
        <div>
            <MetricCard />
        </div>
    )
}