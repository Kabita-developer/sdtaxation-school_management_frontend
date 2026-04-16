import { useState, useRef, useEffect } from 'react';
import {
    Plus,
    Search,
    HandCoins,
    Edit2,
    Trash2,
    ChevronDown,
    Download,
    Printer,
    FileText,
    Copy,
    Filter,
    Check,
    X,
    AlertTriangle,
    Loader2
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useNotification } from '../contexts/NotificationContext';

export default function FeesType() {
    const { theme, themeName } = useTheme();
    const { showSuccess, showError } = useNotification();
    
    const [formData, setFormData] = useState({
        typeName: '',
        feeCode: '',
        description: ''
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState<number | string>(50);
    const [isAddingType, setIsAddingType] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [typeToDelete, setTypeToDelete] = useState<any>(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    // Dropdown States
    const [isRowsOpen, setIsRowsOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [visibleColumns, setVisibleColumns] = useState({
        name: true,
        code: true,
        action: true
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

    const feeTypes = [
        { id: 1, name: 'Monthly Tuition', code: 'TUIT-01' },
        { id: 2, name: 'Term Exam Fee', code: 'EXAM-02' },
        { id: 3, name: 'Bus Service Fee', code: 'TRAN-03' },
        { id: 4, name: 'Hostel Room Rent', code: 'HOST-04' },
        { id: 5, name: 'Registration Fee', code: 'ADMS-05' },
    ];

    const feeGroups = ['Tuition Fees', 'Examination Fees', 'Transport Fees', 'Hostel Fees', 'Admission Fees'];

    const handleSave = () => {
        if (!formData.typeName || !formData.feeCode) {
            showError('Missing Fields', 'Please fill in fee type name and code.');
            return;
        }
        
        showSuccess(
            isEditing ? 'Update Successful' : 'Saved!', 
            isEditing ? 'Fee type has been updated successfully.' : 'Fee type has been saved successfully.'
        );
        setIsAddingType(false);
        setIsEditing(false);
        setFormData({ typeName: '', feeCode: '', description: '' });
    };

    const handleDelete = async () => {
        if (!typeToDelete) return;
        
        setDeleteLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        showSuccess('Deleted!', 'Fee type has been deleted successfully.');
        setDeleteLoading(false);
        setIsDeleting(false);
        setTypeToDelete(null);
    };

    const handleEdit = (type: any) => {
        setFormData({
            typeName: type.name,
            feeCode: type.code,
            description: type.description || ''
        });
        setIsEditing(true);
        setIsAddingType(false);
    };

    return (
        <>
            {/* Add/Edit Type Modal */}
            {(isAddingType || isEditing) && (
                <div 
                    className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 overflow-y-auto"
                    onClick={() => { 
                        setIsAddingType(false); 
                        setIsEditing(false); 
                        setFormData({ typeName: '', feeCode: '', description: '' });
                    }}
                >
                    <div 
                        className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 my-8 font-bold"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-indigo-50/50">
                            <h3 className="text-lg font-bold text-indigo-900 tracking-tight">
                                {isEditing ? 'Edit Fees Type' : 'Add New Fees Type'}
                            </h3>
                            <button 
                                onClick={() => { 
                                    setIsAddingType(false); 
                                    setIsEditing(false); 
                                    setFormData({ typeName: '', feeCode: '', description: '' });
                                }}
                                className="text-gray-400 hover:text-rose-500 transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-6 space-y-6 text-left">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-gray-700">
                                    Fees Type Name <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Ex: Monthly Lab Fee"
                                    className="w-full px-4 py-2.5 bg-white border border-gray-400 rounded-xl text-sm font-bold text-gray-700 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm"
                                    value={formData.typeName}
                                    onChange={(e) => setFormData({ ...formData, typeName: e.target.value })}
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-gray-700">
                                    Fees Code <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Ex: LAB-01"
                                    className="w-full px-4 py-2.5 bg-white border border-gray-400 rounded-xl text-sm font-bold text-gray-700 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm"
                                    value={formData.feeCode}
                                    onChange={(e) => setFormData({ ...formData, feeCode: e.target.value })}
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <textarea
                                    className="w-full px-4 py-2.5 bg-white border border-gray-400 rounded-xl text-sm font-bold text-gray-700 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm min-h-[100px] resize-none"
                                    placeholder="Enter additional details about this fee type..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                            <button 
                                onClick={handleSave}
                                className={`px-8 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all tracking-tight font-bold`}
                            >
                                {isEditing ? 'Update Type' : 'Save Type'}
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
                        <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4 text-left">
                            <div className="flex items-center justify-between font-black">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-white/20 rounded-lg">
                                        <AlertTriangle className="text-white" size={20} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white">Delete Fees Type</h3>
                                </div>
                                <button 
                                    onClick={() => setIsDeleting(false)}
                                    className="text-white hover:bg-white/20 rounded-lg p-1 transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>
                        </div>

                        <div className="p-6 text-left">
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0">
                                    <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                                        <AlertTriangle className="text-red-600" size={24} />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-[17px] font-bold text-gray-900 mb-2 leading-tight">
                                        Are you sure you want to delete this fees type?
                                    </h4>
                                    {typeToDelete && (
                                        <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-400 font-bold">
                                            <p className="text-sm text-gray-600 mb-0.5">
                                                <span className="font-bold text-gray-800 text-[10px] block opacity-50">Type Name</span> 
                                                <span className="text-gray-900">{typeToDelete.name}</span>
                                            </p>
                                        </div>
                                    )}
                                    <p className="text-xs font-semibold text-gray-500 leading-relaxed opacity-70">
                                        This action cannot be undone. Student ledgers referencing this type will be maintained.
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
                                className="px-6 py-2 text-sm font-black text-white bg-gradient-to-r from-red-600 to-red-700 rounded-lg hover:from-red-700 hover:to-red-800 transition-all shadow-md items-center space-x-2 flex font-bold"
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

            <div className="animate-in fade-in slide-in-from-top-4 duration-500 space-y-4 pt-2 text-left relative">
                <div className="flex items-center justify-between font-bold">
                    <div className="flex items-center space-x-3">
                        <div className={`p-2 bg-indigo-50 text-indigo-600 rounded-lg`}>
                            <HandCoins size={20} />
                        </div>
                        <h2 className="text-lg font-bold text-gray-800 tracking-tight">Fees Type Categorization</h2>
                    </div>
                    <button 
                        onClick={() => {
                            setIsAddingType(!isAddingType);
                            setIsEditing(false);
                            setFormData({ typeName: '', feeCode: '', description: '' });
                        }}
                        className={`p-2.5 rounded-xl border transition-all flex items-center space-x-2 shadow-sm ${
                            isAddingType 
                            ? 'bg-rose-50 border-rose-200 text-rose-600' 
                            : (themeName === 'white' ? 'bg-white border-gray-400 text-black hover:border-black' : `bg-indigo-600 border-indigo-600 text-white hover:bg-indigo-700`)
                        }`}
                    >
                        {isAddingType ? <X size={18} /> : <Plus size={18} />}
                        <span className="text-xs font-bold">{isAddingType ? 'Cancel' : 'Add Type'}</span>
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-400 overflow-hidden mt-4">
                    <div className="px-8 py-3 border-b border-gray-400 flex flex-wrap items-center justify-between gap-4 bg-indigo-50/50">
                        <h2 className="text-sm font-black text-indigo-900 tracking-wider">Fees Type Registry</h2>
                        <div className="flex flex-wrap items-center gap-3">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-500" size={14} />
                                <input
                                    type="text"
                                    placeholder="Quick record search..."
                                    className="pl-9 pr-4 py-2.5 bg-white border border-gray-400 rounded-xl text-xs font-bold text-gray-800 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all w-48 shadow-sm font-bold"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            <div className="relative" ref={rowsRef}>
                                <div 
                                    onClick={() => setIsRowsOpen(!isRowsOpen)}
                                    className="flex items-center space-x-2 bg-white border border-gray-400 rounded-xl px-3 py-2.5 shadow-sm cursor-pointer hover:bg-gray-50 transition-all font-bold text-gray-700"
                                >
                                    <span className="text-xs">{rowsPerPage}</span>
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
                                <button title="Copy" className="p-2.5 bg-white border border-gray-400 rounded-xl text-gray-600 hover:text-indigo-600 hover:border-indigo-400 transition-all shadow-sm"><Copy size={14} /></button>
                                <button title="Excel" className="p-2.5 bg-white border border-gray-400 rounded-xl text-gray-600 hover:text-emerald-600 hover:border-emerald-400 transition-all shadow-sm"><FileText size={14} /></button>
                                <button title="PDF" className="p-2.5 bg-white border border-gray-400 rounded-xl text-gray-600 hover:text-rose-600 hover:border-rose-400 transition-all shadow-sm"><Download size={14} /></button>
                                <button title="Print" className="p-2.5 bg-white border border-gray-400 rounded-xl text-gray-600 hover:text-indigo-600 hover:border-indigo-400 transition-all shadow-sm"><Printer size={14} /></button>
                                
                                <div className="relative" ref={filterRef}>
                                    <button 
                                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                                        title="Filter Visibility" 
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
                        <table className="w-full text-left font-bold">
                            <thead>
                                <tr className="bg-gray-50/50">
                                    {visibleColumns.name && <th className="px-8 py-4 text-sm font-bold text-gray-900 border-b border-gray-200">Fees Type Name</th>}
                                    {visibleColumns.code && <th className="px-8 py-4 text-sm font-bold text-gray-900 border-b border-gray-200">Fees Code</th>}
                                    {visibleColumns.action && <th className="px-8 py-4 text-sm font-bold text-gray-900 border-b border-gray-200 text-right pr-12">Action</th>}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {feeTypes.filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, rowsPerPage === 'All' ? undefined : Number(rowsPerPage)).map((t) => (
                                    <tr key={t.id} className="hover:bg-indigo-50/30 transition-all">
                                        {visibleColumns.name && (
                                            <td className="px-8 py-6 border-b border-gray-100 align-middle">
                                                <span className="text-sm font-bold text-gray-800 tracking-tight">{t.name}</span>
                                            </td>
                                        )}
                                        {visibleColumns.code && (
                                            <td className="px-8 py-6 border-b border-gray-100 align-middle">
                                                <span className="text-sm font-bold text-gray-800">{t.code}</span>
                                            </td>
                                        )}
                                        {visibleColumns.action && (
                                            <td className="px-8 py-6 border-b border-gray-100 text-right pr-12 align-middle">
                                                <div className="flex items-center justify-end space-x-2">
                                                    <button 
                                                        onClick={() => handleEdit(t)}
                                                        className="p-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-all shadow-sm"
                                                    >
                                                        <Edit2 size={16} />
                                                    </button>
                                                    <button 
                                                        onClick={() => {
                                                            setTypeToDelete(t);
                                                            setIsDeleting(true);
                                                        }}
                                                        className="p-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg transition-all shadow-sm"
                                                    >
                                                        <Trash2 size={16} />
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
        </>
    );
}
