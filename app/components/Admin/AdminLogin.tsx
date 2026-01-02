// app/components/Admin/AdminLogin.tsx
import React from 'react';
import Image from 'next/image';
import { Shield } from 'lucide-react';


interface AdminLoginProps {
    adminEmail: string;
    setAdminEmail: (email: string) => void;
    adminPass: string;
    setAdminPass: (pass: string) => void;
    handleLogin: (e: React.FormEvent) => void;
}

export default function AdminLogin({ adminEmail, setAdminEmail, adminPass, setAdminPass, handleLogin }: AdminLoginProps) {
    return (
        <div className="flex items-center justify-center h-full p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
                <div className="flex justify-center mb-6">
                    <div className="bg-indigo-100 p-3 rounded-full">
                        <Shield className="w-8 h-8 text-indigo-600" />
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-slate-800 text-center mb-2">Admin Access</h2>
                <p className="text-slate-500 text-center mb-8 text-sm">Authenticate to manage knowledge base.</p>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1 uppercase">Email</label>
                        <input
                            type="email"
                            value={adminEmail}
                            onChange={(e) => setAdminEmail(e.target.value)}
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                            placeholder="admin@company.com"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1 uppercase">Password</label>
                        <input
                            type="password"
                            value={adminPass}
                            onChange={(e) => setAdminPass(e.target.value)}
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                            placeholder="••••••••"
                        />
                    </div>
                    <button type="submit" className="w-full bg-slate-900 text-white py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors">
                        Secure Login
                    </button>
                </form>
            </div>
        </div>
    );
}