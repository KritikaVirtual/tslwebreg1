import React,{ useEffect } from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';

const PageNotFound=()=> {
  const navigate=useNavigate();
  return (
    <>
        <div className="admin-login">
                <div className="container">
                    <div className="row login-wrap">
                        <div className="col-md-12 col-xs-12 boxSize">
                                  <p>This URL is invalid. Please verify with the event organizer to make sure you get the proper URL to register for their event.</p>
                                  <button onClick={() => navigate(-1)}>Back to MainScreen</button>
                          
                      </div>
                  </div>
                </div>
        </div>
    </>
  );
}
export default PageNotFound;