import axios from "axios";
import { USER_ACTION_TYPE } from "../../../Constant/user.constants";
import {  displaySuccessMessage,displayErrorMessage,requestTokenHeader } from "../../../Helpers/helper";
import api from "../../../Axios/index";

export const getUserList = (postData) => async (dispatch) => {
  dispatch({ type: USER_ACTION_TYPE.SET_USER_LIST_PENDING });
  try {
    const response = await api.get(
      "api/v1/userList",
      { params: postData, headers:requestTokenHeader() }
    );
    if (response.data.errorCode === 0) {
      const responce={ result:response.data.data, records:response.data.total_records, error_code:response.data.errorCode }
      return dispatch({
        type: USER_ACTION_TYPE.SET_USER_LIST_SUCESS,
        payload: responce,
      });
    }else{
      const responce={ result:'', records:'', error_code:response.data.errorCode }
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

export const userListReset = () => async (dispatch) => {
    dispatch({ type: USER_ACTION_TYPE.RESET_USER_LIST });
};

export const addClientDetails = (postData) =>
{
  return async (dispatch, getState) => {
   try {
    //dispatch({ type: USER_ACTION_TYPE.SET_CLIENT_PENDING });
    console.log("postData",postData)
    const response = await api.post("api/v1/saveClientInformation", 
                                      postData,
                                     { headers:requestTokenHeader() });
    if (response.data.errorCode === 0) {
      // dispatch({
      //   type: USER_ACTION_TYPE.SET_CLIENT_SUCESS,
      //   payload: {result:"Client created sucessfully"},
      // });
      var resultOutput={};
      resultOutput.search='';
      resultOutput.offset=0;
      displaySuccessMessage("clientCreated");
      dispatch(getUserList(resultOutput));
    } else {
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
    return dispatch({ type: USER_ACTION_TYPE.SET_CLIENT_ERROR });
  }
 }
};
