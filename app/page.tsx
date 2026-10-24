'use client';

import React, { useState, useEffect } from 'react';
import { MainHead, HeadMode, CropStyle } from '@/components/MainHead';
import { HeadAccessories, AccessoryType } from '@/components/HeadAccessories';
import { HeadControls } from '@/components/HeadControls';
import { HeadRain } from '@/components/HeadRain';
import { sound } from '@/lib/audio';
import { downloadHeadSnapshot } from '@/lib/snapshot';

export default function HomePage() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [mode, setMode] = useState<HeadMode>('track');
  const [accessory, setAccessory] = useState<AccessoryType>('none');
  const [cropStyle, setCropStyle] = useState<CropStyle>('cutout');
  const [isPureZen, setIsPureZen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [rainActive, setRainActive] = useState(false);
  const [rainCount, setRainCount] = useState(8);

  const isAr = lang === 'ar';

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setIsPureZen((prev) => !prev);
      } else if (e.code === 'Escape') {
        setIsPureZen(false);
      } else if (e.key.toLowerCase() === 'm') {
        setIsMuted((prev) => {
          const next = !prev;
          sound.setMuted(next);
          return next;
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev;
      sound.setMuted(next);
      return next;
    });
  };

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const handleDownload = () => {
    sound.playChime();
    downloadHeadSnapshot('/assets/head-cutout.png', accessory, 'the-legendary-head.png');
  };

  return (
    <main
      dir={isAr ? 'rtl' : 'ltr'}
      className="relative min-h-screen bg-[#090a0f] text-slate-100 flex flex-col justify-between overflow-x-hidden"
    >
      {/* Background Bouncing Heads Rain */}
      <HeadRain
        active={rainActive}
        count={rainCount}
        headImageSrc="/assets/head-cutout.png"
      />

      {/* Atmospheric Ambient Lighting Gradients */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-amber-500/10 via-amber-900/5 to-transparent rounded-full blur-3xl opacity-80" />
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#06070a] to-transparent" />
      </div>

      {/* Top Header Section */}
      {!isPureZen && (
        <header className="pt-8 pb-4 text-center px-4 max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 bg-clip-text text-transparent">
            {isAr ? 'موقع الرأس' : 'The Head'}
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-zinc-400 font-normal">
            {isAr
              ? 'موقع مخصص بالكامل لرأس هذا الشخص فقط، مع تفاعل 3D وفيزياء حرة وإكسسوارات.'
              : 'A website dedicated exclusively to this person\'s head, with 3D tracking, physics, and custom props.'}
          </p>

          <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-zinc-400">
            <span>{isAr ? '💡 اختصار المسافة (Space): وضع الرأس الخالص' : '💡 Spacebar: Pure Head Mode'}</span>
            <span aria-hidden="true">·</span>
            <span>{isAr ? 'M: كتم الصوت' : 'M: Mute'}</span>
          </div>
        </header>
      )}

      {/* Centerpiece: The Head */}
      <section className="flex-1 flex flex-col items-center justify-center my-auto">
        <MainHead
          mode={mode}
          accessory={accessory}
          cropStyle={cropStyle}
          lang={lang}
          isPureZen={isPureZen}
          onExitPure={() => setIsPureZen(false)}
        />
      </section>

      {/* Interactive Controls & Accessories Panel */}
      {!isPureZen && (
        <section className="pb-10 pt-4 z-20">
          <HeadControls
            mode={mode}
            onModeChange={setMode}
            accessory={accessory}
            onAccessoryChange={setAccessory}
            cropStyle={cropStyle}
            onCropStyleChange={setCropStyle}
            rainActive={rainActive}
            onToggleRain={() => setRainActive((prev) => !prev)}
            rainCount={rainCount}
            onAddRain={() => setRainCount((c) => Math.min(25, c + 3))}
            onClearRain={() => {
              setRainActive(false);
              setRainCount(8);
            }}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
            onEnterPure={() => setIsPureZen(true)}
            onDownload={handleDownload}
            lang={lang}
            onToggleLang={handleToggleLang}
          />
        </section>
      )}

      {/* Quiet Footer */}
      {!isPureZen && (
        <footer className="py-4 text-center text-xs text-zinc-400 border-t border-zinc-900 px-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span>{isAr ? 'رأس حقيقي ١٠٠٪' : '100% Authentic Head'}</span>
            <span aria-hidden="true">·</span>
            <span>{isAr ? 'تتبع فيزيائي تفاعلي' : 'Interactive Physics'}</span>
            <span aria-hidden="true">·</span>
            <span>{isAr ? 'تم بناؤه حسب الطلب' : 'Crafted to Specification'}</span>
          </div>
        </footer>
      )}
    </main>
  );
}
