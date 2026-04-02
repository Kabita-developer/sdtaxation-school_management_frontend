import { useState } from 'react';
import {
    Save,
    Calendar,
    Settings2,
    ArrowRight,
    Copy,
    Info,
    ChevronRight,
    Clock,
    Percent,
    DollarSign
} from 'lucide-react';

const months = [
    "April", "May", "June", "July", "August", "September", 
    "October", "November", "December", "January", "February", "March"
];

export default function FeesMaster() {
    const [copyAll, setCopyAll] = useState(false);
    
    // Mock state for month data
    const [monthData, setMonthData] = useState(
        months.map((month, index) => ({
            name: month,
            dueDate: `2025-${String((index + 4) > 12 ? (index - 8) : (index + 4)).padStart(2, '0')}-05`,
            fineType: 'None',
            percentage: '',
            fixAmount: ''
        }))
    );

    return (
        <div className="space-y-6 text-left animate-in fade-in duration-700">
            {/* Professional Header */}
            <div className="flex items-center justify-between bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="relative z-10 text-left">
                    <div className="inline-flex items-center px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100 text-[9px] font-black uppercase tracking-[0.2em] text-indigo-600 mb-3">
                        Financial Protocol v2.0
                    </div>
                    <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tighter italic leading-none">Transport Fees Master</h1>
                    <p className="text-[11px] text-gray-500 font-medium mt-2 max-w-md opacity-80 leading-relaxed text-left">
                        Define global transport billing cycles, due dates, and penalty structures for the active academic session.
                    </p>
                </div>
                <div className="shrink-0 hidden lg:block opacity-20">
                   <Settings2 size={80} className="text-indigo-600 rotate-12" />
                </div>
            </div>

            {/* Main Configuration Card */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden relative group transition-all">
                {/* Control Bar */}
                <div className="px-8 py-5 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                    <label className="flex items-center space-x-3 cursor-pointer group/label">
                        <div className="relative">
                            <input 
                                type="checkbox" 
                                checked={copyAll}
                                onChange={(e) => setCopyAll(e.target.checked)}
                                className="peer sr-only" 
                            />
                            <div className="w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-indigo-600 transition-all after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5 shadow-inner"></div>
                        </div>
                        <span className="text-[11px] font-black text-gray-600 uppercase tracking-widest group-hover/label:text-indigo-600 transition-colors italic">Copy First Fees Detail For All Months</span>
                    </label>
                    <div className="flex items-center space-x-2 text-indigo-600">
                        <Info size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Structural sync enabled</span>
                    </div>
                </div>

                {/* Months Grid / List */}
                <div className="p-8 space-y-4">
                    {monthData.map((data, idx) => (
                        <div key={data.name} className="flex flex-col lg:flex-row lg:items-center justify-between py-6 px-8 rounded-3xl border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all group/item relative overflow-hidden bg-white shadow-sm">
                            {/* Month Badge */}
                            <div className="lg:w-36 mb-4 lg:mb-0">
                                <span className="px-6 py-2.5 bg-gray-900 border border-gray-900 rounded-xl text-xs font-black text-white uppercase tracking-[0.2em] italic shadow-lg shadow-gray-200 group-hover/item:bg-indigo-600 group-hover/item:border-indigo-600 transition-all block text-center truncate">{data.name}</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 lg:flex lg:items-center gap-10 flex-1 lg:ml-16">
                                {/* Due Date Field */}
                                <div className="space-y-2.5">
                                    <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest ml-1 flex items-center">
                                        <Clock size={12} className="mr-2 text-indigo-600" /> Due Date
                                    </label>
                                    <div className="relative">
                                        <input 
                                            type="date" 
                                            defaultValue={data.dueDate}
                                            className="w-full lg:w-48 px-4 py-3 bg-gray-50 border border-gray-200 focus:bg-white focus:border-indigo-500 rounded-2xl text-[12px] font-bold text-gray-900 transition-all outline-none shadow-sm focus:ring-4 focus:ring-indigo-50"
                                        />
                                    </div>
                                </div>

                                {/* Fine Type Selection */}
                                <div className="space-y-2.5 flex-1 max-w-sm">
                                    <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest ml-1 flex items-center text-left">
                                        <Percent size={12} className="mr-2 text-indigo-600" /> Fine Protocol
                                    </label>
                                    <div className="flex items-center space-x-2">
                                        {['None', 'Percentage', 'Fix Amount'].map((type) => (
                                            <label key={type} className="flex-1 flex items-center cursor-pointer">
                                                <input 
                                                    type="radio" 
                                                    name={`fine-${data.name}`} 
                                                    checked={data.fineType === type}
                                                    onChange={() => {
                                                        const NewData = [...monthData];
                                                        NewData[idx].fineType = type;
                                                        setMonthData(NewData);
                                                    }}
                                                    className="peer sr-only" 
                                                />
                                                <div className="w-full py-2.5 text-center bg-gray-100 border border-gray-200 rounded-xl text-[9px] font-black uppercase tracking-widest text-gray-500 peer-checked:bg-indigo-600 peer-checked:border-indigo-600 peer-checked:text-white transition-all shadow-sm group-hover/item:border-indigo-200 group-hover/item:shadow-md">
                                                    {type === 'Fix Amount' ? 'Fixed' : type}
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Dynamic Values */}
                                <div className="space-y-2.5 lg:w-56">
                                    <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest ml-1 text-left block">
                                        Value Coefficient
                                    </label>
                                    <div className="relative group/input">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-600 font-bold text-[11px]">
                                            {data.fineType === 'Percentage' ? '%' : '₹'}
                                        </div>
                                        <input 
                                            type="number" 
                                            placeholder="0.00"
                                            disabled={data.fineType === 'None'}
                                            className="w-full px-4 py-3 pl-10 bg-gray-50 border border-gray-200 focus:bg-white focus:border-indigo-500 disabled:opacity-50 disabled:bg-gray-100 rounded-2xl text-[12px] font-black text-gray-900 transition-all outline-none shadow-sm focus:ring-4 focus:ring-indigo-50 placeholder:text-gray-400"
                                            defaultValue={data.fineType === 'Percentage' ? '10.00' : '3500.00'}
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            {/* Decorative Line */}
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-12 bg-indigo-100 rounded-full group-hover/item:bg-indigo-600 transition-all mr-2" />
                        </div>
                    ))}
                </div>

                {/* Global Actions Footer */}
                <div className="px-8 py-10 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-[11px] font-black text-gray-800 uppercase tracking-widest italic">Institutional Data Integrity Lock</span>
                        <span className="text-[10px] text-indigo-600 font-bold uppercase mt-1.5 flex items-center italic">
                            <Info size={14} className="mr-2" /> All modifications will be logged for financial audit
                        </span>
                    </div>
                    <button className="px-12 py-4 bg-gray-900 text-white rounded-2xl text-[12px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-gray-300 hover:bg-indigo-600 transition-all active:scale-95 flex items-center space-x-4 group text-left">
                        <Save size={20} className="group-hover:scale-110 transition-transform" />
                        <span>Update Master Record</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
