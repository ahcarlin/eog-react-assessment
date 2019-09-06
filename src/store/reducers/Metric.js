import * as actions from '../actions';

const initialState = {
    selectedMetrics: [],
    getMultipleMeasurements: []
}

const metricSelectionChange = (state, action) => {
  const selectedMetrics = action.selectedMetrics.value;
  return {...state, selectedMetrics}
}

const multipleMeasurementsReceived = (state, action) => {
  const {getMultipleMeasurements} = action;
  return {...state, getMultipleMeasurements}
}

const handlers = {
  [actions.METRIC_SELECTION_CHANGE]: metricSelectionChange,
  [actions.MULTIPLE_MEASUREMENTS_RECEIVED]: multipleMeasurementsReceived
};
  
export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state, action);
};