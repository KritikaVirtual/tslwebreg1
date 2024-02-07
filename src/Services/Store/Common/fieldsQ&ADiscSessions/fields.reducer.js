import { USER_ACTION_TYPE } from "../../../Constant/user.constants";

const INITIAL_STATE = {
  blocking: false,
  fieldName: [],
  guestsRegistrantFields: [],
  customQuestions: [],
  registrantField: [],
  customQuestionsById: [],
  discountCodes: [],
  discountCodesById: [],
  extraConfigForSession: [],
  extraConfigForSessionById:[]
};

export const fieldQADiscSessionsReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_ACTION_TYPE.GET_FIELDS_QA_DISC_SESSIONS_PENDING:
      return {
        ...state,
        blocking: true,
        fieldName: [],
      };

    case USER_ACTION_TYPE.GET_FIELDS_QA_DISC_SESSIONS_SUCESS:
      return {
        ...state,
        blocking: false,
        fieldName: payload,
      };

    case USER_ACTION_TYPE.GET_FIELDS_QA_DISC_SESSIONS_ERROR:
      return {
        ...state,
        blocking: false,
        fieldName: [],
      };

    case USER_ACTION_TYPE.GET_GUESTS_REGISTRANTS_FIELDS_PENDING:
      return {
        ...state,
        blocking: true,
        guestsRegistrantFields: [],
      };

    case USER_ACTION_TYPE.GET_GUESTS_REGISTRANTS_FIELDS_SUCESS:
      return {
        ...state,
        blocking: false,
        guestsRegistrantFields: payload,
      };

    case USER_ACTION_TYPE.GET_GUESTS_REGISTRANTS_FIELDS_ERROR:
      return {
        ...state,
        blocking: false,
        guestsRegistrantFields: [],
      };

    case USER_ACTION_TYPE.GET_CUSTOM_QUESTIONS_PENDING:
      return {
        ...state,
        blocking: true,
        customQuestions: [],
      };

    case USER_ACTION_TYPE.GET_CUSTOM_QUESTIONS_SUCESS:
      return {
        ...state,
        blocking: false,
        customQuestions: payload,
      };

    case USER_ACTION_TYPE.GET_REGISTRANT_FIELD_ERROR:
      return {
        ...state,
        blocking: false,
        customQuestions: [],
      };

    case USER_ACTION_TYPE.GET_REGISTRANT_FIELD_PENDING:
      return {
        ...state,
        blocking: true,
        registrantField: [],
      };

    case USER_ACTION_TYPE.GET_REGISTRANT_FIELD_SUCESS:
      return {
        ...state,
        blocking: false,
        registrantField: payload,
      };

    case USER_ACTION_TYPE.GET_CUSTOM_QUESTIONS_ERROR:
      return {
        ...state,
        blocking: false,
        registrantField: [],
      };

    case USER_ACTION_TYPE.GET_CUSTOM_QUESTIONS_BY_ID_PENDING:
      return {
        ...state,
        blocking: true,
        customQuestionsById: [],
      };

    case USER_ACTION_TYPE.GET_CUSTOM_QUESTIONS_BY_ID_SUCESS:
      return {
        ...state,
        blocking: false,
        customQuestionsById: payload,
      };

    case USER_ACTION_TYPE.GET_CUSTOM_QUESTIONS_BY_ID_ERROR:
      return {
        ...state,
        blocking: false,
        customQuestionsById: [],
      };

    case USER_ACTION_TYPE.GET_DISCOUNT_CODES_PENDING:
      return {
        ...state,
        blocking: true,
        discountCodes: [],
      };

    case USER_ACTION_TYPE.GET_DISCOUNT_CODES_SUCESS:
      return {
        ...state,
        blocking: false,
        discountCodes: payload,
      };

    case USER_ACTION_TYPE.GET_DISCOUNT_CODES_ERROR:
      return {
        ...state,
        blocking: false,
        discountCodes: [],
      };

    case USER_ACTION_TYPE.GET_DISCOUNT_CODES_BY_ID_PENDING:
      return {
        ...state,
        blocking: true,
        discountCodesById: [],
      };

    case USER_ACTION_TYPE.GET_DISCOUNT_CODES_BY_ID_SUCESS:
      return {
        ...state,
        blocking: false,
        discountCodesById: payload,
      };

    case USER_ACTION_TYPE.GET_DISCOUNT_CODES_BY_ID_ERROR:
      return {
        ...state,
        blocking: false,
        discountCodesById: [],
      };

    case USER_ACTION_TYPE.GET_INDIVIDUAL_SESSION_PENDING:
      return {
        ...state,
        blocking: true,
        individualSession: [],
      };

    case USER_ACTION_TYPE.GET_INDIVIDUAL_SESSION_SUCESS:
      return {
        ...state,
        blocking: false,
        individualSession: payload,
      };

    case USER_ACTION_TYPE.GET_INDIVIDUAL_SESSION_ERROR:
      return {
        ...state,
        blocking: false,
        individualSession: [],
      };

      case USER_ACTION_TYPE.GET_INDIVIDUAL_SESSION_BY_ID_PENDING:
        return {
          ...state,
          blocking: true,
          individualSessionById: [],
        };
  
    case USER_ACTION_TYPE.GET_INDIVIDUAL_SESSION_BY_ID_SUCESS:
        return {
          ...state,
          blocking: false,
          individualSessionById: payload,
        };
  
    case USER_ACTION_TYPE.GET_INDIVIDUAL_SESSION_BY_ID_ERROR:
        return {
          ...state,
          blocking: false,
          individualSessionById: [],
        };

        case USER_ACTION_TYPE.GET_EXTRA_CONFIG_SESSION_PENDING:
          return {
            ...state,
            blocking: true,
            extraConfigForSession: [],
          };
    
    case USER_ACTION_TYPE.GET_EXTRA_CONFIG_SESSION_SUCESS:
          return {
            ...state,
            blocking: false,
            extraConfigForSession: payload,
          };
    
    case USER_ACTION_TYPE.GET_EXTRA_CONFIG_SESSION_ERROR:
          return {
            ...state,
            blocking: false,
            extraConfigForSession: [],
          };

    case USER_ACTION_TYPE.GET_EXTRA_CONFIG_SESSION_BY_ID_PENDING:
            return {
              ...state,
              blocking: true,
              extraConfigForSessionById: [],
            };
      
    case USER_ACTION_TYPE.GET_EXTRA_CONFIG_SESSION_BY_ID_SUCESS:
            return {
              ...state,
              blocking: false,
              extraConfigForSessionById: payload,
            };
      
    case USER_ACTION_TYPE.GET_EXTRA_CONFIG_SESSION_BY_ID_ERROR:
            return {
              ...state,
              blocking: false,
              extraConfigForSessionById: [],
            };
      
    default:
      return state;
  }
};
