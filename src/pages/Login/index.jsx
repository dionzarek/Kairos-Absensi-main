import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../redux/actionCreator/authAction";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";

import "./login.css";

export default function Login() {
  const { isSuccess, isLoading } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginHandler = async () => {
    try {
      const body = {
        email,
        password,
      };
      const result = await dispatch(loginAction(body));
      toast.success(result.value.data.data.msg);
    } catch (error) {
      console.log(error);
      toast.error("Login Failed");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/home");
    }
  }, [isSuccess]); // eslint-disable-line no-use-before-define

  document.title = "Login";

  return (
    <>
      {isLoading && <Loading />}
      <div className="bgLogin p-5">
        <div id="layoutAuthentication">
          <div id="layoutAuthentication_content">
            <main>
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-5">
                    <div className="card shadow-lg border-0 rounded-lg mt-5">
                      <div className="card-header text-center">
                        <img
                          src={require("../../assets/logo.png")}
                          alt="logo"
                        />
                        <h3 className="text-center font-weight-light my-4">
                          Login
                        </h3>
                      </div>
                      <div className="card-body">
                        <form>
                          <div className="form-floating mb-3">
                            <input
                              className="form-control"
                              id="inputEmail"
                              type="email"
                              placeholder="name@example.com"
                              value={email}
                              onChange={(e) => {
                                setEmail(e.target.value);
                              }}
                            />
                            <label for="inputEmail">Email address</label>
                          </div>
                          <div className="form-floating mb-3">
                            <input
                              className="form-control"
                              id="inputPassword"
                              type="password"
                              placeholder="Password"
                              value={password}
                              onChange={(e) => {
                                setPassword(e.target.value);
                              }}
                            />
                            <label for="inputPassword">Password</label>
                          </div>
                          {/* <div className="form-check mb-3">
                            <input
                              className="form-check-input"
                              id="inputRememberPassword"
                              type="checkbox"
                              value=""
                            />
                            <label
                              className="form-check-label"
                              for="inputRememberPassword"
                            >
                              Remember Password
                            </label>
                          </div> */}
                          <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                            <a className="small" href="password.html">
                              Forgot Password?
                            </a>
                            <div
                              className="btn btn-primary"
                              onClick={loginHandler}
                            >
                              Login
                            </div>
                          </div>
                        </form>
                      </div>
                      <div className="card-footer text-center py-3">
                        <div className="small">
                          <p>Copyright @Kairos Cahaya Cemerlang 2022</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
