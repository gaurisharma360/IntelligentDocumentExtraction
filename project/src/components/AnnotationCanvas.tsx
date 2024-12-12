import React, { useRef, useState, useEffect } from 'react';
import { Annotation } from '../types/annotation';
import { drawAnnotation } from '../utils/canvas';

interface Props {
  annotations: Annotation[];
  isDrawing: boolean;
  onAnnotationComplete: (coordinates: Annotation['coordinates']) => void;
}

export const AnnotationCanvas: React.FC<Props> = ({
  annotations,
  isDrawing,
  onAnnotationComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw existing annotations
    annotations.forEach((annotation) => {
      drawAnnotation(ctx, annotation);
    });

    // Draw current rectangle if drawing
    if (drawing) {
      const width = currentPos.x - startPos.x;
      const height = currentPos.y - startPos.y;
      ctx.strokeStyle = '#00ff00';
      ctx.strokeRect(startPos.x, startPos.y, width, height);
    }
  }, [annotations, drawing, startPos, currentPos]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setDrawing(true);
    setStartPos({ x, y });
    setCurrentPos({ x, y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!drawing || !isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCurrentPos({ x, y });
  };

  const handleMouseUp = () => {
    if (!drawing || !isDrawing) return;

    const width = currentPos.x - startPos.x;
    const height = currentPos.y - startPos.y;

    onAnnotationComplete({
      x: startPos.x,
      y: startPos.y,
      width,
      height,
    });

    setDrawing(false);
  };

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      className="border border-gray-300"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    />
  );
};