import { useState } from 'react';
import {
    Plus,
    Search,
    Users,
    Edit2,
    Trash2,
    CheckCircle2,
    SplitSquareVertical,
    Layers,
    ChevronDown,
    Filter,
    Download,
    LayoutGrid
} from 'lucide-react';

export default function SectionCreate() {
    const [formData, setFormData] = useState({
        sectionName: '',
        capacity: '',
    });

    const [searchTerm, setSearchTerm] = useState('');

    const sections = [
        { id: 'SEC-A', name: 'Section A', capacity: 45, status: 'Active', class: 'Class 6' },
        { id: 'SEC-B', name: 'Section B', capacity: 40, status: 'Active', class: 'Class 5' },
        { id: 'SEC-C', name: 'Section C', capacity: 42, status: 'Active', class: 'Class 5' },
        { id: 'SEC-D', name: 'Section D', capacity: 38, status: 'Active', class: 'Class 4' },
        { id: 'SEC-E', name: 'Section E', capacity: 40, status: 'Inactive', class: 'Class 3' },
    ];

    const stats = [
        { name: 'Total Sections', value: '42', icon: SplitSquareVertical, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { name: 'Avg Capacity', value: '41', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { name: 'Active Units', value: '38', icon: CheckCircle2, color: 'text-amber-600', bg: 'bg-amber-50' },
        { name: 'Room Utility', value: '84%', icon: LayoutGrid, color: 'text-rose-600', bg: 'bg-rose-50' },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500 text-left">
            {/* Header */}
            <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-2">
                <div>
                    <h1 className="text-xl font-black text-gray-900 uppercase tracking-widest flex items-center">
                        <SplitSquareVertical size={22} className="mr-3 text-indigo-600" />
                        Section Management
                    </h1>
                    <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 tracking-widest font-mono">Academic unit allocation & capacity planning</p>
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
                            <h2 className="text-sm font-black text-gray-800 uppercase tracking-widest italic decoration-indigo-500/30 underline decoration-4 underline-offset-4">Add Section</h2>
                        </div>
                        
                        <div className="p-8 space-y-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Section Name <span className="text-rose-500">*</span></label>
                                <div className="relative group/input">
                                    <input
                                        type="text"
                                        className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl text-[13px] font-bold text-gray-700 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all"
                                        placeholder="Ex: Section Alpha"
                                        value={formData.sectionName}
                                        onChange={(e) => setFormData({ ...formData, sectionName: e.target.value })}
                                    />
                                    <SplitSquareVertical className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within/input:text-indigo-400 transition-colors" size={16} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Student Capacity <span className="text-rose-500">*</span></label>
                                <div className="relative group/input">
                                    <input
                                        type="number"
                                        className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl text-[13px] font-bold text-gray-700 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all"
                                        placeholder="Max capacity..."
                                        value={formData.capacity}
                                        onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                                    />
                                    <Users className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within/input:text-indigo-400 transition-colors" size={16} />
                                </div>
                            </div>

                            <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100/50">
                                <p className="text-[10px] text-indigo-600/70 font-bold leading-relaxed">
                                    * Academic sections allow for granular control over student distribution and classroom resources.
                                </p>
                            </div>
                        </div>

                        <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex justify-end">
                            <button className="flex items-center space-x-2 px-10 py-3 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95 group">
                                <span>Save Section</span>
                                <Plus size={14} className="group-hover:rotate-90 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Side: List Table */}
                <div className="lg:col-span-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
                        <div className="p-6 border-b border-gray-50 flex flex-wrap items-center justify-between gap-4">
                            <h2 className="text-sm font-black text-gray-800 uppercase tracking-widest">Section Registry</h2>

                            <div className="flex flex-wrap items-center gap-3">
                                <div className="relative group">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={14} />
                                    <input
                                        type="text"
                                        placeholder="Search sections..."
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
                                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Section ID</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Designation</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Class</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Capacity</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {sections.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase())).map((s) => (
                                        <tr key={s.id} className="hover:bg-indigo-50/20 transition-all group">
                                            <td className="px-6 py-6 vertical-middle whitespace-nowrap">
                                                <span className="text-[10px] font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">{s.id}</span>
                                            </td>
                                            <td className="px-6 py-6 vertical-middle">
                                                <span className="text-[12px] font-black text-gray-900 uppercase tracking-widest group-hover:text-indigo-600 transition-colors">{s.name}</span>
                                            </td>
                                            <td className="px-6 py-6 vertical-middle">
                                                <span className="text-[11px] font-bold text-gray-600 whitespace-nowrap">{s.class}</span>
                                            </td>
                                            <td className="px-6 py-6 vertical-middle">
                                                <div className="flex items-center space-x-2">
                                                    <div className="flex-1 h-1.5 w-16 bg-gray-100 rounded-full overflow-hidden">
                                                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: '70%' }}></div>
                                                    </div>
                                                    <span className="text-[11px] font-black text-gray-700">{s.capacity}</span>
                                                </div>
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
                                Unit distribution stable
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
