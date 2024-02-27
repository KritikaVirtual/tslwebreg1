import { USER_ACTION_TYPE } from "../../../Constant/user.constants";

const INITIAL_STATE = {
  blocking: false,
  registrantData : [],
  registrantsList: [],
  additionalRegistrantList: [],
  questionsRegistrantsList: [],
  guestAdditionalRegistrant: [],
  guestAdditionalRegistrantByID: [],
  answersRegistrant: [],
  registrantSessions: [],
  sessionsConfigById: [],
  regPayments: [],
  regPaymentsById: [],
  regAmount: [],
  stripeDetails : [],
  answerGuest: [],
  registrantsInfo: [],
  registrantsSessionsInfo: [],
  registrantsInfoByID : [],
  registrantMainRegIDExist : []
};

export const registrantsReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_ACTION_TYPE.GET_REGISTRANTS_LIST_PENDING:
      return {
        ...state,
        blocking: true,
        registrantsList: [],
      };

    case USER_ACTION_TYPE.GET_REGISTRANTS_LIST_SUCESS:
      return {
        ...state,
        blocking: false,
        registrantsList: payload,
      };

    case USER_ACTION_TYPE.GET_REGISTRANTS_LIST_ERROR:
      return {
        ...state,
        blocking: false,
        registrantsList: [],
      };

    case USER_ACTION_TYPE.GET_QUESTIONS_REGISTRANTS_LIST_PENDING:
      return {
        ...state,
        blocking: true,
        questionsRegistrantsList: [],
      };

    case USER_ACTION_TYPE.GET_QUESTIONS_REGISTRANTS_LIST_SUCESS:
      return {
        ...state,
        blocking: false,
        questionsRegistrantsList: payload,
      };

    case USER_ACTION_TYPE.GET_QUESTIONS_REGISTRANTS_LIST_ERROR:
      return {
        ...state,
        blocking: false,
        questionsRegistrantsList: [],
      };

    case USER_ACTION_TYPE.GET_GUEST_ADDITIONAL_REGISTRANT_PENDING:
      return {
        ...state,
        blocking: true,
        guestAdditionalRegistrant: [],
      };

    case USER_ACTION_TYPE.GET_GUEST_ADDITIONAL_REGISTRANT_SUCESS:
      return {
        ...state,
        blocking: true,
        guestAdditionalRegistrant: payload,
      };

    case USER_ACTION_TYPE.GET_GUEST_ADDITIONAL_REGISTRANT_ERROR:
      return {
        ...state,
        blocking: true,
        guestAdditionalRegistrant: [],
      };

    case USER_ACTION_TYPE.GET_GUEST_ADDITIONAL_INFORMATION_BY_ID_PENDING:
      return {
        ...state,
        blocking: true,
        guestAdditionalRegistrantByID: [],
      };

    case USER_ACTION_TYPE.GET_GUEST_ADDITIONAL_INFORMATION_BY_ID_SUCESS:
      return {
        ...state,
        blocking: false,
        guestAdditionalRegistrantByID: payload,
      };

    case USER_ACTION_TYPE.GET_GUEST_ADDITIONAL_INFORMATION_BY_ID_ERROR:
      return {
        ...state,
        blocking: false,
        guestAdditionalRegistrantByID: [],
      };

    case USER_ACTION_TYPE.GET_ANSWERS_REGISTRANT_PENDING:
      return {
        ...state,
        blocking: true,
        answersRegistrant: [],
      };

    case USER_ACTION_TYPE.GET_ANSWERS_REGISTRANT_SUCESS:
      return {
        ...state,
        blocking: false,
        answersRegistrant: payload,
      };

    case USER_ACTION_TYPE.GET_ANSWERS_REGISTRANT_ERROR:
      return {
        ...state,
        blocking: false,
        answersRegistrant: [],
      };

    case USER_ACTION_TYPE.GET_REGISTRANTS_SESSIONS_PENDING:
      return {
        ...state,
        blocking: true,
        registrantSessions: [],
      };

    case USER_ACTION_TYPE.GET_REGISTRANTS_SESSIONS_SUCESS:
      return {
        ...state,
        blocking: false,
        registrantSessions: payload,
      };

    case USER_ACTION_TYPE.GET_REGISTRANTS_SESSIONS_ERROR:
      return {
        ...state,
        blocking: false,
        registrantSessions: [],
      };

    case USER_ACTION_TYPE.GET_REGISTRANTS_SESSIONS_PENDING:
      return {
        ...state,
        blocking: true,
        registrantSessions: [],
      };

    case USER_ACTION_TYPE.GET_REGISTRANTS_SESSIONS_SUCESS:
      return {
        ...state,
        blocking: false,
        registrantSessions: payload,
      };

    case USER_ACTION_TYPE.GET_REGISTRANTS_SESSIONS_ERROR:
      return {
        ...state,
        blocking: false,
        registrantSessions: [],
      };

    case USER_ACTION_TYPE.GET_SESSIONS_CONFIG_PENDING:
      return {
        ...state,
        blocking: true,
        sessionsConfig: [],
      };

    case USER_ACTION_TYPE.GET_SESSIONS_CONFIG_SUCESS:
      return {
        ...state,
        blocking: false,
        sessionsConfig: payload,
      };

    case USER_ACTION_TYPE.GET_SESSIONS_CONFIG_ERROR:
      return {
        ...state,
        blocking: false,
        sessionsConfig: [],
      };

    case USER_ACTION_TYPE.GET_REGISTRANT_SESSIONS_BY_ID_PENDING:
      return {
        ...state,
        blocking: true,
        sessionsConfigById: [],
      };

    case USER_ACTION_TYPE.GET_REGISTRANT_SESSIONS_BY_ID_SUCESS:
      return {
        ...state,
        blocking: false,
        sessionsConfigById: payload,
      };

    case USER_ACTION_TYPE.GET_REGISTRANT_SESSIONS_BY_ID_ERROR:
      return {
        ...state,
        blocking: false,
        sessionsConfigById: [],
      };

    case USER_ACTION_TYPE.GET_REG_PAYMENTS_PENDING:
      return {
        ...state,
        blocking: true,
        regPayments: [],
      };

    case USER_ACTION_TYPE.GET_REG_PAYMENTS_SUCESS:
      return {
        ...state,
        blocking: false,
        regPayments: payload,
      };

    case USER_ACTION_TYPE.GET_REG_PAYMENTS_ERROR:
      return {
        ...state,
        blocking: false,
        regPayments: [],
      };

    case USER_ACTION_TYPE.GET_REG_PAYMENTS_BY_ID_PENDING:
      return {
        ...state,
        blocking: true,
        regPaymentsById: [],
      };

    case USER_ACTION_TYPE.GET_REG_PAYMENTS_BY_ID_SUCESS:
      return {
        ...state,
        blocking: false,
        regPaymentsById: payload,
      };

    case USER_ACTION_TYPE.GET_REG_PAYMENTS_BY_ID_ERROR:
      return {
        ...state,
        blocking: false,
        regPaymentsById: [],
      };

    case USER_ACTION_TYPE.GET_REG_AMOUNT_PENDING:
      return {
        ...state,
        blocking: true,
        regAmount: [],
      };

    case USER_ACTION_TYPE.GET_REG_AMOUNT_SUCESS:
      return {
        ...state,
        blocking: false,
        regAmount: payload,
      };

    case USER_ACTION_TYPE.GET_REG_AMOUNT_ERROR:
      return {
        ...state,
        blocking: false,
        regAmount: [],
      };

    case USER_ACTION_TYPE.GET_STRIPE_DETAILS_PENDING:
      return {
        ...state,
        blocking: true,
        stripeDetails: [],
      };

    case USER_ACTION_TYPE.GET_STRIPE_DETAILS_SUCESS:
      return {
        ...state,
        blocking: false,
        stripeDetails: payload,
      };

    case USER_ACTION_TYPE.GET_STRIPE_DETAILS_ERROR:
      return {
        ...state,
        blocking: false,
        stripeDetails: [],
      };

      case USER_ACTION_TYPE.GET_REGISTRANT_PENDING:
        return {
          ...state,
          blocking: true,
          registrantData: [],
        };

      case USER_ACTION_TYPE.GET_REGISTRANT_SUCESS:
        return {
          ...state,
          blocking: false,
          registrantData: payload,
        };

      case USER_ACTION_TYPE.GET_REGISTRANT_ERROR:
        return {
          ...state,
          blocking: false,
          registrantData: [],
        };

      case USER_ACTION_TYPE.GET_GUEST_REGISTRANT_PENDING:
        return {
          ...state,
          blocking: true,
          answerGuest: [],
        };
  
      case USER_ACTION_TYPE.GET_GUEST_REGISTRANT_SUCESS:
        return {
          ...state,
          blocking: false,
          answerGuest: payload,
        };
  
      case USER_ACTION_TYPE.GET_GUEST_REGISTRANT_SUCESS:
        return {
          ...state,
          blocking: false,
          answerGuest: [],
        };

      case USER_ACTION_TYPE.GET_ADDITIONAL_REGISTRANTS_LIST_PENDING:
        return {
          ...state,
          blocking: true,
          additionalRegistrantList: [],
        };
  
      case USER_ACTION_TYPE.GET_ADDITIONAL_REGISTRANTS_LIST_SUCESS:
        return {
          ...state,
          blocking: false,
          additionalRegistrantList: payload,
        };
  
      case USER_ACTION_TYPE.GET_ADDITIONAL_REGISTRANTS_LIST_SUCESS:
        return {
          ...state,
          blocking: false,
          additionalRegistrantList: [],
        };
      
      case USER_ACTION_TYPE.GET_REGISTRANTS_INFO_PENDING:
        return {
          ...state,
          blocking: true,
          registrantsInfo: [],
        };
  
      case USER_ACTION_TYPE.GET_REGISTRANTS_INFO_SUCESS:
        return {
          ...state,
          blocking: false,
          registrantsInfo: payload,
        };
  
      case USER_ACTION_TYPE.GET_REGISTRANTS_INFO_SUCESS:
        return {
          ...state,
          blocking: false,
          registrantsInfo: [],
        };
        
      case USER_ACTION_TYPE.GET_REGISTRANTS_SESSIONS_TEMPLATE21_PENDING:
        return {
          ...state,
          blocking: true,
          registrantsSessionsInfo: [],
        };
  
      case USER_ACTION_TYPE.GET_REGISTRANTS_SESSIONS_TEMPLATE21_SUCESS:
        return {
          ...state,
          blocking: false,
          registrantsSessionsInfo: payload,
        };
  
      case USER_ACTION_TYPE.GET_REGISTRANTS_SESSIONS_TEMPLATE21_SUCESS:
        return {
          ...state,
          blocking: false,
          registrantsSessionsInfo: [],
        };

      case USER_ACTION_TYPE.GET_REGISTRANTS_INFO_BY_ID_TEMPLATE21_PENDING:
        return {
          ...state,
          blocking: true,
          registrantsInfoByID: [],
        };
  
      case USER_ACTION_TYPE.GET_REGISTRANTS_INFO_BY_ID_TEMPLATE21_SUCESS:
        return {
          ...state,
          blocking: false,
          registrantsInfoByID: payload,
        };
  
      case USER_ACTION_TYPE.GET_REGISTRANTS_INFO_BY_ID_TEMPLATE21_ERROR:
        return {
          ...state,
          blocking: false,
          registrantsInfoByID: [],
        };

      case USER_ACTION_TYPE.GET_REGISTRANTS_GROUPS_MAINREGID_EXIST_PENDING:
        return {
          ...state,
          blocking: true,
          registrantMainRegIDExist: [],
        };
  
      case USER_ACTION_TYPE.GET_REGISTRANTS_GROUPS_MAINREGID_EXIST_SUCESS:
        return {
          ...state,
          blocking: false,
          registrantMainRegIDExist: payload,
        };
  
      case USER_ACTION_TYPE.GET_REGISTRANTS_GROUPS_MAINREGID_EXIST_ERROR:
        return {
          ...state,
          blocking: false,
          registrantMainRegIDExist: [],
        };

      case USER_ACTION_TYPE.RESET_REG_DATA:
        return {
          ...state,
          blocking: false,
          regAmount: [],
        };

      case USER_ACTION_TYPE.RESET_ANSWER_DATA:
          return {
            ...state,
            blocking: false,
            answersRegistrant: [],
      };
      
      case USER_ACTION_TYPE.RESET_REGISTRANTS_SESSIONS:
          return {
            ...state,
            blocking: false,
            registrantSessions: [],
      };

      case USER_ACTION_TYPE.RESET_REGISTRANTS_GROUPS_MAINREGID_EXIST:
          return {
            ...state,
            blocking: false,
            registrantMainRegIDExist: [],
      };

      case USER_ACTION_TYPE.GET_DICOUNT_CODE_BY_REGID_SUCESS:
        return {
          ...state,
          blocking: false,
          discountCodeByRegId: payload,
        };

      case USER_ACTION_TYPE.GET_DICOUNT_CODE_BY_REGID_SUCESS_PENDING:
        return {
        ...state,
        blocking: true,
        discountCodeByRegId: [],
      };

      case USER_ACTION_TYPE.GET_DICOUNT_CODE_BY_REGID_SUCESS_ERROR:
        return {
        ...state,
        blocking: false,
        discountCodeByRegId: [],
      };

      case USER_ACTION_TYPE.GET_DICOUNT_AMT_BY_ID_PENDING:
        return {
        ...state,
        blocking: true,
        discountAmtByID: [],
      };
        
      
      case USER_ACTION_TYPE.GET_DICOUNT_AMT_BY_ID_SUCESS:
        return {
        ...state,
        blocking: false,
        discountAmtByID: payload,
      };

      case USER_ACTION_TYPE.GET_DICOUNT_AMT_BY_ID_ERROR:
        return {
        ...state,
        blocking: false,
        discountAmtByID: [],
      };

        
    default:
      return state;
  }
};
