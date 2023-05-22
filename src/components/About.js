import React ,{useEffect} from "react";
import cust1 from "../images/customer1.jpeg";
import cust2 from "../images/customer2.jpeg";
import cust3 from "../images/customer3.jpeg";
import AOS from "aos";
import 'aos/dist/aos.css'
const About = () => {
  useEffect(()=>{
    AOS.init({duration: 1000});
  },[])
  return (
    <>
      <div className="  container-fluid  d-flex flex-column  flex-wrap  justify-content-around align-items-center"  data-AOS="fade-up">
        <h2 className="text-danger m-4 fs-1">About Us</h2>
        <b className="container ">
          Welcome to HomeFinder, a trusted and experienced real estate partner
          serving Delhi, Mumbai, lucknow, Pune and beyond. With over a decade of
          industry expertise, we specialize in residential properties and are
          committed to providing exceptional service. Our client-centric
          approach ensures that your needs are our top priority, and we strive
          to deliver personalized attention and tailored solutions to help you
          find your dream home or make sound investment decisions. Backed by a
          team of dedicated professionals, we offer in-depth market knowledge
          and a seamless experience throughout the buying, selling, or renting
          process. Trust us to guide you on your real estate journey with
          integrity, expertise, and a passion for exceeding your expectations.
        </b>
        <h4>Our Happy Customers</h4>

        <div className=" m-4 p-4 w-100 container  d-flex  flex-row   flex-wrap  justify-content-center align-items-center">
          <div className=" m-3  d-flex  justify-content-center align-items-center border-4 border border-danger-subtle bg-white rounded"  data-AOS="fade-right">
            <img src={cust1} alt="" className="m-2"/>
            <div className="m-2">
              <h6>Harry Brook</h6>
              <p className=" m-3 d-flex  justify-content-start flex-column align-items-start">
                Lorem, ipsum dolor sit amet conseflex-rowctetur adipisicing elit.
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Perspiciatis, eaque. <br /><b className="text-danger">Rating :4.1/5</b> 

              </p>
            </div>
          </div>
          <div className="m-3   d-flex flex-row justify-content-center align-items-center  border border-4 border-danger-subtle shadow  bg-white rounded"  data-AOS="fade-left">
            <img src={cust2} alt="" className="m-2"/>
            <div className="m-2">
              <h6>Liya Andrew</h6>
              <p className=" m-3 d-flex  justify-content-start flex-column align-items-start">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Perspiciatis, eaque. <br /><b className="text-danger">Rating :4/5</b> 

              </p>
            </div>
          </div>
          <div className="m-3   d-flex flex-row justify-content-center align-items-center  border border-4 border-danger-subtle shadow  bg-white rounded"  data-AOS="fade-right">
            <img src={cust3} alt="" className="m-2"/>
            <div className="m-2">
              <h6>Rahul</h6>
              <p className=" m-3 d-flex  justify-content-start flex-column align-items-start">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Perspiciatis, eaque. <br /><b className="text-danger">Rating :4.9/5</b> 

              </p>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default About;
