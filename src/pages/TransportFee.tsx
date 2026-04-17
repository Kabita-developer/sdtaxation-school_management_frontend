import { useState, useRef, useEffect } from 'react';
import {
    Plus,
    Search,
    Bus,
    User,
    MapPin,
    Calendar,
    MoreVertical,
    Clock,
    AlertCircle,
    Receipt,
    Map,
    Truck,
    Car,
    Navigation,
    DollarSign,
    CreditCard,
    X,
    Edit2,
    Trash2,
    ChevronDown,
    Download,
    Printer,
    FileText,
    Copy,
    Filter,
    AlertTriangle,
    Loader2,
    Check,
    PlusCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useNotification } from '../contexts/NotificationContext';

export default function TransportFee() {
    const navigate = useNavigate();
    const { theme, themeName } = useTheme();
    const { showSuccess, showError } = useNotification();
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<any>(null);
    const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [recordToDelete, setRecordToDelete] = useState<any>(null);

    const [formData, setFormData] = useState({
        studentName: '',
        route: '',
        month: '',
        amount: '',
        status: 'Pending',
        description: ''
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState<number | string>(50);
    const [isRowsOpen, setIsRowsOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [visibleColumns, setVisibleColumns] = useState({
        admissionNo: true,
        student: true,
        class: true,
        fatherName: true,
        dob: true,
        route: true,
        vehicle: true,
        pickupPoint: true,
        action: true
    });

    const [criteria, setCriteria] = useState({
        class: 'Class 1',
        section: 'A'
    });

    const rowsRef = useRef<HTMLDivElement>(null);
    const filterRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (rowsRef.current && !rowsRef.current.contains(event.target as Node)) setIsRowsOpen(false);
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) setIsFilterOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.studentName || !formData.route || !formData.amount) {
            showError('Missing Fields', 'Please fill in all required fields.');
            return;
        }
        
        showSuccess(
            isEditing ? 'Update Successful' : 'Saved!', 
            isEditing ? 'Fee record has been updated successfully.' : 'Fee record has been saved successfully.'
        );
        setIsModalOpen(false);
        setIsEditing(false);
        setFormData({ studentName: '', route: '', month: '', amount: '', status: 'Pending', description: '' });
    };

    const handleDelete = async () => {
        if (!recordToDelete) return;
        setDeleteLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        showSuccess('Deleted!', 'Fee record has been deleted successfully.');
        setDeleteLoading(false);
        setIsDeleting(false);
        setRecordToDelete(null);
    };

    const handleEdit = (r: any) => {
        setFormData({
            studentName: r.student,
            route: r.route,
            month: '', // In a real app we'd have this
            amount: r.amount.toString(),
            status: r.status,
            description: ''
        });
        setIsEditing(true);
        setIsModalOpen(true);
    };


    const handleAssignFees = (student: any) => {
        setSelectedStudent(student);
        setIsAssignModalOpen(true);
        setSelectedMonths(['April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']); // Pre-select some for demo
    };

    const toggleMonth = (month: string) => {
        setSelectedMonths(prev => 
            prev.includes(month) ? prev.filter(m => m !== month) : [...prev, month]
        );
    };

    const toggleAllMonths = (selectAll: boolean) => {
        if (selectAll) {
            setSelectedMonths(['April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March']);
        } else {
            setSelectedMonths([]);
        }
    };

    const records = [
        { id: '002', student: 'Sneha Patel', class: 'Class 1(A)', fatherName: 'Ramesh Patel', dob: '07/15/2016', route: 'High Court', vehicle: 'VH4584', pickup: 'High Court' },
        { id: '003', student: 'Hariom Yadav', class: 'Class 1(A)', fatherName: '', dob: '04/08/2020', route: 'Brooklyn East', vehicle: 'VH1001', pickup: 'Brooklyn North' },
        { id: '1800011', student: 'Edward Thomas', class: 'Class 1(A)', fatherName: 'Olivier Thomas', dob: '04/08/2020', route: 'Brooklyn East', vehicle: 'VH4584', pickup: 'Brooklyn North' },
        { id: 'A003', student: 'Hariom Yadav', class: 'Class 1(A)', fatherName: '', dob: '04/08/2020', route: 'Brooklyn East', vehicle: 'VH4584', pickup: 'Railway Station' },
        { id: 'A004', student: 'Nisha', class: 'Class 1(A)', fatherName: '', dob: '04/15/2026', route: '', vehicle: '', pickup: '' },
        { id: 'A41003', student: 'niya', class: 'Class 1(A)', fatherName: '', dob: '04/22/2026', route: '', vehicle: '', pickup: '' },
    ];

    return (
        <div className="animate-in fade-in slide-in-from-top-4 duration-500 space-y-4 pt-2 text-left relative">




            {/* Select Criteria Section (Based on Image) */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-400 overflow-hidden mb-6">
                <div className="px-6 py-2 border-b border-gray-100 bg-gray-50/10">
                    <h3 className="text-sm font-bold text-gray-700 tracking-tight">Select Criteria</h3>
                </div>
                <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                        <div className="md:col-span-5 space-y-1.5 font-bold">
                            <label className="text-xs font-bold text-gray-700">
                                Class <span className="text-rose-500">*</span>
                            </label>
                            <div className="relative">
                                <select 
                                    className="w-full px-4 py-2 bg-white border border-indigo-500 rounded-lg text-sm font-bold text-gray-700 outline-none ring-2 ring-indigo-500/10 transition-all shadow-sm appearance-none"
                                    value={criteria.class}
                                    onChange={(e) => setCriteria({ ...criteria, class: e.target.value })}
                                >
                                    <option value="Class 1">Class 1</option>
                                    <option value="Class 2">Class 2</option>
                                    <option value="Class 3">Class 3</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                            </div>
                        </div>
                        <div className="md:col-span-5 space-y-1.5 font-bold">
                            <label className="text-xs font-bold text-gray-700">Section</label>
                            <div className="relative">
                                <select 
                                    className="w-full px-4 py-2 bg-white border border-gray-400 rounded-lg text-sm font-bold text-gray-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all shadow-sm appearance-none"
                                    value={criteria.section}
                                    onChange={(e) => setCriteria({ ...criteria, section: e.target.value })}
                                >
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                            </div>
                        </div>
                        <div className="md:col-span-2">
                            <button className="w-full flex items-center justify-center space-x-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all text-sm font-bold shadow-lg shadow-indigo-100 active:scale-95">
                                <Search size={16} />
                                <span>Search</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center space-x-2 px-1">
                <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
                    <Bus size={18} />
                </div>
                <h3 className="text-base font-black text-gray-800 tracking-tight">Student Transport Fees</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mt-2">
                <div className="lg:col-span-12">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-400 overflow-hidden">
                        <div className={`px-8 py-3 border-b border-gray-400 flex flex-wrap items-center justify-between gap-4 bg-indigo-50/50`}>
                            <h2 className="text-sm font-black text-indigo-900 tracking-wider">Transport Fees list</h2>
                            <div className="flex flex-wrap items-center gap-3">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-500" size={14} />
                                    <input
                                        type="text"
                                        placeholder="Quick search..."
                                        className={`pl-9 pr-4 py-2.5 bg-white border border-gray-400 rounded-xl text-xs font-bold text-gray-800 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all w-48 shadow-sm`}
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>

                                {/* Rows Per Page */}
                                <div className="relative" ref={rowsRef}>
                                    <div 
                                        onClick={() => setIsRowsOpen(!isRowsOpen)}
                                        className="flex items-center space-x-2 bg-white border border-gray-400 rounded-xl px-3 py-2.5 shadow-sm cursor-pointer hover:bg-gray-50 transition-all" 
                                        title="Rows Per Page"
                                    >
                                        <span className="text-xs font-bold text-gray-700">{rowsPerPage}</span>
                                        <ChevronDown size={14} className={`text-gray-400 transition-transform ${isRowsOpen ? 'rotate-180' : ''}`} />
                                    </div>
                                    {isRowsOpen && (
                                        <div className="absolute top-full right-0 mt-2 w-20 bg-white border border-gray-400 rounded-xl shadow-xl z-50 py-2 animate-in fade-in zoom-in-95 duration-200">
                                            {[10, 25, 50, 100, 200, 300, 'All'].map(val => (
                                                <div 
                                                    key={val}
                                                    onClick={() => { setRowsPerPage(val); setIsRowsOpen(false); }}
                                                    className={`px-4 py-2 text-xs font-bold cursor-pointer transition-colors ${rowsPerPage === val ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}
                                                >
                                                    {val}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center space-x-1">
                                    <button title="Copy to Clipboard" className="p-2.5 bg-white border border-gray-400 rounded-xl text-gray-600 hover:text-indigo-600 hover:border-indigo-400 transition-all shadow-sm">
                                        <Copy size={14} />
                                    </button>
                                    <button title="Export to Excel" className="p-2.5 bg-white border border-gray-400 rounded-xl text-gray-600 hover:text-emerald-600 hover:border-emerald-400 transition-all shadow-sm">
                                        <FileText size={14} />
                                    </button>
                                    <button title="Export to CSV" className="p-2.5 bg-white border border-gray-400 rounded-xl text-gray-600 hover:text-indigo-600 hover:border-indigo-400 transition-all shadow-sm">
                                        <FileText size={14} className="text-blue-500" />
                                    </button>
                                    <button title="Download PDF" className="p-2.5 bg-white border border-gray-400 rounded-xl text-gray-600 hover:text-rose-600 hover:border-rose-400 transition-all shadow-sm">
                                        <Download size={14} />
                                    </button>
                                    <button title="Print List" className="p-2.5 bg-white border border-gray-400 rounded-xl text-gray-600 hover:text-indigo-600 hover:border-indigo-400 transition-all shadow-sm">
                                        <Printer size={14} />
                                    </button>
                                    
                                    {/* Column Filter */}
                                    <div className="relative" ref={filterRef}>
                                        <button 
                                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                                            title="Filter Columns" 
                                            className="p-2.5 bg-white border border-gray-400 rounded-xl text-gray-600 hover:text-indigo-600 hover:border-indigo-400 transition-all shadow-sm"
                                        >
                                            <Filter size={14} />
                                        </button>
                                        {isFilterOpen && (
                                            <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-400 rounded-xl shadow-xl z-50 py-3 px-4 animate-in fade-in zoom-in-95 duration-200">
                                                <h4 className="text-xs font-bold text-gray-500 mb-3">Visible Columns</h4>
                                                <div className="space-y-2">
                                                    {Object.entries(visibleColumns).map(([key, value]) => (
                                                        <div 
                                                            key={key}
                                                            onClick={() => setVisibleColumns(prev => ({ ...prev, [key]: !value }))}
                                                            className="flex items-center justify-between cursor-pointer group"
                                                        >
                                                            <span className="text-xs font-bold text-black capitalize">{key}</span>
                                                            <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${value ? 'bg-indigo-600' : 'bg-gray-100 group-hover:bg-gray-200'}`}>
                                                                {value && <Check size={12} className="text-white" />}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-gray-50/50 text-sm tracking-tight font-bold">
                                        {[
                                            { label: 'Admission No', key: 'admissionNo' },
                                            { label: 'Student Name', key: 'student' },
                                            { label: 'Class', key: 'class' },
                                            { label: 'Father Name', key: 'fatherName' },
                                            { label: 'Date of Birth', key: 'dob', nowrap: true },
                                            { label: 'Route Title', key: 'route', nowrap: true },
                                            { label: 'Vehicle Number', key: 'vehicle', nowrap: true },
                                            { label: 'Pickup Point', key: 'pickupPoint', nowrap: true }
                                        ].map((col) => (
                                            visibleColumns[col.key as keyof typeof visibleColumns] && (
                                                <th key={col.key} className={`px-6 py-4 font-bold text-gray-900 border-b border-gray-200 border-t border-gray-100 ${col.nowrap ? 'text-nowrap' : ''}`}>
                                                    <div className="flex items-center space-x-1">
                                                        <span>{col.label}</span>
                                                        <div className="flex flex-col -space-y-1 opacity-20">
                                                            <ChevronDown size={10} className="rotate-180" />
                                                            <ChevronDown size={10} />
                                                        </div>
                                                    </div>
                                                </th>
                                            )
                                        ))}
                                        {visibleColumns.action && <th className="px-6 py-4 font-bold text-gray-900 border-b border-gray-200 border-t border-gray-100 text-right pr-12">Action</th>}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {records.filter(r => r.student.toLowerCase().includes(searchTerm.toLowerCase()) || r.route.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, rowsPerPage === 'All' ? undefined : Number(rowsPerPage)).map((r) => (
                                        <tr key={r.id} className="hover:bg-indigo-50/20 transition-all font-medium">
                                            {visibleColumns.admissionNo && (
                                                <td className="px-6 py-4 border-b border-gray-100 whitespace-nowrap text-sm text-gray-800 tracking-tight">
                                                    <span>{r.id}</span>
                                                </td>
                                            )}
                                            {visibleColumns.student && (
                                                <td className="px-6 py-4 border-b border-gray-100 whitespace-nowrap text-sm text-gray-800 tracking-tight">{r.student}</td>
                                            )}
                                            {visibleColumns.class && (
                                                <td className="px-6 py-4 border-b border-gray-100 whitespace-nowrap text-sm text-gray-800 tracking-tight">{r.class}</td>
                                            )}
                                            {visibleColumns.fatherName && (
                                                <td className="px-6 py-4 border-b border-gray-100 whitespace-nowrap text-sm text-gray-800 tracking-tight">{r.fatherName}</td>
                                            )}
                                            {visibleColumns.dob && (
                                                <td className="px-6 py-4 border-b border-gray-100 whitespace-nowrap text-sm text-gray-800 tracking-tight">{r.dob}</td>
                                            )}
                                            {visibleColumns.route && (
                                                <td className="px-6 py-4 border-b border-gray-100 cursor-pointer whitespace-nowrap text-sm text-gray-800 tracking-tight">{r.route}</td>
                                            )}
                                            {visibleColumns.vehicle && (
                                                <td className="px-6 py-4 border-b border-gray-100 whitespace-nowrap text-sm text-gray-800 tracking-tight">
                                                    <span className="border border-gray-300 px-2 py-1 rounded bg-gray-50 uppercase tracking-tighter">{r.vehicle}</span>
                                                </td>
                                            )}
                                            {visibleColumns.pickupPoint && (
                                                <td className="px-6 py-4 border-b border-gray-100 whitespace-nowrap text-sm text-gray-800 tracking-tight">{r.pickup}</td>
                                            )}
                                            {visibleColumns.action && (
                                                <td className="px-6 py-4 border-b border-gray-100 text-right pr-12 text-sm whitespace-nowrap">
                                                    <div className="flex items-center justify-end">
                                                        <button 
                                                            onClick={() => handleAssignFees(r)}
                                                            className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-all shadow-md active:scale-95"
                                                        >
                                                            Assign Fees
                                                        </button>
                                                    </div>
                                                </td>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add/Edit Modal */}
            {isModalOpen && (
                <div 
                    className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 overflow-y-auto"
                    onClick={() => { 
                        setIsModalOpen(false); 
                        setIsEditing(false); 
                        setFormData({ studentName: '', route: '', month: '', amount: '', status: 'Pending', description: '' });
                    }}
                >
                    <div 
                        className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 my-8"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={`px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-indigo-50/50`}>
                            <h3 className="text-lg font-bold text-indigo-900 tracking-tight">
                                {isEditing ? 'Edit Fee Record' : 'Collect Transport Fee'}
                            </h3>
                            <button 
                                onClick={() => { 
                                    setIsModalOpen(false); 
                                    setIsEditing(false); 
                                    setFormData({ studentName: '', route: '', month: '', amount: '', status: 'Pending', description: '' });
                                }}
                                className="text-gray-400 hover:text-rose-500 transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="space-y-1.5 font-bold">
                                <label className="text-sm font-medium text-gray-700">
                                    Student Name <span className="text-rose-500">*</span>
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    <input 
                                        type="text" 
                                        placeholder="Enter student's full name" 
                                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-400 rounded-xl text-sm font-bold text-gray-700 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm" 
                                        value={formData.studentName} 
                                        onChange={(e) => setFormData({ ...formData, studentName: e.target.value })} 
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5 font-bold">
                                <label className="text-sm font-medium text-gray-700">
                                    Route Name <span className="text-rose-500">*</span>
                                </label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    <input 
                                        type="text" 
                                        placeholder="Example: Green Valley - Campus" 
                                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-400 rounded-xl text-sm font-bold text-gray-700 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm" 
                                        value={formData.route} 
                                        onChange={(e) => setFormData({ ...formData, route: e.target.value })} 
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5 font-bold">
                                    <label className="text-sm font-medium text-gray-700">Fee Month</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                        <input 
                                            type="month" 
                                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-400 rounded-xl text-sm font-bold text-gray-700 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm" 
                                            value={formData.month} 
                                            onChange={(e) => setFormData({ ...formData, month: e.target.value })} 
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5 font-bold">
                                    <label className="text-sm font-medium text-gray-700">Amount (₹) <span className="text-rose-500">*</span></label>
                                    <div className="relative">
                                        <Receipt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                        <input 
                                            type="number" 
                                            placeholder="0.00" 
                                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-400 rounded-xl text-sm font-bold text-gray-700 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm" 
                                            value={formData.amount} 
                                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })} 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                            <button 
                                onClick={handleSave}
                                className={`px-8 py-2.5 bg-${theme.colors.primary} text-white rounded-lg text-sm font-bold shadow-lg shadow-indigo-100 hover:opacity-90 active:scale-95 transition-all tracking-tight`}
                            >
                                {isEditing ? 'Update Record' : 'Save Record'}
                            </button>
                        </div>
                    </div>
                </div>
            )}            {/* Assign Fees Modal */}
            {isAssignModalOpen && selectedStudent && (
                <div 
                    className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 overflow-y-auto"
                    onClick={() => setIsAssignModalOpen(false)}
                >
                    <div 
                        className="bg-white w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 my-8"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 flex items-center justify-between font-bold">
                            <h3 className="text-base font-bold text-white tracking-tight">Assign Fees</h3>
                            <button 
                                onClick={() => setIsAssignModalOpen(false)}
                                className="text-white hover:bg-white/20 p-1 rounded-lg transition-all"
                            >
                                <X size={18} strokeWidth={3} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-0 overflow-hidden">
                            {/* Student Details Section */}
                            <div className="p-4 bg-white grid grid-cols-2 gap-x-8 gap-y-1 border-b border-gray-100">
                                <div className="space-y-1">
                                    <div className="flex justify-between border-b border-gray-50 py-0.5">
                                        <span className="text-xs font-bold text-gray-800 opacity-60">Name</span>
                                        <span className="text-xs font-bold text-gray-800">{selectedStudent.student}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-50 py-0.5">
                                        <span className="text-xs font-bold text-gray-800 opacity-60">Father Name</span>
                                        <span className="text-xs font-bold text-gray-800">{selectedStudent.fatherName || 'Ramesh Patel'}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-50 py-0.5">
                                        <span className="text-xs font-bold text-gray-800 opacity-60">Mobile Number</span>
                                        <span className="text-xs font-bold text-gray-800">9876200001</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-50 py-0.5">
                                        <span className="text-xs font-bold text-gray-800 opacity-60">Pickup</span>
                                        <span className="text-xs font-bold text-gray-800">{selectedStudent.pickup}</span>
                                    </div>
                                    <div className="flex justify-between py-0.5">
                                        <span className="text-xs font-bold text-gray-800 opacity-60">Fees (₹)</span>
                                        <span className="text-xs font-bold text-indigo-600">49,000.00</span>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <div className="flex justify-between border-b border-gray-50 py-0.5">
                                        <span className="text-xs font-bold text-gray-800 opacity-60">Class (Section)</span>
                                        <span className="text-xs font-bold text-gray-700">{selectedStudent.class}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-50 py-0.5">
                                        <span className="text-xs font-bold text-gray-800 opacity-60">Admission No</span>
                                        <span className="text-xs font-bold text-gray-700">{selectedStudent.id}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-50 py-0.5">
                                        <span className="text-xs font-bold text-gray-800 opacity-60">Roll Number</span>
                                        <span className="text-xs font-bold text-gray-700">-</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-50 py-0.5">
                                        <span className="text-xs font-bold text-gray-800 opacity-60">Pickup Time</span>
                                        <span className="text-xs font-bold text-gray-700">07:15:00</span>
                                    </div>
                                    <div className="flex justify-between py-0.5">
                                        <span className="text-xs font-bold text-gray-800 opacity-60">Distance (km)</span>
                                        <span className="text-xs font-bold text-gray-700">14.0</span>
                                    </div>
                                </div>
                            </div>

                            {/* Fees Table Section */}
                            <div className="overflow-x-auto max-h-[300px] overflow-y-auto custom-scrollbar">
                                <table className="w-full text-left border-collapse">
                                    <thead className="sticky top-0 z-10 bg-gray-50/80 backdrop-blur-md shadow-sm border-b border-gray-200">
                                        <tr>
                                            <th className="px-5 py-2 text-xs font-bold text-gray-800">
                                                <div className="flex items-center space-x-2">
                                                    <input 
                                                        type="checkbox" 
                                                        className="w-3.5 h-3.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                                        checked={selectedMonths.length === 12}
                                                        onChange={(e) => toggleAllMonths(e.target.checked)}
                                                    />
                                                    <span>Month</span>
                                                </div>
                                            </th>
                                            <th className="px-5 py-2 text-xs font-bold text-gray-800 text-center">Due Date</th>
                                            <th className="px-5 py-2 text-xs font-bold text-gray-800 text-center">Fine Type</th>
                                            <th className="px-5 py-2 text-xs font-bold text-gray-800 text-right pr-8">Amount (₹)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {[
                                            { name: 'April', date: '04/20/2026' },
                                            { name: 'May', date: '05/20/2026' },
                                            { name: 'June', date: '06/20/2026' },
                                            { name: 'July', date: '07/20/2026' },
                                            { name: 'August', date: '08/20/2026' },
                                            { name: 'September', date: '09/20/2026' },
                                            { name: 'October', date: '10/20/2026' },
                                            { name: 'November', date: '11/20/2026' },
                                            { name: 'December', date: '12/20/2026' },
                                            { name: 'January', date: '01/20/2027' },
                                            { name: 'February', date: '02/20/2027' },
                                            { name: 'March', date: '03/20/2027' }
                                        ].map((m) => (
                                            <tr key={m.name} className={`hover:bg-indigo-50/30 transition-colors ${selectedMonths.includes(m.name) ? 'bg-indigo-50/50' : ''}`}>
                                                <td className="px-5 py-1.5">
                                                    <div className="flex items-center space-x-2">
                                                        <input 
                                                            type="checkbox" 
                                                            className="w-3.5 h-3.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                                            checked={selectedMonths.includes(m.name)}
                                                            onChange={() => toggleMonth(m.name)}
                                                        />
                                                        <span className={`text-xs ${selectedMonths.includes(m.name) ? 'font-bold text-indigo-700' : 'font-medium text-gray-800'}`}>{m.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-1.5 text-[11px] text-gray-800 font-bold text-center tracking-tight">{m.date}</td>
                                                <td className="px-5 py-1.5 text-[11px] text-gray-800 font-bold text-center">Fix</td>
                                                <td className="px-5 py-1.5 text-xs text-gray-800 font-black text-right pr-8 tracking-tighter">3,500.00</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex justify-end">
                            <button 
                                onClick={() => {
                                    showSuccess('Success', 'Fees assigned successfully');
                                    setIsAssignModalOpen(false);
                                }}
                                className="px-6 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {isDeleting && (
                <div 
                    className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
                    onClick={() => setIsDeleting(false)}
                >
                    <div 
                        className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4">
                            <div className="flex items-center justify-between font-black">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-white/20 rounded-lg">
                                        <AlertTriangle className="text-white" size={20} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white">Delete Record</h3>
                                </div>
                                <button 
                                    onClick={() => setIsDeleting(false)}
                                    className="text-white hover:bg-white/20 rounded-lg p-1 transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0">
                                    <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                                        <AlertTriangle className="text-red-600" size={24} />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-[17px] font-bold text-gray-900 mb-2 leading-tight">
                                        Are you sure you want to delete this fee record?
                                    </h4>
                                    {recordToDelete && (
                                        <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-400 font-bold">
                                            <p className="text-sm text-gray-600 mb-0.5">
                                                <span className="font-bold text-gray-800 text-[10px] block opacity-50">Student Name</span> 
                                                <span className="text-gray-900">{recordToDelete.student}</span>
                                            </p>
                                        </div>
                                    )}
                                    <p className="text-xs font-semibold text-gray-500 leading-relaxed opacity-70">
                                        This action cannot be undone. All associated data will be removed.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-end space-x-3">
                            <button
                                onClick={() => setIsDeleting(false)}
                                className="px-6 py-2 text-sm font-black text-gray-700 bg-white border border-gray-400 rounded-lg hover:bg-gray-50 transition-all shadow-sm"
                                disabled={deleteLoading}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-6 py-2 text-sm font-black text-white bg-gradient-to-r from-red-600 to-red-700 rounded-lg hover:from-red-700 hover:to-red-800 transition-all shadow-md items-center space-x-2 flex"
                                disabled={deleteLoading}
                            >
                                {deleteLoading ? (
                                    <>
                                        <Loader2 size={16} className="animate-spin" />
                                        <span>Deleting...</span>
                                    </>
                                ) : (
                                    <>
                                        <Trash2 size={16} />
                                        <span>Delete</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
