import { useState } from 'react';
import {
    Plus,
    Search,
    History,
    Edit2,
    Trash2,
    CheckCircle2,
    UserCheck,
    Users,
    Briefcase,
    ChevronRight,
    Star,
    UserPlus,
    ShieldCheck
} from 'lucide-react';

export default function AssignTeacher() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const assignments = [
        { id: 'ASN001', class: 'Grade 10', section: 'A', teacher: 'Mrs. Sanchita Roy', experience: '12 Yrs', status: 'Active', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100' },
        { id: 'ASN002', class: 'Grade 10', section: 'B', teacher: 'Mr. Pradeep Kumar', experience: '8 Yrs', status: 'Active', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100' },
        { id: 'ASN003', class: 'Grade 12', section: 'C', teacher: 'Ms. Anjali Sharma', experience: '15 Yrs', status: 'Active', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100' },
        { id: 'ASN004', class: 'Grade 9', section: 'A', teacher: 'Mr. Vikram Singh', experience: '5 Yrs', status: 'On-Hold', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100' },
        { id: 'ASN005', class: 'Grade 11', section: 'B', teacher: 'Mrs. Pooja Das', experience: '10 Yrs', status: 'Active', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100' },
    ];

    const stats = [
        { name: 'Total Classes', value: '42', icon: Briefcase, color: 'text-amber-600', bg: 'bg-amber-50' },
        { name: 'Teachers Assigned', value: '38', icon: UserCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { name: 'Vacant Positions', value: '04', icon: UserPlus, color: 'text-rose-600', bg: 'bg-rose-50' },
        { name: 'Faculty Strength', value: '120+', icon: ShieldCheck, color: 'text-blue-600', bg: 'bg-blue-50' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-center">
                <h1 className="text-xl font-black text-gray-900 uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">assign class teacher</h1>
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

            {/* Assignment Registry */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between flex-wrap gap-4 text-left">
                    <h2 className="font-bold text-gray-900 flex items-center text-sm uppercase tracking-wider">
                        <Briefcase size={16} className="mr-2 text-emerald-600" />
                        Academic Roles & Responsibilities
                    </h2>
                    <div className="flex items-center space-x-2">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                            <input
                                type="text"
                                placeholder="Search by teacher or class..."
                                className="pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 w-64 font-medium"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center space-x-2 px-4 py-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all text-xs font-bold leading-none shadow-md shadow-emerald-100 active:scale-95"
                        >
                            <Plus size={14} />
                            <span>ASSIGN FACULTY</span>
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Academic Grade</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Faculty In-Charge</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Experience</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {assignments.filter(a => a.teacher.toLowerCase().includes(searchTerm.toLowerCase()) || a.class.toLowerCase().includes(searchTerm.toLowerCase())).map((a) => (
                                <tr key={a.id} className="hover:bg-gray-50/80 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-2">
                                            <span className="text-xs font-black text-gray-700 uppercase">{a.class}</span>
                                            <ChevronRight size={10} className="text-gray-300" />
                                            <span className="text-xs font-black text-emerald-700 bg-emerald-50 w-6 h-6 flex items-center justify-center rounded-lg border border-emerald-100">{a.section}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <img src={a.photo} alt="" className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-50" />
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-gray-900">{a.teacher}</span>
                                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Lead Mentor</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-1.5">
                                            <Star size={12} className="text-amber-400 fill-amber-400" />
                                            <span className="text-xs font-black text-gray-600">{a.experience} Seniority</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tight ${a.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
                                            }`}>
                                            {a.status}
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

                <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between font-sans">
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest italic font-sans">Faculty Management System v2.0</p>
                    <div className="flex space-x-1">
                        <button className="px-2.5 py-1 border border-emerald-200 rounded text-[10px] font-black text-emerald-600 bg-white shadow-sm ring-1 ring-emerald-50">1</button>
                        <button className="px-2.5 py-1 border border-transparent rounded text-[10px] font-black text-gray-300">2</button>
                    </div>
                </div>
            </div>

            {/* Info Panel */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 relative overflow-hidden group text-left">
                    <div className="relative z-10 text-left">
                        <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4 flex items-center">
                            <History size={16} className="mr-2 text-emerald-500" />
                            Recent Assignments
                        </h3>
                        <div className="space-y-4">
                            {[
                                { title: 'Grade 10-A Assigned', desc: 'Assigned to Mrs. Sanchita Roy (Dept. of Mathematics)', time: '2 hours ago' },
                                { title: 'Grade 12-C Re-assigned', desc: 'Transitioned from Mr. Rahul to Ms. Anjali', time: 'Yesterday' },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 p-3 bg-gray-50/50 rounded-xl border border-transparent hover:border-emerald-100 hover:bg-emerald-50/30 transition-all cursor-pointer">
                                    <div className="w-1.5 h-full rounded-full bg-emerald-500 mt-1"></div>
                                    <div>
                                        <p className="text-[11px] font-black text-gray-900 uppercase">{item.title}</p>
                                        <p className="text-[10px] text-gray-500 font-medium leading-relaxed">{item.desc}</p>
                                        <p className="text-[9px] font-bold text-emerald-600 mt-1 uppercase">{item.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-teal-800 rounded-xl p-6 text-white shadow-lg relative overflow-hidden group">
                    <div className="relative z-10 text-left">
                        <h3 className="text-lg font-bold mb-2 tracking-tight">Faculty Deployment</h3>
                        <p className="text-sm text-emerald-50 mb-6 opacity-90 leading-relaxed font-medium">Coordinate class teachers and secondary supervisors across the multi-campus academic structure.</p>
                        <div className="flex space-x-3">
                            <button className="px-6 py-2.5 bg-white text-emerald-700 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-emerald-50 transition-all shadow-xl active:scale-95">
                                Sync Records
                            </button>
                            <button className="px-6 py-2.5 bg-emerald-500/30 backdrop-blur-md border border-white/20 text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95">
                                View Faculty List
                            </button>
                        </div>
                    </div>
                    <CheckCircle2 size={130} className="absolute bottom-0 right-0 p-4 transform translate-x-10 translate-y-10 text-white/10 group-hover:rotate-12 transition-transform duration-500" />
                </div>
            </div>

            {/* Assignment Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-gray-900/60 backdrop-blur-md transition-opacity duration-500"
                        onClick={() => setIsModalOpen(false)}
                    ></div>

                    <div className="relative bg-white rounded-3xl shadow-[0_32px_64px_-12px_rgba(5,150,105,0.25)] border border-gray-100 max-w-lg w-full overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-300">
                        <div className="bg-emerald-600 px-8 py-6 flex items-center justify-between text-left">
                            <h2 className="text-white font-black uppercase tracking-[0.2em] flex items-center text-sm">
                                <UserCheck size={20} className="mr-3 text-emerald-200" />
                                Assign Class Faculty
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-white/60 hover:text-white transition-colors"
                            >
                                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form className="p-8 space-y-6 text-left">
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-emerald-600 uppercase tracking-widest ml-1">Academic Grade</label>
                                        <select className="w-full px-4 py-3 bg-emerald-50/50 border-2 border-transparent rounded-2xl text-xs focus:outline-none focus:border-emerald-500 focus:bg-white transition-all font-bold text-gray-900 appearance-none">
                                            <option>Select Class</option>
                                            <option>Grade 9</option>
                                            <option>Grade 10</option>
                                            <option>Grade 11</option>
                                            <option>Grade 12</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-emerald-600 uppercase tracking-widest ml-1">Section Branch</label>
                                        <select className="w-full px-4 py-3 bg-emerald-50/50 border-2 border-transparent rounded-2xl text-xs focus:outline-none focus:border-emerald-500 focus:bg-white transition-all font-bold text-gray-900 appearance-none">
                                            <option>Select Section</option>
                                            <option>Section A</option>
                                            <option>Section B</option>
                                            <option>Section C</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-emerald-600 uppercase tracking-widest ml-1">Select Lead Faculty</label>
                                    <div className="relative">
                                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400" size={18} />
                                        <select className="w-full pl-12 pr-4 py-3 bg-emerald-50/50 border-2 border-transparent rounded-2xl text-xs focus:outline-none focus:border-emerald-500 focus:bg-white transition-all font-bold text-gray-900 appearance-none">
                                            <option>Find teacher by name...</option>
                                            <option>Mrs. Sanchita Roy (Senior Mentor)</option>
                                            <option>Mr. Pradeep Kumar (Facilitator)</option>
                                            <option>Ms. Anjali Sharma (Head of Dept)</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <ShieldCheck size={16} className="text-emerald-600" />
                                        <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Responsibility Scope</span>
                                    </div>
                                    <p className="text-[10px] text-emerald-600 font-bold leading-relaxed opacity-80 uppercase italic">Selected faculty will oversee daily attendance, academic tracking, and parent communications for the designated cohort.</p>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 py-4 border-2 border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:bg-gray-50 transition-all active:scale-95"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setIsModalOpen(false);
                                    }}
                                    className="flex-[1.5] py-4 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:shadow-[0_20px_40px_-12px_rgba(5,150,105,0.4)] transition-all active:scale-95 shadow-lg shadow-emerald-200"
                                >
                                    CONFIRM DEPLOYMENT
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
