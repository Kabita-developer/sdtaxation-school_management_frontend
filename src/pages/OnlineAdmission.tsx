import { useState } from 'react';
import {
    Search,
    ChevronDown,
    FileText,
    Printer,
    FileSpreadsheet,
    FileJson,
    Eye,
    Edit2,
    Trash2,
    CheckCircle,
    XCircle,
    Calendar,
    ArrowUpDown,
    AlertCircle,
    X,
    LucideIcon
} from 'lucide-react';
import EditOnlineAdmission from './EditOnlineAdmission';
import ViewOnlineAdmission from './ViewOnlineAdmission';

interface AdmissionRecord {
    refNo: string;
    name: string;
    class: string;
    father: string;
    dob: string;
    gender: string;
    category: string;
    mobile: string;
    formStatus: string;
    paymentStatus: string;
    enrolled: boolean;
    createdAt: string;
}

export default function OnlineAdmission() {
    const [searchTerm, setSearchTerm] = useState('');
    const [entriesPerPage, setEntriesPerPage] = useState(50);
    const [isEditing, setIsEditing] = useState(false);
    const [isViewing, setIsViewing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [editingRecord, setEditingRecord] = useState<AdmissionRecord | null>(null);
    const [viewingRecord, setViewingRecord] = useState<AdmissionRecord | null>(null);
    const [deletingRecord, setDeletingRecord] = useState<AdmissionRecord | null>(null);

    const admissions: AdmissionRecord[] = [
        {
            refNo: '251891',
            name: 'AVYAAN',
            class: 'Class 1(A)',
            father: 's.r',
            dob: '10/14/2020',
            gender: 'Male',
            category: '',
            mobile: '78646736787',
            formStatus: 'Not Submitted',
            paymentStatus: 'Unpaid',
            enrolled: true,
            createdAt: '02/02/2026'
        },
        {
            refNo: '887111',
            name: 'Aman Joshi',
            class: 'Class 2(A)',
            father: 's.k',
            dob: '04/22/2023',
            gender: 'Male',
            category: '',
            mobile: '7y684868438',
            formStatus: 'Not Submitted',
            paymentStatus: 'Unpaid',
            enrolled: true,
            createdAt: '02/02/2026'
        },
        {
            refNo: '810117',
            name: 'Nidhi Varma',
            class: 'Class 1(A)',
            father: 'Babu',
            dob: '09/02/2021',
            gender: 'Female',
            category: '',
            mobile: '76785683786',
            formStatus: 'Not Submitted',
            paymentStatus: 'Unpaid',
            enrolled: true,
            createdAt: '02/02/2026'
        },
        {
            refNo: '810394',
            name: 'Olia Wood',
            class: 'Class 5(A)',
            father: 'SASAS',
            dob: '01/28/2020',
            gender: 'Male',
            category: '',
            mobile: '7890678678',
            formStatus: 'Submitted (01/16/2026)',
            paymentStatus: 'Paid',
            enrolled: false,
            createdAt: '01/16/2026'
        },
        {
            refNo: '959004',
            name: 'Jain',
            class: 'Class 2(A)',
            father: 'DSD',
            dob: '01/06/2026',
            gender: 'Male',
            category: '',
            mobile: '',
            formStatus: 'Submitted (01/16/2026)',
            paymentStatus: 'Paid',
            enrolled: false,
            createdAt: '01/16/2026'
        },
        {
            refNo: '464213',
            name: 'Matthew Bacon',
            class: 'Class 1(A)',
            father: 'Jason',
            dob: '12/31/2018',
            gender: 'Male',
            category: '',
            mobile: '08909789',
            formStatus: 'Not Submitted',
            paymentStatus: 'Unpaid',
            enrolled: true,
            createdAt: '01/02/2026'
        }
    ];

    const handleEdit = (record: AdmissionRecord) => {
        setEditingRecord(record);
        setIsEditing(true);
    };

    const handleView = (record: AdmissionRecord) => {
        setViewingRecord(record);
        setIsViewing(true);
    };

    const handleDelete = (record: AdmissionRecord) => {
        setDeletingRecord(record);
        setIsDeleting(true);
    };

    const handleCloseEdit = () => {
        setIsEditing(false);
        setEditingRecord(null);
    };

    const handleCloseView = () => {
        setIsViewing(false);
        setViewingRecord(null);
    };

    const handleCloseDelete = () => {
        setIsDeleting(false);
        setDeletingRecord(null);
    };

    const confirmDelete = () => {
        alert(`Record for ${deletingRecord?.name} deleted.`);
        handleCloseDelete();
    };

    if (isViewing && viewingRecord) {
        return <ViewOnlineAdmission record={viewingRecord} onClose={handleCloseView} />;
    }

    if (isEditing && editingRecord) {
        return <EditOnlineAdmission record={editingRecord} onClose={handleCloseEdit} />;
    }

    const filteredAdmissions = admissions.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.refNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.mobile.includes(searchTerm) ||
        item.father.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center space-x-3 text-indigo-600">
                        <FileText size={20} />
                        <h1 className="text-xl font-black uppercase tracking-tight text-gray-900">Online Admission List</h1>
                    </div>
                </div>

                <div className="p-6">
                    {/* Toolbar */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div className="relative flex-1 max-w-sm group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={16} />
                            <input
                                type="text"
                                placeholder="Search reference, name or mobile..."
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all font-bold text-gray-900"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-2 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Entries:</span>
                                <div className="relative">
                                    <select
                                        className="bg-transparent text-sm font-bold text-gray-700 focus:outline-none appearance-none pr-6 cursor-pointer"
                                        value={entriesPerPage}
                                        onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                                    >
                                        <option value={50}>50</option>
                                        <option value={100}>100</option>
                                    </select>
                                    <ChevronDown size={14} className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                            
                            <div className="h-8 w-[1px] bg-gray-200 mx-1 hidden md:block"></div>
                            
                            <div className="flex items-center space-x-1">
                                <ExportButton icon={FileSpreadsheet} tooltip="Excel" />
                                <ExportButton icon={FileText} tooltip="PDF" />
                                <ExportButton icon={FileJson} tooltip="CSV" />
                                <ExportButton icon={Printer} tooltip="Print" />
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto rounded-xl border border-gray-100">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100">
                                    <TableHeader label="Reference No" />
                                    <TableHeader label="Student Name" />
                                    <TableHeader label="Class" />
                                    <TableHeader label="Father Name" />
                                    <TableHeader label="Date Of Birth" />
                                    <TableHeader label="Gender" />
                                    <TableHeader label="Form Status" />
                                    <TableHeader label="Payment Status" />
                                    <TableHeader label="Enrolled" align="center" />
                                    <TableHeader label="Action" align="right" />
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filteredAdmissions.map((row) => (
                                    <tr key={row.refNo} className="hover:bg-indigo-50/20 transition-colors group">
                                        <td className="px-5 py-4">
                                            <span className="text-xs font-black text-indigo-600 font-mono tracking-tight">{row.refNo}</span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className="text-xs font-bold text-gray-900 uppercase">{row.name}</span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className="text-xs font-bold text-gray-600">{row.class}</span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className="text-xs font-medium text-gray-500">{row.father}</span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center space-x-2 text-[11px] text-gray-400 font-bold">
                                                <Calendar size={12} />
                                                <span>{row.dob}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${row.gender === 'Male' ? 'bg-blue-50 text-blue-600' : 'bg-rose-50 text-rose-600'}`}>
                                                {row.gender}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4">
                                            {row.formStatus === 'Not Submitted' ? (
                                                <span className="inline-flex items-center px-2.5 py-1 bg-rose-600 text-white rounded text-[10px] font-black uppercase shadow-sm shadow-rose-100">
                                                    Not Submitted
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-2.5 py-1 bg-emerald-600 text-white rounded text-[10px] font-black uppercase shadow-sm shadow-emerald-100">
                                                    {row.formStatus}
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-5 py-4">
                                            {row.paymentStatus === 'Unpaid' ? (
                                                <span className="inline-flex items-center px-2.5 py-1 bg-rose-600 text-white rounded text-[10px] font-black uppercase shadow-sm shadow-rose-100">
                                                    Unpaid
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-2.5 py-1 bg-emerald-600 text-white rounded text-[10px] font-black uppercase shadow-sm shadow-emerald-100">
                                                    Paid
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-5 py-4 text-center">
                                            {row.enrolled ? (
                                                <CheckCircle size={18} className="mx-auto text-emerald-600" />
                                            ) : (
                                                <XCircle size={18} className="mx-auto text-rose-400" />
                                            )}
                                        </td>
                                        <td className="px-5 py-4 text-right">
                                            <div className="flex items-center justify-end space-x-1 transition-opacity">
                                                <ActionButton icon={Printer} color="blue" />
                                                <ActionButton icon={Eye} color="indigo" onClick={() => handleView(row)} />
                                                <ActionButton icon={Edit2} color="amber" onClick={() => handleEdit(row)} />
                                                <ActionButton icon={Trash2} color="rose" onClick={() => handleDelete(row)} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                         <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">Viewing 1 to {filteredAdmissions.length} of {filteredAdmissions.length} registration records</p>
                         <div className="flex space-x-2">
                             <button disabled className="px-4 py-2 border border-gray-100 rounded-xl text-xs font-black text-gray-300 uppercase cursor-not-allowed">Previous</button>
                             <button disabled className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase shadow-lg shadow-indigo-100">1</button>
                             <button disabled className="px-4 py-2 border border-gray-100 rounded-xl text-xs font-black text-gray-300 uppercase cursor-not-allowed">Next</button>
                         </div>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {isDeleting && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" onClick={handleCloseDelete}></div>
                    <div className="bg-white rounded-[2rem] shadow-2xl border border-gray-100 w-full max-w-md relative z-10 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
                        <div className="flex items-center justify-between px-8 pt-8 pb-4">
                            <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl shadow-sm border border-rose-100">
                                <AlertCircle size={28} />
                            </div>
                            <button onClick={handleCloseDelete} className="p-2 hover:bg-gray-100 rounded-xl text-gray-400 transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        
                        <div className="px-8 pb-4 text-center">
                            <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Revoke Registration?</h3>
                            <p className="text-xs font-bold text-gray-500 mt-2">
                                You are about to permanently remove the registration for <span className="text-indigo-600 font-black">{deletingRecord?.name}</span> (Ref: {deletingRecord?.refNo}). This action is irreversible.
                            </p>
                        </div>

                        <div className="px-8 py-8 bg-gray-50/50 flex flex-col space-y-3">
                             <button 
                                onClick={confirmDelete}
                                className="w-full py-3 bg-rose-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-lg shadow-rose-100 hover:bg-rose-700 active:scale-95 transition-all"
                             >
                                Confirm Permanent Deletion
                             </button>
                             <button 
                                onClick={handleCloseDelete}
                                className="w-full py-3 bg-white text-gray-600 border border-gray-200 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-white hover:border-gray-400 active:scale-95 transition-all shadow-sm"
                             >
                                Abort & Keep Record
                             </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

interface TableHeaderProps {
    label: string;
    align?: 'left' | 'center' | 'right';
}

function TableHeader({ label, align = 'left' }: TableHeaderProps) {
    return (
        <th className={`px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.1em] ${align === 'right' ? 'text-right' : align === 'center' ? 'text-center' : 'text-left'}`}>
            <div className={`flex items-center ${align === 'right' ? 'justify-end' : align === 'center' ? 'justify-center' : 'justify-start'} space-x-1 cursor-pointer group`}>
                <span>{label}</span>
                <ArrowUpDown size={10} className="text-transparent group-hover:text-gray-300 transition-colors" />
            </div>
        </th>
    );
}

interface ExportButtonProps {
    icon: LucideIcon;
    tooltip: string;
}

function ExportButton({ icon: Icon, tooltip }: ExportButtonProps) {
    return (
        <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-white rounded-lg shadow-sm border border-transparent hover:border-indigo-100 transition-all active:scale-95" title={tooltip}>
            <Icon size={16} />
        </button>
    );
}

interface ActionButtonProps {
    icon: LucideIcon;
    color: 'indigo' | 'amber' | 'rose' | 'blue';
    onClick?: () => void;
}

function ActionButton({ icon: Icon, color, onClick }: ActionButtonProps) {
    const colors = {
        indigo: 'text-indigo-600 hover:bg-indigo-50 border-indigo-100',
        amber: 'text-amber-600 hover:bg-amber-50 border-amber-100',
        rose: 'text-rose-600 hover:bg-rose-50 border-rose-100',
        blue: 'text-blue-600 hover:bg-blue-50 border-blue-100'
    };
    return (
        <button 
            onClick={onClick}
            className={`p-2 rounded-lg border border-transparent hover:border-current transition-all active:scale-90 ${colors[color]}`}
        >
            <Icon size={14} />
        </button>
    );
}
