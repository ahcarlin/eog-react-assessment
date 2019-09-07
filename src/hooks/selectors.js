import React from 'react';
import { useSelector } from 'react-redux';

export function useSelectedMetrics() {
    const getSelected = useSelector(state => {
        return state.metric.selectedMetrics;
    })
    return getSelected;
}

export function useMultipleMeasurements() {
    const getValue = useSelector(state => {
        return state.metric.getMultipleMeasurements;
    })
    return getValue;
}