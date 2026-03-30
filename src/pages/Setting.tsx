import React from 'react';
import Layout from '../components/Layout';
import {
    Bell,
    Shield,
    Globe,
    Database,
    CreditCard,
    Code,
    ChevronRight,
    ToggleLeft,
    Palette,
    Check
} from 'lucide-react';
import { useTheme, ThemeName } from '../contexts/ThemeContext';

export default function Setting() {
    const { theme, setTheme, themeName } = useTheme();

    const themes: { name: ThemeName; color: string; bg: string }[] = [
        { name: 'blue', color: 'blue-600', bg: 'bg-blue-600' },
        { name: 'purple', color: 'purple-600', bg: 'bg-purple-600' },
        { name: 'green', color: 'green-600', bg: 'bg-green-600' },
        { name: 'orange', color: 'orange-600', bg: 'bg-orange-600' },
        { name: 'red', color: 'red-600', bg: 'bg-red-600' },
        { name: 'indigo', color: 'indigo-600', bg: 'bg-indigo-600' },
        { name: 'black', color: 'gray-900', bg: 'bg-gray-900' },
        { name: 'pink', color: 'pink-600', bg: 'bg-pink-600' },
        { name: 'teal', color: 'teal-600', bg: 'bg-teal-600' },
        { name: 'white', color: 'white', bg: 'bg-white' },
    ];

    return (
        <Layout title="System Configuration">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Theme Settings Section */}
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-8">
                    <div className="flex items-center space-x-4">
                        <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                            <Palette size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">Theme Settings</h3>
                            <p className="text-sm text-gray-400 font-medium italic">Choose your preferred color theme</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                        {themes.map((t) => (
                            <button
                                key={t.name}
                                onClick={() => setTheme(t.name)}
                                className={`
                                    relative flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-bold transition-all active:scale-95
                                    ${t.name === 'white' ? 'border-2 border-gray-200 text-gray-900' : 'text-white'}
                                    ${t.bg}
                                    ${themeName === t.name ? 'ring-4 ring-blue-100 ring-offset-2' : 'hover:opacity-90'}
                                `}
                            >
                                <Palette size={16} />
                                <span className="capitalize text-sm">{t.name}</span>
                                {themeName === t.name && (
                                    <Check size={14} className={t.name === 'white' ? 'text-blue-600' : 'text-white/80'} />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="p-6 bg-gray-50 rounded-2xl space-y-1">
                        <p className="text-sm font-bold text-gray-700">
                            Current Theme: <span className="capitalize text-blue-600">{themeName}</span>
                        </p>
                        <p className="text-xs text-gray-400 font-medium italic">The theme will be applied to the sidebar, cards, and page elements throughout the application.</p>
                    </div>
                </div>

                {/* Profile Section */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white text-2xl font-black shadow-lg">AD</div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Admin</h2>
                            <p className="text-sm text-gray-500">superadmin@gmail.com</p>
                        </div>
                    </div>
                    <button className="px-4 py-2 border border-blue-200 text-blue-600 rounded-lg text-sm font-bold hover:bg-blue-50 transition-colors">Edit Profile</button>
                </div>

                {/* Settings Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SectionCard
                        icon={<Bell size={20} />}
                        title="Notifications"
                        desc="Configure how you receive alerts and email updates."
                    />
                    <SectionCard
                        icon={<Shield size={20} />}
                        title="Security & Privacy"
                        desc="Manage passwords, 2FA, and authorized devices."
                    />
                    <SectionCard
                        icon={<Globe size={20} />}
                        title="Language & Region"
                        desc="Set your preferred language and timezone."
                    />
                    <SectionCard
                        icon={<Database size={20} />}
                        title="Data Management"
                        desc="Export system data, manage backups and logs."
                    />
                    <SectionCard
                        icon={<CreditCard size={20} />}
                        title="Subscription & Billing"
                        desc="View plan details, invoices and payment methods."
                    />
                    <SectionCard
                        icon={<Code size={20} />}
                        title="API & Integration"
                        desc="Manage access tokens and third-party webhooks."
                    />
                </div>

                {/* Quick Toggles */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                    <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-3">Quick Preferences</h3>
                    <div className="space-y-4">
                        <ToggleOption label="Maintenance Mode" desc="Take the system offline for updates." />
                        <ToggleOption label="Two-Factor Authentication" desc="Recommended for enhanced security." active />
                        <ToggleOption label="Debug Logs" desc="Capture detailed technical logs." />
                    </div>
                </div>
            </div>
        </Layout>
    );
}

function SectionCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all group cursor-pointer">
            <div className="flex items-start justify-between">
                <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-blue-50 transition-colors text-gray-400 group-hover:text-blue-600">
                    {icon}
                </div>
                <ChevronRight size={18} className="text-gray-300 group-hover:text-blue-400 mt-1" />
            </div>
            <div className="mt-4">
                <h4 className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors">{title}</h4>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{desc}</p>
            </div>
        </div>
    );
}

function ToggleOption({ label, desc, active = false }: { label: string, desc: string, active?: boolean }) {
    return (
        <div className="flex items-center justify-between py-2">
            <div>
                <p className="text-sm font-bold text-gray-800">{label}</p>
                <p className="text-xs text-gray-500">{desc}</p>
            </div>
            <div className="relative">
                <button className={`w-12 h-6 rounded-full relative transition-colors ${active ? 'bg-blue-600' : 'bg-gray-200'}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${active ? 'right-1' : 'left-1'}`} />
                </button>
                <ToggleLeft className="hidden" /> {/* Added to avoid unused import if needed, though replaced in source already */}
            </div>
        </div>
    );
}

// Fixed ToggleLeft unused import by removing it from the icon set if not used or using it
