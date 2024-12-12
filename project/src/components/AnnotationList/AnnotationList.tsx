import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Annotation } from '../../types/types';

interface Props {
  annotations: Annotation[];
  onDelete: (id: string) => void;
}

export const AnnotationList: React.FC<Props> = ({ annotations, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold mb-4">Annotations</h2>
      <List>
        {annotations.map((annotation) => (
          <ListItem key={annotation.id} className="border-b">
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
    </div>
  );
};