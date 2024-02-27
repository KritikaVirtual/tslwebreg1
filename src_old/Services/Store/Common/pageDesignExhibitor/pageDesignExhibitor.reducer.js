import { USER_ACTION_TYPE } from "../../../Constant/user.constants";

const INITIAL_STATE = {
  blocking: false,
  pageDesignExhibitor: [],
};

export const pageDesignExhibitorReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_ACTION_TYPE.GET_PAGE_DESIGN_EXHIBITOR_PENDING:
      return {
        ...state,
        blocking: true,
        pageDesignExhibitor: [],
      };

    case USER_ACTION_TYPE.GET_PAGE_DESIGN_EXHIBITOR_SUCESS:
      return {
        ...state,
        blocking: false,
        pageDesignExhibitor: payload,
      };

    case USER_ACTION_TYPE.GET_PAGE_DESIGN_EXHIBITOR_ERROR:
      return {
        ...state,
        blocking: false,
        pageDesignExhibitor: [],
      };

    default:
      return state;
  }
};
