import { debug } from "webpack";
import actionTypes from "../actions/actionTypes";
const initalState={};
const employeeReducer = (state = initalState, action:any)=>
{
    switch (action.type) {
        case actionTypes.employee.get:
            return {...state, employees:action.payload};
        case actionTypes.employee.getone:
            return {...state,employee:action.payload};
        case actionTypes.employee.delete:            
        case actionTypes.employee.add:
        default:
            return state;
    }
};
export default employeeReducer;