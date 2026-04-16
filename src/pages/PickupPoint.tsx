import { useState, useRef, useEffect } from 'react';
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
    Trash2,
    Download,
    Copy,
    Filter,
    Layers,
    AlertTriangle,
    Loader2,
    Check,
    MapPinned
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useNotification } from '../contexts/NotificationContext';

const PickupPoint = () => {
    const { theme, themeName } = useTheme();
    const { showSuccess, showError } = useNotification();
    
    const [searchTerm, setSearchTerm] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState<number | string>(50);
    const [isAddingPoint, setIsAddingPoint] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [pointToDelete, setPointToDelete] = useState<any>(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const [formData, setFormData] = useState({ name: '', lat: '', lng: '' });
    const [isMapOpen, setIsMapOpen] = useState(false);
    const [selectedPoint, setSelectedPoint] = useState<any>(null);

    // Dropdown States
    const [isRowsOpen, setIsRowsOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [visibleColumns, setVisibleColumns] = useState({
        name: true,
        latitude: true,
        longitude: true,
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

    const handleSave = () => {
        if (!formData.name || !formData.lat || !formData.lng) {
            showError('Missing Fields', 'Please fill in all required coordinate details.');
            return;
        }
        
        showSuccess(
            isEditing ? 'Update Successful' : 'Saved!', 
            isEditing ? 'Pickup point has been updated successfully.' : 'New pickup point has been added successfully.'
        );
        setIsAddingPoint(false);
        setIsEditing(false);
        setFormData({ name: '', lat: '', lng: '' });
    };

    const handleDelete = async () => {
        if (!pointToDelete) return;
        
        setDeleteLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        showSuccess('Deleted!', 'Pickup point has been removed from the registry.');
        setDeleteLoading(false);
        setIsDeleting(false);
        setPointToDelete(null);
    };

    const handleEdit = (point: any) => {
        setFormData({
            name: point.name,
            lat: point.lat,
            lng: point.lng
        });
        setIsEditing(true);
        setIsAddingPoint(false);
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

            {/* Add/Edit Point Modal */}
            {(isAddingPoint || isEditing) && (
                <div 
                    className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 overflow-y-auto"
                    onClick={() => { 
                        setIsAddingPoint(false); 
                        setIsEditing(false); 
                        setFormData({ name: '', lat: '', lng: '' });
                    }}
                >
                    <div 
                        className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 my-8"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={`px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-indigo-50/50`}>
                            <h3 className="text-lg font-bold text-indigo-900 tracking-tight">
                                {isEditing ? 'Edit Pickup Point' : 'Add New Pickup Point'}
                            </h3>
                            <button 
                                onClick={() => { 
                                    setIsAddingPoint(false); 
                                    setIsEditing(false); 
                                    setFormData({ name: '', lat: '', lng: '' });
                                }}
                                className="text-gray-400 hover:text-rose-500 transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-6 space-y-5">
                            <div className="space-y-1.5 font-bold">
                                <label className="text-sm font-medium text-gray-700">
                                    Pickup Point <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter point name"
                                    className="w-full px-4 py-2.5 bg-white border border-gray-400 rounded-xl text-sm font-bold text-gray-700 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div className="py-0.5">
                                <button 
                                    type="button" 
                                    className="text-[13px] font-bold text-indigo-600 hover:text-indigo-800 transition-all border-b border-indigo-100 hover:border-indigo-600"
                                >
                                    Click here to get latitude and longitude
                                </button>
                            </div>

                            <div className="space-y-1.5 font-bold">
                                <label className="text-sm font-medium text-gray-700">
                                    Latitude <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="0.000000"
                                    className="w-full px-4 py-2.5 bg-white border border-gray-400 rounded-xl text-sm font-mono font-bold text-gray-700 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm italic"
                                    value={formData.lat}
                                    onChange={(e) => setFormData({ ...formData, lat: e.target.value })}
                                />
                            </div>

                            <div className="space-y-1.5 font-bold">
                                <label className="text-sm font-medium text-gray-700">
                                    Longitude <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="0.000000"
                                    className="w-full px-4 py-2.5 bg-white border border-gray-400 rounded-xl text-sm font-mono font-bold text-gray-700 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm italic"
                                    value={formData.lng}
                                    onChange={(e) => setFormData({ ...formData, lng: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                            <button 
                                onClick={handleSave}
                                className={`px-8 py-2.5 bg-${theme.colors.primary} text-white rounded-lg text-sm font-bold shadow-lg shadow-indigo-100 hover:opacity-90 active:scale-95 transition-all tracking-tight`}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* View Map Modal */}
            {isMapOpen && selectedPoint && (
                <div 
                    className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
                    onClick={() => setIsMapOpen(false)}
                >
                    <div 
                        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={`px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-indigo-50/50`}>
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-indigo-600 text-white rounded-lg">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-indigo-900 tracking-tight">Geographic Location</h3>
                                    <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">{selectedPoint.name}</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setIsMapOpen(false)}
                                className="text-gray-400 hover:text-rose-500 transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-6">
                            <div className="aspect-video bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5"></div>
                                <Navigation className="text-indigo-200 mb-4 group-hover:scale-110 transition-transform duration-500" size={64} />
                                <div className="relative z-10 text-center space-y-2 px-8">
                                    <p className="text-sm font-bold text-gray-500 uppercase tracking-widest italic leading-relaxed">
                                        Coordinate Registry Verified
                                    </p>
                                    <div className="flex items-center justify-center space-x-6 pt-4">
                                        <div className="text-center">
                                            <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-1">Latitude</p>
                                            <p className="text-lg font-mono font-bold text-gray-800 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">{selectedPoint.lat}</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-1">Longitude</p>
                                            <p className="text-lg font-mono font-bold text-gray-800 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">{selectedPoint.lng}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute bottom-4 right-4 flex items-center space-x-2">
                                    <Globe size={16} className="text-indigo-300 animate-pulse" />
                                    <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest">Live Sync Active</span>
                                </div>
                            </div>
                        </div>

                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                            <div className="flex items-center space-x-2 text-gray-400">
                                <AlertCircle size={14} />
                                <span className="text-[10px] font-bold uppercase tracking-wider italic">Precision Coordinates (WGS84)</span>
                            </div>
                            <button 
                                onClick={() => setIsMapOpen(false)}
                                className={`px-8 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-bold shadow-lg shadow-indigo-100 hover:opacity-90 active:scale-95 transition-all tracking-tight`}
                            >
                                Close View
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
                                    <h3 className="text-xl font-bold text-white">Delete Point</h3>
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
                                        Are you sure you want to delete this pickup point?
                                    </h4>
                                    {pointToDelete && (
                                        <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-400 font-bold">
                                            <p className="text-sm text-gray-600 mb-0.5">
                                                <span className="font-bold text-gray-800 text-[10px] block opacity-50">Point Name</span> 
                                                <span className="text-gray-900">{pointToDelete.name}</span>
                                            </p>
                                        </div>
                                    )}
                                    <p className="text-xs font-semibold text-gray-500 leading-relaxed opacity-70">
                                        This action cannot be undone and will affect transport routes.
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
                        <div className={`p-2 bg-${theme.colors.primaryLight} text-${theme.colors.primary} rounded-lg`}>
                            <MapPinned size={20} />
                        </div>
                        <h2 className="text-lg font-bold text-gray-800">Logistics Node Registry</h2>
                    </div>
                    <button 
                        onClick={() => {
                            setIsAddingPoint(!isAddingPoint);
                            setIsEditing(false);
                            setFormData({ name: '', lat: '', lng: '' });
                        }}
                        className={`p-2.5 rounded-xl border transition-all flex items-center space-x-2 shadow-sm ${
                            isAddingPoint 
                            ? 'bg-rose-50 border-rose-200 text-rose-600' 
                            : (themeName === 'white' ? 'bg-white border-gray-400 text-black hover:border-black' : `bg-${theme.colors.primary} border-${theme.colors.primary} text-white hover:bg-${theme.colors.primaryDark}`)
                        }`}
                        title={isAddingPoint ? 'Cancel Operation' : 'Add New Node'}
                    >
                        {isAddingPoint ? <X size={18} /> : <Plus size={18} />}
                        <span className="text-xs font-bold">{isAddingPoint ? 'Cancel' : 'Add Node'}</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mt-4">
                    <div className="lg:col-span-12">
                        <div id="print-section">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-400 overflow-hidden">
                                <div className={`px-8 py-3 border-b border-gray-400 flex flex-wrap items-center justify-between gap-4 bg-indigo-50/50`}>
                                    <h2 className="text-sm font-black text-indigo-900 tracking-wider">Pickup Point List</h2>
                                    <div className="flex flex-wrap items-center gap-3 print-hide">
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
                                                title="Print" 
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
                                                        <h4 className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wider">Visible Columns</h4>
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
                                        <thead>
                                            <tr className="bg-gray-50/50">
                                                {visibleColumns.name && <th className="px-8 py-4 text-sm font-bold text-gray-900 border-b border-gray-200 border-t border-gray-100">Pickup Point</th>}
                                                {visibleColumns.latitude && <th className="px-8 py-4 text-sm font-bold text-gray-900 border-b border-gray-200 border-t border-gray-100">Latitude</th>}
                                                {visibleColumns.longitude && <th className="px-8 py-4 text-sm font-bold text-gray-900 border-b border-gray-200 border-t border-gray-100">Longitude</th>}
                                                {visibleColumns.action && <th className="px-8 py-4 text-sm font-bold text-gray-900 border-b border-gray-200 border-t border-gray-100 text-right pr-12 print-hide">Action</th>}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100 font-bold">
                                            {pickupPoints.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, rowsPerPage === 'All' ? undefined : Number(rowsPerPage)).map((point) => (
                                                <tr key={point.id} className="hover:bg-indigo-50/20 transition-all group">
                                                    {visibleColumns.name && (
                                                        <td className="px-8 py-6 border-b-2 border-gray-200 align-middle">
                                                            <div className="flex items-center space-x-3">
                                                                <span className="text-sm font-bold text-gray-800">{point.name}</span>
                                                            </div>
                                                        </td>
                                                    )}
                                                    {visibleColumns.latitude && (
                                                        <td className="px-8 py-6 border-b-2 border-gray-200 align-middle text-sm font-mono text-gray-600">
                                                            {point.lat}
                                                        </td>
                                                    )}
                                                    {visibleColumns.longitude && (
                                                        <td className="px-8 py-6 border-b-2 border-gray-200 align-middle text-sm font-mono text-gray-600">
                                                            {point.lng}
                                                        </td>
                                                    )}
                                                    {visibleColumns.action && (
                                                        <td className="px-8 py-6 border-b-2 border-gray-200 text-right pr-12 align-middle print-hide">
                                                            <div className="flex items-center justify-end space-x-2">
                                                                <button 
                                                                    title="View Map" 
                                                                    onClick={() => {
                                                                        setSelectedPoint(point);
                                                                        setIsMapOpen(true);
                                                                    }}
                                                                    className="p-2 bg-gray-900 text-white rounded-lg hover:bg-black transition-all shadow-sm"
                                                                >
                                                                    <MapPin size={16} />
                                                                </button>
                                                                <button 
                                                                    title="Edit"
                                                                    onClick={() => handleEdit(point)}
                                                                    className={`p-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-all shadow-sm`}
                                                                >
                                                                    <Edit2 size={16} />
                                                                </button>
                                                                <button 
                                                                    title="Delete"
                                                                    onClick={() => {
                                                                        setPointToDelete(point);
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

export default PickupPoint;
