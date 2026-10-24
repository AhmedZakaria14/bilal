'use client';

import React from 'react';

export type AccessoryType =
  | 'none'
  | 'sunglasses'
  | 'crown'
  | 'party'
  | 'fedora'
  | 'laser'
  | 'headphones'
  | 'mustache'
  | 'halo';

interface Props {
  accessory: AccessoryType;
  isDancing?: boolean;
}

export function HeadAccessories({ accessory, isDancing = false }: Props) {
  if (accessory === 'none') return null;

  return (
    <div className="absolute inset-0 pointer-events-none select-none z-20">
      {/* 1. Sunglasses: aligned with eyes tilted ~15deg */}
      {accessory === 'sunglasses' && (
        <div
          className="absolute"
          style={{
            top: '36%',
            left: '25%',
            width: '52%',
            transform: 'rotate(15deg) translate(-5%, -5%)',
          }}
        >
          <svg viewBox="0 0 200 70" className="w-full drop-shadow-xl filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
            <defs>
              <linearGradient id="glassGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1a1a1a" />
                <stop offset="100%" stopColor="#050505" />
              </linearGradient>
              <linearGradient id="glare" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
                <stop offset="35%" stopColor="rgba(255,255,255,0)" />
              </linearGradient>
            </defs>
            {/* Bridge */}
            <path d="M 85,25 Q 100,20 115,25" stroke="#111" strokeWidth="6" fill="none" strokeLinecap="round" />
            <path d="M 86,26 Q 100,22 114,26" stroke="#444" strokeWidth="2" fill="none" />
            {/* Left Frame & Lens */}
            <rect x="18" y="14" width="70" height="42" rx="10" fill="url(#glassGrad)" stroke="#111" strokeWidth="5" />
            <path d="M 24,18 L 48,18 L 32,50 L 22,50 Z" fill="url(#glare)" />
            {/* Right Frame & Lens */}
            <rect x="112" y="14" width="70" height="42" rx="10" fill="url(#glassGrad)" stroke="#111" strokeWidth="5" />
            <path d="M 118,18 L 142,18 L 126,50 L 116,50 Z" fill="url(#glare)" />
            {/* Temples */}
            <path d="M 18,22 L 2,24" stroke="#111" strokeWidth="6" strokeLinecap="round" />
            <path d="M 182,22 L 198,24" stroke="#111" strokeWidth="6" strokeLinecap="round" />
            {/* Cool Golden Studs */}
            <circle cx="24" cy="20" r="2.5" fill="#f59e0b" />
            <circle cx="176" cy="20" r="2.5" fill="#f59e0b" />
          </svg>
        </div>
      )}

      {/* 2. Royal Crown: sits on top of hair */}
      {accessory === 'crown' && (
        <div
          className={`absolute transition-transform duration-300 ${isDancing ? 'animate-bounce' : ''}`}
          style={{
            top: '-16%',
            left: '22%',
            width: '56%',
            transform: 'rotate(-5deg)',
          }}
        >
          <svg viewBox="0 0 160 110" className="w-full drop-shadow-[0_10px_15px_rgba(234,179,8,0.4)]">
            <defs>
              <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="40%" stopColor="#eab308" />
                <stop offset="100%" stopColor="#ca8a04" />
              </linearGradient>
            </defs>
            {/* Crown Base */}
            <path
              d="M 15,90 L 145,90 L 138,102 L 22,102 Z"
              fill="#a16207"
              stroke="#713f12"
              strokeWidth="2"
            />
            <rect x="16" y="80" width="128" height="14" rx="4" fill="url(#goldGrad)" stroke="#713f12" strokeWidth="2" />
            {/* Crown Spikes */}
            <path
              d="M 16,80 L 10,25 L 45,55 L 80,10 L 115,55 L 150,25 L 144,80 Z"
              fill="url(#goldGrad)"
              stroke="#854d0e"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            {/* Jewels */}
            <circle cx="80" cy="18" r="8" fill="#ef4444" stroke="#7f1d1d" strokeWidth="2" />
            <circle cx="10" cy="30" r="6" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="2" />
            <circle cx="150" cy="30" r="6" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="2" />
            <circle cx="45" cy="87" r="4.5" fill="#10b981" />
            <circle cx="80" cy="87" r="5.5" fill="#ef4444" />
            <circle cx="115" cy="87" r="4.5" fill="#10b981" />
          </svg>
        </div>
      )}

      {/* 3. Party Cone Hat with Confetti */}
      {accessory === 'party' && (
        <div
          className="absolute"
          style={{
            top: '-32%',
            left: '32%',
            width: '46%',
            transform: 'rotate(14deg)',
          }}
        >
          <svg viewBox="0 0 120 180" className="w-full drop-shadow-xl">
            <defs>
              <linearGradient id="partyGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
            {/* Pompom on top */}
            <circle cx="60" cy="15" r="14" fill="#fbbf24" />
            <circle cx="60" cy="15" r="8" fill="#f59e0b" />
            {/* Cone */}
            <polygon points="60,25 5,160 115,160" fill="url(#partyGrad)" stroke="#ffffff" strokeWidth="2" />
            {/* Decorative Stripes */}
            <path d="M 20,120 Q 60,135 100,120" stroke="#fde047" strokeWidth="6" fill="none" />
            <path d="M 35,80 Q 60,95 85,80" stroke="#ffffff" strokeWidth="6" fill="none" />
            {/* Dots */}
            <circle cx="50" cy="60" r="5" fill="#22c55e" />
            <circle cx="70" cy="105" r="6" fill="#f97316" />
            <circle cx="45" cy="142" r="5" fill="#fbbf24" />
            <circle cx="80" cy="142" r="5" fill="#38bdf8" />
          </svg>
        </div>
      )}

      {/* 4. Fedora Hat */}
      {accessory === 'fedora' && (
        <div
          className="absolute"
          style={{
            top: '-20%',
            left: '10%',
            width: '80%',
            transform: 'rotate(-4deg)',
          }}
        >
          <svg viewBox="0 0 200 110" className="w-full drop-shadow-2xl">
            <ellipse cx="100" cy="85" rx="95" ry="18" fill="#18181b" stroke="#09090b" strokeWidth="2" />
            <path d="M 45,80 C 45,35 65,15 100,18 C 135,15 155,35 155,80 Z" fill="#27272a" />
            <path d="M 80,18 C 95,30 105,30 120,18" stroke="#18181b" strokeWidth="6" fill="none" />
            {/* Ribbon */}
            <path d="M 46,74 Q 100,82 154,74 L 155,83 Q 100,91 45,83 Z" fill="#dc2626" />
            <rect x="68" y="72" width="16" height="14" rx="2" fill="#fbbf24" />
          </svg>
        </div>
      )}

      {/* 5. Glowing Laser Eyes */}
      {accessory === 'laser' && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Left Eye Laser */}
          <div
            className="absolute z-30"
            style={{
              top: '44%',
              left: '34%',
              width: '8px',
              height: '8px',
            }}
          >
            <div className="w-4 h-4 rounded-full bg-red-500 shadow-[0_0_20px_#ef4444,0_0_40px_#ef4444] animate-ping" />
            <div className="w-3 h-3 rounded-full bg-white shadow-[0_0_12px_#ffffff] -translate-x-1 -translate-y-4" />
            {/* Extended beam shooting forward */}
            <div
              className="absolute top-0 right-0 h-2 bg-gradient-to-r from-red-500 via-rose-300 to-transparent rounded-full opacity-90 blur-[1px]"
              style={{
                width: '320px',
                transform: 'rotate(25deg)',
                transformOrigin: 'left center',
                boxShadow: '0 0 15px #ef4444, 0 0 30px #dc2626',
              }}
            />
          </div>

          {/* Right Eye Laser */}
          <div
            className="absolute z-30"
            style={{
              top: '52%',
              left: '58%',
              width: '8px',
              height: '8px',
            }}
          >
            <div className="w-4 h-4 rounded-full bg-red-500 shadow-[0_0_20px_#ef4444,0_0_40px_#ef4444] animate-ping" />
            <div className="w-3 h-3 rounded-full bg-white shadow-[0_0_12px_#ffffff] -translate-x-1 -translate-y-4" />
            {/* Extended beam shooting forward */}
            <div
              className="absolute top-0 right-0 h-2 bg-gradient-to-r from-red-500 via-rose-300 to-transparent rounded-full opacity-90 blur-[1px]"
              style={{
                width: '320px',
                transform: 'rotate(25deg)',
                transformOrigin: 'left center',
                boxShadow: '0 0 15px #ef4444, 0 0 30px #dc2626',
              }}
            />
          </div>
        </div>
      )}

      {/* 6. Studio Headphones */}
      {accessory === 'headphones' && (
        <div
          className="absolute"
          style={{
            top: '-2%',
            left: '-2%',
            width: '104%',
            height: '80%',
            transform: 'rotate(-4deg)',
          }}
        >
          <svg viewBox="0 0 240 180" className="w-full h-full drop-shadow-xl">
            {/* Headband */}
            <path
              d="M 35,110 C 35,30 205,30 205,110"
              stroke="#27272a"
              strokeWidth="14"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 50,85 C 65,40 175,40 190,85"
              stroke="#3f3f46"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
            />
            {/* Left Ear Cushion */}
            <ellipse cx="32" cy="115" rx="18" ry="32" fill="#09090b" stroke="#e11d48" strokeWidth="4" />
            <circle cx="32" cy="115" r="8" fill="#e11d48" />
            {/* Right Ear Cushion */}
            <ellipse cx="208" cy="115" rx="18" ry="32" fill="#09090b" stroke="#e11d48" strokeWidth="4" />
            <circle cx="208" cy="115" r="8" fill="#e11d48" />
          </svg>
        </div>
      )}

      {/* 7. Aristocrat Mustache */}
      {accessory === 'mustache' && (
        <div
          className="absolute"
          style={{
            top: '64%',
            left: '30%',
            width: '42%',
            transform: 'rotate(12deg)',
          }}
        >
          <svg viewBox="0 0 140 50" className="w-full drop-shadow-md">
            <path
              d="M 70,25 C 55,10 25,12 10,24 C 2,29 0,38 8,36 C 22,32 45,28 65,34 C 68,35 70,36 72,34 C 92,28 115,32 129,36 C 137,38 135,29 127,24 C 112,12 82,10 70,25 Z"
              fill="#18181b"
              stroke="#09090b"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      )}

      {/* 8. Angel / Saint Golden Halo */}
      {accessory === 'halo' && (
        <div
          className="absolute animate-pulse"
          style={{
            top: '-24%',
            left: '20%',
            width: '60%',
            transform: 'rotate(-6deg)',
          }}
        >
          <svg viewBox="0 0 160 60" className="w-full drop-shadow-[0_0_18px_rgba(251,191,36,0.9)]">
            <ellipse
              cx="80"
              cy="30"
              rx="70"
              ry="16"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="7"
            />
            <ellipse
              cx="80"
              cy="30"
              rx="68"
              ry="14"
              fill="none"
              stroke="#fef08a"
              strokeWidth="3"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
