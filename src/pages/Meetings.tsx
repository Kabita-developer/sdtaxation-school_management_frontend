import React from 'react';
import Layout from '../components/Layout';
import {
    Video,
    Plus,
    Calendar,
    Clock,
    Users,
    MoreHorizontal,
    Copy,
    Share2,
    Play,
    Download,
    ExternalLink
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function Meetings() {
    const { theme } = useTheme();

    const meetingShortcuts = [
        { label: 'Start Meeting', icon: Plus, onClick: () => console.log('Start Meeting clicked'), variant: 'primary' as const },
        { label: 'Join with Code', icon: ExternalLink, onClick: () => console.log('Join code clicked'), variant: 'white' as const },
        { label: 'Archive', icon: Play, onClick: () => console.log('Archive clicked'), variant: 'white' as const },
    ];

    return (
        <Layout title="Video Conferencing & Meetings" shortcuts={meetingShortcuts}>
            <div className="space-y-6">

                {/* Header Action */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                        <div className={`p-4 bg-${theme.colors.primary} rounded-2xl shadow-xl shadow-${theme.colors.primary.split('-')[0]}-200 text-white`}>
                            <Video size={32} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-gray-900 leading-tight tracking-tight">School Connect</h2>
                            <div className="flex items-center space-x-2 text-sm text-gray-500 font-bold uppercase tracking-widest">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span>Virtual Classroom Active</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button className="px-6 py-3 bg-white border-2 border-gray-100 text-gray-900 rounded-2xl font-black hover:bg-gray-50 transition-all shadow-sm active:scale-95 text-sm uppercase tracking-widest">Join with Code</button>
                        <button className={`px-6 py-3 bg-${theme.colors.primary} text-white rounded-2xl font-black hover:bg-${theme.colors.primaryDark} transition-all shadow-lg active:scale-95 text-sm flex items-center space-x-2 uppercase tracking-widest`}>
                            <Plus size={20} />
                            <span>Start Meeting</span>
                        </button>
                    </div>
                </div>

                {/* Categories (Grid) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Upcoming Meetings */}
                    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                            <h3 className="font-black text-gray-900 flex items-center group cursor-pointer">
                                <Calendar className={`mr-2 text-${theme.colors.primary}`} size={20} />
                                Scheduled Tasks
                                <span className={`ml-3 px-2 py-0.5 bg-${theme.colors.primaryLight} text-${theme.colors.primary} text-[10px] rounded-full`}>4 TODAY</span>
                            </h3>
                            <button className="text-gray-400 hover:text-gray-600 transition-colors">
                                <MoreHorizontal size={20} />
                            </button>
                        </div>

                        <div className="p-4 space-y-3 flex-1 overflow-y-auto max-h-[400px]">
                            <MeetingRow
                                title="Q1 Financial Audit Review"
                                time="10:30 AM - 11:30 AM"
                                participants={4}
                                status="ongoing"
                            />
                            <MeetingRow
                                title="Client Onboarding: Alpha Corp"
                                time="02:00 PM - 02:45 PM"
                                participants={8}
                                status="upcoming"
                            />
                            <MeetingRow
                                title="Policy Update Sync"
                                time="04:15 PM - 05:00 PM"
                                participants={12}
                                status="upcoming"
                            />
                            <MeetingRow
                                title="Junior Accountant Interview"
                                time="Tomorrow, 11:00 AM"
                                participants={2}
                                status="upcoming"
                            />
                        </div>
                    </div>

                    {/* Past/Recordings */}
                    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                        <div className="p-6 border-b border-gray-50">
                            <h3 className="font-black text-gray-900 flex items-center group cursor-pointer">
                                <Play className="mr-2 text-purple-600" size={20} />
                                Recent Recordings
                            </h3>
                        </div>
                        <div className="p-4 space-y-4">
                            <RecordingItem title="Board Meeting - Jan 2025" date="Jan 28, 2025" duration="1h 12m" />
                            <RecordingItem title="GST Compliance Workshop" date="Jan 24, 2025" duration="42m" opacity />
                            <RecordingItem title="Weekly Team Sync" date="Jan 21, 2025" duration="28m" opacity />
                        </div>
                        <div className="mt-auto p-4 bg-gray-50/50 border-t border-gray-50">
                            <button className={`w-full py-3 text-sm font-black text-gray-500 hover:text-${theme.colors.primary} transition-all uppercase tracking-[0.2em]`}>View All Archive</button>
                        </div>
                    </div>

                </div>

                {/* Features Promo */}
                <div className={`bg-gradient-to-br from-indigo-700 to-${theme.colors.primary.split('-')[0]}-900 rounded-3xl p-8 text-white relative overflow-hidden group`}>
                    <div className="absolute right-0 top-0 p-12 transform translate-x-32 -translate-y-32 bg-white/5 rounded-full scale-150 group-hover:bg-white/10 transition-colors" />
                    <div className="relative z-10 max-w-xl">
                        <h3 className="text-2xl font-black mb-3 italic">Premium Quality, zero lag.</h3>
                        <p className="text-indigo-100 font-bold opacity-80 mb-6 leading-relaxed">Integrated whiteboards, screen sharing, and automatic AI-generated summaries for every meeting you host on the school management platform.</p>
                        <button className="px-8 py-3 bg-white text-indigo-900 rounded-2xl font-black shadow-xl hover:shadow-indigo-500/20 transition-all flex items-center space-x-2">
                            <span>Enable AI Summaries</span>
                            <ExternalLink size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

function MeetingRow({ title, time, participants, status }: { title: string, time: string, participants: number, status: 'ongoing' | 'upcoming' }) {
    const { theme } = useTheme();
    return (
        <div className={`p-5 rounded-2xl border transition-all hover:shadow-md cursor-pointer ${status === 'ongoing' ? 'border-green-100 bg-green-50/30 ring-1 ring-green-100' : `border-gray-50 hover:border-${theme.colors.primary.split('-')[0]}-100`}`}>
            <div className="flex items-start justify-between">
                <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                        <h4 className="font-black text-gray-900 group-hover:text-blue-700">{title}</h4>
                        {status === 'ongoing' && (
                            <span className="px-2 py-0.5 bg-green-500 text-white text-[8px] font-black rounded-full animate-pulse uppercase">Live</span>
                        )}
                    </div>
                    <div className="flex items-center space-x-3 text-xs text-gray-500 font-bold uppercase tracking-widest">
                        <div className="flex items-center">
                            <Clock className="mr-1.5" size={14} />
                            {time}
                        </div>
                        <div className="flex items-center border-l border-gray-200 pl-3">
                            <Users className="mr-1.5" size={14} />
                            {participants} Members
                        </div>
                    </div>
                </div>
                <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 text-[10px] flex items-center justify-center font-black">U{i}</div>
                    ))}
                </div>
            </div>
            {status === 'ongoing' ? (
                <button className="mt-4 w-full py-2 bg-green-600 text-white text-xs font-black rounded-xl uppercase tracking-widest shadow-lg shadow-green-100 italic">Join Now</button>
            ) : (
                <div className="mt-4 flex space-x-2">
                    <button className="flex-1 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 text-[10px] font-black rounded-xl uppercase tracking-wider flex items-center justify-center">
                        <Copy size={12} className="mr-2" />
                        Link
                    </button>
                    <button className="flex-1 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 text-[10px] font-black rounded-xl uppercase tracking-wider flex items-center justify-center">
                        <Share2 size={12} className="mr-2" />
                        Invite
                    </button>
                </div>
            )}
        </div>
    );
}

function RecordingItem({ title, date, duration, opacity = false }: { title: string, date: string, duration: string, opacity?: boolean }) {
    return (
        <div className={`flex items-center justify-between p-3 border border-gray-50 rounded-2xl hover:border-purple-200 hover:bg-purple-50 transition-all cursor-pointer group ${opacity ? 'opacity-60 grayscale-[0.5] hover:opacity-100 hover:grayscale-0' : ''}`}>
            <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center text-white relative group-hover:bg-purple-600 transition-colors">
                    <Play size={20} className="fill-current" />
                    <div className="absolute -bottom-1 -right-1 px-1 bg-white text-[8px] font-black text-gray-900 border border-gray-100 rounded tracking-tighter shadow-sm">{duration}</div>
                </div>
                <div>
                    <h4 className="text-sm font-black text-gray-900">{title}</h4>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{date}</p>
                </div>
            </div>
            <button className="p-2 text-gray-300 hover:text-purple-600">
                <Download size={18} />
            </button>
        </div>
    );
}
