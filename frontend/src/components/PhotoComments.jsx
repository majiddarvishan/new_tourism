import React, { useState, useEffect, useCallback } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const PhotoComments = ({ photoId }) => {
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newComment, setNewComment] = useState("");

  // تعریف تابع fetchComments با useCallback؛ این تابع تنها زمانی ایجاد می‌شود که photoId تغییر کند
  const fetchComments = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/comments?photo_id=${photoId}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'  // This is important since AllowCredentials is true
      })

    //   const response = await fetch(`http://localhost:5000/api/comments?photo_id=${photoId}`);
      const data = await response.json();
      if (data.comments) {
        setComments(data.comments);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }, [photoId]);

  // فراخوانی fetchComments به عنوان dependency در useEffect
  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  // ثبت کامنت جدید
  const handlePostComment = async (e) => {
    e.preventDefault();

    // بررسی ورود کاربر (در اینجا از localStorage استفاده می‌کنیم)
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      alert("لطفاً ابتدا وارد شوید تا بتوانید نظر ثبت کنید.");
      return;
    }
    const user = JSON.parse(storedUser);

    try {
      const response = await fetch("http://localhost:5000/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,  // در پروژه‌های واقعی این مقدار از توکن یا session استخراج می‌شود
          photo_id: photoId,
          text: newComment,
        }),
      });
      const data = await response.json();
      if (response.status === 201) {
        // اضافه کردن کامنت جدید به آرایه کامنت‌ها
        setComments([...comments, data.comment]);
        setNewComment("");
        setShowModal(false);
      } else {
        alert(data.error || "خطا در ثبت نظر");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
      alert("خطا در ثبت نظر");
    }
  };

  return (
    <div className="mt-3">
      <h6>نظرات:</h6>
      {comments.length > 0 ? (
        <ul className="list-group">
          {comments.map((com) => (
            <li key={com.id || com.ID} className="list-group-item">
              <strong>User {com.user_id}:</strong> {com.text}
            </li>
          ))}
        </ul>
      ) : (
        <p>هنوز نظری ثبت نشده است.</p>
      )}
      <Button variant="primary" className="mt-2" onClick={() => setShowModal(true)}>
        ثبت نظر
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>ثبت نظر</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handlePostComment}>
            <Form.Group controlId="commentText">
              <Form.Label>متن نظر</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              ارسال
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PhotoComments;
