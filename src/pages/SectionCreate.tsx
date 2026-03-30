import { useState } from 'react';
import {
    Plus,
    Search,
    Layers,
    Users,
    Edit2,
    Trash2,
    CheckCircle2,
    Clock,
    SplitSquareVertical,
} from 'lucide-react';

export default function SectionCreate() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        sectionName: '',
        status: 'Active',
        description: ''
    });

    const [searchTerm, setSearchTerm] = useState('');

    const sections = [
        { id: 'SEC-A', name: 'Section A', capacity: 45, status: 'Active' },
        { id: 'SEC-B', name: 'Section B', capacity: 40, status: 'Active' },
        { id: 'SEC-C', name: 'Section C', capacity: 42, status: 'Active' },
        { id: 'SEC-D', name: 'Section D', capacity: 38, status: 'Active' },
        { id: 'SEC-E', name: 'Section E', capacity: 40, status: 'Inactive' },
    ];

    const stats = [
        { name: 'Total Active Sections', value: '38', icon: SplitSquareVertical, color: 'text-violet-600', bg: 'bg-violet-50' },
        { name: 'Average Section Density', value: '41', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
        { name: 'Room Utilization', value: '84%', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { name: 'Pending Assignments', value: '5', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-center">
                <h1 className="text-xl font-black text-gray-900 uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">section create</h1>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 group hover:border-violet-100 transition-colors">
                        <div className="flex justify-between items-start">
                            <div className={`p-2.5 rounded-lg ${stat.bg}`}>
                                <stat.icon size={20} className={stat.color} />
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-black text-gray-900 leading-none">{stat.value}</p>
                                <p className="text-[10px] text-gray-400 font-bold uppercase mt-1.5 tracking-wider">{stat.name}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Section Registry Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between flex-wrap gap-4">
                    <h2 className="font-bold text-gray-900 flex items-center text-sm uppercase tracking-wider">
                        <SplitSquareVertical size={16} className="mr-2 text-violet-600" />
                        Section Master Registry
                    </h2>
                    <div className="flex items-center space-x-2">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                            <input
                                type="text"
                                placeholder="Search section ID or name..."
                                className="pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-violet-500 w-56 font-medium"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center space-x-2 px-4 py-1.5 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-all text-xs font-bold leading-none shadow-md shadow-violet-100 active:scale-95"
                        >
                            <Plus size={14} />
                            <span>ADD NEW SECTION</span>
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Section ID</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Formal Designation</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Seating Capacity</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Operational Status</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-right">Management</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {sections.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.id.toLowerCase().includes(searchTerm.toLowerCase())).map((s) => (
                                <tr key={s.id} className="hover:bg-gray-50/80 transition-colors">
                                    <td className="px-6 py-4">
                                        <span className="text-[10px] font-mono font-bold text-violet-600 bg-violet-50 px-2 py-1 rounded shadow-sm">{s.id}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-xs font-bold text-gray-900">{s.name} - Academic Unit</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                            <span className="text-xs font-black text-gray-900">{s.capacity} Max Capacity</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${s.status === 'Active' ? 'bg-emerald-50 text-emerald-600 shadow-sm border border-emerald-100' : 'bg-rose-50 text-rose-600 shadow-sm border border-rose-100'}`}>
                                            {s.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end space-x-1">
                                            <button className="p-2 text-gray-400 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-all active:scale-90">
                                                <Edit2 size={14} />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all active:scale-90">
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Section Engineering Module v2.4</p>
                    <div className="flex space-x-1">
                        <button className="px-2.5 py-1 border border-violet-200 rounded text-[10px] font-black text-violet-600 bg-white shadow-sm ring-1 ring-violet-100">1</button>
                        <button className="px-2.5 py-1 border border-transparent rounded text-[10px] font-black text-gray-300 hover:text-gray-400 transition-colors">2</button>
                    </div>
                </div>
            </div>

            {/* Automation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 overflow-hidden relative group">
                    <div className="relative z-10 text-left">
                        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest flex items-center mb-4">
                            <Clock size={16} className="mr-2 text-indigo-500" />
                            Operational Logs
                        </h3>
                        <div className="space-y-4">
                            {[
                                { sec: 'Section A', msg: 'System check completed - No leaks', time: '12 mins ago' },
                                { sec: 'Section C', msg: 'Capacity threshold adjusted by Admin', time: '3 hours ago' },
                            ].map((change, i) => (
                                <div key={i} className="flex items-center justify-between border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                                    <div>
                                        <p className="text-xs font-bold text-gray-800">{change.sec}</p>
                                        <p className="text-[10px] text-gray-400 font-medium italic">{change.msg}</p>
                                    </div>
                                    <span className="text-[10px] text-gray-400 font-bold uppercase">{change.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <SplitSquareVertical size={80} className="absolute -bottom-4 -right-4 text-violet-50 group-hover:scale-125 transition-transform duration-700" />
                </div>

                <div className="bg-gradient-to-br from-violet-600 via-indigo-600 to-indigo-800 rounded-xl p-6 text-white shadow-lg relative overflow-hidden group">
                    <div className="relative z-10 text-left">
                        <h3 className="text-lg font-bold mb-2 tracking-tight">Grid Distribution</h3>
                        <p className="text-sm text-violet-100 mb-6 opacity-90 leading-relaxed font-medium">Automatic section balancing across all active class names.</p>
                        <button className="px-6 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-indigo-600 transition-all shadow-xl active:scale-95">
                            Rebalance Grid
                        </button>
                    </div>
                    <CheckCircle2 size={130} className="absolute bottom-0 right-0 p-4 transform translate-x-10 translate-y-10 text-white/10 group-hover:rotate-12 transition-transform duration-500" />
                </div>
            </div>

            {/* Creation Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 text-left">
                    <div
                        className="absolute inset-0 bg-gray-900/40 backdrop-blur-md transition-opacity duration-500"
                        onClick={() => setIsModalOpen(false)}
                    ></div>

                    <div className="relative bg-white rounded-3xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] border border-gray-100 max-w-lg w-full overflow-hidden transform transition-all animate-in fade-in slide-in-from-bottom-8 duration-500 font-sans">
                        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-6 flex items-center justify-between text-left">
                            <h2 className="text-white font-black uppercase tracking-widest flex items-center text-sm">
                                <Plus size={20} className="mr-3" />
                                Create Academic Section
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all hover:rotate-90 active:scale-75"
                            >
                                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form className="p-8">
                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-violet-500 uppercase tracking-[0.2em] ml-1">Section Identity Name</label>
                                    <div className="relative">
                                        <SplitSquareVertical className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-400" size={18} />
                                        <input
                                            type="text"
                                            placeholder="Ex: Section Alpha"
                                            className="w-full pl-12 pr-4 py-3 bg-violet-50/30 border-2 border-transparent rounded-2xl text-sm focus:outline-none focus:border-violet-500 focus:bg-white transition-all font-bold text-gray-900 placeholder:text-violet-200"
                                            value={formData.sectionName}
                                            onChange={(e) => setFormData({ ...formData, sectionName: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-violet-500 uppercase tracking-[0.2em] ml-1">Configuration Scope</label>
                                    <textarea
                                        rows={3}
                                        className="w-full px-5 py-3 bg-violet-50/30 border-2 border-transparent rounded-2xl text-sm focus:outline-none focus:border-violet-500 focus:bg-white transition-all font-bold text-gray-900 placeholder:text-violet-200 resize-none"
                                        placeholder="Define structural purpose..."
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    ></textarea>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-violet-500 uppercase tracking-[0.2em] ml-1">Deployment Status</label>
                                    <div className="flex items-center gap-8 ml-2 mt-2">
                                        {['Active', 'Inactive'].map((status) => (
                                            <label key={status} className="flex items-center gap-3 cursor-pointer group">
                                                <div className="relative flex items-center justify-center">
                                                    <input
                                                        type="radio"
                                                        name="status"
                                                        className="peer absolute w-6 h-6 opacity-0"
                                                        checked={formData.status === status}
                                                        onChange={() => setFormData({ ...formData, status: status as any })}
                                                    />
                                                    <div className={`w-5 h-5 rounded-full border-2 transition-all group-hover:border-violet-400 ${formData.status === status ? 'border-violet-600 bg-violet-600' : 'border-gray-300'}`}>
                                                        {formData.status === status && <div className="w-1.5 h-1.5 bg-white rounded-full m-auto mt-[5px]"></div>}
                                                    </div>
                                                </div>
                                                <span className={`text-[11px] font-black tracking-widest transition-colors ${formData.status === status ? 'text-violet-900' : 'text-gray-400 group-hover:text-gray-600'}`}>{status.toUpperCase()}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 py-4 border-2 border-gray-100 rounded-2xl text-[11px] font-black uppercase tracking-widest text-gray-400 hover:bg-gray-50 hover:border-gray-200 hover:text-gray-600 transition-all active:scale-95"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setIsModalOpen(false);
                                    }}
                                    className="flex-[1.5] py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:shadow-[0_20px_40px_-12px_rgba(124,58,237,0.3)] transition-all active:scale-95 shadow-lg shadow-violet-200"
                                >
                                    Register Section
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
