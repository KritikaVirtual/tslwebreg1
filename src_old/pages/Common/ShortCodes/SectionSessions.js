import React, { useState, useEffect } from "react";
import moment from "moment";

export function SectionSessions(props) {
    
    const getSessionsTicketsData = (sessionsTicket) => {
        if(sessionsTicket){ 
            var sessionsTicketsList = []
            for (let index = 0; index < sessionsTicket.countSessions; index++) {
                sessionsTicketsList.push(
                    <>
                        <tr key={index}>
                            <td>{sessionsTicket[`sName${index}`] ? sessionsTicket[`sName${index}`] : ''}</td>
                            <td>{sessionsTicket[`dPrice${index}`] ? sessionsTicket[`dPrice${index}`] : ''}</td>
                            <td>{sessionsTicket[`dQty${index}`] ? sessionsTicket[`dQty${index}`] : ''}</td>
                            <td>{sessionsTicket[`dTotal${index}`] ? sessionsTicket[`dTotal${index}`] : ''}</td>
                        </tr>                  
                    </>
                );
            }
            return sessionsTicketsList
        }
    }

    return (
        <>
            <h5 className="addReg">Events and Tickets</h5>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr className="bg-primary text-white">
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {(props.sessionsTicketsData && props.sessionsTicketsData.countSessions !==undefined && props.sessionsTicketsData.countSessions > 0) ? 
                        getSessionsTicketsData(props.sessionsTicketsData):
                        <tr>
                            <td colSpan={6}>No events and/or tickets have been selected</td>
                        </tr>
                    }
                </tbody>
            </table>
        </>
    );
}
