import { USER_ACTION_TYPE } from '../../Constant/user.constants';

const INITIAL_STATE={
    currentClientUser:null,
    loggedIn: false
};
export const ClientReducer=(state=INITIAL_STATE, action)=>{
    const {type,payload}=action;
    switch(type){
            case USER_ACTION_TYPE.SET_CURRENT_CLIENT_PENDING:
                return {  
                            blocking : true,
                            currentClientUser: []
                        };

            case USER_ACTION_TYPE.SET_CURRENT_CLIENT_SUCESS:
                return {
                         blocking : false,
                         currentClientUser: payload
                       };

            case USER_ACTION_TYPE.SET_CURRENT_CLIENT_ERROR:
                return {
                        blocking : true,
                        currentClientUser: []
                       };
            default:
                return state;
         
    }
}