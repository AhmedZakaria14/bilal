'use client';

import React from 'react';
import {
  Volume2,
  VolumeX,
  Maximize2,
  Download,
  CloudRain,
  Sparkles,
  Music,
  Move,
  Glasses,
  Crown,
  PartyPopper,
  Zap,
  Headphones,
  Circle,
  Crop,
  Languages,
} from 'lucide-react';
import { HeadMode, CropStyle } from './MainHead';
import { AccessoryType } from './HeadAccessories';
import { sound } from '@/lib/audio';

interface Props {
  mode: HeadMode;
  onModeChange: (m: HeadMode) => void;
  accessory: AccessoryType;
  onAccessoryChange: (a: AccessoryType) => void;
  cropStyle: CropStyle;
  onCropStyleChange: (c: CropStyle) => void;
  rainActive: boolean;
  onToggleRain: () => void;
  rainCount: number;
  onAddRain: () => void;
  onClearRain: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onEnterPure: () => void;
  onDownload: () => void;
  lang: 'ar' | 'en';
  onToggleLang: () => void;
}

export function HeadControls({
  mode,
  onModeChange,
  accessory,
  onAccessoryChange,
  cropStyle,
  onCropStyleChange,
  rainActive,
  onToggleRain,
  rainCount,
  onAddRain,
  onClearRain,
  isMuted,
  onToggleMute,
  onEnterPure,
  onDownload,
  lang,
  onToggleLang,
}: Props) {
  const isAr = lang === 'ar';

  const accessoriesList: Array<{ id: AccessoryType; labelAr: string; labelEn: string; icon: React.ReactNode }> = [
    { id: 'none', labelAr: 'بدون إكسسوار', labelEn: 'None', icon: <Circle className="w-4 h-4" /> },
    { id: 'sunglasses', labelAr: 'نظارة شمس', labelEn: 'Shades', icon: <Glasses className="w-4 h-4" /> },
    { id: 'crown', labelAr: 'التاج الملكي', labelEn: 'Crown', icon: <Crown className="w-4 h-4" /> },
    { id: 'party', labelAr: 'طاقية حفلة', labelEn: 'Party Hat', icon: <PartyPopper className="w-4 h-4" /> },
    { id: 'laser', labelAr: 'أشعة ليزر', labelEn: 'Laser Eyes', icon: <Zap className="w-4 h-4" /> },
    { id: 'headphones', labelAr: 'سماعات DJ', labelEn: 'Headphones', icon: <Headphones className="w-4 h-4" /> },
    { id: 'mustache', labelAr: 'شنب أرستقراطي', labelEn: 'Mustache', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'halo', labelAr: 'هالة ملائكية', labelEn: 'Halo', icon: <Sparkles className="w-4 h-4" /> },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 space-y-6">
      {/* 1. Header Bar: Actions (Sound, Pure Zen, Language, Download) */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-zinc-900/70 border border-zinc-800/80 rounded-2xl p-3 shadow-lg backdrop-blur-sm">
        {/* Left: Quick toggles */}
        <div className="flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            onClick={() => {
              onToggleMute();
              if (isMuted) sound.playBoing();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              !isMuted
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200'
            }`}
            title={isAr ? 'كتم أو تفعيل الصوت' : 'Mute or Unmute Audio'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span>{isMuted ? (isAr ? 'الصوت مغلق' : 'Muted') : (isAr ? 'الصوت يعمل' : 'Sound On')}</span>
          </button>

          {/* Language Toggle */}
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors cursor-pointer"
          >
            <Languages className="w-4 h-4" />
            <span>{isAr ? 'English' : 'العربية'}</span>
          </button>
        </div>

        {/* Right: Primary interactive triggers */}
        <div className="flex items-center gap-2">
          {/* Download Avatar */}
          <button
            onClick={onDownload}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-white transition-colors cursor-pointer shadow-sm"
          >
            <Download className="w-4 h-4 text-amber-400" />
            <span>{isAr ? 'تحميل كملصق' : 'Save Sticker'}</span>
          </button>

          {/* Pure Head Zen Mode */}
          <button
            onClick={() => {
              sound.playPop();
              onEnterPure();
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-zinc-950 transition-colors cursor-pointer shadow-md"
          >
            <Maximize2 className="w-4 h-4" />
            <span>{isAr ? 'وضع الرأس فقط بالكامل' : 'Pure Head Mode'}</span>
          </button>
        </div>
      </div>

      {/* 2. Interactive Head Mode Selector */}
      <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4 shadow-lg">
        <div className="text-xs font-medium text-zinc-400 mb-2.5">
          {isAr ? 'اختر أسلوب التفاعل مع الرأس:' : 'Select Interaction Mode:'}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {/* Mode 1: 3D Tracking */}
          <button
            onClick={() => {
              sound.playPop();
              onModeChange('track');
            }}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
              mode === 'track'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-inner'
                : 'bg-zinc-800/60 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{isAr ? 'تتبع 3D للمؤشر' : '3D Cursor Track'}</span>
          </button>

          {/* Mode 2: Drag & Fling Physics */}
          <button
            onClick={() => {
              sound.playPop();
              onModeChange('physics');
            }}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
              mode === 'physics'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-inner'
                : 'bg-zinc-800/60 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
            }`}
          >
            <Move className="w-4 h-4 text-emerald-400" />
            <span>{isAr ? 'رمي وفيزياء حرة' : 'Fling & Drag Physics'}</span>
          </button>

          {/* Mode 3: Dance Groove */}
          <button
            onClick={() => {
              sound.playChime();
              onModeChange('dance');
            }}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
              mode === 'dance'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-inner'
                : 'bg-zinc-800/60 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
            }`}
          >
            <Music className="w-4 h-4 text-rose-400" />
            <span>{isAr ? 'إيقاع ورقص' : 'Dance Groove'}</span>
          </button>
        </div>
      </div>

      {/* 3. Accessories Palette */}
      <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-zinc-400">
            {isAr ? 'إكسسوارات الرأس المتنوعة:' : 'Head Accessories & Props:'}
          </span>
          {accessory !== 'none' && (
            <button
              onClick={() => {
                sound.playPop();
                onAccessoryChange('none');
              }}
              className="text-xs text-amber-400 hover:underline cursor-pointer"
            >
              {isAr ? 'إزالة الإكسسوار' : 'Clear Prop'}
            </button>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {accessoriesList.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'laser') sound.playLaser();
                else if (item.id === 'crown') sound.playChime();
                else sound.playPop();
                onAccessoryChange(item.id);
              }}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                accessory === item.id
                  ? 'bg-amber-400 text-zinc-950 font-semibold shadow-md'
                  : 'bg-zinc-800/60 text-zinc-300 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="truncate">{isAr ? item.labelAr : item.labelEn}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 4. Display Style & Head Rain controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Crop / Frame Style */}
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4 shadow-lg">
          <div className="text-xs font-medium text-zinc-400 mb-2.5">
            {isAr ? 'نمط عرض الرأس:' : 'Head Frame Style:'}
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => {
                sound.playPop();
                onCropStyleChange('cutout');
              }}
              className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                cropStyle === 'cutout'
                  ? 'bg-zinc-100 text-zinc-900 shadow-sm'
                  : 'bg-zinc-800/60 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
              }`}
            >
              <Crop className="w-3.5 h-3.5" />
              <span>{isAr ? 'قصاصة نقية' : 'Cutout'}</span>
            </button>
            <button
              onClick={() => {
                sound.playPop();
                onCropStyleChange('glow');
              }}
              className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                cropStyle === 'glow'
                  ? 'bg-zinc-100 text-zinc-900 shadow-sm'
                  : 'bg-zinc-800/60 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isAr ? 'هالة دائرية' : 'Orb Glow'}</span>
            </button>
            <button
              onClick={() => {
                sound.playPop();
                onCropStyleChange('portrait');
              }}
              className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                cropStyle === 'portrait'
                  ? 'bg-zinc-100 text-zinc-900 shadow-sm'
                  : 'bg-zinc-800/60 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
              }`}
            >
              <Circle className="w-3.5 h-3.5" />
              <span>{isAr ? 'مؤطر' : 'Framed'}</span>
            </button>
          </div>
        </div>

        {/* Head Rain (Bouncing mini-heads) */}
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4 shadow-lg">
          <div className="text-xs font-medium text-zinc-400 mb-2.5">
            {isAr ? 'مطر الرؤوس النطاطة (فيزياء):' : 'Bouncy Heads Rain:'}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.playBoing();
                onToggleRain();
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                rainActive
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/50'
                  : 'bg-zinc-800/60 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
              }`}
            >
              <CloudRain className="w-4 h-4 text-sky-400" />
              <span>
                {rainActive
                  ? isAr
                    ? `مطر الرؤوس (${rainCount})`
                    : `Rain Active (${rainCount})`
                  : isAr
                  ? 'تفعيل مطر الرؤوس'
                  : 'Enable Rain'}
              </span>
            </button>

            {rainActive && (
              <>
                <button
                  onClick={() => {
                    sound.playPop();
                    onAddRain();
                  }}
                  className="px-3 py-2 rounded-xl text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors cursor-pointer"
                  title={isAr ? 'إضافة رؤوس أخرى' : 'Add more heads'}
                >
                  +
                </button>
                <button
                  onClick={() => {
                    sound.playThud();
                    onClearRain();
                  }}
                  className="px-3 py-2 rounded-xl text-xs font-medium bg-zinc-800 hover:bg-rose-900/40 text-rose-300 transition-colors cursor-pointer"
                  title={isAr ? 'إيقاف المطر' : 'Clear rain'}
                >
                  ✕
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
