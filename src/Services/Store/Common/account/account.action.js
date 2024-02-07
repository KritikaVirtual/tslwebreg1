import axios from "axios";
import { USER_ACTION_TYPE } from "../../../Constant/user.constants";
import {  displayErrorMessage, displaySuccessMessage,requestTokenHeader } from "../../../Helpers/helper";
import api from "../../../Axios/index";


export const deleteUserById = (userId) => async (dispatch, getState) => {
  try {
    const response = await api.post("api/v1/tslDeleteUser",{userId},
                                   { headers:requestTokenHeader() }
    );
    if (response.data.errorCode === 0) {
      const showList = {};
      const resultOutput = getState()
        .userListById.showList.result.map((data) => data)
        .filter((data) => data.lLoginID !== userId);
      showList.result = resultOutput;
      showList.records = getState().userListById.showList.records - 1;
      showList.errorCode = 0;
      displaySuccessMessage("userDelete");
      return dispatch({
        type: USER_ACTION_TYPE.SET_USER_LIST_SUCESS,
        payload: showList,
      });
    } else {
      displayErrorMessage("userDeleteError");
      const responce = {
        result: "",
        records: 0,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.SET_USER_LIST_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
    displayErrorMessage(err.name);
    return dispatch({ type: USER_ACTION_TYPE.SET_USER_LIST_ERROR });
  }
};

export const getUserListById = (postData) => async (dispatch) => {
  dispatch({ type: USER_ACTION_TYPE.SET_ACCOUNT_LIST_PENDING });
  try {
    const response = await api.get("api/v1/tslUserListById", {
                                    params: postData,
                                    headers:requestTokenHeader()
                                  });
    if (response.data.errorCode === 0) {
      const responce = {
        result: response.data.data,
        records: response.data.total_records,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.SET_ACCOUNT_LIST_SUCESS,
        payload: responce,
      });
    } else {
      const responce = {
        result: "",
        records: 0,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.SET_ACCOUNT_LIST_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
    return dispatch({ type: USER_ACTION_TYPE.SET_ACCOUNT_LIST_ERROR });
  }
};

export const addPaymentDetails =(postData)=>async(dispatch)=>{
  try {
    const response = await api.post("api/v1/tslAddPaymentDetails", postData,
                                  { headers:requestTokenHeader() }
    );
    if (response.data.errorCode === 0) {
       const showList={}
       showList.result=response.data.result;
       showList.errorCode=0;
       displaySuccessMessage("paymentAdded");
      return dispatch({
        type: USER_ACTION_TYPE.SET_PAYMENT_DETAILS_SUCESS,
        payload: showList,
      });

    }else{
      const responce={ result:'', error_code:response.data.errorCode }
      displayErrorMessage("paymentAddedError");
      return dispatch({
        type: USER_ACTION_TYPE.SET_PAYMENT_DETAILS_SUCESS,
        payload: responce,
      });
    } 
  } catch (err) {
    displayErrorMessage(err.name);
    return dispatch({ type: USER_ACTION_TYPE.SET_PAYMENT_DETAILS_ERROR });
  } 
}
export const addUserDetails = (postData) => async (dispatch, getState) => {
  try {
    const response = await api.post("api/v1/tslAddUsers",postData,
      { headers:requestTokenHeader() });
    if (response.data.errorCode === 0) {
      const resultOutput = getState().userListById.showList.result;
      resultOutput.push(response.data.result);
      const showList = {};
      showList.result = resultOutput;
      showList.records = getState().userListById.showList.records + 1;
      showList.errorCode = 0;
      displaySuccessMessage("userAdded");
      return dispatch({
        type: USER_ACTION_TYPE.SET_USER_LIST_SUCESS,
        payload: showList,
      });
    } else {
      displayErrorMessage("userAddedError");
      const responce = {
        result: "",
        records: 0,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.SET_USER_LIST_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
    displayErrorMessage(err.name);
    return dispatch({ type: USER_ACTION_TYPE.SET_USER_LIST_ERROR });
  }
};

export const editUserDetails = (postData) => 
 {
 return async (dispatch) => {
  try {
    const response = await api.post("api/v1/tslEditUser",postData,
    {
      headers: requestTokenHeader()
    });
    if (response.data.errorCode === 0) {
      var resultOutput={};
      const userId = localStorage.getItem('userId');
      resultOutput.userId=userId;
      resultOutput.search='';
      resultOutput.offset=0;
      displaySuccessMessage("userUpdated");
      dispatch(getUserListById(resultOutput));

    } else {
      const responce = {
        result: "",
        records: 0,
        error_code: response.data.errorCode,
      };
      displayErrorMessage("userUpdatedError");
      
       dispatch({
        type: USER_ACTION_TYPE.SET_USER_LIST_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
     displayErrorMessage(err.name);
     dispatch({ type: USER_ACTION_TYPE.SET_USER_LIST_ERROR });
  }
 }
};

export const editClientDetails = (postData) =>
{
  return async (dispatch, getState) => {
   try {
    //dispatch({ type: USER_ACTION_TYPE.SET_CLIENT_PENDING });
    const response = await api.post("api/v1/tslEditUser", postData,
      {
       headers:requestTokenHeader() 
      });
    if (response.data.errorCode === 0) {
      // dispatch({
      //   type: USER_ACTION_TYPE.SET_CLIENT_SUCESS,
      //   payload: {result:"Client created sucessfully"},
      // });
      var resultOutput={};
      const userId = localStorage.getItem('userId');
      resultOutput.userId=userId;
      resultOutput.search='';
      resultOutput.offset=0;
      displaySuccessMessage("clientInfoSucess");
      if(userId){
        dispatch(getUserListById(resultOutput));
      }
    } else {
      const responce = {
        result: "",
        records: 0,
        error_code: response.data.errorCode,
      };
      displayErrorMessage("clientInfoError");
      return dispatch({
        type: USER_ACTION_TYPE.SET_USER_LIST_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
    displayErrorMessage(err.name);
    return dispatch({ type: USER_ACTION_TYPE.SET_CLIENT_ERROR });
  }
 }
};

export const getClientDetails = (params) =>{
  return async (dispatch, getState) => {
    try {
     dispatch({ type: USER_ACTION_TYPE.GET_ACCOUNT_CLIENT_PENDING });
     const response = await api.get("api/v1/tslGetClientInformation", {
          params,
          headers:requestTokenHeader(),
      });
      if (response.data.errorCode === 0) {
        dispatch({ type: USER_ACTION_TYPE.GET_ACCOUNT_CLIENT_SUCESS, payload: response.data.data });
      } else {
         dispatch({ type: USER_ACTION_TYPE.GET_ACCOUNT_CLIENT_SUCESS, payload:{} });
      }
    }catch (err) {
      dispatch({ type: USER_ACTION_TYPE.GET_ACCOUNT_CLIENT_ERROR });
   }
  } 
};

export const getPaymentDetails = (postData) => async (dispatch) => {
  dispatch({
    type: USER_ACTION_TYPE.GET_PAYMENT_DETAILS_PENDING,
  });
  try {
    const response = await api.get("api/v1/tslGetPaymentDetails", {
      params: postData,
      headers: requestTokenHeader(),
    });
    if (response.data.errorCode === 0) {
      const responce = {
        result: response.data.data,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_PAYMENT_DETAILS_SUCESS,
        payload: responce,
      });
    } else {
      const responce = {
        result: [],
        records: 0,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_PAYMENT_DETAILS_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
    return dispatch({
      type: USER_ACTION_TYPE.GET_PAYMENT_DETAILS_ERROR,
    });
  }
};

export const resetAccountPage=()=>{
  return async (dispatch) => {
       dispatch({type: USER_ACTION_TYPE.ACCOUNT_USER_ERROR})
  }
}