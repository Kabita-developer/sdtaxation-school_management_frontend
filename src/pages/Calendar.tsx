import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import {
    ChevronLeft,
    ChevronRight,
    Calendar as CalendarIcon,
    MapPin,
    Plus,
    ArrowRight,
    Search
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function Calendar() {
    const { theme } = useTheme();

    const calendarShortcuts = [
        { label: 'Add Event', icon: Plus, onClick: () => console.log('Add event clicked'), variant: 'primary' as const },
        { label: 'Today', icon: CalendarIcon, onClick: () => console.log('Today clicked'), variant: 'white' as const },
    ];

    const days = Array.from({ length: 30 }, (_, i) => i + 1);
    const events = {
        4: { title: 'Tax Audit', type: 'high' },
        10: { title: 'Board Meet', type: 'medium' },
        15: { title: 'Compliance', type: 'low' },
        22: { title: 'Payroll Run', type: 'high' },
    };

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <Layout title="Calendar" shortcuts={calendarShortcuts}>
            <div className="flex flex-col lg:flex-row gap-6">
                
                {/* Main Calendar View */}
                <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden text-sm">
                    {/* Calendar Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-100">
                        <div className="flex items-center gap-4">
                            <h2 className="text-xl font-bold text-gray-800">April 2024</h2>
                            <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                                <button className="p-2 hover:bg-gray-50 border-r border-gray-200"><ChevronLeft size={16} /></button>
                                <button className="p-2 hover:bg-gray-50"><ChevronRight size={16} /></button>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 text-xs font-semibold bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Month</button>
                            <button className="px-4 py-2 text-xs font-semibold text-gray-500 hover:bg-gray-50 rounded-lg transition-colors">Week</button>
                            <button className="px-4 py-2 text-xs font-semibold text-gray-500 hover:bg-gray-50 rounded-lg transition-colors">Day</button>
                        </div>
                    </div>

                    {/* Calendar Grid */}
                    <div className="p-0">
                        <div className="grid grid-cols-7 border-b border-gray-100">
                            {weekDays.map(day => (
                                <div key={day} className="py-3 text-center text-xs font-bold text-gray-400 uppercase tracking-wider">{day}</div>
                            ))}
                        </div>

                        <div className="grid grid-cols-7">
                            {/* Empty days for start of month */}
                            {[...Array(2)].map((_, i) => (
                                <div key={`empty-${i}`} className="h-28 border-r border-b border-gray-100 bg-gray-50/30" />
                            ))}

                            {days.map(day => {
                                const event = (events as any)[day];
                                return (
                                    <div key={day} className="h-28 border-r border-b border-gray-100 p-2 hover:bg-gray-50 transition-colors group relative">
                                        <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-semibold mb-1 ${day === 17 ? `bg-${theme.colors.primary} text-white` : 'text-gray-700'}`}>
                                            {day}
                                        </span>
                                        
                                        {event && (
                                            <div className={`mt-1 p-1.5 rounded-md text-[10px] font-medium truncate ${
                                                event.type === 'high' ? 'bg-red-50 text-red-600 border border-red-100' :
                                                event.type === 'medium' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                                                `bg-${theme.colors.primaryLight} text-${theme.colors.primary} border border-${theme.colors.primary.split('-')[0]}-100`
                                            }`}>
                                                {event.title}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Sidebar Agenda */}
                <div className="w-full lg:w-[350px] flex flex-col gap-6">
                    {/* Upcoming Events */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-gray-800">Upcoming Events</h3>
                            <button className="text-gray-400 hover:text-gray-600"><Plus size={18} /></button>
                        </div>

                        <div className="space-y-4">
                            <AgendaItem 
                                time="09:00" 
                                title="Daily Ops Meeting" 
                                category="General"
                                color="blue" 
                            />
                            <AgendaItem 
                                time="11:30" 
                                title="Reliance Audit Call" 
                                category="Tax"
                                color="purple" 
                            />
                            <AgendaItem 
                                time="14:00" 
                                title="Payroll Processing" 
                                category="Finance"
                                color="amber" 
                            />
                            <AgendaItem 
                                time="16:45" 
                                title="Client Onboarding" 
                                category="Sales"
                                color="emerald" 
                            />
                        </div>

                        <button className="w-full mt-6 py-2.5 text-xs font-bold text-gray-500 hover:text-gray-800 border border-gray-100 rounded-lg hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                            View All Events <ArrowRight size={14} />
                        </button>
                    </div>

                    {/* Quick Stats/Info */}
                    <div className="bg-gray-900 rounded-xl p-6 text-white">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Today's Progress</h4>
                        <div className="flex items-end gap-2 mb-2">
                            <span className="text-3xl font-bold">75%</span>
                            <span className="text-xs text-gray-400 mb-1">Tasks Done</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                            <div className={`h-full w-3/4 bg-${theme.colors.primary} rounded-full`} />
                        </div>
                    </div>
                </div>

            </div>
        </Layout>
    );
}

function AgendaItem({ time, title, category, color }: { time: string, title: string, category: string, color: string }) {
    const bgColor = {
        blue: 'bg-blue-500',
        purple: 'bg-purple-500',
        amber: 'bg-amber-500',
        emerald: 'bg-emerald-500',
    }[color] || 'bg-gray-500';

    return (
        <div className="flex gap-4 group cursor-pointer">
            <div className="flex flex-col items-center">
                <span className="text-sm font-bold text-gray-800">{time}</span>
                <div className={`w-0.5 h-10 bg-gray-100 mt-2 relative`}>
                    <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full ${bgColor} ring-4 ring-white`} />
                </div>
            </div>
            <div className="flex-1 pb-4">
                <h4 className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">{title}</h4>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{category}</span>
            </div>
        </div>
    );
}
