import { USER_ACTION_TYPE } from "../../../Constant/user.constants";

const INITIAL_STATE = {
  exhibitorList: [],
  exhibitorListById: [],
  exhibitorBoothMembers: [],
  exhibitorBoothMembersByID: [],
  blocking: false,
};
export const exhibitorListReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_ACTION_TYPE.GET_EXHIBITOR_LIST_PENDING:
      return {
        blocking: true,
        exhibitorList: [],
      };

    case USER_ACTION_TYPE.GET_EXHIBITOR_LIST_SUCESS:
      return {
        blocking: false,
        exhibitorList: payload,
      };

    case USER_ACTION_TYPE.GET_EXHIBITOR_LIST_ERROR:
      return {
        blocking: true,
        exhibitorList: [],
      };

    case USER_ACTION_TYPE.GET_EXHIBITOR_BOOTH_MEMBERS_PENDING:
      return {
        blocking: true,
        exhibitorBoothMembers: [],
      };

    case USER_ACTION_TYPE.GET_EXHIBITOR_BOOTH_MEMBERS_SUCESS:
      return {
        blocking: false,
        exhibitorBoothMembers: payload,
      };

    case USER_ACTION_TYPE.GET_EXHIBITOR_BOOTH_MEMBERS_ERROR:
      return {
        blocking: true,
        exhibitorBoothMembers: [],
      };

    case USER_ACTION_TYPE.GET_EXHIBITOR_BOOTH_MEMBERS_BY_ID_PENDING:
      return {
        blocking: true,
        exhibitorBoothMembersByID: [],
      };

    case USER_ACTION_TYPE.GET_EXHIBITOR_BOOTH_MEMBERS_BY_ID_SUCESS:
      return {
        blocking: false,
        exhibitorBoothMembersByID: payload,
      };

    case USER_ACTION_TYPE.GET_EXHIBITOR_BOOTH_MEMBERS_BY_ID_ERROR:
      return {
        blocking: true,
        exhibitorBoothMembersByID: [],
      };

    default:
      return state;
  }
};

export const exhibitorListByIdReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_ACTION_TYPE.GET_EXHIBITOR_LIST_BY_ID_PENDING:
      return {
        blocking: true,
        exhibitorListById: [],
      };

    case USER_ACTION_TYPE.GET_EXHIBITOR_LIST_BY_ID_SUCESS:
      return {
        blocking: false,
        exhibitorListById: payload,
      };

    case USER_ACTION_TYPE.GET_EXHIBITOR_LIST_BY_ID_ERROR:
      return {
        blocking: true,
        exhibitorListById: [],
      };

    default:
      return state;
  }
};
