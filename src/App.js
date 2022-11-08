import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";

import { ToastContainer } from "react-toastify";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<Profile />} />{" "}
            </Routes>
          </BrowserRouter>
          <ToastContainer />
        </PersistGate>
      </ReduxProvider>
    </>
  );
}

export default App;
