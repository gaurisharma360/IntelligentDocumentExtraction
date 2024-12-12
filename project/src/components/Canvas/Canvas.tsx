import React from 'react';
import { PDFCanvas } from './PDFCanvas';
import { ImageCanvas } from './ImageCanvas';
import { Annotation } from '../../types/types';

interface Props {
  file: string;
  annotations: Annotation[];
  isDrawing: boolean;
  onAnnotationComplete: (coordinates: Annotation['coordinates']) => void;
}

export const Canvas: React.FC<Props> = (props) => {
  const isPdf = props.file.toLowerCase().includes('.pdf');

  return (
    <div className="border border-gray-300 rounded-lg overflow-auto">
      {isPdf ? (
        <PDFCanvas {...props} />
      ) : (
        <ImageCanvas {...props} />
      )}
    </div>
  );
};