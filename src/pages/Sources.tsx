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
    MoreVertical,
    BarChart3,
    MousePointer2,
    Share2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Sources() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        category: 'Website',
        totalLeads: '0',
        quality: 'Medium',
        status: 'Active',
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

    const sourceStats = [
        { id: '1', name: 'Top Channel', channel: 'Direct / Website', leads: 450, conversion: '12.5%', color: 'bg-blue-600' },
        { id: '2', name: 'Social Media', channel: 'Facebook/Instagram', leads: 320, conversion: '8.2%', color: 'bg-pink-600' },
        { id: '3', name: 'Paid Search', channel: 'Google Ads', leads: 280, conversion: '15.4%', color: 'bg-yellow-500' },
        { id: '4', name: 'Referrals', channel: 'Partner Network', leads: 150, conversion: '22.1%', color: 'bg-green-600' },
    ];

    const leadSources = [
        { id: 'S001', name: 'Google Ads', category: 'Paid Search', totalLeads: 285, activeLeads: 42, quality: 'High', status: 'Active' },
        { id: 'S002', name: 'Facebook Ads', category: 'Social Media', totalLeads: 194, activeLeads: 28, quality: 'Medium', status: 'Active' },
        { id: 'S003', name: 'Organic Search', category: 'SEO', totalLeads: 542, activeLeads: 85, quality: 'Medium', status: 'Active' },
        { id: 'S004', name: 'Partner Referral', category: 'Referral', totalLeads: 85, activeLeads: 12, quality: 'Very High', status: 'Active' },
        { id: 'S005', name: 'Direct Traffic', category: 'Website', totalLeads: 312, activeLeads: 54, quality: 'High', status: 'Active' },
        { id: 'S006', name: 'Email Campaign', category: 'Marketing', totalLeads: 156, activeLeads: 15, quality: 'Medium', status: 'Inactive' },
    ];

    return (
        <Layout title="CRM" shortcuts={crmShortcuts}>
            <div className="space-y-6">
                <div className="flex items-center justify-center">
                    <h1 className="text-xl font-black text-gray-900 uppercase tracking-widest">Sources</h1>
                </div>
                {/* Source Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {sourceStats.map((stat) => (
                        <div key={stat.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                            <div className="flex items-center space-x-3 mb-3">
                                <div className={`w-2 h-8 rounded-full ${stat.color}`}></div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.name}</p>
                                    <p className="text-sm font-bold text-gray-900">{stat.channel}</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-2xl font-black text-gray-900">{stat.leads}</p>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase">Total Leads</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-green-600">{stat.conversion}</p>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase">Conv. Rate</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sources List */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                        <h2 className="font-bold text-gray-900 flex items-center">
                            <Globe size={18} className="mr-2 text-blue-600" />
                            Lead Engagement Sources
                        </h2>
                        <div className="flex items-center space-x-2">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                                <input
                                    type="text"
                                    placeholder="Filter sources..."
                                    className="pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 w-48"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Plus size={16} />
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Source Name</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-center">Total Leads</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-center">Active</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Lead Quality</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {leadSources.map((source) => (
                                    <tr key={source.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-8 h-8 rounded bg-gray-50 flex items-center justify-center text-blue-600">
                                                    {source.category === 'Social Media' ? <Share2 size={14} /> :
                                                        source.category === 'Paid Search' ? <MousePointer2 size={14} /> :
                                                            <Globe size={14} />}
                                                </div>
                                                <span className="text-sm font-bold text-gray-900">{source.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-xs font-medium text-gray-500 uppercase">{source.category}</td>
                                        <td className="px-6 py-4 text-center text-sm font-black text-gray-900">{source.totalLeads}</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="text-sm font-bold text-blue-600">{source.activeLeads}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${source.quality.includes('High') ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                                                }`}>
                                                {source.quality}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-1.5">
                                                <div className={`w-1.5 h-1.5 rounded-full ${source.status === 'Active' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                                <span className="text-[11px] font-bold text-gray-600">{source.status}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-1 text-gray-400 hover:text-gray-600">
                                                <MoreVertical size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Create Source Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsModalOpen(false)}
                    ></div>

                    <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 max-w-2xl w-full overflow-hidden transform transition-all animate-in fade-in zoom-in duration-300 font-sans">
                        <div className="bg-blue-600 px-6 py-4 flex items-center justify-between">
                            <h2 className="text-white font-black uppercase tracking-widest flex items-center text-sm">
                                <Plus size={18} className="mr-2" />
                                Create Lead Engagement Source
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-blue-100 hover:text-white transition-colors"
                            >
                                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1.5 md:col-span-2">
                                    <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Source Name</label>
                                    <div className="relative">
                                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={16} />
                                        <input
                                            type="text"
                                            placeholder="Example: Google Ads, Facebook Campaign..."
                                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-bold text-black placeholder:text-black/50"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Category</label>
                                    <div className="relative">
                                        <Share2 className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={16} />
                                        <select
                                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-bold text-black appearance-none"
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        >
                                            <option>Website</option>
                                            <option>Social Media</option>
                                            <option>Paid Search</option>
                                            <option>SEO</option>
                                            <option>Referral</option>
                                            <option>Marketing</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Lead Quality</label>
                                    <div className="relative">
                                        <BarChart3 className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={16} />
                                        <select
                                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-bold text-black appearance-none"
                                            value={formData.quality}
                                            onChange={(e) => setFormData({ ...formData, quality: e.target.value })}
                                        >
                                            <option>Low</option>
                                            <option>Medium</option>
                                            <option>High</option>
                                            <option>Very High</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 space-y-1.5">
                                <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Source Description / Notes</label>
                                <textarea
                                    rows={3}
                                    placeholder="Briefly describe the purpose or tracking of this source..."
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-bold text-black placeholder:text-black/50"
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
                                    className="flex-2 py-3 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-95 px-10"
                                >
                                    Create Source
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Layout>
    );
}
