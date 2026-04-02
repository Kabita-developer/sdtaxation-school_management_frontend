import { useState } from 'react';
import {
    Search,
    LayoutGrid,
    Users,
    Edit2,
    Trash2,
    Plus,
    Tag,
    BarChart3,
    Layers,
    ChevronDown,
    Filter,
    Download
} from 'lucide-react';

export default function ClassGroup() {
    const [formData, setFormData] = useState({
        groupName: '',
        classesIncluded: '',
    });

    const [searchTerm, setSearchTerm] = useState('');

    const groups = [
        { id: 'GRP-01', name: 'Primary Wings', classes: 'Grade 1 - Grade 5', totalStudents: 185, head: 'Mr. John Doe', status: 'Active' },
        { id: 'GRP-02', name: 'Middle School', classes: 'Grade 6 - Grade 8', totalStudents: 240, head: 'Mrs. Sarah Jane', status: 'Active' },
        { id: 'GRP-03', name: 'Secondary School', classes: 'Grade 9 - Grade 10', totalStudents: 310, head: 'Mr. Robert Wilson', status: 'Active' },
        { id: 'GRP-04', name: 'Senior Secondary', classes: 'Grade 11 - Grade 12', totalStudents: 285, head: 'Dr. Emily Blunt', status: 'Active' },
        { id: 'GRP-05', name: 'Vocational Group', classes: 'Skill Courses', totalStudents: 45, head: 'Ms. Alice Cook', status: 'Inactive' },
    ];

    const stats = [
        { name: 'Total Groups', value: '5', icon: LayoutGrid, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { name: 'Grouped Students', value: '1,065', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { name: 'Active Headings', value: '4', icon: Tag, color: 'text-amber-600', bg: 'bg-amber-50' },
        { name: 'Managed Assets', value: '12', icon: BarChart3, color: 'text-rose-600', bg: 'bg-rose-50' },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-2">
                <div>
                    <h1 className="text-xl font-black text-gray-900 uppercase tracking-widest flex items-center">
                        <LayoutGrid size={22} className="mr-3 text-indigo-600" />
                        Class Group Management
                    </h1>
                    <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 tracking-widest font-mono">Academic categorization & organizational hierarchy</p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 group hover:border-indigo-100 transition-all hover:shadow-md">
                        <div className="flex justify-between items-center">
                            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                                <stat.icon size={22} />
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-black text-gray-900 leading-none tracking-tight">{stat.value}</p>
                                <p className="text-[10px] text-gray-400 font-bold uppercase mt-2 tracking-wider font-mono">{stat.name}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Side: Create Form */}
                <div className="lg:col-span-4">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col sticky top-6">
                        <div className="px-6 py-5 border-b border-gray-50 bg-gray-50/30">
                            <h2 className="text-sm font-black text-gray-800 uppercase tracking-widest italic decoration-indigo-500/30 underline decoration-4 underline-offset-4">Add Class Group</h2>
                        </div>
                        
                        <div className="p-8 space-y-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Group Designation <span className="text-rose-500">*</span></label>
                                <div className="relative group/input">
                                    <input
                                        type="text"
                                        className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl text-[13px] font-bold text-gray-700 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all"
                                        placeholder="Ex: Senior Secondary"
                                        value={formData.groupName}
                                        onChange={(e) => setFormData({ ...formData, groupName: e.target.value })}
                                    />
                                    <Tag className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within/input:text-indigo-400 transition-colors" size={16} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1 text-left block">Range Included <span className="text-rose-500">*</span></label>
                                <div className="relative group/input">
                                    <input
                                        type="text"
                                        className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl text-[13px] font-bold text-gray-700 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all"
                                        placeholder="Ex: Class 9 - 10"
                                        value={formData.classesIncluded}
                                        onChange={(e) => setFormData({ ...formData, classesIncluded: e.target.value })}
                                    />
                                    <Layers className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within/input:text-indigo-400 transition-colors" size={16} />
                                </div>
                            </div>

                            <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100/50">
                                <p className="text-[10px] text-indigo-600/70 font-bold leading-relaxed">
                                    * Groups allow you to categorize classes for specific fee structures and reporting.
                                </p>
                            </div>
                        </div>

                        <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex justify-end">
                            <button className="flex items-center space-x-2 px-10 py-3 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95 group">
                                <span>Initialize Group</span>
                                <Plus size={14} className="group-hover:rotate-90 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Side: List Table */}
                <div className="lg:col-span-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
                        <div className="p-6 border-b border-gray-50 flex flex-wrap items-center justify-between gap-4">
                            <h2 className="text-sm font-black text-gray-800 uppercase tracking-widest">Master Registry</h2>

                            <div className="flex flex-wrap items-center gap-3">
                                <div className="relative group">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={14} />
                                    <input
                                        type="text"
                                        placeholder="Search groups..."
                                        className="pl-9 pr-4 py-2 bg-gray-50/50 border border-gray-200 rounded-xl text-[11px] font-bold text-gray-700 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all w-48"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <div className="flex items-center space-x-1 p-1 bg-gray-50/50 rounded-xl border border-gray-200">
                                    <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-white rounded-lg transition-all" title="Filter"><Filter size={13} /></button>
                                    <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-white rounded-lg transition-all" title="Export"><Download size={13} /></button>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 overflow-x-auto no-scrollbar">
                            <table className="w-full text-left border-separate border-spacing-0">
                                <thead className="sticky top-0 z-10">
                                    <tr className="bg-gray-50/80 backdrop-blur-sm">
                                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Identifier</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Designation</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Coverage</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Status</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {groups.filter(g => g.name.toLowerCase().includes(searchTerm.toLowerCase())).map((g) => (
                                        <tr key={g.id} className="hover:bg-indigo-50/20 transition-all group">
                                            <td className="px-6 py-6 vertical-middle whitespace-nowrap">
                                                <span className="text-[10px] font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">{g.id}</span>
                                            </td>
                                            <td className="px-6 py-6 vertical-middle">
                                                <div className="flex flex-col">
                                                    <span className="text-[12px] font-black text-gray-900 uppercase tracking-widest group-hover:text-indigo-600 transition-colors">{g.name}</span>
                                                    <span className="text-[10px] text-gray-400 font-bold group-hover:text-gray-500 uppercase mt-0.5 tracking-tight">{g.head}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-6 vertical-middle">
                                                <span className="text-[11px] font-bold text-gray-600 whitespace-nowrap">{g.classes}</span>
                                            </td>
                                            <td className="px-6 py-6 vertical-middle">
                                                <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${g.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                                                    {g.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-6 text-right vertical-middle">
                                                <div className="flex items-center justify-end space-x-2">
                                                    <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all group-hover:scale-105 shadow-sm hover:shadow-indigo-100">
                                                        <Edit2 size={13} />
                                                    </button>
                                                    <button className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all group-hover:scale-105 shadow-sm hover:shadow-rose-100">
                                                        <Trash2 size={13} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Footer */}
                        <div className="p-6 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono">
                                System ready for categorization
                            </span>
                            <div className="flex space-x-1">
                                <button className="w-8 h-8 flex items-center justify-center bg-indigo-600 text-white rounded-lg text-[10px] font-black shadow-lg shadow-indigo-100">1</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
