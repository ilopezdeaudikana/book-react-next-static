export interface InternalNode {
  id: string;
  label: string;
  group: string;
  size: number;
}

export interface InternalEdge {
  source: string;
  target: string;
  weight: number;
}

export interface InternalGraphData {
  nodes: InternalNode[];
  edges: InternalEdge[];
}