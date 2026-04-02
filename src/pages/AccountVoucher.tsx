import { useState } from 'react';
import {
    Plus,
    Search,
    FileText,
    Edit2,
    Trash2,
    ChevronDown,
    Calendar,
    Tag,
    AlignLeft,
    CheckCircle2,
    Clock
} from 'lucide-react';

export default function AccountVoucher() {
    const [formData, setFormData] = useState({
        voucherName: '',
        voucherType: '',
        numberingStyle: 'Automatic'
    });

    const [searchTerm, setSearchTerm] = useState('');

    const voucherTypes = [
        { id: 1, name: 'Payment Voucher', type: 'Payment', status: 'Active', method: 'Standard' },
        { id: 2, name: 'Receipt Voucher', type: 'Receipt', status: 'Active', method: 'Standard' },
        { id: 3, name: 'Journal Voucher', type: 'Journal', status: 'Active', method: 'Standard' },
        { id: 4, name: 'Contra Voucher', type: 'Contra', status: 'Active', method: 'Standard' },
        { id: 5, name: 'Sales Invoice', type: 'Sales', status: 'Draft', method: 'Custom' },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mt-6">
                <div>
                    <h1 className="text-xl font-black text-gray-900 uppercase tracking-widest flex items-center text-left">
                        <FileText size={22} className="mr-3 text-indigo-600" />
                        Voucher Configuration
                    </h1>
                    <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 tracking-widest text-left font-mono italic">Transactional Protocol Blueprint v1.0</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Side: Creation Form */}
                <div className="lg:col-span-4 h-fit">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
                        <div className="px-6 py-5 border-b border-gray-50 bg-gray-50/30">
                            <h2 className="text-sm font-black text-gray-800 uppercase tracking-widest italic decoration-indigo-500/30 underline decoration-4 underline-offset-4 text-left font-sans">
                                Add Voucher Type
                            </h2>
                        </div>
                        
                        <div className="p-8 space-y-8">
                            {/* Voucher Name */}
                            <div className="space-y-2 text-left">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1 flex items-center">
                                    <Tag size={12} className="mr-2 text-indigo-400" />
                                    Voucher Identifier <span className="text-rose-500 ml-1 text-sm">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl text-[13px] font-bold text-gray-700 outline-none focus:border-indigo-500 transition-all shadow-inner"
                                    placeholder="Ex: Internal Transfer Voucher"
                                    value={formData.voucherName}
                                    onChange={(e) => setFormData({ ...formData, voucherName: e.target.value })}
                                />
                            </div>

                            {/* Base Type Select */}
                            <div className="space-y-2 text-left">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1 flex items-center">
                                    <AlignLeft size={12} className="mr-2 text-indigo-400" />
                                    Base Transaction Type <span className="text-rose-500 ml-1 text-sm">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl text-[13px] font-bold text-gray-700 outline-none focus:border-indigo-500 appearance-none cursor-pointer"
                                        value={formData.voucherType}
                                        onChange={(e) => setFormData({ ...formData, voucherType: e.target.value })}
                                    >
                                        <option value="">Select Base Type...</option>
                                        <option value="Payment">Payment</option>
                                        <option value="Receipt">Receipt</option>
                                        <option value="Journal">Journal</option>
                                        <option value="Contra">Contra</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                                </div>
                            </div>

                            {/* Method Select */}
                            <div className="space-y-2 text-left text-left">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Numbering Methodology</label>
                                <div className="flex h-[52px] bg-gray-50/50 border border-gray-200 rounded-2xl p-1">
                                    {['Automatic', 'Manual', 'Override'].map(method => (
                                        <button
                                            key={method}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, numberingStyle: method })}
                                            className={`flex-1 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                                                formData.numberingStyle === method ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'
                                            }`}
                                        >
                                            {method}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Form Footer */}
                        <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex justify-end">
                            <button className="flex items-center space-x-2 px-10 py-3 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg active:scale-95 group">
                                <span>Save Protocol</span>
                                <Plus size={14} className="group-hover:rotate-90 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Side: Registry List */}
                <div className="lg:col-span-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full min-h-[600px]">
                        {/* Table Header Controls */}
                        <div className="p-6 border-b border-gray-50 flex flex-wrap items-center justify-between gap-4">
                            <h2 className="text-sm font-black text-gray-800 uppercase tracking-widest flex items-center italic underline decoration-indigo-200 decoration-4 underline-offset-4 text-left font-sans text-left">
                                Voucher Protocol Registry
                            </h2>

                            <div className="flex flex-wrap items-center gap-3">
                                <div className="relative group">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={14} />
                                    <input
                                        type="text"
                                        placeholder="Scan protocols..."
                                        className="pl-9 pr-4 py-2 bg-gray-50/50 border border-gray-200 rounded-xl text-[11px] font-bold text-gray-700 outline-none focus:bg-white focus:border-indigo-500 transition-all w-48 font-mono shadow-inner text-left"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>

                                <div className="flex items-center space-x-1 p-1 bg-gray-50/50 rounded-xl border border-gray-200">
                                    <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-white rounded-lg transition-all" title="Copy"><Copy size={13} /></button>
                                    <button className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-white rounded-lg transition-all" title="Excel"><Calendar size={13} /></button>
                                </div>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="flex-1 overflow-x-auto overflow-y-auto no-scrollbar">
                            <table className="w-full text-left border-separate border-spacing-0">
                                <thead className="sticky top-0 z-10">
                                    <tr className="bg-gray-50/90 backdrop-blur-sm shadow-sm">
                                        <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-gray-100 text-left">Protocol Model</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-gray-100 text-left">Base Class</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-gray-100 text-left">Security Status</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-gray-100 text-right">Gateway</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {voucherTypes.filter(v => v.name.toLowerCase().includes(searchTerm.toLowerCase())).map((v) => (
                                        <tr key={v.id} className="hover:bg-indigo-50/20 transition-all group">
                                            <td className="px-6 py-6 vertical-middle whitespace-nowrap text-left border-b border-gray-50">
                                                <div className="flex flex-col">
                                                    <span className="text-[12px] font-black text-gray-900 uppercase tracking-widest">{v.name}</span>
                                                    <span className="text-[9px] font-bold text-gray-400 font-mono tracking-widest mt-1 italic">N-STYLE: {v.method}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-6 vertical-middle text-left border-b border-gray-50">
                                                <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100">{v.type}</span>
                                            </td>
                                            <td className="px-6 py-6 vertical-middle text-left border-b border-gray-50 font-mono">
                                                <div className="flex items-center">
                                                    {v.status === 'Active' ? (
                                                        <span className="flex items-center text-emerald-500 font-black text-[10px] uppercase tracking-widest bg-emerald-50 px-2 py-1 rounded-lg">
                                                            <CheckCircle2 size={12} className="mr-1.5" />
                                                            Authorized
                                                        </span>
                                                    ) : (
                                                        <span className="flex items-center text-amber-500 font-black text-[10px] uppercase tracking-widest bg-amber-50 px-2 py-1 rounded-lg">
                                                            <Clock size={12} className="mr-1.5" />
                                                            Pending Verify
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-6 text-right vertical-middle border-b border-gray-50">
                                                <div className="flex items-center justify-end space-x-2">
                                                    <button className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm group-hover:scale-105 active:scale-95"><Edit2 size={14} /></button>
                                                    <button className="p-2.5 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all shadow-sm group-hover:scale-105 active:scale-95"><Trash2 size={14} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
