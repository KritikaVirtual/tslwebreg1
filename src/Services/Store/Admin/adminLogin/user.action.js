import { USER_ACTION_TYPE } from '../../../Constant/user.constants';
import { API_URL } from '../../../../Config/config';
import {  displaySuccessMessage,displayErrorMessage,requestTokenHeader } from "../../../Helpers/helper";
import api from "../../../Axios/index";


export const checkLoginUser = (postData) => async dispatch => {
    
         dispatch({ type: USER_ACTION_TYPE.SET_CURRENT_USER_PENDING });
        try {
            const response = await api.post(API_URL+'api/v1/getTslAdminLogin',postData);
            if(response.data.errorCode===0){
                sessionStorage.setItem("adminToken",JSON.stringify(response.data.adminToken));
                displaySuccessMessage("adminLoginSucess");
                return dispatch({
                    type: USER_ACTION_TYPE.SET_CURRENT_USER_SUCESS,
                    payload: { adminToken:JSON.stringify(response.data.adminToken) },
                });
            }
            else if(response.data.errorCode===1){
                displayErrorMessage("notValidUser");
                return dispatch({
                    type: USER_ACTION_TYPE.SET_CURRENT_USER_SUCESS,
                    payload: { error: response.data.errorMessage },
                });
            }
        } catch (err) {
            displayErrorMessage(err.name);
            return  dispatch({ type:USER_ACTION_TYPE.SET_CURRENT_USER_ERROR });
        }
      };

export const adminSignUp = (postData) => async dispatch => {
    
        dispatch({ type: USER_ACTION_TYPE.SET_USER_SIGNUP_PENDING });
       try {
           const response = await api.post(API_URL+'api/v1/tslAdminRegister',{
                                          postData
                                        },{headers:requestTokenHeader()});
           if(response.data.errorCode===0){
               return dispatch({
                   type: USER_ACTION_TYPE.SET_USER_SIGNUP_SUCESS,
                   payload: { result : JSON.stringify(response.data.result) },
               });
           }
           else if(response.data.errorCode===1 || response.data.errorCode===2 || response.data.errorCode===3){
               return dispatch({
                   type: USER_ACTION_TYPE.SET_USER_SIGNUP_SUCESS,
                   payload: { error: response.data.errorMessage },
               });
           }
       } catch (err) {
           return  dispatch({ type:USER_ACTION_TYPE.SET_USER_SIGNUP_PENDING });
       }
     };      