// Utility to composite head and accessories onto canvas and download high-res PNG

import { AccessoryType } from '@/components/HeadAccessories';

export async function downloadHeadSnapshot(
  headSrc: string,
  accessory: AccessoryType,
  fileName = 'the-head.png'
) {
  if (typeof window === 'undefined') return;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.width = 600;
  canvas.height = 680;

  // Load head image
  const img = new (window.Image as typeof Image)();
  img.crossOrigin = 'anonymous';

  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = headSrc;
  });

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw head centered
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  // If accessory, draw on canvas
  if (accessory === 'sunglasses') {
    ctx.save();
    ctx.translate(canvas.width * 0.51, canvas.height * 0.45);
    ctx.rotate((15 * Math.PI) / 180);
    // Draw sunglasses
    ctx.fillStyle = '#0a0a0a';
    ctx.strokeStyle = '#18181b';
    ctx.lineWidth = 8;
    // Left lens
    ctx.beginPath();
    ctx.roundRect(-140, -35, 120, 70, 16);
    ctx.fill();
    ctx.stroke();
    // Right lens
    ctx.beginPath();
    ctx.roundRect(20, -35, 120, 70, 16);
    ctx.fill();
    ctx.stroke();
    // Bridge
    ctx.beginPath();
    ctx.moveTo(-20, -15);
    ctx.quadraticCurveTo(0, -25, 20, -15);
    ctx.lineWidth = 10;
    ctx.stroke();
    // Glare
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.beginPath();
    ctx.moveTo(-125, -25);
    ctx.lineTo(-85, -25);
    ctx.lineTo(-110, 25);
    ctx.lineTo(-135, 25);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(35, -25);
    ctx.lineTo(75, -25);
    ctx.lineTo(50, 25);
    ctx.lineTo(25, 25);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  } else if (accessory === 'crown') {
    ctx.save();
    ctx.translate(canvas.width * 0.5, canvas.height * 0.05);
    ctx.rotate((-5 * Math.PI) / 180);
    // Crown base
    ctx.fillStyle = '#eab308';
    ctx.strokeStyle = '#854d0e';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(-140, 60);
    ctx.lineTo(-160, -40);
    ctx.lineTo(-70, 10);
    ctx.lineTo(0, -70);
    ctx.lineTo(70, 10);
    ctx.lineTo(160, -40);
    ctx.lineTo(140, 60);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    // Jewels
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(0, -60, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#3b82f6';
    ctx.beginPath();
    ctx.arc(-160, -30, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(160, -30, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // Trigger download
  const dataUrl = canvas.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
