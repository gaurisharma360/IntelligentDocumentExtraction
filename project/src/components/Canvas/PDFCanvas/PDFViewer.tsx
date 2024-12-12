import React from 'react';
import { Document, Page } from 'react-pdf';

interface Props {
  file: string;
  pageNumber: number;
  scale: number;
  onDocumentLoadSuccess: ({ numPages }: { numPages: number }) => void;
  onPageRenderSuccess: (page: any) => void;
}

export const PDFViewer: React.FC<Props> = ({
  file,
  pageNumber,
  scale,
  onDocumentLoadSuccess,
  onPageRenderSuccess,
}) => {
  return (
    <Document 
      file={file} 
      onLoadSuccess={onDocumentLoadSuccess}
      loading={<div className="text-center p-4">Loading PDF...</div>}
      error={<div className="text-center p-4 text-red-500">Error loading PDF!</div>}
    >
      <Page
        pageNumber={pageNumber}
        scale={scale}
        renderAnnotationLayer={true}
        renderTextLayer={true}
        loading={<div className="text-center p-4">Loading page...</div>}
        onRenderSuccess={onPageRenderSuccess}
      />
    </Document>
  );
};