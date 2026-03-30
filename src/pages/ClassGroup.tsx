import { useState } from 'react';
import {
    Search,
    LayoutGrid,
    Users,
    Edit2,
    Trash2,
    ChevronRight,
    FolderPlus,
    Tag,
    BarChart3
} from 'lucide-react';

export default function ClassGroup() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        groupName: '',
        classesIncluded: '',
        groupHead: '',
        status: 'Active',
        description: ''
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
        { name: 'Total Groups', value: '5', icon: LayoutGrid, color: 'text-orange-600', bg: 'bg-orange-50' },
        { name: 'Grouped Students', value: '1,065', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { name: 'Active Headings', value: '4', icon: Tag, color: 'text-teal-600', bg: 'bg-teal-50' },
        { name: 'Revenue Contribution', value: '₹1.8 Cr', icon: BarChart3, color: 'text-blue-600', bg: 'bg-blue-50' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-center">
                <h1 className="text-xl font-black text-gray-900 uppercase tracking-widest">class group</h1>
            </div>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 group hover:border-orange-100 transition-colors">
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

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between flex-wrap gap-4">
                    <h2 className="font-bold text-gray-900 flex items-center text-sm uppercase tracking-wider">
                        <LayoutGrid size={16} className="mr-2 text-orange-600" />
                        Academic Groupings
                    </h2>
                    <div className="flex items-center space-x-2">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                            <input
                                type="text"
                                placeholder="Search groups..."
                                className="pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-orange-500 w-56 font-medium"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center space-x-2 px-4 py-1.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-xs font-bold leading-none shadow-md shadow-orange-100"
                        >
                            <FolderPlus size={14} />
                            <span>NEW CLASS GROUP</span>
                        </button>
                    </div>
                </div>

                <div className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 divide-x divide-y divide-gray-100 border-b border-gray-100">
                        {groups.filter(g => g.name.toLowerCase().includes(searchTerm.toLowerCase())).map((g) => (
                            <div key={g.id} className="p-5 hover:bg-gray-50/80 transition-all group cursor-pointer relative overflow-hidden">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-mono font-bold text-orange-600 mb-1">{g.id}</span>
                                        <h3 className="text-base font-bold text-gray-900 group-hover:text-orange-600 transition-colors">{g.name}</h3>
                                    </div>
                                    <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${g.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                                        {g.status}
                                    </span>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[11px] text-gray-400 font-bold uppercase tracking-tight">Classes Included</span>
                                        <span className="text-xs font-bold text-gray-700">{g.classes}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[11px] text-gray-400 font-bold uppercase tracking-tight">Group Head</span>
                                        <span className="text-xs font-bold text-gray-700">{g.head}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[11px] text-gray-400 font-bold uppercase tracking-tight">Total Student Pop.</span>
                                        <div className="flex items-center space-x-1.5">
                                            <Users size={12} className="text-orange-500" />
                                            <span className="text-xs font-black text-gray-900">{g.totalStudents}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-5 flex items-center justify-between">
                                    <div className="flex space-x-1">
                                        <button className="p-1.5 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded transition-colors">
                                            <Edit2 size={13} />
                                        </button>
                                        <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                                            <Trash2 size={13} />
                                        </button>
                                    </div>
                                    <button className="flex items-center space-x-1 text-[10px] font-black text-orange-600 uppercase hover:underline">
                                        <span>Full Analytics</span>
                                        <ChevronRight size={12} />
                                    </button>
                                </div>
                                <div className="absolute top-0 right-0 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-4 bg-gray-50 flex items-center justify-between">
                    <p className="text-[10px] text-gray-400 font-bold uppercase italic tracking-widest">Manage academic hierachy for fee categorization</p>
                    <div className="text-[10px] font-black text-gray-900 bg-white px-3 py-1 rounded shadow-sm border border-gray-100">
                        Total Groups: {groups.length}
                    </div>
                </div>
            </div>

            {/* Additional Information */}
            <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl p-8 text-white shadow-xl shadow-orange-100 relative overflow-hidden">
                <div className="relative z-10 max-w-xl">
                    <h2 className="text-2xl font-black mb-3">Group-wise Fee Allocation</h2>
                    <p className="text-orange-50 mb-6 opacity-90 leading-relaxed">
                        Efficiently manage fee structures by grouping classes. Apply concessions, scholarship rules, and late fee policies to entire groups with a single click.
                    </p>
                    <div className="flex space-x-4">
                        <button className="px-6 py-2.5 bg-white text-orange-600 rounded-lg text-xs font-black uppercase tracking-wider hover:shadow-lg transition-all active:scale-95">
                            Bulk Manage Fees
                        </button>
                        <button className="px-6 py-2.5 bg-transparent border-2 border-white/30 text-white rounded-lg text-xs font-black uppercase tracking-wider hover:bg-white/10 transition-all">
                            View Documentation
                        </button>
                    </div>
                </div>
                <LayoutGrid size={240} className="absolute -bottom-12 -right-12 text-white opacity-10 rotate-12" />
            </div>

            {/* New Class Group Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 text-left">
                    <div
                        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsModalOpen(false)}
                    ></div>

                    <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 max-w-lg w-full overflow-hidden transform transition-all animate-in fade-in zoom-in duration-300 font-sans">
                        <div className="bg-orange-600 px-6 py-2 flex items-center justify-between">
                            <h2 className="text-white font-black uppercase tracking-widest flex items-center text-sm">
                                <FolderPlus size={18} className="mr-2" />
                                Create New Class Group
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-orange-100 hover:text-white transition-colors"
                            >
                                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="space-y-1 md:col-span-2">
                                    <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Group Name</label>
                                    <div className="relative">
                                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                        <input
                                            type="text"
                                            placeholder="Ex: Senior Secondary Wing"
                                            className="w-full pl-10 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all font-bold text-black placeholder:text-black/30"
                                            value={formData.groupName}
                                            onChange={(e) => setFormData({ ...formData, groupName: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Classes Included</label>
                                    <div className="relative">
                                        <LayoutGrid className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                        <input
                                            type="text"
                                            placeholder="Ex: Grade 11 - 12"
                                            className="w-full pl-10 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all font-bold text-black placeholder:text-black/30"
                                            value={formData.classesIncluded}
                                            onChange={(e) => setFormData({ ...formData, classesIncluded: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Group Head</label>
                                    <div className="relative">
                                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                        <input
                                            type="text"
                                            placeholder="Assign a lead head..."
                                            className="w-full pl-10 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all font-bold text-black placeholder:text-black/30"
                                            value={formData.groupHead}
                                            onChange={(e) => setFormData({ ...formData, groupHead: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1 md:col-span-2">
                                    <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Group Status</label>
                                    <div className="flex items-center space-x-4 ml-1 mt-1">
                                        <label className="flex items-center space-x-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                className="w-4 h-4 text-orange-600 focus:ring-orange-500"
                                                checked={formData.status === 'Active'}
                                                onChange={() => setFormData({ ...formData, status: 'Active' })}
                                            />
                                            <span className="text-xs font-bold text-gray-700">Active Group</span>
                                        </label>
                                        <label className="flex items-center space-x-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                className="w-4 h-4 text-orange-600 focus:ring-orange-500"
                                                checked={formData.status === 'Inactive'}
                                                onChange={() => setFormData({ ...formData, status: 'Inactive' })}
                                            />
                                            <span className="text-xs font-bold text-gray-700">Inactive</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 space-y-1">
                                <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Group Description</label>
                                <textarea
                                    rows={2}
                                    placeholder="Define the purpose and scope of this academic group..."
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all font-bold text-black placeholder:text-black/30"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                ></textarea>
                            </div>

                            <div className="mt-6 flex items-center space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 py-1.5 border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:bg-gray-50 transition-all active:scale-95"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setIsModalOpen(false);
                                    }}
                                    className="flex-2 py-1.5 bg-orange-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-700 transition-all shadow-lg shadow-orange-200 active:scale-95 px-6"
                                >
                                    Create Group
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
