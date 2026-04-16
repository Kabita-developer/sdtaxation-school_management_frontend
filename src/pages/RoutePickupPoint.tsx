import React, { useState, useRef, useEffect } from 'react';
import {
    Search,
    Edit2,
    Trash2,
    X,
    ChevronDown,
    Plus,
    Printer,
    Filter,
    Check,
    AlertTriangle,
    Loader2,
    Truck,
    MapPin,
    Download,
    FileText,
    Copy,
    Navigation,
    Route as RouteIcon,
    Map,
    List,
    Eye,
    Pencil,
    Clock
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useNotification } from '../contexts/NotificationContext';

export default function RoutePickupPoint() {
    const { theme, themeName } = useTheme();
    const { showSuccess, showError } = useNotification();

    const [searchTerm, setSearchTerm] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState<number | string>(50);

    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [recordToDelete, setRecordToDelete] = useState<any>(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const [formData, setFormData] = useState({
        route: '',
        rows: [{ pickupPoint: '', distance: '', pickupTime: '', monthlyFees: '' }]
    });

    const [isRowsOpen, setIsRowsOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [visibleColumns, setVisibleColumns] = useState({
        route: true,
        points: true,
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

    const routeMappings = [
        { 
            id: 1, 
            route: 'Brooklyn Central', 
            points: [
                { name: '1 Brooklyn North', fees: '700.00', distance: '12.0', time: '7:00 AM' }
            ] 
        },
        { 
            id: 2, 
            route: 'Brooklyn East', 
            points: [
                { name: '1 Brooklyn North', fees: '600.00', distance: '12.0', time: '7:10 AM' },
                { name: '2 Brooklyn South', fees: '600.00', distance: '13.0', time: '7:20 AM' },
                { name: '3 Railway Station', fees: '500.00', distance: '10.0', time: '7:25 AM' },
                { name: '4 Ranital Chowk', fees: '700.00', distance: '14.0', time: '7:10 PM' },
                { name: '5 Manhattan', fees: '600.00', distance: '13.0', time: '7:25 AM' },
            ] 
        },
        { 
            id: 3, 
            route: 'High Court', 
            points: [
                { name: '1 High Court', fees: '700.00', distance: '14.0', time: '7:15 AM' }
            ] 
        },
        { 
            id: 4, 
            route: 'Vijay Nagar', 
            points: [
                { name: '1 Vijay Nagar', fees: '600.00', distance: '12.0', time: '7:15 AM' }
            ] 
        },
    ];

    const handleSave = () => {
        if (!formData.route || formData.rows.some(r => !r.pickupPoint)) {
            showError('Missing Fields', 'Please select a route and pickup points for all rows.');
            return;
        }
        showSuccess(
            isEditing ? 'Update Successful' : 'Saved!',
            isEditing ? 'Mapping has been updated successfully.' : 'Pickup points have been assigned successfully.'
        );
        setIsAdding(false);
        setIsEditing(false);
        setFormData({ route: '', rows: [{ pickupPoint: '', distance: '', pickupTime: '', monthlyFees: '' }] });
    };

    const handleDelete = async () => {
        if (!recordToDelete) return;
        setDeleteLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        showSuccess('Deleted!', 'Mapping has been removed successfully.');
        setDeleteLoading(false);
        setIsDeleting(false);
        setRecordToDelete(null);
    };

    const handleEdit = (record: any) => {
        setFormData({
            route: record.route,
            rows: record.points.map((p: any) => ({
                pickupPoint: p.name,
                distance: p.distance,
                pickupTime: p.time,
                monthlyFees: p.fees
            }))
        });
        setIsEditing(true);
        setIsAdding(false);
    };

    const togglePoint = (point: string) => {
        setFormData(prev => ({
            ...prev,
            selectedPoints: prev.selectedPoints.includes(point)
                ? prev.selectedPoints.filter(p => p !== point)
                : [...prev.selectedPoints, point]
        }));
    };

    return (
        <>
            <style>
                {`
                    @media print {
                        @page { margin: 15mm; size: portrait; }
                        * { animation: none !important; transition: none !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
                        body { margin: 0 !important; visibility: hidden !important; background: white !important; }
                        #print-section { visibility: visible !important; position: absolute !important; left: 0 !important; top: 0 !important; width: 100% !important; }
                        #print-section, #print-section * { visibility: visible !important; color: black !important; }
                        #print-section > div { border: none !important; box-shadow: none !important; }
                        .print-hide { display: none !important; }
                    }
                `}
            </style>

            {/* Add/Edit Mapping Modal */}
            {(isAdding || isEditing) && (
                <div 
                    className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 overflow-y-auto"
                    onClick={() => { 
                        setIsAdding(false); 
                        setIsEditing(false); 
                    }}
                >
                    <div 
                        className="bg-white w-full max-w-4xl rounded-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 my-8"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="px-5 py-3 bg-[#6366f1] flex items-center justify-between">
                            <h3 className="text-lg font-medium text-white">Add</h3>
                            <button 
                                onClick={() => { 
                                    setIsAdding(false); 
                                    setIsEditing(false); 
                                }}
                                className="text-white hover:opacity-80 transition-opacity"
                            >
                                <X size={20} strokeWidth={3} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 space-y-4">
                            {/* Route Selection */}
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">
                                    Route List <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <select 
                                        className="w-full px-3 py-2 bg-white border border-indigo-400 rounded-lg text-sm text-gray-700 outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all appearance-none"
                                        value={formData.route}
                                        onChange={e => setFormData({ ...formData, route: e.target.value })}
                                    >
                                        <option value="">Select</option>
                                        <option value="Brooklyn Central">Brooklyn Central</option>
                                        <option value="Brooklyn East">Brooklyn East</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                                </div>
                            </div>

                            {/* Add More Button Row */}
                            <div className="flex justify-end pt-1">
                                <button 
                                    onClick={() => {
                                        setFormData(prev => ({
                                            ...prev,
                                            rows: [...prev.rows, { pickupPoint: '', distance: '', pickupTime: '', monthlyFees: '' }]
                                        }));
                                    }}
                                    className="px-4 py-1.5 bg-[#7c3aed] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-all active:scale-95"
                                >
                                    Add More
                                </button>
                            </div>

                            {/* Point Rows */}
                            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
                                {formData.rows.map((row, index) => (
                                    <div key={index} className="flex flex-wrap items-end gap-3 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                                        {/* Pickup Point */}
                                        <div className="flex-1 min-w-[200px] space-y-1">
                                            <label className="text-sm font-medium text-gray-700">
                                                Pickup Point <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <select 
                                                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 outline-none focus:border-indigo-400 transition-all appearance-none"
                                                    value={row.pickupPoint}
                                                    onChange={e => {
                                                        const newRows = [...formData.rows];
                                                        newRows[index].pickupPoint = e.target.value;
                                                        setFormData({ ...formData, rows: newRows });
                                                    }}
                                                >
                                                    <option value="">Select</option>
                                                    <option value="Brooklyn North">Brooklyn North</option>
                                                    <option value="Brooklyn South">Brooklyn South</option>
                                                </select>
                                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                                            </div>
                                        </div>

                                        {/* Distance */}
                                        <div className="w-[120px] space-y-1">
                                            <label className="text-sm font-medium text-gray-700 text-xs">Distance</label>
                                            <div className="flex group">
                                                <input 
                                                    type="text" 
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-l-lg outline-none focus:border-indigo-400 transition-all text-sm"
                                                    value={row.distance}
                                                    onChange={e => {
                                                        const newRows = [...formData.rows];
                                                        newRows[index].distance = e.target.value;
                                                        setFormData({ ...formData, rows: newRows });
                                                    }}
                                                />
                                                <div className="px-2.5 py-2 bg-gray-50 border border-l-0 border-gray-300 rounded-r-lg text-gray-500 text-xs flex items-center">
                                                    km
                                                </div>
                                            </div>
                                        </div>

                                        {/* Pickup Time */}
                                        <div className="w-[120px] space-y-1">
                                            <label className="text-sm font-medium text-gray-700">
                                                Time <span className="text-red-500">*</span>
                                            </label>
                                            <div className="flex group">
                                                <input 
                                                    type="text" 
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-l-lg outline-none focus:border-indigo-400 transition-all text-sm text-center"
                                                    placeholder=""
                                                    value={row.pickupTime}
                                                    onChange={e => {
                                                        const newRows = [...formData.rows];
                                                        newRows[index].pickupTime = e.target.value;
                                                        setFormData({ ...formData, rows: newRows });
                                                    }}
                                                />
                                                <div className="px-2 py-2 bg-gray-50 border border-l-0 border-gray-300 rounded-r-lg text-gray-400 flex items-center">
                                                    <Clock size={14} />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Monthly Fees */}
                                        <div className="w-[120px] space-y-1">
                                            <label className="text-sm font-medium text-gray-700">
                                                Fees <span className="text-red-500">*</span>
                                            </label>
                                            <input 
                                                type="text" 
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-indigo-400 transition-all text-sm"
                                                placeholder="0.00"
                                                value={row.monthlyFees}
                                                onChange={e => {
                                                    const newRows = [...formData.rows];
                                                    newRows[index].monthlyFees = e.target.value;
                                                    setFormData({ ...formData, rows: newRows });
                                                }}
                                            />
                                        </div>

                                        {/* Remove Button */}
                                        {formData.rows.length > 1 && (
                                            <button 
                                                onClick={() => {
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        rows: prev.rows.filter((_, i) => i !== index)
                                                    }));
                                                }}
                                                className="mb-0.5 p-2 bg-[#7c3aed] text-white rounded-lg hover:opacity-90 active:scale-95 transition-all shadow-sm"
                                            >
                                                <X size={16} strokeWidth={3} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 flex justify-end bg-white border-t border-gray-100">
                            <button 
                                onClick={handleSave}
                                className="px-8 py-2 bg-[#7c3aed] text-white rounded-lg text-sm font-medium shadow-md hover:opacity-90 active:scale-95 transition-all"
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
                                    <div className="p-2 bg-white/20 rounded-lg"><AlertTriangle className="text-white" size={20} /></div>
                                    <h3 className="text-xl font-bold text-white uppercase tracking-tight">Remove Mapping</h3>
                                </div>
                                <button onClick={() => setIsDeleting(false)} className="text-white hover:bg-white/20 rounded-lg p-1 transition-colors"><X size={24} /></button>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0"><div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center"><AlertTriangle className="text-red-600" size={24} /></div></div>
                                <div className="flex-1">
                                    <h4 className="text-[17px] font-bold text-gray-900 mb-2 leading-tight">Remove this pickup point mapping?</h4>
                                    {recordToDelete && (
                                        <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-400 font-bold">
                                            <p className="text-sm text-gray-600 mb-0.5"><span className="font-bold text-gray-800 text-[10px] block opacity-50 uppercase tracking-widest">Route</span><span className="text-gray-900">{recordToDelete.route}</span></p>
                                        </div>
                                    )}
                                    <p className="text-xs font-semibold text-gray-500 leading-relaxed opacity-70 italic">This will dissociate all assigned pickup points from this route. This action is irreversible.</p>
                                </div>
                            </div>
                        </div>
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-end space-x-3">
                            <button onClick={() => setIsDeleting(false)} className="px-6 py-2 text-sm font-black text-gray-700 bg-white border border-gray-400 rounded-lg hover:bg-gray-50 transition-all shadow-sm" disabled={deleteLoading}>Cancel</button>
                            <button onClick={handleDelete} className="px-6 py-2 text-sm font-black text-white bg-gradient-to-r from-red-600 to-red-700 rounded-lg hover:from-red-700 hover:to-red-800 transition-all shadow-md items-center space-x-2 flex" disabled={deleteLoading}>{deleteLoading ? <><Loader2 size={16} className="animate-spin" /><span>Dissociating...</span></> : <><Trash2 size={16} /><span>Remove</span></>}</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="animate-in fade-in slide-in-from-top-4 duration-500 space-y-4 pt-2 text-left relative">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className={`p-2 ${themeName === 'white' ? 'bg-indigo-50 text-indigo-600' : `bg-${theme.colors.primaryLight} text-${theme.colors.primary}`} rounded-lg`}>
                            <Navigation size={20} />
                        </div>
                        <h2 className="text-lg font-bold text-gray-800 tracking-tight">Route Pickup Point Registry</h2>
                    </div>
                    <button 
                        onClick={() => { 
                            setIsAdding(!isAdding); 
                            setIsEditing(false); 
                            setFormData({ 
                                route: '', 
                                rows: [{ pickupPoint: '', distance: '', pickupTime: '', monthlyFees: '' }] 
                            }); 
                        }}
                        className={`p-2.5 rounded-xl border transition-all flex items-center space-x-2 shadow-sm ${isAdding ? 'bg-rose-50 border-rose-200 text-rose-600' : (themeName === 'white' ? 'bg-white border-gray-400 text-black hover:border-black' : `bg-${theme.colors.primary} border-${theme.colors.primary} text-white hover:opacity-90`)}`}
                        title={isAdding ? 'Cancel Operation' : 'Assign New Points'}
                    >
                        {isAdding ? <X size={18} /> : <Plus size={18} />}
                        <span className="text-xs font-bold tracking-tight">{isAdding ? 'Cancel' : 'Assign Points'}</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mt-4">
                    <div className="lg:col-span-12">
                        <div id="print-section">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-400 overflow-visible">
                                <div className={`px-8 py-3 border-b border-gray-400 flex flex-wrap items-center justify-between gap-4 bg-indigo-50/50 rounded-t-xl`}>
                                    <h2 className="text-sm font-black text-indigo-900 tracking-wider font-bold">Mapping List</h2>
                                    <div className="flex flex-wrap items-center gap-3 print-hide">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-500" size={14} />
                                            <input type="text" placeholder="Search route..." className="pl-9 pr-4 py-2.5 bg-white border border-gray-400 rounded-xl text-xs font-bold text-gray-800 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all w-48 shadow-sm font-bold" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                                        </div>

                                        <div className="relative z-[100]" ref={rowsRef}>
                                            <div onClick={() => setIsRowsOpen(!isRowsOpen)} className="flex items-center space-x-2 bg-white border border-gray-400 rounded-xl px-3 py-2.5 shadow-sm cursor-pointer hover:bg-gray-50 transition-all font-bold text-gray-700" title="Rows Per Page">
                                                <span className="text-xs">{rowsPerPage}</span>
                                                <ChevronDown size={14} className={`text-gray-400 transition-transform ${isRowsOpen ? 'rotate-180' : ''}`} />
                                            </div>
                                            {isRowsOpen && (
                                                <div className="absolute top-full right-0 mt-2 w-20 bg-white border border-gray-400 rounded-xl shadow-2xl z-[110] py-2 animate-in fade-in zoom-in-95 duration-200">
                                                    {[10, 25, 50, 100, 200, 300, 'All'].map(val => (<div key={val} onClick={() => { setRowsPerPage(val); setIsRowsOpen(false); }} className={`px-4 py-2 text-xs font-bold cursor-pointer transition-colors ${rowsPerPage === val ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`} >{val}</div>))}
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex items-center space-x-1">
                                            <button title="Copy" className="p-2.5 bg-white border border-gray-400 rounded-xl text-gray-600 hover:text-indigo-600 hover:border-indigo-400 transition-all shadow-sm"><Copy size={14} /></button>
                                            <button title="Excel" className="p-2.5 bg-white border border-gray-400 rounded-xl text-gray-600 hover:text-emerald-600 hover:border-emerald-400 transition-all shadow-sm"><Download size={14} /></button>
                                            <button title="CSV" className="p-2.5 bg-white border border-gray-400 rounded-xl text-gray-600 hover:text-indigo-600 hover:border-indigo-400 transition-all shadow-sm"><FileText size={14} className="text-blue-500" /></button>
                                            <button onClick={() => window.print()} title="Print List" className="p-2.5 bg-white border border-gray-400 rounded-xl text-gray-600 hover:text-indigo-600 hover:border-indigo-400 transition-all shadow-sm"><Printer size={14} /></button>
                                            
                                            <div className="relative z-[100]" ref={filterRef}>
                                                <button onClick={() => setIsFilterOpen(!isFilterOpen)} title="Columns" className="p-2.5 bg-white border border-gray-400 rounded-xl text-gray-600 hover:text-indigo-600 hover:border-indigo-400 transition-all shadow-sm"><Filter size={14} /></button>
                                                {isFilterOpen && (
                                                    <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-400 rounded-xl shadow-2xl z-[110] py-3 px-4 animate-in fade-in zoom-in-95 duration-200">
                                                        <h4 className="text-xs font-bold text-gray-500 mb-3 tracking-wider uppercase">Visible Columns</h4>
                                                        <div className="space-y-2">
                                                            {Object.entries(visibleColumns).map(([key, value]) => (
                                                                <div key={key} onClick={() => setVisibleColumns(prev => ({ ...prev, [key]: !value }))} className="flex items-center justify-between cursor-pointer group">
                                                                    <span className="text-xs font-bold text-gray-700 capitalize">{key}</span>
                                                                    <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${value ? 'bg-indigo-600' : 'bg-gray-100 group-hover:bg-gray-200'}`}><Check size={12} className="text-white" /></div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="overflow-x-auto rounded-b-xl border-collapse">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-gray-50/50">
                                                {visibleColumns.route && <th className="px-8 py-4 text-sm font-bold text-gray-900 border-b border-gray-300 tracking-tight">Route</th>}
                                                {visibleColumns.points && <th className="px-8 py-4 text-sm font-bold text-gray-900 border-b border-gray-300 tracking-tight">Pickup Point</th>}
                                                <th className="px-8 py-4 text-sm font-bold text-gray-900 border-b border-gray-300 tracking-tight">Monthly Fees ($)</th>
                                                <th className="px-8 py-4 text-sm font-bold text-gray-900 border-b border-gray-300 tracking-tight">Distance (km)</th>
                                                <th className="px-8 py-4 text-sm font-bold text-gray-900 border-b border-gray-300 tracking-tight">Pickup Time</th>
                                                {visibleColumns.action && <th className="px-8 py-4 text-sm font-bold text-gray-900 border-b border-gray-300 text-right pr-12 print-hide tracking-tight">Action</th>}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 overflow-hidden font-medium">
                                            {routeMappings.filter(r => r.route.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, rowsPerPage === 'All' ? undefined : Number(rowsPerPage)).map((record) => (
                                                <React.Fragment key={record.id}>
                                                    {record.points.map((point, index) => (
                                                        <tr key={`${record.id}-${index}`} className="hover:bg-indigo-50/20 transition-all group">
                                                            {index === 0 && (
                                                                <td 
                                                                    rowSpan={record.points.length} 
                                                                    className="px-8 py-6 border-b border-gray-200 align-middle bg-white group-hover:bg-indigo-50/5"
                                                                >
                                                                    {visibleColumns.route && <span className="text-sm text-gray-800 tracking-tight">{record.route}</span>}
                                                                </td>
                                                            )}
                                                            <td className="px-8 py-6 border-b border-gray-200 align-middle">
                                                                {visibleColumns.points && <span className="text-sm text-gray-800 tracking-tight">{point.name}</span>}
                                                            </td>
                                                            <td className="px-8 py-6 border-b border-gray-200 align-middle">
                                                                <span className="text-sm text-gray-800 tracking-tight">{point.fees}</span>
                                                            </td>
                                                            <td className="px-8 py-6 border-b border-gray-200 align-middle">
                                                                <span className="text-sm text-gray-800 tracking-tight">{point.distance}</span>
                                                            </td>
                                                            <td className="px-8 py-6 border-b border-gray-200 align-middle">
                                                                <span className="text-sm text-gray-800 tracking-tight">{point.time}</span>
                                                            </td>
                                                            {index === 0 && (
                                                                <td 
                                                                    rowSpan={record.points.length} 
                                                                    className="px-8 py-6 border-b border-gray-200 text-right pr-12 align-middle print-hide bg-white group-hover:bg-indigo-50/5"
                                                                >
                                                                    {visibleColumns.action && (
                                                                        <div className="flex items-center justify-end space-x-2">
                                                                            <button title="View details" className="p-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-all shadow-sm"><Eye size={16} /></button>
                                                                            <button onClick={() => handleEdit(record)} title="Edit mapping" className="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all shadow-sm"><Edit2 size={16} /></button>
                                                                            <button onClick={() => { setRecordToDelete(record); setIsDeleting(true); }} title="Dissociate" className="p-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl transition-all shadow-sm"><Trash2 size={16} /></button>
                                                                        </div>
                                                                    )}
                                                                </td>
                                                            )}
                                                        </tr>
                                                    ))}
                                                </React.Fragment>
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
}
