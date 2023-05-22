import React, { useEffect, useState } from "react";
import axios from "axios";
// import AOS from "aos";
// import 'aos/dist/aos.css'

const Findhome = () => {
  // useEffect(()=>{
  //   AOS.init({duration: 1000});
  // },[])

  const [data, setData] = useState([]);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios
      .get("https://mocki.io/v1/94768134-75c0-4cc0-a0bd-496a53a19800")
      .then((res) => {
        setData(res.data);
        setRecords(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

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
              placeholder="type..."
              aria-label="Search"
              aria-describedby="search-addon"
              onChange={Filter3}
            />
            {/* <button type="button" class="btn btn-primary ">
              search
            </button> */}
          </div>
        </div>
        <div className="container-fluid  m-1 d-flex  flex-wrap  justify-content-center align-items-center"  >
          {records.map((data, i) => (
            <div
              className=" border border-danger  text-dark  my-4 mx-2 p-2"  
              key={i}
            >
              <img src={data.image} alt="/" />
              <h6 className="my-3">Type :{data.type}</h6>
              <h6>Location:{data.location}</h6>
              <h6>For:{data.for}</h6>
              <h5>Price:{data.price}</h5>
              <button className="btn btn-danger btn-sm">More</button>
              {/* <button className="btn btn-success mx-4 btn-sm" >
                Contact Agent
              </button> */}
              {/* Agent button */}
              <button
                type="button"
                className="btn btn-success mx-2"
                data-bs-toggle="modal"
                data-bs-target="#agentModal"
              >
                Contact Agent
              </button>

              {/* Agent form */}
              <div
                className="modal fade"
                id="agentModal"
                tabindex="-1"
                aria-labelledby="agentModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="agentModalLabel">
                        Contact to Agent
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <form>
                        <div class="mb-3">
                          <label for="exampleInputEmail1" class="form-label">
                            Name
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                          />
                          <label for="exampleInputEmail1" class="form-label">
                            Email address
                          </label>
                          <input
                            type="email"
                            class="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                          />
                        </div>
                        <div class="mb-3">
                          <label for="exampleInputPassword1" class="form-label">
                            Mesaage/Querry
                          </label>
                          <textarea
                            type="text"
                            class="form-control"
                            id="exampleInputPassword1"
                          />
                        </div>

                        <button type="submit" class="btn btn-primary">
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </div> 
              </div>

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
