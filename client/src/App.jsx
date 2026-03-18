import { Routes, Route } from "react-router-dom";
import UsersPage from "./pages/users/UsersPage";
import "./App.css";
import Header from "./components/header/Header";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<UsersPage />} />
      </Routes>
    </>
  );
}

export default App;
