import { USER_ACTION_TYPE } from "../../../Constant/user.constants";
import {
  displayErrorMessage,
  displaySuccessMessage,
  requestTokenHeader,
} from "../../../Helpers/helper";
import api from "../../../Axios/index";

export const getPageDesignExhibitor = (postData) => async (dispatch) => {
  dispatch({ type: USER_ACTION_TYPE.GET_PAGE_DESIGN_EXHIBITOR_PENDING });
  try {
    const response = await api.get("api/v1/tslGetPageDesignExhibitor", {
      params: postData,
      headers: requestTokenHeader(),
    });
    if (response.data.errorCode === 0) {
      const responce = {
        result: response.data.data,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_PAGE_DESIGN_EXHIBITOR_SUCESS,
        payload: responce,
      });
    } else {
      const responce = {
        result: [],
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_PAGE_DESIGN_EXHIBITOR_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
    return dispatch({ type: USER_ACTION_TYPE.GET_PAGE_DESIGN_EXHIBITOR_ERROR });
  }
};

export const updatePageDesignExhibitor = (postData) => {
  return async (dispatch) => {
    try {
      const response = await api.post(
        "api/v1/tslUpdatePageDesignExhibitor",
        postData,
        {
          headers: requestTokenHeader(),
        }
      );
      if (response.data.errorCode === 0) {
        var resultOutput = {};
        const userId = localStorage.getItem("userId");
        const eventId = sessionStorage.getItem("eventId");
        resultOutput.userId = userId;
        resultOutput.eventId = eventId;
        displaySuccessMessage("dataSaved");
      } else {
        const responce = {
          result: "",
          records: 0,
          error_code: response.data.errorCode,
        };
        displayErrorMessage("dataSavedError");

        dispatch({
          type: USER_ACTION_TYPE.GET_PAGE_DESIGN_EXHIBITOR_SUCESS,
          payload: responce,
        });
      }
    } catch (err) {
      displayErrorMessage(err.name);
      dispatch({ type: USER_ACTION_TYPE.GET_PAGE_DESIGN_EXHIBITOR_ERROR });
    }
  };
};
