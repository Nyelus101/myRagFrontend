// app/components/Header.tsx
import React from 'react';
import { View } from '../lib/types';
import { Bot, Settings } from 'lucide-react';

interface HeaderProps {
    view: View;
    isAuthenticated: boolean;
    setView: (view: View) => void;
}

export default function Header({ view, isAuthenticated, setView }: HeaderProps) {
    return (
        <header className="border-b border-slate-200 bg-white p-4 flex items-center justify-between sticky top-0 z-10">
            <div className="flex items-center gap-2">
                <div className="bg-indigo-600 p-2 rounded-lg">
                    <Bot color="white" />
                </div>
                <div>
                    <h1 className="font-bold text-slate-800 text-lg">Nedu's KnowledgeBot</h1>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span className={`w-2 h-2 rounded-full ${isAuthenticated ? 'bg-green-500' : 'bg-slate-300'}`}></span>
                        {view === 'admin' ? 'Admin Console' : 'Chat Interface'}
                    </div>
                </div>
            </div>

            <div className="flex gap-2">
                {view === 'chat' && (
                    <button
                        onClick={() => setView('admin')}
                        className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors flex items-center gap-2 text-sm font-medium"
                    >
                        <Settings size={18} />
                        <span className="hidden sm:inline">Admin</span>
                    </button>
                )}
                {view === 'admin' && (
                    <button
                        onClick={() => setView('chat')}
                        className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors flex items-center gap-2 text-sm font-medium"
                    >
                        <Bot />
                        <span className="hidden sm:inline">Chat</span>
                    </button>
                )}
            </div>
        </header>
    );
}