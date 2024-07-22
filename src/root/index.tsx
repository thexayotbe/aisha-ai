import { Route, Routes } from "react-router-dom";
import AuthMain from "../components/AuthMain";
import SignUp from "../components/SignUp";
import Login from "../components/Login";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import Home from "../components/Home";
const Root = () => {
  return (
    <Routes>
      <Route path="/auth" element={<AuthMain />} />
      <Route path="/auth/signup" element={<SignUp />} />
      <Route path="/auth/login" element={<Login />} />
      <Route element={<AuthOutlet fallbackPath="/auth" />}>
        <Route path="/" element={<Home />} />
      </Route>{" "}
    </Routes>
  );
};

export default Root;
