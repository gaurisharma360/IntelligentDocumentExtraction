import React from 'react';
import { Button, IconButton } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

interface Props {
  pageNumber: number;
  numPages: number;
  onPageChange: (newPage: number) => void;
}

export const PDFPageNavigation: React.FC<Props> = ({
  pageNumber,
  numPages,
  onPageChange,
}) => {
  return (
    <div className="flex items-center justify-center gap-4 my-4">
      <IconButton 
        onClick={() => onPageChange(pageNumber - 1)}
        disabled={pageNumber <= 1}
      >
        <NavigateBeforeIcon />
      </IconButton>
      
      <span className="text-sm">
        Page {pageNumber} of {numPages}
      </span>
      
      <IconButton
        onClick={() => onPageChange(pageNumber + 1)}
        disabled={pageNumber >= numPages}
      >
        <NavigateNextIcon />
      </IconButton>
    </div>
  );
};