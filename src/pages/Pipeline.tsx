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
    ChevronRight,
    User,
    Calendar,
    Clock,
    ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Pipeline() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const crmShortcuts = [
        { label: 'Pipline', icon: GitMerge, onClick: () => navigate('/crm/PIPLINE'), variant: 'primary' as const },
        { label: 'Lead', icon: Layers, onClick: () => navigate('/crm/LEAD'), variant: 'primary' as const },
        { label: 'Deal', icon: Handshake, onClick: () => navigate('/crm/DEAL'), variant: 'primary' as const },
        { label: 'Sources', icon: Globe, onClick: () => navigate('/crm/Sources'), variant: 'primary' as const },
        { label: 'Labels', icon: Tag, onClick: () => navigate('/crm/Labels'), variant: 'primary' as const },
        { label: 'Contact Type', icon: Settings2, onClick: () => navigate('/crm/Contact_type'), variant: 'primary' as const },
    ];

    const pipelineStages = [
        { id: '1', name: 'New Enquiry', count: 12, color: 'bg-blue-500', totalValue: '₹4.5L' },
        { id: '2', name: 'Document Pending', count: 8, color: 'bg-orange-500', totalValue: '₹2.8L' },
        { id: '3', name: 'Verification', count: 5, color: 'bg-purple-500', totalValue: '₹1.9L' },
        { id: '4', name: 'Fee Payment', count: 14, color: 'bg-indigo-500', totalValue: '₹8.2L' },
        { id: '5', name: 'Admission Done', count: 24, color: 'bg-green-500', totalValue: '₹15.4L' },
    ];

    const recentEnquiries = [
        { id: 'ENQ001', name: 'Rahul Sharma', course: 'B.Tech CS', date: '2025-02-18', status: 'Verification' },
        { id: 'ENQ002', name: 'Priya Patel', course: 'MBA Finance', date: '2025-02-18', status: 'New Enquiry' },
        { id: 'ENQ003', name: 'Aman Verma', course: 'B.Com Hons', date: '2025-02-17', status: 'Fee Payment' },
        { id: 'ENQ004', name: 'Sneha Gupta', course: 'B.Arch', date: '2025-02-17', status: 'Admission Done' },
    ];

    return (
        <Layout title="CRM" shortcuts={crmShortcuts}>
            <div className="space-y-6 relative">
                <div className="flex items-center justify-center">
                    <h1 className="text-xl font-black text-gray-900 uppercase tracking-widest">PIPLINE</h1>
                </div>

                {/* Modal Overlay */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-gray-100 animate-in zoom-in-95 duration-300">
                            {/* Modal Header */}
                            <div className="bg-blue-600 px-6 py-5 flex items-center justify-between text-white">
                                <div>
                                    <h2 className="text-xl font-bold flex items-center">
                                        <Plus className="mr-2" size={20} />
                                        New Admission Enquiry
                                    </h2>
                                    <p className="text-blue-100 text-[10px] mt-1 font-medium uppercase tracking-widest">Pipeline Management System</p>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors shadow-inner"
                                >
                                    <Plus className="rotate-45" size={18} />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <form className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">Student Name</label>
                                        <input type="text" placeholder="Enter full name" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">Applied Course</label>
                                        <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium appearance-none">
                                            <option>Select Course</option>
                                            <option>B.Tech Computer Science</option>
                                            <option>MBA Finance</option>
                                            <option>B.Arch</option>
                                            <option>B.Com Honours</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">Phone Number</label>
                                        <input type="tel" placeholder="+91 XXXXX XXXXX" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">Email Address</label>
                                        <input type="email" placeholder="example@college.com" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">Lead Source</label>
                                        <div className="flex space-x-2">
                                            {['Social Media', 'Website', 'Direct', 'Referral'].map((source) => (
                                                <button key={source} type="button" className="flex-1 py-2 text-[10px] font-bold bg-gray-100 hover:bg-blue-50 text-gray-600 hover:text-blue-600 rounded-lg border border-transparent hover:border-blue-100 transition-all whitespace-nowrap">
                                                    {source}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">Entry Date</label>
                                        <input type="date" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium" />
                                    </div>
                                    <div className="md:col-span-2 space-y-1.5">
                                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">Brief Description / Notes</label>
                                        <textarea rows={3} placeholder="Add any specific requirements or background info..." className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium resize-none"></textarea>
                                    </div>
                                </div>

                                <div className="mt-8 flex items-center justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-6 py-2.5 text-sm font-bold text-gray-500 hover:bg-gray-100 rounded-xl transition-colors border border-gray-100"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-8 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all active:scale-95 flex items-center"
                                    >
                                        <Plus size={18} className="mr-2" />
                                        Create Enquiry
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Pipeline Visualizer */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {pipelineStages.map((stage) => (
                        <div key={stage.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className={`h-1.5 ${stage.color}`}></div>
                            <div className="p-4 text-center">
                                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">{stage.name}</h3>
                                <p className="text-2xl font-black text-gray-900 mt-2">{stage.count}</p>
                                <p className="text-xs font-medium text-gray-400 mt-1">{stage.totalValue}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main List */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                                <h2 className="font-bold text-gray-900 flex items-center">
                                    <GitMerge size={18} className="mr-2 text-blue-600" />
                                    Admission Enquiries
                                </h2>
                                <div className="flex items-center space-x-2">
                                    <div className="relative">
                                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                                        <input
                                            type="text"
                                            placeholder="Search..."
                                            className="pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 w-40"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        className="p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {recentEnquiries.filter(e => e.name.toLowerCase().includes(searchTerm.toLowerCase())).map((enq) => (
                                    <div key={enq.id} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                                <User size={20} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 text-sm">{enq.name}</h4>
                                                <div className="flex items-center space-x-3 mt-1 text-xs text-gray-500 font-medium">
                                                    <span className="flex items-center"><ChevronRight size={12} className="mr-1" /> {enq.course}</span>
                                                    <span className="flex items-center"><Calendar size={12} className="mr-1" /> {enq.date}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-[10px] font-bold uppercase tracking-tight">
                                                {enq.status}
                                            </span>
                                            <button className="text-gray-400 hover:text-gray-600 transition-colors">
                                                <ArrowRight size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-3 bg-gray-50 text-center">
                                <button className="text-xs font-bold text-blue-600 hover:underline">View All Enquiries</button>
                            </div>
                        </div>
                    </div>

                    {/* Activity Feed */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="p-4 border-b border-gray-100">
                                <h2 className="font-bold text-gray-900 flex items-center text-sm">
                                    <Clock size={18} className="mr-2 text-orange-500" />
                                    Recent Activity
                                </h2>
                            </div>
                            <div className="p-4 space-y-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="flex space-x-3 items-start">
                                        <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600 flex-shrink-0">
                                            <GitMerge size={16} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-800 leading-relaxed font-medium">
                                                <span className="font-bold">Rahul Sharma</span> enquiry status updated to <span className="text-blue-600 font-bold">Verification</span>
                                            </p>
                                            <p className="text-[10px] text-gray-400 mt-1">24 minutes ago</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
