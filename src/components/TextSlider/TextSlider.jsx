import React, { useEffect, useRef, useState } from "react";

import './TextSlider.scss';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";


export const TextSlider = () => {
  const firstText = useRef();
  const secondText = useRef();
  const slider = useRef();
  let xPercent = 0;
  let direction = -1;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.25,
        start: 0,
        end: window.innerHeight,
        onUpdate: (e) => (direction = e.direction * -1),
      },
      xPercent: -5,
    });
    requestAnimationFrame(animate);
  }, []);

  const animate = () => {
    if (xPercent < -100) {
      xPercent = 0;
    } else if (xPercent > 0) {
      xPercent = -100;
    }
    gsap.set(firstText.current, { xPercent, duration: 3 });
    gsap.set(secondText.current, { xPercent, duration: 3 });
    requestAnimationFrame(animate);
    xPercent += 0.1 * direction;
  };

  return (
      <div className="text-slider">
        <div ref={slider} className="text-slider__container">
          <span ref={firstText} className="big-text">
            Overtake time with us
          </span>
          <span ref={secondText} className="big-text">
            Overtake time with us
          </span>
        </div>
      </div>
  );
};
