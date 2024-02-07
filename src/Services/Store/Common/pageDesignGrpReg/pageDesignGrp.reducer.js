import { USER_ACTION_TYPE } from "../../../Constant/user.constants";

const INITIAL_STATE = {
  blocking: false,
  fieldName: [],
  registrantFields : [],
  pageDesignGrpReg : [],
};

export const pageDesignGrpRegReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_ACTION_TYPE.GET_MAIN_CONTACT_FIELD_PENDING:
      return {
        ...state,
        blocking: true,
        fieldName: [],
      };

    case USER_ACTION_TYPE.GET_MAIN_CONTACT_FIELD_SUCESS:
      return {
        ...state,
        blocking: false,
        fieldName: payload,
      };

    case USER_ACTION_TYPE.GET_MAIN_CONTACT_FIELD_ERROR:
      return {
        ...state,
        blocking: false,
        fieldName: [],
      };

      case USER_ACTION_TYPE.GET_REGISTRANT_FIELDS_PENDING:
        return {
          ...state,
          blocking: true,
          registrantFields: [],
        };
  
      case USER_ACTION_TYPE.GET_REGISTRANT_FIELDS_SUCESS:
        return {
          ...state,
          blocking: false,
          registrantFields: payload,
        };
  
      case USER_ACTION_TYPE.GET_REGISTRANT_FIELDS_ERROR:
        return {
          ...state,
          blocking: false,
          registrantFields: [],
        };

      case USER_ACTION_TYPE.GET_PAGE_DESIGN_GRP_REG_PENDING:
          return {
            ...state,
            blocking: true,
            pageDesignGrpReg: [],
          };
    
      case USER_ACTION_TYPE.GET_PAGE_DESIGN_GRP_REG_SUCESS:
          return {
            ...state,
            blocking: false,
            pageDesignGrpReg: payload,
          };
    
      case USER_ACTION_TYPE.GET_PAGE_DESIGN_GRP_REG_ERROR:
          return {
            ...state,
            blocking: false,
            pageDesignGrpReg: [],
          };
      
    default:
      return state;
  }
};
