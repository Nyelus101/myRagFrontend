// app/components/Admin/AdminDashboard.tsx
import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { getAdminStats } from '../../lib/api/knowledgeBotApi';
import { AdminStats } from '../../lib/types';
import KnowledgeManager from './KnowledgeManager';
import { LogOut, Loader, Database, FileText } from 'lucide-react';

interface AdminDashboardProps {
    setIsAuthenticated: (auth: boolean) => void;
}

export default function AdminDashboard({ setIsAuthenticated }: AdminDashboardProps) {
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [loadingStats, setLoadingStats] = useState(true);

    const fetchStats = useCallback(async () => {
        setLoadingStats(true);
        try {
            const data = await getAdminStats();
            setStats(data);
        } catch (error) {
            console.error('Failed to fetch admin stats:', error);
            // Fallback or error state
        } finally {
            setLoadingStats(false);
        }
    }, []);

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    return (
        <div className="max-w-4xl mx-auto p-6 w-full">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Knowledge Base Manager</h2>
                    <p className="text-slate-500 text-sm">Upload documents to generate embeddings.</p>
                </div>
                <button
                    onClick={() => setIsAuthenticated(false)}
                    className="text-red-500 hover:bg-red-50 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                >
                    <LogOut className="w-4 h-4"/>
                    Logout
                </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Upload Card */}
                <KnowledgeManager onSuccessfulUpload={fetchStats} />

                {/* Stats Card */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <Database className="w-5 h-5 text-indigo-600"/>
                        Vector Store Stats
                    </h3>

                    {loadingStats ? (
                        <div className="flex items-center justify-center h-48">
                            <Loader className="w-6 h-6 animate-spin text-indigo-600"/>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                                <span className="text-sm text-slate-600">Documents Indexed</span>
                                <span className="font-bold text-slate-800">{stats?.documentsIndexed ?? 'N/A'}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                                <span className="text-sm text-slate-600">Total Vectors</span>
                                <span className="font-bold text-slate-800">{stats?.totalVectors ?? 'N/A'}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                                <span className="text-sm text-slate-600">Last Updated</span>
                                <span className="font-bold text-slate-800">{stats?.lastUpdated ?? 'N/A'}</span>
                            </div>

                            <div className="pt-4 border-t border-slate-100">
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Recent Uploads</h4>
                                <ul className="space-y-2">
                                    {(stats?.recentUploads || []).map((file, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                                            <FileText className="w-3 h-3 text-slate-400" />
                                            {file}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}