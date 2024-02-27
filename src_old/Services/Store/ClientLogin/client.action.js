import axios from 'axios';
import { USER_ACTION_TYPE } from '../../Constant/user.constants';
import { API_URL } from '../../../Config/config';

export const checkLoginUser = (postData) => async dispatch => {
    
         dispatch({ type: USER_ACTION_TYPE.SET_CURRENT_CLIENT_PENDING });
        try {
            const headers = {
                'Access-Control-Allow-Origin' : '*',
              }
            const response = await axios.post(API_URL+'api/v1/tslClientLogin',postData,{headers});
            if(response.data.errorCode===0){
                sessionStorage.setItem("clientToken",JSON.stringify(response.data.token));
                if(localStorage.getItem("userId")){
                    localStorage.removeItem("userId")
                }
                localStorage.setItem("userId",JSON.stringify(response.data.userId));
                return dispatch({
                    type: USER_ACTION_TYPE.SET_CURRENT_CLIENT_SUCESS,
                    payload: { clientToken:JSON.stringify(response.data.token) },
                });
            }else if(response.data.errorCode===1){
                return dispatch({
                    type: USER_ACTION_TYPE.SET_CURRENT_CLIENT_SUCESS,
                    payload: { error: response.data.errorMessage },
                });
            }
        } catch (err) {
            return  dispatch({ type:USER_ACTION_TYPE.SET_CURRENT_CLIENT_ERROR });
        }
      };