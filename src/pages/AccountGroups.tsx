import React, { useState } from 'react';
import {
    Plus,
    Search,
    Filter,
    FolderTree,
    MoreVertical,
    Edit,
    Trash2,
    Calendar,
    ChevronRight,
    Save,
    X,
} from 'lucide-react';

const AccountGroups = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const [groups, setGroups] = useState([
        { id: 'GRP-001', name: 'Fixed Assets', parent: 'Primary', type: 'Asset', status: 'Active' },
        { id: 'GRP-002', name: 'Current Liabilities', parent: 'Primary', type: 'Liability', status: 'Active' },
        { id: 'GRP-003', name: 'Direct Expenses', parent: 'Primary', type: 'Expense', status: 'Active' },
        { id: 'GRP-004', name: 'Indirect Incomes', parent: 'Primary', type: 'Income', status: 'Active' },
        { id: 'GRP-005', name: 'Bank Accounts', parent: 'Current Assets', type: 'Asset', status: 'Active' },
    ]);

    return (
        <div className="space-y-6 animate-in fade-in duration-500 text-left">
            {/* Header */}
            <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center space-x-4">
                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                        <FolderTree size={24} />
                    </div>
                    <div>
                        <h1 className="text-xl font-black text-gray-900 uppercase tracking-tight italic">Account Group Configuration</h1>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Hierarchical Financial Taxonomy Setup</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Form Section - Left Side */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-6">
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center space-x-2">
                            <Plus size={18} className="text-indigo-600" />
                            <h2 className="text-xs font-black text-gray-800 uppercase tracking-widest italic">{isEditing ? 'Modify Group Registry' : 'Initialize New Account Group'}</h2>
                        </div>
                        <form className="p-6 space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Group Nomenclature</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Current Assets"
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all uppercase placeholder:normal-case"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Parent Nexus (Primary/Sub)</label>
                                <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none">
                                    <option>Primary Group</option>
                                    <option>Current Assets</option>
                                    <option>Fixed Assets</option>
                                    <option>Investments</option>
                                    <option>Direct Expenses</option>
                                </select>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Financial Category</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {['Asset', 'Liability', 'Income', 'Expense'].map((type) => (
                                        <button
                                            key={type}
                                            type="button"
                                            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                                                type === 'Asset' ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-100' : 'bg-gray-50 text-gray-400 border-gray-100 hover:bg-white'
                                            }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4 flex items-center space-x-3">
                                <button className="flex-1 py-1.5 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center justify-center space-x-2">
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
                                <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                                    <Search size={20} />
                                </div>
                                <h2 className="text-sm font-black text-gray-800 uppercase tracking-widest italic decoration-indigo-500/30 underline decoration-4 underline-offset-4">Existing Group Registry</h2>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                                    <input
                                        type="text"
                                        placeholder="Search Group ID/Name..."
                                        className="pl-9 pr-4 py-2 bg-gray-50/50 border border-gray-200 rounded-xl text-[11px] font-bold text-gray-700 outline-none focus:bg-white focus:border-indigo-500 transition-all w-64 shadow-inner"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <button className="p-2.5 bg-gray-50 text-gray-400 hover:text-indigo-600 rounded-xl border border-gray-100 transition-all">
                                    <Filter size={16} />
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-separate border-spacing-0">
                                <thead>
                                    <tr className="bg-gray-50/50">
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-gray-50">ID Reference</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-gray-50">Group Nomenclature</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-gray-50">Parent Nexus</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-gray-50">Category</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-gray-50 text-right pr-12">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {groups.filter(g => g.name.toLowerCase().includes(searchTerm.toLowerCase())).map((group) => (
                                        <tr key={group.id} className="hover:bg-indigo-50/20 transition-all group">
                                            <td className="px-8 py-5">
                                                <div className="flex flex-col">
                                                    <span className="text-[11px] font-mono font-black text-indigo-600">{group.id}</span>
                                                    <div className="flex items-center mt-1 text-[9px] text-gray-400 font-bold uppercase italic">
                                                        <Calendar size={10} className="mr-1" /> Mar 2025
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                                                    <span className="text-xs font-black text-gray-900 uppercase tracking-wide italic">{group.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="flex items-center space-x-1 uppercase text-[10px] font-bold text-gray-400">
                                                    <span>{group.parent}</span>
                                                    <ChevronRight size={12} className="opacity-40" />
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                                    group.type === 'Asset' ? 'bg-indigo-50 text-indigo-600' :
                                                    group.type === 'Liability' ? 'bg-amber-50 text-amber-600' :
                                                    group.type === 'Expense' ? 'bg-rose-50 text-rose-600' :
                                                    'bg-emerald-50 text-emerald-600'
                                                }`}>
                                                    {group.type}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5 text-right pr-12">
                                                <div className="flex items-center justify-end space-x-2">
                                                    <button onClick={() => setIsEditing(true)} className="p-2 text-gray-400 hover:text-indigo-600 rounded-lg hover:bg-white transition-all shadow-inner hover:shadow-sm">
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
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">Total Registered Groups: {groups.length}</p>
                            <div className="flex space-x-1">
                                <button className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-[10px] font-black text-indigo-600 shadow-sm">1</button>
                                <button className="px-3 py-1 text-[10px] font-black text-gray-400">2</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountGroups;
