// src/components/CommentModal.jsx
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const CommentModal = ({ photoId, show, handleClose, addComment }) => {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim() === '') return;
    addComment(photoId, commentText);
    setCommentText('');
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>ثبت نظر</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="commentTextarea">
            <Form.Label>نظر خود را بنویسید:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            ارسال نظر
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CommentModal;
