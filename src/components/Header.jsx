// src/components/Header.jsx
import React from 'react';

const Header = () => {
  return (
    <header style={{ position: 'relative', height: '400px' }}>
      <img
        src={`${process.env.PUBLIC_URL}/images/darya-jangal.jpg`}
        alt="دریا و جنگل"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />

      <div style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: '#fff',
          padding: '10px',
          borderRadius: '5px'
        }}>
        وب‌سایت توریستی ما
      </div>
    </header>
  );
};

export default Header;
