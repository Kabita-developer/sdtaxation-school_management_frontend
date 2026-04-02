import { useState } from 'react';
import {
    Plus,
    Search,
    MapPin,
    Edit2,
    X,
    FileSpreadsheet,
    FileText,
    FileCode,
    Printer,
    ChevronDown,
    MoreHorizontal,
    Navigation,
    Globe,
    AlertCircle,
    Trash2
} from 'lucide-react';

const PickupPoint = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({ name: '', lat: '', lng: '' });
    const [pointToDelete, setPointToDelete] = useState<any>(null);

    const handleAdd = () => {
        setFormData({ name: '', lat: '', lng: '' });
        setEditMode(false);
        setIsModalOpen(true);
    };

    const handleEdit = (point: any) => {
        setFormData({ name: point.name, lat: point.lat, lng: point.lng });
        setEditMode(true);
        setIsModalOpen(true);
    };

    const handleDeleteClick = (point: any) => {
        setPointToDelete(point);
        setIsDeleteModalOpen(true);
    };
    
    const pickupPoints = [
        { id: 1, name: 'Brooklyn North', lat: '23.21953720694318', lng: '79.92068396109676' },
        { id: 2, name: 'Brooklyn South', lat: '23.204781722973813', lng: '79.89751486729702' },
        { id: 3, name: 'Brooklyn West', lat: '23.19324172886614', lng: '79.91536320113687' },
        { id: 4, name: 'Brooklyn East', lat: '23.193952567195506', lng: '79.9243812546212' },
        { id: 5, name: 'Brooklyn Central', lat: '23.21230494959826', lng: '79.92914139397962' },
        { id: 6, name: 'Manhattan', lat: '23.2066336875236', lng: '80.00451042401824' },
        { id: 7, name: 'Railway Station', lat: '23.16662749489289', lng: '79.95054096414184' },
        { id: 8, name: 'High Court', lat: '23.168615566293845', lng: '79.94726999887004' },
        { id: 9, name: 'Civil Line', lat: '23.166120045559563', lng: '79.95531910260692' },
        { id: 10, name: 'Vijay Nagar', lat: '23.190170327286868', lng: '79.89643280559972' },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-700 text-left">
            {/* Header Section - Enhanced Rounded Container as per Image */}
            <div className="bg-white p-8 rounded-[3.5rem] border border-gray-100 shadow-sm flex items-center justify-between relative overflow-hidden group transition-all duration-500 hover:shadow-xl">
                <div className="relative z-10 text-left">
                    <div className="inline-flex items-center px-4 py-1.5 bg-indigo-50/50 rounded-full border border-indigo-100 text-[10px] font-black uppercase tracking-[0.25em] text-[#6366f1] mb-5">
                        Logistics Infrastructure
                    </div>
                    <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter italic leading-none">Pickup Point Registry</h1>
                    <p className="text-[12px] text-gray-400 font-bold mt-3 max-w-sm leading-relaxed text-left opacity-70">
                        Manage geographic distribution of transport nodes, coordinate verification, and site-specific metadata.
                    </p>
                </div>
                <button 
                    onClick={handleAdd}
                    className="relative group flex items-center space-x-4 px-10 py-5 bg-indigo-600 text-white rounded-3xl transition-all duration-500 hover:scale-[1.02] hover:bg-indigo-700 shadow-[0_20px_60px_-15px_rgba(79,70,229,0.6)] active:scale-95 overflow-hidden border border-white/10"
                >
                    {/* Glossy Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"></div>
                    
                    {/* Icon Container */}
                    <div className="w-10 h-10 bg-white/15 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all duration-500 group-hover:rotate-90">
                        <Plus size={22} strokeWidth={3} className="text-white drop-shadow-md" />
                    </div>
                    
                    {/* Text */}
                    <div className="flex flex-col items-start leading-none space-y-1">
                        <span className="text-[12px] font-black uppercase tracking-[0.3em] opacity-80 group-hover:opacity-100 transition-opacity">Add Logistics</span>
                        <span className="text-sm font-black uppercase tracking-[0.1em] italic group-hover:translate-x-1 transition-transform">New Node</span>
                    </div>
                </button>
                {/* Decorative Background Icon */}
                <div className="absolute right-0 top-0 opacity-[0.03] -translate-y-8 translate-x-8 -rotate-12 pointer-events-none">
                   <Globe size={220} className="text-gray-900" />
                </div>
            </div>

            {/* List / Registry Table */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden group transition-all">
                {/* Advanced Toolbar */}
                <div className="px-8 py-7 border-b border-gray-100 bg-gray-50/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="relative group/search">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within/search:text-indigo-600 transition-colors" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search logistics node..."
                            className="bg-white border border-gray-200 focus:border-indigo-500 rounded-2xl pl-12 pr-4 py-3 text-[12px] font-bold text-gray-900 w-full md:w-96 transition-all outline-none shadow-sm focus:ring-4 focus:ring-indigo-50"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2 px-4 py-2.5 bg-white rounded-2xl border border-gray-200 hover:border-indigo-500 transition-all shadow-sm">
                            <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Visibility Rate</span>
                            <span className="text-[12px] font-black text-indigo-600">50</span>
                            <ChevronDown size={16} className="text-gray-400" />
                        </div>
                        <div className="flex items-center space-x-2 border-l border-gray-200 pl-6">
                            {[
                                { icon: FileSpreadsheet, label: 'XLSX' },
                                { icon: FileText, label: 'DOC' },
                                { icon: FileCode, label: 'PDF' },
                                { icon: Printer, label: 'PRT' }
                            ].map((action) => (
                                <button key={action.label} className="p-3 text-gray-500 hover:text-white hover:bg-gray-900 rounded-xl transition-all group/btn shadow-sm border border-transparent hover:border-gray-900" title={action.label}>
                                    <action.icon size={20} className="translate-y-0 group-hover/btn:-translate-y-0.5 transition-transform" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Data Table */}
                <div className="overflow-x-auto text-left">
                    <table className="w-full text-left border-separate border-spacing-0">
                        <thead>
                            <tr className="bg-gray-50/80">
                                <th className="px-10 py-6 text-[10px] font-black text-gray-800 uppercase tracking-[0.2em] border-b border-gray-100">Logistics Node Identifier</th>
                                <th className="px-10 py-6 text-[10px] font-black text-gray-800 uppercase tracking-[0.2em] border-b border-gray-100 text-center">Latitude Protocol</th>
                                <th className="px-10 py-6 text-[10px] font-black text-gray-800 uppercase tracking-[0.2em] border-b border-gray-100 text-center">Longitude Protocol</th>
                                <th className="px-10 py-6 text-[10px] font-black text-gray-800 uppercase tracking-[0.2em] border-b border-gray-100 text-right pr-16">Administrative Control</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 bg-white">
                            {pickupPoints.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map((point) => (
                                <tr key={point.id} className="hover:bg-indigo-50/40 transition-all group/row">
                                    <td className="px-10 py-7">
                                        <div className="flex items-center space-x-5">
                                            <div className="w-12 h-12 bg-gray-900 text-white rounded-2xl flex items-center justify-center border border-gray-800 shadow-xl group-hover/row:bg-indigo-600 group-hover/row:border-indigo-600 transition-all group-hover/row:scale-105">
                                                <Navigation size={22} className="rotate-45" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-black text-gray-900 uppercase tracking-tight italic group-hover/row:text-indigo-600 transition-colors leading-none">{point.name}</span>
                                                <span className="text-[10px] font-bold text-indigo-600/60 uppercase tracking-widest mt-2 group-hover/row:text-indigo-600/80 italic">Verified Gateway</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-7 text-center">
                                        <span className="text-[12px] font-mono font-bold text-gray-800 bg-gray-50 px-4 py-2 rounded-xl border border-gray-200 group-hover/row:border-indigo-200 group-hover/row:bg-white transition-all shadow-inner">{point.lat}</span>
                                    </td>
                                    <td className="px-10 py-7 text-center">
                                        <span className="text-[12px] font-mono font-bold text-gray-800 bg-gray-50 px-4 py-2 rounded-xl border border-gray-200 group-hover/row:border-indigo-200 group-hover/row:bg-white transition-all shadow-inner">{point.lng}</span>
                                    </td>
                                    <td className="px-10 py-7 text-right pr-16">
                                        <div className="flex items-center justify-end space-x-3">
                                            {/* Action: View Map */}
                                            <div className="relative group/tooltip">
                                                <button className="p-3 bg-gray-900 text-white rounded-2xl shadow-xl shadow-gray-200 hover:bg-indigo-600 transition-all active:scale-90 border border-transparent hover:border-indigo-400">
                                                    <MapPin size={18} />
                                                </button>
                                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all whitespace-nowrap z-20 shadow-2xl">
                                                    View Map
                                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-900"></div>
                                                </div>
                                            </div>

                                            {/* Action: Edit Point */}
                                            <div className="relative group/tooltip">
                                                <button 
                                                    onClick={() => handleEdit(point)}
                                                    className="p-3 bg-gray-900 text-white rounded-2xl shadow-xl shadow-gray-200 hover:bg-indigo-600 transition-all active:scale-90 border border-transparent hover:border-indigo-400"
                                                >
                                                    <Edit2 size={18} />
                                                </button>
                                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all whitespace-nowrap z-20 shadow-2xl">
                                                    Edit Point
                                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-900"></div>
                                                </div>
                                            </div>

                                            {/* Action: Delete Point */}
                                            <div className="relative group/tooltip">
                                                <button 
                                                    onClick={() => handleDeleteClick(point)}
                                                    className="p-3 bg-gray-900 text-white rounded-2xl shadow-xl shadow-gray-200 hover:bg-rose-600 transition-all active:scale-90 border border-transparent hover:border-rose-400"
                                                >
                                                    <X size={18} />
                                                </button>
                                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 bg-rose-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all whitespace-nowrap z-20 shadow-2xl">
                                                    Delete Point
                                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-rose-600"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Institutional Footer */}
                <div className="px-10 py-8 bg-gray-50/80 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex flex-col">
                        <p className="text-[10px] font-black text-gray-800 uppercase tracking-[0.2em] italic leading-none">Infrastructure Audit Engine</p>
                        <p className="text-[9px] font-bold text-indigo-600 uppercase tracking-widest mt-2 flex items-center italic">
                            <Globe size={12} className="mr-2" /> Global Coordinate Verification Protocol Active
                        </p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic pr-4 border-r border-gray-200">Session ID: GEO-88574</span>
                        <button className="px-8 py-3 bg-gray-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-gray-200 hover:bg-indigo-600 transition-all active:scale-95">Re-Synchronize Nodes</button>
                    </div>
                </div>
            </div>

            {/* Logistical Node Modal (Add) */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 text-left">
                    <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-[2px] transition-all duration-500" onClick={() => setIsModalOpen(false)}></div>
                    <div className="relative bg-white rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] max-w-md w-full overflow-hidden animate-in zoom-in-95 fade-in duration-300 border border-gray-100">
                        {/* Modal Header - Premium Indigo Header */}
                        <div className="bg-[#6366f1] px-5 py-3 flex items-center justify-between">
                            <h2 className="text-white font-bold text-lg tracking-tight">{editMode ? 'Edit' : 'Add'}</h2>
                            <button 
                                onClick={() => setIsModalOpen(false)} 
                                className="w-7 h-7 flex items-center justify-center text-white hover:bg-white/20 rounded-lg transition-all active:scale-90"
                            >
                                <X size={20} strokeWidth={2.5} />
                            </button>
                        </div>

                        <form className="p-0 flex flex-col">
                            <div className="p-6 space-y-5 text-left">
                                {/* Pickup Point */}
                                <div className="space-y-1.5 text-left group">
                                    <label className="text-[12px] font-bold text-gray-700 ml-1">
                                        Pickup Point <span className="text-rose-500 ml-0.5 font-bold text-base leading-none">*</span>
                                    </label>
                                    <div className="relative">
                                        <input 
                                            type="text" 
                                            placeholder="Enter pickup point name"
                                            className="w-full px-4 py-2.5 bg-white border border-gray-200 focus:border-[#6366f1] rounded-xl text-sm font-bold text-gray-900 transition-all outline-none shadow-sm focus:ring-4 focus:ring-indigo-50 placeholder:text-gray-300 placeholder:font-medium"
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        />
                                    </div>
                                </div>

                                {/* Automation Link */}
                                <div className="text-left py-0.5">
                                    <button 
                                        type="button" 
                                        className="text-[13px] font-bold text-[#6366f1] hover:text-indigo-800 transition-all flex items-center group"
                                    >
                                        <span className="border-b-[1.5px] border-indigo-100 group-hover:border-[#6366f1]">Click here to get latitude and longitude</span>
                                    </button>
                                </div>

                                {/* Latitude */}
                                <div className="space-y-1.5 text-left group">
                                    <label className="text-[12px] font-bold text-gray-700 ml-1">
                                        Latitude <span className="text-rose-500 ml-0.5 font-bold text-base leading-none">*</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        placeholder="0.000000"
                                        className="w-full px-4 py-2.5 bg-white border border-gray-200 focus:border-[#6366f1] rounded-xl text-sm font-mono font-bold text-gray-900 transition-all outline-none shadow-sm focus:ring-4 focus:ring-indigo-50 placeholder:text-gray-300 placeholder:font-medium italic"
                                        value={formData.lat}
                                        onChange={(e) => setFormData({...formData, lat: e.target.value})}
                                    />
                                </div>

                                {/* Longitude */}
                                <div className="space-y-1.5 text-left group">
                                    <label className="text-[12px] font-bold text-gray-700 ml-1">
                                        Longitude <span className="text-rose-500 ml-0.5 font-bold text-base leading-none">*</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        placeholder="0.000000"
                                        className="w-full px-4 py-2.5 bg-white border border-gray-200 focus:border-[#6366f1] rounded-xl text-sm font-mono font-bold text-gray-900 transition-all outline-none shadow-sm focus:ring-4 focus:ring-indigo-50 placeholder:text-gray-300 placeholder:font-medium italic"
                                        value={formData.lng}
                                        onChange={(e) => setFormData({...formData, lng: e.target.value})}
                                    />
                                </div>
                            </div>

                            {/* Modal Footer - Professional Divider and Align Right */}
                            <div className="p-5 border-t border-gray-100 flex items-center justify-end bg-white">
                                <button 
                                    type="submit"
                                    onClick={(e) => { e.preventDefault(); setIsModalOpen(false); }}
                                    className="px-8 py-2.5 bg-[#6366f1] text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-100 border border-transparent"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* Logistical Node Deletion Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 text-left">
                    <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-all duration-500" onClick={() => setIsDeleteModalOpen(false)}></div>
                    <div className="relative bg-white rounded-[2rem] shadow-[0_25px_70px_rgba(0,0,0,0.3)] max-w-[400px] w-full overflow-hidden animate-in zoom-in-95 fade-in duration-300 border border-gray-100">
                        {/* Decorative Warning Header */}
                        <div className="h-2 bg-rose-500 w-full"></div>
                        
                        <div className="p-8 flex flex-col items-center text-center">
                            <div className="w-20 h-20 bg-rose-50 rounded-[2rem] flex items-center justify-center mb-6 border border-rose-100 group transition-all">
                                <Trash2 size={36} className="text-rose-500 group-hover:scale-110 transition-transform" />
                            </div>
                            
                            <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter italic mb-2">Confirm Node Deletion</h3>
                            <p className="text-[13px] text-gray-500 font-bold leading-relaxed opacity-80">
                                You are about to initiate the decommissioning of <span className="text-rose-600 italic">"{pointToDelete?.name}"</span>. This action is irreversible within the current coordinate registry.
                            </p>
                        </div>

                        <div className="px-8 pb-8 pt-2 flex flex-col space-y-3">
                            <button 
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="w-full py-4 bg-rose-600 text-white rounded-2xl text-[12px] font-black uppercase tracking-[0.2em] hover:bg-rose-700 transition-all shadow-xl shadow-rose-100 active:scale-95 flex items-center justify-center space-x-2"
                            >
                                <AlertCircle size={16} />
                                <span>Execute Deletion</span>
                            </button>
                            <button 
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="w-full py-4 bg-gray-50 text-gray-600 rounded-2xl text-[12px] font-black uppercase tracking-[0.2em] hover:bg-gray-100 transition-all active:scale-95 border border-gray-100"
                            >
                                Abort Protocol
                            </button>
                        </div>

                        {/* Modal Footer Decorative */}
                        <div className="px-8 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-center">
                            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest italic flex items-center">
                                <AlertCircle size={12} className="mr-2 text-rose-400" /> Administrative Authorization Required
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PickupPoint;
