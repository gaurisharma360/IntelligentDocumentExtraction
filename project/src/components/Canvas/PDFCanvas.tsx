import React, { useRef, useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { AnnotationLayer } from './AnnotationLayer';
import { Annotation } from '../../types/types';
import { useCanvasDrawing } from '../../hooks/useCanvasDrawing';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface Props {
  file: string;
  annotations: Annotation[];
  isDrawing: boolean;
  onAnnotationComplete: (coordinates: Annotation['coordinates']) => void;
}

export const PDFCanvas: React.FC<Props> = ({
  file,
  annotations,
  isDrawing,
  onAnnotationComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [numPages, setNumPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);

  const { handleMouseDown, handleMouseMove, handleMouseUp } = useCanvasDrawing({
    canvasRef,
    isDrawing,
    onAnnotationComplete,
    redrawCallback: () => {
      // Logic for redrawing annotations, if needed
    },
  });

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const pageElement = document.querySelector('.react-pdf__Page');
    if (canvas && pageElement) {
      const { width, height } = pageElement.getBoundingClientRect();
      canvas.width = width * scale;
      canvas.height = height * scale;
    }
  }, [scale, pageNumber]);

  return (
    <div className="relative">
      <Document 
        file={file} 
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={(error) => console.error("PDF Load Error:", error)}
      >
        <Page 
          pageNumber={pageNumber} 
          scale={scale}
          renderAnnotationLayer={true}
          renderTextLayer={true}
          onRenderError={(error) => console.error("Page Render Error:", error)}
        />
      </Document>
      <AnnotationLayer
        ref={canvasRef}
        annotations={annotations}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className="absolute top-0 left-0 pointer-events-auto"
      />
      <div>
        <button onClick={() => setPageNumber(pageNumber - 1)} disabled={pageNumber <= 1}>Previous</button>
        <button onClick={() => setPageNumber(pageNumber + 1)} disabled={pageNumber >= numPages}>Next</button>
        <button onClick={() => setScale(scale * 1.1)}>Zoom In</button>
        <button onClick={() => setScale(scale * 0.9)}>Zoom Out</button>
      </div>
    </div>
  );
};
