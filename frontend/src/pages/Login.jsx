import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email, password
      });

      if (response.data.user) {
        alert('ورود موفق!');
        localStorage.setItem('user', JSON.stringify(response.data.user)); // Save user data
      } else {
        alert(response.data.error || 'نامعتبر');
      }
    } catch (error) {
      console.error('خطا در ورود:', error);
      alert('خطا در ورود!');
    }
  };

  return (
    <div className="container mt-5">
      <h2>ورود به حساب</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>ایمیل</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>رمز عبور</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">ورود</button>
      </form>
    </div>
  );
};

export default Login;
