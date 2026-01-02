// app/lib/types/index.ts

export type AppMode = 'doc_only' | 'ai_enhanced';
export type View = 'chat' | 'admin';

export type Message = {
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    citations?: string[];
};

export type ChatResponse = {
    response: string;
    sources: string[];
};

export type AdminStats = {
    documentsIndexed: number;
    totalVectors: number;
    lastUpdated: string; // e.g., "2 mins ago"
    recentUploads: string[]; // List of file names
};