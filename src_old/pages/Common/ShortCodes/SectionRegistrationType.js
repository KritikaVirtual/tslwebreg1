import React from "react";

export function SectionRegistrationType(props) {
    
    return (
        <>
            <table className="table table-striped table-bordered">
                <tbody>
                    <tr>
                        <td colspan={2}>
                            <h5>Registration Type</h5>
                        </td>
                    </tr>
                    
                    <tr>
                        <td><label>{sessionStorage.getItem('regTypeName') ? sessionStorage.getItem('regTypeName') : '' }</label></td>
                        <td><label>{sessionStorage.getItem('regTypePrice') ? '$'+sessionStorage.getItem('regTypePrice') : '' }</label></td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}
