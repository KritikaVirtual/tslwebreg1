import React, { useState, useEffect } from "react";
import moment from "moment";

export function SectionPaymentAll(props) {
    
    const getDate = () => {
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const date = today.getDate();
        return `${month}/${date}/${year}`;
      }

    const getPaymentInformationAll = () => {
       return <>
            <tr>
                <td>{getDate()}</td>
                <td>{props.paymentInformationValuesData.payment_type == 1 ? 'Check' : 'Credit Card'}</td>
                <td>{props.paymentInformationValuesData.x_first_name + ' ' + props.paymentInformationValuesData.x_last_name}</td>
                <td>{props.paymentInformationValuesData.x_company}</td>
                <td></td>
                <td></td>
                <td></td>
                <td>{sessionStorage.getItem('amountDue') ? '$'+sessionStorage.getItem('amountDue') : '' }</td>
                <td>Pending</td>
                
            </tr>                  
        </>
    }

    return (
        <>
            <h5 className="addReg">Payment Information</h5>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr className="bg-primary text-white">
                        <th>Date</th>
                        <th>Type</th>
                        <th>Payor</th>
                        <th>Company</th>
                        <th>Number</th>
                        <th>Exp. Date</th>
                        <th>Trans. ID</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    { getPaymentInformationAll() }
                </tbody>
            </table>
        </>
    );
}
