import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand" to="/">سایت توریستی</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse text-end" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><NavLink className="nav-link" to="/">خانه</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/about">درباره ما</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/comments">نظرات</NavLink></li>
          </ul>
          <div className="me-auto">
            {user ? (
              <span>خوش آمدید، {user.name}</span>
            ) : (
              <>
                <Link className="btn btn-outline-primary me-2" to="/login">ورود</Link>
                <Link className="btn btn-primary" to="/signup">عضویت</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
