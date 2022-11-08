import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import "./home.css";

import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import AsideNavbar from "../../components/SideNavbar";
import Loading from "../../components/Loading";

export default function Home() {
  const { isSuccess } = useSelector((state) => state.auth);
  const { loginInfo } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [longitude, setLongitude] = useState("");

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const showPosition = (position) => {
    setLongitude(position.coords.longitude);
  };

  const checkinHandler = async () => {
    try {
      setIsLoading(true);

      if (longitude <= 106.781245) {
        return setTimeout(() => {
          setIsLoading(false);
          toast.warning(`Anda diluar jangkauan!`);
        }, 2000);
      }

      if (longitude >= 106.782731) {
        return setTimeout(() => {
          setIsLoading(false);
          toast.warning(`Anda diluar jangkauan!`);
        }, 2000);
      }

      const body = {
        users_id: loginInfo.payload.id,
        name_users: loginInfo.payload.name,
      };

      const result = await axios.post(
        `${process.env.REACT_APP_HOST}/api/absensi/checkin`,
        body
      );

      console.log(result);

      setIsLoading(false);
      toast.success("Absensi Masuk Berhasil");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error("Absensi Masuk Gagal");
    }
  };

  const checkoutHandler = async () => {
    try {
      setIsLoading(true);

      if (longitude <= 106.780665) {
        return setTimeout(() => {
          setIsLoading(false);
          toast.warning(`Anda diluar jangkauan!`);
        }, 2000);
      }

      if (longitude >= 106.782631) {
        return setTimeout(() => {
          setIsLoading(false);
          toast.warning(`Anda diluar jangkauan!`);
        }, 2000);
      }

      const body = {
        users_id: loginInfo.payload.id,
        name_users: loginInfo.payload.name,
      };

      const result = await axios.post(
        `${process.env.REACT_APP_HOST}/api/absensi/checkout`,
        body
      );

      console.log(result);

      setIsLoading(false);
      toast.success("Absensi Pulang Berhasil");
    } catch (error) {
      setIsLoading(false);
      toast.error("Absensi Pulang Gagal");
    }
  };

  useEffect(() => {
    if (!isSuccess) {
      toast.warning("Silahkan Login Terlebih Dahulu");
      navigate("/");
    }
    getLocation();
  }, [isSuccess, setLongitude]); // eslint-disable-line no-use-before-define

  document.title = "Dashboard";

  return (
    <>
      <Navbar />
      {isLoading && <Loading />}
      <div id="layoutSidenav">
        <AsideNavbar />
        <div id="layoutSidenav_content">
          <main>
            <div className="container-fluid px-4">
              <h1 className="mt-4">Dashboard</h1>
              <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">Dashboard</li>
              </ol>
              <div className="row">
                <div className="col-xl-3 col-md-6">
                  <div className="card bg-primary text-white mb-4">
                    <div className="card-body">Primary Card</div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                      <a
                        className="small text-white stretched-link"
                        href="/home"
                      >
                        View Details
                      </a>
                      <div className="small text-white">
                        <i className="fas fa-angle-right"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6">
                  <div className="card bg-warning text-white mb-4">
                    <div className="card-body">Warning Card</div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                      <a
                        className="small text-white stretched-link"
                        href="/home"
                      >
                        View Details
                      </a>
                      <div className="small text-white">
                        <i className="fas fa-angle-right"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6">
                  <div className="card bg-success text-white mb-4">
                    <div className="card-body">Success Card</div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                      <a
                        className="small text-white stretched-link"
                        href="/home"
                      >
                        View Details
                      </a>
                      <div className="small text-white">
                        <i className="fas fa-angle-right"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6">
                  <div className="card bg-danger text-white mb-4">
                    <div className="card-body">Danger Card</div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                      <a
                        className="small text-white stretched-link"
                        href="/home"
                      >
                        View Details
                      </a>
                      <div className="small text-white">
                        <i className="fas fa-angle-right"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-evenly">
                  <div
                    className="col-xl-3 col-md-6 btnClickHandler"
                    onClick={checkinHandler}
                  >
                    <div className="card bg-success text-white mb-4">
                      <div className="card-footer d-flex align-items-center justify-content-center">
                        <p className="small text-white stretched-link m-0">
                          Check-in
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-xl-3 col-md-6 btnClickHandler"
                    onClick={checkoutHandler}
                  >
                    <div className="card bg-danger text-white mb-4">
                      <div className="card-footer d-flex align-items-center justify-content-center">
                        <p className="small text-white stretched-link m-0">
                          Check-out
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}
