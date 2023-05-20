import React from "react";
import icon1 from "../images/icon1.png";
import icon2 from "../images/icon2.gif";
import icon3 from "../images/icon3.png";
const Pricing = () => {
  return (
    <>
    <div className=" m-4 container-fluid  d-flex flex-column  flex-wrap  justify-content-around align-items-center">
    <h3 className="text-danger m-4 fs-1">Pricing</h3>
      <div className=" container-fluid  d-flex  flex-wrap  justify-content-around align-items-center">
      
        <div className="  d-flex flex-column justify-content-center align-items-center p-2 shadow p-3 mb-5 bg-white rounded">
          <img className="w-50 " src={icon2} alt="" />
          <h6 className="text-danger m-4">starting from $500</h6>
        </div>
        <div className="  d-flex flex-column justify-content-center align-items-center p-2 shadow p-3 mb-5 bg-white rounded">
          <img className="w-40  " src={icon1} alt="" />
          <h6 className="text-danger m-4">starting from $1100</h6>
        </div>
        <div className=" d-flex flex-column justify-content-center align-items-center p-2 shadow p-3 mb-5 bg-white rounded">
          <img className="w-50 " src={icon3} alt="" />
          <h6 className="text-danger m-4">starting from $2000</h6>
        </div>
      </div>
      </div>
    </>
  );
};

export default Pricing;
