import React from "react";
import { Image } from "react-bootstrap";
const Loader=()=>{
                   return(
                            <div className="fluid col-sm-12 col-md-12">
                            <Image className="rounded mx-auto d-block" src={process.env.PUBLIC_URL + "/assets/images/loader.gif"} />
                            </div>
                        )
}
export default Loader;