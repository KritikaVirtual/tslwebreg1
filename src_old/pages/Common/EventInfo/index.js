import React, { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import AdminLayout from "../../../Layout";
import { getEventById,updateEventInfo } from "../../../Services/Store/Common/eventInfo/eventsInfo.action";
import { eventField } from "../../../Services/Store/Common/eventInfo/eventsInfo.selector";
import { EventForm } from "./EventForm";
import "./index.css";

const Event = () => {
  const [userId, setUserId] = useState('');
  const [eventId, setEventId] = useState('');
  const [fetchEventData, setFetchEventData] = useState([]);
  const dispatch = useDispatch();
  const { result, blocking } = useSelector(eventField);

  useEffect(() => {
    let isLogin = false
    if(JSON.parse(sessionStorage.getItem("adminToken"))){
      isLogin = true;
    }else if(JSON.parse(sessionStorage.getItem("clientToken"))){
      isLogin = true;
    }
    const eventId = JSON.parse(sessionStorage.getItem("eventId"));
    if(eventId){
      setEventId(eventId)
    }
    const userId = JSON.parse(localStorage.getItem("userId"));
    if (userId) {
      setUserId(userId);
    }
    dispatch(getEventById({ eventId, userId }));
  }, []);

  useEffect(() => {
    if (result !== undefined) {
      setFetchEventData(result);
    }
  }, [result]);

  // const eventData = async (data) => {
  //   const eventId = JSON.parse(sessionStorage.getItem("eventId"));
  //   const userId = JSON.parse(localStorage.getItem("userId"));
  //   dispatch(getEventById({ eventId, userId }));
  // };

  const submitEventInfo = async (params) => {
    dispatch(updateEventInfo(params));
    const userId = JSON.parse(localStorage.getItem("userId"));
    if (userId) {
      setUserId(userId);
    }
  };

  return (
    <>
      <AdminLayout pageHeading={JSON.parse(sessionStorage.getItem("eventName"))}>
        <div className="container-fluid">
        <div className="row">
            <div className="col-md-12 col-xs-12">
              <h3>Event Info</h3>
            </div>
          </div>
          <div className="container-fluid demo">
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Events Info</Accordion.Header>
                <Accordion.Body>
                  
                    <EventForm
                      userId={userId}
                      eventId={eventId}
                      fetchEventData={fetchEventData}
                      updateEventInfo={(data) =>
                        submitEventInfo(data)}
                      // eventData={(data) => eventData(data)}
                    />
          
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};
export default Event;
