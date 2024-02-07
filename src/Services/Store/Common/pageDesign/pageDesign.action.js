import axios from "axios";
import { USER_ACTION_TYPE } from "../../../Constant/user.constants";
import {
  displayErrorMessage,
  displaySuccessMessage,
  requestTokenHeader,
} from "../../../Helpers/helper";
import api from "../../../Axios/index";

export const getPageDesignById = (postData) => async (dispatch) => {
  dispatch({ type: USER_ACTION_TYPE.GET_PAGE_DESIGN_PENDING });
  try {
    const response = await api.get("api/v1/tslGetPageDesign", {
      params: postData,
      headers: requestTokenHeader(),
    });
    if (response.data.errorCode === 0) {
      const responce = {
        result: response.data.data,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_PAGE_DESIGN_SUCESS,
        payload: responce,
      });
    } else {
      const responce = {
        result: [],
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_PAGE_DESIGN_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
    return dispatch({ type: USER_ACTION_TYPE.GET_PAGE_DESIGN_ERROR });
  }
};

export const getRegTypesPageDesign = (postData) => async (dispatch) => {
  dispatch({ type: USER_ACTION_TYPE.GET_REG_TYPES_PAGE_DESIGN_PENDING });
  try {
    const response = await api.get("api/v1/tslGetRegTypesPageDesign", {
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
        type: USER_ACTION_TYPE.GET_REG_TYPES_PAGE_DESIGN_SUCESS,
        payload: responce,
      });
    } else {
      const responce = {
        result: [],
        records: 0,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_REG_TYPES_PAGE_DESIGN_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
    return dispatch({ type: USER_ACTION_TYPE.GET_REG_TYPES_PAGE_DESIGN_ERROR });
  }
};

export const updatePageDesign = (postData) => {
  return async (dispatch) => {
    try {
      const response = await api.post(
        "api/v1/tslUpdateEventPageDesign",
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
        resultOutput.search = "";
        resultOutput.offset = 0;
        displaySuccessMessage("dataSaved");
      } else {
        const responce = {
          result: "",
          records: 0,
          error_code: response.data.errorCode,
        };
        displayErrorMessage("dataSavedError");

        dispatch({
          type: USER_ACTION_TYPE.GET_PAGE_DESIGN_SUCESS,
          payload: responce,
        });
      }
    } catch (err) {
      displayErrorMessage(err.name);
      dispatch({ type: USER_ACTION_TYPE.GET_PAGE_DESIGN_ERROR });
    }
  };
};

export const addRegistrationTypes = (postData) => {
  return async (dispatch, getState) => {
    try {
      const response = await api.post(
        "api/v1/tslInsertRegTypesPageDesign",
        postData,
        {
          headers: requestTokenHeader(),
        }
      );
      if (response.data.errorCode === 0) {
        const resultOutput = getState().pageDesign.regTypesPageDesign.result;
        resultOutput.push(response.data.result);
        const showList = {};
        showList.result = resultOutput;
        showList.records = getState().pageDesign.regTypesPageDesign.records + 1;
        showList.errorCode = 0;
        displaySuccessMessage("dataSaved");
        const lAccountID = localStorage.getItem("userId");
        const lEventID = sessionStorage.getItem("eventId");
        if (lAccountID && lEventID) {
          dispatch(getRegTypesPageDesign({ lAccountID, lEventID }));
        }
        dispatch({
          type: USER_ACTION_TYPE.GET_REG_TYPES_PAGE_DESIGN_SUCESS,
          payload: showList,
        });
      } else {
        const responce = {
          result: "",
          records: 0,
          error_code: response.data.errorCode,
        };
        if (responce.error_code == "2") {
          displayErrorMessage("dataExistError");
        } else {
          displayErrorMessage("dataSavedError");
        }
      }
    } catch (err) {
      displayErrorMessage(err.message);
      dispatch({ type: USER_ACTION_TYPE.GET_REG_TYPES_PAGE_DESIGN_ERROR });
    }
  };
};

export const getRegTypesByID = (postData) => async (dispatch) => {
  dispatch({ type: USER_ACTION_TYPE.GET_REG_TYPES_BY_ID_PENDING });
  try {
    const response = await api.get("api/v1/tslGetRegTypesByIdPageDesign", {
      params: postData,
      headers: requestTokenHeader(),
    });
    if (response.data.errorCode === 0) {
      const responce = {
        result: response.data.data,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_REG_TYPES_BY_ID_SUCESS,
        payload: responce,
      });
    } else {
      const responce = {
        result: [],
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_REG_TYPES_BY_ID_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
    return dispatch({ type: USER_ACTION_TYPE.GET_REG_TYPES_BY_ID_ERROR });
  }
};

export const updateRegistrationTypes = (postData) => {
  return async (dispatch) => {
    try {
      const response = await api.post(
        "api/v1/tslUpdateRegTypesPageDesign",
        postData,
        {
          headers: requestTokenHeader(),
        }
      );
      if (response.data.errorCode === 0) {
        var resultOutput = {};
        const userId = localStorage.getItem("userId");
        const eventId = sessionStorage.getItem("eventId");
        const regTypeId = sessionStorage.getItem("regTypeId");
        resultOutput.userId = userId;
        resultOutput.eventId = eventId;
        resultOutput.regTypeId = regTypeId;
        resultOutput.search = "";
        resultOutput.offset = 0;
        dispatch(
          getRegTypesPageDesign({ lAccountID: userId, lEventID: eventId })
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
          type: USER_ACTION_TYPE.GET_REG_TYPES_BY_ID_SUCESS,
          payload: responce,
        });
      }
    } catch (err) {
      displayErrorMessage(err.name);
      dispatch({ type: USER_ACTION_TYPE.GET_REG_TYPES_BY_ID_ERROR });
    }
  };
};

export const getRegCategoriesPageDesign = (postData) => async (dispatch) => {
  dispatch({ type: USER_ACTION_TYPE.GET_REG_CATEGORIES_PAGE_DESIGN_PENDING });
  try {
    const response = await api.get("api/v1/tslGetRegCategoriesPageDesign", {
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
        type: USER_ACTION_TYPE.GET_REG_CATEGORIES_PAGE_DESIGN_SUCESS,
        payload: responce,
      });
    } else {
      const responce = {
        result: [],
        records: 0,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_REG_CATEGORIES_PAGE_DESIGN_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
    return dispatch({
      type: USER_ACTION_TYPE.GET_REG_CATEGORIES_PAGE_DESIGN_ERROR,
    });
  }
};

export const addRegistrationCategories = (postData) => {
  return async (dispatch, getState) => {
    try {
      const response = await api.post(
        "api/v1/tslInsertRegCategoriesPageDesign",
        postData,
        {
          headers: requestTokenHeader(),
        }
      );
      if (response.data.errorCode === 0) {
        const resultOutput =
          getState().pageDesign.regCategoriesPageDesign.result;
        resultOutput.push(response.data.result);
        const showList = {};
        showList.result = resultOutput;
        showList.records =
          getState().pageDesign.regCategoriesPageDesign.records + 1;
        showList.errorCode = 0;
        displaySuccessMessage("dataSaved");
        const lAccountID = localStorage.getItem("userId");
        const lEventID = sessionStorage.getItem("eventId");
        if (lAccountID && lEventID) {
          dispatch(getRegCategoriesPageDesign({ lAccountID, lEventID }));
        }
        dispatch({
          type: USER_ACTION_TYPE.GET_REG_CATEGORIES_PAGE_DESIGN_SUCESS,
          payload: showList,
        });
      } else {
        const responce = {
          result: "",
          records: 0,
          error_code: response.data.errorCode,
        };

        if (responce.error_code == "2") {
          displayErrorMessage("dataExistError");
        } else {
          displayErrorMessage("dataSavedError");
        }
      }
    } catch (err) {
      displayErrorMessage(err.message);
      dispatch({ type: USER_ACTION_TYPE.GET_REG_CATEGORIES_PAGE_DESIGN_ERROR });
    }
  };
};

export const getSCodeRegCategory = (postData) => async (dispatch) => {
  dispatch({ type: USER_ACTION_TYPE.GET_REG_SCODE_PAGE_DESIGN_PENDING });
  try {
    const response = await api.get("api/v1/tslGetRegSCodePageDesign", {
      params: postData,
      headers: requestTokenHeader(),
    });
    if (response.data.errorCode === 0) {
      const responce = {
        result: response.data.data,
        error_code: response.data.errorCode,
      };

      return dispatch({
        type: USER_ACTION_TYPE.GET_REG_SCODE_PAGE_DESIGN_SUCESS,
        payload: responce,
      });
    } else {
      const responce = {
        result: [],
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_REG_SCODE_PAGE_DESIGN_PENDING,
        payload: responce,
      });
    }
  } catch (err) {
    return dispatch({
      type: USER_ACTION_TYPE.GET_REG_SCODE_PAGE_DESIGN_ERROR,
    });
  }
};

export const getRegCategoriesByID = (postData) => async (dispatch) => {
  dispatch({ type: USER_ACTION_TYPE.GET_REG_TYPES_BY_ID_PENDING });
  try {
    const response = await api.get("api/v1/tslGetRegCategoriesByIdPageDesign", {
      params: postData,
      headers: requestTokenHeader(),
    });
    if (response.data.errorCode === 0) {
      const responce = {
        result: response.data.data,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_REG_CATEGORIES_BY_ID_SUCESS,
        payload: responce,
      });
    } else {
      const responce = {
        result: [],
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_REG_CATEGORIES_BY_ID_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
    return dispatch({ type: USER_ACTION_TYPE.GET_REG_CATEGORIES_BY_ID_ERROR });
  }
};

export const updateRegistrationCategories = (postData) => {
  return async (dispatch) => {
    try {
      const response = await api.post(
        "api/v1/tslUpdateRegCategoriesPageDesign",
        postData,
        {
          headers: requestTokenHeader(),
        }
      );
      if (response.data.errorCode === 0) {
        var resultOutput = {};
        const userId = localStorage.getItem("userId");
        const eventId = sessionStorage.getItem("eventId");
        const regCategoryId = sessionStorage.getItem("regCategoryId");
        resultOutput.userId = userId;
        resultOutput.eventId = eventId;
        resultOutput.regCategoryId = regCategoryId;
        resultOutput.search = "";
        resultOutput.offset = 0;
        dispatch(
          getRegCategoriesPageDesign({ lAccountID: userId, lEventID: eventId })
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
          type: USER_ACTION_TYPE.GET_REG_CATEGORIES_BY_ID_SUCESS,
          payload: responce,
        });
      }
    } catch (err) {
      displayErrorMessage(err.name);
      dispatch({ type: USER_ACTION_TYPE.GET_REG_CATEGORIES_BY_ID_ERROR });
    }
  };
};

export const getRegTypeAmount = (postData) => async (dispatch) => {

  dispatch({ type: USER_ACTION_TYPE.GET_REG_TYPE_AMOUNT_PENDING });
  try {
    const response = await api.get("api/v1/tslGetRegTypeAmount", {
      params: postData,
      headers: requestTokenHeader(),
    });
    if (response.data.errorCode === 0) {
      const responce = {
        result: response.data.data,
        error_code: response.data.errorCode,
      };

      return dispatch({
        type: USER_ACTION_TYPE.GET_REG_TYPE_AMOUNT_SUCESS,
        payload: responce,
      });
    } else {
      const responce = {
        result: [],
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_REG_TYPE_AMOUNT_PENDING,
        payload: responce,
      });
    }
  } catch (err) {
    return dispatch({
      type: USER_ACTION_TYPE.GET_REG_TYPE_AMOUNT_ERROR,
    });
  }
};

export const getSessionPrice = (postData) => async (dispatch) => {

  dispatch({ type: USER_ACTION_TYPE.GET_SESSION_PRICE_PENDING });
  try {
    const response = await api.get("api/v1/tslGetSessionPrice", {
      params: postData,
      headers: requestTokenHeader(),
    });
    if (response.data.errorCode === 0) {
      const responce = {
        result: response.data.data,
        error_code: response.data.errorCode,
      };

      return dispatch({
        type: USER_ACTION_TYPE.GET_SESSION_PRICE_SUCESS,
        payload: responce,
      });
    } else {
      const responce = {
        result: [],
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_SESSION_PRICE_PENDING,
        payload: responce,
      });
    }
  } catch (err) {
    return dispatch({
      type: USER_ACTION_TYPE.GET_SESSION_PRICE_ERROR,
    });
  }
};

export const clearSessionPriceData=()=>{
  return async (dispatch) => {
       dispatch({type: USER_ACTION_TYPE.RESET_SESSION_PRICE})
  }
}
