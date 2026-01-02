// app/components/Chat/ChatMessages.tsx
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import MessageBubble from './MessageBubble';
import { Message } from '../../lib/types';
import { Bot, Loader } from 'lucide-react';

interface ChatMessagesProps {
    messages: Message[];
    isLoading: boolean;
}

export default function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
            {messages.map((msg) => (
                <MessageBubble key={msg.id} msg={msg} />
            ))}
            {isLoading && (
                <div className="flex gap-4">
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                        <Bot className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
                        <Loader className="w-4 h-4 animate-spin text-indigo-600" />
                        <span className="text-sm text-slate-500">Thinking...</span>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>
    );
}