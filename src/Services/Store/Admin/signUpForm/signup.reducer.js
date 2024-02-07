import { USER_ACTION_TYPE } from "../../../Constant/user.constants";

const INITIAL_STATE = {
  userStatus: []
};
export const signUpReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_ACTION_TYPE.SET_USER_SIGNUP_PENDING:
      return {
        blocking: true,
        userStatus: [],
      };

    case USER_ACTION_TYPE.SET_USER_SIGNUP_SUCESS:
      return {
        blocking: false,
        userStatus: payload,
      };

    case USER_ACTION_TYPE.SET_USER_SIGNUP_ERROR:
      return {
        blocking: true,
        userStatus: [],
      };

    case USER_ACTION_TYPE.RESET_USER_SIGNUP:
      return {
        blocking: true,
        userStatus: [],
      };

    default:
      return state;
  }
};
