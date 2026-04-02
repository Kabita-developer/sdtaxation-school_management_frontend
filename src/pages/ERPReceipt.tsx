import React, { useState } from 'react';
import {
    Plus,
    Search,
    Filter,
    Receipt as ReceiptIcon,
    MoreVertical,
    Edit,
    Trash2,
    Calendar,
    Save,
    X,
    TrendingUp,
    CheckCircle2,
    Clock,
    FileText,
    ChevronRight,
    ArrowDownLeft
} from 'lucide-react';

const ERPReceipt = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const [receipts, setReceipts] = useState([
        { id: 'REC-25001', date: '31/03/2025', ledger: 'Student Fees A/c', amount: '₹12,500', method: 'Cash', status: 'Verified' },
        { id: 'REC-25002', date: '31/03/2025', ledger: 'Sponsorship Fund', amount: '₹85,000', method: 'Bank Transfer', status: 'Pending' },
        { id: 'REC-25003', date: '30/03/2025', ledger: 'Library Fine A/c', amount: '₹450', method: 'Cash', status: 'Verified' },
        { id: 'REC-25004', date: '29/03/2025', ledger: 'Security Deposit', amount: '₹5,000', method: 'UPI', status: 'Success' },
    ]);

    return (
        <div className="space-y-6 animate-in fade-in duration-700 text-left">
            {/* Premium Header / Hero */}
            <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
                <div className="max-w-xl relative z-10">
                   <div className="inline-flex items-center px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100 text-[9px] font-black uppercase tracking-[0.2em] text-indigo-600 mb-4">
                        Financial Inflow Gateway
                   </div>
                   <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tighter italic mb-2 leading-none">Receipt Entry Registry</h1>
                   <p className="text-[11px] text-gray-500 font-medium leading-relaxed opacity-80">
                      Process institutional income, student fees, and institutional grants through our high-performance ledger posting engine.
                   </p>
                </div>
                <div className="shrink-0 relative z-10 hidden lg:block">
                   <div className="w-20 h-20 bg-indigo-600 rounded-2xl rotate-3 flex items-center justify-center shadow-2xl shadow-indigo-200">
                      <ReceiptIcon size={32} className="text-white -rotate-3" />
                   </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Entry Form - Left Side (4 Cols) */}
                <div className="lg:col-span-4">
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden sticky top-6">
                        <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
                                <h2 className="text-[10px] font-black text-gray-800 uppercase tracking-[0.2em] italic">Voucher Configuration</h2>
                            </div>
                            <button className="text-gray-400 hover:text-indigo-600 transition-colors">
                                <Settings size={14} />
                            </button>
                        </div>
                        <form className="p-6 space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Posting Date</label>
                                    <input type="date" className="w-full px-4 py-2.5 bg-gray-50 border border-transparent focus:bg-white focus:border-indigo-500 rounded-xl text-[11px] font-bold text-gray-700 transition-all outline-none" defaultValue="2025-03-31" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">V-ID Ref</label>
                                    <div className="w-full px-4 py-2.5 bg-gray-100/50 border border-gray-100 rounded-xl text-[11px] font-black text-indigo-600 uppercase italic">Auto-Generate</div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Credit Ledger (Income Source)</label>
                                <div className="relative">
                                    <select className="w-full px-4 py-2.5 bg-gray-50 border border-transparent focus:bg-white focus:border-indigo-500 rounded-xl text-[11px] font-bold text-gray-700 transition-all outline-none appearance-none cursor-pointer">
                                        <option>Select Target Account</option>
                                        <option>Student Fees A/c</option>
                                        <option>Academy Development Fund</option>
                                        <option>Library Fine A/c</option>
                                        <option>Hostal Maintenance</option>
                                    </select>
                                    <ChevronRight size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none rotate-90" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Amount Released</label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-600 font-bold text-xs">₹</div>
                                        <input type="number" placeholder="0.00" className="w-full pl-8 pr-4 py-2.5 bg-gray-50 border border-transparent focus:bg-white focus:border-indigo-500 rounded-xl text-[11px] font-black text-gray-700 transition-all outline-none" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Settlement A/c</label>
                                    <div className="relative">
                                        <select className="w-full px-4 py-2.5 bg-gray-50 border border-transparent focus:bg-white focus:border-indigo-500 rounded-xl text-[11px] font-bold text-gray-700 transition-all outline-none appearance-none cursor-pointer">
                                            <option>Cash Account</option>
                                            <option>HDFC Current A/c</option>
                                            <option>SBI Main A/c</option>
                                            <option>Petty Cash</option>
                                        </select>
                                        <ChevronRight size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none rotate-90" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1 text-left">Transactional Narration</label>
                                <textarea rows={2} placeholder="Detailed context..." className="w-full px-4 py-3 bg-gray-50 border border-transparent focus:bg-white focus:border-indigo-500 rounded-xl text-[11px] font-medium text-gray-600 transition-all outline-none shadow-inner resize-none" />
                            </div>

                            <div className="pt-2">
                                <button className="w-full py-3 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center space-x-2 active:scale-[0.98]">
                                    <Save size={16} />
                                    <span>Sync Voucher Entry</span>
                                </button>
                                <p className="text-center text-[8px] text-gray-400 font-black uppercase tracking-widest mt-4">Real-time ledger audit will be triggered</p>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Audit Trail - Right Side (8 Cols) */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                        {/* Table Header Section */}
                        <div className="px-8 py-6 border-b border-gray-50 flex flex-wrap items-center justify-between gap-6">
                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl shadow-sm shadow-indigo-50">
                                    <TrendingUp size={22} />
                                </div>
                                <div className="text-left">
                                    <h2 className="text-sm font-black text-gray-800 uppercase tracking-widest italic decoration-indigo-500/30 underline decoration-4 underline-offset-4">Institutional Audit Trail</h2>
                                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-1">Showing Active Session Postings</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="relative group">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={14} />
                                    <input
                                        type="text"
                                        placeholder="Search V-ID or Ledger..."
                                        className="pl-9 pr-4 py-2.5 bg-gray-50/80 border border-transparent rounded-xl text-[10px] font-bold text-gray-700 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all w-64 shadow-inner"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <button className="p-2.5 bg-white text-gray-400 hover:text-indigo-600 rounded-xl border border-gray-100 hover:border-indigo-100 shadow-sm transition-all active:scale-95">
                                    <Filter size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Audit Table */}
                        <div className="overflow-x-auto text-left">
                            <table className="w-full text-left border-separate border-spacing-0">
                                <thead>
                                    <tr className="bg-gray-50/50">
                                        <th className="px-8 py-5 text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50">Voucher Ref</th>
                                        <th className="px-8 py-5 text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50">Ledger Posting</th>
                                        <th className="px-10 py-5 text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50 text-center">Settlement</th>
                                        <th className="px-8 py-5 text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50">Inward Value</th>
                                        <th className="px-8 py-5 text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50 text-right pr-12">Controls</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {receipts.filter(r => r.ledger.toLowerCase().includes(searchTerm.toLowerCase())).map((receipt) => (
                                        <tr key={receipt.id} className="hover:bg-indigo-50/30 transition-all group">
                                            <td className="px-8 py-6">
                                                <div className="flex flex-col">
                                                    <span className="text-[11px] font-black font-mono text-indigo-600 tracking-tighter">{receipt.id}</span>
                                                    <div className="flex items-center mt-1.5 text-[9px] text-gray-400 font-bold uppercase italic tracking-widest opacity-60">
                                                        <Calendar size={10} className="mr-1" /> {receipt.date}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex flex-col">
                                                    <span className="text-[12px] font-black text-gray-900 uppercase tracking-tight italic bg-white inline-block">{receipt.ledger}</span>
                                                    <span className="text-[9px] text-indigo-400 font-black uppercase tracking-widest mt-1">Receipt Class Posting</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-center">
                                                <div className="flex flex-col items-center justify-center">
                                                    <span className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-[9px] font-black text-gray-500 uppercase tracking-widest shadow-sm group-hover:border-indigo-100 group-hover:text-indigo-600 group-hover:shadow-indigo-50 transition-all">{receipt.method}</span>
                                                    <div className="flex items-center mt-2">
                                                        {receipt.status === 'Verified' ? <CheckCircle2 size={11} className="text-emerald-500 mr-1.5" /> : <Clock size={11} className="text-amber-500 mr-1.5" />}
                                                        <span className={`text-[8px] font-black uppercase tracking-widest ${receipt.status === 'Verified' ? 'text-emerald-500' : 'text-amber-500'}`}>{receipt.status}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-black text-gray-900 leading-none italic tracking-tighter">{receipt.amount}</span>
                                                    <div className="flex items-center mt-1.5 text-[9px] font-black text-emerald-500 uppercase tracking-widest">
                                                       <ArrowDownLeft size={10} className="mr-1" /> Credited
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-right pr-12">
                                                <div className="flex items-center justify-end space-x-1 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                                                    <button className="p-2 text-gray-400 hover:text-indigo-600 rounded-xl hover:bg-white border border-transparent hover:border-gray-100 transition-all shadow-hover">
                                                        <Edit size={16} />
                                                    </button>
                                                    <button className="p-2 text-gray-400 hover:text-rose-600 rounded-xl hover:bg-white border border-transparent hover:border-gray-100 transition-all shadow-hover">
                                                        <Trash2 size={16} />
                                                    </button>
                                                    <button className="p-2 text-gray-400 hover:text-gray-900 rounded-xl transition-all">
                                                        <MoreVertical size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Table Footer */}
                        <div className="px-8 py-5 bg-gray-50/50 border-t border-gray-50 flex items-center justify-between">
                            <div className="flex items-center space-x-2 overflow-hidden">
                                <FileText size={14} className="text-indigo-400 shrink-0" />
                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest italic truncate">Institutional Ledger Ledger Sync Status: Online & Secured</p>
                            </div>
                            <button className="shrink-0 text-[9px] font-black text-indigo-600 border border-indigo-100 px-4 py-1.5 rounded-full bg-white hover:bg-indigo-600 hover:text-white transition-all uppercase tracking-widest shadow-sm">
                                Export Audit Log
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ERPReceipt;
