import { Annotation } from '../types/annotation';
export const drawAnnotation = (
  ctx: CanvasRenderingContext2D,
  annotation: Annotation
) => {
  const { x, y, width, height } = annotation.coordinates;
  
  ctx.strokeStyle = '#00ff00';
  ctx.strokeRect(x, y, width, height);
  
  // Draw label above the rectangle
  ctx.fillStyle = '#00ff00';
  ctx.font = '12px Arial';
  ctx.fillText(annotation.label, x, y - 5);
};