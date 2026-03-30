import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import {
    ChevronLeft,
    ChevronRight,
    Calendar as CalendarIcon,
    MapPin,
    Plus,
    ArrowRight,
    Target
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function Calendar() {
    const { theme } = useTheme();

    const calendarShortcuts = [
        { label: 'Add Event', icon: Plus, onClick: () => console.log('Add event clicked'), variant: 'primary' as const },
        { label: 'Sync Calendar', icon: ChevronRight, onClick: () => console.log('Sync clicked'), variant: 'white' as const },
        { label: 'View Agenda', icon: ArrowRight, onClick: () => console.log('Agenda clicked'), variant: 'white' as const },
    ];

    const days = Array.from({ length: 28 }, (_, i) => i + 1);
    const events = {
        4: { title: 'Tax Audit', type: 'high' },
        10: { title: 'Board Meet', type: 'medium' },
        15: { title: 'Compliance', type: 'low' },
        22: { title: 'Payroll Run', type: 'high' },
    };

    return (
        <Layout title="Executive Calendar" shortcuts={calendarShortcuts}>
            <div className="flex flex-col xl:flex-row gap-6 h-full min-h-[700px]">

                {/* Left: Interactive Calendar */}
                <div className="flex-1 bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-100/50 p-8 flex flex-col">
                    <div className="flex items-center justify-between mb-10 px-2">
                        <div>
                            <h2 className="text-3xl font-black text-gray-900 tracking-tighter">February 2025</h2>
                            <p className="text-sm text-gray-400 font-bold uppercase tracking-[0.2em] mt-1 italic">Financial Period Q1</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button className="p-3 bg-gray-50 hover:bg-white border-2 border-transparent hover:border-gray-100 rounded-2xl transition-all"><ChevronLeft size={20} /></button>
                            <button className="px-6 py-2.5 bg-gray-900 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:shadow-lg transition-all">Today</button>
                            <button className="p-3 bg-gray-50 hover:bg-white border-2 border-transparent hover:border-gray-100 rounded-2xl transition-all"><ChevronRight size={20} /></button>
                        </div>
                    </div>

                    <div className="flex-1 grid grid-cols-7 gap-4">
                        {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                            <div key={day} className="text-center text-[10px] font-black text-gray-300 tracking-[0.3em] pb-4">{day}</div>
                        ))}

                        {/* Previous month placeholder */}
                        <div className="aspect-square bg-gray-50/30 rounded-3xl opacity-20 border border-gray-50" />
                        <div className="aspect-square bg-gray-50/30 rounded-3xl opacity-20 border border-gray-50" />
                        <div className="aspect-square bg-gray-50/30 rounded-3xl opacity-20 border border-gray-50" />

                        {/* Current month days */}
                        {days.map(day => {
                            const event = (events as any)[day];
                            return (
                                <div key={day} className={`aspect-square rounded-3xl border border-gray-50 p-4 transition-all hover:shadow-xl hover:shadow-${theme.colors.primary.split('-')[0]}-50/50 cursor-pointer group relative flex flex-col justify-between ${day === 18 ? `bg-${theme.colors.primary} border-${theme.colors.primary} shadow-2xl shadow-${theme.colors.primary.split('-')[0]}-200` : `bg-white hover:border-${theme.colors.primary.split('-')[0]}-200`}`}>
                                    <span className={`text-lg font-black leading-none ${day === 18 ? 'text-white' : 'text-gray-900'}`}>{day}</span>
                                    {event && (
                                        <div className="space-y-1">
                                            <div className={`h-1.5 w-1/2 rounded-full ${event.type === 'high' ? 'bg-red-500' :
                                                event.type === 'medium' ? 'bg-amber-500' : `bg-${theme.colors.primary}`
                                                }`} />
                                            <p className={`text-[8px] font-black uppercase truncate ${day === 18 ? 'text-white/80' : 'text-gray-400'}`}>{event.title}</p>
                                        </div>
                                    )}
                                    {day === 18 && (
                                        <div className="absolute top-4 right-4 w-2 h-2 bg-white rounded-full animate-ping" />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Right: Agenda/Insights */}
                <div className="w-full xl:w-[400px] flex flex-col gap-6">

                    {/* Daily Goal Card */}
                    <div className="bg-gradient-to-br from-gray-900 to-black rounded-[2rem] p-8 text-white relative overflow-hidden">
                        <Target className="absolute -bottom-8 -right-8 opacity-10" size={160} />
                        <div className="relative z-10">
                            <h3 className={`text-sm font-black text-${theme.colors.primary.split('-')[0]}-400 uppercase tracking-[0.3em] mb-4`}>Focus of the Day</h3>
                            <p className="text-xl font-bold italic leading-relaxed">"Complete all pending reconciliation entries for the Maharashtra branch before EOD."</p>
                            <div className="mt-8 h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                <div className={`h-full w-2/3 bg-${theme.colors.primary} rounded-full`} />
                            </div>
                            <p className="text-[10px] font-bold text-gray-500 uppercase mt-4 tracking-widest text-right">65% OF TASKS COMPLETED</p>
                        </div>
                    </div>

                    {/* Detailed Agenda */}
                    <div className="flex-1 bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-100/30 p-8 flex flex-col">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-black text-gray-900 tracking-tighter">Your Agenda</h3>
                            <button className={`p-2 bg-${theme.colors.primaryLight} text-${theme.colors.primary} rounded-xl hover:bg-${theme.colors.primary} hover:text-white transition-all`}><Plus size={20} /></button>
                        </div>

                        <div className="space-y-6 flex-1">
                            <AgendaItem
                                time="09:00 AM"
                                title="Daily Ops Sync"
                                loc="Boardroom A"
                                color="blue"
                            />
                            <AgendaItem
                                time="11:30 AM"
                                title="Client: Reliance Retail"
                                loc="Video Call"
                                color="purple"
                                active
                            />
                            <AgendaItem
                                time="03:00 PM"
                                title="Internal Audit Part 2"
                                loc="Compliance Room"
                                color="orange"
                            />
                            <AgendaItem
                                time="05:30 PM"
                                title="Review Payroll Drafts"
                                loc="Virtual"
                                color="teal"
                            />
                        </div>

                        <button className={`mt-10 w-full group flex items-center justify-between p-4 bg-gray-50 hover:bg-${theme.colors.primaryLight} rounded-[1.5rem] transition-all`}>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white rounded-xl shadow-sm"><CalendarIcon size={18} className={`text-${theme.colors.primary}`} /></div>
                                <p className={`text-xs font-black text-gray-500 group-hover:text-${theme.colors.primary} transition-colors uppercase tracking-widest`}>Full Week Overview</p>
                            </div>
                            <ArrowRight size={18} className={`text-gray-300 group-hover:text-${theme.colors.primary} group-hover:translate-x-1 transition-all`} />
                        </button>
                    </div>

                </div>

            </div>
        </Layout>
    );
}

function AgendaItem({ time, title, loc, color, active = false }: { time: string, title: string, loc: string, color: string, active?: boolean }) {
    const { theme } = useTheme();
    const colors: any = {
        blue: `bg-${theme.colors.primary} shadow-${theme.colors.primary.split('-')[0]}-100`,
        purple: 'bg-purple-500 shadow-purple-100',
        orange: 'bg-amber-500 shadow-amber-100',
        teal: 'bg-teal-500 shadow-teal-100',
    };

    return (
        <div className={`p-4 rounded-3xl flex border transition-all ${active ? `border-${theme.colors.primary.split('-')[0]}-100 bg-${theme.colors.primaryLight}/30 scale-105 shadow-xl shadow-${theme.colors.primary.split('-')[0]}-50 ring-1 ring-${theme.colors.primary.split('-')[0]}-100` : 'border-transparent hover:bg-gray-50'}`}>
            <div className="flex flex-col items-center justify-center pr-4 border-r border-gray-100 ml-1">
                <p className={`text-[10px] font-black uppercase tracking-tighter ${active ? `text-${theme.colors.primary}` : 'text-gray-400'}`}>{time.split(' ')[1]}</p>
                <p className={`text-sm font-black ${active ? 'text-gray-900' : 'text-gray-500'}`}>{time.split(' ')[0]}</p>
            </div>
            <div className="pl-4 flex-1">
                <div className="flex items-center gap-2 mb-1">
                    <div className={`w-2 h-2 rounded-full shadow-lg ${colors[color]}`} />
                    <h4 className={`text-sm font-bold tracking-tight ${active ? 'text-gray-900' : 'text-gray-700'}`}>{title}</h4>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                    <MapPin size={10} />
                    <p className="text-[10px] font-bold uppercase tracking-widest">{loc}</p>
                </div>
            </div>
        </div>
    );
}
