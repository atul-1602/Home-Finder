import React, { useEffect, useState } from "react";
import axios from "axios";
const Findhome = () => {
  const [data,setData]=useState([])
  const [records, setRecords] = useState([]);

  useEffect(()=>{
    axios.get('https://mocki.io/v1/94768134-75c0-4cc0-a0bd-496a53a19800')
    .then(res=>{
      setData(res.data)
      setRecords(res.data);
    }).catch(err=>console.log(err));
  },[])

  const Filter1 = (event) => {
    setRecords(
      data.filter((f) => f.location.toLowerCase().includes(event.target.value))
    );
  };
  const Filter2 = (event) => {
    setRecords(
      records.filter((f) => f.for.toLowerCase().includes(event.target.value))
    );
    
  };
  const Filter3 = (event) => {
    setRecords(
      records.filter((f) => f.type.toLowerCase().includes(event.target.value))
    );
  };
  return (
    <>
      <div className="container my-5 d-flex flex-column flex-wrap  justify-content-center align-items-center">
        <h1 className=" p-3 container-fluid self-align-center my-4 text-light bg-danger">
          Choose Your Home
        </h1>
        <h5 className="my-1">Filters:</h5>
        <div className="container w-100 d-flex flex-row  justify-content-center align-items-center bg-success py-4">
          <div class="input-group ">
            <input
              type="search"
              class="form-control rounded mx-1"
              placeholder="location..."
              aria-label="Search"
              aria-describedby="search-addon"
             onChange={Filter1}
            />
            {/* <button type="button" class="btn btn-primary  "  >
              search
            </button> */}
          </div>
          <div class="input-group ">
            <input
              type="search"
              class="form-control rounded mx-1"
              placeholder="for..."
              aria-label="Search"
              aria-describedby="search-addon"
              onChange={Filter2}
            />
            {/* <button type="button" class="btn btn-primary ">
              search
            </button> */}
          </div>
          <div class="input-group ">
            <input
              type="search"
              class="form-control rounded mx-1"
              placeholder="price..."
              aria-label="Search"
              aria-describedby="search-addon"
              onChange={Filter3}
            />
            {/* <button type="button" class="btn btn-primary ">
              search
            </button> */}
          </div>
        </div>
        <div className="container-fluid  m-1 d-flex  flex-wrap  justify-content-center align-items-center">
          {records.map((data, i) => (
            <div
              className=" border border-danger  text-dark  my-4 mx-2 p-2"
              key={i}
            >
              <img src={data.image} alt="/" />
              <h6 className="my-3">type :{data.type}</h6>
              <h6>location :{data.location}</h6>
              <h6>fors :{data.for}</h6>
              <h5>price :{data.price}</h5>
              <button className="btn btn-danger btn-sm">More</button>
              <button className="btn btn-success mx-4 btn-sm">
                Contact Agent
              </button>

              <div class="form-check form-switch my-2">
                <label class="form-check-label" for="flexSwitchCheckDefault">
                  Save to watchlist
                </label>
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckDefault"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Findhome;
