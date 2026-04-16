import { useState, useRef, useEffect } from 'react';
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    ChevronDown,
    Download,
    Printer,
    FileText,
    Copy,
    X,
    Filter,
    Layers,
    AlertTriangle,
    Loader2,
    Check,
    Users,
    SplitSquareVertical
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useNotification } from '../contexts/NotificationContext';

export default function SectionCreate() {
    const { theme, themeName } = useTheme();
    const { showSuccess, showError } = useNotification();
    
    const [formData, setFormData] = useState({
        sectionName: '',
        capacity: ''
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState<number | string>(50);
    const [isAddingSection, setIsAddingSection] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [sectionToDelete, setSectionToDelete] = useState<any>(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    // Dropdown States
    const [isRowsOpen, setIsRowsOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [visibleColumns, setVisibleColumns] = useState({
        name: true,
        capacity: true,
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

    const sections = [
        { id: '1', name: 'A', capacity: 45 },
        { id: '2', name: 'B', capacity: 40 },
        { id: '3', name: 'C', capacity: 42 },
        { id: '4', name: 'D', capacity: 38 },
        { id: '5', name: 'E', capacity: 40 },
    ];

    const handleSave = () => {
        if (!formData.sectionName || !formData.capacity) {
            showError('Missing Fields', 'Please fill in section name and student capacity.');
            return;
        }
        
        showSuccess(
            isEditing ? 'Update Successful' : 'Saved!', 
            isEditing ? 'Section has been updated successfully.' : 'Section has been added successfully.'
        );
        setIsAddingSection(false);
        setIsEditing(false);
        setFormData({ sectionName: '', capacity: '' });
    };

    const handleDelete = async () => {
        if (!sectionToDelete) return;
        
        setDeleteLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        showSuccess('Deleted!', 'Section has been deleted successfully.');
        setDeleteLoading(false);
        setIsDeleting(false);
        setSectionToDelete(null);
    };

    const handleEdit = (s: any) => {
        setFormData({
            sectionName: s.name,
            capacity: s.capacity.toString()
        });
        setIsEditing(true);
        setIsAddingSection(false);
    };

    return (
        <>
            {/* Add/Edit Section Modal */}
            {(isAddingSection || isEditing) && (
                <div 
                    className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 overflow-y-auto"
                    onClick={() => { 
                        setIsAddingSection(false); 
                        setIsEditing(false); 
                        setFormData({ sectionName: '', capacity: '' });
                    }}
                >
                    <div 
                        className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 my-8"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className={`px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-indigo-50/50`}>
                            <h3 className="text-lg font-bold text-indigo-900 tracking-tight">
                                {isEditing ? 'Edit Section' : 'Add New Section'}
                            </h3>
                            <button 
                                onClick={() => { 
                                    setIsAddingSection(false); 
                                    setIsEditing(false); 
                                    setFormData({ sectionName: '', capacity: '' });
                                }}
                                className="text-gray-400 hover:text-rose-500 transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 space-y-6">
                            {/* Section Name Input */}
                            <div className="space-y-1.5 font-bold">
                                <label className="text-sm font-medium text-gray-700">
                                    Section Name <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Section Name"
                                    className="w-full px-4 py-2.5 bg-white border border-gray-400 rounded-xl text-sm font-bold text-gray-700 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm"
                                    value={formData.sectionName}
                                    onChange={(e) => setFormData({ ...formData, sectionName: e.target.value })}
                                />
                            </div>

                            {/* Capacity Input */}
                            <div className="space-y-1.5 font-bold">
                                <label className="text-sm font-medium text-gray-700">
                                    Student Capacity <span className="text-rose-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        placeholder="Max Students"
                                        className="w-full px-4 py-2.5 bg-white border border-gray-400 rounded-xl text-sm font-bold text-gray-700 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm"
                                        value={formData.capacity}
                                        onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                                    />
                                    <Users className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                            <button 
                                onClick={handleSave}
                                className={`px-8 py-2.5 bg-${theme.colors.primary} text-white rounded-lg text-sm font-bold shadow-lg shadow-indigo-100 hover:opacity-90 active:scale-95 transition-all tracking-tight`}
                            >
                                {isEditing ? 'Update Section' : 'Save Section'}
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
                        {/* Header */}
                        <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4">
                            <div className="flex items-center justify-between font-black">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-white/20 rounded-lg">
                                        <AlertTriangle className="text-white" size={20} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white">Delete Section</h3>
                                </div>
                                <button 
                                    onClick={() => setIsDeleting(false)}
                                    className="text-white hover:bg-white/20 rounded-lg p-1 transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="p-6">
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0">
                                    <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                                        <AlertTriangle className="text-red-600" size={24} />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-[17px] font-bold text-gray-900 mb-2 leading-tight">
                                        Are you sure you want to delete this section?
                                    </h4>
                                    {sectionToDelete && (
                                        <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-400 font-bold">
                                            <p className="text-sm text-gray-600 mb-0.5">
                                                <span className="font-bold text-gray-800 text-[10px] block opacity-50">Section Name</span> 
                                                <span className="text-gray-900">{sectionToDelete.name}</span>
                                            </p>
                                        </div>
                                    )}
                                    <p className="text-xs font-semibold text-gray-500 leading-relaxed opacity-70">
                                        This action cannot be undone. All associated data will be removed.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
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

            <div className="animate-in fade-in slide-in-from-top-4 duration-500 space-y-4 pt-2 text-left relative">
                {/* Header & Title */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className={`p-2 bg-${theme.colors.primaryLight} text-${theme.colors.primary} rounded-lg`}>
                            <SplitSquareVertical size={20} />
                        </div>
                        <h2 className="text-lg font-bold text-gray-800">Section Configuration Registry</h2>
                    </div>
                    <button 
                        onClick={() => {
                            setIsAddingSection(!isAddingSection);
                            setIsEditing(false);
                            setFormData({ sectionName: '', capacity: '' });
                        }}
                        className={`p-2.5 rounded-xl border transition-all flex items-center space-x-2 shadow-sm ${
                            isAddingSection 
                            ? 'bg-rose-50 border-rose-200 text-rose-600' 
                            : (themeName === 'white' ? 'bg-white border-gray-400 text-black hover:border-black' : `bg-${theme.colors.primary} border-${theme.colors.primary} text-white hover:bg-${theme.colors.primaryDark}`)
                        }`}
                        title={isAddingSection ? 'Cancel Operation' : 'Add New Section'}
                    >
                        {isAddingSection ? <X size={18} /> : <Plus size={18} />}
                        <span className="text-xs font-bold">{isAddingSection ? 'Cancel' : 'Add Section'}</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mt-4">
                    <div className="lg:col-span-12">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-400 overflow-hidden">
                            <div className={`px-8 py-3 border-b border-gray-400 flex flex-wrap items-center justify-between gap-4 bg-indigo-50/50`}>
                                <h2 className="text-sm font-black text-indigo-900 tracking-wider">Section List</h2>
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

                                    {/* Workable Rows Per Page */}
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
                                        <tr className="bg-gray-50/50">
                                            {visibleColumns.name && <th className="px-8 py-4 text-sm font-bold text-gray-900 border-b border-gray-200 border-t border-gray-100">Section</th>}
                                            {visibleColumns.capacity && <th className="px-8 py-4 text-sm font-bold text-gray-900 border-b border-gray-200 border-t border-gray-100">Capacity</th>}
                                            {visibleColumns.action && <th className="px-8 py-4 text-sm font-bold text-gray-900 border-b border-gray-200 border-t border-gray-100 text-right pr-12">Action</th>}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 font-bold">
                                        {sections.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, rowsPerPage === 'All' ? undefined : Number(rowsPerPage)).map((s) => (
                                            <tr key={s.id} className="hover:bg-indigo-50/30 transition-all">
                                                {visibleColumns.name && (
                                                    <td className="px-8 py-6 border-b-2 border-gray-200 align-middle">
                                                        <span className="text-sm font-bold text-gray-800">{s.name}</span>
                                                    </td>
                                                )}
                                                {visibleColumns.capacity && (
                                                    <td className="px-8 py-6 border-b-2 border-gray-200 align-middle">
                                                        <div className="flex items-center gap-2">
                                                            <div className="flex-1 h-1.5 w-12 bg-gray-100 rounded-full overflow-hidden">
                                                                <div className="h-full bg-indigo-500 rounded-full" style={{ width: '70%' }}></div>
                                                            </div>
                                                            <span className="text-sm font-bold text-gray-800">{s.capacity}</span>
                                                        </div>
                                                    </td>
                                                )}
                                                {visibleColumns.action && (
                                                    <td className="px-8 py-6 border-b-2 border-gray-200 text-right pr-12 align-middle">
                                                        <div className="flex items-center justify-end space-x-2">
                                                            <button 
                                                                title="Edit Section"
                                                                onClick={() => handleEdit(s)}
                                                                className={`p-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-all shadow-sm`}
                                                            >
                                                                <Edit2 size={16} />
                                                            </button>
                                                            <button 
                                                                title="Delete Section"
                                                                onClick={() => {
                                                                    setSectionToDelete(s);
                                                                    setIsDeleting(true);
                                                                }}
                                                                className={`p-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg transition-all shadow-sm`}
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
                </div>
            </div>
        </>
    );
}
