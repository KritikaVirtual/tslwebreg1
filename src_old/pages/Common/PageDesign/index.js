import React, { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../../../Layout";
import CommonPageSectionEditor from "./CommonPageSectionEditor";
import {
  getPageDesignById,
  updatePageDesign,
  getRegTypesPageDesign,
  addRegistrationTypes,
  getRegTypesByID,
  updateRegistrationTypes,
  getRegCategoriesPageDesign,
  addRegistrationCategories,
  getSCodeRegCategory,
  getRegCategoriesByID,
  updateRegistrationCategories,
} from "../../../Services/Store/Common/pageDesign/pageDesign.action";
import {
  pageDesignSelector,
  regTypesPageDesignSelector,
  regTypesByIDSelector,
  regCategoriesPageDesignSelector,
} from "../../../Services/Store/Common/pageDesign/pageDesign.selector";

import { getEventList } from "../../../Services/Store/Common/events/events.action";
import { eventListSelector } from "../../../Services/Store/Common/events/event.selector";
import "./index.css";
import RegistrationTypes from "./RegistrationTypes";
import RegistrationCategories from "./RegistrationCategories";
import StepsTitleDesc from "./StepsTitleDesc";

const PageDesign = () => {
  const [headerResult, setHeaderResult] = useState("");
  const [footerResult, setFooterResult] = useState("");
  const [eventResult, setEventResult] = useState("");
  const [stepsTitleDescResult, setStepsTitleDescResult] = useState("");
  const [eventId, setEventId] = useState("");
  const [userId, setUserId] = useState("");
  const [pageDesignData, setPageDesignData] = useState([]);
  const [regTypesPageDesignData, setRegTypesPageDesignData] = useState([]);
  const [regScodeData, setRegScodeData] = useState([]);

  const [regCategoriesPageDesignData, setRegCategoriesPageDesignData] =
    useState([]);
  const [regTypeByIdData, setRegTypeByIdData] = useState([]);
  const [regCategoryByIdData, setRegCategoryByIdData] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [searchKeyword, setsearchKeyword] = useState(false);
  const [search, setSearch] = useState("");
  const [regTypesRecordsData, setRegTypesRecordsData] = useState(0);
  const [regCategoriesRecordsData, setRegCategoriesRecordsData] = useState(0);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const pageDesign = useSelector(pageDesignSelector);
  const regTypesPageDesign = useSelector(regTypesPageDesignSelector);
  const regTypeById = useSelector(regTypesByIDSelector);
  const regCategoriesPageDesign = useSelector(regCategoriesPageDesignSelector);
  // const regScode = useSelector(regScodeSelector);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const { eventList, blocking } = useSelector(eventListSelector);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let isLogin = false;
    if (JSON.parse(sessionStorage.getItem("adminToken"))) {
      isLogin = true;
    } else if (JSON.parse(sessionStorage.getItem("clientToken"))) {
      isLogin = true;
    }

    const lAccountID = localStorage.getItem("userId");
    let lEventID = sessionStorage.getItem("eventId");

    if (JSON.parse(lAccountID)) {
      setUserId(lAccountID);
    }
    if (JSON.parse(lEventID)) {
      setEventId(lEventID);
    }
    if (lAccountID && lEventID) {
      dispatch(getPageDesignById({ lEventID, lAccountID }));
      dispatch(
        getRegTypesPageDesign({ lEventID, lAccountID, offset: offset, search })
      );
      dispatch(
        getRegCategoriesPageDesign({
          lEventID,
          lAccountID,
          offset: offset,
          search,
        })
      );
      dispatch(getSCodeRegCategory({ lEventID, lAccountID }));
    }
  }, []);

  useEffect(() => {
    if (
      pageDesign.pageDesign !== undefined &&
      pageDesign.pageDesign.error_code === 0
    ) {
      const pageDesignresult = pageDesign.pageDesign.result;

      setPageDesignData(pageDesignresult);
      setHeaderResult(pageDesignresult.mPageHeader);
      setFooterResult(pageDesignresult.mPageFooter);
      setEventResult(pageDesignresult.mEventCloseText);
    }
    if (
      pageDesign.regTypesPageDesign !== undefined &&
      pageDesign.regTypesPageDesign.error_code === 0
    ) {
      const regTypesPageDesignresult = pageDesign.regTypesPageDesign.result;
      setRegTypesPageDesignData(regTypesPageDesignresult);
      setRegTypesRecordsData(pageDesign.regTypesPageDesign.records);
      setLoading(pageDesign.regTypesPageDesign.blocking);
    } else {
      setRegTypesPageDesignData([]);
      setRegTypesRecordsData([]);
      setLoading(false);
    }
    if (
      pageDesign.regTypesById !== undefined &&
      pageDesign.regTypesById.error_code === 0
    ) {
      const regTypeByIdresult = pageDesign.regTypesById.result;

      setRegTypeByIdData(regTypeByIdresult);
    } else {
      setRegTypeByIdData([]);
    }

    if (
      pageDesign.regCategoriesPageDesign !== undefined &&
      pageDesign.regCategoriesPageDesign.error_code === 0
    ) {
      const regCategoriesPageDesignresult =
        pageDesign.regCategoriesPageDesign.result;
      setRegCategoriesPageDesignData(regCategoriesPageDesignresult);
      setRegCategoriesRecordsData(pageDesign.regCategoriesPageDesign.records);
      setLoading(pageDesign.regCategoriesPageDesign.blocking);
    } else {
      setRegCategoriesPageDesignData([]);
      setRegCategoriesRecordsData([]);
      setLoading(false);
    }

    if (
      pageDesign.regScode !== undefined &&
      pageDesign.regScode.error_code === 0
    ) {
      const regScoderesult = pageDesign.regScode.result;
      setRegScodeData(regScoderesult);
      setLoading(pageDesign.regScode.blocking);
    } else {
      setRegScodeData([]);
      setLoading(false);
    }

    if (
      pageDesign.regCategoriesById !== undefined &&
      pageDesign.regCategoriesById.error_code === 0
    ) {
      const regCategoryByIdresult = pageDesign.regCategoriesById.result;
      setRegCategoryByIdData(regCategoryByIdresult);
    } else {
      setRegCategoryByIdData([]);
    }
  }, [pageDesign]);

  const getHeaderResult = (result) => {
    setHeaderResult(result);
  };
  const getFooterResult = (result) => {
    setFooterResult(result);
  };

  const getEventResult = (result) => {
    setEventResult(result);
  };

  const getStepsTitleDescResult = (result) => {
    setStepsTitleDescResult(result);
  };

  const filterData = (data) => {
    setSearch(data.search);
    const offset = data.offset;
    const search = data.search;
    const name = data.name;
    const searchType = data.searchType;
    const lEventID = JSON.parse(sessionStorage.getItem("eventId"));
    setOffset(offset);
    if (JSON.parse(lEventID)) {
      setEventId(lEventID);
    }
    const lAccountID = JSON.parse(localStorage.getItem("userId"));
    if (JSON.parse(lAccountID)) {
      setUserId(lAccountID);
    }

    if (lAccountID && lEventID) {
      if (name === "categorySearch") {
        dispatch(
          getRegCategoriesPageDesign({
            lEventID,
            lAccountID,
            offset: offset,
            search,
            searchType,
          })
        );
      } else {
        dispatch(
          getRegTypesPageDesign({
            lEventID,
            lAccountID,
            offset: offset,
            search,
            searchType,
          })
        );
      }
    }
  };

  const saveRegistrationType = (params) => {
    dispatch(addRegistrationTypes(params));
  };

  const updateRegistrationType = (params) => {
    dispatch(updateRegistrationTypes(params));
  };

  const saveRegCategories = (params) => {
    dispatch(addRegistrationCategories(params));
  };

  const updateRegCategories = (params) => {
    dispatch(updateRegistrationCategories(params));
  };

  const _handleSubmit = (event) => {
    event.preventDefault();
    if (eventId && userId) {
      const postData = {
        mPageHeader: headerResult,
        mPageFooter: footerResult,
        mEventCloseText: eventResult,
        sStep1Title: stepsTitleDescResult.sStep1Title,
        sStep1Desc: stepsTitleDescResult.sStep1Desc,
        sStep1Text: stepsTitleDescResult.sStep1Text,
        sStep1TextBottom: stepsTitleDescResult.sStep1TextBottom,
        sStep2Title: stepsTitleDescResult.sStep2Title,
        sStep2Desc: stepsTitleDescResult.sStep2Desc,
        sStep2Text: stepsTitleDescResult.sStep2Text,
        sStep2TextBottom: stepsTitleDescResult.sStep2TextBottom,
        sStep3Title: stepsTitleDescResult.sStep3Title,
        sStep3Desc: stepsTitleDescResult.sStep3Desc,
        sStep3Text: stepsTitleDescResult.sStep3Text,
        sStep3TextBottom: stepsTitleDescResult.sStep3TextBottom,
        sStep4Title: stepsTitleDescResult.sStep4Title,
        sStep4Desc: stepsTitleDescResult.sStep4Desc,
        sStep4Text: stepsTitleDescResult.sStep4Text,
        sStep4TextBottom: stepsTitleDescResult.sStep4TextBottom,
        sStep5Title: stepsTitleDescResult.sStep5Title,
        sStep5Desc: stepsTitleDescResult.sStep5Desc,
        sStep5Text: stepsTitleDescResult.sStep5Text,
        sStep5TextBottom: stepsTitleDescResult.sStep5TextBottom,
        sStep6Title: stepsTitleDescResult.sStep6Title,
        sStep6Desc: stepsTitleDescResult.sStep6Desc,
        mPaymentTerms: stepsTitleDescResult.mPaymentTerms,
        sStep6Text: stepsTitleDescResult.sStep6Text,
        sStep6TextBottom: stepsTitleDescResult.sStep6TextBottom,
        sStep7Title: stepsTitleDescResult.sStep7Title,
        sStep7Desc: stepsTitleDescResult.sStep7Desc,
        sStep7Text: stepsTitleDescResult.sStep7Text,
        sStep7TextBottom: stepsTitleDescResult.sStep7TextBottom,
        lEventID: eventId,
        lAccountID: userId,
      };
      dispatch(updatePageDesign(postData));
    }
  };

  const regTypesByID = (data) => {
    dispatch(getRegTypesByID(data));
  };

  const regCategoriesByID = (data) => {
    dispatch(getRegCategoriesByID(data));
  };

  return (
    <>
      <AdminLayout pageHeading="Page Design">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 col-xs-12">
              <h3>Page Design</h3>
            </div>
          </div>

          <div className="container-fluid demo">
            {/* <form onSubmit={(event) => _handleSubmit(event)}> */}
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Page Header</Accordion.Header>
                <Accordion.Body>
                  <CommonPageSectionEditor
                    pageTitle="Enter the text you want to show at the top of the page"
                    backData={(data) => getHeaderResult(data)}
                    fetchData={pageDesignData.mPageHeader}
                    editorType={"headerEditor"}
                  />
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Page Footer</Accordion.Header>
                <Accordion.Body>
                  <CommonPageSectionEditor
                    pageTitle="Enter the text you want to show at the bottom of the page"
                    backData={(data) => getFooterResult(data)}
                    fetchData={pageDesignData.mPageFooter}
                    editorType={"footerEditor"}
                  />
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Event Closed Text</Accordion.Header>
                <Accordion.Body>
                  <CommonPageSectionEditor
                    pageTitle="Enter the text you want to display when the registration is closed"
                    backData={(data) => getEventResult(data)}
                    fetchData={pageDesignData.mEventCloseText}
                    editorType={"eventClosedTextEditor"}
                  />
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Registration Types</Accordion.Header>
                <Accordion.Body>
                  <RegistrationTypes
                    containerClassName={"paginationRegistartion"}
                    saveRegTypes={(data) => saveRegistrationType(data)}
                    updateRegTypes={(data) => updateRegistrationType(data)}
                    regTypeData={regTypesPageDesignData}
                    filterDataRegistrationType={(data) => filterData(data)}
                    totalPagesRegistrationTypes={regTypesRecordsData}
                    getRegTypesByID={(data) => regTypesByID(data)}
                    regTypeByIdData={regTypeByIdData}
                    loading={loading}
                  />
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <Accordion>
              <Accordion.Item eventKey="3">
                <Accordion.Header>
                  {" "}
                  Registrations Categories (Those will appear in step 1)
                </Accordion.Header>
                <Accordion.Body>
                  <RegistrationCategories
                    containerClassName={"paginationCategories"}
                    getRegScode={regScodeData}
                    saveRegCategories={(data) => saveRegCategories(data)}
                    updateRegCategories={(data) => updateRegCategories(data)}
                    regCategoriesData={regCategoriesPageDesignData}
                    getRegCategoriesByID={(data) => regCategoriesByID(data)}
                    regCategoryByIdData={regCategoryByIdData}
                    filterData={(data) => filterData(data)}
                    totalPages={regCategoriesRecordsData}
                    loading={loading}
                  />
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <Accordion>
              <Accordion.Item eventKey="4">
                <Accordion.Header>Page Details</Accordion.Header>
                <Accordion.Body>
                  <StepsTitleDesc
                    backData={(data) => getStepsTitleDescResult(data)}
                    fetchData={pageDesignData}
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
            {/* </form> */}
          </div>
        </div>
      </AdminLayout>
    </>
  );
};
export default PageDesign;
