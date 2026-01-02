// app/components/Admin/KnowledgeManager.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import { uploadPdfs } from '../../lib/api/knowledgeBotApi';
import { Upload, Loader, FileText, CircleCheckBig, CircleX } from 'lucide-react';


interface KnowledgeManagerProps {
    onSuccessfulUpload: () => void;
}

export default function KnowledgeManager({ onSuccessfulUpload }: KnowledgeManagerProps) {
    const [uploading, setUploading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setUploading(true);
            setStatus('idle');
            setErrorMsg('');

            try {
                const filesArray = Array.from(e.target.files);
                await uploadPdfs(filesArray);

                setStatus('success');
                onSuccessfulUpload(); // Notify parent to refresh stats
            } catch (error) {
                console.error(error);
                setStatus('error');
                setErrorMsg(error instanceof Error ? error.message : 'An unknown error occurred during upload.');
            } finally {
                setUploading(false);
            }
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Upload color="#4f46e5" />
                Ingest Document
            </h3>

            <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:bg-slate-50 transition-colors relative">
                {uploading ? (
                    <div className="flex flex-col items-center">
                        <Loader className="w-8 h-8 animate-spin text-indigo-600 mb-4" />
                        <p className="text-sm font-medium text-slate-600">Parsing & Vectorizing...</p>
                        <p className="text-xs text-slate-400 mt-2">Generating Embeddings</p>
                    </div>
                ) : (
                    <>
                        <input
                            type="file"
                            accept=".pdf"
                            onChange={handleFileUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            multiple
                        />
                        <FileText className="w-10 h-10 text-slate-400 mx-auto mb-4"/>
                        <p className="text-sm font-medium text-slate-700">Drop PDF here or click to browse</p>
                        <p className="text-xs text-slate-400 mt-2">Supports PDF, TXT (Max 20MB per file)</p>
                    </>
                )}
            </div>

            {status === 'success' && (
                <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-lg flex items-center gap-2 text-sm">
                    <CircleCheckBig className="w-4 h-4"/>
                    Document(s) successfully indexed.
                </div>
            )}
            {status === 'error' && (
                <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-center gap-2 text-sm">
                    <CircleX className="w-8 h-8"/>
                    Upload failed. {errorMsg}
                </div>
            )}
        </div>
    );
}