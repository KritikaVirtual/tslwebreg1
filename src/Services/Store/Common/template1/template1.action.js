import axios from "axios";
import { USER_ACTION_TYPE } from "../../../Constant/user.constants";
import {
  displayErrorMessage,
  displaySuccessMessage,
  requestTokenHeader,
} from "../../../Helpers/helper";
import api from "../../../Axios/index";

export const getEventHeaderFooter = (postData) => async (dispatch) => {
  dispatch({ type: USER_ACTION_TYPE.GET_EVENT_HEADER_FOOTER_PENDING });
  try {
    const response = await api.get("api/v1/tslGetEventHeaderAndFooter", {
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
        type: USER_ACTION_TYPE.GET_EVENT_HEADER_FOOTER_SUCESS,
        payload: responce,
      });
    } else {
      const responce = {
        result: [],
        records: 0,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_EVENT_HEADER_FOOTER_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
    return dispatch({ type: USER_ACTION_TYPE.GET_EVENT_HEADER_FOOTER_ERROR });
  }
};

export const getRegTypesTemplate1 = (postData) => async (dispatch) => {
  dispatch({ type: USER_ACTION_TYPE.GET_REG_TYPES_TEMPLATE1_PENDING });
  try {
    const response = await api.get("api/v1/tslGetRegTypesTemplate1", {
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
        type: USER_ACTION_TYPE.GET_REG_TYPES_TEMPLATE1_SUCESS,
        payload: responce,
      });
    } else {
      const responce = {
        result: [],
        records: 0,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_REG_TYPES_TEMPLATE1_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
    return dispatch({ type: USER_ACTION_TYPE.GET_REG_TYPES_TEMPLATE1_ERROR });
  }
};

export const getFieldsForPersonalInformation = (postData) => async (dispatch) => {
  dispatch({ type: USER_ACTION_TYPE.GET_FIELDS_PERSONAL_INFORMATION_PENDING });
  try {
    const response = await api.get("api/v1/tslGetQuestionsConfigSName", {
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
        type: USER_ACTION_TYPE.GET_FIELDS_PERSONAL_INFORMATION_SUCESS,
        payload: responce,
      });
    } else {
      const responce = {
        result: [],
        records: 0,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_FIELDS_PERSONAL_INFORMATION_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
    return dispatch({ type: USER_ACTION_TYPE.GET_FIELDS_PERSONAL_INFORMATION_ERROR });
  }
};

export const getFieldsForAdditionalGuest = (postData) => async (dispatch) => {
  dispatch({ type: USER_ACTION_TYPE.GET_FIELDS_REGISTRANT_GUEST_PENDING });
  try {
    const response = await api.get("api/v1/tslGetAdditionalFieldsVisible", {
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
        type: USER_ACTION_TYPE.GET_FIELDS_REGISTRANT_GUEST_SUCESS,
        payload: responce,
      });
    } else {
      const responce = {
        result: [],
        records: 0,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_FIELDS_REGISTRANT_GUEST_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
    return dispatch({ type: USER_ACTION_TYPE.GET_FIELDS_REGISTRANT_GUEST_ERROR });
  }
};

export const getSessionsTicketsDataTemplate1 = (postData) => async (dispatch) => {
  dispatch({ type: USER_ACTION_TYPE.GET_SESSIONS_TICKETS_DATA_TEMPLATE1_PENDING });
  try {
    const response = await api.get("api/v1/tslGetSessionsTicketsDataTemplate1", {
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
        type: USER_ACTION_TYPE.GET_SESSIONS_TICKETS_DATA_TEMPLATE1_SUCESS,
        payload: responce,
      });
    } else {
      const responce = {
        result: [],
        records: 0,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_SESSIONS_TICKETS_DATA_TEMPLATE1_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
    return dispatch({ type: USER_ACTION_TYPE.GET_SESSIONS_TICKETS_DATA_TEMPLATE1_ERROR });
  }
};

export const addTemplate1Data = (postData) => {
  return async (dispatch, getState) => {
    try {
      const response = await api.post("api/v1/tslInsertTemplate1RegistrantsData", postData, {
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

export const clearRegTypesTemplate1=()=>{
  return async (dispatch) => {
       dispatch({type: USER_ACTION_TYPE.RESET_REG_TYPES_TEMPLATE1})
  }
}