import { USER_ACTION_TYPE } from "../../../Constant/user.constants";

const INITIAL_STATE = {
  blocking: false,
  pageDesign: [],
  regCategoriesPageDesign: [],
  regTypesPageDesign: [],
  regTypesById: [],
  regScode: [],
  regCategoriesById: [],
  regTypeAmount: [],
  sessionPrice: []
};

export const pageDesignReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_ACTION_TYPE.GET_PAGE_DESIGN_PENDING:
      return {
        ...state,
        blocking: true,
        pageDesign: [],
      };

    case USER_ACTION_TYPE.GET_PAGE_DESIGN_SUCESS:
      return {
        ...state,
        blocking: false,
        pageDesign: payload,
      };

    case USER_ACTION_TYPE.GET_PAGE_DESIGN_ERROR:
      return {
        ...state,
        blocking: false,
        pageDesign: [],
      };

    case USER_ACTION_TYPE.GET_REG_CATEGORIES_PAGE_DESIGN_PENDING:
      return {
        ...state,
        blocking: true,
        regCategoriesPageDesign: [],
      };

    case USER_ACTION_TYPE.GET_REG_CATEGORIES_PAGE_DESIGN_SUCESS:
      return {
        ...state,
        blocking: false,
        regCategoriesPageDesign: payload,
      };

    case USER_ACTION_TYPE.GET_REG_CATEGORIES_PAGE_DESIGN_ERROR:
      return {
        ...state,
        blocking: false,
        regCategoriesPageDesign: [],
      };

    case USER_ACTION_TYPE.GET_REG_TYPES_PAGE_DESIGN_PENDING:
      return {
        ...state,
        blocking: true,
        regTypesPageDesign: [],
      };

    case USER_ACTION_TYPE.GET_REG_TYPES_PAGE_DESIGN_SUCESS:
      return {
        ...state,
        blocking: false,
        regTypesPageDesign: payload,
      };

    case USER_ACTION_TYPE.GET_REG_TYPES_PAGE_DESIGN_ERROR:
      return {
        ...state,
        blocking: false,
        regTypesPageDesign: [],
      };

    case USER_ACTION_TYPE.GET_REG_TYPES_BY_ID_PENDING:
      return {
        ...state,
        blocking: true,
        regTypesById: [],
      };

    case USER_ACTION_TYPE.GET_REG_TYPES_BY_ID_SUCESS:
      return {
        ...state,
        blocking: false,
        regTypesById: payload,
      };

    case USER_ACTION_TYPE.GET_REG_TYPES_BY_ID_ERROR:
      return {
        ...state,
        blocking: false,
        regTypesById: [],
      };

    case USER_ACTION_TYPE.GET_REG_SCODE_PAGE_DESIGN_PENDING:
      return {
        ...state,
        blocking: true,
        regScode: [],
      };

    case USER_ACTION_TYPE.GET_REG_SCODE_PAGE_DESIGN_SUCESS:
      return {
        ...state,
        blocking: false,
        regScode: payload,
      };

    case USER_ACTION_TYPE.GET_REG_SCODE_PAGE_DESIGN_ERROR:
      return {
        ...state,
        blocking: false,
        regScode: [],
      };

    case USER_ACTION_TYPE.GET_REG_CATEGORIES_BY_ID_PENDING:
      return {
        ...state,
        blocking: true,
        regCategoriesById: [],
      };

    case USER_ACTION_TYPE.GET_REG_CATEGORIES_BY_ID_SUCESS:
      return {
        ...state,
        blocking: false,
        regCategoriesById: payload,
      };

    case USER_ACTION_TYPE.GET_REG_CATEGORIES_BY_ID_ERROR:
      return {
        ...state,
        blocking: false,
        regCategoriesById: [],
      };

    case USER_ACTION_TYPE.GET_REG_TYPE_AMOUNT_PENDING:
      return {
        ...state,
        blocking: true,
        regTypeAmount: [],
      };

    case USER_ACTION_TYPE.GET_REG_TYPE_AMOUNT_SUCESS:
      return {
        ...state,
        blocking: false,
        regTypeAmount: payload,
      };

    case USER_ACTION_TYPE.GET_REG_TYPE_AMOUNT_ERROR:
      return {
        ...state,
        blocking: false,
        regTypeAmount: [],
      };

    case USER_ACTION_TYPE.GET_SESSION_PRICE_PENDING:
        return {
          ...state,
          blocking: true,
          sessionPrice: [],
        };
  
      case USER_ACTION_TYPE.GET_SESSION_PRICE_SUCESS:
        return {
          ...state,
          blocking: false,
          sessionPrice: payload,
        };
  
      case USER_ACTION_TYPE.GET_SESSION_PRICE_ERROR:
        return {
          ...state,
          blocking: false,
          sessionPrice: [],
        };
      
        case USER_ACTION_TYPE.RESET_SESSION_PRICE:
          return {
            ...state,
            blocking: false,
            sessionPrice: [],
          };

    default:
      return state;
  }
};
