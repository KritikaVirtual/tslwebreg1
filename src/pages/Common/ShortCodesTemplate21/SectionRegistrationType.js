import React from "react";

export function SectionRegistrationType(props) {
    
    const getRegistrationType = countRegistrant => {
        if(countRegistrant){
            var registrantsType= []
            for (let index = 1; index <= countRegistrant; index++) {             
                registrantsType.push(
                    <table className="table table-striped table-bordered">
                        <tbody>
                            <tr>
                                <td colspan={2}>
                                    <h5>{props.personalInformationData['add_reg_sFirstName_'+index]} - Registration Type, Tickets and Other Fees</h5>
                                </td>
                            </tr>
                            
                            <tr>
                                <td><label>{sessionStorage.getItem('regTypeName'+index) ? sessionStorage.getItem('regTypeName'+index) : '' }</label></td>
                                <td><label>{sessionStorage.getItem('regTypePrice'+index) ? '$'+sessionStorage.getItem('regTypePrice'+index) : '' }</label></td>
                            </tr>
                        </tbody>
                    </table>
                )   
            }
            return registrantsType
        }
    }

    return (
        <>
        {(sessionStorage.getItem('countRegistrant')!==undefined && sessionStorage.getItem('countRegistrant') > 0) ? 
                                                getRegistrationType(sessionStorage.getItem('countRegistrant')) : ''}
            
        </>
    );
}
