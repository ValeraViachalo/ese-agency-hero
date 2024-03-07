import React, { useEffect, useRef, useState } from "react";

import './Hero.scss';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

export default function Hero() {
  const images = Array.from({length: 49}, (_, i) => `/images/hero/ese-hero-sequence${i + 1}.webp`);
  const frameRate = 12;
  
  const [currentFrame, setCurrentFrame] = useState(0);
  const [animationEnded, setAnimationEnded] = useState(false);
  const [loadedImages, setLoadedImages] = useState([]);

  const imageRef = useRef();

  // Preload images
  useEffect(() => {
    const loadImages = images.map(image => {
      const img = new Image();
      img.src = image;
      return img;
    });
    setLoadedImages(loadImages);
  }, [images]);

  useEffect(() => {
    if(!animationEnded) {
      const timer = setInterval(() => {
        setCurrentFrame(prevFrame => {
          if (prevFrame + 1 === images.length) {
            setAnimationEnded(true);
            clearInterval(timer);
            return prevFrame;
          } else {
            return prevFrame + 1;
          }
        });
      }, 1000 / frameRate);
  
      return () => clearInterval(timer);
    }
  }, [images.length, frameRate, animationEnded]);

  gsap.registerPlugin(ScrollTrigger)
  
  useEffect(() => {
    if (imageRef.current && animationEnded) {
      ScrollTrigger.create({
        trigger: '.hero',
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          onUpdate: self => {
            const progress = self.progress;
            const newFrame = Math.floor((1 - progress) * (images.length - 1));
            setCurrentFrame(newFrame);
          }
        });
    }
  }, [imageRef, animationEnded, images.length])

  return (
    <main className="hero">
      <img ref={imageRef} src={loadedImages[currentFrame]?.src} alt="animation frame" className="hero__image"/>
    </main>
  );
}
