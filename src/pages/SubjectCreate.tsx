import { useState } from 'react';
import {
    Plus,
    Search,
    BookMarked,
    Edit2,
    Trash2,
    CheckCircle2,
    Clock,
    GraduationCap,
    Dna,
    List,
    Tag,
} from 'lucide-react';

export default function SubjectCreate() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        subjectName: '',
        subjectCode: '',
        subjectType: 'Theory',
        status: 'Active',
        description: ''
    });

    const [searchTerm, setSearchTerm] = useState('');

    const subjects = [
        { id: 'SUB-101', name: 'Mathematics', code: 'MATH-10', type: 'Theory', status: 'Active' },
        { id: 'SUB-102', name: 'Physics', code: 'PHYS-10', type: 'Theory + Practical', status: 'Active' },
        { id: 'SUB-103', name: 'Computer Science', code: 'CS-10', type: 'Theory + Practical', status: 'Active' },
        { id: 'SUB-104', name: 'English Literature', code: 'ENG-10', type: 'Theory', status: 'Active' },
        { id: 'SUB-105', name: 'Artificial Intelligence', code: 'AI-10', type: 'Theory + Practical', status: 'Active' },
        { id: 'SUB-106', name: 'Physical Education', code: 'PE-10', type: 'Practical', status: 'Inactive' },
    ];

    const stats = [
        { name: 'Total Academic Subjects', value: '42', icon: BookMarked, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { name: 'Active Curriculum', value: '18+', icon: GraduationCap, color: 'text-blue-600', bg: 'bg-blue-50' },
        { name: 'Lab-Intensive Units', value: '12', icon: Dna, color: 'text-rose-600', bg: 'bg-rose-50' },
        { name: 'Elective Selection', value: '8', icon: List, color: 'text-amber-600', bg: 'bg-amber-50' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-center">
                <h1 className="text-xl font-black text-gray-900 uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">subject create</h1>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 group hover:border-emerald-100 transition-colors">
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

            {/* Subject Registry Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between flex-wrap gap-4">
                    <h2 className="font-bold text-gray-900 flex items-center text-sm uppercase tracking-wider">
                        <BookMarked size={16} className="mr-2 text-emerald-600" />
                        Academic Subject Registry
                    </h2>
                    <div className="flex items-center space-x-2">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                            <input
                                type="text"
                                placeholder="Search subject code or name..."
                                className="pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 w-56 font-medium"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center space-x-2 px-4 py-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all text-xs font-bold leading-none shadow-md shadow-emerald-100 active:scale-95"
                        >
                            <Plus size={14} />
                            <span>DEFINE SUBJECT</span>
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Subject Identifier</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Educational Designation</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Course Code</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Instruction Format</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {subjects.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.code.toLowerCase().includes(searchTerm.toLowerCase())).map((s) => (
                                <tr key={s.id} className="hover:bg-gray-50/80 transition-colors">
                                    <td className="px-6 py-4">
                                        <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded shadow-sm border border-emerald-100">{s.id}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-xs font-bold text-gray-900">{s.name} Curriculum Layer</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-xs font-black text-gray-700">{s.code}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-2">
                                            <div className={`w-1.5 h-1.5 rounded-full ${s.type.includes('Practical') ? 'bg-rose-500' : 'bg-emerald-500'}`}></div>
                                            <span className="text-xs font-bold text-gray-600">{s.type}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${s.status === 'Active' ? 'bg-emerald-50 text-emerald-600 shadow-sm border border-emerald-100' : 'bg-rose-50 text-rose-600 shadow-sm border border-rose-100'}`}>
                                            {s.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end space-x-1">
                                            <button className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all active:scale-90">
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
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Subject Management System v3.1</p>
                    <div className="flex space-x-1">
                        <button className="px-2.5 py-1 border border-emerald-200 rounded text-[10px] font-black text-emerald-600 bg-white shadow-sm ring-1 ring-emerald-50">1</button>
                        <button className="px-2.5 py-1 border border-transparent rounded text-[10px] font-black text-gray-300">2</button>
                    </div>
                </div>
            </div>

            {/* Additional Insight Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 overflow-hidden relative group">
                    <div className="relative z-10 text-left">
                        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest flex items-center mb-4">
                            <Clock size={16} className="mr-2 text-emerald-500" />
                            Recent Definitions
                        </h3>
                        <div className="space-y-4">
                            {[
                                { sub: 'Quantum Mechanics', msg: 'Added to Grade 12 Advanced Electives', time: '1 hour ago' },
                                { sub: 'Neural Networks', msg: 'Subject code updated to AI-102', time: '5 hours ago' },
                            ].map((change, i) => (
                                <div key={i} className="flex items-center justify-between border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                                    <div>
                                        <p className="text-xs font-bold text-gray-800">{change.sub}</p>
                                        <p className="text-[10px] text-gray-400 font-medium italic">{change.msg}</p>
                                    </div>
                                    <span className="text-[10px] text-gray-400 font-bold uppercase">{change.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <BookMarked size={90} className="absolute -bottom-4 -right-4 text-emerald-50 group-hover:scale-125 transition-transform duration-700 opacity-60" />
                </div>

                <div className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 rounded-xl p-6 text-white shadow-lg relative overflow-hidden group">
                    <div className="relative z-10 text-left">
                        <h3 className="text-lg font-bold mb-2 tracking-tight">Curriculum Sync</h3>
                        <p className="text-sm text-emerald-100 mb-6 opacity-90 leading-relaxed font-medium">Synchronize newly created subjects with the digital learning environment.</p>
                        <button className="px-6 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-emerald-600 transition-all shadow-xl active:scale-95">
                            Execute Sync-Grid
                        </button>
                    </div>
                    <CheckCircle2 size={130} className="absolute bottom-0 right-0 p-4 transform translate-x-10 translate-y-10 text-white/10 group-hover:rotate-12 transition-transform duration-500" />
                </div>
            </div>

            {/* Subject Creation Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 text-left">
                    <div
                        className="absolute inset-0 bg-gray-900/40 backdrop-blur-md transition-opacity duration-500"
                        onClick={() => setIsModalOpen(false)}
                    ></div>

                    <div className="relative bg-white rounded-3xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.18)] border border-gray-100 max-w-lg w-full overflow-hidden transform transition-all animate-in fade-in slide-in-from-bottom-8 duration-500 font-sans">
                        <div className="bg-emerald-600 px-8 py-6 flex items-center justify-between text-left">
                            <h2 className="text-white font-black uppercase tracking-widest flex items-center text-sm">
                                <Plus size={20} className="mr-3" />
                                Initiate Subject Entry
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
                                <div className="grid grid-cols-2 gap-4 text-left">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] ml-1">Subject Name</label>
                                        <div className="relative">
                                            <BookMarked className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400" size={18} />
                                            <input
                                                type="text"
                                                placeholder="Ex: Calculus"
                                                className="w-full pl-12 pr-4 py-3 bg-emerald-50/30 border-2 border-transparent rounded-2xl text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition-all font-bold text-gray-900 placeholder:text-emerald-200"
                                                value={formData.subjectName}
                                                onChange={(e) => setFormData({ ...formData, subjectName: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] ml-1">Subject Code</label>
                                        <div className="relative">
                                            <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400" size={18} />
                                            <input
                                                type="text"
                                                placeholder="Ex: MATH-01"
                                                className="w-full pl-12 pr-4 py-3 bg-emerald-50/30 border-2 border-transparent rounded-2xl text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition-all font-bold text-gray-900 placeholder:text-emerald-200"
                                                value={formData.subjectCode}
                                                onChange={(e) => setFormData({ ...formData, subjectCode: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2 text-left">
                                    <label className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] ml-1">Subject Classification</label>
                                    <div className="flex items-center gap-6 ml-2 mt-2">
                                        {['Theory', 'Practical', 'Both'].map((type) => (
                                            <label key={type} className="flex items-center gap-3 cursor-pointer group">
                                                <div className="relative flex items-center justify-center">
                                                    <input
                                                        type="radio"
                                                        name="type"
                                                        className="peer absolute w-6 h-6 opacity-0"
                                                        checked={formData.subjectType === type}
                                                        onChange={() => setFormData({ ...formData, subjectType: type as any })}
                                                    />
                                                    <div className={`w-5 h-5 rounded-full border-2 transition-all group-hover:border-emerald-400 ${formData.subjectType === type ? 'border-emerald-600 bg-emerald-600' : 'border-gray-300'}`}>
                                                        {formData.subjectType === type && <div className="w-1.5 h-1.5 bg-white rounded-full m-auto mt-[5px]"></div>}
                                                    </div>
                                                </div>
                                                <span className={`text-[11px] font-black tracking-widest transition-colors ${formData.subjectType === type ? 'text-emerald-900' : 'text-gray-400 group-hover:text-gray-600'}`}>{type.toUpperCase()}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2 text-left">
                                    <label className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] ml-1">Curriculum Status</label>
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
                                                    <div className={`w-5 h-5 rounded-full border-2 transition-all group-hover:border-emerald-400 ${formData.status === status ? 'border-emerald-600 bg-emerald-600' : 'border-gray-300'}`}>
                                                        {formData.status === status && <div className="w-1.5 h-1.5 bg-white rounded-full m-auto mt-[5px]"></div>}
                                                    </div>
                                                </div>
                                                <span className={`text-[11px] font-black tracking-widest transition-colors ${formData.status === status ? 'text-emerald-900' : 'text-gray-400 group-hover:text-gray-600'}`}>{status.toUpperCase()}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 flex gap-4 text-left">
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
                                    className="flex-[1.5] py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:shadow-[0_20px_40px_-12px_rgba(16,185,129,0.3)] transition-all active:scale-95 shadow-lg shadow-emerald-200"
                                >
                                    Register Subject
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
