import axios from "axios";
import { USER_ACTION_TYPE } from "../../../Constant/user.constants";
import {
  displayErrorMessage,
  displaySuccessMessage,
  requestTokenHeader,
} from "../../../Helpers/helper";
import api from "../../../Axios/index";

export const getEmailSetup = (postData) => async (dispatch) => {
  dispatch({ type: USER_ACTION_TYPE.GET_EMAIL_SETUP_PENDING });
  try {
    const response = await api.get("api/v1/tslGetEmailSetup", {
      params: postData,
      headers: requestTokenHeader(),
    });
    if (response.data.errorCode === 0) {
      const responce = {
        result: response.data.data,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_EMAIL_SETUP_SUCESS,
        payload: responce,
      });
    } else {
      const responce = {
        result: "",
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_EMAIL_SETUP_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
    return dispatch({ type: USER_ACTION_TYPE.GET_EMAIL_SETUP_ERROR });
  }
};

export const updateEmailSetup = (postData) => 
 {
 return async (dispatch) => {
  try {
    const response = await api.post("api/v1/tslUpdateEmailSetup",postData,
    {
      headers: requestTokenHeader()
    });
    if (response.data.errorCode === 0) {
      var resultOutput={};
      const userId = localStorage.getItem('userId');
      const eventId = sessionStorage.getItem('eventId');
      resultOutput.lAccountID=userId;
      resultOutput.lEventID=eventId;
      displaySuccessMessage("dataSaved");
      dispatch(getEmailSetup(resultOutput));
    } else {
      const responce = {
        result: "",
        records: 0,
        error_code: response.data.errorCode,
      };
      displayErrorMessage("dataSavedError");
    }
  } catch (err) {
     displayErrorMessage(err.name);
    //  dispatch({ type: USER_ACTION_TYPE.GET_EVENT_DETAILS_ERROR });
  }
 }
};