import React, { useState } from 'react';
import {
    Plus,
    Search,
    Filter,
    BookOpen,
    MoreVertical,
    Edit,
    Trash2,
    Calendar,
    ChevronRight,
    Save,
    X,
} from 'lucide-react';

const AccountLedgers = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const [ledgers, setLedgers] = useState([
        { id: 'LD-1021', name: 'State Bank of India', group: 'Bank Accounts', balance: '₹12,45,000', type: 'Debit', status: 'Active' },
        { id: 'LD-1025', name: 'Petty Cash', group: 'Cash-in-Hand', balance: '₹15,000', type: 'Debit', status: 'Active' },
        { id: 'LD-1028', name: 'Software Licenses', group: 'Fixed Assets', balance: '₹8,50,000', type: 'Debit', status: 'Active' },
        { id: 'LD-1032', name: 'Accrued Rent', group: 'Current Liabilities', balance: '₹45,000', type: 'Credit', status: 'Active' },
        { id: 'LD-1035', name: 'Sales Revenue', group: 'Direct Incomes', balance: '₹22,12,000', type: 'Credit', status: 'Active' },
    ]);

    return (
        <div className="space-y-6 animate-in fade-in duration-500 text-left">
            {/* Header */}
            <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center space-x-4">
                    <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                        <BookOpen size={24} />
                    </div>
                    <div>
                        <h1 className="text-xl font-black text-gray-900 uppercase tracking-tight italic">Ledger Registry Configuration</h1>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">General Ledger Accounts & Opening Balances</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Form Section - Left Side */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-6">
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center space-x-2">
                            <Plus size={18} className="text-purple-600" />
                            <h2 className="text-xs font-black text-gray-800 uppercase tracking-widest italic">{isEditing ? 'Modify Ledger Master' : 'Initialize New Ledger'}</h2>
                        </div>
                        <form className="p-6 space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Ledger Identification</label>
                                <input
                                    type="text"
                                    placeholder="e.g. HDFC Bank A/c"
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all uppercase placeholder:normal-case"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Account Group Linkage</label>
                                <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none">
                                    <option>Select Group Registry</option>
                                    <option>Bank Accounts</option>
                                    <option>Cash-in-Hand</option>
                                    <option>Direct Incomes</option>
                                    <option>Indirect Expenses</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Opening Amount</label>
                                    <input
                                        type="number"
                                        placeholder="0.00"
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Balance Flow</label>
                                    <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none">
                                        <option>Debit</option>
                                        <option>Credit</option>
                                    </select>
                                </div>
                            </div>

                            <div className="pt-4 flex items-center space-x-3">
                                <button className="flex-1 py-1.5 bg-purple-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-purple-700 transition-all shadow-lg shadow-purple-200 flex items-center justify-center space-x-2">
                                    <Save size={14} />
                                    <span>Sync Registry</span>
                                </button>
                                <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-1.5 border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:bg-gray-50 transition-all">
                                    <X size={14} />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Table Section - Right Side */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-8 py-6 border-b border-gray-50 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center space-x-3">
                                <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
                                    <Search size={20} />
                                </div>
                                <h2 className="text-sm font-black text-gray-800 uppercase tracking-widest italic decoration-purple-500/30 underline decoration-4 underline-offset-4">Existing Ledger Registry</h2>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                                    <input
                                        type="text"
                                        placeholder="Search Ledger Name..."
                                        className="pl-9 pr-4 py-2 bg-gray-50/50 border border-gray-200 rounded-xl text-[11px] font-bold text-gray-700 outline-none focus:bg-white focus:border-purple-500 transition-all w-64 shadow-inner"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <button className="p-2.5 bg-gray-50 text-gray-400 hover:text-purple-600 rounded-xl border border-gray-100 transition-all">
                                    <Filter size={16} />
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-separate border-spacing-0">
                                <thead>
                                    <tr className="bg-gray-50/50">
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-gray-50">Log Reference</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-gray-50">Ledger Classification</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-gray-50 text-center">Nexus Group</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-gray-50">Current Valuation</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-gray-50 text-right pr-12">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {ledgers.filter(l => l.name.toLowerCase().includes(searchTerm.toLowerCase())).map((ledger) => (
                                        <tr key={ledger.id} className="hover:bg-purple-50/20 transition-all group">
                                            <td className="px-8 py-5">
                                                <div className="flex flex-col">
                                                    <span className="text-[11px] font-mono font-black text-purple-600">{ledger.id}</span>
                                                    <div className="flex items-center mt-1 text-[9px] text-gray-400 font-bold uppercase italic">
                                                        <Calendar size={10} className="mr-1" /> Mar 2025
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                                                    <span className="text-xs font-black text-gray-900 uppercase tracking-wide italic">{ledger.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-center">
                                                <span className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-[9px] font-black text-gray-400 uppercase tracking-widest group-hover:border-purple-100 group-hover:text-purple-600">{ledger.group}</span>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-black text-gray-900 leading-tight">{ledger.balance}</span>
                                                    <span className={`text-[9px] font-black uppercase tracking-widest ${ledger.type === 'Debit' ? 'text-emerald-500' : 'text-rose-500'}`}>{ledger.type} Flow</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-right pr-12">
                                                <div className="flex items-center justify-end space-x-2">
                                                    <button onClick={() => setIsEditing(true)} className="p-2 text-gray-400 hover:text-purple-600 rounded-lg hover:bg-white transition-all shadow-inner hover:shadow-sm">
                                                        <Edit size={14} />
                                                    </button>
                                                    <button className="p-2 text-gray-400 hover:text-rose-600 rounded-lg hover:bg-white transition-all shadow-inner hover:shadow-sm">
                                                        <Trash2 size={14} />
                                                    </button>
                                                    <button className="p-2 text-gray-400 hover:text-gray-900 rounded-lg transition-all">
                                                        <MoreVertical size={14} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="px-8 py-5 bg-gray-50/50 border-t border-gray-50 flex items-center justify-between">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">Total Active Ledgers: {ledgers.length}</p>
                            <div className="flex space-x-1">
                                <button className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-[10px] font-black text-purple-600 shadow-sm">1</button>
                                <button className="px-3 py-1 text-[10px] font-black text-gray-400">2</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountLedgers;
