import React from "react";

export function SectionTotalWithOtherFees(props) {
    
    return (
        <>
            <table className="table table-striped table-bordered">
                <tbody>
                    <tr>
                        <td colspan={2}>
                            <h5>Other Fees</h5>
                        </td>
                    </tr>
                    
                    <tr>
                        <td><label>Total</label></td>
                        <td><label>{sessionStorage.getItem('amountDue') ? '$'+sessionStorage.getItem('amountDue') : '' }</label></td>
                    </tr>

                    <tr>
                        <td><label>Paid</label></td>
                        <td><label>$0</label></td>
                    </tr>

                    <tr>
                        <td><label>Balance</label></td>
                        <td><label>{sessionStorage.getItem('amountDue') ? '$'+sessionStorage.getItem('amountDue') : '' }</label></td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}
