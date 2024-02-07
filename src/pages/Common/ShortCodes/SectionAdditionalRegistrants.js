import React, { useState, useEffect } from "react";
import moment from "moment";

export function SectionAdditionalRegistrants(props) {

    const getAdditionalRegistrantData = (registrant) => {
        if(registrant){
            var registrantsList = []
            for (let index = 1; index <= registrant; index++) {
                registrantsList.push(
                    <>
                        <tr key={index}>
                            <td>{props.additionalRegistrantData["add_reg_sFirstName_"+index] !== "undefined" ? props.additionalRegistrantData["add_reg_sFirstName_"+index] : ''}</td>
                            <td>{props.additionalRegistrantData["add_reg_sLastName_"+index] !== "undefined" ? props.additionalRegistrantData["add_reg_sLastName_"+index] : ''}</td>
                            <td>{props.additionalRegistrantData["add_reg_sTitle_"+index] !== "undefined" ? props.additionalRegistrantData["add_reg_sTitle_"+index] : ''}</td>
                            <td>{props.additionalRegistrantData["add_reg_sPhone_"+index] !== "undefined" ? props.additionalRegistrantData["add_reg_sPhone_"+index] : ''}</td>
                            <td>{props.additionalRegistrantData["add_reg_sEmail_"+index] !== "undefined" ? props.additionalRegistrantData["add_reg_sEmail_"+index] : ''}</td>
                            <td>{sessionStorage.getItem('addRegAmt') ? '$'+sessionStorage.getItem('addRegAmt') : 0}</td>
                        </tr>                  
                    </>
                );
            }
            return registrantsList
        }
    }
    
    return (
        <>
            <h5 className="addReg">Additional Registrants</h5>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr className="bg-primary text-white">
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Title</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Fee</th>
                    </tr>
                </thead>
                <tbody>
                    {(sessionStorage.getItem('countRegistrant')!==undefined && sessionStorage.getItem('countRegistrant') > 0) ? 
                        getAdditionalRegistrantData(sessionStorage.getItem('countRegistrant')) : 
                        <tr>
                            <td colSpan={6}>No Additional Registrants Found</td>
                        </tr>
                    }
                </tbody>
            </table>
        </>
    );
}
