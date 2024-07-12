import React, { useState, useEffect } from 'react';
import Shopee from '../assets/Images/shopeeLogo2.png';
import Lazada from '../assets/Images/lazadalogo.jpg.png';

const images = [
  { src: Shopee, link: "https://shopee.com" },
  { src: Lazada, link: "https://Lazada.com.ph" },
];

function Ads({ setAds }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel w-full relative">
      {images.map((img, index) => (
        <div
          key={index}
          className={`carousel-item w-full ${index === currentSlide ? '' : 'hidden'}`}
        >
          <a href={img.link} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
            <div className='bg-gray-200 w-full h-full flex justify-center items-center'>
              <img src={img.src} className="max-h-20" alt={`Slide ${index}`} />
            </div>
          </a>
          <button
            className="btn btn-xs text-error rounded-full absolute right-0 top-0"
            onClick={() => setAds(false)}
          >
            x
          </button>
        </div>
      ))}
    </div>
  );
}

export default Ads;
