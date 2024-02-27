import { USER_ACTION_TYPE } from "../../../Constant/user.constants";

const INITIAL_STATE = {
  currentUser: [],
  loggedIn: false,
};
export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_ACTION_TYPE.SET_CURRENT_USER_PENDING:
      return {
        blocking: true,
        currentUser: [],
      };

    case USER_ACTION_TYPE.SET_CURRENT_USER_SUCESS:
      return {
        blocking: false,
        currentUser: payload,
      };

    case USER_ACTION_TYPE.SET_CURRENT_USER_ERROR:
      return {
        blocking: true,
        currentUser: [],
      };
      
    default:
      return state;
  }
};
