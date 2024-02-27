import { USER_ACTION_TYPE } from "../../../Constant/user.constants";

const INITIAL_STATE = {
  blocking: false,
  emailSetup: [],
};
export const emailSetupReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_ACTION_TYPE.GET_EMAIL_SETUP_PENDING:
      return {
        blocking: true,
        emailSetup: [],
      };

    case USER_ACTION_TYPE.GET_EMAIL_SETUP_SUCESS:
      return {
        blocking: false,
        emailSetup: payload,
      };

    case USER_ACTION_TYPE.GET_EMAIL_SETUP_ERROR:
      return {
        blocking: false,
        emailSetup: [],
      };

    default:
      return state;
  }
};
