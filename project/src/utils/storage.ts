import { Annotation } from '../types/annotation';

export const saveAnnotations = (annotations: Annotation[]) => {
  localStorage.setItem('annotations', JSON.stringify(annotations));
};

export const loadAnnotations = (): Annotation[] => {
  const saved = localStorage.getItem('annotations');
  return saved ? JSON.parse(saved) : [];
};