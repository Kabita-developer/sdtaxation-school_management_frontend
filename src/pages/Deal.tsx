import { useState } from 'react';
import Layout from '../components/Layout';
import {
    GitMerge,
    Layers,
    Handshake,
    Globe,
    Tag,
    Settings2,
    Plus,
    Search,
    User,
    Filter,
    MoreVertical,
    DollarSign,
    TrendingUp,
    Clock,
    CheckCircle2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Deal() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        client: '',
        value: '',
        stage: 'Initial',
        probability: '20',
        closingDate: '',
        description: ''
    });

    const crmShortcuts = [
        { label: 'Pipline', icon: GitMerge, onClick: () => navigate('/crm/PIPLINE'), variant: 'primary' as const },
        { label: 'Lead', icon: Layers, onClick: () => navigate('/crm/LEAD'), variant: 'primary' as const },
        { label: 'Deal', icon: Handshake, onClick: () => navigate('/crm/DEAL'), variant: 'primary' as const },
        { label: 'Sources', icon: Globe, onClick: () => navigate('/crm/Sources'), variant: 'primary' as const },
        { label: 'Labels', icon: Tag, onClick: () => navigate('/crm/Labels'), variant: 'primary' as const },
        { label: 'Contact Type', icon: Settings2, onClick: () => navigate('/crm/Contact_type'), variant: 'primary' as const },
    ];

    const dealStats = [
        { id: '1', name: 'Open Deals', count: 28, value: '₹45.2L', color: 'bg-blue-600', icon: Handshake },
        { id: '2', name: 'Won Deals', count: 12, value: '₹18.5L', color: 'bg-green-600', icon: CheckCircle2 },
        { id: '3', name: 'Potential Value', count: 45, value: '₹1.2Cr', color: 'bg-purple-600', icon: TrendingUp },
        { id: '4', name: 'Avg Deal Size', count: null, value: '₹3.4L', color: 'bg-orange-600', icon: DollarSign },
    ];

    const deals = [
        { id: 'D001', title: 'Enterprise Software License', client: 'Tech Mahindra', value: '₹12.5L', stage: 'Negotiation', probability: '75%', closingDate: '2025-03-15' },
        { id: 'D002', title: 'Annual Tax Audit', client: 'Reliance Industries', value: '₹5.8L', stage: 'Analysis', probability: '40%', closingDate: '2025-03-20' },
        { id: 'D003', title: 'Financial Consulting', client: 'HDFC Bank', value: '₹8.2L', stage: 'Proposal', probability: '60%', closingDate: '2025-03-10' },
        { id: 'D004', title: 'Audit Services', client: 'TATA Motors', value: '₹15.4L', stage: 'Closing', probability: '90%', closingDate: '2025-02-28' },
        { id: 'D005', title: 'Legal Compliance', client: 'Wipro', value: '₹4.5L', stage: 'Initial', probability: '20%', closingDate: '2025-04-05' },
    ];

    const getStageColor = (stage: string) => {
        switch (stage) {
            case 'Closing': return 'bg-green-50 text-green-600 border-green-200';
            case 'Negotiation': return 'bg-blue-50 text-blue-600 border-blue-200';
            case 'Proposal': return 'bg-purple-50 text-purple-600 border-purple-200';
            case 'Analysis': return 'bg-orange-50 text-orange-600 border-orange-200';
            default: return 'bg-gray-50 text-gray-600 border-gray-200';
        }
    };

    return (
        <Layout title="CRM" shortcuts={crmShortcuts}>
            <div className="space-y-6">
                <div className="flex items-center justify-center">
                    <h1 className="text-xl font-black text-gray-900 uppercase tracking-widest">DEAL STAGES</h1>
                </div>
                {/* Deal Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {dealStats.map((stat) => (
                        <div key={stat.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 relative overflow-hidden group hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between relative z-10">
                                <div>
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{stat.name}</p>
                                    <div className="mt-1 flex items-baseline">
                                        <h3 className="text-2xl font-black text-gray-900">{stat.value}</h3>
                                        {stat.count && <span className="ml-2 text-xs font-bold text-gray-400">({stat.count} deals)</span>}
                                    </div>
                                </div>
                                <div className={`p-2.5 rounded-lg ${stat.color} text-white`}>
                                    <stat.icon size={20} />
                                </div>
                            </div>
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-50">
                                <div className={`h-full ${stat.color} opacity-20 group-hover:opacity-40 transition-opacity`} style={{ width: '100%' }}></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Deals Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white">
                        <h2 className="font-bold text-gray-900 flex items-center">
                            <Handshake size={18} className="mr-2 text-pink-600" />
                            Manage Deals
                        </h2>
                        <div className="flex items-center space-x-2">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                                <input
                                    type="text"
                                    placeholder="Search deals..."
                                    className="pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-pink-500 w-48"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <button className="flex items-center space-x-1 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-100 transition-colors">
                                <Filter size={14} />
                                <span>Filter</span>
                            </button>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="p-1.5 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                            >
                                <Plus size={16} />
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Deal Title</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Client</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Stage & Prob.</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Closing Date</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {deals.filter(d => d.title.toLowerCase().includes(searchTerm.toLowerCase()) || d.client.toLowerCase().includes(searchTerm.toLowerCase())).map((deal) => (
                                    <tr key={deal.id} className="hover:bg-gray-50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-gray-900 group-hover:text-pink-600 transition-colors">{deal.title}</span>
                                                <span className="text-[10px] text-gray-400 font-medium">#{deal.id}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-7 h-7 rounded bg-gray-100 flex items-center justify-center text-gray-500">
                                                    <User size={14} />
                                                </div>
                                                <span className="text-xs font-bold text-gray-700">{deal.client}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-black text-gray-900">{deal.value}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col space-y-1.5">
                                                <span className={`px-2 py-0.5 rounded border text-[10px] font-bold inline-block w-fit ${getStageColor(deal.stage)}`}>
                                                    {deal.stage}
                                                </span>
                                                <div className="flex items-center space-x-2 w-24">
                                                    <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                                                        <div className="h-full bg-pink-500" style={{ width: deal.probability }}></div>
                                                    </div>
                                                    <span className="text-[10px] font-bold text-gray-500">{deal.probability}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center text-xs text-gray-600 font-medium">
                                                <Clock size={14} className="mr-1.5 text-gray-400" />
                                                {deal.closingDate}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                                <MoreVertical size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-[11px] font-bold text-gray-500">
                            <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                            <span className="uppercase tracking-wide">28 ACTIVE DEALS IN PIPELINE</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <button className="px-3 py-1 border border-gray-200 rounded text-[10px] font-bold text-gray-600 bg-white hover:bg-gray-50">1</button>
                            <button className="px-3 py-1 border border-transparent rounded text-[10px] font-bold text-gray-400">2</button>
                            <button className="px-3 py-1 border border-transparent rounded text-[10px] font-bold text-gray-400">3</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Create Deal Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsModalOpen(false)}
                    ></div>

                    <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 max-w-2xl w-full overflow-hidden transform transition-all animate-in fade-in zoom-in duration-300 font-sans">
                        <div className="bg-pink-600 px-6 py-4 flex items-center justify-between">
                            <h2 className="text-white font-black uppercase tracking-widest flex items-center">
                                <Plus size={20} className="mr-2" />
                                Create New Deal
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-pink-100 hover:text-white transition-colors"
                            >
                                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1.5 md:col-span-2">
                                    <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Deal Title</label>
                                    <div className="relative">
                                        <Handshake className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={16} />
                                        <input
                                            type="text"
                                            placeholder="Example: Enterprise Software License..."
                                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all font-bold text-black placeholder:text-black/50"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Client Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={16} />
                                        <input
                                            type="text"
                                            placeholder="Enter client name..."
                                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all font-bold text-black placeholder:text-black/50"
                                            value={formData.client}
                                            onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Deal Value (Amount)</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={16} />
                                        <input
                                            type="text"
                                            placeholder="Example: ₹12.5L"
                                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all font-bold text-black placeholder:text-black/50"
                                            value={formData.value}
                                            onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Sales Stage</label>
                                    <div className="relative">
                                        <TrendingUp className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={16} />
                                        <select
                                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all font-bold text-black appearance-none"
                                            value={formData.stage}
                                            onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                                        >
                                            <option>Initial</option>
                                            <option>Analysis</option>
                                            <option>Proposal</option>
                                            <option>Negotiation</option>
                                            <option>Closing</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Closing Date</label>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={16} />
                                        <input
                                            type="date"
                                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all font-bold text-black"
                                            value={formData.closingDate}
                                            onChange={(e) => setFormData({ ...formData, closingDate: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 space-y-1.5">
                                <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Deal Description / Notes</label>
                                <textarea
                                    rows={3}
                                    placeholder="Write any additional details about the deal..."
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all font-bold text-black placeholder:text-black/50"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                ></textarea>
                            </div>

                            <div className="mt-8 flex items-center space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 py-3 border border-gray-200 rounded-xl text-xs font-black uppercase tracking-widest text-gray-500 hover:bg-gray-50 transition-all active:scale-95"
                                >
                                    Discard
                                </button>
                                <button
                                    type="submit"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setIsModalOpen(false);
                                    }}
                                    className="flex-2 py-3 bg-pink-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-pink-700 transition-all shadow-lg shadow-pink-200 active:scale-95 px-10"
                                >
                                    Create Deal
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Layout>
    );
}
