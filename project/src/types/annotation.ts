export interface Annotation {
  id: string;
  label: string;
  coordinates: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  type: 'pdf' | 'image';
}