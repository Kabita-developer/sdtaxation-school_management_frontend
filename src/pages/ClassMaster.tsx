import { useState } from 'react';
import {
    Plus,
    Search,
    Layers,
    LayoutGrid,
    Users,
    Edit2,
    Trash2,
    CheckCircle2,
    Clock,
    UserCheck,
    GraduationCap,
    BookOpen
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ClassMaster() {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        className: '',
        section: '',
        room: '',
        teacher: '',
        strength: '',
        status: 'Active'
    });

    const [searchTerm, setSearchTerm] = useState('');

    const classes = [
        { id: 'CL-101', name: 'Grade 10', section: 'A', room: 'R-201', teacher: 'Mrs. Sharma', students: 42, status: 'Active' },
        { id: 'CL-102', name: 'Grade 10', section: 'B', room: 'R-202', teacher: 'Mr. Gupta', students: 38, status: 'Active' },
        { id: 'CL-091', name: 'Grade 9', section: 'A', room: 'R-105', teacher: 'Ms. Verma', students: 45, status: 'Active' },
        { id: 'CL-121', name: 'Grade 12', section: 'Science', room: 'Lab-A', teacher: 'Dr. Reddy', students: 35, status: 'Active' },
        { id: 'CL-111', name: 'Grade 11', section: 'Commerce', room: 'R-305', teacher: 'Mr. Malhotra', students: 40, status: 'Inactive' },
        { id: 'CL-081', name: 'Grade 8', section: 'A', room: 'R-101', teacher: 'Mrs. Patel', students: 39, status: 'Active' },
    ];

    const stats = [
        { name: 'Total Classes', value: '24', icon: Layers, color: 'text-pink-600', bg: 'bg-pink-50' },
        { name: 'Total Students', value: '840', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
        { name: 'Active Teachers', value: '32', icon: UserCheck, color: 'text-green-600', bg: 'bg-green-50' },
        { name: 'Average Strength', value: '35', icon: GraduationCap, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    ];

    return (
        <div className="space-y-6 text-left">
            <div className="flex items-center justify-center">
                <h1 className="text-xl font-black text-gray-900 uppercase tracking-widest">class master</h1>
            </div>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 group hover:border-pink-100 transition-colors">
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

            {/* Class Registry Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between flex-wrap gap-4">
                    <h2 className="font-bold text-gray-900 flex items-center text-sm uppercase tracking-wider">
                        <Layers size={16} className="mr-2 text-pink-600" />
                        Class Registry
                    </h2>
                    <div className="flex items-center space-x-2">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                            <input
                                type="text"
                                placeholder="Search class or teacher..."
                                className="pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-pink-500 w-56 font-medium"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center space-x-2 px-4 py-1.5 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors text-xs font-bold leading-none shadow-md shadow-pink-100"
                        >
                            <Plus size={14} />
                            <span>ADD NEW CLASS</span>
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Class & Section</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Class Teacher</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Room No.</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Students</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {classes.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.teacher.toLowerCase().includes(searchTerm.toLowerCase())).map((c) => (
                                <tr key={c.id} className="hover:bg-gray-50/80 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-gray-900">{c.name} - {c.section}</span>
                                            <span className="text-[10px] font-mono font-bold text-pink-600">{c.id}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">
                                                {c.teacher[0]}
                                            </div>
                                            <span className="text-xs font-bold text-gray-700">{c.teacher}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-xs font-bold text-gray-600">{c.room}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-xs font-black text-gray-900">{c.students}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${c.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                            {c.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end space-x-1">
                                            <button className="p-2 text-gray-400 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-colors">
                                                <Edit2 size={14} />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
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
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Academic Session 2025-26 Registry</p>
                    <div className="flex space-x-1">
                        <button className="px-2.5 py-1 border border-gray-200 rounded text-[10px] font-black text-gray-600 bg-white">1</button>
                        <button className="px-2.5 py-1 border border-transparent rounded text-[10px] font-black text-gray-300">2</button>
                    </div>
                </div>
            </div>

            {/* Additional Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest flex items-center">
                            <Clock size={16} className="mr-2 text-orange-500" />
                            Recent Class Changes
                        </h3>
                    </div>
                    <div className="space-y-4">
                        {[
                            { class: 'Grade 10-A', msg: 'Updated room from R-102 to R-201', time: '10 mins ago' },
                            { class: 'Grade 12-Science', msg: 'Assigned new teacher Dr. Reddy', time: '1 hour ago' },
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

                <div className="bg-gradient-to-br from-pink-600 to-rose-700 rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-lg font-bold mb-2">Class Distribution</h3>
                        <p className="text-sm text-pink-100 mb-6 opacity-90 leading-relaxed font-medium">Auto-assign students to sections based on enrollment capacity.</p>
                        <button className="px-6 py-2.5 bg-white text-pink-600 rounded-lg text-xs font-black uppercase tracking-wider hover:bg-pink-50 transition-all shadow-xl shadow-pink-900/20 active:scale-95">
                            Optimize Sections
                        </button>
                    </div>
                    <CheckCircle2 size={120} className="absolute bottom-0 right-0 p-4 transform translate-x-8 translate-y-8 text-white/10" />
                </div>
            </div>

            {/* Add New Class Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsModalOpen(false)}
                    ></div>

                    <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 max-w-lg w-full overflow-hidden transform transition-all animate-in fade-in zoom-in duration-300 font-sans text-left">
                        <div className="bg-pink-600 px-6 py-2 flex items-center justify-between">
                            <h2 className="text-white font-black uppercase tracking-widest flex items-center text-sm">
                                <Plus size={18} className="mr-2" />
                                Create New Class
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-pink-100 hover:text-white transition-colors"
                            >
                                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Class Name</label>
                                    <div className="relative">
                                        <Layers className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                        <input
                                            type="text"
                                            placeholder="Ex: Grade 10"
                                            className="w-full pl-10 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all font-bold text-black placeholder:text-black/30"
                                            value={formData.className}
                                            onChange={(e) => setFormData({ ...formData, className: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Section</label>
                                    <div className="relative">
                                        <LayoutGrid className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                        <input
                                            type="text"
                                            placeholder="Ex: Section A"
                                            className="w-full pl-10 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all font-bold text-black placeholder:text-black/30"
                                            value={formData.section}
                                            onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1 md:col-span-2">
                                    <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Class Teacher</label>
                                    <div className="relative">
                                        <UserCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                        <input
                                            type="text"
                                            placeholder="Assign a lead educator..."
                                            className="w-full pl-10 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all font-bold text-black placeholder:text-black/30"
                                            value={formData.teacher}
                                            onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Room Number</label>
                                    <div className="relative">
                                        <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                        <input
                                            type="text"
                                            placeholder="Ex: R-201"
                                            className="w-full pl-10 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all font-bold text-black placeholder:text-black/30"
                                            value={formData.room}
                                            onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Student Strength</label>
                                    <div className="relative">
                                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                        <input
                                            type="number"
                                            placeholder="Max capacity"
                                            className="w-full pl-10 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all font-bold text-black placeholder:text-black/30"
                                            value={formData.strength}
                                            onChange={(e) => setFormData({ ...formData, strength: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1 md:col-span-2">
                                    <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Academic Status</label>
                                    <div className="flex items-center space-x-4 ml-1 mt-1">
                                        <label className="flex items-center space-x-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                className="w-4 h-4 text-pink-600 focus:ring-pink-500"
                                                checked={formData.status === 'Active'}
                                                onChange={() => setFormData({ ...formData, status: 'Active' })}
                                            />
                                            <span className="text-xs font-bold text-gray-700">Active</span>
                                        </label>
                                        <label className="flex items-center space-x-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                className="w-4 h-4 text-pink-600 focus:ring-pink-500"
                                                checked={formData.status === 'Inactive'}
                                                onChange={() => setFormData({ ...formData, status: 'Inactive' })}
                                            />
                                            <span className="text-xs font-bold text-gray-700">Inactive</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 py-1.5 border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:bg-gray-50 transition-all active:scale-95"
                                >
                                    Discard
                                </button>
                                <button
                                    type="submit"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setIsModalOpen(false);
                                    }}
                                    className="flex-2 py-1.5 bg-pink-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-pink-700 transition-all shadow-lg shadow-pink-200 active:scale-95 px-6"
                                >
                                    Register Class
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
