import React from 'react';
import { Button, ButtonGroup } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import ListIcon from '@mui/icons-material/List';

interface Props {
  isDrawing: boolean;
  showList: boolean;
  onDrawingToggle: () => void;
  onListToggle: () => void;
}

export const ToolBar: React.FC<Props> = ({
  isDrawing,
  showList,
  onDrawingToggle,
  onListToggle,
}) => {
  return (
    <ButtonGroup variant="contained" className="mb-4">
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
    </ButtonGroup>
  );
};