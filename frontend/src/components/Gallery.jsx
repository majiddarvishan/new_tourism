// src/components/Gallery.jsx
import React from 'react';

const Gallery = ({ selectedCity }) => {
  const locations = [
    {
      id: 1,
      city: "تهران",
      image: `${process.env.PUBLIC_URL}/images/location1.jpg`,
      description: "منظره‌ای خیره‌کننده از کوه‌های سر به فلک کشیده در تهران."
    },
    {
      id: 2,
      city: "مشهد",
      image: `${process.env.PUBLIC_URL}/images/location2.jpg`,
      description: "رودخانه‌ای آرام در مشهد که ذوق زندگی را در دل طبیعت راه می‌دهد."
    },
    {
      id: 3,
      city: "اصفهان",
      image: `${process.env.PUBLIC_URL}/images/location3.jpg`,
      description: "جنگل‌های سرسبز در اصفهان با نسیم‌های خنک و آرامش‌بخش."
    },
    {
      id: 4,
      city: "شیراز",
      image: `${process.env.PUBLIC_URL}/images/location4.jpg`,
      description: "ساحلی زیبا در شیراز با شن‌های نرم و آبی آرام."
    },
    {
      id: 5,
      city: "تبریز",
      image: `${process.env.PUBLIC_URL}/images/location5.jpg`,
      description: "آبشاری بلند در تبریز که با قدرت و زیبایی طبیعت را به نمایش می‌گذارد."
    },
    {
      id: 6,
      city: "تهران",
      image: `${process.env.PUBLIC_URL}/images/location6.jpg`,
      description: "منظره‌ای جذاب از شهر تهران با معماری مدرن و فضای دلنشین."
    },
  ];

  const filteredLocations = selectedCity && selectedCity !== "همه"
    ? locations.filter(item => item.city === selectedCity)
    : locations;

  return (
    <section className="container mt-5">
      <div className="row">
        {filteredLocations.map(item => (
          <div key={item.id} className="col-md-4 mb-4">
            <img
              src={item.image}
              alt={`مکان ${item.id}`}
              className="img-fluid rounded"
              style={{ width: "100%", height: "auto" }}
            />
            <p className="mt-2">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
