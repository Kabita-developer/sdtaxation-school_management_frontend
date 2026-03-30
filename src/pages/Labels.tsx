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
    AlertCircle,
    Star,
    Clock,
    Briefcase
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Labels() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        type: 'Priority',
        color: 'bg-blue-600',
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

    const labelCategories = [
        { name: 'Lead Priority', count: 4, icon: Star, color: 'text-yellow-500' },
        { name: 'Engagement Stage', count: 6, icon: Clock, color: 'text-blue-500' },
        { name: 'Business Type', count: 3, icon: Briefcase, color: 'text-purple-500' },
        { name: 'System Labels', count: 2, icon: AlertCircle, color: 'text-red-500' },
    ];

    const labels = [
        { id: 'L001', name: 'High Priority', color: 'bg-red-500', textColor: 'text-red-500', usage: 124, type: 'Priority', status: 'System' },
        { id: 'L002', name: 'VIP Client', color: 'bg-purple-600', textColor: 'text-purple-600', usage: 45, type: 'Priority', status: 'Custom' },
        { id: 'L003', name: 'Follow-up Required', color: 'bg-orange-500', textColor: 'text-orange-500', usage: 210, type: 'Status', status: 'System' },
        { id: 'L004', name: 'Hot Prospect', color: 'bg-pink-600', textColor: 'text-pink-600', usage: 67, type: 'Status', status: 'Custom' },
        { id: 'L005', name: 'Converted', color: 'bg-green-600', textColor: 'text-green-600', usage: 452, type: 'Status', status: 'System' },
        { id: 'L006', name: 'Dormant', color: 'bg-gray-400', textColor: 'text-gray-400', usage: 89, type: 'Status', status: 'System' },
        { id: 'L007', name: 'Corporate', color: 'bg-blue-600', textColor: 'text-blue-600', usage: 156, type: 'Type', status: 'Custom' },
        { id: 'L008', name: 'MSME', color: 'bg-cyan-600', textColor: 'text-cyan-600', usage: 92, type: 'Type', status: 'Custom' },
    ];

    return (
        <Layout title="CRM" shortcuts={crmShortcuts}>
            <div className="space-y-6">
                <div className="flex items-center justify-center">
                    <h1 className="text-xl font-black text-gray-900 uppercase tracking-widest">Labels</h1>
                </div>
                {/* Label Categories */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {labelCategories.map((cat) => (
                        <div key={cat.name} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center justify-between group hover:border-blue-200 transition-colors">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-blue-50 transition-colors">
                                    <cat.icon size={18} className={cat.color} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900 leading-none">{cat.name}</p>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">{cat.count} Active Labels</p>
                                </div>
                            </div>
                            <Plus size={14} className="text-gray-300 hover:text-blue-500 cursor-pointer" />
                        </div>
                    ))}
                </div>

                {/* Labels List */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                        <h2 className="font-bold text-gray-900 flex items-center text-sm uppercase tracking-wider">
                            <Tag size={16} className="mr-2 text-pink-600" />
                            Tag Management
                        </h2>
                        <div className="flex items-center space-x-2">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                                <input
                                    type="text"
                                    placeholder="Search labels..."
                                    className="pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-pink-500 w-48"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="px-3 py-1.5 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors text-xs font-bold leading-none"
                            >
                                CREATE NEW LABEL
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Label Appearance</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Type</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-center">Usage Count</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Registry</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {labels.filter(l => l.name.toLowerCase().includes(searchTerm.toLowerCase())).map((label) => (
                                    <tr key={label.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-3">
                                                <div className={`w-3 h-3 rounded-full ${label.color}`}></div>
                                                <span className={`px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-tight bg-opacity-10 ${label.color.replace('bg-', 'text-')} ${label.color.replace('bg-', 'bg-')}`}>
                                                    {label.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs font-medium text-gray-600">{label.type}</span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="text-sm font-black text-gray-900">{label.usage}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${label.status === 'System' ? 'border-gray-200 text-gray-400 bg-gray-50' : 'border-blue-100 text-blue-600 bg-blue-50'}`}>
                                                {label.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-gray-400 hover:text-gray-900">
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

            {/* Create Label Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsModalOpen(false)}
                    ></div>

                    <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 max-w-2xl w-full overflow-hidden transform transition-all animate-in fade-in zoom-in duration-300 font-sans">
                        <div className="bg-pink-600 px-6 py-4 flex items-center justify-between">
                            <h2 className="text-white font-black uppercase tracking-widest flex items-center text-sm">
                                <Plus size={18} className="mr-2" />
                                Create New Label
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
                                    <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Label Name</label>
                                    <div className="relative">
                                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={16} />
                                        <input
                                            type="text"
                                            placeholder="Example: High Priority, VIP Client..."
                                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all font-bold text-black placeholder:text-black/50"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Type</label>
                                    <div className="relative">
                                        <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={16} />
                                        <select
                                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all font-bold text-black appearance-none"
                                            value={formData.type}
                                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                        >
                                            <option>Priority</option>
                                            <option>Status</option>
                                            <option>Type</option>
                                            <option>Social</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Color Theme</label>
                                    <div className="relative">
                                        <AlertCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={16} />
                                        <select
                                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all font-bold text-black appearance-none"
                                            value={formData.color}
                                            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                                        >
                                            <option value="bg-red-500">Red</option>
                                            <option value="bg-orange-500">Orange</option>
                                            <option value="bg-yellow-500">Yellow</option>
                                            <option value="bg-green-600">Green</option>
                                            <option value="bg-blue-600">Blue</option>
                                            <option value="bg-indigo-600">Indigo</option>
                                            <option value="bg-purple-600">Purple</option>
                                            <option value="bg-pink-600">Pink</option>
                                            <option value="bg-gray-400">Gray</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 space-y-1.5">
                                <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Label Description / Notes</label>
                                <textarea
                                    rows={3}
                                    placeholder="Briefly describe when to use this label..."
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
                                    Create Label
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Layout>
    );
}
