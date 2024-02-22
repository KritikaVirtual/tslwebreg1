import React, { useState, useEffect } from "react";
import { MemberForm } from "./MemberForm";
import { Accordion } from "react-bootstrap";
import AdminLayout from "../../../Layout";
import "./index.css";

export default function AddMember(props) {
  return (
    <>
      <AdminLayout pageHeading="Member">
        <div className="container-fluid">
          <div className="container-fluid demo">
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  Add Member
                </Accordion.Header>
                <Accordion.Body>
                  <MemberForm />
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}
