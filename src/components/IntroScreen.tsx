"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";

export function IntroScreen() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const alreadySeen = localStorage.getItem("stockfashion-intro");

    if (alreadySeen) return;

    setVisible(true);

    const tl = gsap.timeline({
      onComplete: () => {
        localStorage.setItem("stockfashion-intro", "true");

        gsap.to(".intro-overlay", {
          opacity: 0,
          duration: 0.8,
          delay: 1,
          onComplete: () => setVisible(false),
        });
      },
    });

    tl.fromTo(
      ".intro-content",
      {
        opacity: 0,
        y: 20,
        scale: 0.98,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
      }
    );
  }, []);

  if (!visible) return null;

  return (
    <div className="intro-overlay fixed inset-0 z-[9999] flex items-center justify-center bg-zinc-950">
      <div className="intro-content flex flex-col items-center gap-5">
        {/* Logo */}
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-green-400/30 bg-green-400/10 backdrop-blur-sm">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            className="text-green-400"
          >
            <path
              d="M6 4H18L20 8V20H4V8L6 4Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 11C9 12.657 10.343 14 12 14C13.657 14 15 12.657 15 11"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-white">
          Stock<span className="text-green-400">Fashion</span>
        </h1>

        <p className="text-sm text-zinc-400">
          Gerenciando seu estoque com estilo
        </p>
      </div>
    </div>
  );
}