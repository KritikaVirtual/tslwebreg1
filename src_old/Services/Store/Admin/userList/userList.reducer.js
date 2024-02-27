import { USER_ACTION_TYPE } from "../../../Constant/user.constants";

const INITIAL_STATE = {
  userList: [],
  blocking:false,
};
export const userListReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_ACTION_TYPE.SET_USER_LIST_PENDING:
      return {
        blocking: true,
        userList: [],
      };

    case USER_ACTION_TYPE.SET_USER_LIST_SUCESS:
      return {
        blocking: false,
        userList: payload,
      };

    case USER_ACTION_TYPE.SET_USER_LIST_ERROR:
      return {
        blocking: true,
        userList: [],
      };

    case USER_ACTION_TYPE.RESET_USER_LIST:
      return {
        blocking: false,
        userList: [],
      };

    default:
      return state;
  }
};
