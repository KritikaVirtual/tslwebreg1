import React, { useState, useEffect } from "react";
import moment from "moment";

export function SectionGuests(props) {

    const getGuestData = (guest) => {
        if(guest){
            var guestsList = []
            for (let index = 1; index <= guest; index++) {
                guestsList.push(
                    <>
                        <tr key={index}>
                            <td>{props.guestsData["guest_first_name_"+index] !== "undefined" ? props.guestsData["guest_first_name_"+index] : ''}</td>
                            <td>{props.guestsData["guest_last_name_"+index] !== "undefined" ? props.guestsData["guest_last_name_"+index] : ''}</td>
                            <td>{props.guestsData["guest_title_"+index] !== "undefined" ? props.guestsData["guest_title_"+index] : ''}</td>
                            <td>{props.guestsData["guest_phone_"+index] !== "undefined" ? props.guestsData["guest_phone_"+index] : ''}</td>
                            <td>{props.guestsData["guest_email_"+index] !== "undefined" ? props.guestsData["guest_email_"+index] : ''}</td>
                            <td>{sessionStorage.getItem('guestsPrice') ? '$'+sessionStorage.getItem('guestsPrice') : 0}</td>
                        </tr>                  
                    </>
                );
            }
            return guestsList
        }
    }
    
    return (
        <>
            <h5 className="addReg">Guests</h5>
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
                    {(sessionStorage.getItem('countGuest')!==undefined && sessionStorage.getItem('countGuest') > 0) ? 
                        getGuestData(sessionStorage.getItem('countGuest')):
                        <tr>
                            <td colSpan={6}>No Guests Found</td>
                        </tr>
                    }
                </tbody>
            </table>
        </>
    );
}
