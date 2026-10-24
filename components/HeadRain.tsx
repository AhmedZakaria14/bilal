'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { sound } from '@/lib/audio';

interface BouncyHead {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  vRot: number;
  accessoryIndex: number;
}

interface Props {
  active: boolean;
  count: number;
  headImageSrc: string;
}

export function HeadRain({ active, count, headImageSrc }: Props) {
  const [heads, setHeads] = useState<BouncyHead[]>([]);
  const requestRef = useRef<number | null>(null);
  const headsRef = useRef<BouncyHead[]>([]);

  useEffect(() => {
    if (!active || count === 0) {
      headsRef.current = [];
      const frame = requestAnimationFrame(() => setHeads([]));
      return () => cancelAnimationFrame(frame);
    }

    const width = typeof window !== 'undefined' ? window.innerWidth : 800;
    const height = typeof window !== 'undefined' ? window.innerHeight : 600;

    // Create heads
    const initial: BouncyHead[] = Array.from({ length: count }).map((_, i) => ({
      id: Date.now() + i + Math.random(),
      x: Math.random() * (width - 100) + 20,
      y: Math.random() * (height * 0.4) + 20,
      vx: (Math.random() - 0.5) * 8 + (Math.random() > 0.5 ? 2 : -2),
      vy: Math.random() * 3 + 1,
      size: Math.floor(Math.random() * 35) + 65, // 65px - 100px
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 6,
      accessoryIndex: Math.floor(Math.random() * 4),
    }));

    headsRef.current = initial;

    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      const w = window.innerWidth;
      const h = window.innerHeight;
      const gravity = 280; // px/s^2

      const updated = headsRef.current.map((head) => {
        let { x, y, vx, vy, rotation, vRot, size } = head;

        vy += gravity * dt;
        x += vx * (dt * 60);
        y += vy * (dt * 60);
        rotation += vRot * (dt * 60);

        // Bounce horizontal walls
        if (x <= 10) {
          x = 10;
          vx = -vx * 0.8;
          vRot = -vRot * 0.8;
          sound.playThud(0.3);
        } else if (x + size >= w - 10) {
          x = w - size - 10;
          vx = -vx * 0.8;
          vRot = -vRot * 0.8;
          sound.playThud(0.3);
        }

        // Bounce bottom floor
        if (y + size >= h - 15) {
          y = h - size - 15;
          vy = -vy * 0.75;
          vx *= 0.98; // floor friction
          if (Math.abs(vy) > 1.5) {
            sound.playThud(0.5);
          }
        }

        // Bounce ceiling if thrown high
        if (y <= 5) {
          y = 5;
          vy = Math.abs(vy) * 0.8;
        }

        return { ...head, x, y, vx, vy, rotation, vRot };
      });

      headsRef.current = updated;
      setHeads([...updated]);

      requestRef.current = requestAnimationFrame(animate);
    };

    // Initialize in animation frame
    requestRef.current = requestAnimationFrame((t) => {
      setHeads(initial);
      animate(t);
    });

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [active, count, headImageSrc]);

  if (!active || heads.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {heads.map((h) => (
        <div
          key={h.id}
          className="absolute will-change-transform filter drop-shadow-md cursor-grab active:cursor-grabbing pointer-events-auto"
          style={{
            transform: `translate3d(${h.x}px, ${h.y}px, 0) rotate(${h.rotation}deg)`,
            width: `${h.size}px`,
            height: `${h.size * 1.13}px`,
          }}
          onClick={() => {
            sound.playBoing();
            // Give it an upward kick
            const target = headsRef.current.find((item) => item.id === h.id);
            if (target) {
              target.vy = -12 - Math.random() * 8;
              target.vx = (Math.random() - 0.5) * 16;
              target.vRot = (Math.random() - 0.5) * 15;
            }
          }}
        >
          <Image
            src={headImageSrc}
            alt="Mini Head"
            width={h.size}
            height={Math.round(h.size * 1.13)}
            className="w-full h-full object-contain select-none"
            priority={false}
          />
        </div>
      ))}
    </div>
  );
}
