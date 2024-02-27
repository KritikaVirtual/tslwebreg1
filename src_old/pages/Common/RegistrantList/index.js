import React, { useState, useEffect } from "react";
import { Accordion } from "react-bootstrap";
import AdminLayout from "../../../Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RegList from "./RegList";
import { getRegistrantsList, deleteAllRegistrant, getAdditionalRegistrantsList } from "../../../Services/Store/Common/registrants/registrants.action";
import { registrantsSelector } from "../../../Services/Store/Common/registrants/registrants.selector";
import "./index.css";

const Registrants = () => {
  const [userId, setUserId] = useState("");
  const [eventId, setEventId] = useState("");
  const [offset, setOffset] = useState(0);
  const [registrantsListData, setRegistrantsListData] = useState([]);
  const [registrantsListRecordsData, setRegistrantsListRecordsData] =
    useState("");
  const [additionalRegistrantListData, setAdditionalRegistrantListData] =
  useState("");
  const [additionalRegistrantListRecordsData, setAdditionalRegistrantListRecordsData] =
    useState("");
    
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registrants = useSelector(registrantsSelector);

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
      dispatch(
        getRegistrantsList({ lAccountID, lEventID, offset: offset, search })
      );
      dispatch(
        getAdditionalRegistrantsList({ lAccountID, lEventID, offset: offset, search })
      );
    }
  }, []);
  // console.log('registrants',registrants.registrantsList)
  useEffect(() => {
    if (
      registrants.registrantsList !== undefined &&
      registrants.registrantsList.error_code === 0
    ) {
      const registrantsResult = registrants.registrantsList.result;
      setRegistrantsListData(registrantsResult);
      setRegistrantsListRecordsData(registrants.registrantsList.records);
      // console.log('registrantsResult',registrantsResult)
    }

    if (
      registrants.additionalRegistrantList !== undefined &&
      registrants.additionalRegistrantList.error_code === 0
    ) {
      const registrantsResult = registrants.additionalRegistrantList.result;
      setAdditionalRegistrantListData(registrantsResult);
      setAdditionalRegistrantListRecordsData(registrants.additionalRegistrantList.records);
      // console.log('registrantsResult',registrantsResult)
    }
  }, [registrants]);

  // console.log('registrantsListData',registrantsListData)

  const filterData = (data) => {
    setSearch(data.search);
    const offset = data.offset;
    const search = data.search;
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
      dispatch(
        getRegistrantsList({
          lEventID,
          lAccountID,
          offset: offset,
          search,
          searchType,
        })
      );
    }
  };

  const deleteRegistrants = () => {
    if(userId && eventId){
      dispatch(deleteAllRegistrant({lAccountID : userId, lEventID: eventId}))
    }
  } 

  return (
    <>
      <AdminLayout pageHeading="Registrants List">
        <div className="container-fluid">
          <div className="container-fluid demo">
            <div className="row">
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Registrants </Accordion.Header>
                  <Accordion.Body>
                    <RegList
                      registrantsListData={(registrants.registrantsList &&
                        registrants.registrantsList.result!==undefined && 
                        registrants.registrantsList.error_code === 0) ? registrants.registrantsList.result : []}
                      additionalRegistrantsListData={(registrants.additionalRegistrantList &&
                        registrants.additionalRegistrantList.result!==undefined && 
                        registrants.additionalRegistrantList.error_code === 0) ? registrants.additionalRegistrantList.result : []}
                      totalPages={registrantsListRecordsData}
                      filterData={(data) => filterData(data)}
                      deleteRegistrant = {() => deleteRegistrants()}
                    />
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};
export default Registrants;
