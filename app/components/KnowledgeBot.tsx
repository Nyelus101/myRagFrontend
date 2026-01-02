// app/components/KnowledgeBot.tsx
'use client';

import React, { useState } from 'react';
import Header from './Header';
import ChatView from './Chat/ChatView';
import AdminLogin from './Admin/AdminLogin';
import AdminDashboard from './Admin/AdminDashboard';
import { askQuestion } from '../lib/api/knowledgeBotApi';
import { Message, AppMode, View, ChatResponse } from '../lib/types';

const INITIAL_MESSAGE: Message = { id: '1', role: 'assistant', content: 'Hello! I can answer questions based on your knowledge base. Upload docs in Admin.' };

export default function KnowledgeBot() {
    // Core State
    const [view, setView] = useState<View>('chat');
    const [mode, setMode] = useState<AppMode>('doc_only');
    const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Auth State (Simulated)
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [adminEmail, setAdminEmail] = useState('');
    const [adminPass, setAdminPass] = useState('');

    // --- Handlers ---

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulating Auth (Replace with actual API call)
        if (adminEmail === 'admin@company.com' && adminPass === 'password') { // Use a hardcoded simulation
            setIsAuthenticated(true);
            setAdminEmail('');
            setAdminPass('');
        } else {
            alert('Simulated Login Failed. Try admin@company.com / password');
        }
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userQuestion = input.trim();
        const userMsg: Message = { id: Date.now().toString(), role: 'user', content: userQuestion };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            // API Call: Using the implemented knowledgeBotApi client
            const apiResponse: ChatResponse = await askQuestion(userQuestion, mode);

            const assistantMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: apiResponse.response,
                citations: apiResponse.sources,
            };

            setMessages(prev => [...prev, assistantMsg]);

        } catch (error) {
            console.error('Chat API Error:', error);
            const errorMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'system',
                content: `Error: Failed to get response. ${error instanceof Error ? error.message : 'Please check the backend server.'}`,
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-slate-50 text-slate-900 font-sans">
            <Header view={view} isAuthenticated={isAuthenticated} setView={setView} />

            <main className="flex-1 overflow-scroll relative flex flex-col">
                {view === 'chat' && (
                    <ChatView
                        mode={mode}
                        setMode={setMode}
                        messages={messages}
                        isLoading={isLoading}
                        input={input}
                        setInput={setInput}
                        handleSendMessage={handleSendMessage}
                    />
                )}

                {view === 'admin' && (
                    isAuthenticated ? (
                        <AdminDashboard setIsAuthenticated={setIsAuthenticated} />
                    ) : (
                        <AdminLogin
                            adminEmail={adminEmail}
                            setAdminEmail={setAdminEmail}
                            adminPass={adminPass}
                            setAdminPass={setAdminPass}
                            handleLogin={handleLogin}
                        />
                    )
                )}
            </main>
        </div>
    );
}