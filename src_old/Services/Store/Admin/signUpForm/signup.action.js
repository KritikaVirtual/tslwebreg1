import axios from "axios";
import { USER_ACTION_TYPE } from "../../../Constant/user.constants";
import {  displaySuccessMessage,displayErrorMessage,requestTokenHeader } from "../../../Helpers/helper";
import api from "../../../Axios/index";

export const adminSignUp = (postData) => async (dispatch) => {
  dispatch({ type: USER_ACTION_TYPE.SET_USER_SIGNUP_PENDING });
  try {
    const response = await api.post("api/v1/tslAdminRegister",{ postData },
                                   {headers:requestTokenHeader()}
                                   );
    if (response.data.errorCode === 0) {
      return dispatch({
        type: USER_ACTION_TYPE.SET_USER_SIGNUP_SUCESS,
        payload: { result: JSON.stringify(response.data.result) },
      });
    } else if (response.data.errorCode === 1) {
      return dispatch({
        type: USER_ACTION_TYPE.SET_USER_SIGNUP_SUCESS,
        payload: { error: response.data.errorMessage },
      });
    }
  } catch (err) {
    return dispatch({ type: USER_ACTION_TYPE.SET_USER_SIGNUP_PENDING });
  }
};

export const adminSignUpReset = (postData) => async (dispatch) => {
    dispatch({ type: USER_ACTION_TYPE.RESET_USER_SIGNUP });
};
