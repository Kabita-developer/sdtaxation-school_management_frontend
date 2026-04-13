import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { 
    Bell, 
    Save, 
    Clock, 
    AlertCircle, 
    CheckCircle2,
    Settings2,
    CalendarDays
} from 'lucide-react';

const FeesReminder = () => {
    const { theme } = useTheme();
    
    // State for reminder settings
    const [reminders, setReminders] = useState([
        { id: 1, type: 'Before', days: '2', active: false },
        { id: 2, type: 'Before', days: '5', active: false },
        { id: 3, type: 'After', days: '2', active: false },
        { id: 4, type: 'After', days: '5', active: false },
    ]);

    const handleToggle = (id: number) => {
        setReminders(prev => prev.map(r => r.id === id ? { ...r, active: !r.active } : r));
    };

    const handleDaysChange = (id: number, val: string) => {
        setReminders(prev => prev.map(r => r.id === id ? { ...r, days: val } : r));
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700 font-sans">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Fees Reminder</h1>
                    <p className="text-gray-900 text-sm mt-1 font-medium italic italic">Automate payment notifications for parents and students</p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto">
                {/* Main Card */}
                <div className="bg-white rounded-[2rem] shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden transform transition-all duration-300">
                    <div className="px-10 py-6 border-b border-gray-100 bg-gray-50/30 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-purple-600 text-white rounded-2xl shadow-lg shadow-purple-200">
                                <Bell size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-800 tracking-tight leading-none mb-1">Reminder Configuration</h2>
                                <p className="text-xs font-bold text-gray-400 tracking-wide">Set your notification schedule</p>
                            </div>
                        </div>
                        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-xl border border-purple-100">
                            <Settings2 size={16} className="text-purple-600" />
                            <span className="text-xs font-bold text-purple-700">Auto-save active</span>
                        </div>
                    </div>

                    <div className="p-0 overflow-x-auto min-h-[350px]">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-[#fcfdff] border-y border-gray-100">
                                    <th className="px-10 py-5 text-left">
                                        <div className="flex items-center gap-2 text-xs font-bold text-gray-600 tracking-tight italic">
                                            <span>Action</span>
                                        </div>
                                    </th>
                                    <th className="px-10 py-5 text-left">
                                        <div className="flex items-center gap-2 text-xs font-bold text-gray-600 tracking-tight italic">
                                            <CalendarDays size={14} className="text-purple-400" />
                                            <span>Reminder type</span>
                                        </div>
                                    </th>
                                    <th className="px-10 py-5 text-left">
                                        <div className="flex items-center gap-2 text-xs font-bold text-gray-600 tracking-tight italic">
                                            <Clock size={14} className="text-purple-400" />
                                            <span>Days</span>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {reminders.map((row) => (
                                    <tr key={row.id} className={`group transition-all duration-200 ${row.active ? 'bg-purple-50/30' : 'hover:bg-gray-50'}`}>
                                        <td className="px-10 py-6">
                                            <label className="flex items-center gap-4 cursor-pointer">
                                                <div className="relative flex items-center">
                                                    <input 
                                                        type="checkbox" 
                                                        checked={row.active}
                                                        onChange={() => handleToggle(row.id)}
                                                        className="peer h-6 w-12 cursor-pointer appearance-none rounded-full border-2 border-gray-200 bg-gray-100 checked:bg-purple-600 checked:border-purple-600 transition-all after:absolute after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all checked:after:translate-x-6"
                                                    />
                                                </div>
                                                <span className={`text-sm font-bold tracking-tight transition-colors ${row.active ? 'text-purple-700' : 'text-gray-500'}`}>Active</span>
                                            </label>
                                        </td>
                                        <td className="px-10 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className={`p-1.5 rounded-lg ${row.type === 'Before' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'}`}>
                                                    <Clock size={14} />
                                                </div>
                                                <span className="text-sm font-bold text-gray-700">{row.type}</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-6">
                                            <div className="relative group/input max-w-[200px]">
                                                <input 
                                                    type="text" 
                                                    value={row.days}
                                                    onChange={(e) => handleDaysChange(row.id, e.target.value)}
                                                    className={`w-full px-4 py-2.5 bg-[#fcfdff] border border-gray-200 rounded-xl text-sm font-bold text-gray-900 focus:border-purple-600 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all shadow-sm ${row.active ? 'border-purple-200 bg-white' : ''}`}
                                                />
                                                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-300">
                                                    <span className="text-[10px] font-bold italic">Days</span>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer Info */}
                    <div className="px-10 py-4 bg-blue-50/50 border-y border-blue-100 flex items-start gap-4 mx-10 my-4 rounded-2xl">
                         <div className="p-2 bg-white rounded-xl text-blue-600 shadow-sm"><CheckCircle2 size={20} /></div>
                         <div className="text-left">
                             <h4 className="text-sm font-bold text-slate-900">How reminders work?</h4>
                             <p className="text-xs text-slate-800 leading-relaxed font-medium italic italic italic">Reminders will be sent automatically based on the Due Date of each fee group. "Before" reminders notify parents ahead of time, while "After" reminders act as follow-ups for late payments.</p>
                         </div>
                    </div>

                    {/* Table Footer / Action */}
                    <div className="px-10 py-8 bg-gray-50/30 flex justify-end gap-3 border-t border-gray-50">
                        <button className="flex items-center gap-2 px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold rounded-2xl shadow-xl shadow-purple-200 transition-all active:scale-90 active:shadow-none group">
                            <Save size={18} className="group-hover:rotate-12 transition-transform" />
                            <span>Save Reminder Settings</span>
                        </button>
                    </div>
                </div>

                {/* Status Indicator */}
                <div className="mt-8 p-6 bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/50 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
                            <AlertCircle size={24} />
                        </div>
                        <div className="text-left">
                            <h3 className="text-md font-bold text-gray-900 italic italic">Current Notification Status</h3>
                            <p className="text-xs text-gray-500 font-medium">All automated emails and SMS are currently being routed through the global gateway.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="flex h-3 w-3 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </span>
                        <span className="text-xs font-bold text-emerald-600 tracking-widest italic">Live system active</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeesReminder;
