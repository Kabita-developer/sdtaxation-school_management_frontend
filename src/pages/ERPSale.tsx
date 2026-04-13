import { useState, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import {
    X,
    ChevronDown,
    Calendar
} from 'lucide-react';

const ERPSale = () => {
    const { theme, themeName } = useTheme();
    const dateInputRef = useRef<HTMLInputElement>(null);
    const [selectedDate, setSelectedDate] = useState("2026-03-31");

    return (
        <div className="min-h-screen bg-[#dce1de] flex flex-col animate-in fade-in duration-500 overflow-hidden font-sans">
            <div className="flex-1 flex overflow-hidden">
                {/* ── Main Voucher Canvas ── */}
                <div className="flex-1 flex flex-col bg-[#fff4e6] relative">
                    
                    {/* Voucher Header Bar */}
                    <div className={`${themeName === 'white' ? 'bg-gray-50 border border-gray-400' : `bg-${theme.colors.primary}`} px-4 py-1.5 flex items-center justify-between shadow-sm`}>
                        <span className={`text-sm font-medium ${themeName === 'white' ? 'text-black' : 'text-white'} uppercase tracking-tight`}>Accounting voucher creation</span>
                        <div className="flex items-center space-x-3">
                            <span className={`text-sm font-medium ${themeName === 'white' ? 'text-black' : 'text-white'} tracking-tight`}>Mansarovar the school betul (2025-26)</span>
                        </div>
                    </div>

                    {/* Voucher Body Scroll Area */}
                    <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                        
                        {/* Sale Meta Row */}
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center">
                                <div className={`${themeName === 'white' ? 'bg-white border border-gray-400' : `bg-${theme.colors.primary} border-2 border-[#007b83]`} px-4 shadow-sm rounded min-w-[140px] h-8 flex items-center justify-center`}>
                                    <span className={`text-sm font-medium ${themeName === 'white' ? 'text-black' : 'text-white'} italic whitespace-nowrap`}>Sale No.</span>
                                </div>
                                <div className="ml-2 relative group">
                                    <div className={`flex items-center ${themeName === 'white' ? 'border border-gray-400' : 'border-2 border-[#007b83]'} rounded px-2 bg-white min-w-[100px] h-8`}>
                                        <input 
                                            type="text" 
                                            defaultValue="1148"
                                            className="w-full bg-transparent border-none focus:ring-0 text-sm font-medium p-0 text-gray-900 outline-none"
                                        />
                                        <div className="flex items-center space-x-1 ml-1 text-gray-400">
                                            <X size={12} className="cursor-pointer hover:text-gray-600" />
                                            <ChevronDown size={14} className="cursor-pointer hover:text-gray-600" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4 ml-auto">
                                {/* Ref Field */}
                                <div className="flex items-center">
                                    <div className={`${themeName === 'white' ? 'bg-white border border-gray-400' : `bg-${theme.colors.primary} border-2 border-[#007b83]`} px-8 shadow-sm rounded h-8 flex items-center justify-center`}>
                                        <span className={`text-sm font-medium ${themeName === 'white' ? 'text-black' : 'text-white'} italic`}>Ref.</span>
                                    </div>
                                    <div className={`ml-2 flex items-center ${themeName === 'white' ? 'border border-gray-400' : 'border-2 border-[#007b83]'} rounded px-2 bg-white min-w-[150px] h-8`}>
                                        <input 
                                            type="text" 
                                            className="w-full bg-transparent border-none focus:ring-0 text-sm font-medium p-0 text-gray-900 outline-none"
                                        />
                                    </div>
                                </div>

                                {/* Date Field */}
                                <div className="flex items-center">
                                    <div className={`${themeName === 'white' ? 'bg-white border border-gray-400' : `bg-${theme.colors.primary} border-2 border-[#007b83]`} px-8 shadow-sm rounded h-8 flex items-center justify-center`}>
                                        <span className={`text-sm font-medium ${themeName === 'white' ? 'text-black' : 'text-white'} italic`}>Date</span>
                                    </div>
                                    <div className={`ml-2 flex items-center ${themeName === 'white' ? 'border border-gray-400' : 'border-2 border-[#007b83]'} rounded px-2 bg-white w-[240px] h-8 relative`}>
                                        <input 
                                            type="text" 
                                            value={new Date(selectedDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-')}
                                            readOnly
                                            className="w-full bg-transparent border-none focus:ring-0 text-sm font-medium p-0 text-gray-900 outline-none cursor-pointer"
                                            onClick={() => dateInputRef.current?.showPicker()}
                                        />
                                        <input 
                                            ref={dateInputRef}
                                            type="date"
                                            value={selectedDate}
                                            onChange={(e) => setSelectedDate(e.target.value)}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer pointer-events-none"
                                        />
                                        <div 
                                            className={`${themeName === 'white' ? 'text-gray-400' : 'text-teal-700'} ml-1 cursor-pointer hover:text-teal-500 transition-colors`}
                                            onClick={() => dateInputRef.current?.showPicker()}
                                        >
                                            <Calendar size={14} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sale Meta Fields */}
                        <div className="space-y-3">
                            {/* Party's A/c Name & Sale ledger on the same row */}
                            <div className="flex items-center space-x-12">
                                {/* Party's A/c Name */}
                                <div className="flex items-center w-[500px]">
                                    <div className={`${themeName === 'white' ? 'bg-white border border-gray-400' : `bg-${theme.colors.primary} border-2 border-[#007b83]`} px-4 shadow-sm w-44 flex-none rounded h-8 flex items-center justify-center`}>
                                        <span className={`text-sm font-medium ${themeName === 'white' ? 'text-black' : 'text-white'} italic whitespace-nowrap`}>Party's A/c Name</span>
                                    </div>
                                    <div className="ml-2 flex-1 relative group">
                                        <div className={`flex items-center ${themeName === 'white' ? 'border border-gray-400' : 'border-2 border-[#007b83]'} rounded px-2 bg-white shadow-sm h-8`}>
                                            <input 
                                                type="text" 
                                                className="w-full bg-transparent border-none focus:ring-0 text-sm font-medium p-0 text-gray-900 outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Sale ledger */}
                                <div className="flex items-center w-[400px]">
                                    <div className={`${themeName === 'white' ? 'bg-white border border-gray-400' : `bg-${theme.colors.primary} border-2 border-[#007b83]`} px-4 shadow-sm w-44 flex-none rounded h-8 flex items-center justify-center`}>
                                        <span className={`text-sm font-medium ${themeName === 'white' ? 'text-black' : 'text-white'} italic whitespace-nowrap`}>Sale ledger</span>
                                    </div>
                                    <div className="ml-2 flex-1 relative group">
                                        <div className={`flex items-center ${themeName === 'white' ? 'border border-gray-400' : 'border-2 border-[#007b83]'} rounded px-2 bg-white shadow-sm h-8`}>
                                            <input 
                                                type="text" 
                                                className="w-full bg-transparent border-none focus:ring-0 text-sm font-medium p-0 text-gray-900 outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Current Balance */}
                            <div className="flex items-center">
                                <div className={`${themeName === 'white' ? 'bg-white border border-gray-400' : `bg-${theme.colors.primary} border-2 border-[#007b83]`} px-4 shadow-sm w-44 flex-none rounded h-8 flex items-center justify-center`}>
                                    <span className={`text-sm font-medium ${themeName === 'white' ? 'text-black' : 'text-white'} italic whitespace-nowrap`}>Cur Bal</span>
                                </div>
                                <div className="ml-2 flex-none relative group min-w-[180px]">
                                    <div className={`flex items-center ${themeName === 'white' ? 'border border-gray-400' : 'border-2 border-[#007b83]'} rounded px-2 bg-white shadow-sm h-8`}>
                                        <input 
                                            type="text" 
                                            defaultValue="₹ 8,75,420.00 Cr"
                                            className="w-full bg-transparent border-none focus:ring-0 text-sm font-medium p-0 text-gray-900 outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Particulars Entry Area */}
                        <div className="border border-gray-400 bg-white min-h-[400px] flex flex-col">
                            <table className="w-full border-collapse">
                                <thead className="border-b border-gray-400">
                                    <tr>
                                        <th className="px-4 py-1 text-left text-sm font-medium text-gray-900 border-r border-gray-400">Particulars</th>
                                        <th className="px-4 py-1 text-right text-sm font-medium text-gray-900 w-32 border-r border-gray-400">Rate per</th>
                                        <th className="px-4 py-1 text-right text-sm font-medium text-gray-900 w-32">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 flex-1">
                                    {/* Active and Empty Rows with Inputs */}
                                    {[...Array(13)].map((_, i) => (
                                        <tr key={i} className="group hover:bg-gray-50/50 transition-colors">
                                            <td className="border-r border-gray-400 font-medium text-sm text-gray-900 h-8">
                                                <input 
                                                    type="text" 
                                                    className="w-full h-full bg-transparent border-none focus:ring-1 focus:ring-inset focus:ring-[#007b83]/30 text-sm font-medium px-4 py-0 outline-none"
                                                />
                                            </td>
                                            <td className="border-r border-gray-400 text-right font-medium text-sm text-gray-900 h-8">
                                                <input 
                                                    type="number" 
                                                    className="w-full h-full bg-transparent border-none focus:ring-1 focus:ring-inset focus:ring-[#007b83]/30 text-right text-sm font-medium px-4 py-0 outline-none"
                                                />
                                            </td>
                                            <td className="text-right font-medium text-sm text-gray-900 h-8">
                                                <input 
                                                    type="number" 
                                                    className="w-full h-full bg-transparent border-none focus:ring-1 focus:ring-inset focus:ring-[#007b83]/30 text-right text-sm font-medium px-4 py-0 outline-none"
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Narration Section */}
                        <div className="grid grid-cols-[100px_min-content_1fr] items-center pt-6">
                            <label className="text-sm font-medium text-gray-900">Narration</label>
                            <span className="mx-2 text-gray-900">:</span>
                            <div className="flex-1">
                                <input 
                                    type="text"
                                    placeholder="Enter narrative details..."
                                    className="w-full bg-white border border-[#007b83]/30 rounded px-3 py-1.5 text-sm font-medium focus:border-[#007b83] focus:ring-1 focus:ring-[#007b83] outline-none transition-all placeholder:text-gray-400 shadow-sm"
                                />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-300 mt-4">
                            <button className="px-6 py-1.5 border border-red-500 text-red-600 text-sm font-medium rounded hover:bg-red-50 transition-colors">
                                Cancel
                            </button>
                            <button className={`px-8 py-1.5 bg-${theme.colors.primary} text-white text-sm font-medium rounded shadow-sm hover:bg-${theme.colors.primaryDark} transition-colors`}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ERPSale;
