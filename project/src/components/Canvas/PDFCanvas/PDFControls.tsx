import React from 'react';
import { IconButton } from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';

interface Props {
  scale: number;
  onScaleChange: (newScale: number) => void;
}

export const PDFControls: React.FC<Props> = ({ scale, onScaleChange }) => {
  return (
    <div className="flex items-center justify-center gap-2 mb-4">
      <IconButton 
        onClick={() => onScaleChange(scale - 0.1)}
        disabled={scale <= 0.5}
      >
        <ZoomOutIcon />
      </IconButton>
      
      <span className="text-sm">
        {Math.round(scale * 100)}%
      </span>
      
      <IconButton
        onClick={() => onScaleChange(scale + 0.1)}
        disabled={scale >= 2}
      >
        <ZoomInIcon />
      </IconButton>
    </div>
  );
};