import {
    BookOpen,
    Search,
    TrendingUp,
    Users,
    CreditCard,
    ArrowUpRight,
    ArrowDownRight,
    Filter,
    MoreVertical,
    Receipt,
    Wallet,
    PieChart
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function FeesManagement() {
    const navigate = useNavigate();

    const stats = [
        { name: 'Total Collection', value: '₹42,50,000', change: '+12.5%', trend: 'up', icon: Wallet, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { name: 'Pending Fees', value: '₹8,15,000', change: '-4.2%', trend: 'down', icon: ClockIcon, color: 'text-rose-600', bg: 'bg-rose-50' },
        { name: 'Active Students', value: '1,240', change: '+8.1%', trend: 'up', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
        { name: 'Total Waivers', value: '₹2,40,000', change: '+2.4%', trend: 'up', icon: CreditCard, color: 'text-amber-600', bg: 'bg-amber-50' },
    ];

    const modules = [
        {
            title: 'Fees Collection',
            desc: 'School tuition, exams, and admission fee management.',
            icon: Wallet,
            path: '/fees-management/academy',
            color: 'from-blue-600 to-indigo-700',
            stats: '₹28,40,000'
        },
        {
            title: 'School Expenses',
            desc: 'Track staff salaries, maintenance, and utility bills.',
            icon: ArrowDownRight,
            path: '/fees-management/expenses',
            color: 'from-rose-600 to-pink-700',
            stats: '₹12,10,000'
        },
        {
            title: 'Other Income',
            desc: 'Revenue from grants, donations, and campus facilities.',
            icon: ArrowUpRight,
            path: '/fees-management/income',
            color: 'from-emerald-600 to-teal-700',
            stats: '₹4,40,000'
        },
        {
            title: 'Accounting Master',
            desc: 'Central configuration for all financial leadgers.',
            icon: BookOpen,
            path: '/fees-management/fees_master',
            color: 'from-amber-500 to-orange-600',
            stats: 'Admin Only'
        }
    ];

    const transactions = [
        { id: 'TXN-8901', student: 'Aavya Sharma', grade: '10-A', type: 'Tuition Fee', amount: 4500, date: '2025-02-18', status: 'Success' },
        { id: 'TXN-8902', student: 'Ishaan Reddy', grade: '8-B', type: 'Transport', amount: 2800, date: '2025-02-18', status: 'Success' },
        { id: 'TXN-8903', student: 'Megha Gupta', grade: '12-S', type: 'Exam Fee', amount: 1200, date: '2025-02-17', status: 'Pending' },
        { id: 'TXN-8904', student: 'Rahul V.', grade: '9-C', type: 'Hostel Fee', amount: 12000, date: '2025-02-17', status: 'Success' },
    ];

    function ClockIcon({ size, className }: { size?: number, className?: string }) {
        return (
            <svg
                width={size || 24}
                height={size || 24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={className}
            >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
            </svg>
        )
    }

    return (
        <div className="space-y-6 text-left">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Accounting Dashboard</h1>
                    <p className="text-xs text-gray-500 mt-1 font-medium">Overview of school financial health and collection modules</p>
                </div>
                <div className="flex items-center space-x-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search students, txns..."
                            className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64 shadow-sm"
                        />
                    </div>
                    <button className="p-2 bg-white border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 shadow-sm">
                        <Filter size={20} />
                    </button>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 group hover:shadow-md transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.color}`}>
                                <stat.icon size={22} />
                            </div>
                            <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-[10px] font-black ${stat.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                                {stat.trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                <span>{stat.change}</span>
                            </div>
                        </div>
                        <div>
                            <p className="text-2xl font-black text-gray-900">{stat.value}</p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{stat.name}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Module Navigation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {modules.map((mod) => (
                    <button
                        key={mod.title}
                        onClick={() => navigate(mod.path)}
                        className="group relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all text-left overflow-hidden"
                    >
                        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${mod.color} opacity-5 rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:scale-110 transition-transform`}></div>

                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${mod.color} flex items-center justify-center text-white mb-4 shadow-lg`}>
                            <mod.icon size={24} />
                        </div>
                        <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider mb-2">{mod.title}</h3>
                        <p className="text-[11px] text-gray-500 leading-relaxed mb-4 line-clamp-2">{mod.desc}</p>

                        <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                            <span className="text-xs font-black text-indigo-600 uppercase tracking-tighter">Enter Module</span>
                            <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">{mod.stats}</span>
                        </div>
                    </button>
                ))}
            </div>

            {/* Main Content Area: Transactions & Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Transactions */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-5 border-b border-gray-50 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                                <Receipt size={18} />
                            </div>
                            <h2 className="font-black text-gray-900 uppercase tracking-widest text-sm italic">Recent Transactions</h2>
                        </div>
                        <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">View All Registry</button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50/50">
                                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Student</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Amount</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {transactions.map((txn) => (
                                    <tr key={txn.id} className="hover:bg-gray-50/80 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-black text-gray-900 uppercase tracking-tight">{txn.student}</span>
                                                <span className="text-[10px] text-gray-400 font-bold">{txn.grade} • {txn.id}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 rounded-lg bg-gray-100 text-[9px] font-black text-gray-600 uppercase tracking-tighter">{txn.type}</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className="text-sm font-black text-gray-900">₹{txn.amount.toLocaleString()}</span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`px-2 py-1 rounded-full text-[9px] font-black uppercase ${txn.status === 'Success' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                                                {txn.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-2 text-gray-300 hover:text-gray-900 transition-colors">
                                                <MoreVertical size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Collection Overview Section */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden group">
                        <div className="relative z-10">
                            <h3 className="text-lg font-black uppercase tracking-widest mb-1 italic">Monthly Goal</h3>
                            <p className="text-[10px] text-indigo-100 font-bold uppercase tracking-widest mb-6 border-b border-white/20 pb-2 inline-block">February 2025</p>

                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-[11px] font-black uppercase mb-2">
                                        <span>Target Achieved</span>
                                        <span>84%</span>
                                    </div>
                                    <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                                        <div className="h-full bg-white rounded-full transition-all duration-1000 group-hover:w-[84%]" style={{ width: '84%' }}></div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between pt-2">
                                    <div>
                                        <p className="text-xl font-black italic">₹12.4L</p>
                                        <p className="text-[9px] font-bold text-indigo-200 uppercase">Current Month</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xl font-black italic text-indigo-200">₹15L</p>
                                        <p className="text-[9px] font-bold text-indigo-200 uppercase">Monthly Target</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <TrendingUp size={120} className="absolute -bottom-4 -right-4 text-white/10 group-hover:scale-110 transition-transform" />
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                        <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest mb-4 flex items-center">
                            <PieChart size={16} className="mr-2 text-indigo-600" />
                            Collection Split
                        </h3>
                        <div className="space-y-3">
                            {[
                                { label: 'Online Payments', val: '65%', color: 'bg-blue-500' },
                                { label: 'Bank Transfer', val: '25%', color: 'bg-emerald-500' },
                                { label: 'Cash / Cheque', val: '10%', color: 'bg-amber-500' },
                            ].map((split) => (
                                <div key={split.label} className="flex items-center justify-between p-3 bg-gray-50/50 rounded-xl hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center space-x-3">
                                        <div className={`w-2 h-2 rounded-full ${split.color}`}></div>
                                        <span className="text-[10px] font-black text-gray-600 uppercase tracking-tight">{split.label}</span>
                                    </div>
                                    <span className="text-[10px] font-black text-gray-900">{split.val}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
