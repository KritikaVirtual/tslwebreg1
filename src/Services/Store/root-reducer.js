import { combineReducers } from 'redux';
import { userListByIdReducer,paymentDetailsReducer } from './Common/account/account.reducer';
import { userReducer} from './Admin/adminLogin/user.reducer';
import { eventListReducer } from './Common/events/events.reducer';
import { signUpReducer} from './Admin/signUpForm/signup.reducer';
import { userListReducer } from './Admin/userList/userList.reducer';
import { ClientReducer } from './ClientLogin/client.reducer';
import { eventInfoReducer } from './Common/eventInfo/eventsInfo.reducer';
import { pageDesignReducer} from './Common/pageDesign/pageDesign.reducer';
import {fieldQADiscSessionsReducer} from './Common/fieldsQ&ADiscSessions/fields.reducer';
import { pageDesignGrpRegReducer } from './Common/pageDesignGrpReg/pageDesignGrp.reducer';
import { pageDesignExhibitorReducer } from './Common/pageDesignExhibitor/pageDesignExhibitor.reducer';
import { exhibitorListReducer,exhibitorListByIdReducer } from './Common/exhibitorList/exhibitorList.reducer';
import { emailSetupReducer } from './Common/emailSetup/emailSetup.reducer';
import { registrantsReducer } from './Common/registrants/registrants.reducer';
import { template1Reducer } from './Common/template1/template1.reducer';
import { template21Reducer } from './Common/template21/template21.reducer';
export const rootReducer=combineReducers({
    user: userReducer,
    signup: signUpReducer,
    userClient:ClientReducer,
    userList:userListReducer,
    userListById:userListByIdReducer,
    paymentDetails:paymentDetailsReducer,
    eventList:eventListReducer,
    eventInfo: eventInfoReducer,
    pageDesign:pageDesignReducer,
    fieldQADiscSessions:fieldQADiscSessionsReducer,
    pageDesignGrpReg:pageDesignGrpRegReducer,
    exhibitorList:exhibitorListReducer,
    exhibitorListById:exhibitorListByIdReducer,
    emailSetup:emailSetupReducer,
    registrants:registrantsReducer,
    template1:template1Reducer,
    template21: template21Reducer
});