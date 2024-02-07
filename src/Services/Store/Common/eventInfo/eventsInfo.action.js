import axios from "axios";
import { USER_ACTION_TYPE } from "../../../Constant/user.constants";
import {  displayErrorMessage, displaySuccessMessage,requestTokenHeader } from "../../../Helpers/helper";
import api from "../../../Axios/index";

export const getEventById = (postData) => async (dispatch) => {
  dispatch({ type: USER_ACTION_TYPE.GET_EVENT_DETAILS_PENDING });
  try {
    const response = await api.get("api/v1/tslGetEventById", {
                                    params: postData,
                                    headers:requestTokenHeader()
                                  });
    if (response.data.errorCode === 0) {
      const responce = {
        result: response.data.data,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_EVENT_DETAILS_SUCESS,
        payload: responce,
      });
    } else {
      const responce = {
        result: "",
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_EVENT_DETAILS_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
    return dispatch({ type: USER_ACTION_TYPE.GET_EVENT_DETAILS_ERROR });
  }
};

export const updateEventInfo = (postData) => 
 {
 return async (dispatch) => {
  try {
    const response = await api.post("api/v1/tslUpdateEventInfo",postData,
    {
      headers: requestTokenHeader()
    });
    if (response.data.errorCode === 0) {
      var resultOutput={};
      const userId = localStorage.getItem('userId');
      const eventId = sessionStorage.getItem('eventId');
      resultOutput.userId=userId;
      resultOutput.eventId=eventId;
      resultOutput.search='';
      resultOutput.offset=0;
      displaySuccessMessage("eventUpdated");
      dispatch(getEventById(resultOutput));
    } else {
      const responce = {
        result: "",
        records: 0,
        error_code: response.data.errorCode,
      };
      displayErrorMessage("eventUpdatedError");
      
       dispatch({
        type: USER_ACTION_TYPE.GET_EVENT_DETAILS_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
     displayErrorMessage(err.name);
     dispatch({ type: USER_ACTION_TYPE.GET_EVENT_DETAILS_ERROR });
  }
 }
};

export const addFieldsDataDefault = (postData) => 
 {
 return async (dispatch) => {
  try {
    const response = await api.post("api/v1/tslAddFieldsDataDefault",postData,
    {
      headers: requestTokenHeader()
    });
    if (response.data.errorCode === 0) {
      var resultOutput={};
      const userId = localStorage.getItem('userId');
      const eventId = sessionStorage.getItem('eventId');
    } else {
      const responce = {
        result: "",
        records: 0,
        error_code: response.data.errorCode,
      };
    }
  } catch (err) {
  }
 }
};

