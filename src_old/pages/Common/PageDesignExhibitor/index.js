import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import AdminLayout from "../../../Layout";
import { pageDesignExhibitorSelector } from "../../../Services/Store/Common/pageDesignExhibitor/pageDesignExhibitor.selector";

import {
  getPageDesignExhibitor,
  updatePageDesignExhibitor,
} from "../../../Services/Store/Common/pageDesignExhibitor/pageDesignExhibitor.action";

import "./index.css";
import CommonPageSectionEditor from "../PageDesign/CommonPageSectionEditor";
import StepsTitleDescExhibitor from "./StepsTitleDescExhibitor";

const PageDesignExhibitor = () => {
  const [userId, setUserId] = useState("");
  const [eventId, setEventId] = useState("");
  const [pageDesignExhibitorData, setPageDesignExhibitorData] = useState([]);
  const [headerResult, setHeaderResult] = useState("");
  const [footerResult, setFooterResult] = useState("");
  const [stepsTitleDescExhibitorResult, setStepsTitleDescExhibitorResult] =
    useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pageDesignExhibitor = useSelector(pageDesignExhibitorSelector);

  useEffect(() => {
    const loginCheck = JSON.parse(sessionStorage.getItem("adminToken"))
      ? JSON.parse(sessionStorage.getItem("adminToken"))
      : JSON.parse(sessionStorage.getItem("clientToken"))
      ? JSON.parse(sessionStorage.getItem("clientToken"))
      : "";
    if (!loginCheck) {
      navigate("/");
    }
    const lAccountID = JSON.parse(localStorage.getItem("userId"));
    if (lAccountID) {
      setUserId(lAccountID);
    }
    const lEventID = JSON.parse(sessionStorage.getItem("eventId"));
    if (lEventID) {
      setEventId(lEventID);
    }

    if (lAccountID && lEventID) {
      dispatch(getPageDesignExhibitor({ lAccountID, lEventID }));
    }
  }, []);

  useEffect(() => {
    if (
      pageDesignExhibitor.pageDesignExhibitor !== undefined &&
      pageDesignExhibitor.pageDesignExhibitor.error_code === 0
    ) {
      const pageDesignExhibitorResult =
        pageDesignExhibitor.pageDesignExhibitor.result;

      setPageDesignExhibitorData(pageDesignExhibitorResult);
      setHeaderResult(pageDesignExhibitorResult.mPageHeaderExh);
      setFooterResult(pageDesignExhibitorResult.mPageFooterExh);
    }
  }, [pageDesignExhibitor]);

  const getHeaderResult = (result) => {
    setHeaderResult(result);
  };

  const getFooterResult = (result) => {
    setFooterResult(result);
  };

  const getStepsTitleDescResultExhibitor = (result) => {
    setStepsTitleDescExhibitorResult(result);
  };

  const _handleSubmit = (event) => {
    event.preventDefault();
    if (userId && eventId) {
      const postData = {
        mPageHeaderExh: headerResult,
        mPageFooterExh: footerResult,
        stepsTitleDesc: stepsTitleDescExhibitorResult,
        lEventID: eventId,
        lAccountID: userId,
      };
      dispatch(updatePageDesignExhibitor(postData));
    }
  };
  return (
    <>
      <AdminLayout pageHeading="Page Design Group Registration">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 col-xs-12">
              <h3>Page Design Group Registration</h3>
            </div>
          </div>
          <div className="container-fluid demo">
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Page Header</Accordion.Header>
                <Accordion.Body>
                  <CommonPageSectionEditor
                    pageTitle="Enter the text you want to show at the top of the page"
                    backData={(data) => getHeaderResult(data)}
                    fetchData={pageDesignExhibitorData.mPageHeaderExh}
                    editorType={"headerEditor"}
                  />
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="3">
                <Accordion.Header>Page Footer</Accordion.Header>
                <Accordion.Body>
                  <CommonPageSectionEditor
                    pageTitle="Enter the text you want to show at the bottom of the page"
                    backData={(data) => getFooterResult(data)}
                    fetchData={pageDesignExhibitorData.mPageFooterExh}
                    editorType={"footerEditor"}
                  />
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="4">
                <Accordion.Header>
                  Steps, Title, Description and Text
                </Accordion.Header>
                <Accordion.Body>
                  <StepsTitleDescExhibitor
                    backData={(data) => getStepsTitleDescResultExhibitor(data)}
                    fetchData={pageDesignExhibitorData}
                  />
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <div>
              <button
                type="submit"
                onClick={(event) => _handleSubmit(event)}
                className="btn btn-save"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};
export default PageDesignExhibitor;
