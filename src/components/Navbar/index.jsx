import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Loading from "../Loading";

import { logoutAction } from "../../redux/actionCreator/authAction";

export default function Navbar() {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const logoutHandler = async () => {
    try {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        navigate("/");
        dispatch(logoutAction());
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const sideBar = async () => {
    try {
      const sidebarToggle = document.body.querySelector("#sidebarToggle");
      if (sidebarToggle) {
        sidebarToggle.addEventListener("click", (event) => {
          event.preventDefault();
          document.body.classList.toggle("sb-sidenav-toggled");
          localStorage.setItem(
            "sb|sidebar-toggle",
            document.body.classList.contains("sb-sidenav-toggled")
          );
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <nav className="sb-topnav navbar navbar-expand navbar-light bg- border">
        <a className="navbar-brand ps-5" href="/">
          <img
            src={require("../../assets/logo.png")}
            alt="logo"
            width={50}
            height={50}
          />
        </a>
        <button
          className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
          id="sidebarToggle"
          href="#"
          onClick={sideBar}
        >
          <i className="fas fa-bars"></i>
        </button>
        <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
          <div className="input-group">
            <input
              className="form-control"
              type="text"
              placeholder="Search for..."
              aria-label="Search for..."
              aria-describedby="btnNavbarSearch"
            />
            <button
              className="btn btn-primary"
              id="btnNavbarSearch"
              type="button"
            >
              <i className="fas fa-search"></i>
            </button>
          </div>
        </form>
        <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
          <li className="nav-item dropdown">
            <div
              className="nav-link dropdown-toggle"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fas fa-user fa-fw"></i>
            </div>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdown"
            >
              <li>
                <a className="dropdown-item" href="/profile">
                  Profile
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#!">
                  Settings
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <div className="dropdown-item" onClick={handleShow}>
                  Logout
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to leave?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={logoutHandler}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
