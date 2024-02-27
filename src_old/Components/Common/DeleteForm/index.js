import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export function DeleteForm(props) {
  const [successStatus, setSuccessStatus] = useState(false);
  const deleteUser = async (userId) => {
    props.deleteUserId(userId);
  };
  const closeDeleteUser = async (userId) => {
    props.closeDeletePopUp(userId);
  };
  return (
    <>
      <div className="invitation-wrap">
        <div className="container">
          <div className="row login-wrap-new">
            <div className="col-md-12 col-xs-12">
              {successStatus ? (
                <div className="successMsg text-success">
                  User Deleted Successfully
                </div>
              ) : (
                ""
              )}
              <h5>Are you sure you want to delete ?</h5>
              <Row>
                <Col>
                  {" "}
                  <button
                    type="button"
                    onClick={() => deleteUser(props.userId)}
                    className="btn"
                  >
                    OK
                  </button>
                </Col>
                <Col>
                  {" "}
                  <button
                    type="button"
                    onClick={() => closeDeleteUser(props.userId)}
                    className="btn"
                  >
                    CANCEL
                  </button>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
