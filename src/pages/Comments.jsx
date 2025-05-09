// src/pages/Comments.jsx
import React, { useState } from 'react';

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [currentComment, setCurrentComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentComment.trim() === '') return;
    setComments([...comments, currentComment]);
    setCurrentComment('');
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">بخش نظرات</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <textarea
            className="form-control"
            value={currentComment}
            onChange={(e) => setCurrentComment(e.target.value)}
            placeholder="نظرتان را بنویسید..."
            rows="3"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">ارسال نظر</button>
      </form>
      <div>
        <h4>نظرات دریافتی:</h4>
        {comments.length === 0 ? (
          <p>هنوز نظری ثبت نشده است.</p>
        ) : (
          comments.map((comment, index) => (
            <div key={index} className="mb-3 p-3 border rounded">
              {comment}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Comments;
