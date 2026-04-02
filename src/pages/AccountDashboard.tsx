import React from 'react';
import { 
    LayoutDashboard, 
    ArrowRight, 
    PieChart, 
    TrendingUp, 
    ShieldCheck,
    FolderTree,
    BookOpen,
    FileText,
    Target
} from 'lucide-react';

const AccountDashboard = () => {
    const stats = [
        { label: 'Total Ledgers', value: '1,280', change: '+12%', icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Active Groups', value: '42', change: '+2', icon: FolderTree, color: 'text-purple-600', bg: 'bg-purple-50' },
        { label: 'Voucher Hub', value: '8,400', change: '+1,200', icon: FileText, color: 'text-rose-600', bg: 'bg-rose-50' },
        { label: 'Cost Analytics', value: '15 Centres', change: 'Stable', icon: Target, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    ];

    return (
        <div className="space-y-10 animate-in fade-in duration-700 mt-8 text-left">
            {/* Hero / Welcome */}
            <div className="relative overflow-hidden bg-indigo-900 rounded-[2.5rem] p-10 text-white shadow-2xl">
                 <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="space-y-4 max-w-xl">
                        <div className="inline-flex items-center px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/10 text-[10px] font-black uppercase tracking-[0.2em]">
                            <ShieldCheck size={14} className="mr-2 text-indigo-300" />
                            Financial Integrity Secure
                        </div>
                        <h1 className="text-4xl font-black uppercase tracking-tighter leading-none italic">Accounts Master Control</h1>
                        <p className="text-indigo-200 text-sm font-medium leading-relaxed opacity-80">
                            Orchestrate your school's financial architecture through groups, ledgers, and voucher protocols with enterprise-grade precision.
                        </p>
                    </div>
                    <div className="flex items-center space-x-4 shrink-0">
                         <div className="w-32 h-32 bg-white/5 backdrop-blur-3xl rounded-full border border-white/10 p-6 flex items-center justify-center">
                            <PieChart size={64} className="text-indigo-300 opacity-60" />
                         </div>
                    </div>
                 </div>
                 <trending-up size={400} className="absolute -right-40 -bottom-40 text-white/5 -rotate-12" />
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
                        <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} w-fit mb-6 shadow-sm group-hover:scale-110 transition-transform`}>
                            <stat.icon size={24} />
                        </div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 italic">{stat.label}</p>
                        <div className="flex items-end justify-between">
                            <h3 className="text-2xl font-black text-gray-900 uppercase italic tracking-tighter">{stat.value}</h3>
                            <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-2.5 py-1 rounded-full">{stat.change}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Documentation / Hint Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 <div className="bg-gray-50/50 p-8 rounded-[2rem] border border-gray-100 flex items-start space-x-6 group hover:bg-white transition-all shadow-inner hover:shadow-xl">
                    <div className="p-5 bg-white rounded-3xl shadow-sm text-indigo-600 group-hover:scale-110 transition-transform">
                        <FolderTree size={32} />
                    </div>
                    <div className="space-y-3">
                        <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest italic decoration-indigo-500/30 underline decoration-4 underline-offset-4">Hierarchical Taxonomy</h4>
                        <p className="text-xs text-gray-500 font-medium leading-relaxed">
                            Organize ledger accounts into logical groups for accurate balance sheets and comparative financial reporting audits.
                        </p>
                        <button className="flex items-center text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:translate-x-2 transition-transform">
                            Strategic Mapping <ArrowRight size={14} className="ml-2" />
                        </button>
                    </div>
                 </div>
                 
                 <div className="bg-gray-50/50 p-8 rounded-[2rem] border border-gray-100 flex items-start space-x-6 group hover:bg-white transition-all shadow-inner hover:shadow-xl">
                    <div className="p-5 bg-white rounded-3xl shadow-sm text-rose-600 group-hover:scale-110 transition-transform">
                        <FileText size={32} />
                    </div>
                    <div className="space-y-3">
                        <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest italic decoration-rose-500/30 underline decoration-4 underline-offset-4">Voucher Architecture</h4>
                        <p className="text-xs text-gray-500 font-medium leading-relaxed">
                            Define protocol models for your cash, bank, and journal transactions to ensure standardized data entry workflow.
                        </p>
                        <button className="flex items-center text-[10px] font-black text-rose-600 uppercase tracking-widest hover:translate-x-2 transition-transform">
                            Protocol Setup <ArrowRight size={14} className="ml-2" />
                        </button>
                    </div>
                 </div>
            </div>
        </div>
    );
};

export default AccountDashboard;
