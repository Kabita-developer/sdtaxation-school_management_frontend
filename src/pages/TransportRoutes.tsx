import { useState, useRef, useEffect } from 'react';
import {
    Search,
    Map,
    Edit2,
    X,
    FileSpreadsheet,
    FileText,
    FileCode,
    Printer,
    ChevronDown,
    Plus,
    Download,
    Copy,
    Filter,
    Layers,
    AlertTriangle,
    Loader2,
    Check,
    Navigation,
    Locate,
    Trash2
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useNotification } from '../contexts/NotificationContext';

const TransportRoutes = () => {
    const { theme, themeName } = useTheme();
    const { showSuccess, showError } = useNotification();
    
    const [searchTerm, setSearchTerm] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState<number | string>(50);
    const [isAddingRoute, setIsAddingRoute] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [routeToDelete, setRouteToDelete] = useState<any>(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const [formData, setFormData] = useState({ routeTitle: '' });

    // Dropdown States
    const [isRowsOpen, setIsRowsOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [visibleColumns, setVisibleColumns] = useState({
        routeTitle: true,
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

    const routes = [
        { id: 1, title: 'Brooklyn Central' },
        { id: 2, title: 'Brooklyn East' },
        { id: 3, title: 'Brooklyn West' },
        { id: 4, title: 'Brooklyn South' },
        { id: 5, title: 'Brooklyn North' },
        { id: 6, title: 'Railway station' },
        { id: 7, title: 'High Court' },
        { id: 8, title: 'Vijay Nagar' },
        { id: 9, title: 'Civil Line' },
        { id: 10, title: 'Dindayal Chowk' },
    ];

    const handleSave = () => {
        if (!formData.routeTitle) {
            showError('Missing Fields', 'Please enter a route title.');
            return;
        }
        
        showSuccess(
            isEditing ? 'Update Successful' : 'Saved!', 
            isEditing ? 'Route has been updated successfully.' : 'New route has been created successfully.'
        );
        setIsAddingRoute(false);
        setIsEditing(false);
        setFormData({ routeTitle: '' });
    };

    const handleDelete = async () => {
        if (!routeToDelete) return;
        
        setDeleteLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        showSuccess('Deleted!', 'Route has been removed from the registry.');
        setDeleteLoading(false);
        setIsDeleting(false);
        setRouteToDelete(null);
    };

    const handleEdit = (route: any) => {
        setFormData({
            routeTitle: route.title
        });
        setIsEditing(true);
        setIsAddingRoute(false);
    };

    return (
        <>
            <style>
                {`
                    @media print {
                        @page {
                            margin: 15mm;
                            size: portrait;
                        }
                        * {
                            animation: none !important;
                            transition: none !important;
                            -webkit-print-color-adjust: exact !important;
                            print-color-adjust: exact !important;
                        }
                        body {
                            margin: 0 !important;
                            visibility: hidden !important;
                            background: white !important;
                        }
                        #print-section {
                            visibility: visible !important;
                            position: absolute !important;
                            left: 0 !important;
                            top: 0 !important;
                            width: 100% !important;
                        }
                        #print-section, #print-section * {
                            visibility: visible !important;
                            color: black !important;
                        }
                        #print-section > div {
                            border: none !important;
                            box-shadow: none !important;
                        }
                        .print-hide {
                            display: none !important;
                        }
                    }
                `}
            </style>

            {/* Add/Edit Route Modal */}
            {(isAddingRoute || isEditing) && (
                <div 
                    className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 overflow-y-auto"
                    onClick={() => { 
                        setIsAddingRoute(false); 
                        setIsEditing(false); 
                        setFormData({ routeTitle: '' });
                    }}
                >
                    <div 
                        className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 my-8"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={`px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-indigo-50/50`}>
                            <h3 className="text-lg font-bold text-indigo-900 tracking-tight">
                                {isEditing ? 'Edit Route' : 'Add New Route'}
                            </h3>
                            <button 
                                onClick={() => { 
                                    setIsAddingRoute(false); 
                                    setIsEditing(false); 
                                    setFormData({ routeTitle: '' });
                                }}
                                className="text-gray-400 hover:text-rose-500 transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="space-y-1.5 font-bold">
                                <label className="text-sm font-medium text-gray-700 font-bold">
                                    Route Title <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Route Title"
                                    className="w-full px-4 py-2.5 bg-white border border-gray-400 rounded-xl text-sm font-bold text-gray-700 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm font-bold"
                                    value={formData.routeTitle}
                                    onChange={(e) => setFormData({ ...formData, routeTitle: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                            <button 
                                onClick={handleSave}
                                className={`px-8 py-2.5 ${themeName === 'white' ? 'bg-black' : `bg-${theme.colors.primary}`} text-white rounded-lg text-sm font-bold shadow-lg shadow-indigo-100 hover:opacity-90 active:scale-95 transition-all tracking-tight`}
                            >
                                {isEditing ? 'Update Route' : 'Save Route'}
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
                                    <h3 className="text-xl font-bold text-white tracking-tight">Delete Route</h3>
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
                                        Are you sure you want to delete this route?
                                    </h4>
                                    {routeToDelete && (
                                        <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-400 font-bold">
                                            <p className="text-sm text-gray-600 mb-0.5">
                                                <span className="font-bold text-gray-800 text-[10px] block opacity-50 tracking-widest">Route Title</span> 
                                                <span className="text-gray-900">{routeToDelete.title}</span>
                                            </p>
                                        </div>
                                    )}
                                    <p className="text-xs font-semibold text-gray-500 leading-relaxed opacity-70 italic">
                                        This action cannot be undone. All transit data for this route will be removed.
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

            <div className="animate-in fade-in slide-in-from-top-4 duration-500 space-y-4 pt-2 text-left relative">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className={`p-2 bg-indigo-50 text-indigo-600 rounded-lg`}>
                            <Map size={20} />
                        </div>
                        <h2 className="text-lg font-bold text-gray-800 tracking-tight">Transport Route Registry</h2>
                    </div>
                    <button 
                        onClick={() => {
                            setIsAddingRoute(!isAddingRoute);
                            setIsEditing(false);
                            setFormData({ routeTitle: '' });
                        }}
                        className={`p-2.5 rounded-xl border transition-all flex items-center space-x-2 shadow-sm ${
                            isAddingRoute 
                            ? 'bg-rose-50 border-rose-200 text-rose-600' 
                            : (themeName === 'white' ? 'bg-white border-gray-400 text-black hover:border-black' : `bg-${theme.colors.primary} border-${theme.colors.primary} text-white hover:opacity-90`)
                        }`}
                        title={isAddingRoute ? 'Cancel Operation' : 'Add New Route'}
                    >
                        {isAddingRoute ? <X size={18} /> : <Plus size={18} />}
                        <span className="text-xs font-bold tracking-tight">{isAddingRoute ? 'Cancel' : 'Add Route'}</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mt-4">
                    <div className="lg:col-span-12">
                        <div id="print-section">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-400 overflow-hidden mt-2">
                                <div className={`px-8 py-3 border-b border-gray-400 flex flex-wrap items-center justify-between gap-4 bg-indigo-50/50`}>
                                    <h2 className="text-sm font-black text-indigo-900 tracking-wider">Route List</h2>
                                    <div className="flex flex-wrap items-center gap-3 print-hide">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-500" size={14} />
                                            <input
                                                type="text"
                                                placeholder="Quick record search..."
                                                className={`pl-9 pr-4 py-2.5 bg-white border border-gray-400 rounded-xl text-xs font-bold text-gray-800 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all w-48 shadow-sm font-bold`}
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
                                            <button title="Copy" className="p-2.5 bg-white border border-gray-400 rounded-xl text-gray-600 hover:text-indigo-600 hover:border-indigo-400 transition-all shadow-sm">
                                                <Copy size={14} />
                                            </button>
                                            <button title="Excel" className="p-2.5 bg-white border border-gray-400 rounded-xl text-gray-600 hover:text-emerald-600 hover:border-emerald-400 transition-all shadow-sm">
                                                <FileSpreadsheet size={14} />
                                            </button>
                                            <button title="CSV" className="p-2.5 bg-white border border-gray-400 rounded-xl text-gray-600 hover:text-indigo-600 hover:border-indigo-400 transition-all shadow-sm">
                                                <FileText size={14} className="text-blue-500" />
                                            </button>
                                            <button title="PDF" className="p-2.5 bg-white border border-gray-400 rounded-xl text-gray-600 hover:text-rose-600 hover:border-rose-400 transition-all shadow-sm">
                                                <Download size={14} />
                                            </button>
                                            <button 
                                                onClick={() => window.print()}
                                                title="Print List" 
                                                className="p-2.5 bg-white border border-gray-400 rounded-xl text-gray-600 hover:text-indigo-600 hover:border-indigo-400 transition-all shadow-sm"
                                            >
                                                <Printer size={14} />
                                            </button>
                                            
                                            <div className="relative" ref={filterRef}>
                                                <button 
                                                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                                                    title="Columns" 
                                                    className="p-2.5 bg-white border border-gray-400 rounded-xl text-gray-600 hover:text-indigo-600 hover:border-indigo-400 transition-all shadow-sm"
                                                >
                                                    <Filter size={14} />
                                                </button>
                                                {isFilterOpen && (
                                                    <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-400 rounded-xl shadow-xl z-50 py-3 px-4 animate-in fade-in zoom-in-95 duration-200">
                                                        <h4 className="text-xs font-bold text-gray-500 mb-3 tracking-wider">Visible Columns</h4>
                                                        <div className="space-y-2">
                                                            {Object.entries(visibleColumns).map(([key, value]) => (
                                                                <div 
                                                                    key={key}
                                                                    onClick={() => setVisibleColumns(prev => ({ ...prev, [key]: !value }))}
                                                                    className="flex items-center justify-between cursor-pointer group"
                                                                >
                                                                    <span className="text-xs font-bold text-gray-700 capitalize">{key}</span>
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
                                        <thead className="sticky top-0 z-10">
                                            <tr className="bg-gray-50/50">
                                                {visibleColumns.routeTitle && <th className="px-8 py-4 text-sm font-bold text-gray-900 border-b border-gray-400 border-t border-gray-100 tracking-tight">Route Title</th>}
                                                {visibleColumns.action && <th className="px-8 py-4 text-sm font-bold text-gray-900 border-b border-gray-400 border-t border-gray-100 text-right pr-12 print-hide tracking-tight">Action</th>}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100 font-bold">
                                            {routes.filter(r => r.title.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, rowsPerPage === 'All' ? undefined : Number(rowsPerPage)).map((route) => (
                                                <tr key={route.id} className="hover:bg-indigo-50/20 transition-all group">
                                                    {visibleColumns.routeTitle && (
                                                        <td className="px-8 py-6 border-b-2 border-gray-200 align-middle">
                                                            <div className="flex items-center space-x-3">
                                                                <span className="text-sm font-bold text-gray-800 tracking-tight">{route.title}</span>
                                                            </div>
                                                        </td>
                                                    )}
                                                    {visibleColumns.action && (
                                                        <td className="px-8 py-6 border-b-2 border-gray-200 text-right pr-12 align-middle print-hide">
                                                            <div className="flex items-center justify-end space-x-2">
                                                                <button 
                                                                    title="Edit"
                                                                    onClick={() => handleEdit(route)}
                                                                    className={`p-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-all shadow-sm`}
                                                                >
                                                                    <Edit2 size={16} />
                                                                </button>
                                                                <button 
                                                                    title="Delete"
                                                                    onClick={() => {
                                                                        setRouteToDelete(route);
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
            </div>
        </>
    );
};

export default TransportRoutes;
