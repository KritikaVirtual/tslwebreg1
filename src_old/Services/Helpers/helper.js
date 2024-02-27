import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import "./helper.css";
import TYPES from "../Constant/types";

/* called when there is need to display success messages */
const displaySuccessMessage = (key) => {
    switch (key) {
        case key:
            toastr.success(TYPES[key], 
                {"showMethod": "slideDown", "hideMethod": "slideUp", timeOut: 2000, "closeButton": false}
            );
            break;
    
        default:
            toastr.success("Sucessfully", 
                {"showMethod": "slideDown", "hideMethod": "slideUp", timeOut: 2000, "closeButton": false}
            );
            break;
    }
   
};

/* returns header for axios request */
const requestTokenHeader = () => {
    // let adminToken = JSON.parse(sessionStorage.getItem('adminToken'));
    let token = '';
    if(JSON.parse(sessionStorage.getItem('adminToken'))){
        token = JSON.parse(sessionStorage.getItem('adminToken'))
    }else if(JSON.parse(sessionStorage.getItem('clientToken'))){
        token = JSON.parse(sessionStorage.getItem('clientToken'))
    }
    if (token) {
        return {'Authorization': `bearer ${token}` };
    }
    return {}; 
}

const displayErrorMessage =(key) =>{
    switch (key) {
        case key:
            toastr.error(TYPES[key], 
                {"showMethod": "slideDown", "hideMethod": "slideUp", timeOut: 2000, "closeButton": false}
            );
            break;
    
        default:
            break;
    }
};


export { displaySuccessMessage ,displayErrorMessage, requestTokenHeader };