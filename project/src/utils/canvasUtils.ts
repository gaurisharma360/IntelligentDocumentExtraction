export const drawImage = (
  ctx: CanvasRenderingContext2D,
  src: string,
  onLoad: () => void
) => {
  const img = new Image();
  img.src = src;
  img.onload = () => {
    const canvas = ctx.canvas;
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    onLoad();
  };
};
import { Annotation } from '../types/annotation';

export const drawAnnotations = (
  ctx: CanvasRenderingContext2D,
  annotations: Annotation[]
) => {
  annotations.forEach(annotation => {
    const { x, y, width, height } = annotation.coordinates;
    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, width, height);
    ctx.fillStyle = '#00ff00';
    ctx.font = '14px Arial';
    ctx.fillText(annotation.label, x, y - 5);
  });
};