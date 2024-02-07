import React, { useState, useEffect } from "react";
import moment from "moment";

export function SectionRegistrantFullInfo(props) {
    
    const [userId, setUserId] = useState("");
    const [eventId, setEventId] = useState("");
    console.log('props.mainContactInformation',props.mainContactInformation)
    return (
        <>
            <table className="table table-striped table-bordered">
            <tbody>
                <tr>
                    <td colspan={2}>
                        <h5>Main Contact Information</h5>
                    </td>
                </tr>
                <tr>
                    <td><label>First Name</label></td>
                    <td>{props.mainContactInformation.sFirstName ? props.mainContactInformation.sFirstName : ''}</td>
                </tr>
                <tr>
                    <td><label>last Name</label></td>
                    <td>{props.mainContactInformation.sLastName ? props.mainContactInformation.sLastName : ''}</td>
                </tr>
                <tr>
                    <td><label>Credentials</label></td>
                    <td>{props.mainContactInformation.sCredentials ? props.mainContactInformation.sCredentials : ''}</td>
                </tr>
                <tr>
                    <td><label>Title</label></td>
                    <td>{props.mainContactInformation.sTitle ? props.mainContactInformation.sTitle : ''} </td>
                </tr>
                <tr>
                    <td><label>Company</label></td>
                    <td>{props.mainContactInformation.sCompany ? props.mainContactInformation.sCompany : ''}</td>
                </tr>

                <tr>
                    <td><label>Address 1:</label></td>
                    <td>{props.mainContactInformation.sAddress1 ? props.mainContactInformation.sAddress1 : ''}</td>
                </tr>
                <tr>
                    <td><label>Address 2:</label></td>
                    <td>{props.mainContactInformation.sAddress2 ? props.mainContactInformation.sAddress2 : ''}</td>
                </tr>
                <tr>
                    <td><label>Address 3:</label></td>
                    <td>{props.mainContactInformation.sAddress3 ? props.mainContactInformation.sAddress3 : ''} </td>
                </tr>
                <tr>
                    <td><label>City:</label></td>
                    <td>{props.mainContactInformation.sCity ? props.mainContactInformation.sCity : ''}</td>
                </tr>

                <tr>
                    <td><label>State/Province</label></td>
                    <td>{props.mainContactInformation.sState ? props.mainContactInformation.sState : ''}</td>
                </tr>
                <tr>
                    <td><label>Postal Code</label></td>
                    <td>{props.mainContactInformation.sZip ? props.mainContactInformation.sZip : ''}</td>
                </tr>
                <tr>
                    <td><label>Phone</label></td>
                    <td>{props.mainContactInformation.sPhone ? props.mainContactInformation.sPhone : ''}</td>
                </tr>
                <tr>
                    <td><label>Email:</label></td>
                    <td>{props.mainContactInformation.sEmail ? props.mainContactInformation.sEmail : ''} </td>
                </tr>
            </tbody>
            </table>
                    
        </>
    );
}
