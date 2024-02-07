import React, { useState, useEffect } from "react";
import moment from "moment";

export function SectionRegistrantFullInfo(props) {
    
    const [userId, setUserId] = useState("");
    const [eventId, setEventId] = useState("");

    console.log('props.registrantInformation',props.registrantInformation)
    
    return (
        <>
            <table className="table table-striped table-bordered">
            <tbody>
                <tr>
                    <td colspan={2}>
                        <h5>Registrant Information</h5>
                    </td>
                </tr>
                <tr>
                    <td><label>Prefix</label></td>
                    <td>{props.registrantInformation.sPrefix ? props.registrantInformation.sPrefix :''}</td>
                </tr>
                <tr>
                    <td><label>First Name</label></td>
                    <td>{props.registrantInformation.sFirstName ? props.registrantInformation.sFirstName : ''}</td>
                </tr>
                <tr>
                    <td><label>Middle Name</label></td>
                    <td>{props.registrantInformation.sMiddleName ? props.registrantInformation.sMiddleName : ''} </td>
                </tr>
                <tr>
                    <td><label>last Name</label></td>
                    <td>{props.registrantInformation.sLastName ? props.registrantInformation.sLastName : ''}</td>
                </tr>

                <tr>
                    <td><label>Suffix</label></td>
                    <td>{props.registrantInformation.sSuffix ? props.registrantInformation.sSuffix : ''}</td>
                </tr>
                <tr>
                    <td><label>Credentials</label></td>
                    <td>{props.registrantInformation.sCredentials ? props.registrantInformation.sCredentials : ''}</td>
                </tr>
                <tr>
                    <td><label>Title</label></td>
                    <td>{props.registrantInformation.sTitle ? props.registrantInformation.sTitle : ''} </td>
                </tr>
                <tr>
                    <td><label>Company</label></td>
                    <td>{props.registrantInformation.sCompany ? props.registrantInformation.sCompany : ''}</td>
                </tr>

                <tr>
                    <td><label>Address 1:</label></td>
                    <td>{props.registrantInformation.sAddress1 ? props.registrantInformation.sAddress1 : ''}</td>
                </tr>
                <tr>
                    <td><label>Address 2:</label></td>
                    <td>{props.registrantInformation.sAddress2 ? props.registrantInformation.sAddress2 : ''}</td>
                </tr>
                <tr>
                    <td><label>Address 3:</label></td>
                    <td>{props.registrantInformation.sAddress3 ? props.registrantInformation.sAddress3 : ''} </td>
                </tr>
                <tr>
                    <td><label>City:</label></td>
                    <td>{props.registrantInformation.sCity ? props.registrantInformation.sCity : ''}</td>
                </tr>

                <tr>
                    <td><label>State/Province</label></td>
                    <td>{props.registrantInformation.sState ? props.registrantInformation.sState : ''}</td>
                </tr>
                <tr>
                    <td><label>Postal Code</label></td>
                    <td>{props.registrantInformation.sZip ? props.registrantInformation.sZip : ''}</td>
                </tr>
                <tr>
                    <td><label>Country</label></td>
                    <td>{props.registrantInformation.sCountry ? props.registrantInformation.sCountry : ''} </td>
                </tr>
                <tr>
                    <td><label>Phone</label></td>
                    <td>{props.registrantInformation.sPhone ? props.registrantInformation.sPhone : ''}</td>
                </tr>

                <tr>
                    <td><label>Cell:</label></td>
                    <td>{props.registrantInformation.sCell ? props.registrantInformation.sCell : ''}</td>
                </tr>
                <tr>
                    <td><label>Fax:</label></td>
                    <td>{props.registrantInformation.sFax ? props.registrantInformation.sFax : ''}</td>
                </tr>
                <tr>
                    <td><label>Email:</label></td>
                    <td>{props.registrantInformation.sEmail ? props.registrantInformation.sEmail : ''} </td>
                </tr>
                <tr>
                    <td><label>Other Info:</label></td>
                    <td>{props.registrantInformation.sOtherInfo1 ? props.registrantInformation.sOtherInfo1 : ''}</td>
                </tr>
            </tbody>
            </table>
                    
        </>
    );
}
