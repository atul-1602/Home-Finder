import React from "react";
import img1 from "../images/img4.jpeg";
import img2 from "../images/img5.jpeg";
import img3 from "../images/img6.jpeg";
import Contact from "./Contact";
import Pricing from "./Pricing";
import About from "./About";
import Findhome from "./Findhome";


const Home = () => {
  return (
    <>
      <div id="carouselExampleCaptions" className="carousel slide vh-50">
        <div className="carousel-indicators ">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active "
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner ">
          <div className="carousel-item active">
            <img src={img1} className="d-block " alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h2>Flats</h2>
              <button className="btn btn-success">Explore More</button>
            </div>
          </div>
          <div className="carousel-item">
            <img src={img2} className="d-block" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h2>Villas</h2>
              <button className="btn btn-danger">Explore More</button>
            </div>
          </div>
          <div className="carousel-item">
            <img src={img3} className="d-block" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h2>Appartments </h2>
              <button className="btn btn-success">Explore More</button>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <Findhome/>
        <Pricing/>
       
        <About/>
        <Contact/>
    </>
  );
};

export default Home;
