import { useState } from 'react';
import {
    Plus,
    Search,
    Filter,
    Receipt,
    User,
    BookOpen,
    Calendar,
    MoreVertical,
    Clock,
    AlertCircle,
    Layers,
    DollarSign,
    CreditCard
} from 'lucide-react';

export default function AcademyFee() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        studentName: '',
        classSection: '',
        feeType: 'Tuition Fee',
        amount: '',
        paymentMode: 'UPI',
        remarks: ''
    });

    const [searchTerm, setSearchTerm] = useState('');

    const feeSummary = [
        { name: 'Total Collection', amount: '₹18,45,000', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50', change: '+14.2%', trend: 'up' },
        { name: 'Pending Fees', amount: '₹4,12,000', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50', change: '-5.1%', trend: 'down' },
        { name: 'Overdue Dues', amount: '₹1,25,000', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50', change: '+2.4%', trend: 'up' },
        { name: 'Scholarships', amount: '₹85,000', icon: CreditCard, color: 'text-blue-600', bg: 'bg-blue-50', change: '+8.4%', trend: 'up' },
    ];

    const transactions = [
        { id: 'REC-001', student: 'Arjun Mehta', class: 'Grade 10', amount: 45000, date: '2025-02-19', status: 'Success', method: 'UPI' },
        { id: 'REC-002', student: 'Sanya Gupta', class: 'Grade 8', amount: 38000, date: '2025-02-19', status: 'Success', method: 'Credit Card' },
        { id: 'REC-003', student: 'Vikram Singh', class: 'Grade 12', amount: 52000, date: '2025-02-18', status: 'Pending', method: 'Bank Transfer' },
        { id: 'REC-004', student: 'Riya Roy', class: 'Grade 9', amount: 41000, date: '2025-02-18', status: 'Success', method: 'Cash' },
        { id: 'REC-005', student: 'Karan Mehra', class: 'Grade 11', amount: 48500, date: '2025-02-17', status: 'Failed', method: 'Debit Card' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Academy Fee Management</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center space-x-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all text-xs font-black leading-none shadow-lg shadow-indigo-100 active:scale-95"
                >
                    <Plus size={16} />
                    <span>COLLECT ACADEMY FEE</span>
                </button>
            </div>

            {/* Fee Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {feeSummary.map((stat) => (
                    <div key={stat.name} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 group hover:border-indigo-100 transition-colors relative overflow-hidden">
                        <div className="flex justify-between items-start relative z-10">
                            <div className={`p-2.5 rounded-lg ${stat.bg}`}>
                                <stat.icon size={20} className={stat.color} />
                            </div>
                            <div className="text-right">
                                <div className="flex items-center justify-end space-x-1 mb-1">
                                    <span className={`text-[10px] font-bold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-500'}`}>
                                        {stat.change}
                                    </span>
                                    {stat.trend === 'up' ? (
                                        <svg className="w-2.5 h-2.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
                                    ) : (
                                        <svg className="w-2.5 h-2.5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                                    )}
                                </div>
                                <p className="text-2xl font-black text-gray-900 leading-none">{stat.amount}</p>
                                <p className="text-[10px] text-gray-400 font-bold uppercase mt-1.5 tracking-wider">{stat.name}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Action Controls */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="font-bold text-gray-900 flex items-center text-sm uppercase tracking-wider">
                        <BookOpen size={16} className="mr-2 text-indigo-600" />
                        Academy Fee Registry
                    </h2>
                    <div className="flex items-center space-x-2">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                            <input
                                type="text"
                                placeholder="Search student or receipt..."
                                className="pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 w-56 font-medium"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button className="flex items-center space-x-1 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-100 transition-colors">
                            <Filter size={14} />
                            <span>Filters</span>
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Transaction Details</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Student & Class</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Amount Paid</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Payment Mode</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {transactions.filter(t => t.student.toLowerCase().includes(searchTerm.toLowerCase()) || t.id.toLowerCase().includes(searchTerm.toLowerCase())).map((t) => (
                                <tr key={t.id} className="hover:bg-gray-50/80 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-[11px] font-mono font-bold text-indigo-600">{t.id}</span>
                                            <div className="flex items-center mt-1 text-[10px] text-gray-400">
                                                <Calendar size={10} className="mr-1" /> {t.date}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                                                <User size={14} />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-gray-900">{t.student}</span>
                                                <span className="text-[10px] text-gray-500 font-medium">{t.class}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-black text-gray-900">₹{t.amount.toLocaleString()}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${t.status === 'Success' ? 'bg-green-50 text-green-600' :
                                            t.status === 'Pending' ? 'bg-orange-50 text-orange-600' :
                                                'bg-red-50 text-red-600'
                                            }`}>
                                            {t.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-[10px] font-bold text-gray-600 uppercase italic opacity-70">{t.method}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end space-x-2">
                                            <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors">
                                                <Receipt size={14} />
                                            </button>
                                            <button className="p-1.5 text-gray-400 hover:text-gray-900 rounded transition-colors">
                                                <MoreVertical size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider italic">Showing transactions for Academic Year 2025-26</p>
                    <div className="flex space-x-1">
                        <button className="px-2.5 py-1 border border-gray-200 rounded text-[10px] font-black text-gray-600 bg-white shadow-sm">1</button>
                        <button className="px-2.5 py-1 border border-transparent rounded text-[10px] font-black text-gray-300">2</button>
                    </div>
                </div>
            </div>

            {/* Collect Academy Fee Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsModalOpen(false)}
                    ></div>

                    <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 max-w-lg w-full overflow-hidden transform transition-all animate-in fade-in zoom-in duration-300 font-sans">
                        <div className="bg-indigo-600 px-6 py-2 flex items-center justify-between">
                            <h2 className="text-white font-black uppercase tracking-widest flex items-center text-sm">
                                <Plus size={18} className="mr-2" />
                                Collect Academy Fee
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

                        <form className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="space-y-1 md:col-span-2">
                                    <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Student Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                        <input
                                            type="text"
                                            placeholder="Enter student's full name"
                                            className="w-full pl-10 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-bold text-black placeholder:text-black/30"
                                            value={formData.studentName}
                                            onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Class & Section</label>
                                    <div className="relative">
                                        <Layers className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                        <input
                                            type="text"
                                            placeholder="Example: Grade 10-A"
                                            className="w-full pl-10 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-bold text-black placeholder:text-black/30"
                                            value={formData.classSection}
                                            onChange={(e) => setFormData({ ...formData, classSection: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Fee Type</label>
                                    <div className="relative">
                                        <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                        <select
                                            className="w-full pl-10 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-bold text-black appearance-none"
                                            value={formData.feeType}
                                            onChange={(e) => setFormData({ ...formData, feeType: e.target.value })}
                                        >
                                            <option>Tuition Fee</option>
                                            <option>Exam Fee</option>
                                            <option>Admission Fee</option>
                                            <option>Library Fee</option>
                                            <option>Other Misc.</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Amount to Collect (₹)</label>
                                    <div className="relative">
                                        <Receipt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                        <input
                                            type="number"
                                            placeholder="0.00"
                                            className="w-full pl-10 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-bold text-black placeholder:text-black/30"
                                            value={formData.amount}
                                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Payment Mode</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                        <select
                                            className="w-full pl-10 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-bold text-black appearance-none"
                                            value={formData.paymentMode}
                                            onChange={(e) => setFormData({ ...formData, paymentMode: e.target.value })}
                                        >
                                            <option>UPI</option>
                                            <option>Cash</option>
                                            <option>Bank Transfer</option>
                                            <option>Credit Card</option>
                                            <option>Cheque</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 space-y-1">
                                <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Remarks / Note</label>
                                <textarea
                                    rows={2}
                                    placeholder="Add any specific payment details or notes..."
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-bold text-black placeholder:text-black/30"
                                    value={formData.remarks}
                                    onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                                ></textarea>
                            </div>

                            <div className="mt-4 flex items-center space-x-3">
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
                                    className="flex-2 py-1.5 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95 px-6"
                                >
                                    Process Payment
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
