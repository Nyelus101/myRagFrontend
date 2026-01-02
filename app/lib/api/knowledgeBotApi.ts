// app/lib/api/knowledgeBotApi.ts
import { ChatResponse, AppMode, AdminStats } from '../types';

// Replace with your actual backend URL (FastAPI runs locally on 8000 by default)
const API_BASE_URL = 'http://localhost:8000';
// const API_BASE_URL = 'https://web-production-1a8ab.up.railway.app';

/**
 * Sends a question to the backend and gets a response.
 * @param question The user's question.
 * @param mode The RAG mode ('doc_only' or 'ai_enhanced').
 * @returns The response and source citations.
 */
export async function askQuestion(question: string, mode: AppMode): Promise<ChatResponse> {
    const formData = new FormData();
    formData.append('question', question);
    // Map frontend mode to backend mode
    const backendMode = mode === 'ai_enhanced' ? 'general' : 'document';
    formData.append('mode', backendMode);

    const response = await fetch(`${API_BASE_URL}/ask/`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(`API Error: ${error.error || response.statusText}`);
    }

    const data: ChatResponse = await response.json();

    // Normalizing citations: Backend returns full paths, but we only want the filename
    const normalizedSources = data.sources.map(source => source.split('/').pop() || source);

    return {
        response: data.response,
        sources: normalizedSources,
    };
}

/**
 * Uploads PDF files to the backend for ingestion.
 * @param files A list of File objects to upload.
 */
export async function uploadPdfs(files: File[]): Promise<{ message: string }> {
    const formData = new FormData();
    files.forEach(file => {
        formData.append('files', file);
    });

    const response = await fetch(`${API_BASE_URL}/upload_pdfs/`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(`Upload Failed: ${error.error || response.statusText}`);
    }

    return response.json();
}

/**
 * Mocks the retrieval of admin statistics.
 * The backend provided doesn't have a stats endpoint, so this is simulated.
 */
export async function getAdminStats(): Promise<AdminStats> {
    // Real implementation would call a /stats or similar endpoint
    await new Promise(resolve => setTimeout(resolve, 500)); 

    return {
        documentsIndexed: 14,
        totalVectors: 842,
        lastUpdated: '2 mins ago',
        recentUploads: ['Q3_Financial_Report.pdf', 'Employee_Handbook_v2.pdf', 'Product_Roadmap_2025.pdf'],
    };
}