import { useState } from 'react';
import {
    Plus,
    Search,
    LayoutGrid,
    Edit2,
    Trash2,
    ChevronDown,
    Download,
    Printer,
    FileText,
    Copy,
    Share2,
    Filter,
    Tag,
    AlignLeft
} from 'lucide-react';

export default function ClassGroupCreate() {
    const [formData, setFormData] = useState({
        groupName: '',
        description: ''
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(50);

    const groups = [
        { id: 1, name: 'Primary Wings', description: 'Grade 1 - Grade 5' },
        { id: 2, name: 'Middle School', description: 'Grade 6 - Grade 8' },
        { id: 3, name: 'Secondary School', description: 'Grade 9 - Grade 10' },
        { id: 4, name: 'Senior Secondary', description: 'Grade 11 - Grade 12' },
        { id: 5, name: 'Vocational Group', description: 'Skill Courses' },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-xl font-black text-gray-900 uppercase tracking-widest flex items-center text-left">
                        <LayoutGrid size={22} className="mr-3 text-indigo-600" />
                        Class Group Configuration
                    </h1>
                    <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 tracking-widest text-left font-mono">Academic Organizational Architecture v2.0</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Side: Add Class Group Form */}
                <div className="lg:col-span-4 h-fit">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
                        <div className="px-6 py-5 border-b border-gray-50 bg-gray-50/30">
                            <h2 className="text-sm font-black text-gray-800 uppercase tracking-widest italic decoration-indigo-500/30 underline decoration-4 underline-offset-4 text-left font-sans">
                                Add Class Group
                            </h2>
                        </div>
                        
                        <div className="p-8 space-y-8">
                            {/* Group Name Input */}
                            <div className="space-y-2 text-left">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1 flex items-center">
                                    <Tag size={12} className="mr-2 text-indigo-400" />
                                    Group Name <span className="text-rose-500 ml-1 text-sm">*</span>
                                </label>
                                <div className="relative group">
                                    <input
                                        type="text"
                                        className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl text-[13px] font-bold text-gray-700 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all group-hover:border-indigo-200"
                                        placeholder="Ex: Senior Secondary Wing"
                                        value={formData.groupName}
                                        onChange={(e) => setFormData({ ...formData, groupName: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* Description Input */}
                            <div className="space-y-2 text-left">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1 flex items-center">
                                    <AlignLeft size={12} className="mr-2 text-indigo-400" />
                                    Description
                                </label>
                                <div className="relative group">
                                    <textarea
                                        className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl text-[13px] font-bold text-gray-700 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all group-hover:border-indigo-200 resize-none min-h-[120px]"
                                        placeholder="Define the objectives for this group..."
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </div>
                            </div>
                            
                            {/* Tip Box */}
                            <div className="p-5 bg-indigo-50/50 rounded-2xl border border-indigo-100 flex items-start space-x-3">
                               <div className="p-2 bg-white rounded-xl shadow-sm text-indigo-600">
                                  <LayoutGrid size={16} />
                               </div>
                               <p className="text-[10px] text-gray-500 font-bold leading-relaxed text-left">
                                  Groups enable categorized financial reporting and specialized academic tracking across multiple grades.
                               </p>
                            </div>
                        </div>

                        {/* Form Footer */}
                        <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex justify-end">
                            <button className="flex items-center space-x-2 px-10 py-3 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95 group">
                                <span>Save Group</span>
                                <Plus size={14} className="group-hover:rotate-90 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Side: Class Group List */}
                <div className="lg:col-span-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full min-h-[600px]">
                        {/* Table Header Controls */}
                        <div className="p-6 border-b border-gray-50 flex flex-wrap items-center justify-between gap-4">
                            <h2 className="text-sm font-black text-gray-800 uppercase tracking-widest flex items-center italic underline decoration-indigo-200 decoration-4 underline-offset-4 text-left">
                                Class Group List
                            </h2>

                            <div className="flex flex-wrap items-center gap-3">
                                <div className="relative group">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={14} />
                                    <input
                                        type="text"
                                        placeholder="Search records..."
                                        className="pl-9 pr-4 py-2 bg-gray-50/50 border border-gray-200 rounded-xl text-[11px] font-bold text-gray-700 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all w-48 font-mono"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>

                                <div className="flex items-center space-x-2 bg-gray-50/50 border border-gray-200 rounded-xl px-2 py-1">
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter ml-2">{rowsPerPage}</span>
                                    <button className="p-1 hover:bg-white rounded-lg transition-all text-gray-400 hover:text-indigo-600">
                                        <ChevronDown size={14} />
                                    </button>
                                </div>

                                <div className="flex items-center space-x-1 p-1 bg-gray-50/50 rounded-xl border border-gray-200">
                                    <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-white rounded-lg transition-all" title="Copy"><Copy size={13} /></button>
                                    <button className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-white rounded-lg transition-all" title="Excel"><FileText size={13} /></button>
                                    <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-white rounded-lg transition-all" title="CSV"><Share2 size={13} /></button>
                                    <button className="p-2 text-gray-400 hover:text-rose-600 hover:bg-white rounded-lg transition-all" title="PDF"><Download size={13} /></button>
                                    <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-white rounded-lg transition-all" title="Print"><Printer size={13} /></button>
                                    <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-white rounded-lg transition-all" title="Columns"><Filter size={13} /></button>
                                </div>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="flex-1 overflow-x-auto overflow-y-auto no-scrollbar">
                            <table className="w-full text-left border-separate border-spacing-0">
                                <thead className="sticky top-0 z-10">
                                    <tr className="bg-gray-50/90 backdrop-blur-sm">
                                        <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-gray-100">
                                            <div className="flex items-center cursor-pointer group">
                                                <span>Group Name</span>
                                                <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <ChevronDown size={10} className="text-indigo-500" />
                                                </div>
                                            </div>
                                        </th>
                                        <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-gray-100">
                                            <div className="flex items-center cursor-pointer group">
                                                <span>Description</span>
                                                <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <ChevronDown size={10} className="text-indigo-500" />
                                                </div>
                                            </div>
                                        </th>
                                        <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-gray-100 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {groups.filter(g => g.name.toLowerCase().includes(searchTerm.toLowerCase())).map((g) => (
                                        <tr key={g.id} className="hover:bg-indigo-50/20 transition-all group">
                                            <td className="px-6 py-6 vertical-middle whitespace-nowrap text-left border-b border-gray-50">
                                                <span className="text-[12px] font-black text-gray-900 uppercase tracking-widest">{g.name}</span>
                                            </td>
                                            <td className="px-6 py-6 vertical-middle text-left border-b border-gray-50">
                                                <span className="text-[12px] font-bold text-gray-600 block">{g.description}</span>
                                            </td>
                                            <td className="px-6 py-6 text-right vertical-middle border-b border-gray-50">
                                                <div className="flex items-center justify-end space-x-2">
                                                    <button className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm hover:shadow-indigo-100 group-hover:scale-105">
                                                        <Edit2 size={14} />
                                                    </button>
                                                    <button className="p-2.5 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all shadow-sm hover:shadow-rose-100 group-hover:scale-105">
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Footer */}
                        <div className="p-6 bg-gray-50/50 border-t border-gray-50 flex items-center justify-between mt-auto">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">
                                Showing 1 to {groups.length} of {groups.length} entries
                            </span>
                            <div className="flex items-center space-x-1">
                                <button className="p-2 text-gray-400 hover:text-indigo-600 transition-all"><ChevronDown size={14} className="rotate-90" /></button>
                                <button className="w-8 h-8 flex items-center justify-center bg-indigo-600 text-white rounded-lg text-[10px] font-black shadow-lg shadow-indigo-100">1</button>
                                <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-white hover:text-indigo-600 rounded-lg text-[10px] font-black transition-all">2</button>
                                <button className="p-2 text-gray-400 hover:text-indigo-600 transition-all"><ChevronDown size={14} className="-rotate-90" /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
