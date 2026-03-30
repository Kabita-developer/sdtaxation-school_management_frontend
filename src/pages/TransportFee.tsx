import { useState } from 'react';
import {
    Plus,
    Search,
    Bus,
    User,
    MapPin,
    Calendar,
    MoreVertical,
    Clock,
    AlertCircle,
    Receipt,
    Map,
    Truck,
    Car,
    Navigation,
    DollarSign,
    CreditCard
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TransportFee() {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        studentName: '',
        route: '',
        month: '',
        amount: '',
        status: 'Pending',
        description: ''
    });

    const [searchTerm, setSearchTerm] = useState('');

    const transportActions = [
        { label: 'Fees Master', icon: Receipt, onClick: () => navigate('/fees-management/fees_master'), color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Pickup Point', icon: MapPin, onClick: () => navigate('/fees-management/Transport_fee'), color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { label: 'Routes', icon: Map, onClick: () => navigate('/fees-management/Transport_fee'), color: 'text-purple-600', bg: 'bg-purple-50' },
        { label: 'Vehicles', icon: Truck, onClick: () => navigate('/fees-management/Transport_fee'), color: 'text-teal-600', bg: 'bg-teal-50' },
        { label: 'Assign Vehicle', icon: Car, onClick: () => navigate('/fees-management/Transport_fee'), color: 'text-pink-600', bg: 'bg-pink-50' },
        { label: 'Route Pickup Point', icon: Navigation, onClick: () => navigate('/fees-management/Transport_fee'), color: 'text-orange-600', bg: 'bg-orange-50' },
        { label: 'Student Transport Fees', icon: DollarSign, onClick: () => navigate('/fees-management/Transport_fee'), color: 'text-cyan-600', bg: 'bg-cyan-50' },
    ];

    const transportSummary = [
        { title: 'Total Collection', value: '₹4,25,000', change: '+14.2%', trend: 'up', icon: <DollarSign size={22} />, iconBg: 'bg-green-50 text-green-600' },
        { title: 'Pending Dues', value: '₹85,000', change: '-5.1%', trend: 'down', icon: <Clock size={22} />, iconBg: 'bg-amber-50 text-amber-600' },
        { title: 'Scholarships', value: '₹12,500', change: '+8.4%', trend: 'up', icon: <CreditCard size={22} />, iconBg: 'bg-blue-50 text-blue-600' },
        { title: 'Maintenance', value: '₹42,000', change: '+2.1%', trend: 'up', icon: <AlertCircle size={22} />, iconBg: 'bg-red-50 text-red-600' },
    ];

    const records = [
        { id: 'TRN-401', student: 'Rahul Das', route: 'Pathankot - Sector 4', amount: 3500, date: '2025-02-18', status: 'Paid', zone: 'Zone A' },
        { id: 'TRN-402', student: 'Priya Verma', route: 'Civil Lines - City Center', amount: 2800, date: '2025-02-18', status: 'Paid', zone: 'Zone B' },
        { id: 'TRN-403', student: 'Amit Kumar', route: 'Model Town - Campus', amount: 4200, date: '2025-02-17', status: 'Pending', zone: 'Zone C' },
        { id: 'TRN-404', student: 'Sonia Gill', route: 'Pathankot - Sector 4', amount: 3500, date: '2025-02-17', status: 'Paid', zone: 'Zone A' },
        { id: 'TRN-405', student: 'Vikrant Singh', route: 'Airport Road - Campus', amount: 5000, date: '2025-02-16', status: 'Overdue', zone: 'Zone D' },
    ];

    return (
        <div className="space-y-6 text-left">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Transport Fee Registry</h1>
                    <p className="text-xs text-gray-500 mt-1 font-medium">Manage routes, vehicles and collection tracking</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center space-x-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all text-xs font-black leading-none shadow-lg shadow-indigo-100 active:scale-95"
                >
                    <Plus size={16} />
                    <span>COLLECT TRANSPORT FEE</span>
                </button>
            </div>

            {/* Transport Action Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                {transportActions.map((action) => (
                    <button
                        key={action.label}
                        onClick={action.onClick}
                        className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all flex flex-col items-center text-center group"
                    >
                        <div className={`p-2 rounded-lg ${action.bg} ${action.color} mb-2 group-hover:scale-110 transition-transform`}>
                            <action.icon size={18} />
                        </div>
                        <span className="text-[10px] font-bold text-gray-700 leading-tight">{action.label}</span>
                    </button>
                ))}
            </div>

            {/* Dashboard Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {transportSummary.map((stat) => (
                    <div key={stat.title} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 group hover:border-indigo-100 transition-colors relative overflow-hidden">
                        <div className="flex justify-between items-start relative z-10">
                            <div className={`p-2.5 rounded-lg ${stat.iconBg}`}>
                                {stat.icon}
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
                                <p className="text-2xl font-black text-gray-900 leading-none">{stat.value}</p>
                                <p className="text-[10px] text-gray-400 font-bold uppercase mt-1.5 tracking-wider">{stat.title}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="font-bold text-gray-900 flex items-center text-sm uppercase tracking-wider">
                        <Bus size={16} className="mr-2 text-indigo-600" />
                        Transport Fee Ledger
                    </h2>
                    <div className="flex items-center space-x-2">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                            <input
                                type="text"
                                placeholder="Search student or route..."
                                className="pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 w-56 font-medium"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Student & Route</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Zone</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Monthly Fee</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Last Paid</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {records.filter(r => r.student.toLowerCase().includes(searchTerm.toLowerCase()) || r.route.toLowerCase().includes(searchTerm.toLowerCase())).map((r) => (
                                <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-gray-500">
                                                <User size={14} />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-gray-900">{r.student}</span>
                                                <span className="text-[10px] text-gray-500 font-medium">{r.route}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-0.5 rounded bg-gray-100 text-[10px] font-bold text-gray-600">{r.zone}</span>
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
            </div>

            {/* Add Transport Fee Modal */}
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
                                Add Transport Fee
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

                                <div className="space-y-1 md:col-span-2">
                                    <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Route Name</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                        <input
                                            type="text"
                                            placeholder="Example: Green Valley - Campus"
                                            className="w-full pl-10 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-bold text-black placeholder:text-black/30"
                                            value={formData.route}
                                            onChange={(e) => setFormData({ ...formData, route: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Fee Month</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                        <input
                                            type="month"
                                            className="w-full pl-10 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-bold text-black"
                                            value={formData.month}
                                            onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Amount (₹)</label>
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
                                    <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Payment Status</label>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                        <select
                                            className="w-full pl-10 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-bold text-black appearance-none"
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

                            <div className="mt-4 space-y-1">
                                <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Payment Description</label>
                                <textarea
                                    rows={2}
                                    placeholder="Add any specific transportation notes..."
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-bold text-black placeholder:text-black/30"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                                    className="flex-2 py-1.5 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95 px-6"
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
