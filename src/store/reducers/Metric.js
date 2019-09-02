import * as actions from '../actions';

const initialState = {
    getMetrics: [],
    selectedMetrics: []
}

const metricsReceived = (state, action) => {
  const {getMetrics} = action;
  return {...state, getMetrics}
}

const metricSelectionChange = (state, action) => {
  const selectedMetrics = action.selectedMetrics.value;
  return {...state, selectedMetrics}
}

const handlers = {
  [actions.METRICS_RECEIVED]: metricsReceived,
  [actions.METRIC_SELECTION_CHANGE]: metricSelectionChange
};
  
export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state, action);
};