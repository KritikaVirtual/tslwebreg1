import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
const AdminLayout = (props) => {
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  return (
    <React.Fragment>
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Header pageHeading={props.pageHeading} />
            {props.children}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default AdminLayout;
