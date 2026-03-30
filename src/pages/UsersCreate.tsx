import React, { useState } from 'react';
import Layout from '../components/Layout';
import {
    UserPlus,
    Shield,
    Mail,
    Lock,
    CheckCircle2,
    AlertCircle,
    Building2,
    ChevronRight,
    User,
    Info
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function UsersCreate() {
    const { theme } = useTheme();

    const userShortcuts = [
        { label: 'Register User', icon: UserPlus, onClick: () => console.log('Register clicked'), variant: 'primary' as const },
        { label: 'Bulk Invite', icon: Mail, onClick: () => console.log('Bulk Invite clicked'), variant: 'white' as const },
        { label: 'Roles/Permissions', icon: Shield, onClick: () => console.log('Roles clicked'), variant: 'white' as const },
    ];

    const [submitted, setSubmitted] = useState(false);

    return (
        <Layout title="User Creation" shortcuts={userShortcuts}>
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

                    {/* Header Banner */}
                    <div className={`h-2 bg-gradient-to-r from-${theme.colors.primary.split('-')[0]}-600 via-indigo-600 to-purple-600`} />

                    <div className="p-8">
                        <div className="flex items-center space-x-4 mb-8">
                            <div className={`p-3 bg-${theme.colors.primaryLight} text-${theme.colors.primary} rounded-2xl shadow-inner`}>
                                <UserPlus size={32} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-gray-900">Create New Authority</h2>
                                <p className="text-sm text-gray-500 font-medium">Add a new administrative user with specific access controls.</p>
                            </div>
                        </div>

                        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                            {/* Grid 1: Basic Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputGroup label="Full Name" placeholder="e.g. Ramesh Babu" icon={<User size={18} />} required />
                                <InputGroup label="Corporate Email" type="email" placeholder="ramesh@taxation.in" icon={<Mail size={18} />} required />
                            </div>

                            {/* Grid 2: Security */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputGroup label="Access Password" type="password" placeholder="••••••••" icon={<Lock size={18} />} required />
                                <div className="space-y-1.5">
                                    <label className="text-xs font-black uppercase tracking-widest text-gray-400">Department</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                            <Building2 size={18} />
                                        </div>
                                        <select className={`block w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-${theme.colors.primary.split('-')[0]}-500 text-sm font-bold text-gray-700 appearance-none`}>
                                            <option>Select Management Unit</option>
                                            <option>Accounts & Finance</option>
                                            <option>Human Resources</option>
                                            <option>Operations</option>
                                            <option>Legal Compliance</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Role Selection */}
                            <div className="space-y-4 pt-4">
                                <label className="text-xs font-black uppercase tracking-widest text-gray-400">Administrative Role</label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <RoleCard title="Super Admin" desc="Full system control" icon={<Shield className="text-red-500" size={20} />} />
                                    <RoleCard title="Manager" desc="Direct unit oversight" icon={<Shield className={`text-${theme.colors.primary}`} size={20} />} active />
                                    <RoleCard title="Operator" desc="Standard data entry" icon={<Shield className="text-green-500" size={20} />} />
                                </div>
                            </div>

                            {/* Notice */}
                            <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl flex items-start space-x-3 mt-4">
                                <Info className="text-amber-500 mt-0.5 flex-shrink-0" size={20} />
                                <p className="text-xs text-amber-800 leading-relaxed font-medium">An invitation link will be sent to the user's corporate email. They must complete password setup and verify their identity before first login.</p>
                            </div>

                            {/* Submit */}
                            <div className="pt-6 flex justify-end">
                                <button type="submit" className="px-8 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all shadow-xl active:scale-95 flex items-center space-x-2 group">
                                    <span>Register User</span>
                                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </form>

                        {submitted && (
                            <div className="mt-8 p-4 bg-green-50 border border-green-100 rounded-xl flex items-center space-x-3 text-green-700 animate-in fade-in slide-in-from-bottom-2">
                                <CheckCircle2 size={24} />
                                <span className="font-bold">Account successfully initiated! Invitation sent.</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

function InputGroup({ label, placeholder, type = "text", icon, required = false }: { label: string, placeholder: string, type?: string, icon: React.ReactNode, required?: boolean }) {
    const { theme } = useTheme();
    return (
        <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400">{label}</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    {icon}
                </div>
                <input
                    type={type}
                    required={required}
                    className={`block w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-${theme.colors.primary.split('-')[0]}-500 text-sm font-bold text-gray-700 transition-all focus:bg-white`}
                    placeholder={placeholder}
                />
            </div>
        </div>
    );
}

function RoleCard({ title, desc, icon, active = false }: { title: string, desc: string, icon: React.ReactNode, active?: boolean }) {
    const { theme } = useTheme();
    return (
        <div className={`p-4 rounded-xl border-2 transition-all cursor-pointer group ${active ? `border-${theme.colors.primary} bg-${theme.colors.primaryLight}/50 shadow-md` : `border-gray-100 hover:border-${theme.colors.primary.split('-')[0]}-200 hover:bg-white shadow-sm`}`}>
            <div className="flex items-center space-x-2 mb-2">
                {icon}
                <h4 className={`text-sm font-black ${active ? `text-${theme.colors.primary.split('-')[0]}-900` : 'text-gray-900'}`}>{title}</h4>
            </div>
            <p className={`text-[10px] font-bold ${active ? `text-${theme.colors.primary}` : 'text-gray-400'}`}>{desc}</p>
        </div>
    );
}
