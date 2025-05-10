// src/pages/Login.jsx
import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("ایمیل:", email, "رمز عبور:", password);
  };

  return (
    <div className="container mt-5">
      <h2>ورود به حساب</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">ایمیل</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">رمز عبور</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">ورود</button>
      </form>
    </div>
  );
};

export default Login;
