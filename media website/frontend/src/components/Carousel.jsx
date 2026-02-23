import { useState, useEffect, useCallback } from 'react';
import { carouselSlides } from '../data/staticData';

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const total = carouselSlides.length;
  const next = useCallback(() => setCurrent(c => (c + 1) % total), [total]);
  const prev = () => setCurrent(c => (c - 1 + total) % total);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="hero-carousel">
      <div className="carousel-wrapper" style={{ transform: `translateX(-${current * 100}%)` }}>
        {carouselSlides.map((slide, i) => (
          <div className="carousel-slide" key={i}>
            <img src={slide.image} alt={`Slide ${i + 1}`} />
            <div className="carousel-caption">{slide.caption}</div>
          </div>
        ))}
      </div>
      <button className="carousel-btn prev" onClick={prev}><i className="fas fa-chevron-left"></i></button>
      <button className="carousel-btn next" onClick={() => next()}><i className="fas fa-chevron-right"></i></button>
      <div className="carousel-dots">
        {carouselSlides.map((_, i) => (
          <span key={i} className={`dot${i === current ? ' active' : ''}`} onClick={() => setCurrent(i)}></span>
        ))}
      </div>
    </div>
  );
}
