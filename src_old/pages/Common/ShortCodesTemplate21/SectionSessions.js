import React, { useState, useEffect } from "react";
import moment from "moment";

export function SectionSessions(props) {
    
    const getSessionsTicketsData = (countRegistrant) => {
        if(countRegistrant){ 
            var sessionsTicketsList = []
            for (let indexArray = 0; indexArray < countRegistrant; indexArray++) {
                sessionsTicketsList.push(
                    <>
                    <h5>Sessions & Tickets - {props.personalInformationData["add_reg_sFirstName_"+(indexArray+1)]}</h5>
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr className="bg-primary">
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Qty</th> 
                                    <th>Total</th>
                                </tr> 
                            </thead>
                            {props.sessionsTicketsData ? getSessionsData(indexArray, props.sessionsTicketsData) : ''}
                        </table>
                    </>
                )
            }
            return sessionsTicketsList
        }
    }

    const getSessionsData = (indexArray, sessionsData) => {
        var sessionsTickets = []
        for (let index = 0; index < sessionsData.countSessions; index++) {
            sessionsTickets.push(
                
                    <tbody>
                        <tr key={index}>
                            <td>{sessionsData[`sName${indexArray+''+index}`] ? sessionsData[`sName${indexArray+''+index}`] : ''}</td>
                            <td>{sessionsData[`dPrice${indexArray+''+index}`] ? sessionsData[`dPrice${indexArray+''+index}`] : ''}</td>
                            <td>{sessionsData[`dQty${indexArray+''+index}`] ? sessionsData[`dQty${indexArray+''+index}`] : ''}</td>
                            <td>{sessionsData[`dTotal${indexArray+''+index}`] ? sessionsData[`dTotal${indexArray+''+index}`] : ''}</td>
                        </tr>        
                    </tbody>
            );
        }
        return sessionsTickets
    }
    return (
        <>
            {(sessionStorage.getItem('countRegistrant')!==undefined && sessionStorage.getItem('countRegistrant') > 0) ? 
                                                getSessionsTicketsData(sessionStorage.getItem('countRegistrant')) : ''}
        </>
    );
}
