export interface Coordinates {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Annotation {
  id: string;
  label: string;
  coordinates: Coordinates;
  type: 'pdf' | 'image';
  page?: number; // Page number for PDF annotations
}

export interface FileUpload {
  file: File | null;
  type: 'pdf' | 'image' | null;
  url: string | null;
}