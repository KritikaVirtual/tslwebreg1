import { USER_ACTION_TYPE } from "../../../Constant/user.constants";

const INITIAL_STATE = {
  eventList: [],
  blocking:false,
};
export const eventListReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_ACTION_TYPE.SET_EVENT_LIST_PENDING:
      return {
        blocking: true,
        eventList: [],
      };

    case USER_ACTION_TYPE.SET_EVENT_LIST_SUCESS:
      return {
        blocking: false,
        eventList: payload,
      };

    case USER_ACTION_TYPE.SET_EVENT_LIST_ERROR:
      return {
        blocking: true,
        eventList: [],
      };

    case USER_ACTION_TYPE.RESET_EVENT_LIST:
      return {
        blocking: true,
        eventList: [],
      };

    default:
      return state;
  }
};
