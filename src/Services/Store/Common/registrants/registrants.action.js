import axios from "axios";
import { USER_ACTION_TYPE } from "../../../Constant/user.constants";
import {
  displayErrorMessage,
  displaySuccessMessage,
  requestTokenHeader,
} from "../../../Helpers/helper";
import api from "../../../Axios/index";

export const getRegistrantsList = (postData) => async (dispatch) => {
  dispatch({ type: USER_ACTION_TYPE.GET_REGISTRANTS_LIST_PENDING });
  try {
    const response = await api.get("api/v1/tslGetRegistrantsList", {
      params: postData,
      headers: requestTokenHeader(),
    });
    if (response.data.errorCode === 0) {
      const responce = {
        result: response.data.data,
        records: response.data.total_records,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_REGISTRANTS_LIST_SUCESS,
        payload: responce,
      });
    } else {
      const responce = {
        result: [],
        records: 0,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_REGISTRANTS_LIST_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
    return dispatch({ type: USER_ACTION_TYPE.GET_REGISTRANTS_LIST_ERROR });
  }
};

export const getAdditionalRegistrantsList = (postData) => async (dispatch) => {
  dispatch({ type: USER_ACTION_TYPE.GET_REGISTRANTS_LIST_PENDING });
  try {
    const response = await api.get("api/v1/tslGetAdditionalRegistrantList", {
      params: postData,
      headers: requestTokenHeader(),
    });
    if (response.data.errorCode === 0) {
      const responce = {
        result: response.data.data,
        records: response.data.total_records,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_ADDITIONAL_REGISTRANTS_LIST_SUCESS,
        payload: responce,
      });
    } else {
      const responce = {
        result: [],
        records: 0,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_ADDITIONAL_REGISTRANTS_LIST_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
    return dispatch({ type: USER_ACTION_TYPE.GET_ADDITIONAL_REGISTRANTS_LIST_ERROR });
  }
};

export const addRegistrantInfo = (postData) => {
  return async (dispatch, getState) => {
    try {
      const response = await api.post("api/v1/tslAddRegistrants", postData, {
        headers: requestTokenHeader(),
      });
      if (response.data.errorCode === 0) {
        displaySuccessMessage("dataSaved");
        if(response.data.result.insertId!==undefined){
          sessionStorage.setItem("regId",response.data.result.insertId)
          window.location.reload(false);
        }
      } else {
        displayErrorMessage("dataSavedError");
      }
    } catch (err) {
      displayErrorMessage(err.name);
    }
  };
};

export const updateRegistrantInfo = (postData) => {
  return async (dispatch) => {
    try {
      const response = await api.post(
        "api/v1/tslUpdateRegistrants",
        postData,
        {
          headers: requestTokenHeader(),
        }
      );
      if (response.data.errorCode === 0) {
        var resultOutput = {};
        const userId = localStorage.getItem("userId");
        const eventId = sessionStorage.getItem("eventId");
        const regId = sessionStorage.getItem("regId");
        resultOutput.userId = userId;
        resultOutput.eventId = eventId;
        resultOutput.search = "";
        resultOutput.offset = 0;
        displaySuccessMessage("dataSaved");
      } else {
        const responce = {
          result: "",
          records: 0,
          error_code: response.data.errorCode,
        };
        displayErrorMessage("dataSavedError");
      }
    } catch (err) {
      displayErrorMessage(err.name);
    }
  };
};

export const getQuestionsRegistrantsList = (postData) => async (dispatch) => {
  dispatch({ type: USER_ACTION_TYPE.GET_QUESTIONS_REGISTRANTS_LIST_PENDING });
  try {
    const response = await api.get("api/v1/tslGetQuestionsRegistrantsList", {
      params: postData,
      headers: requestTokenHeader(),
    });
    if (response.data.errorCode === 0) {
      const responce = {
        result: response.data.data,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_QUESTIONS_REGISTRANTS_LIST_SUCESS,
        payload: responce,
      });
    } else {
      const responce = {
        result: [],
        records: 0,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_QUESTIONS_REGISTRANTS_LIST_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
    return dispatch({
      type: USER_ACTION_TYPE.GET_QUESTIONS_REGISTRANTS_LIST_ERROR,
    });
  }
};

export const getGuestAdditionalRegistrants = (postData) => async (dispatch) => {
  dispatch({ type: USER_ACTION_TYPE.GET_QUESTIONS_REGISTRANTS_LIST_PENDING });
  try {
    const response = await api.get("api/v1/tslGetGuestAdditionalRegistrants", {
      params: postData,
      headers: requestTokenHeader(),
    });
    if (response.data.errorCode === 0) {
      const responce = {
        result: response.data.data,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_GUEST_ADDITIONAL_REGISTRANT_SUCESS,
        payload: responce,
      });
    } else {
      const responce = {
        result: [],
        records: 0,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_GUEST_ADDITIONAL_REGISTRANT_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
    return dispatch({
      type: USER_ACTION_TYPE.GET_GUEST_ADDITIONAL_REGISTRANT_ERROR,
    });
  }
};

export const addGuestAddditionalInformation = (postData) => {
  return async (dispatch, getState) => {
    try {
      const response = await api.post(
        "api/v1/tslAddGuestAdditionalInformation",
        postData,
        {
          headers: requestTokenHeader(),
        }
      );
      if (response.data.errorCode === 0) {
        const userId = localStorage.getItem("userId");
        const eventId = sessionStorage.getItem("eventId");
        const regId = sessionStorage.getItem("regId");
        displaySuccessMessage("dataSaved");
        dispatch(
          getGuestAdditionalRegistrants({
            lAccountID: userId,
            lEventID: eventId,
            lRegID: regId,
          })
        );
        dispatch(
          getQuestionsRegistrantsList({
            lAccountID: userId,
            lEventID: eventId,
          })
        );
      } else {
        displayErrorMessage("dataSavedError");
      }
    } catch (err) {
      displayErrorMessage(err.name);
    }
  };
};

export const updateGuestAdditionalInformation = (postData) => {
  return async (dispatch) => {
    try {
      const response = await api.post(
        "api/v1/tslUpdateGuestsAdditionalInformation",
        postData,
        {
          headers: requestTokenHeader(),
        }
      );
      if (response.data.errorCode === 0) {
        var resultOutput = {};
        const userId = localStorage.getItem("userId");
        const eventId = sessionStorage.getItem("eventId");
        const regId = sessionStorage.getItem("regId");
        resultOutput.userId = userId;
        resultOutput.eventId = eventId;
        resultOutput.search = "";
        resultOutput.offset = 0;
        displaySuccessMessage("dataSaved");
        dispatch(
          getGuestAdditionalRegistrants({
            lAccountID: userId,
            lEventID: eventId,
            lRegID: regId,
          })
        );
      } else {
        const responce = {
          result: "",
          records: 0,
          error_code: response.data.errorCode,
        };
        displayErrorMessage("dataSavedError");
      }
    } catch (err) {
      displayErrorMessage(err.name);
    }
  };
};

export const getGuestAdditionalInformationById =
  (postData) => async (dispatch) => {
    dispatch({
      type: USER_ACTION_TYPE.GET_GUEST_ADDITIONAL_INFORMATION_BY_ID_PENDING,
    });
    try {
      const response = await api.get(
        "api/v1/tslGetGuestAddditionalInformationById",
        {
          params: postData,
          headers: requestTokenHeader(),
        }
      );
      if (response.data.errorCode === 0) {
        const responce = {
          result: response.data.data,
          error_code: response.data.errorCode,
        };
        return dispatch({
          type: USER_ACTION_TYPE.GET_GUEST_ADDITIONAL_INFORMATION_BY_ID_SUCESS,
          payload: responce,
        });
      } else {
        const responce = {
          result: [],
          records: 0,
          error_code: response.data.errorCode,
        };
        return dispatch({
          type: USER_ACTION_TYPE.GET_GUEST_ADDITIONAL_INFORMATION_BY_ID_SUCESS,
          payload: responce,
        });
      }
    } catch (err) {
      return dispatch({
        type: USER_ACTION_TYPE.GET_GUEST_ADDITIONAL_INFORMATION_BY_ID_ERROR,
      });
    }
  };

export const getAnswerRegistrant = (postData) => async (dispatch) => {
  dispatch({
    type: USER_ACTION_TYPE.GET_ANSWERS_REGISTRANT_PENDING,
  });
  try {
    const response = await api.get("api/v1/tslGetAnswersRegistrant", {
      params: postData,
      headers: requestTokenHeader(),
    });
    if (response.data.errorCode === 0) {
      const responce = {
        result: response.data.data,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_ANSWERS_REGISTRANT_SUCESS,
        payload: responce,
      });
    } else {
      const responce = {
        result: [],
        records: 0,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_ANSWERS_REGISTRANT_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
    return dispatch({
      type: USER_ACTION_TYPE.GET_ANSWERS_REGISTRANT_ERROR,
    });
  }
};

export const getAnswerGuest = (postData) => async (dispatch) => {
  dispatch({
    type: USER_ACTION_TYPE.GET_GUEST_REGISTRANT_PENDING,
  });
  try {
    const response = await api.get("api/v1/tslGetAnswersRegistrant", {
      params: postData,
      headers: requestTokenHeader(),
    });
    if (response.data.errorCode === 0) {
      const responce = {
        result: response.data.data,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_GUEST_REGISTRANT_SUCESS,
        payload: responce,
      });
    } else {
      const responce = {
        result: [],
        records: 0,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_GUEST_REGISTRANT_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
    return dispatch({
      type: USER_ACTION_TYPE.GET_GUEST_REGISTRANT_ERROR,
    });
  }
};

export const getRegistrantSessions = (postData) => async (dispatch) => {
  dispatch({ type: USER_ACTION_TYPE.GET_REGISTRANTS_SESSIONS_PENDING });
  try {
    const response = await api.get("api/v1/tslGetRegistrantSessions", {
      params: postData,
      headers: requestTokenHeader(),
    });
    if (response.data.errorCode === 0) {
      const responce = {
        result: response.data.data,
        records: response.data.total_records,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_REGISTRANTS_SESSIONS_SUCESS,
        payload: responce,
      });
    } else {
      const responce = {
        result: [],
        records: 0,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_REGISTRANTS_SESSIONS_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
    return dispatch({ type: USER_ACTION_TYPE.GET_REGISTRANTS_SESSIONS_ERROR });
  }
};

export const addRegistrantSessions = (postData) => {
  return async (dispatch, getState) => {
    try {
      const response = await api.post(
        "api/v1/tslAddRegistrantSessions",
        postData,
        {
          headers: requestTokenHeader(),
        }
      );
      if (response.data.errorCode === 0) {
        const userId = localStorage.getItem("userId");
        const eventId = sessionStorage.getItem("eventId");
        const regId = sessionStorage.getItem("regId");
        displaySuccessMessage("dataSaved");
        dispatch(
          getGuestAdditionalRegistrants({
            lAccountID: userId,
            lEventID: eventId,
            lRegID: regId,
          })
        );
        dispatch(
          getQuestionsRegistrantsList({
            lAccountID: userId,
            lEventID: eventId,
          })
        );
        dispatch(
          getRegistrantSessions({
            lAccountID: userId,
            lEventID: eventId,
            lRegID: regId,
          })
        );
      } else {
        displayErrorMessage("dataSavedError");
      }
    } catch (err) {
      displayErrorMessage(err.name);
    }
  };
};

export const getSessionsConfig = (postData) => async (dispatch) => {
  dispatch({ type: USER_ACTION_TYPE.GET_SESSIONS_CONFIG_PENDING });
  try {
    const response = await api.get("api/v1/tslGetSessionsConfig", {
      params: postData,
      headers: requestTokenHeader(),
    });
    if (response.data.errorCode === 0) {
      const responce = {
        result: response.data.data,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_SESSIONS_CONFIG_SUCESS,
        payload: responce,
      });
    } else {
      const responce = {
        result: [],
        records: 0,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_SESSIONS_CONFIG_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
    return dispatch({ type: USER_ACTION_TYPE.GET_SESSIONS_CONFIG_ERROR });
  }
};

export const getRegSessionById = (postData) => async (dispatch) => {
  dispatch({
    type: USER_ACTION_TYPE.GET_REGISTRANT_SESSIONS_BY_ID_PENDING,
  });
  try {
    const response = await api.get("api/v1/tslGetSessionsConfigById", {
      params: postData,
      headers: requestTokenHeader(),
    });
    if (response.data.errorCode === 0) {
      const responce = {
        result: response.data.data,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_REGISTRANT_SESSIONS_BY_ID_SUCESS,
        payload: responce,
      });
    } else {
      const responce = {
        result: [],
        records: 0,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_REGISTRANT_SESSIONS_BY_ID_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
    return dispatch({
      type: USER_ACTION_TYPE.GET_REGISTRANT_SESSIONS_BY_ID_ERROR,
    });
  }
};

export const updateRegistrantsSessions = (postData) => {
  return async (dispatch) => {
    try {
      const response = await api.post(
        "api/v1/tslUpdateSessionsConfig",
        postData,
        {
          headers: requestTokenHeader(),
        }
      );
      if (response.data.errorCode === 0) {
        var resultOutput = {};
        const userId = localStorage.getItem("userId");
        const eventId = sessionStorage.getItem("eventId");
        const regId = sessionStorage.getItem("regId");
        resultOutput.userId = userId;
        resultOutput.eventId = eventId;
        resultOutput.search = "";
        resultOutput.offset = 0;
        displaySuccessMessage("dataSaved");
        dispatch(
          getRegistrantSessions({
            lAccountID: userId,
            lEventID: eventId,
            lRegID: regId,
          })
        );
      } else {
        const responce = {
          result: "",
          records: 0,
          error_code: response.data.errorCode,
        };
        displayErrorMessage("dataSavedError");
      }
    } catch (err) {
      displayErrorMessage(err.name);
    }
  };
};

export const getRegPayments = (postData) => async (dispatch) => {
  dispatch({ type: USER_ACTION_TYPE.GET_REG_PAYMENTS_PENDING });
  try {
    const response = await api.get("api/v1/tslGetRegPayments", {
      params: postData,
      headers: requestTokenHeader(),
    });
    if (response.data.errorCode === 0) {
      const responce = {
        result: response.data.data,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_REG_PAYMENTS_SUCESS,
        payload: responce,
      });
    } else {
      const responce = {
        result: [],
        records: 0,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_REG_PAYMENTS_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
    return dispatch({ type: USER_ACTION_TYPE.GET_REG_PAYMENTS_ERROR });
  }
};

export const addRegPayments = (postData) => {
  return async (dispatch, getState) => {
    try {
      const response = await api.post("api/v1/tslAddRegPayments", postData, {
        headers: requestTokenHeader(),
      });
      if (response.data.errorCode === 0) {
        const userId = localStorage.getItem("userId");
        const eventId = sessionStorage.getItem("eventId");
        const regId = sessionStorage.getItem("regId");
        displaySuccessMessage("dataSaved");
        // dispatch(
        //   getGuestAdditionalRegistrants({
        //     lAccountID: userId,
        //     lEventID: eventId,
        //     lRegID: regId,
        //   })
        // );
        // dispatch(
        //   getQuestionsRegistrantsList({
        //     lAccountID: userId,
        //     lEventID: eventId,
        //   })
        // );
        // dispatch(
        //   getRegistrantSessions({
        //     lAccountID: userId,
        //     lEventID: eventId,
        //     lRegID: regId,
        //   })
        // );
        dispatch(
          getRegPayments({
            lAccountID: userId,
            lEventID: eventId,
            lRegID: regId,
          })
        );
      } else {
        displayErrorMessage("dataSavedError");
      }
    } catch (err) {
      displayErrorMessage(err.name);
    }
  };
};

export const getRegPaymentByID = (postData) => async (dispatch) => {
  dispatch({
    type: USER_ACTION_TYPE.GET_REG_PAYMENTS_BY_ID_PENDING,
  });
  try {
    const response = await api.get("api/v1/tslGetRegPaymentsByID", {
      params: postData,
      headers: requestTokenHeader(),
    });
    if (response.data.errorCode === 0) {
      const responce = {
        result: response.data.data,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_REG_PAYMENTS_BY_ID_SUCESS,
        payload: responce,
      });
    } else {
      const responce = {
        result: [],
        records: 0,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_REG_PAYMENTS_BY_ID_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
    return dispatch({
      type: USER_ACTION_TYPE.GET_REG_PAYMENTS_BY_ID_ERROR,
    });
  }
};

export const updateRegPayment = (postData) => {
  return async (dispatch) => {
    try {
      const response = await api.post("api/v1/tslUpdateRegPayments", postData, {
        headers: requestTokenHeader(),
      });
      if (response.data.errorCode === 0) {
        var resultOutput = {};
        const userId = localStorage.getItem("userId");
        const eventId = sessionStorage.getItem("eventId");
        const regId = sessionStorage.getItem("regId");
        resultOutput.userId = userId;
        resultOutput.eventId = eventId;
        resultOutput.search = "";
        resultOutput.offset = 0;
        displaySuccessMessage("dataSaved");
        dispatch(
          getRegPayments({
            lAccountID: userId,
            lEventID: eventId,
            lRegID: regId,
          })
        );
      } else {
        const responce = {
          result: "",
          records: 0,
          error_code: response.data.errorCode,
        };
        displayErrorMessage("dataSavedError");
      }
    } catch (err) {
      displayErrorMessage(err.name);
    }
  };
};

export const getRegAmount = (postData) => async (dispatch) => {
  dispatch({
    type: USER_ACTION_TYPE.GET_REG_AMOUNT_PENDING,
  });
  try {
    const response = await api.get("api/v1/tslGetRegAmount", {
      params: postData,
      headers: requestTokenHeader(),
    });
    if (response.data.errorCode === 0) {
      const responce = {
        result: response.data.data,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_REG_AMOUNT_SUCESS,
        payload: responce,
      });
    } else {
      const responce = {
        result: [],
        records: 0,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_REG_AMOUNT_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
    return dispatch({
      type: USER_ACTION_TYPE.GET_REG_AMOUNT_ERROR,
    });
  }
};

export const updateRegAmounts = (postData) => {
  return async (dispatch) => {
    try {
      const response = await api.post("api/v1/tslUpdateRegAmount", postData, {
        headers: requestTokenHeader(),
      });
      if (response.data.errorCode === 0) {
        var resultOutput = {};
        const userId = localStorage.getItem("userId");
        const eventId = sessionStorage.getItem("eventId");
        const regId = sessionStorage.getItem("regId");
        resultOutput.userId = userId;
        resultOutput.eventId = eventId;
        resultOutput.search = "";
        resultOutput.offset = 0;
        displaySuccessMessage("dataSaved");
        dispatch(
          getRegAmount({
            lAccountID: userId,
            lEventID: eventId,
            lRegID: regId,
          })
        );
      } else {
        const responce = {
          result: "",
          records: 0,
          error_code: response.data.errorCode,
        };
        displayErrorMessage("dataSavedError");
      }
    } catch (err) {
      displayErrorMessage(err.name);
    }
  };
};

export const createStripeIntent = (postData) => async (dispatch) => {
  dispatch({
    type: USER_ACTION_TYPE.GET_STRIPE_DETAILS_PENDING,
  });
    try {
      const response = await api.post("api/v1/tslCreateStripeIntent", postData, {
        headers: requestTokenHeader(),
      });
      if (response.data.errorCode === 0) {
        const responce = {
          result: response.data.result,
          error_code: response.data.errorCode,
        };
        return dispatch({
          type: USER_ACTION_TYPE.GET_STRIPE_DETAILS_SUCESS,
          payload: responce,
        });
      } else {
        const responce = {
          result: [],
          records: 0,
          error_code: response.data.errorCode,
        };
        return dispatch({
          type: USER_ACTION_TYPE.GET_STRIPE_DETAILS_SUCESS,
          payload: responce,
        });
      }
    } catch (err) {
      return dispatch({
        type: USER_ACTION_TYPE.GET_STRIPE_DETAILS_ERROR,
      });
    }
};

export const getRegistrant = (postData) => async (dispatch) => {
  dispatch({
    type: USER_ACTION_TYPE.GET_REGISTRANT_PENDING,
  });
  try {
    const response = await api.get("api/v1/tslGetRegistrants", {
      params: postData,
      headers: requestTokenHeader(),
    });
    if (response.data.errorCode === 0) {
      const responce = {
        result: response.data.data,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_REGISTRANT_SUCESS,
        payload: responce,
      });
    } else {
      const responce = {
        result: [],
        records: 0,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_REGISTRANT_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
    return dispatch({
      type: USER_ACTION_TYPE.GET_REGISTRANT_ERROR,
    });
  }
};

export const deleteAllRegistrant = (postData) => {
  return async (dispatch) => {
    try {
      const response = await api.post(
        "api/v1/tslDeleteRegistrants",
        postData,
        {
          headers: requestTokenHeader(),
        }
      );
      if (response.data.errorCode === 0) {
        var resultOutput = {};
        const userId = localStorage.getItem("userId");
        const eventId = sessionStorage.getItem("eventId");
        resultOutput.userId = userId;
        resultOutput.eventId = eventId;
        resultOutput.search = "";
        resultOutput.offset = 0;
        displaySuccessMessage("registrantsDeleted");
        dispatch(getRegistrantsList({lAccountID: userId, lEventID: eventId}))
      } else {
        const responce = {
          result: "",
          records: 0,
          error_code: response.data.errorCode,
        };
        displayErrorMessage("testMode");
      }
    } catch (err) {
      displayErrorMessage(err.name);
    }
  };
};

export const addRegistrantImport = (postData) => {
  return async (dispatch, getState) => {
    try {
      const response = await api.post(
        "api/v1/tslAddRegistrantsImport",
        postData,
        {
          headers: requestTokenHeader(),
        }
      );
      if (response.data.errorCode === 0) {
        displaySuccessMessage("dataSaved");
        const userId = localStorage.getItem("userId");
        const eventId = sessionStorage.getItem("eventId");
      } else {
        displayErrorMessage("dataSavedError");
      }
    } catch (err) {
      displayErrorMessage(err.name);
    }
  };
};

export const getRegistrantsInformationTemplate21 = (postData) => async (dispatch) => {
  dispatch({ type: USER_ACTION_TYPE.GET_REGISTRANTS_LIST_PENDING });
  try {
    const response = await api.get("api/v1/tslGetRegistrantsInformationTemplate21", {
      params: postData,
      headers: requestTokenHeader(),
    });
    if (response.data.errorCode === 0) {
      const responce = {
        result: response.data.data,
        records: response.data.total_records,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_REGISTRANTS_INFO_SUCESS,
        payload: responce,
      });
    } else {
      const responce = {
        result: [],
        records: 0,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_REGISTRANTS_INFO_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
    return dispatch({ type: USER_ACTION_TYPE.GET_REGISTRANTS_INFO_ERROR });
  }
};

export const getRegistrantSessionsTemplate21 = (postData) => async (dispatch) => {
  dispatch({ type: USER_ACTION_TYPE.GET_REGISTRANTS_LIST_PENDING });
  try {
    const response = await api.get("api/v1/tslGetRegistrantSessionsTemplate21", {
      params: postData,
      headers: requestTokenHeader(),
    });
    if (response.data.errorCode === 0) {
      const responce = {
        result: response.data.data,
        records: response.data.total_records,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_REGISTRANTS_SESSIONS_TEMPLATE21_SUCESS,
        payload: responce,
      });
    } else {
      const responce = {
        result: [],
        records: 0,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_REGISTRANTS_SESSIONS_TEMPLATE21_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
    return dispatch({ type: USER_ACTION_TYPE.GET_REGISTRANTS_SESSIONS_TEMPLATE21_ERROR });
  }
};

export const getRegistrantsInformationByIDTemplate21 = (postData) => async (dispatch) => {
  dispatch({ type: USER_ACTION_TYPE.GET_REGISTRANTS_INFO_BY_ID_TEMPLATE21_PENDING });
  try {
    const response = await api.get("api/v1/tslGetRegistrantsByIDTemplate21", {
      params: postData,
      headers: requestTokenHeader(),
    });
    if (response.data.errorCode === 0) {
      const responce = {
        result: response.data.data,
        records: response.data.total_records,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_REGISTRANTS_INFO_BY_ID_TEMPLATE21_SUCESS,
        payload: responce,
      });
    } else {
      const responce = {
        result: [],
        records: 0,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.GET_REGISTRANTS_INFO_BY_ID_TEMPLATE21_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
    return dispatch({ type: USER_ACTION_TYPE.GET_REGISTRANTS_INFO_BY_ID_TEMPLATE21_ERROR });
  }
};

export const clearRegistrantData=()=>{
  return async (dispatch) => {
       dispatch({type: USER_ACTION_TYPE.RESET_REG_DATA})
  }
}

export const clearAnswerData=()=>{
  return async (dispatch) => {
       dispatch({type: USER_ACTION_TYPE.RESET_ANSWER_DATA})
  }
}

export const clearRegistrantsSessionsData=()=>{
  return async (dispatch) => {
       dispatch({type: USER_ACTION_TYPE.RESET_REGISTRANTS_SESSIONS})
  }
}

