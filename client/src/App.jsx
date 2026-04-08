import { Routes, Route, useLocation } from "react-router-dom";
import UsersPage from "./pages/users/UsersPage";
import Login from "./pages/Log_in/Log_in";
import "./App.css";
import Header from "./components/header/Header";
import HomePage from "./pages/HomePage/HomePage";
import { Toaster } from "react-hot-toast";
function App() {
  const Location = useLocation();
  return (
    <>
      {location.pathname != "/" && <Header />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/users" element={<UsersPage />} />
      </Routes>{" "}
      <Toaster position="top-right" />
    </>
  );
}

export default App;
