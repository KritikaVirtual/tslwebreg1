import axios from "axios";
import { USER_ACTION_TYPE } from "../../../Constant/user.constants";
import {
  displayErrorMessage,
  displaySuccessMessage,
  requestTokenHeader,
} from "../../../Helpers/helper";
import api from "../../../Axios/index";

export const getFieldsForRegistrant = (postData) => async (dispatch) => {
  dispatch({ type: USER_ACTION_TYPE.GET_FIELDS_REGISTRANT_PENDING });
  try {
    const response = await api.get("api/v1/tslRegistrantFieldsVisible", {
      params: postData,
      headers: requestTokenHeader(),
    });
    if (response.data.errorCode === 0) {
      const responce = {
        result: response.data.data,
        records: response.data.total_records,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_FIELDS_REGISTRANT_SUCESS,
        payload: responce,
      });
    } else {
      const responce = {
        result: [],
        records: 0,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_FIELDS_REGISTRANT_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
    return dispatch({ type: USER_ACTION_TYPE.GET_FIELDS_REGISTRANT_ERROR });
  }
};

export const getSessionsTicketsDataTemplate21 = (postData) => async (dispatch) => {
  dispatch({ type: USER_ACTION_TYPE.GET_SESSIONS_TICKETS_DATA_TEMPLATE21_PENDING });
  try {
    const response = await api.get("api/v1/tslgetSessionsTicketsDataTemplate21", {
      params: postData,
      headers: requestTokenHeader(),
    });
    if (response.data.errorCode === 0) {
      const responce = {
        result: response.data.data,
        records: response.data.total_records,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_SESSIONS_TICKETS_DATA_TEMPLATE21_SUCESS,
        payload: responce,
      });
    } else {
      const responce = {
        result: [],
        records: 0,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_SESSIONS_TICKETS_DATA_TEMPLATE21_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
    return dispatch({ type: USER_ACTION_TYPE.GET_SESSIONS_TICKETS_DATA_TEMPLATE21_ERROR });
  }
};

export const sendEmail = (postData) => {
  return async (dispatch, getState) => {
    try {
      const response = await api.post("api/v1/tslSendEmail", postData, {
        headers: requestTokenHeader(),
      });
    } catch (err) {
      displayErrorMessage(err.name);
    }
  };
};

export const addTemplate21Data = (postData) => {
  return async (dispatch, getState) => {
    try {
      const response = await api.post("api/v1/tslInsertTemplate21RegistrantsData", postData, {
        headers: requestTokenHeader(),
      });
      if (response.data.errorCode === 0) {
        displaySuccessMessage("dataSaved");
      } else {
        displayErrorMessage("dataSavedError");
      }
    } catch (err) {
      displayErrorMessage(err.name);
    }
  };
};

// export const clearRegTypesTemplate1=()=>{
//   return async (dispatch) => {
//        dispatch({type: USER_ACTION_TYPE.RESET_REG_TYPES_TEMPLATE1})
//   }
// }