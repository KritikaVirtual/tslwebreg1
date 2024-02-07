import React, { useState, useEffect } from "react";
import CommonPageSectionEditor from "../PageDesign/CommonPageSectionEditor";
import { Accordion } from "react-bootstrap";

const ExhibitorsCancellationEmail = (props) => {

  const [exhibitorsCancellationEmail,setExhibitorsCancellationEmail] = useState("")

  const exhibitorsCancellationEmailResult = (data) => {
    setExhibitorsCancellationEmail(data)
  };

  useEffect(()=>{
    if(exhibitorsCancellationEmail){
        let result = {}
        result['mCancellationEmailTextExh'] = exhibitorsCancellationEmail
        props.backData(result)
    }
  },[exhibitorsCancellationEmail])

  return (
    <>
      <div
        className="panel-group dashboard-table-format"
        id="accordion"
        role="tablist"
        aria-multiselectable="true"
      >
        <div className="row table-responsive">
          <div className="col-sm-12 col-md-12">
            <div className="dataTables_length" id="dataTable_length">
              <div className="controls">
                <CommonPageSectionEditor
                  pageTitle="Enter the text you want to show in the Exhibitors Cancellation Email"
                  editorCategory={"ExhibitorsCancellationEmail"}
                  editorType={"ExhibitorsCancellationEmail"}
                  backData={(data) => exhibitorsCancellationEmailResult(data)}
                  fetchData={
                    props.exhibitorsCancellationEmail
                      ? props.exhibitorsCancellationEmail
                      : ""
                  }
                />
              </div>
            </div>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  About Available Sections and Fields{" "}
                </Accordion.Header>
                <Accordion.Body>
                  <div class="panel-body">
                    <div class="body-text-wrap">
                      <p>
                        You can insert in the text some database fields by using
                        predefined field names and you can also use predefined
                        sections.
                      </p>
                      <p>
                        Each field or section name must be typed exactly as
                        listed.
                      </p>
                      <p>
                        For example if you want to put the attendee's first name
                        in the email confirmation. You will put something like
                        ''Dear [Registrant_First_Name]''. When the email is
                        created the field name will be changed for the actual
                        attendee's first name without the brackets.
                      </p>
                    </div>
                    <table class="table table-striped table-bordered">
                      <thead>
                        <tr class="bg-primary text-white">
                          <th>Section Name</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>[Section_Additional_Registrants]</td>
                          <td>
                            Display a table with each additional registrant's
                            first name, last name, title, phone and email
                          </td>
                        </tr>
                        <tr>
                          <td>[Section_Booth_Staffs]</td>
                          <td>
                            Display a table with each booth staff member's first
                            name, last name, title, phone and email
                          </td>
                        </tr>
                        <tr>
                          <td>[Section_Event_Info_Basic]</td>
                          <td>Event Name Location Start date End date</td>
                        </tr>
                        <tr>
                          <td>[Section_Guests]</td>
                          <td>
                            Display a table with each guest first name, last
                            name, title, phone and email
                          </td>
                        </tr>
                        <tr>
                          <td>[Section_Payment_All]</td>
                          <td>
                            Date Type Payor Company CC Number CC Exp Date CC
                            Trans. ID Amount Status
                          </td>
                        </tr>
                        <tr>
                          <td>[Section_Payment_Current]</td>
                          <td>
                            Date Type Payor Company CC Number CC Exp Date CC
                            Trans. ID Amount Status
                          </td>
                        </tr>
                        <tr>
                          <td>[Section_Questions_All]</td>
                          <td>
                            Display a table with all questions with answers or
                            no answers
                          </td>
                        </tr>
                        <tr>
                          <td>[Section_Registrant_Full_Info]</td>
                          <td>
                            Prefix FirstName MiddleName LastName Suffix
                            Credentials Title Company Address1 Address2 Address3
                            City, State, Zip Country Phone Cell Fax Email Other
                            Info
                          </td>
                        </tr>
                        <tr>
                          <td>[Section_Registrant_Full_Info_Exh]</td>
                          <td>Company Email</td>
                        </tr>
                        <tr>
                          <td>[Section_Registrant_Full_Info_Group]</td>
                          <td>
                            Display a table with each registrant from group
                            registration with first name, last name, title,
                            phone and email
                          </td>
                        </tr>
                        <tr>
                          <td>[Section_Registrant_Full_Name]</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>[Section_Registrant_Main_Full_Info]</td>
                          <td>
                            Prefix FirstName MiddleName LastName Suffix
                            Credentials Title Company Address1 Address2 Address3
                            City, State, Zip Country Phone Cell Fax Email Other
                            Info
                          </td>
                        </tr>
                        <tr>
                          <td>[Section_Registrant_Name_Address]</td>
                          <td>
                            FirstName MiddleName LastName Address1 Address2
                            Address3 City, State Zip
                          </td>
                        </tr>
                        <tr>
                          <td>[Section_Registration_Type]</td>
                          <td>
                            {" "}
                            Display table with registration type name with
                            amount
                          </td>
                        </tr>
                        <tr>
                          <td>[Section_Registration_Type_Group]</td>
                          <td>
                            Display table with registration type name with
                            amount
                          </td>
                        </tr>
                        <tr>
                          <td>[Section_Sessions_All]</td>
                          <td>
                            Display a table with all the sessions that the
                            person registered for with name, qty and total.
                          </td>
                        </tr>
                        <tr>
                          <td>[Section_Sessions_All_Group]</td>
                          <td>
                            {" "}
                            Display a table with all the sessions that the
                            person registered for with name, qty and total.
                          </td>
                        </tr>
                        <tr>
                          <td>[Section_Total_With_Other_Fees]</td>
                          <td>
                            Display the service fee if applicable, the taxes if
                            applicable and the total amount.
                          </td>
                        </tr>
                        <tr>
                          <td>[Section_Total_With_Other_Fees_Group]</td>
                          <td>
                            {" "}
                            Display the service fee if applicable, the taxes if
                            applicable and the total amount.
                          </td>
                        </tr>
                        <tr>
                          <td>
                            [Section_Total_With_Other_Fees_Group_Main_Contact]{" "}
                          </td>
                          <td>
                            Display the service fee if applicable, the taxes if
                            applicable and the total amount.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table class="table table-striped table-bordered">
                      <thead>
                        <tr>
                          <th>Field Name</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>[ACCESSCODE]</td>
                          <td>
                            This code is used to send access code for entering
                            into the virtual conference.
                          </td>
                        </tr>
                        <tr>
                          <td>[ACCESSLINK]</td>
                          <td>
                            This code is used to send access link for entering
                            into the virtual conference. For example you can
                            create a link like:
                            https://www.tslvirtualconference.com/common/[ACCESSLINK]/[ACCESSCODE]
                            where [ACCESSLINK] means &nbsp;&nbsp;
                            single-signon/event_id/email_id/
                          </td>
                        </tr>
                        <tr>
                          <td>[Event_Link]</td>
                          <td>Event's registration link.</td>
                        </tr>
                        <tr>
                          <td>[Event_Location]</td>
                          <td>Event's location.</td>
                        </tr>
                        <tr>
                          <td>[Event_Name]</td>
                          <td>Event's name</td>
                        </tr>
                        <tr>
                          <td>[Event_Start]</td>
                          <td>Event's start date.</td>
                        </tr>
                        <tr>
                          <td>[Event_Status]</td>
                          <td>Event's status.</td>
                        </tr>
                        <tr>
                          <td>[Event_taxes]</td>
                          <td>Event's taxes.</td>
                        </tr>
                        <tr>
                          <td>[Exhibitor_Company]</td>
                          <td>Exhibitor's company.</td>
                        </tr>
                        <tr>
                          <td>[Exhibitor_Email]</td>
                          <td>Exhibitor's email.</td>
                        </tr>
                        <tr>
                          <td>[Exhibitor_First_Name]</td>
                          <td>Exhibitor's First name</td>
                        </tr>
                        <tr>
                          <td>[Exhibitor_Last_Name]</td>
                          <td>Exhibitor's Last Name</td>
                        </tr>
                        <tr>
                          <td>[Exhibit_Staff_FirstName]</td>
                          <td>Exhibitor booth staff member first name</td>
                        </tr>
                        <tr>
                          <td>[Exhibit_Staff_LastName]</td>
                          <td>Exhibitor booth staff member last name</td>
                        </tr>
                        <tr>
                          <td>[Registrant_Address_1]</td>
                          <td>Registrant's address line 1.</td>
                        </tr>
                        <tr>
                          <td>[Registrant_Address_2]</td>
                          <td>Registrant's address line 2.</td>
                        </tr>
                        <tr>
                          <td>[Registrant_Address_3]</td>
                          <td>Registrant's address line 3.</td>
                        </tr>
                        <tr>
                          <td>[Registrant_Answer_Other]</td>
                          <td>
                            Registrant's answer for question with text box.
                          </td>
                        </tr>
                        <tr>
                          <td>[Registrant_Cell]</td>
                          <td>Registrant's Cell.</td>
                        </tr>
                        <tr>
                          <td>[Registrant_City]</td>
                          <td>Registrant's city.</td>
                        </tr>
                        <tr>
                          <td>[Registrant_Company]</td>
                          <td>Registrant's company.</td>
                        </tr>
                        <tr>
                          <td>[Registrant_Country]</td>
                          <td>Registrant's country.</td>
                        </tr>
                        <tr>
                          <td>[Registrant_Credentials]</td>
                          <td>Registrant's credentials.</td>
                        </tr>
                        <tr>
                          <td>[Registrant_Email]</td>
                          <td>Registrant's email.</td>
                        </tr>
                        <tr>
                          <td>[Registrant_Fax]</td>
                          <td>Registrant's fax.</td>
                        </tr>
                        <tr>
                          <td>[Registrant_First_Name]</td>
                          <td>Registrant's first name.</td>
                        </tr>
                        <tr>
                          <td>[Registrant_Guest_Email]</td>
                          <td>Registrant's guest email.</td>
                        </tr>
                        <tr>
                          <td>[Registrant_Guest_First_Name]</td>
                          <td>Registrant's guest first name.</td>
                        </tr>
                        <tr>
                          <td>[Registrant_Guest_ID]</td>
                          <td>Registrant's guest id.</td>
                        </tr>
                        <tr>
                          <td>[Registrant_Guest_Last_Name]</td>
                          <td>Registrant's guest last name.</td>
                        </tr>
                        <tr>
                          <td>[Registrant_Guest_Phone]</td>
                          <td>Registrant's guest phone number.</td>
                        </tr>
                        <tr>
                          <td>[Registrant_Guest_Status]</td>
                          <td>Registrant's guest status.</td>
                        </tr>
                        <tr>
                          <td>[Registrant_Guest_Title]</td>
                          <td>Registrant's guest title.</td>
                        </tr>
                        <tr>
                          <td>[Registrant_ID]</td>
                          <td>Registrant's id.</td>
                        </tr>
                        <tr>
                          <td>[Registrant_ID_OR_Guest_ID]</td>
                          <td>
                            Registrant's id for main registrant and guest id for
                            guest or additional registrant.
                          </td>
                        </tr>
                        <tr>
                          <td>[Registrant_Last_Name]</td>
                          <td>Registrant's last name.</td>
                        </tr>
                        <tr>
                          <td>[Registrant_Member_ID]</td>
                          <td>Registrant's member id.</td>
                        </tr>
                        <tr>
                          <td>[Registrant_MiConference_login_password]</td>
                          <td>Registrant's password for MiConference</td>
                        </tr>
                        <tr>
                          <td>[Registrant_MiConference_login_user]</td>
                          <td>Registrant's user name for MiConference</td>
                        </tr>
                        <tr>
                          <td>[Registrant_Middle_Name]</td>
                          <td>Registrant's middle name.</td>
                        </tr>
                        <tr>
                          <td>[Registrant_Notes]</td>
                          <td>Registrant's Notes.</td>
                        </tr>
                        <tr>
                          <td>[Registrant_Payment_Amount]</td>
                          <td>Registrant's payment amount.</td>
                        </tr>
                        <tr>
                          <td>[Registrant_Payment_Date]</td>
                          <td>Registrant's payment date.</td>
                        </tr>
                        <tr>
                          <td>[Registrant_Payment_Exp_Date]</td>
                          <td>
                            Registrant's payment credit card expiration date.
                          </td>
                        </tr>
                        <tr>
                          <td>[Registrant_Payment_Invoice_Number]</td>
                          <td>Registrant's payment invoice number.</td>
                        </tr>
                        <tr>
                          <td>[Registrant_Payment_Number]</td>
                          <td>Registrant's payment credit card number.</td>
                        </tr>
                        <tr>
                          <td>[Registrant_Payment_Payor]</td>
                          <td>Registrant's payment payor.</td>
                        </tr>
                        <tr>
                          <td>[Registrant_Payment_Status]</td>
                          <td>Registrant's payment status.</td>
                        </tr>
                        <tr>
                          <td>[Registrant_Payment_Transaction_ID]</td>
                          <td>
                            Transaction ID field of the registrant's payment.
                          </td>
                        </tr>
                        <tr>
                          <td>[Registrant_Payment_Type]</td>
                          <td>Registrant's payment type.</td>
                        </tr>
                        <tr>
                          <td>[Registrant_Phone]</td>
                          <td>Registrant's phone number.</td>
                        </tr>
                        <tr>
                          <td>[Registrant_Prefix]</td>
                          <td>Registrant's prefix.</td>
                        </tr>
                        <tr>
                          <td>[Registrant_Reg_Date]</td>
                          <td>Registration Date.</td>
                        </tr>
                        <tr>
                          <td>[Registrant_Reg_Total_Amount]</td>
                          <td>Registration total amount.</td>
                        </tr>
                        <tr>
                          <td>[Registrant_Reg_Type]</td>
                          <td>Registration type.</td>
                        </tr>
                        <tr>
                          <td>[Registrant_Session_Qty]</td>
                          <td>Registrant's session quantity.</td>
                        </tr>
                        <tr>
                          <td>[Registrant_Session_Total]</td>
                          <td>Registrant's session total</td>
                        </tr>
                        <tr>
                          <td>[Registrant_State]</td>
                          <td>Registrant's state.</td>
                        </tr>
                        <tr>
                          <td>[Registrant_Status]</td>
                          <td>Registrant Status.</td>
                        </tr>
                        <tr>
                          <td>[Registrant_Suffix]</td>
                          <td>Registrant's suffix.</td>
                        </tr>
                        <tr>
                          <td>[Registrant_Title]</td>
                          <td>Registrant's title.</td>
                        </tr>
                        <tr>
                          <td>[Registrant_Zip]</td>
                          <td>Registrant's zip.</td>
                        </tr>
                        <tr>
                          <td>[SPEAKEREMAIL]</td>
                          <td>Speaker Email Address</td>
                        </tr>
                        <tr>
                          <td>[SPEAKERFIRSTNAME]</td>
                          <td>Speaker First Name</td>
                        </tr>
                        <tr>
                          <td>[SPEAKERLASTNAME]</td>
                          <td>Speaker Last Name</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
};
export default ExhibitorsCancellationEmail;
