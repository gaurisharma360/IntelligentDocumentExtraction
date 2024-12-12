import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { Annotation, FileUpload } from './types/types';
import { Canvas } from './components/Canvas/Canvas';
import { AnnotationList } from './components/AnnotationList/AnnotationList';
import { Toolbar } from './components/Toolbar/Toolbar';
import { FileUpload as FileUploader } from './components/FileUpload/FileUpload';
import { downloadAnnotations } from './utils/fileUtils';

function App() {
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showList, setShowList] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [tempCoordinates, setTempCoordinates] = useState<Annotation['coordinates'] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [fileUpload, setFileUpload] = useState<FileUpload>({
    file: null,
    type: null,
    url: null,
  });

  const handleFileSelect = (file: File) => {
    const type = file.type.includes('pdf') ? 'pdf' : 'image';
    const url = URL.createObjectURL(file);
    setFileUpload({ file, type, url });
    setCurrentPage(1);
  };

  const handleFileRemove = () => {
    if (fileUpload.url) {
      URL.revokeObjectURL(fileUpload.url);
    }
    setFileUpload({ file: null, type: null, url: null });
    setAnnotations([]);
    setCurrentPage(1);
  };

  const handleAnnotationComplete = (coordinates: Annotation['coordinates']) => {
    setTempCoordinates(coordinates);
    setDialogOpen(true);
  };

  const handleLabelSubmit = () => {
    if (newLabel && tempCoordinates) {
      const newAnnotation: Annotation = {
        id: uuidv4(),
        label: newLabel,
        coordinates: tempCoordinates,
        type: fileUpload.type as 'pdf' | 'image',
        page: fileUpload.type === 'pdf' ? currentPage : undefined,
      };

      setAnnotations([...annotations, newAnnotation]);
      setNewLabel('');
      setTempCoordinates(null);
      setDialogOpen(false);
    }
  };

  const handleDelete = (id: string) => {
    setAnnotations(annotations.filter(ann => ann.id !== id));
  };

  const handleSave = () => {
    downloadAnnotations(annotations);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Document Annotation Tool</h1>
        
        <FileUploader 
          onFileSelect={handleFileSelect} 
          onFileRemove={handleFileRemove}
          hasFile={!!fileUpload.file}
        />
        
        <Toolbar
          isDrawing={isDrawing}
          showList={showList}
          onDrawingToggle={() => setIsDrawing(!isDrawing)}
          onListToggle={() => setShowList(!showList)}
          onSave={handleSave}
        />

        <div className="flex gap-4">
          <div className="flex-1">
            {fileUpload.url && (
              <Canvas
                file={fileUpload.url}
                annotations={annotations}
                isDrawing={isDrawing}
                onAnnotationComplete={handleAnnotationComplete}
              />
            )}
          </div>
          
          {showList && (
            <div className="w-80">
              <AnnotationList
                annotations={annotations}
                onDelete={handleDelete}
              />
            </div>
          )}
        </div>

        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          <DialogTitle>Enter Annotation Label</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Label"
              fullWidth
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleLabelSubmit} variant="contained">
              Add Annotation
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default App;