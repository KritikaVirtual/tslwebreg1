import { USER_ACTION_TYPE } from "../../../Constant/user.constants";
import {  displayErrorMessage, displaySuccessMessage,requestTokenHeader } from "../../../Helpers/helper";
import api from "../../../Axios/index";

export const getMainContactFields = (postData) => async (dispatch) => {
  dispatch({ type: USER_ACTION_TYPE.GET_MAIN_CONTACT_FIELD_PENDING });
  try {
   
    const response = await api.get("api/v1/tslGetMainContactFields", {
                                    params: postData,
                                    headers:requestTokenHeader()
                                  });
    if (response.data.errorCode === 0) {
      const responce = {
        result: response.data.data,
        error_code: response.data.errorCode,
      }; 
      return dispatch({
        type: USER_ACTION_TYPE.GET_MAIN_CONTACT_FIELD_SUCESS,
        payload: responce,
      });
    } else {
      const responce = {
        result: [],
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_MAIN_CONTACT_FIELD_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
    return dispatch({ type: USER_ACTION_TYPE.GET_MAIN_CONTACT_FIELD_ERROR });
  }
};

export const updateMainContactFields = (postData) => 
 {
 return async (dispatch) => {
  try {
    const response = await api.post("api/v1/tslUpdateMainContactFields",postData,
    {
      headers: requestTokenHeader()
    });
    if (response.data.errorCode === 0) {
      var resultOutput={};
      const userId = localStorage.getItem('userId');
      const eventId = sessionStorage.getItem('eventId');
      resultOutput.userId=userId;
      resultOutput.eventId=eventId;
      displaySuccessMessage("dataSaved");
    } else {
      const responce = {
        result: "",
        records: 0,
        error_code: response.data.errorCode,
      };
      displayErrorMessage("dataSavedError");
      
       dispatch({
        type: USER_ACTION_TYPE.GET_MAIN_CONTACT_FIELD_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
     displayErrorMessage(err.name);
     dispatch({ type: USER_ACTION_TYPE.GET_MAIN_CONTACT_FIELD_ERROR });
  }
 }
};

export const getRegistrantFields = (postData) => async (dispatch) => {
  dispatch({ type: USER_ACTION_TYPE.GET_REGISTRANT_FIELDS_PENDING });
  try {
   
    const response = await api.get("api/v1/tslGetRegistrantFields", {
                                    params: postData,
                                    headers:requestTokenHeader()
                                  });
    if (response.data.errorCode === 0) {
      const responce = {
        result: response.data.data,
        error_code: response.data.errorCode,
      }; 
      return dispatch({
        type: USER_ACTION_TYPE.GET_REGISTRANT_FIELDS_SUCESS,
        payload: responce,
      });
    } else {
      const responce = {
        result: [],
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_REGISTRANT_FIELDS_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
    return dispatch({ type: USER_ACTION_TYPE.GET_REGISTRANT_FIELDS_ERROR });
  }
};

export const updateRegistrantFields = (postData) => 
 {
 return async (dispatch) => {
  try {
    const response = await api.post("api/v1/tslUpdateRegistrantFields",postData,
    {
      headers: requestTokenHeader()
    });
    if (response.data.errorCode === 0) {
      var resultOutput={};
      const userId = localStorage.getItem('userId');
      const eventId = sessionStorage.getItem('eventId');
      resultOutput.userId=userId;
      resultOutput.eventId=eventId;
      displaySuccessMessage("dataSaved");
    } else {
      const responce = {
        result: "",
        records: 0,
        error_code: response.data.errorCode,
      };
      displayErrorMessage("dataSavedError");
      
       dispatch({
        type: USER_ACTION_TYPE.GET_REGISTRANT_FIELDS_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
     displayErrorMessage(err.name);
     dispatch({ type: USER_ACTION_TYPE.GET_REGISTRANT_FIELDS_ERROR });
  }
 }
};

export const getPageDesignGrpReg = (postData) => async (dispatch) => {
  dispatch({ type: USER_ACTION_TYPE.GET_PAGE_DESIGN_GRP_REG_PENDING });
  try {
    const response = await api.get("api/v1/tslGetPageDesignGrpReg", {
                                    params: postData,
                                    headers:requestTokenHeader()
                                  });
    if (response.data.errorCode === 0) {
      const responce = {
        result: response.data.data,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_PAGE_DESIGN_GRP_REG_SUCESS,
        payload: responce,
      });
    } else {
      const responce = {
        result: [],
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_PAGE_DESIGN_GRP_REG_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
    return dispatch({ type: USER_ACTION_TYPE.GET_PAGE_DESIGN_GRP_REG_ERROR });
  }
};

export const updatePageDesignGrpReg = (postData) => 
 {
 return async (dispatch) => {
  try {
    const response = await api.post("api/v1/tslUpdatePageDesignGrpReg",postData,
    {
      headers: requestTokenHeader()
    });
    if (response.data.errorCode === 0) {
      var resultOutput={};
      const userId = localStorage.getItem('userId');
      const eventId = sessionStorage.getItem('eventId');
      resultOutput.userId=userId;
      resultOutput.eventId=eventId;
      displaySuccessMessage("dataSaved");
    } else {
      const responce = {
        result: "",
        records: 0,
        error_code: response.data.errorCode,
      };
      displayErrorMessage("dataSavedError");
      
       dispatch({
        type: USER_ACTION_TYPE.GET_PAGE_DESIGN_GRP_REG_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
     displayErrorMessage(err.name);
     dispatch({ type: USER_ACTION_TYPE.GET_PAGE_DESIGN_GRP_REG_ERROR });
  }
 }
};