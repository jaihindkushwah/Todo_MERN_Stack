import Login from "./pages/Login";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Dashboard from "./pages/Dashboard";
import ForgetPassword from "./pages/ForgetPassword";
import AuthProvider from "./context/AuthProvider";
import PublicRoute from "./components/PublicRoute";
import TaskProvider from "./context/TaskProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TaskProvider>
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route path="/" element={<Dashboard />} exact />
              <Route path="/dashboard" element={<Dashboard />} exact />
              <Route path="*" element={<div>Not found</div>} />
            </Route>
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgotPassword" element={<ForgetPassword />} />
              <Route path="*" element={<div>Not found</div>} />
            </Route>
          </Routes>
        </TaskProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
