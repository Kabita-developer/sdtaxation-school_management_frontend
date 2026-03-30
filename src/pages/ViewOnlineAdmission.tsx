import React from 'react';
import {
    Printer,
    ChevronLeft,
    User,
    Users,
    MapPin,
    Calendar,
    Phone,
    Mail,
    Hash,
    School,
    Layers,
    Activity,
    Clock,
    CheckCircle2
} from 'lucide-react';

interface ViewOnlineAdmissionProps {
    record: any;
    onClose: () => void;
}

export default function ViewOnlineAdmission({ record, onClose }: ViewOnlineAdmissionProps) {
    return (
        <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
            {/* Header Sticky */}
            <div className="bg-white/80 backdrop-blur-md sticky top-0 z-30 rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-indigo-50 rounded-xl transition-all text-gray-400 hover:text-indigo-600 active:scale-90"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-xl font-black text-gray-900 uppercase tracking-tight">Student Profile View</h1>
                        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mt-0.5">Application Reference: {record?.refNo}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-800 transition-all shadow-lg shadow-gray-200 active:scale-95">
                        <Printer size={14} />
                        <span>Print Application</span>
                    </button>
                </div>
            </div>

            {/* Quick Status Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatusCard label="Admission Status" value={record?.formStatus} icon={Clock} color="indigo" />
                <StatusCard label="Financial Status" value={record?.paymentStatus} icon={Activity} color={record?.paymentStatus === 'Paid' ? 'emerald' : 'rose'} />
                <StatusCard label="Enrollment" value={record?.enrolled ? 'Official' : 'Pending'} icon={CheckCircle2} color={record?.enrolled ? 'emerald' : 'amber'} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Essential Bio */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 flex flex-col items-center text-center">
                        <div className="w-32 h-32 bg-indigo-50 rounded-3xl flex items-center justify-center text-indigo-200 border-4 border-indigo-50 mb-6 shrink-0 overflow-hidden">
                             <User size={64} />
                        </div>
                        <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">{record?.name}</h2>
                        <div className="mt-2 flex items-center space-x-2 px-3 py-1 bg-indigo-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest leading-none">
                            <School size={10} />
                            <span>{record?.class}</span>
                        </div>

                        <div className="w-full mt-8 pt-8 border-t border-gray-50 space-y-4">
                             <InfoLine label="Gender" value={record?.gender} icon={User} />
                             <InfoLine label="Date of Birth" value={record?.dob} icon={Calendar} />
                             <InfoLine label="Category" value={record?.category || 'General'} icon={Layers} />
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 space-y-4">
                         <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest px-2">Contact Channels</h3>
                         <div className="space-y-3">
                             <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-2xl group transition-all hover:bg-indigo-50">
                                 <div className="p-2 bg-white rounded-xl text-gray-400 group-hover:text-indigo-600 shadow-sm transition-colors">
                                    <Phone size={14} />
                                 </div>
                                 <span className="text-sm font-bold text-gray-700">{record?.mobile || 'N/A'}</span>
                             </div>
                             <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-2xl group transition-all hover:bg-indigo-50">
                                 <div className="p-2 bg-white rounded-xl text-gray-400 group-hover:text-indigo-600 shadow-sm transition-colors">
                                    <Mail size={14} />
                                 </div>
                                 <span className="text-sm font-bold text-gray-700 truncate">demo@school.com</span>
                             </div>
                         </div>
                    </div>
                </div>

                {/* Right Column: Detailed Info Sections */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Family Tree Section */}
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-50 flex items-center space-x-2">
                             <Users size={16} className="text-indigo-600" />
                             <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest">Parent / Guardian Details</h3>
                        </div>
                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
                             <div className="space-y-4">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-l-4 border-blue-600 pl-3">Father's Identification</p>
                                <div className="pl-4 space-y-2">
                                     <p className="text-lg font-black text-gray-900 uppercase tracking-tight">{record?.father}</p>
                                     <p className="text-xs font-bold text-gray-500 uppercase">Primary Financial Guardian</p>
                                </div>
                             </div>
                             <div className="space-y-4">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-l-4 border-rose-600 pl-3">Mother's Identification</p>
                                <div className="pl-4 space-y-2">
                                     <p className="text-lg font-black text-gray-900 uppercase tracking-tight">Parent Information Hidden</p>
                                     <p className="text-xs font-bold text-gray-500 uppercase italic">Not provided in initial form</p>
                                </div>
                             </div>
                        </div>
                    </div>

                    {/* Address Footprint Section */}
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-50 flex items-center space-x-2">
                             <MapPin size={16} className="text-indigo-600" />
                             <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest">Residencial Footprint</h3>
                        </div>
                        <div className="p-8 space-y-8">
                             <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Current Address</label>
                                <p className="text-sm font-bold text-gray-700 bg-gray-50 p-4 rounded-2xl border border-gray-100 italic">
                                    Not recorded. Verification pending from field agents or submitted documents.
                                </p>
                             </div>
                             <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Permanent Address</label>
                                <p className="text-sm font-bold text-gray-700 bg-gray-50/50 p-4 rounded-2xl border border-dashed border-gray-200 uppercase">
                                    Same as Current Address
                                </p>
                             </div>
                        </div>
                    </div>

                    {/* General Remarks / Details */}
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-50 flex items-center space-x-2">
                             <Activity size={16} className="text-indigo-600" />
                             <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest">General Remarks / Details</h3>
                        </div>
                        <div className="p-8">
                             <p className="text-sm font-bold text-gray-700 bg-indigo-50/30 p-5 rounded-2xl border border-indigo-100 italic">
                                 {record?.details || "No additional details or remarks provided for this student application."}
                             </p>
                        </div>
                    </div>

                    {/* Administrative Metadata */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="bg-indigo-50/30 rounded-3xl p-6 border border-indigo-100 space-y-2">
                            <Hash size={16} className="text-indigo-400" />
                            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Registered At Date</p>
                            <p className="text-sm font-black text-indigo-900 uppercase">{record?.createdAt}</p>
                         </div>
                         <div className="bg-indigo-50/30 rounded-3xl p-6 border border-indigo-100 space-y-2 text-right">
                            <Clock size={16} className="text-indigo-400 ml-auto" />
                            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest text-right">System ID</p>
                            <p className="text-sm font-black text-indigo-900 uppercase truncate">ADM-REG-{record?.refNo}</p>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

{/* Helper Components */}
function StatusCard({ label, value, icon: Icon, color }: any) {
    const colors: any = {
        indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100',
        emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
        rose: 'bg-rose-50 text-rose-600 border-rose-100',
        amber: 'bg-amber-50 text-amber-600 border-amber-100'
    };
    return (
        <div className={`p-4 rounded-3xl border flex items-center space-x-4 shadow-sm ${colors[color]}`}>
            <div className="p-3 bg-white rounded-2xl shadow-sm shrink-0">
                <Icon size={18} />
            </div>
            <div>
                <p className="text-[9px] font-black uppercase tracking-widest opacity-60 leading-none mb-1">{label}</p>
                <p className="text-xs font-black uppercase tracking-tight leading-none truncate">{value}</p>
            </div>
        </div>
    );
}

function InfoLine({ label, value, icon: Icon }: any) {
    return (
        <div className="flex items-center justify-between py-1 border-b border-gray-50 last:border-0">
            <div className="flex items-center space-x-2 text-gray-400">
                <Icon size={12} />
                <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
            </div>
            <span className="text-[11px] font-black text-gray-700 uppercase">{value || 'N/A'}</span>
        </div>
    );
}
