import { USER_ACTION_TYPE } from "../../../Constant/user.constants";

const INITIAL_STATE = {
  blocking: false,
  template1: [],
  regTypesTemplate1: [],
  fieldsPersonalInformation: [],
  fieldsRegGuest: [],
  sessionsTicketsDataTemplate1: []
};

export const template1Reducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_ACTION_TYPE.GET_EVENT_HEADER_FOOTER_PENDING:
      return {
        ...state,
        blocking: true,
        template1: [],
      };

    case USER_ACTION_TYPE.GET_EVENT_HEADER_FOOTER_SUCESS:
      return {
        ...state,
        blocking: false,
        template1: payload,
      };

    case USER_ACTION_TYPE.GET_EVENT_HEADER_FOOTER_ERROR:
      return {
        ...state,
        blocking: false,
        template1: [],
      };

    case USER_ACTION_TYPE.GET_REG_TYPES_TEMPLATE1_PENDING:
      return {
        ...state,
        blocking: true,
        regTypesTemplate1: [],
      };
  
    case USER_ACTION_TYPE.GET_REG_TYPES_TEMPLATE1_SUCESS:
      return {
        ...state,
        blocking: false,
        regTypesTemplate1: payload,
      };
  
    case USER_ACTION_TYPE.GET_REG_TYPES_TEMPLATE1_ERROR:
      return {
        ...state,
        blocking: false,
        regTypesTemplate1: [],
      };
    
    case USER_ACTION_TYPE.GET_FIELDS_PERSONAL_INFORMATION_PENDING:
      return {
        ...state,
        blocking: true,
        fieldsPersonalInformation: [],
      };
  
    case USER_ACTION_TYPE.GET_FIELDS_PERSONAL_INFORMATION_SUCESS:
      return {
        ...state,
        blocking: false,
        fieldsPersonalInformation: payload,
      };
  
    case USER_ACTION_TYPE.GET_FIELDS_PERSONAL_INFORMATION_ERROR:
      return {
        ...state,
        blocking: false,
        fieldsPersonalInformation: [],
      };
    
      case USER_ACTION_TYPE.GET_FIELDS_REGISTRANT_GUEST_PENDING:
        return {
          ...state,
          blocking: true,
          fieldsRegGuest: [],
        };
    
      case USER_ACTION_TYPE.GET_FIELDS_REGISTRANT_GUEST_SUCESS:
        return {
          ...state,
          blocking: false,
          fieldsRegGuest: payload,
        };
    
      case USER_ACTION_TYPE.GET_FIELDS_REGISTRANT_GUEST_ERROR:
        return {
          ...state,
          blocking: false,
          fieldsRegGuest: [],
        };
      
      case USER_ACTION_TYPE.GET_SESSIONS_TICKETS_DATA_TEMPLATE1_PENDING:
        return {
          ...state,
          blocking: true,
          sessionsTicketsDataTemplate1: [],
        };
      
      case USER_ACTION_TYPE.GET_SESSIONS_TICKETS_DATA_TEMPLATE1_SUCESS:
        return {
          ...state,
          blocking: false,
          sessionsTicketsDataTemplate1: payload,
        };
    
      case USER_ACTION_TYPE.GET_SESSIONS_TICKETS_DATA_TEMPLATE1_ERROR:
        return {
          ...state,
          blocking: false,
          sessionsTicketsDataTemplate1: [],
        };
      case USER_ACTION_TYPE.RESET_REG_TYPES_TEMPLATE1:
        return {
          ...state,
          blocking: false,
          regTypesTemplate1: [],
        };

    default:
      return state;
  }
};
