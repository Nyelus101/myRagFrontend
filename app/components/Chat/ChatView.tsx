// app/components/Chat/ChatView.tsx
import React from 'react';
import ModeToggle from './ModeToggle';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { AppMode, Message } from '../../lib/types';

interface ChatViewProps {
    mode: AppMode;
    setMode: (mode: AppMode) => void;
    messages: Message[];
    isLoading: boolean;
    input: string;
    setInput: (input: string) => void;
    handleSendMessage: (e: React.FormEvent) => void;
}

export default function ChatView(props: ChatViewProps) {
    const { mode, setMode, messages, isLoading, input, setInput, handleSendMessage } = props;

    return (
        <div className="flex flex-col h-full max-w-3xl mx-auto w-full">
            <div className="p-4 flex justify-center">
                <ModeToggle mode={mode} setMode={setMode} />
            </div>

            <ChatMessages messages={messages} isLoading={isLoading} />

            <ChatInput
                input={input}
                setInput={setInput}
                isLoading={isLoading}
                mode={mode}
                handleSendMessage={handleSendMessage}
            />
        </div>
    );
}