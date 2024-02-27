import { USER_ACTION_TYPE } from "../../../Constant/user.constants";

const INITIAL_STATE = {
  showList: [],
  blocking:false,
};

const PAYMENT_INITIAL_STATE = {
  showPaymentDetails: [],
  paymentDetails : [],
  blocking:false,
};
export const userListByIdReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_ACTION_TYPE.SET_ACCOUNT_LIST_PENDING:
      return {
        blocking: true,
        ...state,
        showList: [],
      };

    case USER_ACTION_TYPE.SET_ACCOUNT_LIST_SUCESS:
      return {
        blocking: false,
        ...state,
        showList: payload,
      };

    case USER_ACTION_TYPE.SET_ACCOUNT_LIST_ERROR:
      return {
        blocking: false,
        showList: [],
      };
     
    case USER_ACTION_TYPE.SET_CLIENT_PENDING:
        return {
          blocking: true,
          response: [],
    }; 

    case USER_ACTION_TYPE.SET_CLIENT_SUCESS:
        return {
          blocking: false,
          response: payload,
        };
  
    case USER_ACTION_TYPE.SET_CLIENT_ERROR:
        return {
          blocking: false,
          response: [],
        };
  
    case USER_ACTION_TYPE.GET_ACCOUNT_CLIENT_PENDING:
          return {
            blocking: true,
            ...state,
            mainClientresponse: [],
      }; 
  
    case USER_ACTION_TYPE.GET_ACCOUNT_CLIENT_SUCESS:
          return {
            blocking: false,
            ...state,
            mainClientresponse: payload,
      };
    
    case USER_ACTION_TYPE.GET_ACCOUNT_CLIENT_ERROR:
          return {
            blocking: false,
            mainClientresponse: [],
      };

    case USER_ACTION_TYPE.ACCOUNT_USER_ERROR:
        return {
          blocking: false,
          response: [],
          mainClientresponse: [],
          showList: [],
      };  

    default:
      return state;
  }
};

export const paymentDetailsReducer = (state = PAYMENT_INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_ACTION_TYPE.SET_PAYMENT_DETAILS_PENDING:
      return {
        blocking: true,
        showPaymentDetails: [],
      };

    case USER_ACTION_TYPE.SET_PAYMENT_DETAILS_SUCESS:
      return {
        blocking: false,
        showPaymentDetails: payload,
      };

    case USER_ACTION_TYPE.SET_PAYMENT_DETAILS_ERROR:
      return {
        blocking: false,
        showPaymentDetails: [],
      };

    case USER_ACTION_TYPE.RESET_USER_LIST:
      return {
        blocking: true,
        showPaymentDetails: [],
      };

    case USER_ACTION_TYPE.GET_PAYMENT_DETAILS_PENDING:
      return {
        blocking: true,
        paymentDetails: [],
      };

    case USER_ACTION_TYPE.GET_PAYMENT_DETAILS_SUCESS:
      return {
        blocking: false,
        paymentDetails: payload,
      };

    case USER_ACTION_TYPE.GET_PAYMENT_DETAILS_ERROR:
      return {
        blocking: false,
        paymentDetails: [],
      };

    default:
      return state;
  }
};
