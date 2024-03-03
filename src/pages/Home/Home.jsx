import React, { useEffect, useRef, useState } from "react";

import './Home.scss';
import Hero from "./Hero/Hero";
import { TextSlider } from "@/components/TextSlider/TextSlider";

export default function Home() {
  return (
    <main className="home">
      <Hero />
      <TextSlider />
      <h1 className="home__title"><span style={{ marginRight: '14vw' }}/>Culture-driven, creative and competitive. Our digital agency creates impact for brands. In the disciplines of websites, strategy, content marketing, campaigning and branding. Between timeless and zeitgeist. When we communicate we do so effectively, quick witted and ambitious. This is ESE Agency.</h1>
    </main>
  );
}
