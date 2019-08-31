import React, {useState, useEffect } from 'react';
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
     
        const [selections, setSelections] = useState({ value: [] });
        const dispatch = useDispatch();
        
        let query = queryMetrics;
        let [result] = useQuery({ query });
        const { fetching, data, error } = result;
        
        useEffect(
            () => {
            if (error) {
                dispatch({ type: actions.API_ERROR, error: error.message });
                return;
            }
            if (!data) return;
            const { getMetrics }  = data;
            dispatch({ type: actions.METRICS_RECEIVED, getMetrics });
            }, 
        [dispatch, data, error]
        );
        
        let options = []
        const getMetrics = useSelector(getMetric);
        if (getMetrics.length !== 0) {
            options = metricListDropdown(options, getMetrics)
        }
                
        const handleSelectionChange = (event, { value }) => {
            setSelections({ ...selections, value });
        };


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

