// app/components/Chat/ModeToggle.tsx
import React from 'react';
import Image from 'next/image';
import { AppMode } from '../../lib/types';
import { BookOpen, Zap } from 'lucide-react';


interface ModeToggleProps {
    mode: AppMode;
    setMode: (mode: AppMode) => void;
}

export default function ModeToggle({ mode, setMode }: ModeToggleProps) {
    return (
        <div className="flex bg-slate-100 p-1 rounded-lg mb-4 self-center shadow-inner">
            <button
                onClick={() => setMode('doc_only')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    mode === 'doc_only'
                        ? 'bg-white text-indigo-600 shadow-sm'
                        : 'text-slate-500 hover:text-slate-700'
                }`}
            >
                <BookOpen className="w-4 h-4"/>
                Doc-Only
            </button>
            <button
                onClick={() => setMode('ai_enhanced')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    mode === 'ai_enhanced'
                        ? 'bg-white text-indigo-600 shadow-sm'
                        : 'text-slate-500 hover:text-slate-700'
                }`}
            >
                <Zap className="w-4 h-4" />
                General AI
            </button>
        </div>
    );
}