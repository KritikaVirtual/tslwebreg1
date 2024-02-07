import axios from "axios";
import { USER_ACTION_TYPE } from "../../../Constant/user.constants";
import {  displayErrorMessage, displaySuccessMessage,requestTokenHeader } from "../../../Helpers/helper";
import api from "../../../Axios/index";

export const getFieldNameRegistrantsInfo = (postData) => async (dispatch) => {
  dispatch({ type: USER_ACTION_TYPE.GET_FIELDS_QA_DISC_SESSIONS_PENDING });
  try {
    const response = await api.get("api/v1/tslGetQuestionsFieldName", {
                                    params: postData,
                                    headers:requestTokenHeader()
                                  });
    if (response.data.errorCode === 0) {
      const responce = {
        result: response.data.data,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_FIELDS_QA_DISC_SESSIONS_SUCESS,
        payload: responce,
      });
    } else {
      const responce = {
        result: [],
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_FIELDS_QA_DISC_SESSIONS_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
    return dispatch({ type: USER_ACTION_TYPE.GET_FIELDS_QA_DISC_SESSIONS_ERROR });
  }
};

export const updateRegInfoFieldsPage = (postData) => 
 {
 return async (dispatch) => {
  try {
    const response = await api.post("api/v1/tslUpdateRegInfoFieldsPage",postData,
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
      // dispatch(getRegTypesPageDesign({lAccountID:userId, lEventID:eventId}))
      displaySuccessMessage("dataSaved");
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
     dispatch({ type: USER_ACTION_TYPE.GET_FIELDS_QA_DISC_SESSIONS_ERROR });
  }
 }
};

export const getGuestsRegistrantsFields = (postData) => async (dispatch) => {
  dispatch({ type: USER_ACTION_TYPE.GET_GUESTS_REGISTRANTS_FIELDS_PENDING });
  try {
    const response = await api.get("api/v1/tslGetguestsRegistrantsFields", {
                                    params: postData,
                                    headers:requestTokenHeader()
                                  });
    if (response.data.errorCode === 0) {
      const responce = {
        result: response.data.data,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_GUESTS_REGISTRANTS_FIELDS_SUCESS,
        payload: responce,
      });
    } else {
      const responce = {
        result: [],
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_GUESTS_REGISTRANTS_FIELDS_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
    return dispatch({ type: USER_ACTION_TYPE.GET_GUESTS_REGISTRANTS_FIELDS_ERROR });
  }
};

export const getCustomQuestions = (postData) => async (dispatch) => {
  dispatch({ type: USER_ACTION_TYPE.GET_CUSTOM_QUESTIONS_PENDING });
  try {
    const response = await api.get("api/v1/tslGetCustomQuestions", {
                                    params: postData,
                                    headers:requestTokenHeader()
                                  });
    if (response.data.errorCode === 0) {
      const responce = {
        result: response.data.data,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_CUSTOM_QUESTIONS_SUCESS,
        payload: responce,
      });
    } else {
      const responce = {
        result: [],
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_CUSTOM_QUESTIONS_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
    return dispatch({ type: USER_ACTION_TYPE.GET_CUSTOM_QUESTIONS_ERROR });
  }
};

export const updateGuestRegistrantsFields = (postData) => 
 {
 return async (dispatch) => {
  try {
    const response = await api.post("api/v1/tslUpdateGuestRegistrantsFields",postData,
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
      displaySuccessMessage("dataSaved");
    } else {
      const responce = {
        result: "",
        records: 0,
        error_code: response.data.errorCode,
      };
      displayErrorMessage("dataSavedError");
      
       dispatch({
        type: USER_ACTION_TYPE.GET_GUESTS_REGISTRANTS_FIELDS_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
     displayErrorMessage(err.name);
     dispatch({ type: USER_ACTION_TYPE.GET_GUESTS_REGISTRANTS_FIELDS_ERROR });
  }
 }
};

export const getRegistrantFieldInformation = (postData) => async (dispatch) => {
  dispatch({ type: USER_ACTION_TYPE.GET_REGISTRANT_FIELD_PENDING });
  try {
    const response = await api.get("api/v1/tslGetRegistrantInformation", {
                                    params: postData,
                                    headers:requestTokenHeader()
                                  });
    if (response.data.errorCode === 0) {
      const responce = {
        result: response.data.data,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_REGISTRANT_FIELD_SUCESS,
        payload: responce,
      });
    } else {
      const responce = {
        result: [],
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_REGISTRANT_FIELD_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
    return dispatch({ type: USER_ACTION_TYPE.GET_REGISTRANT_FIELD_ERROR });
  }
};

export const updateRegistrantFieldSetup = (postData) => 
 {
 return async (dispatch) => {
  try {
    const response = await api.post("api/v1/tslUpdateRegistrantFieldSetup",postData,
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
        type: USER_ACTION_TYPE.GET_REGISTRANT_FIELD_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
     displayErrorMessage(err.name);
     dispatch({ type: USER_ACTION_TYPE.GET_REGISTRANT_FIELD_ERROR });
  }
 }
};

export const addCustomQuestions = (postData) => 
 {
 return async (dispatch,getState) => {
  try {
    const response = await api.post("api/v1/tslInsertCustomQuestions",postData,
    {
      headers: requestTokenHeader()
    });
    if (response.data.errorCode === 0) {
      const resultOutput = getState().fieldQADiscSessions.customQuestions.result;
      resultOutput.push(response.data.result);
      const showList = {};
      showList.result = resultOutput;
      showList.records = getState().fieldQADiscSessions.customQuestions.records + 1;
      showList.errorCode = 0;
      displaySuccessMessage("dataSaved");
      const lAccountID = localStorage.getItem('userId')
      const lEventID = sessionStorage.getItem('eventId')
      if(lAccountID && lEventID){
        dispatch(getCustomQuestions({ lAccountID, lEventID }))
      }
      dispatch({
        type: USER_ACTION_TYPE.GET_CUSTOM_QUESTIONS_SUCESS,
        payload: showList,
      });
    } else {
      const responce = {
        result: "",
        records: 0,
        error_code: response.data.errorCode,
      };

      if(responce.error_code=='2'){
        displayErrorMessage("dataExistError");
      }else{
        displayErrorMessage("dataSavedError");
      }
      
      
    }
  } catch (err) {
     displayErrorMessage(err.message);
     dispatch({ type: USER_ACTION_TYPE.GET_CUSTOM_QUESTIONS_ERROR });
  }
 }
};

export const getCustomQuestionsById = (postData) => async (dispatch) => {
  dispatch({ type: USER_ACTION_TYPE.GET_CUSTOM_QUESTIONS_BY_ID_PENDING });
  try {
    const response = await api.get("api/v1/tslGetCustomQuestionsById", {
                                    params: postData,
                                    headers:requestTokenHeader()
                                  });
    if (response.data.errorCode === 0) {
      const responce = {
        result: response.data.data,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_CUSTOM_QUESTIONS_BY_ID_SUCESS,
        payload: responce,
      });
    } else {
      const responce = {
        result: [],
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_CUSTOM_QUESTIONS_BY_ID_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
    return dispatch({ type: USER_ACTION_TYPE.GET_CUSTOM_QUESTIONS_BY_ID_ERROR });
  }
};

export const updateCustomQuestionsById = (postData) => 
 {
 return async (dispatch) => {
  try {
    const response = await api.post("api/v1/tslupdateCustomQuestions",postData,
    {
      headers: requestTokenHeader()
    });
    // console.log('response',response)
    if (response.data.errorCode === 0) {
      var resultOutput={};
      const userId = localStorage.getItem('userId');
      const eventId = sessionStorage.getItem('eventId');
      resultOutput.userId=userId;
      resultOutput.eventId=eventId;
      resultOutput.search='';
      resultOutput.offset=0;
      displaySuccessMessage("dataSaved");
      dispatch(getCustomQuestions({lAccountID:userId, lEventID:eventId}))
    } else {
      const responce = {
        result: "",
        records: 0,
        error_code: response.data.errorCode,
      };
      if(responce.error_code=='2'){
        displayErrorMessage("dataExistError");
      }else{
        displayErrorMessage("dataSavedError");
      }
    }
  } catch (err) {
     displayErrorMessage(err.name);
     dispatch({ type: USER_ACTION_TYPE.GET_CUSTOM_QUESTIONS_ERROR });
  }
 }
};

export const getDiscountCodes = (postData) => async (dispatch) => {
  dispatch({ type: USER_ACTION_TYPE.GET_DISCOUNT_CODES_PENDING });
  try {
    const response = await api.get("api/v1/tslGetDiscountCodes", {
                                    params: postData,
                                    headers:requestTokenHeader()
                                  });
    if (response.data.errorCode === 0) {
      const responce = {
        result: response.data.data,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_DISCOUNT_CODES_SUCESS,
        payload: responce,
      });
    } else {
      const responce = {
        result: [],
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_DISCOUNT_CODES_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
    return dispatch({ type: USER_ACTION_TYPE.GET_DISCOUNT_CODES_ERROR });
  }
};

export const getDiscountCodesById = (postData) => async (dispatch) => {
  dispatch({ type: USER_ACTION_TYPE.GET_DISCOUNT_CODES_BY_ID_PENDING });
  try {
    const response = await api.get("api/v1/tslGetDiscountCodesById", {
                                    params: postData,
                                    headers:requestTokenHeader()
                                  });
    if (response.data.errorCode === 0) {
      const responce = {
        result: response.data.data,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_DISCOUNT_CODES_BY_ID_SUCESS,
        payload: responce,
      });
    } else {
      const responce = {
        result: [],
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_DISCOUNT_CODES_BY_ID_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
    return dispatch({ type: USER_ACTION_TYPE.GET_DISCOUNT_CODES_BY_ID_ERROR });
  }
};

export const addDiscountCodes = (postData) => 
 {
 return async (dispatch,getState) => {
  try {
    const response = await api.post("api/v1/tslInsertDiscountCodes",postData,
    {
      headers: requestTokenHeader()
    });
    if (response.data.errorCode === 0) {
      const resultOutput = getState().fieldQADiscSessions.discountCodes.result;
      resultOutput.push(response.data.result);
      const showList = {};
      showList.result = resultOutput;
      showList.records = getState().fieldQADiscSessions.discountCodes.records + 1;
      showList.errorCode = 0;
      displaySuccessMessage("dataSaved");
      const lAccountID = localStorage.getItem('userId')
      const lEventID = sessionStorage.getItem('eventId')
      if(lAccountID && lEventID){
        dispatch(getDiscountCodes({ lAccountID, lEventID }))
      }
      dispatch({
        type: USER_ACTION_TYPE.GET_DISCOUNT_CODES_SUCESS,
        payload: showList,
      });
    } else {
      const responce = {
        result: "",
        records: 0,
        error_code: response.data.errorCode,
      };

      if(responce.error_code=='2'){
        displayErrorMessage("dataExistError");
      }else{
        displayErrorMessage("dataSavedError");
      }
      
       
    }
  } catch (err) {
     displayErrorMessage(err.message);
     dispatch({ type: USER_ACTION_TYPE.GET_DISCOUNT_CODES_ERROR });
  }
 }
};

export const updateDiscountCodesById = (postData) => 
 {
 return async (dispatch) => {
  try {
    const response = await api.post("api/v1/tslUpdateDiscountCodes",postData, 
    {
      headers: requestTokenHeader()
    });
    // console.log('response',response)
    if (response.data.errorCode === 0) {
      var resultOutput={};
      const userId = localStorage.getItem('userId');
      const eventId = sessionStorage.getItem('eventId');
      resultOutput.userId=userId;
      resultOutput.eventId=eventId;
      resultOutput.search='';
      resultOutput.offset=0;
      displaySuccessMessage("dataSaved");
      dispatch(getDiscountCodes({lAccountID:userId, lEventID:eventId}))
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
     dispatch({ type: USER_ACTION_TYPE.GET_DISCOUNT_CODES_ERROR });
  }
 }
};

export const addIndividualSession = (postData) => 
 {
 return async (dispatch,getState) => {
  try {
    const response = await api.post("api/v1/tslInsertSessions",postData,
    {
      headers: requestTokenHeader()
    });
    if (response.data.errorCode === 0) {
      const resultOutput = getState().fieldQADiscSessions.individualSession.result;
      resultOutput.push(response.data.result);
      const showList = {};
      showList.result = resultOutput;
      showList.records = getState().fieldQADiscSessions.individualSession.records + 1;
      showList.errorCode = 0;
      displaySuccessMessage("dataSaved");
      const lAccountID = localStorage.getItem('userId')
      const lEventID = sessionStorage.getItem('eventId')
      if(lAccountID && lEventID){
        dispatch(getIndividualSession({ lAccountID, lEventID }))
      }
      dispatch({
        type: USER_ACTION_TYPE.GET_INDIVIDUAL_SESSION_SUCESS,
        payload: showList,
      });
    } else {
      const responce = {
        result: "",
        records: 0,
        error_code: response.data.errorCode,
      };

      if(responce.error_code=='2'){
        displayErrorMessage("dataExistError");
      }else{
        displayErrorMessage("dataSavedError");
      }
      
    }
  } catch (err) {
     displayErrorMessage(err.message);
     dispatch({ type: USER_ACTION_TYPE.GET_INDIVIDUAL_SESSION_ERROR });
  }
 }
};


export const getIndividualSession = (postData) =>async(dispatch)=>{
  dispatch({ type: USER_ACTION_TYPE.GET_INDIVIDUAL_SESSION_PENDING });
  try {
    const response = await api.get("api/v1/tslGetSessions", {
                                    params: postData,
                                    headers:requestTokenHeader()
                                  });
    if (response.data.errorCode === 0) {
      const responce = {
        result: response.data.data,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_INDIVIDUAL_SESSION_SUCESS,
        payload: responce,
      });
    } else {
      const responce = {
        result: [],
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_INDIVIDUAL_SESSION_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
    return dispatch({ type: USER_ACTION_TYPE.GET_INDIVIDUAL_SESSION_ERROR });
  }
}

export const getSessionById = (postData) => async(dispatch)=>{
  dispatch({ type: USER_ACTION_TYPE.GET_INDIVIDUAL_SESSION_BY_ID_PENDING });
  try {
    const response = await api.get("api/v1/tslGetSessionsById", {
                                    params: postData,
                                    headers:requestTokenHeader()
                                  });
    if (response.data.errorCode === 0) {
      const responce = {
        result: response.data.data,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_INDIVIDUAL_SESSION_BY_ID_SUCESS,
        payload: responce,
      });
    } else {
      const responce = {
        result: [],
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_INDIVIDUAL_SESSION_BY_ID_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
    return dispatch({ type: USER_ACTION_TYPE.GET_INDIVIDUAL_SESSION_BY_ID_ERROR });
  }
}

export const updateIndividualSessionById = (postData) => 
 {
 return async (dispatch) => {
  try {
    const response = await api.post("api/v1/tslUpdateSessions",postData, 
    {
      headers: requestTokenHeader()
    });
    // console.log('response',response)
    if (response.data.errorCode === 0) {
      var resultOutput={};
      const userId = localStorage.getItem('userId');
      const eventId = sessionStorage.getItem('eventId');
      resultOutput.userId=userId;
      resultOutput.eventId=eventId;
      resultOutput.search='';
      resultOutput.offset=0;
      displaySuccessMessage("dataSaved");
      dispatch(getIndividualSession({lAccountID:userId, lEventID:eventId}))
    } else {
      const responce = {
        result: "",
        records: 0,
        error_code: response.data.errorCode,
      };
      if(responce.error_code=='2'){
        displayErrorMessage("dataExistError");
      }else{
        displayErrorMessage("dataSavedError");
      }
    }
  } catch (err) {
     displayErrorMessage(err.name);
     dispatch({ type: USER_ACTION_TYPE.GET_INDIVIDUAL_SESSION_BY_ID_ERROR });
  }
 }
};

export const getExtraConfigurationForSession = (postData) =>async(dispatch)=>{
  dispatch({ type: USER_ACTION_TYPE.GET_EXTRA_CONFIG_SESSION_PENDING });
  try {
    const response = await api.get("api/v1/tslGetExtraConfigurationForSessions", {
                                    params: postData,
                                    headers:requestTokenHeader()
                                  });
    if (response.data.errorCode === 0) {
      const responce = {
        result: response.data.data,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_EXTRA_CONFIG_SESSION_SUCESS,
        payload: responce,
      });
    } else {
      const responce = {
        result: [],
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_EXTRA_CONFIG_SESSION_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
    return dispatch({ type: USER_ACTION_TYPE.GET_EXTRA_CONFIG_SESSION_ERROR });
  }
}

export const addExtraConfigurationForSessions = (postData) => 
 {
 return async (dispatch,getState) => {
  try {
    const response = await api.post("api/v1/tslAddExtraConfigurationForSessions",postData,
    {
      headers: requestTokenHeader()
    });
    if (response.data.errorCode === 0) {
      const resultOutput = getState().fieldQADiscSessions.extraConfigForSession.result;
      resultOutput.push(response.data.result);
      const showList = {};
      showList.result = resultOutput;
      // showList.records = getState().fieldQADiscSessions.extraConfigForSession.records + 1;
      showList.errorCode = 0;
      displaySuccessMessage("dataSaved");
      const lAccountID = localStorage.getItem('userId')
      const lEventID = sessionStorage.getItem('eventId')
      if(lAccountID && lEventID){
        dispatch(getExtraConfigurationForSession({ lAccountID, lEventID }))
      }
      dispatch({
        type: USER_ACTION_TYPE.GET_EXTRA_CONFIG_SESSION_SUCESS,
        payload: showList,
      });
    } else {
      const responce = {
        result: "",
        records: 0,
        error_code: response.data.errorCode,
      };
      if(responce.error_code=='2'){
        displayErrorMessage("dataExistError");
      }else{
        displayErrorMessage("dataSavedError");
      }
    }
  } catch (err) {
     displayErrorMessage(err.message);
     dispatch({ type: USER_ACTION_TYPE.GET_EXTRA_CONFIG_SESSION_ERROR });
  }
 }
};

export const getExtraConfigurationById = (postData) => async(dispatch)=>{
  dispatch({ type: USER_ACTION_TYPE.GET_INDIVIDUAL_SESSION_BY_ID_PENDING });
  try {
    const response = await api.get("api/v1/tslGetExtraConfigById", {
                                    params: postData,
                                    headers:requestTokenHeader()
                                  });
    if (response.data.errorCode === 0) {
      const responce = {
        result: response.data.data,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_EXTRA_CONFIG_SESSION_BY_ID_SUCESS,
        payload: responce,
      });
    } else {
      const responce = {
        result: [],
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_EXTRA_CONFIG_SESSION_BY_ID_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
    return dispatch({ type: USER_ACTION_TYPE.GET_EXTRA_CONFIG_SESSION_BY_ID_ERROR });
  }
}

export const updateExtraConfigForSessions = (postData) => 
 {
 return async (dispatch) => {
  try {
    const response = await api.post("api/v1/tslUpdateExtraConfigurationForSessions",postData, 
    {
      headers: requestTokenHeader()
    });
    // console.log('response',response)
    if (response.data.errorCode === 0) {
      var resultOutput={};
      const userId = localStorage.getItem('userId');
      const eventId = sessionStorage.getItem('eventId');
      resultOutput.userId=userId;
      resultOutput.eventId=eventId;
      resultOutput.search='';
      resultOutput.offset=0;
      displaySuccessMessage("dataSaved");
      dispatch(getExtraConfigurationForSession({lAccountID:userId, lEventID:eventId}))
    } else {
      const responce = {
        result: "",
        records: 0,
        error_code: response.data.errorCode,
      };
      if(responce.error_code=='2'){
        displayErrorMessage("dataExistError");
      }else{
        displayErrorMessage("dataSavedError");
      }
      
       dispatch({
        type: USER_ACTION_TYPE.GET_EXTRA_CONFIG_SESSION_BY_ID_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
     displayErrorMessage(err.name);
     dispatch({ type: USER_ACTION_TYPE.GET_EXTRA_CONFIG_SESSION_BY_ID_ERROR });
  }
 }
};