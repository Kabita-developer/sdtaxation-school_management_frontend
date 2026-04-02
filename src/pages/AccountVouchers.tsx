import React, { useState } from 'react';
import {
    Plus,
    Search,
    Filter,
    FileText,
    MoreVertical,
    Edit,
    Trash2,
    Calendar,
    Save,
    X,
    ShieldCheck,
    Hash
} from 'lucide-react';

const AccountVouchers = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const [vouchers, setVouchers] = useState([
        { id: 'V-TYPE-01', name: 'Sales Payment Receipt', type: 'Receipt', prefix: 'REC', suffix: '2025', status: 'Active' },
        { id: 'V-TYPE-02', name: 'Vendor Payment Voucher', type: 'Payment', prefix: 'PAY', suffix: '2025', status: 'Active' },
        { id: 'V-TYPE-03', name: 'Journal Adjustment', type: 'Journal', prefix: 'JRN', suffix: 'GEN', status: 'Active' },
        { id: 'V-TYPE-04', name: 'Cash Contra Transfer', type: 'Contra', prefix: 'CON', suffix: 'BNK', status: 'Active' },
    ]);

    return (
        <div className="space-y-6 animate-in fade-in duration-500 text-left">
            {/* Header */}
            <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center space-x-4">
                    <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
                        <FileText size={24} />
                    </div>
                    <div>
                        <h1 className="text-xl font-black text-gray-900 uppercase tracking-tight italic">Voucher Protocol Configuration</h1>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Transaction Blueprints & Serial Protocols</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Form Section - Left Side */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-6">
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center space-x-2">
                            <Plus size={18} className="text-rose-600" />
                            <h2 className="text-xs font-black text-gray-800 uppercase tracking-widest italic">{isEditing ? 'Modify Protocol' : 'Initialize Protocol'}</h2>
                        </div>
                        <form className="p-6 space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Protocol Nomenclature</label>
                                <input
                                    type="text"
                                    placeholder="e.g. GST Payment Receipt"
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all uppercase placeholder:normal-case"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Voucher Type Nexus</label>
                                <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-500 appearance-none">
                                    <option>Select Nexus Type</option>
                                    <option>Receipt</option>
                                    <option>Payment</option>
                                    <option>Journal</option>
                                    <option>Contra</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Primary Prefix</label>
                                    <div className="relative">
                                        <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                                        <input
                                            type="text"
                                            placeholder="REC"
                                            className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-500"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Secondary Suffix</label>
                                    <div className="relative">
                                        <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                                        <input
                                            type="text"
                                            placeholder="2025"
                                            className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 flex items-center space-x-3">
                                <button className="flex-1 py-1.5 bg-rose-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-700 transition-all shadow-lg shadow-rose-200 flex items-center justify-center space-x-2">
                                    <Save size={14} />
                                    <span>Define Protocol</span>
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
                                <div className="p-2.5 bg-rose-50 text-rose-600 rounded-xl">
                                    <Search size={20} />
                                </div>
                                <h2 className="text-sm font-black text-gray-800 uppercase tracking-widest italic decoration-rose-500/30 underline decoration-4 underline-offset-4">Voucher Serial Protocols</h2>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                                    <input
                                        type="text"
                                        placeholder="Search Protocol..."
                                        className="pl-9 pr-4 py-2 bg-gray-50/50 border border-gray-200 rounded-xl text-[11px] font-bold text-gray-700 outline-none focus:bg-white focus:border-rose-500 transition-all w-64 shadow-inner"
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
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-gray-50">Protocol ID</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-gray-50">Protocol Nomenclature</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-gray-50 text-center">Nexus Type</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-gray-50 text-center">Serial Mask</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-gray-50 text-right pr-12">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {vouchers.filter(v => v.name.toLowerCase().includes(searchTerm.toLowerCase())).map((voucher) => (
                                        <tr key={voucher.id} className="hover:bg-rose-50/20 transition-all group">
                                            <td className="px-8 py-5">
                                                <div className="flex flex-col">
                                                    <span className="text-[11px] font-mono font-black text-rose-600">{voucher.id}</span>
                                                    <div className="flex items-center mt-1 text-[9px] text-gray-400 font-bold uppercase italic">
                                                        <Calendar size={10} className="mr-1" /> Mar 2025
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-1.5 h-1.5 bg-rose-500 rounded-full" />
                                                    <span className="text-xs font-black text-gray-900 uppercase tracking-wide italic">{voucher.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-center">
                                                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                                    voucher.type === 'Receipt' ? 'bg-emerald-50 text-emerald-600' :
                                                    voucher.type === 'Payment' ? 'bg-rose-50 text-rose-600' :
                                                    voucher.type === 'Journal' ? 'bg-indigo-50 text-indigo-600' :
                                                    'bg-amber-50 text-amber-600'
                                                }`}>
                                                    {voucher.type}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5 text-center">
                                                <div className="flex items-center justify-center space-x-0.5 font-mono text-[10px] font-black text-gray-400">
                                                    <span className="text-rose-600">{voucher.prefix}</span>
                                                    <span>/</span>
                                                    <span className="bg-gray-200 px-1.5 rounded text-gray-700">####</span>
                                                    <span>/</span>
                                                    <span className="text-gray-900">{voucher.suffix}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-right pr-12">
                                                <div className="flex items-center justify-end space-x-2">
                                                    <button onClick={() => setIsEditing(true)} className="p-2 text-gray-400 hover:text-rose-600 rounded-lg hover:bg-white transition-all shadow-inner hover:shadow-sm">
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
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">Total Defined Protocols: {vouchers.length}</p>
                            <div className="flex space-x-1">
                                <button className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-[10px] font-black text-rose-600 shadow-sm">1</button>
                                <button className="px-3 py-1 text-[10px] font-black text-gray-400">2</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountVouchers;
