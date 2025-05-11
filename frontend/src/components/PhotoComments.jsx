import React, { useState, useEffect } from 'react';

const PhotoComments = ({ photoId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  // دریافت نظرات ثبت شده برای عکس مشخص‌شده
  useEffect(() => {
    fetch(`http://localhost:5000/api/comments?photo_id=${photoId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.comments) {
          setComments(data.comments);
        }
      })
      .catch((error) => console.error('Error fetching comments:', error));
  }, [photoId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // بررسی وجود کاربر وارد شده
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      alert('لطفاً ابتدا وارد شوید تا بتوانید نظر ثبت کنید.');
      return;
    }
    const user = JSON.parse(storedUser);

    try {
      const response = await fetch('http://localhost:5000/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.id,   // در برنامه‌های واقعی، مقدار user_id از توکن استخراج می‌شود
          photo_id: photoId,
          text: newComment,
        }),
      });
      const data = await response.json();
      if (response.status === 201) {
        // اضافه کردن نظر جدید به لیست نظرات
        setComments([...comments, data.comment]);
        setNewComment('');
      } else {
        alert(data.error || 'خطا در ثبت نظر');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('خطا در ثبت نظر');
    }
  };

  return (
    <div className="mt-4">
      <h4>نظرات</h4>
      <ul className="list-group mb-3">
        {comments.map((com) => (
          <li key={com.id} className="list-group-item">
            <strong>User {com.user_id}:</strong> {com.text}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <textarea
            className="form-control"
            placeholder="نظر خود را بنویسید..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            required
            rows="3"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          ثبت نظر
        </button>
      </form>
    </div>
  );
};

export default PhotoComments;
