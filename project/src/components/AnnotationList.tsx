import React from 'react';
import { Annotation } from '../types/annotation';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  annotations: Annotation[];
  onDelete: (id: string) => void;
}

export const AnnotationList: React.FC<Props> = ({ annotations, onDelete }) => {
  return (
    <List className="bg-white rounded-lg shadow-md">
      {annotations.map((annotation) => (
        <ListItem key={annotation.id}>
          <ListItemText
            primary={annotation.label}
            secondary={`X: ${Math.round(annotation.coordinates.x)}, 
                       Y: ${Math.round(annotation.coordinates.y)}, 
                       W: ${Math.round(annotation.coordinates.width)}, 
                       H: ${Math.round(annotation.coordinates.height)}`}
          />
          <ListItemSecondaryAction>
            <IconButton edge="end" onClick={() => onDelete(annotation.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};