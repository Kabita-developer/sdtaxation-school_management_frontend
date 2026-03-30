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
    Mail,
    Phone,
    MessageSquare
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Lead() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        source: 'Website',
        status: 'Hot',
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

    const leadStats = [
        { id: '1', name: 'Total Leads', count: 156, color: 'bg-indigo-500', trend: '+12%' },
        { id: '2', name: 'Hot Leads', count: 42, color: 'bg-red-500', trend: '+5%' },
        { id: '3', name: 'Warm Leads', count: 68, color: 'bg-orange-500', trend: '+8%' },
        { id: '4', name: 'Cold Leads', count: 46, color: 'bg-blue-500', trend: '-2%' },
    ];

    const leads = [
        { id: 'L001', name: 'Arjun Mehta', source: 'Website', email: 'arjun.m@example.com', phone: '+91 98765 43210', status: 'Hot', date: '2025-02-19' },
        { id: 'L002', name: 'Kirat Kaur', source: 'Facebook', email: 'kirat.k@example.com', phone: '+91 98765 43211', status: 'Warm', date: '2025-02-19' },
        { id: 'L003', name: 'Vikram Singh', source: 'Referral', email: 'vikram.s@example.com', phone: '+91 98765 43212', status: 'Cold', date: '2025-02-18' },
        { id: 'L004', name: 'Megha Sharma', source: 'LinkedIn', email: 'megha.s@example.com', phone: '+91 98765 43213', status: 'Hot', date: '2025-02-18' },
        { id: 'L005', name: 'Rohan Gupta', source: 'Google Ads', email: 'rohan.g@example.com', phone: '+91 98765 43214', status: 'Warm', date: '2025-02-17' },
    ];

    return (
        <Layout title="CRM" shortcuts={crmShortcuts}>
            <div className="space-y-6">
                <div className="flex items-center justify-center">
                    <h1 className="text-xl font-black text-gray-900 uppercase tracking-widest">Lead Stages</h1>
                </div>
                {/* Lead Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {leadStats.map((stat) => (
                        <div key={stat.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden p-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider font-bold">{stat.name}</p>
                                    <h3 className="text-2xl font-black text-gray-900 mt-1">{stat.count}</h3>
                                </div>
                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${stat.trend.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                    {stat.trend}
                                </span>
                            </div>
                            <div className={`h-1 w-full bg-gray-100 rounded-full mt-4 overflow-hidden`}>
                                <div className={`h-full ${stat.color}`} style={{ width: '60%' }}></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Lead List Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                        <h2 className="font-bold text-gray-900 flex items-center">
                            <Layers size={18} className="mr-2 text-indigo-600" />
                            Lead Management
                        </h2>
                        <div className="flex items-center space-x-2">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                                <input
                                    type="text"
                                    placeholder="Search leads..."
                                    className="pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 w-48"
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
                                className="p-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                            >
                                <Plus size={16} />
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="px-6 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Lead Name</th>
                                    <th className="px-6 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Source</th>
                                    <th className="px-6 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Contact Info</th>
                                    <th className="px-6 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Created Date</th>
                                    <th className="px-6 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {leads.filter(l => l.name.toLowerCase().includes(searchTerm.toLowerCase())).map((lead) => (
                                    <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                                                    <User size={16} />
                                                </div>
                                                <span className="text-sm font-bold text-gray-900">{lead.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs font-medium text-gray-600">{lead.source}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col space-y-1">
                                                <div className="flex items-center text-[11px] text-gray-500">
                                                    <Mail size={12} className="mr-1.5" /> {lead.email}
                                                </div>
                                                <div className="flex items-center text-[11px] text-gray-500">
                                                    <Phone size={12} className="mr-1.5" /> {lead.phone}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${lead.status === 'Hot' ? 'bg-red-50 text-red-600' :
                                                lead.status === 'Warm' ? 'bg-orange-50 text-orange-600' :
                                                    'bg-blue-50 text-blue-600'
                                                }`}>
                                                {lead.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-gray-500 font-medium">
                                            {lead.date}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-2">
                                                <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors">
                                                    <MessageSquare size={14} />
                                                </button>
                                                <button className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors">
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
                        <p className="text-xs text-gray-500 font-medium font-bold uppercase tracking-wide">Showing 5 of 156 Leads</p>
                        <div className="flex space-x-2">
                            <button className="px-3 py-1 border border-gray-200 rounded text-[10px] font-bold text-gray-600 bg-white hover:bg-gray-50 transition-colors">Previous</button>
                            <button className="px-3 py-1 border border-gray-200 rounded text-[10px] font-bold text-gray-600 bg-white hover:bg-gray-50 transition-colors">Next</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Create Lead Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsModalOpen(false)}
                    ></div>

                    <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 max-w-2xl w-full overflow-hidden transform transition-all animate-in fade-in zoom-in duration-300">
                        <div className="bg-indigo-600 px-6 py-4 flex items-center justify-between">
                            <h2 className="text-white font-black uppercase tracking-widest flex items-center">
                                <Plus size={20} className="mr-2" />
                                Create New Lead
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

                        <form className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Student Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={16} />
                                        <input
                                            type="text"
                                            placeholder="Enter student name..."
                                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-bold text-black placeholder:text-black/50"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={16} />
                                        <input
                                            type="email"
                                            placeholder="Example: arjun@tax.com"
                                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-bold text-black placeholder:text-black/50"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Phone Number</label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={16} />
                                        <input
                                            type="text"
                                            placeholder="+91 00000 00000"
                                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-bold text-black placeholder:text-black/50"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Lead Source</label>
                                    <div className="relative">
                                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={16} />
                                        <select
                                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-bold text-black appearance-none"
                                            value={formData.source}
                                            onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                                        >
                                            <option>Website</option>
                                            <option>Facebook</option>
                                            <option>LinkedIn</option>
                                            <option>Google Ads</option>
                                            <option>Referral</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Initial Status</label>
                                    <div className="relative">
                                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={16} />
                                        <select
                                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-bold text-black appearance-none"
                                            value={formData.status}
                                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        >
                                            <option>Hot</option>
                                            <option>Warm</option>
                                            <option>Cold</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 space-y-1.5">
                                <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Lead Description / Notes</label>
                                <textarea
                                    rows={3}
                                    placeholder="Write any additional details about the lead..."
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-bold text-black placeholder:text-black/50"
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
                                    className="flex-2 py-3 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95 px-10"
                                >
                                    Create Lead
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Layout>
    );
}
