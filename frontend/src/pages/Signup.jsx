import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/signup', {
        name, email, password
      });
      alert(response.data.message || 'ثبت‌نام موفق!');
    } catch (error) {
      console.error('خطا در ثبت‌نام:', error);
      alert('خطا در ثبت‌نام!');
    }
  };

  return (
    <div className="container mt-5">
      <h2>عضویت در سایت</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>نام</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>ایمیل</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>رمز عبور</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-success">ثبت‌نام</button>
      </form>
    </div>
  );
};

export default Signup;
