import React, { useState, useEffect } from "react";
import moment from "moment";

export function SectionEventInfoBasic(props) {
    
    const [userId, setUserId] = useState("");
    const [eventId, setEventId] = useState("");
    
    return (
        <>
            <table className="table table-striped table-bordered">
            <tbody>
                <tr>
                    <td colspan={2}>
                        <h5>Event Information</h5>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Event</label>
                    </td>
                    <td>
                        {props.eventData.sName} 
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Location</label>
                    </td>
                    <td>
                        {props.eventData.sLocation} 
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Start Date</label>
                    </td>
                    <td>
                        {props.eventData.dtStart ? moment(props.eventData.dtStart).format("YYYY-MM-DD") : ''} 
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>End Date</label>
                    </td>
                    <td>
                        {props.eventData.dtEnd ? moment(props.eventData.dtEnd).format("YYYY-MM-DD") : ''}
                    </td>
                </tr>
                {/* {props.registrantsListData !== undefined &&
                props.registrantsListData !== "" ? (
                callPageRecords(props.registrantsListData)
                ) : (
                <tr className="noRecords" colSpan={4}>
                    No Records Found
                </tr>
                )} */}
            </tbody>
            </table>
        </>
    );
}
