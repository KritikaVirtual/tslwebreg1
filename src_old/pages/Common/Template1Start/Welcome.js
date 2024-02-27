import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../../Layout";
import "./index.css";

export function Welcome(props) {
  return (
    <>
        <div class="form-content">
            <div class="row">
            <div class="col-md-12 form-heading ">
                <h4>Enter your email address</h4>
            </div>
            <div class="col-md-12 col-xs-12">
                <label for="category">Choose a category</label>
                <br />
                <select class="form-control" name="" id="">
                <option value="">Select an item</option>
                <option value="Member">Member</option>
                <option value="Non-Member">Non Member</option>
                </select>
            </div>
            <div class="col-md-12 col-xs-12">
                <label for="html">
                Enter the main contact email address
                </label>
                <br />
                <input
                type="text"
                class="form-control"
                name=""
                placeholder=""
                />
            </div>
            </div>
        </div>
    </>
  );
}
