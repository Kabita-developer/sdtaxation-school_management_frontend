import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FolderTree,
    BookOpen,
    FileText,
    Target,
    TrendingUp,
    ShieldCheck,
    ArrowUpRight,
    ArrowDownRight,
    Clock,
    Search,
    Filter,
    MoreVertical,
    Activity
} from 'lucide-react';

const AccountMaster = () => {
    const navigate = useNavigate();

    const accountActions = [
        { label: 'Groups', icon: FolderTree, onClick: () => navigate('/master/account_create/account-groups'), color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { label: 'Ledgers', icon: BookOpen, onClick: () => navigate('/master/account_create/account-ledgers'), color: 'text-purple-600', bg: 'bg-purple-50' },
        { label: 'Voucher', icon: FileText, onClick: () => navigate('/master/account_create/account-vouchers'), color: 'text-rose-600', bg: 'bg-rose-50' },
        { label: 'Cost Centres', icon: Target, onClick: () => navigate('/master/account_create/account-cost-centres'), color: 'text-emerald-600', bg: 'bg-emerald-50' },
    ];

    const financialStats = [
        { name: 'Total Assets', amount: '₹4.2 Cr', change: '+2.4%', trend: 'up', icon: TrendingUp },
        { name: 'Monthly Burn', amount: '₹12.5 L', change: '-1.1%', trend: 'down', icon: Activity },
        { name: 'Primary Reserve', amount: '₹85.4 L', change: '+0.5%', trend: 'up', icon: ShieldCheck },
        { name: 'Pending Audits', amount: '08', change: 'Stable', trend: 'neutral', icon: Clock },
    ];

    const recentLogs = [
        { id: 'LOG-8821', action: 'Ledger Created', entity: 'State Bank of India', user: 'Admin User', time: '2 mins ago', status: 'Verified' },
        { id: 'LOG-8819', action: 'Voucher Modified', entity: 'Journal V-002', user: 'Finance Lead', time: '14 mins ago', status: 'Pending' },
        { id: 'LOG-8815', action: 'Group Migration', entity: 'Fixed Assets', user: 'System', time: '1 hour ago', status: 'Success' },
        { id: 'LOG-8812', action: 'Audit Completed', entity: 'Q4 Final Audit', user: 'Internal Auditor', time: '4 hours ago', status: 'Verified' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-700 text-left">
            {/* Action Cards - Matches User's Compact Style */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 transition-all">
                {accountActions.map((action) => (
                    <button
                        key={action.label}
                        onClick={action.onClick}
                        className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all flex flex-col items-center text-center group"
                    >
                        <div className={`p-2 rounded-lg ${action.bg} ${action.color} mb-2 group-hover:scale-110 transition-transform`}>
                            <action.icon size={18} />
                        </div>
                        <span className="text-[10px] font-bold text-gray-700 leading-tight tracking-tight uppercase">{action.label}</span>
                    </button>
                ))}
            </div>

            {/* Header / Hero - Compact Style */}
            <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
                <div className="max-w-xl relative z-10">
                   <div className="inline-flex items-center px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100 text-[9px] font-black uppercase tracking-[0.2em] text-indigo-600 mb-4">
                        Enterprise Ledger Control v1.0
                   </div>
                   <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tighter italic mb-2 leading-none">Accounts Master Hub</h1>
                   <p className="text-[11px] text-gray-500 font-medium leading-relaxed opacity-80">
                      Configure your primary financial architecture through groups, ledgers, and voucher protocols. Ensure accurate financial reporting and institutional-grade data integrity.
                   </p>
                </div>
                <div className="shrink-0 relative z-10 hidden lg:block">
                   <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center shadow-2xl shadow-indigo-200">
                      <TrendingUp size={32} className="text-white" />
                   </div>
                </div>
            </div>

            {/* Financial Status Summary - Compact Style */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                {financialStats.map((stat) => (
                    <div key={stat.name} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
                         <div className="flex justify-between items-start mb-4">
                            <div className="p-2.5 bg-gray-50 rounded-xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-inner border border-gray-100">
                                <stat.icon size={18} />
                            </div>
                            <div className={`flex items-center text-[9px] font-black px-2 py-0.5 rounded-full ${
                                stat.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 
                                stat.trend === 'down' ? 'bg-rose-50 text-rose-600' : 'bg-gray-50 text-gray-400'
                            }`}>
                                {stat.trend === 'up' && <ArrowUpRight size={10} className="mr-1" />}
                                {stat.trend === 'down' && <ArrowDownRight size={10} className="mr-1" />}
                                {stat.change}
                            </div>
                         </div>
                         <h3 className="text-xl font-black text-gray-900 tracking-tighter italic leading-none mb-1 uppercase">{stat.amount}</h3>
                         <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">{stat.name}</p>
                    </div>
                ))}
            </div>

            {/* Recent Operational Logs */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden lg:col-span-12 mt-4">
                <div className="px-8 py-6 border-b border-gray-50 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center space-x-3">
                        <div className="p-2.5 bg-rose-50 text-rose-600 rounded-xl">
                            <Clock size={20} />
                        </div>
                        <h2 className="text-sm font-black text-gray-800 uppercase tracking-widest italic decoration-rose-500/30 underline decoration-4 underline-offset-4">Registry Transaction Logs</h2>
                    </div>

                    <div className="flex items-center space-x-3">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={14} />
                            <input
                                type="text"
                                placeholder="Audit trail..."
                                className="pl-9 pr-4 py-2 bg-gray-50/50 border border-gray-200 rounded-xl text-[11px] font-bold text-gray-700 outline-none focus:bg-white focus:border-indigo-500 transition-all w-48 font-mono shadow-inner"
                            />
                        </div>
                        <button className="p-2.5 bg-gray-50 text-gray-400 hover:text-indigo-600 rounded-xl transition-all border border-gray-100">
                             <Filter size={16} />
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-separate border-spacing-0">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-gray-50">Log ID</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-gray-50 text-center">Action Class</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-gray-50">Entity Identification</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-gray-50">Security User</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-gray-50">Integrity Status</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-gray-50 text-right pr-12">Portal</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {recentLogs.map((log) => (
                                <tr key={log.id} className="hover:bg-indigo-50/20 transition-all group">
                                    <td className="px-8 py-6 font-mono font-black text-[11px] text-gray-400 group-hover:text-indigo-600 transition-colors">{log.id}</td>
                                    <td className="px-8 py-6 text-center">
                                         <span className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-[9px] font-black text-gray-600 uppercase tracking-widest shadow-sm group-hover:border-indigo-100 group-hover:text-indigo-600">{log.action}</span>
                                    </td>
                                    <td className="px-8 py-6 text-[12px] font-black text-gray-900 uppercase tracking-widest">{log.entity}</td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col">
                                            <span className="text-[12px] font-bold text-gray-700">{log.user}</span>
                                            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter italic">{log.time}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center">
                                            <div className={`w-2 h-2 rounded-full mr-2 ${log.status === 'Verified' || log.status === 'Success' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                                            <span className={`text-[10px] font-black uppercase tracking-widest ${log.status === 'Verified' || log.status === 'Success' ? 'text-emerald-600' : 'text-amber-600'}`}>{log.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right pr-12">
                                        <button className="p-2 text-gray-400 hover:text-indigo-600 transition-all rounded-lg hover:bg-white group-hover:shadow-sm shadow-inner"><MoreVertical size={16} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="px-8 py-6 bg-gray-50/50 border-t border-gray-50 flex items-center justify-between">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">Monitoring Active Session Security Logs</p>
                    <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:translate-x-2 transition-transform flex items-center">
                         Full Operational Audit <ArrowUpRight size={14} className="ml-2" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AccountMaster;
