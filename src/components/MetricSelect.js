import React, {useState, useEffect, useCallback } from 'react';
import { Container, LinearProgress } from '@material-ui/core';
import { Dropdown } from 'semantic-ui-react';
import { useQuery } from 'urql';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/actions'

    const queryMetrics = `
        query {
            getMetrics
        }
    `;
    
    const getMetric = state => {
        const getMetrics = state.metric.getMetrics;
        return getMetrics;
    }

    // const selectedMetric = state => {
    //     const selectedMetrics = state.metric.selectedMetrics;
    //     return selectedMetrics;
    // }
    
    export default () => {
            return <MetricSelect />
    }
    
    const metricListDropdown = (options, getMetrics) => {
        getMetrics.forEach(value => {
          let obj = { key: value, text: value, value: value };
          options.push(obj);
        });
        return options;
      };

   function MetricSelect() {
     
        const [selectedMetrics, setSelections] = useState({ value: [] });
        const dispatch = useDispatch();
        
        let query = queryMetrics;
        let [result] = useQuery({ query });
        const { fetching, data, error } = result;
        
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
            const { getMetrics }  = data;
            dispatch({ type: actions.METRICS_RECEIVED, getMetrics});
            }, 
        [dispatch, data, error, handleSelectionChange, selectedMetrics]
        );
        
        const getMetrics = useSelector(getMetric);
        //const selected = useSelector(selectedMetric);
        
        let options = []
        if (getMetrics.length !== 0) {
            options = metricListDropdown(options, getMetrics)
        }
                


        if (fetching) return <LinearProgress />
    
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

