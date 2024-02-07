import React,{ useState, useEffect} from 'react';
import { ModalBox } from "../../../Components/Ui/ModalBox";
import { CustomQuestionsForm } from './CustomQuestionsForm';
import "./index.css";

export default function CustomQuestions(props) {

    const [showModel, setShowModel] = useState(false);
    const [clearFields, setClearFields] = useState(false);
    const [userId, setUserId] = useState("");
    const [eventId, setEventId] = useState("");
    const [questionId, setQuestionId] = useState("");
    

    const _handleAddClick = () => {
        const lAccountID = JSON.parse(localStorage.getItem("userId"));
        const lEventID = JSON.parse(sessionStorage.getItem("eventId"));
        if (lAccountID && lEventID) {
          setUserId(lAccountID);
          setEventId(lEventID);
          setQuestionId("");
          setShowModel(true);
          setClearFields(true);
          if(JSON.parse(sessionStorage.getItem('questionId'))){
            sessionStorage.removeItem('questionId')
          }
        }
    };

    const _handleSubmit = event =>{
        alert('In Progress !!!')
    }
    
    const callPageRecords = (customQuestionsData) => {
        if (customQuestionsData && customQuestionsData.length > 0) {
          return customQuestionsData.map((data, index) => (
            <tr onClick={() => _handleEditClick(data)} key={index}>
                <td>{data.sCode}</td>
                <td>{data.sName}</td>
                <td>{data.nType===0?'Text':data.nType===1?'Radio':data.nType===2?'Check':data.nType===3?'DropDown':''}</td>
                <td>{data.sAnswer}</td>
                <td>{data.bRequired===0?'NO':data.bRequired===1?'YES':'NO'}</td>
                <td>{data.sApplyToRegTypes}</td>
                <td>{data.nOrder}</td>
                <td>{data.nStatus===0?'Active':data.nStatus===1?'Inactive':data.nStatus===2?'Deleted':''}</td>
            </tr>
          ));
        } else {
          return (
            <tr className="text-center">
              <td colSpan={20}>No Record Found</td>
            </tr>
          );
        }
      };

      const _handleEditClick = data =>{
        const lAccountID = JSON.parse(localStorage.getItem("userId"));
        const lEventID = JSON.parse(sessionStorage.getItem("eventId"));
        if (lAccountID&&lEventID) {
            setUserId(lAccountID);
            setEventId(lEventID);
            if(data&&data.lQuestionID!==undefined){
                if (sessionStorage.getItem("questionId")) {
                    sessionStorage.removeItem("questionId");
                }
                sessionStorage.setItem("questionId", JSON.stringify(data.lQuestionID));
                setQuestionId(data.lQuestionID);
                setShowModel(true)
                setClearFields(false);
                props.fetchCustomQuestionsById(data.lQuestionID)
                
            }
        }
      }

    return (
        <>
            <div className="panel-group dashboard-table-format" id="accordion" role="tablist" aria-multiselectable="true">
                <div className="panel panel-default">
                    <div className="panel-heading" role="tab" id="headingOne">
                        <div className="panel-body">
                            <div className="card  mb-4">
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <div id="dataTable_wrapper" className="dataTables_wrapper dt-bootstrap4">
                                        <div className="col-sm-12 col-md-6">
                                            <div
                                                className="dataTables_length"
                                                id="dataTable_length"
                                            >
                                                <button
                                                type="button"
                                                className="d-none d-sm-inline-block btn"
                                                onClick={() => _handleAddClick()}
                                                >
                                                Add Custom Questions&nbsp;
                                                <i className="fa fa-plus fa-sm"></i>
                                                </button>
                                            </div>
                                        </div><br/>
                                            <table className="table table-striped table-bordered">
                                                <thead>
                                                    <tr className="bg-primary text-white">
                                                        <th>Code </th>
                                                        <th>Name </th>
                                                        <th>Type </th>
                                                        <th>Choices </th>
                                                        <th>Request </th>
                                                        <th>Apply to Reg Type </th>
                                                        <th>Order </th>
                                                        <th>Status </th>
                                                        {/* <th>Type </th>
                                                        <th>Position </th>
                                                        <th>Label </th>
                                                        <th>Size </th> */}
                                                        {/* <th className="text-center">Action</th> */}

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {props.getCustomQuestions !== undefined &&
                                                        props.getCustomQuestions !== "" ? (
                                                            callPageRecords(props.getCustomQuestions)
                                                        ) : (
                                                            <tr>
                                                            <td colSpan={12}>No record Found</td>
                                                            </tr>
                                                        )
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ModalBox className="eventForm_model" show={showModel} onHide={() => {setShowModel(false)}}>
                    <CustomQuestionsForm userId={userId} eventId={eventId} questionId={questionId} addCustomQuestions={(data)=>props.addCustomQuestions(data)} updateCustomQuestions={(data)=>props.updateCustomQuestions(data)} showModel={(data)=>setShowModel(data)} customQuestionsByIdData={props.customQuestionsByIdData} clearFields={clearFields} regScodeData={props.regScodeData}/>
                </ModalBox>
            </div>
        </>
    )
}