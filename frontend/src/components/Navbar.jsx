import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">سایت توریستی</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li><NavLink className="nav-link" to="/">خانه</NavLink></li>
            <li><NavLink className="nav-link" to="/about">درباره ما</NavLink></li>
            <li><NavLink className="nav-link" to="/comments">نظرات</NavLink></li>
          </ul>
          <div className="ms-auto">
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
