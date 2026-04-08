import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
function Header() {
  return (
    <div className="header">
      <div className="header__container">
        <div className="header__brand">
          <h1 className="header__tag">Panel adminstrativo</h1>
        </div>
        <nav className="nav">
          <ul className="nav__list">
            <li className="nav__item">
              <Link to="/homepage" className="nav__link">
                Home Page
              </Link>
            </li>
            <li className="nav__item">
              <Link to="/users" className="nav__link">
                Usuarios
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Header;
