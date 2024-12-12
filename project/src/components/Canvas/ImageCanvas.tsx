import React, { useRef, useEffect, useState } from 'react';
import { Annotation } from '../../types/types';
import { useCanvasDrawing } from '../../hooks/useCanvasDrawing';

interface Props {
  file: string;
  annotations: Annotation[];
  isDrawing: boolean;
  onAnnotationComplete: (coordinates: Annotation['coordinates']) => void;
}

export const ImageCanvas: React.FC<Props> = ({
  file,
  annotations,
  isDrawing,
  onAnnotationComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image] = useState(new Image());
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const { handleMouseDown, handleMouseMove, handleMouseUp } = useCanvasDrawing({
    canvasRef,
    isDrawing,
    onAnnotationComplete,
    redrawCallback: () => redrawCanvas(),
  });

  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || !isImageLoaded) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear and draw image
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0);

    // Draw annotations
    annotations.forEach(annotation => {
      const { x, y, width, height } = annotation.coordinates;
      ctx.strokeStyle = '#00ff00';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, width, height);
      
      // Draw label
      ctx.fillStyle = '#00ff00';
      ctx.font = '14px Arial';
      ctx.fillText(annotation.label, x, y - 5);
    });
  };

  useEffect(() => {
    image.src = file;
    image.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      // Set canvas size to match image
      canvas.width = image.width;
      canvas.height = image.height;
      
      setIsImageLoaded(true);
      redrawCanvas();
    };
  }, [file]);

  useEffect(() => {
    redrawCanvas();
  }, [annotations, isImageLoaded]);

  return (
    <canvas
      ref={canvasRef}
      className="max-w-full border border-gray-300 rounded-lg"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    />
  );
};