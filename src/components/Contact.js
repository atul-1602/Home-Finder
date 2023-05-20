import React from "react";

const Contact = () => {
  return (
    <>
      <form className="d-flex flex-column justifly-content-center align-items-center  m-4 ">
        <div className="w-50  shadow-lg p-3 mb-5 bg-white rounded d-flex flex-column justifly-content-center align-items-center ">
          <h3 className="text-danger h1 text-align-center m-4 ">
            Feel free to reach us
          </h3>
          <div className="mb-3  w-100">
            <label for="exampleInputEmail1" className="form-label  h6 m-2">
              Name
            </label>
            <input
              type="name"
              className="form-control "
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3  w-100">
            <label for="exampleInputPassword1" className="form-label h6 m-2">
              Phone
            </label>
            <input
              type="tel"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3  w-100">
            <label for="exampleInputPassword1" className="form-label h6 m-2">
              Message
            </label>
            <textarea
              type="text"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>

          <button type="submit#" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default Contact;
