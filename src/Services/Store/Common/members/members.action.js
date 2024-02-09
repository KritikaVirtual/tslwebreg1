import { USER_ACTION_TYPE } from "../../../Constant/user.constants";
import { requestTokenHeader } from "../../../Helpers/helper";
import api from "../../../Axios/index";

export const getMemberList = (postData) => async (dispatch) => {
  dispatch({ type: USER_ACTION_TYPE.SET_MEMBER_LIST_PENDING });
  try {
    const response = await api.get("api/v1/tslGetMembersList", {
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
        type: USER_ACTION_TYPE.SET_MEMBER_LIST_SUCESS,
        payload: responce,
      });
    } else {
      const responce = {
        result: "",
        records: 0,
        error_code: response.data.errorCode,
      };
      return dispatch({
        type: USER_ACTION_TYPE.SET_MEMBER_LIST_SUCESS,
        payload: responce,
      });
    }
  } catch (err) {
    return dispatch({ type: USER_ACTION_TYPE.SET_MEMBER_LIST_ERROR });
  }
};
