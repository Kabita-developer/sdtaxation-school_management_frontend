import { useState, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import {
    X,
    ChevronDown,
    Calendar
} from 'lucide-react';

const ERPReceipt = () => {
    const { theme } = useTheme();
    const dateInputRef = useRef<HTMLInputElement>(null);
    const [selectedDate, setSelectedDate] = useState("2026-03-31");
    const [rows] = useState([
        { id: 1, particulars: '', amount: '' }
    ]);

    return (
        <div className="min-h-screen bg-[#dce1de] flex flex-col animate-in fade-in duration-500 overflow-hidden font-sans">
            <div className="flex-1 flex overflow-hidden">
                {/* ── Main Voucher Canvas ── */}
                <div className="flex-1 flex flex-col bg-[#e9f0ea] relative">
                    
                    {/* Voucher Header Bar */}
                    <div className={`bg-${theme.colors.primary} px-4 py-1.5 flex items-center justify-between shadow-sm`}>
                        <span className="text-sm font-medium text-white uppercase tracking-tight">Accounting voucher creation</span>
                        <div className="flex items-center space-x-3">
                            <span className="text-sm font-medium text-white tracking-tight">Mansarovar the school betul (2025-26)</span>
                        </div>
                    </div>

                    {/* Voucher Body Scroll Area */}
                    <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                        
                        {/* Receipt Meta Row */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className={`bg-${theme.colors.primary} border-2 border-[#007b83] px-8 py-0.5 shadow-sm`}>
                                    <span className="text-sm font-medium text-white italic">Receipt</span>
                                </div>
                                <div className="ml-4 flex items-center space-x-4">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm font-medium text-gray-700">No.</span>
                                        <div className="relative group">
                                            <div className="flex items-center border-2 border-[#007b83] rounded px-2 py-0.5 bg-white min-w-[100px]">
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

                                    {/* Date Field */}
                                    <div className="flex items-center">
                                        <div className={`bg-${theme.colors.primary} border-2 border-[#007b83] px-8 py-0.5 shadow-sm`}>
                                            <span className="text-sm font-medium text-white italic">Date</span>
                                        </div>
                                        <div className="ml-2 flex items-center border-2 border-[#007b83] rounded px-2 py-0.5 bg-white min-w-[120px] relative">
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
                                                className="text-teal-700 ml-1 cursor-pointer hover:text-teal-500 transition-colors"
                                                onClick={() => dateInputRef.current?.showPicker()}
                                            >
                                                <Calendar size={14} />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* Account Selection and Payment Type */}
                        <div className="space-y-3 max-w-xl">

                            <div className="flex items-center">
                                <div className={`bg-${theme.colors.primary} border-2 border-[#007b83] px-6 py-0.5 shadow-sm`}>
                                    <span className="text-sm font-medium text-white italic">Payment Type</span>
                                </div>
                                <div className="ml-2 flex-none relative group min-w-[300px]">
                                    <div className={`flex items-center border-2 border-[#007b83] rounded px-2 py-0.5 bg-white shadow-sm`}>
                                        <select className="w-full bg-transparent border-none focus:ring-0 text-sm font-medium p-0 text-gray-900 outline-none appearance-none cursor-pointer pr-4">
                                            <option value="cash">Cash</option>
                                            <option value="bank">Bank</option>
                                        </select>
                                        <div className="text-gray-400 ml-1">
                                            <ChevronDown size={14} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-[100px_min-content_1fr] items-center">
                                <label className="text-sm font-medium text-gray-600 italic leading-none ml-2">Cur bal</label>
                                <span className="mx-2 text-gray-900 leading-none">:</span>
                                <span className="text-sm font-medium text-gray-900">₹ 45,250.00 Cr</span>
                            </div>
                        </div>

                        {/* Particulars Entry Area */}
                        <div className="border border-gray-400 bg-white min-h-[400px] flex flex-col">
                            <table className="w-full border-collapse">
                                <thead className="border-b border-gray-400">
                                    <tr>
                                        <th className="px-4 py-1 text-left text-sm font-medium text-gray-900 border-r border-gray-400">Particulars</th>
                                        <th className="px-4 py-1 text-right text-sm font-medium text-gray-900 w-48">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 flex-1">
                                    {rows.map((row) => (
                                        <tr key={row.id}>
                                            <td className="px-4 py-1.5 border-r border-gray-400 font-medium text-sm text-gray-900">
                                                <input 
                                                    type="text" 
                                                    className="w-full bg-transparent border-none focus:ring-0 text-sm font-medium p-0"
                                                />
                                            </td>
                                            <td className="px-4 py-1.5 text-right font-medium text-sm text-gray-900">
                                                <input 
                                                    type="number" 
                                                    className="w-full bg-transparent border-none focus:ring-0 text-right text-sm font-medium p-0"
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                    {/* Empty lines to fill space */}
                                    {[...Array(12)].map((_, i) => (
                                        <tr key={`empty-${i}`}>
                                            <td className="px-4 py-3 border-r border-gray-400"></td>
                                            <td className="px-4 py-3"></td>
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

export default ERPReceipt;
