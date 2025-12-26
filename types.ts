
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

export interface User {
  id: string;
  email: string;
  name: string;
  bookmarks: string[]; // IDs of bookmarked articles
  history: string[]; // IDs of viewed articles
  preferences: {
    favoriteServices: string[];
    darkMode: boolean;
  };
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
  isBookmarked: boolean; // Virtual property based on user state
}

export interface AppState {
  articles: Article[];
  selectedDomains: SAADomain[];
  selectedServices: string[];
  selectedSources: string[];
  searchQuery: string;
  showBookmarksOnly: boolean;
  showHistoryOnly: boolean;
  isLoading: boolean;
  isDarkMode: boolean;
  user: User | null;
}

export type Theme = 'light' | 'dark';
