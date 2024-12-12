import React from 'react';
import { Button, ButtonGroup } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import ListIcon from '@mui/icons-material/List';
import SaveIcon from '@mui/icons-material/Save';

interface Props {
  isDrawing: boolean;
  showList: boolean;
  onDrawingToggle: () => void;
  onListToggle: () => void;
  onSave: () => void;
}

export const Toolbar: React.FC<Props> = ({
  isDrawing,
  showList,
  onDrawingToggle,
  onListToggle,
  onSave,
}) => {
  return (
    <ButtonGroup variant="contained" className="mb-4 gap-2">
      <Button
        onClick={onDrawingToggle}
        color={isDrawing ? "primary" : "inherit"}
        startIcon={<CreateIcon />}
      >
        Draw Annotation
      </Button>
      <Button
        onClick={onListToggle}
        color={showList ? "primary" : "inherit"}
        startIcon={<ListIcon />}
      >
        Show List
      </Button>
      <Button
        onClick={onSave}
        startIcon={<SaveIcon />}
      >
        Save Annotations
      </Button>
    </ButtonGroup>
  );
};