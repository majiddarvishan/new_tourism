// src/components/Navbar.jsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">سایت توریستی</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="تغییر ناوبری"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item"><NavLink className="nav-link" to="/">خانه</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/about">درباره ما</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/comments">نظرات</NavLink></li>
          </ul>
          <div className="ms-auto">
            <Link className="btn btn-outline-primary me-2" to="/login">ورود</Link>
            <Link className="btn btn-primary" to="/signup">عضویت</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
