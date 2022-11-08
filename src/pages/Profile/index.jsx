import React from "react";
import { useSelector } from "react-redux";

import "./profile.css";

import Navbar from "../../components/Navbar";
import AsideNavbar from "../../components/SideNavbar";
import Footer from "../../components/Footer";

export default function Profile() {
  const { loginInfo } = useSelector((state) => state.auth);

  return (
    <>
      <Navbar />
      <div id="layoutSidenav">
        <AsideNavbar />
        <div id="layoutSidenav_content">
          <main className="mainProfile">
            <div className="d-flex flex-column justify-content-center">
              <div className="justify-content-center">
                <img
                  src={require("../../assets/profile-default.png")}
                  alt="profile-default"
                  style={{
                    borderRadius: "50%",
                    width: "25%",
                  }}
                />
              </div>
              <div className="card-body mainForm">
                <form>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder={loginInfo.payload.email}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputName" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputName"
                      placeholder={loginInfo.payload.name}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputRole" className="form-label">
                      Role
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputRole"
                      value={
                        loginInfo.payload.role
                          ? loginInfo.payload.role
                          : "Tidak ada role"
                      }
                      disabled
                    />
                  </div>
                </form>
                <button className="btn fw-bold btnColorProfile">
                  Save Change
                </button>
                <button className="btn fw-bold mt-2 btnColorProfile">
                  Cancel
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}
