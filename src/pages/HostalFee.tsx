import { useState } from 'react';
import {
    Plus,
    Search,
    Building,
    User,
    Home,
    Calendar,
    MoreVertical,
    Clock,
    Receipt
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HostalFee() {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        studentName: '',
        roomBlock: '',
        hostelType: 'Non-AC Double',
        amount: '',
        month: '',
        status: 'Pending',
        remarks: ''
    });

    const [searchTerm, setSearchTerm] = useState('');

    const hostelSummary = [
        { name: 'Hostel Collection', amount: '₹12,40,000', icon: Building, color: 'text-purple-600', bg: 'bg-purple-50' },
        { name: 'Occupied Beds', amount: '245 / 300', icon: Home, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { name: 'Mess Charges', amount: '₹1,25,000', icon: Receipt, color: 'text-orange-600', bg: 'bg-orange-50' },
        { name: 'Pending Dues', amount: '₹2,10,000', icon: Clock, color: 'text-red-600', bg: 'bg-red-50' },
    ];

    const records = [
        { id: 'HST-201', student: 'Ishaan Reddy', room: 'Block A - 104', amount: 15000, date: '2025-02-15', status: 'Paid', type: 'AC Double' },
        { id: 'HST-202', student: 'Megha Sharma', room: 'Block B - 205', amount: 12000, date: '2025-02-14', status: 'Paid', type: 'Non-AC Double' },
        { id: 'HST-203', student: 'Rohan Gupta', room: 'Block A - 302', amount: 15000, date: '2025-02-14', status: 'Pending', type: 'AC Double' },
        { id: 'HST-204', student: 'Kavya Sharma', room: 'Block C - 110', amount: 18000, date: '2025-02-13', status: 'Paid', type: 'AC Single' },
        { id: 'HST-205', student: 'Arjun Mehta', room: 'Block B - 402', amount: 12000, date: '2025-02-10', status: 'Overdue', type: 'Non-AC Double' },
    ];

    return (
        <div className="space-y-6 text-left">
            <div className="flex items-center justify-center">
                <h1 className="text-xl font-black text-gray-900 uppercase tracking-widest">hostal fee</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {hostelSummary.map((stat) => (
                    <div key={stat.name} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 group transition-all hover:shadow-md hover:translate-y-[-2px]">
                        <div className="flex justify-between items-start">
                            <div className={`p-2.5 rounded-lg ${stat.bg}`}>
                                <stat.icon size={20} className={stat.color} />
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-black text-gray-900">{stat.amount}</p>
                                <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 tracking-wider">{stat.name}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="font-bold text-gray-900 flex items-center text-sm uppercase tracking-wider">
                        <Building size={16} className="mr-2 text-purple-600" />
                        Hostel Fee Ledger
                    </h2>
                    <div className="flex items-center space-x-2">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                            <input
                                type="text"
                                placeholder="Search student or room..."
                                className="pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-purple-500 w-56 font-medium"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center space-x-2 px-4 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-xs font-bold leading-none shadow-md shadow-purple-100"
                        >
                            <Plus size={14} />
                            <span>ADD HOSTEL FEE</span>
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Resident Details</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Room & Type</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Fee Amount</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Payment Status</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Due Date</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {records.filter(r => r.student.toLowerCase().includes(searchTerm.toLowerCase()) || r.room.toLowerCase().includes(searchTerm.toLowerCase())).map((r) => (
                                <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                                                <User size={14} />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-gray-900">{r.student}</span>
                                                <span className="text-[10px] text-gray-400 font-mono italic">#{r.id}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-gray-700">{r.room}</span>
                                            <span className="text-[10px] text-gray-500 font-medium">{r.type}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-black text-gray-900 text-sm">₹{r.amount.toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${r.status === 'Paid' ? 'bg-green-50 text-green-600' :
                                            r.status === 'Pending' ? 'bg-orange-50 text-orange-600' :
                                                'bg-red-50 text-red-600'
                                            }`}>
                                            {r.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center text-[11px] text-gray-500 font-medium">
                                            <Calendar size={12} className="mr-1.5 text-gray-400" /> {r.date}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end space-x-2">
                                            <button className="p-1.5 text-gray-400 hover:text-purple-600 transition-colors shadow-sm">
                                                <Receipt size={14} />
                                            </button>
                                            <button className="p-1.5 text-gray-400 hover:text-gray-900 transition-colors">
                                                <MoreVertical size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Hostel Fee Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsModalOpen(false)}
                    ></div>

                    <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 max-w-lg w-full overflow-hidden transform transition-all animate-in fade-in zoom-in duration-300 font-sans text-left">
                        <div className="bg-purple-600 px-6 py-2 flex items-center justify-between">
                            <h2 className="text-white font-black uppercase tracking-widest flex items-center text-sm">
                                <Plus size={18} className="mr-2" />
                                Add Hostel Fee
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-purple-100 hover:text-white transition-colors"
                            >
                                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="space-y-1 md:col-span-2 text-left">
                                    <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Student Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                        <input
                                            type="text"
                                            placeholder="Enter student's full name"
                                            className="w-full pl-10 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all font-bold text-black placeholder:text-black/30"
                                            value={formData.studentName}
                                            onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1 text-left">
                                    <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Room & Block</label>
                                    <div className="relative">
                                        <Home className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                        <input
                                            type="text"
                                            placeholder="Ex: Block A - 104"
                                            className="w-full pl-10 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all font-bold text-black placeholder:text-black/30"
                                            value={formData.roomBlock}
                                            onChange={(e) => setFormData({ ...formData, roomBlock: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1 text-left">
                                    <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Hostel Type</label>
                                    <div className="relative">
                                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                        <select
                                            className="w-full pl-10 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all font-bold text-black appearance-none"
                                            value={formData.hostelType}
                                            onChange={(e) => setFormData({ ...formData, hostelType: e.target.value })}
                                        >
                                            <option>AC Single</option>
                                            <option>AC Double</option>
                                            <option>Non-AC Single</option>
                                            <option>Non-AC Double</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-1 text-left">
                                    <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Fee Month</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                        <input
                                            type="month"
                                            className="w-full pl-10 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all font-bold text-black"
                                            value={formData.month}
                                            onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1 text-left">
                                    <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Amount (₹)</label>
                                    <div className="relative">
                                        <Receipt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                        <input
                                            type="number"
                                            placeholder="0.00"
                                            className="w-full pl-10 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all font-bold text-black placeholder:text-black/30"
                                            value={formData.amount}
                                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1 text-left">
                                    <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Status</label>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                        <select
                                            className="w-full pl-10 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all font-bold text-black appearance-none"
                                            value={formData.status}
                                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        >
                                            <option>Paid</option>
                                            <option>Pending</option>
                                            <option>Overdue</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 space-y-1 text-left">
                                <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Remarks / Note</label>
                                <textarea
                                    rows={2}
                                    placeholder="Add any specific hostel or mess notes..."
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all font-bold text-black placeholder:text-black/30"
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
                                    Discard
                                </button>
                                <button
                                    type="submit"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setIsModalOpen(false);
                                    }}
                                    className="flex-2 py-1.5 bg-purple-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-purple-700 transition-all shadow-lg shadow-purple-200 active:scale-95 px-6"
                                >
                                    Add Fee Record
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
