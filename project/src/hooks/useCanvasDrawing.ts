import { useState, useCallback } from 'react';
import { Coordinates } from '../types/types';

interface UseCanvasDrawingProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  isDrawing: boolean;
  onAnnotationComplete: (coordinates: Coordinates) => void;
  redrawCallback: () => void;
}

export const useCanvasDrawing = ({
  canvasRef,
  isDrawing: isDrawingEnabled,
  onAnnotationComplete,
  redrawCallback,
}: UseCanvasDrawingProps) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const getCanvasCoordinates = useCallback((e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!isDrawingEnabled) return;
    
    const coords = getCanvasCoordinates(e);
    if (!coords) return;

    setIsDrawing(true);
    setStartPos(coords);
  }, [isDrawingEnabled, getCanvasCoordinates]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDrawing || !isDrawingEnabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const coords = getCanvasCoordinates(e);
    if (!coords) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Redraw the base content
    redrawCallback();
    
    // Draw the current selection rectangle
    const width = coords.x - startPos.x;
    const height = coords.y - startPos.y;
    
    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 2;
    ctx.strokeRect(startPos.x, startPos.y, width, height);
  }, [isDrawing, isDrawingEnabled, startPos, redrawCallback]);

  const handleMouseUp = useCallback((e: React.MouseEvent) => {
    if (!isDrawing || !isDrawingEnabled) return;

    const coords = getCanvasCoordinates(e);
    if (!coords) return;

    const width = coords.x - startPos.x;
    const height = coords.y - startPos.y;

    if (Math.abs(width) > 5 && Math.abs(height) > 5) {
      onAnnotationComplete({
        x: Math.min(startPos.x, coords.x),
        y: Math.min(startPos.y, coords.y),
        width: Math.abs(width),
        height: Math.abs(height),
      });
    }

    setIsDrawing(false);
    redrawCallback();
  }, [isDrawing, isDrawingEnabled, startPos, onAnnotationComplete, redrawCallback]);

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
};