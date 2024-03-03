import React, { useEffect, useRef, useState } from "react";

import './Hero.scss';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

export default function Hero() {
  const images = Array.from({length: 49}, (_, i) => `/images/hero/ese-hero-sequence${i + 1}.webp`);
  const frameRate = 9;
  
  const [currentFrame, setCurrentFrame] = useState(0);
  const [animationEnded, setAnimationEnded] = useState(false);

  const imageRef = useRef();

  useEffect(() => {
    if(!animationEnded) {
      const timer = setInterval(() => {
        if (currentFrame + 1 === images.length) {
          setAnimationEnded(true);
          clearInterval(timer);
        } else {
          setCurrentFrame(currentFrame + 1);
        }
      }, 1000 / frameRate);
  
      return () => clearInterval(timer);
    }
  }, [currentFrame, images.length, frameRate, animationEnded]);

  gsap.registerPlugin(ScrollTrigger)
  
  useGSAP(() => {
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
  }, [imageRef, animationEnded])

 
  return (
    <main className="hero">
      <img ref={imageRef} src={images[currentFrame]} alt="animation frame" className="hero__image"/>
    </main>
  );
}
