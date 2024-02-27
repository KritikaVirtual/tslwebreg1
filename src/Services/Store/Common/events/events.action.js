import axios from "axios";
import { USER_ACTION_TYPE } from "../../../Constant/user.constants";
import {
  displayErrorMessage,
  displaySuccessMessage,
  requestTokenHeader,
} from "../../../Helpers/helper";
import api from "../../../Axios/index";

export const getEventList = (postData) => async (dispatch) => {
  dispatch({ type: USER_ACTION_TYPE.SET_EVENT_LIST_PENDING });
  try {
    const response = await api.get("api/v1/tslEventsList", {
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
        type: USER_ACTION_TYPE.SET_EVENT_LIST_SUCESS,
        payload: responce,
      });
    } else {
      const responce = {
        result: "",
        records: 0,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.SET_EVENT_LIST_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
    return dispatch({ type: USER_ACTION_TYPE.SET_EVENT_LIST_ERROR });
  }
};

export const addEventInfo = (postData) => {
  return async (dispatch, getState) => {
    try {
      const response = await api.post("api/v1/tslAddEvent", postData, {
        headers: requestTokenHeader(),
      });
      if (response.data.errorCode === 0) {
        const resultOutput = getState().eventList.eventList.result;
        resultOutput.unshift(response.data.result);

        const eventList = {};
        eventList.result = resultOutput;
        eventList.records = getState().eventList.eventList.records + 1;
        eventList.errorCode = 0;

        displaySuccessMessage("eventAdded");

        const userId = localStorage.getItem("userId");
        if (userId) {
          dispatch(getEventList({ userId }));
        }

        dispatch({
          type: USER_ACTION_TYPE.SET_EVENT_LIST_SUCESS,
          payload: eventList,
        });

        if (sessionStorage.getItem("eventId")) {
          sessionStorage.removeItem("eventId");
        }
        // if(sessionStorage.getItem('eventName')){
        //   sessionStorage.removeItem('eventName')
        // }
        // console.log('response',response)
        sessionStorage.set("eventId", response.data.result["insertId"]);
        sessionStorage.set("eventName", response.data.result["sName"]);
        // console.log('response.data.result.sName',response.data.result.sName)
      } else {
        displayErrorMessage("eventAddedError");
        const responce = {
          result: "",
          records: 0,
          error_code: response.data.errorCode,
        };
        dispatch({
          type: USER_ACTION_TYPE.SET_EVENT_LIST_SUCESS,
          payload: responce,
        });
      }
    } catch (err) {
      // displayErrorMessage(err.name);
      dispatch({ type: USER_ACTION_TYPE.SET_EVENT_LIST_ERROR });
    }
  };
};

export const eventListReset = (postData) => async (dispatch) => {
  dispatch({ type: USER_ACTION_TYPE.RESET_EVENT_LIST });
};
