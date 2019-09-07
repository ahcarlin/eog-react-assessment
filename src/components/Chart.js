import React from 'react';
import { useQuery, useSubscription } from 'urql';
import { useDispatch } from 'react-redux';
import { useSelectedMetrics, useMultipleMeasurements } from '../hooks/selectors';
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Legend
} from 'recharts';

const subscription = `
    subscription {
        newMeasurement {
            metric
            at
            value
            unit
        }
    }
`;



export default () => {
    return <Chart />;
}

function Chart() {

    const getSelected = useSelectedMetrics();
    const getValue = useMultipleMeasurements();

    let query = subscription;

    let [result] = useSubscription({
        query
    })
    let { data, error } = result; 

    console.log(data)

    return (
    <div style={{marginRight: "57px"}}>
        <ResponsiveContainer height={420}>
            <LineChart
            >
                <CartesianGrid />
                <XAxis dataKey="metric" />
                <YAxis dataKey="value" scale="linear" />
                {/* Lines go here */}
                <Legend />
            </LineChart>
        </ResponsiveContainer>
    </div>
    )
}