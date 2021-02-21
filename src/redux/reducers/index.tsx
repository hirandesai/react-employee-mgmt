import { combineReducers } from 'redux';
import employeeReducer from "./employeeReducer";

const appReducers = {
    employee: employeeReducer
};
const rootReducers = combineReducers(appReducers);

export default rootReducers;

