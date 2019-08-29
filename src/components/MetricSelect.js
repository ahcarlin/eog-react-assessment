import React, {useState, setState} from 'react';
import { Container } from '@material-ui/core';
import { Dropdown } from 'semantic-ui-react';

export default function MetricSelect() {

    const options = [
        {key: "tubingPressure", text: "Tubing Pressure", value: "tubingPressure"},
        {Key: "casingPressure", text: "Casing Pressure", value: "casingPressure"},
        {key: "oilTemp", text: "Oil Temp", value: "oilTemp"},
        {key: "flareTemp", text: "Flare Temp", value: "flareTemp"},
        {key: "waterTemp", text: "Water Temp", value: "waterTemp"},
        {key: "ingValveOpen", text: "Valve Open", value: "injValveOpen"}
    ]


        const [state, setState] = React.useState({
          switch: true,
          value: []
        });

    const handleSelectionChange = (event, { value }) => {
        setState({ ...state, value });
    };

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
            />
         </Container>
    )
}