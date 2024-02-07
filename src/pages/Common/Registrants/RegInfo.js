import React, { useState, useEffect } from "react";
import { RegistrantInformation } from "./RegistrantInformation";
import { Accordion } from "react-bootstrap";
import AdminLayout from "../../../Layout";
import "./index.css";

export function RegInfo(props) {
  return (
    <>
      <AdminLayout pageHeading="Registrant">
        <div className="container-fluid">
          <div className="container-fluid demo">
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  Registrant Information ( Access Code : Not Set )
                </Accordion.Header>
                <Accordion.Body>
                  <RegistrantInformation />
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}
