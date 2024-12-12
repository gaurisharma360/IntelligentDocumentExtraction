import React from 'react';
import { Button } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import ClearIcon from '@mui/icons-material/Clear';

interface Props {
  onFileSelect: (file: File) => void;
  onFileRemove: () => void;
  hasFile: boolean;
}

export const FileUpload: React.FC<Props> = ({ onFileSelect, onFileRemove, hasFile }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const isValidType = file.type.includes('pdf') || file.type.includes('image');
      if (isValidType) {
        onFileSelect(file);
      } else {
        alert('Please select a PDF or image file');
      }
    }
  };

  return (
    <div className="mb-4 flex items-center gap-2">
      <input
        type="file"
        accept="application/pdf,image/*"
        onChange={handleFileChange}
        className="hidden"
        id="file-upload"
      />
      <label htmlFor="file-upload">
        <Button
          variant="contained"
          component="span"
          startIcon={<UploadIcon />}
        >
          Upload PDF or Image
        </Button>
      </label>
      {hasFile && (
        <Button
          variant="outlined"
          color="error"
          onClick={onFileRemove}
          startIcon={<ClearIcon />}
        >
          Remove File
        </Button>
      )}
    </div>
  );
};