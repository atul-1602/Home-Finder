import React from "react";

const Footer = () => {
  return (
    <>
      <div className=" container-fluid bg-danger d-flex ">
        <div className=" container m-3 text-light lh-1">
          <h4>Home Finder</h4>
          <p>a perfect home for your comfort.</p>
        </div>
        <div className=" container my-2  text-light  d-flex flex-column justify-content-center align-items-center">
          <h4>Easy Links</h4>
          <ul>
            <li>Home</li>
            <li>Pricing</li>
            <li>Find Home</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div className=" container my-2   text-light lh-lg d-flex flex-column justify-content-center align-items-center ">
            <h4>Social Links</h4>
            <ul>
                <li>Twitter</li>
                <li>Facebook</li>
                <li>Instagram</li>
            </ul>
        </div>
      </div>
    </>
  );
};

export default Footer;
