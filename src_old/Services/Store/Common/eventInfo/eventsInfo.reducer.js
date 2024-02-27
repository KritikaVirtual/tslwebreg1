import { USER_ACTION_TYPE } from "../../../Constant/user.constants";

const INITIAL_STATE = {
  blocking:false,
  eventField:[]
};
export const eventInfoReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {

    case USER_ACTION_TYPE.GET_EVENT_DETAILS_PENDING:
      return {
        blocking: true,
        eventField: [],
      };

    case USER_ACTION_TYPE.GET_EVENT_DETAILS_SUCESS:
      return {
        blocking: false,
        eventField: payload,
      };

    case USER_ACTION_TYPE.GET_EVENT_DETAILS_ERROR:
      return {
        blocking: false,
        eventField: [],
      };
      
    default:
      return state;
  }
};
