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
    UserCheck,
} from 'lucide-react';

export default function ClassNameCreate() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        className: '',
        status: 'Active',
        description: ''
    });

    const [searchTerm, setSearchTerm] = useState('');

    const classes = [
        { id: 'CN-001', name: 'Grade 1', students: 120, status: 'Active' },
        { id: 'CN-002', name: 'Grade 2', students: 115, status: 'Active' },
        { id: 'CN-003', name: 'Grade 3', students: 130, status: 'Active' },
        { id: 'CN-004', name: 'Grade 4', students: 105, status: 'Active' },
        { id: 'CN-005', name: 'Grade 5', students: 140, status: 'Inactive' },
    ];

    const stats = [
        { name: 'Total Managed Classes', value: '12', icon: Layers, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { name: 'Active Student Population', value: '1,420', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { name: 'Department Heads', value: '8', icon: UserCheck, color: 'text-amber-600', bg: 'bg-amber-50' },
        { name: 'Creation Progress', value: '92%', icon: CheckCircle2, color: 'text-rose-600', bg: 'bg-rose-50' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-center">
                <h1 className="text-xl font-black text-gray-900 uppercase tracking-widest">class name create</h1>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 group hover:border-indigo-100 transition-colors">
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

            {/* Class Creation Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between flex-wrap gap-4">
                    <h2 className="font-bold text-gray-900 flex items-center text-sm uppercase tracking-wider">
                        <Layers size={16} className="mr-2 text-indigo-600" />
                        Class Master Registry
                    </h2>
                    <div className="flex items-center space-x-2">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                            <input
                                type="text"
                                placeholder="Search specific class..."
                                className="pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 w-56 font-medium"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center space-x-2 px-4 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-xs font-bold leading-none shadow-md shadow-indigo-100"
                        >
                            <Plus size={14} />
                            <span>INITIALIZE CLASS</span>
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Class Identifier</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Designation</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Total Enrollment</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Operational Status</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-right">Administrative Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {classes.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase())).map((c) => (
                                <tr key={c.id} className="hover:bg-gray-50/80 transition-colors">
                                    <td className="px-6 py-4">
                                        <span className="text-[10px] font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">{c.id}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-xs font-bold text-gray-900">{c.name} Official Designation</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-2">
                                            <Users size={14} className="text-gray-400" />
                                            <span className="text-xs font-black text-gray-900">{c.students} Students</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${c.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                                            {c.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end space-x-1">
                                            <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                                                <Edit2 size={14} />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
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
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Class Name Configuration System v1.0</p>
                    <div className="flex space-x-1">
                        <button className="px-2.5 py-1 border border-indigo-200 rounded text-[10px] font-black text-indigo-600 bg-white shadow-sm">1</button>
                        <button className="px-2.5 py-1 border border-transparent rounded text-[10px] font-black text-gray-300 hover:text-gray-400 transition-colors">2</button>
                    </div>
                </div>
            </div>

            {/* Additional Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest flex items-center">
                            <Clock size={16} className="mr-2 text-amber-500" />
                            Generation Logs
                        </h3>
                    </div>
                    <div className="space-y-4">
                        {[
                            { class: 'Grade 10', msg: 'System verified unique identifier', time: '5 mins ago' },
                            { class: 'Grade 12', msg: 'Admin assigned specific category', time: '2 hours ago' },
                        ].map((change, i) => (
                            <div key={i} className="flex items-center justify-between border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                                <div>
                                    <p className="text-xs font-bold text-gray-800">{change.class}</p>
                                    <p className="text-[10px] text-gray-400 font-medium">{change.msg}</p>
                                </div>
                                <span className="text-[10px] text-gray-400 font-bold uppercase">{change.time}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-xl p-6 text-white shadow-lg relative overflow-hidden group">
                    <div className="relative z-10">
                        <h3 className="text-lg font-bold mb-2 tracking-tight">Bulk Initialization</h3>
                        <p className="text-sm text-indigo-100 mb-6 opacity-90 leading-relaxed font-medium">Instantly generate entire academic levels with pre-configured schemas.</p>
                        <button className="px-6 py-2.5 bg-white text-indigo-600 rounded-lg text-xs font-black uppercase tracking-wider hover:bg-indigo-50 transition-all shadow-xl shadow-indigo-900/40 active:scale-95">
                            Start Bulk Import
                        </button>
                    </div>
                    <Layers size={140} className="absolute bottom-0 right-0 p-4 transform translate-x-12 translate-y-12 text-white/10 group-hover:scale-110 transition-transform duration-500" />
                </div>
            </div>

            {/* Initialization Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 text-left">
                    <div
                        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsModalOpen(false)}
                    ></div>

                    <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 max-w-lg w-full overflow-hidden transform transition-all animate-in fade-in zoom-in duration-300 font-sans">
                        <div className="bg-indigo-600 px-6 py-4 flex items-center justify-between text-left">
                            <h2 className="text-white font-black uppercase tracking-widest flex items-center text-sm">
                                <Plus size={18} className="mr-2" />
                                Initialize New Class Name
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-indigo-100 hover:text-white transition-colors"
                            >
                                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form className="p-6">
                            <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Official Class Name</label>
                                    <div className="relative">
                                        <Layers className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                        <input
                                            type="text"
                                            placeholder="Ex: Grade 7"
                                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-bold text-gray-900 placeholder:text-gray-300"
                                            value={formData.className}
                                            onChange={(e) => setFormData({ ...formData, className: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Creation Notes</label>
                                    <textarea
                                        rows={3}
                                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-bold text-gray-900 placeholder:text-gray-300"
                                        placeholder="Internal reference notes..."
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    ></textarea>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Registration Status</label>
                                    <div className="flex items-center space-x-6 ml-1 mt-1">
                                        <label className="flex items-center space-x-2 cursor-pointer group">
                                            <input
                                                type="radio"
                                                name="status"
                                                className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                                                checked={formData.status === 'Active'}
                                                onChange={() => setFormData({ ...formData, status: 'Active' })}
                                            />
                                            <span className="text-xs font-bold text-gray-600 group-hover:text-gray-900">Operational</span>
                                        </label>
                                        <label className="flex items-center space-x-2 cursor-pointer group">
                                            <input
                                                type="radio"
                                                name="status"
                                                className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                                                checked={formData.status === 'Inactive'}
                                                onChange={() => setFormData({ ...formData, status: 'Inactive' })}
                                            />
                                            <span className="text-xs font-bold text-gray-600 group-hover:text-gray-900">Waitlist</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex items-center space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 py-2 border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:bg-gray-50 transition-all active:scale-95"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setIsModalOpen(false);
                                    }}
                                    className="flex-2 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95 px-8"
                                >
                                    Save Class Name
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
