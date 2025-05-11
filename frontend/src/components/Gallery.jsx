import React, { useState } from 'react';
import CommentModal from './CommentModal';

const Gallery = ({ selectedCity }) => {
  // آرایه نمونه‌ی تصاویر پیشنهادی
  const locations = [
    {
      id: 1,
      photoId: 1,
      city: "تهران",
      image: `${process.env.PUBLIC_URL}/images/location1.jpg`,
      description: "منظره‌ای خیره‌کننده از کوه‌های سر به فلک کشیده در تهران."
    },
    {
      id: 2,
      photoId: 2,
      city: "مشهد",
      image: `${process.env.PUBLIC_URL}/images/location2.jpg`,
      description: "رودخانه‌ای آرام در مشهد که ذوق زندگی را در دل طبیعت راه می‌دهد."
    },
    {
      id: 3,
      photoId: 3,
      city: "اصفهان",
      image: `${process.env.PUBLIC_URL}/images/location3.jpg`,
      description: "جنگل‌های سرسبز در اصفهان با نسیم‌های خنک و آرامش‌بخش."
    },
    {
      id: 4,
      photoId: 4,
      city: "شیراز",
      image: `${process.env.PUBLIC_URL}/images/location4.jpg`,
      description: "ساحلی زیبا در شیراز با شن‌های نرم و آبی آرام."
    },
    {
      id: 5,
      photoId: 5,
      city: "تبریز",
      image: `${process.env.PUBLIC_URL}/images/location5.jpg`,
      description: "آبشاری بلند در تبریز که با قدرت و زیبایی طبیعت را به نمایش می‌گذارد."
    },
    {
      id: 6,
      photoId: 6,
      city: "تهران",
      image: `${process.env.PUBLIC_URL}/images/location6.jpg`,
      description: "منظره‌ای جذاب از شهر تهران با معماری مدرن و فضای دلنشین."
    },
  ];

  const filteredLocations =
    selectedCity && selectedCity !== "همه"
      ? locations.filter((item) => item.city === selectedCity)
      : locations;

  // وضعیت مربوط به نمایش modal
  const [showModal, setShowModal] = useState(false);
  const [activePhotoId, setActivePhotoId] = useState(null);

  // برای ذخیره‌ی نظرات هر عکس (به صورت اختیاری)
  const [comments, setComments] = useState({}); // به صورت دیکشنری: key -> photoId, value -> array of comments

  const openModal = (photoId) => {
    setActivePhotoId(photoId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setActivePhotoId(null);
  };

  const addComment = async (photoId, commentText) => {
    // بررسی ورود کاربر (در محیط‌های واقعی، از توکن JWT استفاده کنید)
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      alert('لطفاً ابتدا وارد شوید.');
      return;
    }
    const user = JSON.parse(storedUser);

    try {
      const response = await fetch('http://localhost:5000/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.id,      // مقدار user.id از session ذخیره‌شده
          photo_id: photoId,
          text: commentText,
        }),
      });
      const data = await response.json();
      if (response.status === 201) {
        alert('نظر با موفقیت ثبت شد!');
        // اضافه کردن نظر به وضعیت محلی (اختیاری)
        setComments((prev) => {
          const prevComments = prev[photoId] || [];
          return { ...prev, [photoId]: [...prevComments, data.comment] };
        });
      } else {
        alert(data.error || 'خطا در ثبت نظر');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('خطا در ثبت نظر');
    }
  };

  return (
    <section className="container mt-5">
      <div className="row">
        {filteredLocations.map((item) => (
          <div key={item.id} className="col-md-4 mb-4">
            <img
              src={item.image}
              alt={`مکان ${item.id}`}
              className="img-fluid rounded"
              style={{ width: '100%', height: 'auto' }}
            />
            <p className="mt-2">{item.description}</p>
            <button
              className="btn btn-sm btn-primary"
              onClick={() => openModal(item.photoId)}
            >
              ثبت نظر
            </button>
            {/* نمایش نظرات ثبت شده برای هر عکس (اختیاری) */}
            {comments[item.photoId] && comments[item.photoId].length > 0 && (
              <ul className="mt-2 list-group">
                {comments[item.photoId].map((com) => (
                  <li key={com.id} className="list-group-item">
                    <strong>User {com.user_id}:</strong> {com.text}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* نمایش CommentModal فقط در صورت کلیک روی دکمه */}
      {showModal && activePhotoId && (
        <CommentModal
          photoId={activePhotoId}
          show={showModal}
          handleClose={closeModal}
          addComment={addComment}
        />
      )}
    </section>
  );
};

export default Gallery;
