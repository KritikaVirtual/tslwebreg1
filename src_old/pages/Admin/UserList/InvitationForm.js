import React,{ useState, useEffect} from 'react';
import { Modal } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

export default function InvitationForm(){ 
    const [inputInvitation, setInputInvitation] = useState('');
    const [isCodeValid, setIsCodeValid] = useState(true);
    const navigate=useNavigate();
    const checkInvitationCode = () => {
      const inviteCode = 'TSLeads1@#';
      if(inputInvitation === inviteCode){
        navigate('/adminSignup');
        setIsCodeValid(true);
      }else{
        setIsCodeValid(false);
      }
    }
    const handleChange = (event) => {
        setInputInvitation(event.target.value);
      };
  return (
    <>
            <div className="invitation-wrap">
                  <div className="container">
                      <div className="row login-wrap-new">
                          <div className="col-md-12 col-xs-12">
                          {isCodeValid === false ? <div className="text-danger text-center">Invalid Code</div> : ''}
                              <div className="form-content">
                                  <form action="">
                                      <div className="row">
                                          <div className="col-12">
                                              <h4>Enter Invitation code:</h4>
                                          </div>
                                          <div className="col-md-12 col-xs-12">
                                                  <input type="password" className="form-control" name="invitation_code" placeholder="Enter Invitation Code" onChange={handleChange}/>
                                          </div>
                                      </div>
                                      <div>
                                          <button type="button" className="btn" onClick={checkInvitationCode}>Register</button>
                                      </div>
                                  </form>
                              </div>
                          </div>
                      </div>
                  </div>
            </div>
    </>
  )
}