import * as actions from '../actions';

const initialState = {
    
}



const handlers = {
  };
  
  export default (state = initialState, action) => {
    const handler = handlers[action.type];
    if (typeof handler === "undefined") return state;
    return handler(state, action);
  };