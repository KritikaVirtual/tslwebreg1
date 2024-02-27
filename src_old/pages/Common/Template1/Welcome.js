import React, { useContext, useEffect } from "react";
import { Formik } from "formik";
import { Button } from "antd";
import { Input, Select } from "formik-antd";
import MultiStepFormContext from "./MultiStepFormContext";

export function Welcome(props) {
    
    useEffect(()=>{
        if(sessionStorage.getItem('countGuest')){
            sessionStorage.removeItem('countGuest')
        }
        if(sessionStorage.getItem('countRegistrant')){
            sessionStorage.removeItem('countRegistrant')
        }
        if(sessionStorage.getItem('guestsPrice')){
            sessionStorage.removeItem('guestsPrice')
        }
        if(sessionStorage.getItem('amountDue')){
            sessionStorage.removeItem('amountDue')
        }
    })
    const { step1Fields, setStep1Fields, next } = useContext(MultiStepFormContext);

    const callRegCategoriesData = regCategoriesData => {
        const newArray = regCategoriesData.map((data,item) =>{
            return {
                value : data.lCategoryID,
                label : data.sName
            }
        })
        return newArray
    }    

    const handleRegCategoriesData = event => {
        if(event){
            sessionStorage.setItem('categoryId',event)
        }
    }

    return (
        <>
        <Formik
        initialValues={step1Fields}
        onSubmit={(values) => {
            setStep1Fields(values);
            props.step1Details(values)
            next();
        }}
        validate={(values) => {
            const errors = {};
            if (!values.categories1) errors.categories1 = "Please Select the Category";
            if (!values.sEmail) errors.sEmail = "Email is required";
            if (typeof values["sEmail"] !== "undefined") {
                var pattern = new RegExp(
                  /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
                );
                if (!pattern.test(values["sEmail"])) {
                  errors["sEmail"] = "*Please enter valid email.";
                }
            }
            return errors;
        }}
        >
        {({ handleSubmit, errors }) => {
            return (
            <div className={"details__wrapper"}>
                <div class="form-content">
                    <div class="row">
                        <div class="col-md-12 form-heading ">
                            <h4>{props.eventsData?  props.eventsData.sStep1Desc : ''}</h4>
                        </div>
                        <div className="textHeader">
                            {props.eventsData ? <div dangerouslySetInnerHTML={{ __html: props.eventsData.sStep1Text }} />  : ''}
                        </div>
                        <div className="stepsTab">
                            <div class="col-md-12 col-xs-12">
                                <div className={`form__item ${errors.categories1 && "input__error"}`}>
                                    <label>Choose a category *</label>
                                    <Select 
                                    className="form-control" 
                                    name="categories1"
                                    id="categories1"
                                    options={props.regCategoriesData ?
                                        callRegCategoriesData(props.regCategoriesData) : []}
                                    onChange={(event)=>handleRegCategoriesData(event)}
                                    />

                                    {errors.categories1 ? (
                                        <div className="errorMsg text-danger">
                                            {errors.categories1}
                                        </div>
                                        ) : ("")
                                    }
                                </div>
                            </div>

                            <div class="col-md-12 col-xs-12">
                                    <label for="html">
                                    Enter the main contact email address *
                                    </label>
                                    <br />
                                    <Input 
                                        name={"sEmail"}
                                        className="form-control" 
                                    />
                                    {/* <input
                                    type="text"
                                    class="form-control"
                                    name="sEmail"
                                    placeholder=""
                                    /> */}
                                    {errors.sEmail ? (
                                        <div className="errorMsg text-danger">
                                            {errors.sEmail}
                                        </div>
                                        ) : ("")
                                    }
                            </div>
                        </div>
                        
                        <div className="textFooter">
                            {props.eventsData ? <div dangerouslySetInnerHTML={{ __html: props.eventsData.sStep1TextBottom }} /> : ''}
                        </div>
                        
                        <div
                            className={"form__item button__items d-flex justify-content-end"}
                            >
                            <Button type={"primary"} onClick={handleSubmit}>
                                Next
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            );
        }}
        </Formik>
        </>
    );
}
