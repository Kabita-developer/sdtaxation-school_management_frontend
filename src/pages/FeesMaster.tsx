import { useState } from 'react';
import {
    Plus,
    Search,
    BookOpen,
    FolderOpen,
    Tag,
    Clock,
    Filter,
    ArrowUpRight,
    Edit2,
    Trash2,
    CheckCircle2,
    Settings2,
    ChevronRight,
    Bell,
    Percent
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function FeesMaster() {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        feeType: '',
        feeGroup: 'Academy Fee',
        amount: '',
        frequency: 'Monthly',
        description: '',
        dueDate: ''
    });

    const masterStats = [
        { name: 'Active Fee Types', value: '18', icon: Tag, color: 'text-blue-600', bg: 'bg-blue-50' },
        { name: 'Fee Groups', value: '06', icon: FolderOpen, color: 'text-purple-600', bg: 'bg-purple-50' },
        { name: 'Avg. Collection', value: '94%', icon: ArrowUpRight, color: 'text-green-600', bg: 'bg-green-50' },
        { name: 'Next Deadline', value: 'Oct 05', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    ];

    const masterActions = [
        { label: 'Fees Group', icon: FolderOpen, onClick: () => navigate('/fees-management/fees_master'), color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { label: 'Fees Type', icon: Tag, onClick: () => navigate('/fees-management/fees_master'), color: 'text-pink-600', bg: 'bg-pink-50' },
        { label: 'Fees Discount Details List', icon: Percent, onClick: () => navigate('/fees-management/fees_master'), color: 'text-teal-600', bg: 'bg-teal-50' },
        { label: 'Fees Reminder', icon: Bell, onClick: () => navigate('/fees-management/fees_master'), color: 'text-orange-600', bg: 'bg-orange-50' },
    ];

    const feeTypes = [
        { id: 'FT-001', name: 'Tuition Fee', group: 'Academy Fee', amount: 4500, frequency: 'Monthly', status: 'Active' },
        { id: 'FT-002', name: 'Lab Maintenance', group: 'Science Fee', amount: 1200, frequency: 'Quarterly', status: 'Active' },
        { id: 'FT-003', name: 'Bus Transport', group: 'Transport Fee', amount: 3000, frequency: 'Monthly', status: 'Active' },
        { id: 'FT-004', name: 'Admission Fee', group: 'One Time', amount: 15000, frequency: 'Yearly', status: 'Active' },
        { id: 'FT-005', name: 'Examination Fee', group: 'Academy Fee', amount: 2500, frequency: 'Half-Yearly', status: 'Active' },
        { id: 'FT-006', name: 'Library Fee', group: 'Facility Fee', amount: 800, frequency: 'Yearly', status: 'Inactive' },
    ];

    return (
        <div className="space-y-6 text-left">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">fees master</h1>
                    <p className="text-xs text-gray-500 mt-1 font-medium">Configure global fee types, groups, and schedules</p>
                </div>
                <div className="flex items-center space-x-3">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center space-x-2 px-6 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-black transition-all text-xs font-black leading-none shadow-lg shadow-gray-200 active:scale-95"
                    >
                        <Plus size={16} />
                        <span>CREATE FEE TYPE</span>
                    </button>
                    <button className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors">
                        <Settings2 size={18} />
                    </button>
                </div>
            </div>

            {/* Master Action Buttons */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {masterActions.map((action) => (
                    <button
                        key={action.label}
                        onClick={action.onClick}
                        className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all flex items-center space-x-4 group"
                    >
                        <div className={`p-3 rounded-xl ${action.bg} ${action.color} group-hover:scale-110 transition-transform`}>
                            <action.icon size={22} />
                        </div>
                        <div className="flex-1 text-left">
                            <span className="text-xs font-black text-gray-900 uppercase tracking-wider block">{action.label}</span>
                            <span className="text-[10px] text-gray-400 font-bold uppercase mt-1">Configure Details</span>
                        </div>
                        <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-900 transition-colors" />
                    </button>
                ))}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {masterStats.map((stat) => (
                    <div key={stat.name} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 group hover:border-gray-900/10 transition-colors">
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

            {/* Fee Types Registry */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between flex-wrap gap-4">
                    <h2 className="font-bold text-gray-900 flex items-center text-sm uppercase tracking-wider">
                        <BookOpen size={16} className="mr-2 text-indigo-600" />
                        Fee Type Registry
                    </h2>
                    <div className="flex items-center space-x-2">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                            <input
                                type="text"
                                placeholder="Search fee type or group..."
                                className="pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 w-56 font-medium"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button className="flex items-center space-x-1 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-[10px] font-bold text-gray-600 hover:bg-gray-50 uppercase tracking-wider">
                            <Filter size={12} />
                            <span>Filter</span>
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Fee Name & Code</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Fee Group</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Frequency</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {feeTypes.filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()) || f.group.toLowerCase().includes(searchTerm.toLowerCase())).map((f) => (
                                <tr key={f.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-black text-gray-900 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{f.name}</span>
                                            <span className="text-[10px] font-mono font-bold text-gray-400">{f.id}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-0.5 rounded bg-gray-100 text-[10px] font-black text-gray-600 uppercase tracking-tighter">{f.group}</span>
                                    </td>
                                    <td className="px-6 py-4 font-black text-gray-900 text-sm">₹{f.amount.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-xs font-bold text-gray-500">{f.frequency}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${f.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                            {f.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end space-x-1">
                                            <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
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
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Total {feeTypes.length} types configured in registry</p>
                    <div className="flex space-x-1">
                        <button className="px-2.5 py-1 border border-gray-200 rounded text-[10px] font-black text-gray-600 bg-white">1</button>
                        <button className="px-2.5 py-1 border border-transparent rounded text-[10px] font-black text-gray-300">2</button>
                    </div>
                </div>
            </div>

            {/* Quick Settings Banner */}
            <div className="bg-gradient-to-br from-gray-900 to-indigo-950 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10 max-w-lg">
                    <h3 className="text-lg font-black uppercase tracking-widest mb-2 italic">Automate Reminders</h3>
                    <p className="text-sm text-indigo-100/80 mb-6 leading-relaxed font-medium">Configure automated SMS and Email alerts for upcoming fee deadlines to ensure timely collections.</p>
                    <button className="px-6 py-2.5 bg-white text-gray-900 rounded-xl text-[10px] font-black uppercase tracking-wider hover:bg-indigo-50 transition-all shadow-xl active:scale-95 flex items-center">
                        <Settings2 size={14} className="mr-2" />
                        Configure Alerts
                    </button>
                </div>
                <CheckCircle2 size={160} className="absolute bottom-0 right-0 p-4 transform translate-x-12 translate-y-12 text-white/5 rotate-[-15deg]" />
            </div>

            {/* Create Fee Type Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-gray-900/70 backdrop-blur-md transition-opacity"
                        onClick={() => setIsModalOpen(false)}
                    ></div>

                    <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 max-w-xl w-full overflow-hidden transform transition-all animate-in fade-in zoom-in duration-300 font-sans text-left">
                        <div className="bg-gray-900 px-8 py-4 flex items-center justify-between">
                            <h2 className="text-white font-black uppercase tracking-widest flex items-center text-sm italic">
                                <Plus size={20} className="mr-3 text-indigo-400" />
                                New Fee Type Configuration
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1 md:col-span-2 text-left">
                                    <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Fee Type Name</label>
                                    <div className="relative">
                                        <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="text"
                                            placeholder="Ex: Annual Science Lab Fee"
                                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 focus:bg-white transition-all font-bold text-black placeholder:text-black/20"
                                            value={formData.feeType}
                                            onChange={(e) => setFormData({ ...formData, feeType: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1 text-left">
                                    <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Fee Group</label>
                                    <div className="relative">
                                        <FolderOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <select
                                            className="w-full pl-12 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 focus:bg-white transition-all font-bold text-black appearance-none"
                                            value={formData.feeGroup}
                                            onChange={(e) => setFormData({ ...formData, feeGroup: e.target.value })}
                                        >
                                            <option>Academy Fee</option>
                                            <option>Transport Fee</option>
                                            <option>Hostel Fee</option>
                                            <option>Facility Fee</option>
                                            <option>One Time</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-1 text-left">
                                    <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Default Amount (₹)</label>
                                    <div className="relative">
                                        <ArrowUpRight className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="number"
                                            placeholder="0.00"
                                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 focus:bg-white transition-all font-bold text-black placeholder:text-black/20"
                                            value={formData.amount}
                                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1 text-left">
                                    <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Collection Frequency</label>
                                    <div className="relative">
                                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <select
                                            className="w-full pl-12 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 focus:bg-white transition-all font-bold text-black appearance-none"
                                            value={formData.frequency}
                                            onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                                        >
                                            <option>Monthly</option>
                                            <option>Quarterly</option>
                                            <option>Half-Yearly</option>
                                            <option>Yearly</option>
                                            <option>One Time Only</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-1 text-left">
                                    <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Due Date (Monthly)</label>
                                    <div className="relative">
                                        <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="number"
                                            placeholder="Day (1-31)"
                                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 focus:bg-white transition-all font-bold text-black placeholder:text-black/20"
                                            value={formData.dueDate}
                                            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 space-y-1 text-left">
                                <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Detailed Description</label>
                                <textarea
                                    rows={3}
                                    placeholder="Explain the fee structure and rules..."
                                    className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 focus:bg-white transition-all font-bold text-black placeholder:text-black/20"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                ></textarea>
                            </div>

                            <div className="mt-10 flex items-center space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 py-3.5 border-2 border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:bg-gray-50 hover:border-gray-200 transition-all active:scale-95"
                                >
                                    Cancel Config
                                </button>
                                <button
                                    type="submit"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setIsModalOpen(false);
                                    }}
                                    className="flex-2 py-3.5 bg-gray-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-2xl shadow-gray-300 active:scale-95 px-10"
                                >
                                    Activate Fee Type
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
