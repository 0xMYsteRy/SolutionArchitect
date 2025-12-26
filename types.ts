
export enum SAADomain {
  SECURE = 'Secure Architectures',
  RESILIENT = 'Resilient Architectures',
  HIGH_PERFORMING = 'High-Performing Architectures',
  COST_OPTIMIZED = 'Cost-Optimized Architectures',
  OPERATIONS = 'Deployment & Operations',
}

export enum RelevanceLevel {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
}

export interface Article {
  id: string;
  title: string;
  link: string;
  summary: string;
  pubDate: string;
  source: string;
  domains: SAADomain[];
  services: string[];
  relevance: RelevanceLevel;
  examNote?: string;
  isBookmarked: boolean;
}

export interface AppState {
  articles: Article[];
  selectedDomains: SAADomain[];
  selectedServices: string[];
  selectedSources: string[];
  searchQuery: string;
  showBookmarksOnly: boolean;
  isLoading: boolean;
  isDarkMode: boolean;
}

export type Theme = 'light' | 'dark';
