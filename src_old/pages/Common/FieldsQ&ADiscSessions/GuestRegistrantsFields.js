import React, { useState, useEffect } from "react";
import "./index.css";

export default function GuestRegistrantsFields(props) {
  const [fields, setFields] = useState([]);

  useEffect(() => {
    if (props.guestRegistrantFieldsData) {
      let data = fields;
      props.guestRegistrantFieldsData.map((value, index) => {
        data[value.sName] = {
          bRequired: value.bRequired,
          bVisibleForBoothStaff: value.bVisibleForBoothStaff,
          bVisibleForAddReg: value.bVisibleForAddReg,
          bForBoothStaff: value.bForBoothStaff,
        };
      });
      setFields({ ...data });
    }
  }, [props.guestRegistrantFieldsData]);
  const _handleSubmit = (event) => {
    props.updateGuestData(fields);
  };
  const _handleChange = (event) => {
    const inputId = event.target.id;
    const inputname = event.target.name;
    let data = fields;
    if (event.target.checked) {
      data[inputname][inputId] = 1;
    } else {
      data[inputname][inputId] = 0;
    }
    setFields({ ...data });
  };
  const callPageRecords = (guestData) => {
    if (guestData) {
      return guestData.map((data, index) => (
        <>
          {/* {data.sName==='sTitle' ? 'Title' : data.sName==='sPhone' ? 'Phone':data.sName==='sEmail'?'Email':'' } */}
          <tr key={index}>
            <td>
              {data.sName === "sTitle"
                ? "Title"
                : data.sName === "sPhone"
                ? "Phone"
                : data.sName === "sEmail"
                ? "Email"
                : ""}
            </td>
            <td>
              <input
                type="checkbox"
                onChange={(event) => _handleChange(event)}
                id="bRequired"
                name={data.sName}
                value={data.bRequired}
                defaultChecked={data.bRequired === 1 ? true : false}
              />
            </td>
            <td>
              <input
                type="checkbox"
                onChange={(event) => _handleChange(event)}
                id="bForBoothStaff"
                name={data.sName}
                value=""
                defaultChecked={data.bForBoothStaff === 1 ? true : false}
              />
            </td>
            <td>
              <input
                type="checkbox"
                onChange={(event) => _handleChange(event)}
                id="bVisibleForAddReg"
                name={data.sName}
                value=""
                defaultChecked={data.bVisibleForAddReg === 1 ? true : false}
              />
            </td>
            <td>
              <input
                type="checkbox"
                onChange={(event) => _handleChange(event)}
                id="bVisibleForBoothStaff"
                name={data.sName}
                value=""
                defaultChecked={data.bVisibleForBoothStaff === 1 ? true : false}
              />
            </td>
          </tr>
        </>
      ));
    }
  };
  return (
    <>
      <div
        className="panel-group dashboard-table-format"
        id="accordion"
        role="tablist"
        aria-multiselectable="true"
      >
        <div className="panel panel-default">
          <div className="panel-heading" role="tab" id="headingOne">
            <div className="panel-body">
              <div className="card  mb-4">
                <div className="card-body">
                  <div className="table-responsive">
                    <div
                      id="dataTable_wrapper"
                      className="dataTables_wrapper dt-bootstrap4"
                    >
                      <table className="table table-striped table-bordered check-box-wrap">
                        <thead>
                          <tr className="bg-primary text-white">
                            <th>Field Name</th>
                            <th>Required for Guests and Add Reg</th>
                            <th>Required for Booth Staff</th>
                            <th>Visible for Guests and Add Reg</th>
                            <th>Visible for Booth Staff</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>First Name</td>
                            <td>
                              <input
                                type="checkbox"
                                id="bRequired"
                                name="firstName"
                                value="1"
                                defaultChecked
                                disabled
                              />
                            </td>
                            <td>
                              <input
                                type="checkbox"
                                id="bForBoothStaff"
                                name="firstName"
                                value="1"
                                defaultChecked
                                disabled
                              />
                            </td>
                            <td>
                              <input
                                type="checkbox"
                                id="bVisibleForAddReg"
                                name="firstName"
                                value="1"
                                defaultChecked
                                disabled
                              />
                            </td>
                            <td>
                              <input
                                type="checkbox"
                                id="bVisibleForBoothStaff"
                                name="firstName"
                                value="1"
                                defaultChecked
                                disabled
                              />
                            </td>
                          </tr>

                          <tr>
                            <td>Last Name</td>
                            <td>
                              <input
                                type="checkbox"
                                id="bRequired"
                                name="lastName"
                                value="1"
                                defaultChecked
                                disabled
                              />
                            </td>
                            <td>
                              <input
                                type="checkbox"
                                id="bForBoothStaff"
                                name="lastName"
                                value="1"
                                defaultChecked
                                disabled
                              />
                            </td>
                            <td>
                              <input
                                type="checkbox"
                                id="bVisibleForAddReg"
                                name="lastName"
                                value="1"
                                defaultChecked
                                disabled
                              />
                            </td>
                            <td>
                              <input
                                type="checkbox"
                                id="bVisibleForBoothStaff"
                                name="lastName"
                                value="1"
                                defaultChecked
                                disabled
                              />
                            </td>
                          </tr>
                          {props.guestRegistrantFieldsData
                            ? callPageRecords(props.guestRegistrantFieldsData)
                            : ""}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button
          type="submit"
          onClick={(event) => _handleSubmit(event)}
          className="btn btn-save"
        >
          Save
        </button>
      </div>
    </>
  );
}
