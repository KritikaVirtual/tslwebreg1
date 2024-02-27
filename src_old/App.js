import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./sb-admin-2.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Client";
import Event from "./pages/Common/Event";
import SignUpForm from "./pages/Admin/SignUpForm";
import AdminDashboard from "./pages/AdminDashboard";
import Admin from "./pages/Admin/Login";
import UserList from "./pages/Admin/UserList/index";
import Account from "./pages/Common/Account";
import EventInfo from "./pages/Common/EventInfo";
import PageDesign from "./pages/Common/PageDesign";
import FieldsQADiscSessions from "./pages/Common/FieldsQ&ADiscSessions";
import PageDesignGrpReg from "./pages/Common/PageDesignGrpReg";
import PageDesignExhibitor from "./pages/Common/PageDesignExhibitor";
import ExhibitorList from "./pages/Common/ExhibitorList";
import { ExhibitorInfo } from "./pages/Common/ExhibitorInfo";
import ExhibitorsImport from "./pages/Common/ExhibitorsImport";
import { store } from "./Services/Store/store";
import { Provider } from "react-redux";
import EmailSetup from "./pages/Common/EmailSetup";
import Registrants from "./pages/Common/RegistrantList";
import { RegInfo } from "./pages/Common/RegInfo";
import { Template1 } from "./pages/Common/Template1";
import RegistrantsImport from "./pages/Common/RegistrantsImport";
import { Template1Start } from "./pages/Common/Template1Start";
import { Template21 } from "./pages/Common/Template21";
import { RegInfoGroup } from "./pages/Common/RegInfoGroup";
import Member from "./pages/Common/Members";
import  AddMember from "./pages/Common/Members/AddMember";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route exact={true} path="/admin" element={<Admin />} />
            <Route exact={true} path="/login" element={<Login />} />
            <Route exact={true} path="/adminSignup" element={<SignUpForm />} />
            <Route
              exact={true}
              path="/adminDashboard"
              element={<AdminDashboard />}
            />
            <Route exact={true} path="/event" element={<Event />} />
            <Route exact={true} path="/eventinfo" element={<EventInfo />} />
            <Route exact={true} path="/userList" element={<UserList />} />
            <Route exact={true} path="/account" element={<Account />} />
            <Route exact={true} path="/pagedesign" element={<PageDesign />} />
            <Route
              exact={true}
              path="/questionnaire"
              element={<FieldsQADiscSessions />}
            />
            <Route
              exact={true}
              path="/pagedesigngrpreg"
              element={<PageDesignGrpReg />}
            />
            <Route
              exact={true}
              path="/pagedesignexhibitor"
              element={<PageDesignExhibitor />}
            />
            <Route
              exact={true}
              path="/exhibitorList"
              element={<ExhibitorList />}
            />
            <Route
              exact={true}
              path="/exhibitorInfo"
              element={<ExhibitorInfo />}
            />
            <Route
              exact={true}
              path="/exhibitorImport"
              element={<ExhibitorsImport />}
            />
            <Route exact={true} path="/emailSetup" element={<EmailSetup />} />
            <Route exact={true} path="/reglist" element={<Registrants />} />
            <Route exact={true} path="/regInfo" element={<RegInfo />} />
            <Route exact={true} path="/addMember" element={<AddMember />} />

            <Route
              exact={true}
              path="/regInfoGroup"
              element={<RegInfoGroup />}
            />

            <Route exact={true} path="/template1" element={<Template1 />} />
            <Route exact={true} path="/template21" element={<Template21 />} />

            <Route
              exact={true}
              path="/regimport"
              element={<RegistrantsImport />}
            />

            <Route
              exact={true}
              path="/template1start"
              element={<Template1Start />}
            />
            <Route exact={true} path="/members" element={<Member />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
};
export default App;
