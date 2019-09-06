import React, {useState, useEffect, useCallback } from 'react';
import { Container, LinearProgress } from '@material-ui/core';
import { Dropdown } from 'semantic-ui-react';
import { useQuery } from 'urql';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/actions'

const queryMultiple = `
query($input: [MeasurementQuery]) {
    getMultipleMeasurements(input: $input) {
        metric
        measurements {
            at
            value
            unit
        }
    }
}
`;

const getMetricName = state => {
    const names = []; 
    state.metric.getMultipleMeasurements.forEach(metric => {
        names.push(metric.metric);
    })
    return names;
}

export default () => {
    return <MetricSelect />;
}

const metricListDropdown = (options, getMetrics) => {
    getMetrics.forEach(value => {
        let obj = { key: value, text: value, value: value };
        options.push(obj);
    });
    return options;
    };
    
const now = new Date().valueOf();

function MetricSelect() {
    
    const [selectedMetrics, setSelections] = useState({ value: [] });
    const dispatch = useDispatch();

    let input = [
        {metricName: "tubingPressure", after: now - 6000, before: now},
        {metricName: "casingPressure", after: now - 6000, before: now},
        {metricName: "oilTemp", after: now - 6000, before: now},
        {metricName: "flareTemp", after: now - 6000, before: now},
        {metricName: "waterTemp", after: now - 6000, before: now},
        {metricName: "injValveOpen", after: now - 6000, before: now}
        ]
    
    let query = queryMultiple;

    let [result] = useQuery({
        query,
        variables: {input}
    });
    let { fetching, data, error } = result;
    
    const handleSelectionChange = useCallback((event, { value }) => {
        setSelections({ ...selectedMetrics, value });
    }, [selectedMetrics]);
    useEffect(
        () => {
        if (error) {
            dispatch({ type: actions.API_ERROR, error: error.message });
            return;
        }
        if (!data) return;
        if (handleSelectionChange) {
            dispatch({type: actions.METRIC_SELECTION_CHANGE, selectedMetrics});
        }
        const { getMultipleMeasurements } = data;
        dispatch({type: actions.MULTIPLE_MEASUREMENTS_RECEIVED, getMultipleMeasurements})
        }, 
    [dispatch, data, error, handleSelectionChange, selectedMetrics]
    );
    
    const getMetrics = useSelector(getMetricName);
    
    let options = [];
    if (getMetrics.length !== 0) {
        options = metricListDropdown(options, getMetrics)
    };

    if (fetching) return <LinearProgress />;

    return (
        <Container maxWidth="md">
            <Dropdown  
                placeholder='Select metric...'
                fluid
                selection
                search
                multiple
                clearable
                options={options}
                onChange={handleSelectionChange}
                style={{margin: "12px"}}
            />
            </Container>
    )
}

