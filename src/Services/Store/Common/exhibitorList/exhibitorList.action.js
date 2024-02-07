import axios from "axios";
import { USER_ACTION_TYPE } from "../../../Constant/user.constants";
import {
  displayErrorMessage,
  displaySuccessMessage,
  requestTokenHeader,
} from "../../../Helpers/helper";
import api from "../../../Axios/index";

export const getExhibitorList = (postData) => async (dispatch) => {
  dispatch({ type: USER_ACTION_TYPE.GET_EXHIBITOR_LIST_PENDING });
  try {
    const response = await api.get("api/v1/tslGetExhibitorList", {
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
        type: USER_ACTION_TYPE.GET_EXHIBITOR_LIST_SUCESS,
        payload: responce,
      });
    } else {
      const responce = {
        result: "",
        records: 0,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_EXHIBITOR_LIST_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
    return dispatch({ type: USER_ACTION_TYPE.GET_EXHIBITOR_LIST_ERROR });
  }
};

export const addExhibitorInfo = (postData) => {
  return async (dispatch, getState) => {
    try {
      const response = await api.post("api/v1/tslAddExhibitorsInfo", postData, {
        headers: requestTokenHeader(),
      });
      if (response.data.errorCode === 0) {
        displaySuccessMessage("exhibitorAdded");
        const userId = localStorage.getItem("userId");
        const eventId = sessionStorage.getItem("eventId");
        dispatch(getExhibitorList({ lAccountID: userId, lEventID: eventId }));
      } else {
        displayErrorMessage("exhibitorAddedError");
        const responce = {
          result: "",
          records: 0,
          error_code: response.data.errorCode,
        };
        dispatch({
          type: USER_ACTION_TYPE.GET_EXHIBITOR_LIST_SUCESS,
          payload: responce,
        });
      }
    } catch (err) {
      displayErrorMessage(err.name);
      dispatch({ type: USER_ACTION_TYPE.GET_EXHIBITOR_LIST_ERROR });
    }
  };
};

export const getExhibitorListById = (postData) => async (dispatch) => {
  dispatch({ type: USER_ACTION_TYPE.GET_EXHIBITOR_LIST_BY_ID_PENDING });
  try {
    const response = await api.get("api/v1/tslGetExhibitorListById", {
      params: postData,
      headers: requestTokenHeader(),
    });
    if (response.data.errorCode === 0) {
      const userId = localStorage.getItem("userId");
      const eventId = sessionStorage.getItem("eventId");
      // dispatch(getExhibitorList({ lAccountID: userId, lEventID: eventId }));
      const responce = {
        result: response.data.data,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_EXHIBITOR_LIST_BY_ID_SUCESS,
        payload: responce,
      });
    } else {
      const responce = {
        result: "",
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_EXHIBITOR_LIST_BY_ID_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
    return dispatch({ type: USER_ACTION_TYPE.GET_EXHIBITOR_LIST_BY_ID_ERROR });
  }
};

export const updateExhibitorInfo = (postData) => {
  return async (dispatch) => {
    try {
      const response = await api.post(
        "api/v1/tslUpdateExhibitorInfo",
        postData,
        {
          headers: requestTokenHeader(),
        }
      );
      if (response.data.errorCode === 0) {
        var resultOutput = {};
        const userId = localStorage.getItem("userId");
        const eventId = sessionStorage.getItem("eventId");
        dispatch(getExhibitorList({ lAccountID: userId, lEventID: eventId }));
        displaySuccessMessage("dataSaved");
      } else {
        const responce = {
          result: "",
          records: 0,
          error_code: response.data.errorCode,
        };
        displayErrorMessage("dataSavedError");

        dispatch({
          type: USER_ACTION_TYPE.GET_EXHIBITOR_LIST_SUCESS,
          payload: responce,
        });
      }
    } catch (err) {
      displayErrorMessage(err.name);
      dispatch({ type: USER_ACTION_TYPE.GET_EXHIBITOR_LIST_ERROR });
    }
  };
};

export const addExhibitorImport = (postData) => {
  return async (dispatch, getState) => {
    try {
      const response = await api.post(
        "api/v1/tslAddExhibitorsImport",
        postData,
        {
          headers: requestTokenHeader(),
        }
      );
      if (response.data.errorCode === 0) {
        displaySuccessMessage("exhibitorAdded");
        const userId = localStorage.getItem("userId");
        const eventId = sessionStorage.getItem("eventId");
      } else {
        displayErrorMessage("exhibitorAddedError");
      }
    } catch (err) {
      displayErrorMessage(err.name);
    }
  };
};

export const addExhibitorBoothMembers = (postData) => {
  return async (dispatch, getState) => {
    try {
      const response = await api.post(
        "api/v1/tslAddExhibitorsBoothMembers",
        postData,
        {
          headers: requestTokenHeader(),
        }
      );
      if (response.data.errorCode === 0) {
        displaySuccessMessage("exhibitorAdded");
        const userId = localStorage.getItem("userId");
        const eventId = sessionStorage.getItem("eventId");
        const exhibitorId = sessionStorage.getItem("exhibitorId");
        dispatch(
          getExhibitorBoothMembers({
            lAccountID: userId,
            lEventID: eventId,
            lExhibitorID: exhibitorId,
          })
        );
      } else {
        displayErrorMessage("exhibitorBoothMembersAddedError");
        const responce = {
          result: "",
          records: 0,
          error_code: response.data.errorCode,
        };
        dispatch({
          type: USER_ACTION_TYPE.GET_EXHIBITOR_BOOTH_MEMBERS_SUCESS,
          payload: responce,
        });
      }
    } catch (err) {
      displayErrorMessage(err.name);
      dispatch({ type: USER_ACTION_TYPE.GET_EXHIBITOR_BOOTH_MEMBERS_ERROR });
    }
  };
};

export const getExhibitorBoothMembers = (postData) => async (dispatch) => {
  dispatch({ type: USER_ACTION_TYPE.GET_EXHIBITOR_BOOTH_MEMBERS_PENDING });
  try {
    const response = await api.get("api/v1/tslGetExhibitorBoothMembers", {
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
        type: USER_ACTION_TYPE.GET_EXHIBITOR_BOOTH_MEMBERS_SUCESS,
        payload: responce,
      });
    } else {
      const responce = {
        result: "",
        records: 0,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_EXHIBITOR_BOOTH_MEMBERS_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
    return dispatch({
      type: USER_ACTION_TYPE.GET_EXHIBITOR_BOOTH_MEMBERS_ERROR,
    });
  }
};

export const getExhibitorsBoothMembersByID = (postData) => async (dispatch) => {
  dispatch({ type: USER_ACTION_TYPE.GET_EVENT_DETAILS_PENDING });
  try {
    const response = await api.get("api/v1/tslGetExhibitorBoothMembersByID", {
      params: postData,
      headers: requestTokenHeader(),
    });
    if (response.data.errorCode === 0) {
      const userId = localStorage.getItem("userId");
      const eventId = sessionStorage.getItem("eventId");
      const exhibitorId = sessionStorage.getItem("exhibitorId");
      dispatch(getExhibitorBoothMembers({ lAccountID: userId, lEventID: eventId, lExhibitorID:exhibitorId }));
      const responce = {
        result: response.data.data,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_EXHIBITOR_BOOTH_MEMBERS_BY_ID_SUCESS,
        payload: responce,
      });
    } else {
      const responce = {
        result: "",
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_EXHIBITOR_BOOTH_MEMBERS_BY_ID_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
    return dispatch({
      type: USER_ACTION_TYPE.GET_EXHIBITOR_BOOTH_MEMBERS_BY_ID_ERROR,
    });
  }
};

export const updateExhibitorsBoothMember = (postData) => {
  return async (dispatch) => {
    try {
      const response = await api.post(
        "api/v1/tslUpdateExhibitorsBoothMembers",
        postData,
        {
          headers: requestTokenHeader(),
        }
      );
      if (response.data.errorCode === 0) {
        var resultOutput = {};
        const userId = localStorage.getItem("userId");
        const eventId = sessionStorage.getItem("eventId");
        const exhibitorId = sessionStorage.getItem("exhibitorId");
        dispatch(
          getExhibitorBoothMembers({
            lAccountID: userId,
            lEventID: eventId,
            lExhibitorID: exhibitorId,
          })
        );
        displaySuccessMessage("dataSaved");
      } else {
        const responce = {
          result: "",
          records: 0,
          error_code: response.data.errorCode,
        };
        displayErrorMessage("dataSavedError");

        dispatch({
          type: USER_ACTION_TYPE.GET_EXHIBITOR_BOOTH_MEMBERS_SUCESS,
          payload: responce,
        });
      }
    } catch (err) {
      displayErrorMessage(err.name);
      dispatch({ type: USER_ACTION_TYPE.GET_EXHIBITOR_BOOTH_MEMBERS_ERROR });
    }
  };
};

// export const eventListReset = (postData) => async (dispatch) => {
//     dispatch({ type: USER_ACTION_TYPE.RESET_EVENT_LIST });
// };
