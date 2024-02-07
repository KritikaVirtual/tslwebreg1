import { USER_ACTION_TYPE } from "../../../Constant/user.constants";

const INITIAL_STATE = {
  blocking: false,
  fieldsRegistrant: [],
  sessionsTicketsDataTemplate21: []
};

export const template21Reducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {

      case USER_ACTION_TYPE.GET_FIELDS_REGISTRANT_PENDING:
        return {
          ...state,
          blocking: true,
          fieldsRegistrant: [],
        };
    
      case USER_ACTION_TYPE.GET_FIELDS_REGISTRANT_SUCESS:
        return {
          ...state,
          blocking: false,
          fieldsRegistrant: payload,
        };
    
      case USER_ACTION_TYPE.GET_FIELDS_REGISTRANT_ERROR:
        return {
          ...state,
          blocking: false,
          fieldsRegistrant: [],
        };
      case USER_ACTION_TYPE.GET_SESSIONS_TICKETS_DATA_TEMPLATE21_PENDING:
        return {
          ...state,
          blocking: true,
          sessionsTicketsDataTemplate21: [],
        };
    
      case USER_ACTION_TYPE.GET_SESSIONS_TICKETS_DATA_TEMPLATE21_SUCESS:
        return {
          ...state,
          blocking: false,
          sessionsTicketsDataTemplate21: payload,
        };
    
      case USER_ACTION_TYPE.GET_SESSIONS_TICKETS_DATA_TEMPLATE21_ERROR:
        return {
          ...state,
          blocking: false,
          sessionsTicketsDataTemplate21: [],
        };
      
    default:
      return state;
  }
};
