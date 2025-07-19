import React from 'react';
import { motion } from 'framer-motion';
import './InfiniteSlider.css'; // CSS fayl

const images = [
  "../images/1.jpg",
  "../images/2.jpg",
  "../images/3.jpg",
  "../images/4.jpg",
  "./images/5.jpg",
  "./images/6.jpg",
  "./images/7.jpg",
  "./images/8.jpg",
  "./images/9.jpg",
  "./images/10.jpg",
  "images/1.jpg"
];

const InfiniteSlider = () => {
  // Rasm massivini 2x qilib uzluksiz slayder qilish
  const loopImages = [...images, ...images];

  return (
    <div className="slider-container">
      <motion.div
        className="slider-track"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          duration: 50,
          ease: "linear"
        }}
      >
        {loopImages.map((src, index) => (
          <div className="slider-image" key={index}>
            <img src={src} alt={`img-${index}`} />
          </div>
        ))}
      </motion.div>
      <h2>Bular Qatorida Siz Ham Bo'lishingiz Mumkin.!!</h2>
    </div>
  );
};

export default InfiniteSlider;
