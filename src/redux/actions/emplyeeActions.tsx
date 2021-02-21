import axios from 'axios';
import config from "../../config";
import querystring from 'querystring';
import getHeaders from "./headers";
import actionTypes from "./actionTypes";

//@ts-ignore
export const getAllEmployees = (param:any) => dispatch => {
    dispatch(clearErrors());
    let queryParam = querystring.stringify(param);
    axios({
      method: 'GET',
      url: config.APIRootUrl +`users?${queryParam}`,
      headers: getHeaders()
    })
    .then(response => {
      dispatch({ type: actionTypes.employee.get, payload: response.data });
    })
    .catch(error => {
        dispatch({
            type: actionTypes.employee.error,
            payload: { companies : error.response.data}
        })
    });
}

//@ts-ignore
export const getDeleteEmployee = (id:string, callback:any) => dispatch => {
    dispatch(clearErrors());   
    axios({
      method: 'DELETE',
      url: config.APIRootUrl +`users/${id}`,
      headers: getHeaders()
    })
    .then(response => {
      debugger;
      dispatch({ type: actionTypes.employee.delete, payload: response.data });
      if(callback && typeof(callback) == "function")
      {
        callback();
      }      
    })
    .catch(error => {
        dispatch({
            type: actionTypes.employee.error,
            payload: { companies : error.response.data}
        })
    });
}
//@ts-ignore
export const addNewEmployee = (formData, callback:any) => dispatch => {  
    dispatch(clearErrors());   
    axios({
      method: 'POST',
      url: config.APIRootUrl +`users`,
      headers: getHeaders(),
      data:JSON.stringify(formData)
    })
    .then(response => {
      dispatch({ type: actionTypes.employee.add, payload: response.data });
      if(callback && typeof(callback) == "function")
      {
        console.log(response);
        callback();
      }
    })
    .catch(error => {
        dispatch({
            type: actionTypes.employee.error,
            payload: { companies : error.response.data}
        })
    });
}

//@ts-ignore
export const getEmployeeDetails = (id:string) => dispatch => {  
  dispatch(clearErrors());   
  axios({
    method: 'GET',
    url: config.APIRootUrl +`users/${id}`,
    headers: getHeaders()
  })
  .then(response => {
    dispatch({ type: actionTypes.employee.getone, payload: response.data.data });    
  })
  .catch(error => {
      dispatch({
          type: actionTypes.employee.error,
          payload: { companies : error.response.data}
      })
  });
}

export const clearErrors = () => {
    return {
        type: actionTypes.CLEAR_ERRORS
    };
};