import { EMPLOYEES_FETCH_SUCCESS } from '../actions/type';

const INITIAL_STATE = {
  employees: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMPLOYEES_FETCH_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};
