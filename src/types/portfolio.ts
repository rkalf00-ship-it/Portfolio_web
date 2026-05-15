export interface PortfolioItem {
  id: string;
  title: string;
  categoryId: string;
  summary: string;
  intention: string;
  thumbnailUrl: string;
  pdfUrl?: string;
  webglUrl?: string;
  prototypeUrl?: string;
  order: number;
}

export interface Category {
  id: string;
  name: string;
  order: number;
}

export type LaunchKind = 'webgl' | 'prototype';

export interface LaunchTarget {
  title: string;
  url: string;
  kind: LaunchKind;
}
