import React, { useState } from 'react';
import {
    Plus,
    Search,
    Filter,
    CreditCard,
    MoreVertical,
    Edit,
    Trash2,
    Calendar,
    Save,
    X,
    Wallet,
    ArrowUpRight,
    CheckCircle2,
    Clock,
    FileText,
    Activity
} from 'lucide-react';

const ERPPayment = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const [payments, setPayments] = useState([
        { id: 'PAY-25001', date: '31/03/2025', ledger: 'Campus Electricity Board', amount: '₹45,600', method: 'Bank Transfer', status: 'Success' },
        { id: 'PAY-25002', date: '31/03/2025', ledger: 'Staff Salary A/c', amount: '₹14,50,000', method: 'Direct Bank', status: 'Pending' },
        { id: 'PAY-25003', date: '30/03/2025', ledger: 'Stationery Supplies', amount: '₹8,450', method: 'Petty Cash', status: 'Verified' },
        { id: 'PAY-25004', date: '29/03/2025', ledger: 'Internet Service Prov.', amount: '₹5,200', method: 'UPI', status: 'Verified' },
    ]);

    return (
        <div className="space-y-6 animate-in fade-in duration-500 text-left">
            {/* Header */}
            <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center space-x-4">
                    <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
                        <CreditCard size={24} />
                    </div>
                    <div>
                        <h1 className="text-xl font-black text-gray-900 uppercase tracking-tight italic">Disbursement Control Gateway</h1>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Transaction Capture & Outward Posting</p>
                    </div>
                </div>
                <div className="hidden md:flex items-center space-x-6">
                    <div className="text-right">
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Today's Outflow</p>
                        <p className="text-lg font-black text-rose-600 uppercase italic leading-none">₹15,09,250</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                         <ArrowUpRight className="text-rose-500" size={20} />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Transaction Entry Form - Left Side */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-6">
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center space-x-2">
                            <Plus size={18} className="text-rose-500" />
                            <h2 className="text-xs font-black text-gray-800 uppercase tracking-widest italic">{isEditing ? 'Modify Payment Protocol' : 'Post New Outward Voucher'}</h2>
                        </div>
                        <form className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 text-left">Log Date</label>
                                    <input type="date" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-500" defaultValue="2025-03-31" />
                                </div>
                                <div className="space-y-1.5 text-left">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Voucher ID</label>
                                    <input type="text" placeholder="PAY-25005" className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-xl text-xs font-black text-rose-600 outline-none cursor-not-allowed uppercase" readOnly />
                                </div>
                            </div>

                            <div className="space-y-1.5 text-left">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Debit Ledger (Recipient)</label>
                                <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-500 appearance-none">
                                    <option>Select Target Entity</option>
                                    <option>Staff Salary A/c</option>
                                    <option>Vendor Marketplace</option>
                                    <option>Utility Board A/c</option>
                                    <option>Misc Expenses</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-left">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 text-left">Amount Released</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₹</span>
                                        <input type="number" placeholder="0.00" className="w-full pl-8 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-black text-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-500" />
                                    </div>
                                </div>
                                <div className="space-y-1.5 text-left">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Fund Source</label>
                                    <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-500 appearance-none">
                                        <option>Main Bank A/c</option>
                                        <option>Petty Cash</option>
                                        <option>Secondary Reserve</option>
                                        <option>HDFC Current A/c</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-1.5 text-left">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Transactional Context</label>
                                <textarea rows={2} placeholder="Justification..." className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all shadow-inner" />
                            </div>

                            <div className="pt-4 flex items-center space-x-3">
                                <button className="flex-1 py-1.5 bg-rose-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-700 transition-all shadow-lg shadow-rose-200 flex items-center justify-center space-x-2">
                                    <Save size={14} />
                                    <span>Sync Voucher</span>
                                </button>
                                <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-1.5 border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:bg-gray-50 transition-all">
                                    <X size={14} />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Disbursement Audit - Right Side */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-8 py-6 border-b border-gray-50 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center space-x-3 text-left">
                                <div className="p-2.5 bg-rose-50 text-rose-600 rounded-xl">
                                    <Activity size={20} />
                                </div>
                                <h2 className="text-sm font-black text-gray-800 uppercase tracking-widest italic decoration-rose-500/30 underline decoration-4 underline-offset-4">Disbursement Logs</h2>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                                    <input
                                        type="text"
                                        placeholder="Audit trail query..."
                                        className="pl-9 pr-4 py-2 bg-gray-50/50 border border-gray-200 rounded-xl text-[10px] font-bold text-gray-700 outline-none focus:bg-white focus:border-rose-500 transition-all w-64 shadow-inner"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <button className="p-2.5 bg-gray-50 text-gray-400 hover:text-rose-600 rounded-xl border border-gray-100 transition-all">
                                    <Filter size={16} />
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-separate border-spacing-0">
                                <thead>
                                    <tr className="bg-gray-50/50">
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-gray-50">V-ID Ref</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-gray-50">Entity Outflow</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-gray-50 text-center">Settlement</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-gray-50">Outward Post</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-gray-50 text-right pr-12">Controls</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {payments.filter(p => p.ledger.toLowerCase().includes(searchTerm.toLowerCase())).map((payment) => (
                                        <tr key={payment.id} className="hover:bg-rose-50/20 transition-all group">
                                            <td className="px-8 py-6">
                                                <div className="flex flex-col">
                                                    <span className="text-[11px] font-mono font-black text-rose-600">{payment.id}</span>
                                                    <div className="flex items-center mt-1 text-[9px] text-gray-400 font-bold uppercase italic">
                                                        <Calendar size={10} className="mr-1" /> {payment.date}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex flex-col">
                                                    <span className="text-[12px] font-black text-gray-900 uppercase tracking-wide italic">{payment.ledger}</span>
                                                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter italic">Voucher Class: Primary Payment</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-center">
                                                <div className="flex flex-col items-center">
                                                    <span className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-[9px] font-black text-gray-500 uppercase tracking-widest shadow-sm group-hover:border-rose-100 group-hover:text-rose-600">{payment.method}</span>
                                                    <div className="flex items-center mt-1">
                                                        {payment.status === 'Verified' || payment.status === 'Success' ? <CheckCircle2 size={10} className="text-emerald-500 mr-1" /> : <Clock size={10} className="text-amber-500 mr-1" />}
                                                        <span className={`text-[8px] font-black uppercase ${payment.status === 'Verified' || payment.status === 'Success' ? 'text-emerald-500' : 'text-amber-500'}`}>{payment.status}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-black text-gray-900 leading-tight italic">{payment.amount}</span>
                                                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest text-rose-500">Outflow Post</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-right pr-12">
                                                <div className="flex items-center justify-end space-x-2">
                                                    <button className="p-2 text-gray-400 hover:text-rose-600 rounded-lg hover:bg-white transition-all shadow-inner hover:shadow-sm">
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
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">Monitoring Active Session Outflow Audit</p>
                            <button className="text-[10px] font-black text-rose-600 uppercase tracking-widest hover:translate-x-2 transition-transform flex items-center">
                                 Download Audit Log <FileText size={14} className="ml-2" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ERPPayment;
