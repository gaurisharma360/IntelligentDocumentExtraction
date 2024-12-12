import React, { forwardRef, useEffect } from 'react';
import { Annotation } from '../../types/types';
import { drawAnnotations } from '../../utils/canvasUtils';

interface Props {
  annotations: Annotation[];
  className?: string;
  onMouseDown: (e: React.MouseEvent) => void;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseUp: (e: React.MouseEvent) => void;
}

export const AnnotationLayer = forwardRef<HTMLCanvasElement, Props>(({
  annotations,
  className,
  onMouseDown,
  onMouseMove,
  onMouseUp,
}, ref) => {
  useEffect(() => {
    const canvas = ref as React.RefObject<HTMLCanvasElement>;
    if (!canvas.current) return;

    const ctx = canvas.current.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
    drawAnnotations(ctx, annotations);
  }, [annotations, ref]);

  return (
    <canvas
      ref={ref}
      className={className}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    />
  );
});