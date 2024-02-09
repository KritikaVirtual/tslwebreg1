import { USER_ACTION_TYPE } from "../../../Constant/user.constants";

const INITIAL_STATE = {
  memberList: [],
  blocking: false,
};
export const memberListReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPE.SET_MEMBER_LIST_PENDING:
      return {
        blocking: true,
        memberList: [],
      };

    case USER_ACTION_TYPE.SET_MEMBER_LIST_SUCESS:
      return {
        blocking: false,
        memberList: payload,
      };

    case USER_ACTION_TYPE.SET_MEMBER_LIST_ERROR:
      return {
        blocking: true,
        memberList: [],
      };

    default:
      return state;
  }
};
