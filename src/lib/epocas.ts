// Épocas en orden cronológico. El "id" es lo que se escribe en el frontmatter (epoca: republica).
export const EPOCAS = [
  { id: 'preinca', nombre: 'Época preínca' },
  { id: 'inca', nombre: 'Imperio inca' },
  { id: 'conquista', nombre: 'Conquista' },
  { id: 'virreinato', nombre: 'Virreinato' },
  { id: 'independencia', nombre: 'Independencia' },
  { id: 'republica', nombre: 'República' },
  { id: 'contemporanea', nombre: 'Perú contemporáneo' },
] as const;

export type EpocaId = (typeof EPOCAS)[number]['id'];
export const EPOCA_IDS = EPOCAS.map((e) => e.id) as [EpocaId, ...EpocaId[]];

export const nombreEpoca = (id: string) => EPOCAS.find((e) => e.id === id)?.nombre ?? id;
export const ordenEpoca = (id: string) => EPOCAS.findIndex((e) => e.id === id);
