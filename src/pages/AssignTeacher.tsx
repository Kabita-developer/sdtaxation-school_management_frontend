import { useState } from 'react';
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    UserCheck,
    Users,
    Briefcase,
    ChevronDown,
    Filter,
    Download,
    LayoutGrid,
    ShieldCheck,
    UserPlus
} from 'lucide-react';

export default function AssignTeacher() {
    const [formData, setFormData] = useState({
        class: '',
        section: '',
        teacher: '',
    });

    const [searchTerm, setSearchTerm] = useState('');

    const assignments = [
        { id: 'ASN001', class: 'Grade 10', section: 'A', teacher: 'Mrs. Sanchita Roy', experience: '12 Yrs', status: 'Active', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100' },
        { id: 'ASN002', class: 'Grade 10', section: 'B', teacher: 'Mr. Pradeep Kumar', experience: '8 Yrs', status: 'Active', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100' },
        { id: 'ASN003', class: 'Grade 12', section: 'C', teacher: 'Ms. Anjali Sharma', experience: '15 Yrs', status: 'Active', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100' },
        { id: 'ASN004', class: 'Grade 9', section: 'A', teacher: 'Mr. Vikram Singh', experience: '5 Yrs', status: 'On-Hold', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100' },
        { id: 'ASN005', class: 'Grade 11', section: 'B', teacher: 'Mrs. Pooja Das', experience: '10 Yrs', status: 'Active', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100' },
    ];

    const stats = [
        { name: 'Total Classes', value: '42', icon: Briefcase, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { name: 'Assigned', value: '38', icon: UserCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { name: 'Vacant', value: '04', icon: UserPlus, color: 'text-rose-600', bg: 'bg-rose-50' },
        { name: 'Faculty', value: '120+', icon: ShieldCheck, color: 'text-amber-600', bg: 'bg-amber-50' },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500 text-left">
            {/* Header */}
            <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-2">
                <div>
                    <h1 className="text-xl font-black text-gray-900 uppercase tracking-widest flex items-center">
                        <UserCheck size={22} className="mr-3 text-indigo-600" />
                        Teacher Assignments
                    </h1>
                    <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 tracking-widest font-mono">Academic mentorship & faculty resource allocation</p>
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
                            <h2 className="text-sm font-black text-gray-800 uppercase tracking-widest italic decoration-indigo-500/30 underline decoration-4 underline-offset-4">Assign Class Mentor</h2>
                        </div>
                        
                        <div className="p-8 space-y-8">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1 text-left block">Target Class <span className="text-rose-500">*</span></label>
                                    <select className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl text-[13px] font-bold text-gray-700 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all appearance-none cursor-pointer">
                                        <option>Select Class</option>
                                        <option>Grade 9</option>
                                        <option>Grade 10</option>
                                        <option>Grade 11</option>
                                        <option>Grade 12</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1 text-left block">Assigned Section <span className="text-rose-500">*</span></label>
                                    <select className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl text-[13px] font-bold text-gray-700 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all appearance-none cursor-pointer">
                                        <option>Select Section</option>
                                        <option>Section A</option>
                                        <option>Section B</option>
                                        <option>Section C</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1 text-left block">Lead Faculty <span className="text-rose-500">*</span></label>
                                    <select className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl text-[13px] font-bold text-gray-700 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all appearance-none cursor-pointer">
                                        <option>Select Teacher</option>
                                        <option>Mrs. Sanchita Roy</option>
                                        <option>Mr. Pradeep Kumar</option>
                                        <option>Ms. Anjali Sharma</option>
                                    </select>
                                </div>
                            </div>

                            <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100/50">
                                <p className="text-[10px] text-indigo-600/70 font-bold leading-relaxed">
                                    * Faculty assigned here will oversee daily cohort operations, attendance, and student performance metrics.
                                </p>
                            </div>
                        </div>

                        <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex justify-end">
                            <button className="flex items-center space-x-2 px-10 py-3 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95 group">
                                <span>Confirm Deploy</span>
                                <Plus size={14} className="group-hover:rotate-90 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Side: List Table */}
                <div className="lg:col-span-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
                        <div className="p-6 border-b border-gray-50 flex flex-wrap items-center justify-between gap-4">
                            <h2 className="text-sm font-black text-gray-800 uppercase tracking-widest">Faculty Deployment Matrix</h2>

                            <div className="flex flex-wrap items-center gap-3">
                                <div className="relative group">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={14} />
                                    <input
                                        type="text"
                                        placeholder="Search faculty..."
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
                                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Mentor</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Grade Assignment</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Experience</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Status</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {assignments.filter(a => a.teacher.toLowerCase().includes(searchTerm.toLowerCase())).map((a) => (
                                        <tr key={a.id} className="hover:bg-indigo-50/20 transition-all group">
                                            <td className="px-6 py-4 vertical-middle">
                                                <div className="flex items-center space-x-3">
                                                    <img src={a.photo} alt="" className="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-50" />
                                                    <div className="flex flex-col">
                                                        <span className="text-[12px] font-black text-gray-900 uppercase tracking-widest group-hover:text-indigo-600 transition-colors">{a.teacher}</span>
                                                        <span className="text-[10px] font-mono text-gray-400">{a.id}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 vertical-middle">
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-[11px] font-bold text-gray-900">{a.class}</span>
                                                    <span className="w-5 h-5 flex items-center justify-center bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-black">{a.section}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 vertical-middle">
                                                <span className="text-[11px] font-black text-gray-600">{a.experience}</span>
                                            </td>
                                            <td className="px-6 py-4 vertical-middle">
                                                <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${a.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                                                    {a.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right vertical-middle">
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
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono italic">
                                Faculty distribution verified
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
