import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

import "./App.css";
import { DataContext } from "./context/DataContext";
import CustomNavbar from "./components/navbar";
import ManagePage from "./pages/ManagePage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <DataContext>
      <BrowserRouter>
        <CustomNavbar />
        <Routes>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<div>Register</div>}></Route>
          <Route path="/" element={<HomePage />}></Route>

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/manage"
            element={
              <ProtectedRoute>
                <ManagePage />
              </ProtectedRoute>
            }
          ></Route>

          <Route path="*" element={<div>Error Page</div>}></Route>
        </Routes>
      </BrowserRouter>
    </DataContext>
  );
}

export default App;
