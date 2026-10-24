'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import Image from 'next/image';
import { HeadAccessories, AccessoryType } from './HeadAccessories';
import { sound } from '@/lib/audio';

export type HeadMode = 'track' | 'physics' | 'dance';
export type CropStyle = 'cutout' | 'portrait' | 'glow';

interface Props {
  mode: HeadMode;
  accessory: AccessoryType;
  cropStyle: CropStyle;
  lang: 'ar' | 'en';
  isPureZen: boolean;
  onExitPure?: () => void;
  speedMultiplier?: number;
}

const ARABIC_QUOTES = [
  'يا هلا بيك في موقع رأسي!',
  'شايفك ومركز معاك في كل حركة!',
  'سيب شعري في حاله يا عم!',
  'روق يا باشا وخليك هادي!',
  'أنا الرأس.. والرأس فقط!',
  '100 على 100 والله!',
  'دلعني بنظارة شمسية أو تاج ملكي!',
  'الفيزياء عندي مظبوطة بالملّي!',
  'اضغط تاني علشان تشوف ردة فعلي!',
  'منور الشاشة كلها يا فنان!',
];

const ENGLISH_QUOTES = [
  'Welcome to The Head!',
  'I see you moving that cursor!',
  'Hey, watch the hair!',
  'Just chill and vibe with the head.',
  'Pure Head. Nothing else.',
  'Looking good today!',
  'Try putting a crown or sunglasses on me!',
  'Head physics are top tier!',
  'Click me again for more reactions!',
  'You found the coolest head on the web!',
];

export function MainHead({
  mode,
  accessory,
  cropStyle,
  lang,
  isPureZen,
  onExitPure,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for rotation
  const smoothX = useSpring(mouseX, { stiffness: 120, damping: 14 });
  const smoothY = useSpring(mouseY, { stiffness: 120, damping: 14 });

  const rotateY = useTransform(smoothX, [-350, 350], [24, -24]);
  const rotateX = useTransform(smoothY, [-350, 350], [-20, 20]);
  const shadowX = useTransform(smoothX, [-350, 350], [25, -25]);
  const shadowY = useTransform(smoothY, [-350, 350], [25, -25]);

  // Click reaction state
  const [clickCount, setClickCount] = useState(0);
  const [currentQuote, setCurrentQuote] = useState<string | null>(null);
  const [quoteTimeout, setQuoteTimeout] = useState<NodeJS.Timeout | null>(null);
  const [sparks, setSparks] = useState<Array<{ id: number; x: number; y: number; text: string }>>([]);

  // Dance mode state
  const [danceStep, setDanceStep] = useState(0);

  // Mouse movement handler
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (mode !== 'track' && !isPureZen) return;
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = Math.max(-400, Math.min(400, e.clientX - centerX));
      const deltaY = Math.max(-400, Math.min(400, e.clientY - centerY));

      mouseX.set(deltaX);
      mouseY.set(deltaY);
    },
    [mode, isPureZen, mouseX, mouseY]
  );

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  // Dance beat timer
  useEffect(() => {
    if (mode !== 'dance') return;
    const interval = setInterval(() => {
      setDanceStep((s) => (s + 1) % 4);
    }, 400);
    return () => clearInterval(interval);
  }, [mode]);

  // Trigger speech and squash on click
  const handleHeadClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setClickCount((c) => c + 1);

    // Sound effect based on accessory
    if (accessory === 'laser') {
      sound.playLaser();
    } else if (accessory === 'crown') {
      sound.playChime();
    } else {
      sound.playBoing();
    }

    // Pick random quote
    const quotes = lang === 'ar' ? ARABIC_QUOTES : ENGLISH_QUOTES;
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    setCurrentQuote(quote);

    sound.speakQuote(quote, lang);

    if (quoteTimeout) clearTimeout(quoteTimeout);
    const t = setTimeout(() => {
      setCurrentQuote(null);
    }, 3200);
    setQuoteTimeout(t);

    // Spawn sparks
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const sparkSymbols = ['✨', '🔥', '💫', '⚡', '🎉', '❤️'];
    const newSpark = {
      id: Date.now() + Math.random(),
      x,
      y,
      text: sparkSymbols[Math.floor(Math.random() * sparkSymbols.length)],
    };
    setSparks((prev) => [...prev.slice(-6), newSpark]);
  };

  // Select image source based on crop style
  const headImage =
    cropStyle === 'cutout'
      ? '/assets/head-cutout.png'
      : cropStyle === 'portrait'
      ? '/assets/head-cropped.png'
      : '/assets/head-cutout.png';

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center select-none ${
        isPureZen ? 'fixed inset-0 z-50 bg-[#07080b]' : 'w-full py-8'
      }`}
      style={{ perspective: 1200 }}
    >
      {/* Pure Mode Exit Banner */}
      {isPureZen && (
        <div className="absolute top-6 z-50 flex items-center gap-3 bg-zinc-900/80 backdrop-blur-md border border-zinc-800 text-zinc-300 text-xs px-4 py-2 rounded-full shadow-lg">
          <span>{lang === 'ar' ? 'وضع الرأس الخالص نشط' : 'Pure Head Mode Active'}</span>
          <button
            onClick={onExitPure}
            className="text-amber-400 hover:text-amber-300 font-medium cursor-pointer underline underline-offset-4"
          >
            {lang === 'ar' ? 'خروج (Esc)' : 'Exit (Esc)'}
          </button>
        </div>
      )}

      {/* Comic Speech Bubble */}
      {currentQuote && (
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: 'spring', damping: 15 }}
          className="absolute z-40 -top-16 md:-top-20 max-w-xs md:max-w-md bg-white text-zinc-900 px-5 py-3 rounded-2xl shadow-2xl font-bold text-center text-sm md:text-base border-2 border-amber-400 select-none pointer-events-none"
        >
          {currentQuote}
          {/* Bubble pointer triangle */}
          <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-4 h-4 bg-white border-b-2 border-r-2 border-amber-400 rotate-45" />
        </motion.div>
      )}

      {/* Floating Click Sparks */}
      {sparks.map((s) => (
        <motion.div
          key={s.id}
          initial={{ opacity: 1, y: 0, scale: 0.5 }}
          animate={{ opacity: 0, y: -60, scale: 1.5 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="absolute pointer-events-none text-2xl z-30"
          style={{ left: s.x, top: s.y }}
        >
          {s.text}
        </motion.div>
      ))}

      {/* Dance Beats Musical Notes */}
      {mode === 'dance' && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <motion.span
            animate={{
              y: [-20, -120],
              x: [-40, -100],
              opacity: [0, 1, 0],
              rotate: [-10, -30],
            }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
            className="absolute text-3xl text-amber-400"
          >
            🎵
          </motion.span>
          <motion.span
            animate={{
              y: [-20, -140],
              x: [40, 110],
              opacity: [0, 1, 0],
              rotate: [10, 35],
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.6, ease: 'easeOut' }}
            className="absolute text-4xl text-rose-400"
          >
            🎶
          </motion.span>
        </div>
      )}

      {/* The Head Centerpiece with 3D tracking & drag physics */}
      <motion.div
        drag={mode === 'physics'}
        dragConstraints={{ left: -320, right: 320, top: -240, bottom: 240 }}
        dragElastic={0.2}
        whileDrag={{ scale: 1.08, cursor: 'grabbing' }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.92 }}
        onClick={handleHeadClick}
        animate={
          mode === 'dance'
            ? {
                y: danceStep % 2 === 0 ? -18 : 12,
                rotate: danceStep === 0 ? -10 : danceStep === 2 ? 10 : 0,
                scale: [1, 1.04, 0.98, 1][danceStep],
              }
            : {
                y: [0, -8, 0],
              }
        }
        transition={
          mode === 'dance'
            ? { duration: 0.38, ease: 'easeInOut' }
            : {
                y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
              }
        }
        style={{
          rotateX: mode === 'track' || isPureZen ? rotateX : 0,
          rotateY: mode === 'track' || isPureZen ? rotateY : 0,
          transformStyle: 'preserve-3d',
        }}
        className={`relative cursor-pointer transition-shadow will-change-transform ${
          mode === 'physics' ? 'cursor-grab' : ''
        }`}
      >
        {/* Dynamic Studio Shadow / Glow Underneath */}
        <motion.div
          className={`absolute inset-0 rounded-full blur-2xl transition-all duration-300 pointer-events-none -z-10 ${
            cropStyle === 'glow'
              ? 'bg-gradient-to-tr from-amber-500/35 via-rose-500/25 to-blue-500/35 scale-125'
              : 'bg-amber-600/15 scale-105'
          }`}
          style={{
            x: shadowX,
            y: shadowY,
          }}
        />

        {/* Head Container with selected Crop Style */}
        <div
          className={`relative overflow-visible transition-all duration-300 ${
            cropStyle === 'portrait'
              ? 'rounded-3xl border-4 border-zinc-700/60 shadow-2xl p-2 bg-zinc-900/60'
              : cropStyle === 'glow'
              ? 'rounded-full border-4 border-amber-400/80 shadow-[0_0_35px_rgba(251,191,36,0.35)] p-3 bg-zinc-900/80'
              : ''
          }`}
          style={{
            width: isPureZen ? '360px' : '290px',
            maxWidth: '85vw',
            aspectRatio: '300 / 340',
          }}
        >
          {/* Head Image */}
          <div className="relative w-full h-full">
            <Image
              src={headImage}
              alt="The Head"
              fill
              priority
              sizes="(max-width: 768px) 280px, 360px"
              className={`select-none object-contain transition-all ${
                cropStyle === 'portrait' ? 'rounded-2xl object-cover' : ''
              } ${cropStyle === 'glow' ? 'rounded-full object-cover' : ''}`}
            />

            {/* Accessories Overlay (SVG Hats, Sunglasses, Crown, etc.) */}
            <HeadAccessories accessory={accessory} isDancing={mode === 'dance'} />
          </div>
        </div>

        {/* Subtle touch badge */}
        <div className="text-center mt-3 text-xs text-zinc-400 select-none">
          {mode === 'physics'
            ? lang === 'ar'
              ? '⚡ اسحب الرأس وارمه في أي اتجاه!'
              : '⚡ Drag & fling the head around!'
            : lang === 'ar'
            ? '👆 انقر على الرأس لردة الفعل والأصوات'
            : '👆 Tap the head to interact & hear quotes'}
        </div>
      </motion.div>
    </div>
  );
}
