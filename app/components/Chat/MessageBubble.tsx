// app/components/Chat/MessageBubble.tsx
import React from 'react';
import Image from 'next/image';
import { Message } from '../../lib/types';
import { Bot, FileText } from 'lucide-react';


interface MessageBubbleProps {
    msg: Message;
}

export default function MessageBubble({ msg }: MessageBubbleProps) {
    const isUser = msg.role === 'user';

    return (
        <div className={`flex gap-4 ${isUser ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                isUser ? 'bg-slate-800' : 'bg-indigo-100'
            }`}>
                <Bot className={`w-5 h-5 ${isUser ? 'invert' : 'text-indigo-600'}`}/>
            </div>

            <div className={`flex flex-col max-w-[80%] ${isUser ? 'items-end' : 'items-start'}`}>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    isUser
                        ? 'bg-slate-800 text-white rounded-tr-none'
                        : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none'
                }`}>
                    {msg.content}
                </div>

                {/* Citations Section */}
                {msg.citations && msg.citations.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                        {msg.citations.map((cit, idx) => (
                            <span key={idx} className="text-[10px] uppercase tracking-wider font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded border border-slate-200 flex items-center gap-1">
                                <FileText className="w-3 h-3" />
                                {cit.split('/').pop()} {/* Only show filename */}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}