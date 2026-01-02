// app/components/Chat/ChatInput.tsx
import React from 'react';
import Image from 'next/image';
import { AppMode } from '../../lib/types';
import { Send } from 'lucide-react';


interface ChatInputProps {
    input: string;
    setInput: (input: string) => void;
    isLoading: boolean;
    mode: AppMode;
    handleSendMessage: (e: React.FormEvent) => void;
}

export default function ChatInput({ input, setInput, isLoading, mode, handleSendMessage }: ChatInputProps) {
    return (
        <div className="p-4 bg-white border-t border-slate-100">
            <form onSubmit={handleSendMessage} className="relative">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={mode === 'doc_only' ? "Ask strictly about your documents..." : "Ask anything (enhanced by docs)..."}
                    className="w-full p-4 pr-12 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-all"
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="absolute right-2 top-2 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-colors"
                >
                    <Send className="w-4 h-4 invert" />
                </button>
            </form>
            <div className="text-center mt-2">
                <span className="text-[10px] text-slate-400">
                    Running on Llama 3.1 • {mode === 'doc_only' ? 'Strict RAG' : 'Hybrid RAG'}
                </span>
            </div>
        </div>
    );
}