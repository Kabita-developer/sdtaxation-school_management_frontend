import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
    Plus,
    Search,
    User,
    Edit2,
    Trash2,
    X,
    ChevronDown,
    Printer,
    Filter,
    Check,
    AlertTriangle,
    Loader2,
    Truck,
    Download,
    FileText,
    Copy,
    UploadCloud,
    Eye
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useNotification } from '../contexts/NotificationContext';

export default function Vehicles() {
    const navigate = useNavigate();
    const { theme, themeName } = useTheme();
    const { showSuccess, showError } = useNotification();

    const [searchTerm, setSearchTerm] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState<number | string>(50);

    // Vehicle Specific States
    const [isAddingVehicle, setIsAddingVehicle] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isViewingDetails, setIsViewingDetails] = useState(false);
    const [vehicleToView, setVehicleToView] = useState<any>(null);
    const [vehicleToDelete, setVehicleToDelete] = useState<any>(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const [formData, setFormData] = useState({
        number: '',
        model: '',
        year: '',
        registrationNumber: '',
        chasisNumber: '',
        seatingCapacity: '',
        driverName: '',
        driverLicense: '',
        driverContact: '',
        note: ''
    });

    // Dropdown States for Vehicle Table
    const [isRowsOpen, setIsRowsOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [visibleColumns, setVisibleColumns] = useState({
        vehicleNumber: true,
        model: true,
        yearMade: true,
        registrationNumber: true,
        chasisNumber: true,
        seatingCapacity: true,
        driverName: true,
        driverLicense: true,
        driverContact: true,
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

    const vehicles = [
        { id: 1, number: 'PB-01-AF-1234', model: 'Force Traveller', year: '2022', registrationNumber: 'REG-5678', chasisNumber: 'CHS-9012', seatingCapacity: '25', driverName: 'Gurdeep Singh', license: 'DL12345678', contact: '9876543210' },
        { id: 2, number: 'PB-01-BG-5678', model: 'Tata Winger', year: '2021', registrationNumber: 'REG-1234', chasisNumber: 'CHS-3456', seatingCapacity: '15', driverName: 'Manpreet Singh', license: 'DL87654321', contact: '8765432109' },
    ];

    const handleSave = () => {
        if (!formData.number || !formData.driverName) {
            showError('Missing Fields', 'Please enter vehicle number and driver name.');
            return;
        }
        showSuccess(
            isEditing ? 'Update Successful' : 'Saved!',
            isEditing ? 'Vehicle details have been updated successfully.' : 'New vehicle has been added to the fleet successfully.'
        );
        setIsAddingVehicle(false);
        setIsEditing(false);
        setSelectedFile(null);
        setFormData({ number: '', model: '', year: '', registrationNumber: '', chasisNumber: '', seatingCapacity: '', driverName: '', driverLicense: '', driverContact: '', note: '' });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setSelectedFile(e.dataTransfer.files[0]);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDelete = async () => {
        if (!vehicleToDelete) return;
        setDeleteLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        showSuccess('Deleted!', 'Vehicle has been removed from the registry.');
        setDeleteLoading(false);
        setIsDeleting(false);
        setVehicleToDelete(null);
    };

    const handleEdit = (vehicle: any) => {
        setFormData({
            number: vehicle.number,
            model: vehicle.model,
            year: vehicle.year,
            registrationNumber: vehicle.registrationNumber,
            chasisNumber: vehicle.chasisNumber,
            seatingCapacity: vehicle.seatingCapacity,
            driverName: vehicle.driverName,
            driverLicense: vehicle.license,
            driverContact: vehicle.contact,
            note: ''
        });
        setIsEditing(true);
        setIsAddingVehicle(true);
    };

    return (
        <div className="space-y-4 text-left animate-in fade-in duration-500 font-sans">
            <style>
                {`
                    @media print {
                        #print-section { visibility: visible !important; position: absolute; left: 0; top: 0; width: 100%; }
                        .print-hide { display: none !important; }
                    }
                    body { margin: 0 !important; padding: 0 !important; }
                    .absolute-full-overlay {
                        position: fixed !important;
                        top: 0 !important;
                        left: 0 !important;
                        right: 0 !important;
                        bottom: 0 !important;
                        width: 100vw !important;
                        height: 100vh !important;
                        z-index: 999999 !important;
                        background: rgba(0,0,0,0.5) !important;
                    }
                `}
            </style>

            {/* Header section based on ClassNameCreate */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className={`text-2xl font-black text-gray-900 tracking-tight`}>Vehicle Registry</h1>
                    <p className="text-xs text-gray-500 font-bold mt-1">Manage school transport fleet and driver information</p>
                </div>
                <button 
                    onClick={() => {
                        if (isAddingVehicle) {
                            setIsAddingVehicle(false);
                            setIsEditing(false);
                            setSelectedFile(null);
                            setFormData({ number: '', model: '', year: '', registrationNumber: '', chasisNumber: '', seatingCapacity: '', driverName: '', driverLicense: '', driverContact: '', note: '' });
                        } else {
                            setIsAddingVehicle(true);
                        }
                    }}
                    className={`p-2.5 rounded-xl border transition-all flex items-center space-x-2 shadow-sm ${
                        isAddingVehicle 
                        ? 'bg-rose-50 border-rose-200 text-rose-600' 
                        : (themeName === 'white' ? 'bg-white border-gray-400 text-black hover:border-black' : `bg-${theme.colors.primary} border-${theme.colors.primary} text-white hover:opacity-90`)
                    }`}
                    title={isAddingVehicle ? 'Cancel Operation' : 'Add New Vehicle'}
                >
                    {isAddingVehicle ? <X size={18} /> : <Plus size={18} />}
                    <span className="text-xs font-bold tracking-tight">{isAddingVehicle ? 'Cancel' : 'Add Vehicle'}</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mt-4">
                <div className="lg:col-span-12">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-400 relative">
                        <div className={`px-8 py-3 border-b border-gray-400 flex flex-wrap items-center justify-between gap-4 ${themeName === 'white' ? 'bg-indigo-50/50' : `bg-${theme.colors.primaryLight}`}`}>
                            <h2 className={`text-sm font-black tracking-wider ${themeName === 'white' ? 'text-indigo-900' : `text-${theme.colors.primary}`}`}>Vehicle List</h2>
                            <div className="flex flex-wrap items-center gap-3">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-500" size={14} />
                                    <input
                                        type="text"
                                        placeholder="Quick search..."
                                        className="pl-9 pr-4 py-2.5 bg-white border border-gray-400 rounded-xl text-xs font-bold text-gray-800 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all w-48 shadow-sm"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                
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
                                            {[10, 25, 50, 'All'].map(val => (
                                                <div key={val} onClick={() => { setRowsPerPage(val); setIsRowsOpen(false); }} className={`px-4 py-2 text-xs font-bold cursor-pointer transition-colors ${rowsPerPage === val ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}>{val}</div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center space-x-1">
                                    <button title="Copy to Clipboard" className="p-2.5 bg-white border border-gray-400 rounded-xl text-gray-600 hover:text-indigo-600 hover:border-indigo-400 transition-all shadow-sm"><Copy size={14} /></button>
                                    <button title="Export to Excel" className="p-2.5 bg-white border border-gray-400 rounded-xl text-gray-600 hover:text-emerald-600 hover:border-emerald-400 transition-all shadow-sm"><FileText size={14} /></button>
                                    <button title="Download PDF" className="p-2.5 bg-white border border-gray-400 rounded-xl text-gray-600 hover:text-rose-600 hover:border-rose-400 transition-all shadow-sm"><Download size={14} /></button>
                                    <button title="Print List" onClick={() => window.print()} className="p-2.5 bg-white border border-gray-400 rounded-xl text-gray-600 hover:text-indigo-600 hover:border-indigo-400 transition-all shadow-sm"><Printer size={14} /></button>
                                    
                                    <div className="relative" ref={filterRef}>
                                        <button onClick={() => setIsFilterOpen(!isFilterOpen)} title="Filter Columns" className="p-2.5 bg-white border border-gray-400 rounded-xl text-gray-600 hover:text-indigo-600 hover:border-indigo-400 transition-all shadow-sm">
                                            <Filter size={14} />
                                        </button>
                                        {isFilterOpen && (
                                            <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-gray-400 rounded-xl shadow-2xl z-[100] py-3 px-4 animate-in fade-in zoom-in-95 duration-200">
                                                <h4 className="text-xs font-black text-indigo-900 border-b border-gray-100 pb-2 mb-3 uppercase tracking-widest">Visible Columns</h4>
                                                <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1 custom-scrollbar">
                                                    {Object.entries(visibleColumns).map(([key, value]) => (
                                                        <div key={key} onClick={() => setVisibleColumns(prev => ({ ...prev, [key]: !value }))} className="flex items-center justify-between cursor-pointer group hover:bg-gray-50 p-1 rounded-lg transition-colors">
                                                            <span className="text-[11px] font-bold text-gray-700 capitalize tracking-tight">{key.replace(/([A-Z])/g, ' $1')}</span>
                                                            <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${value ? 'bg-indigo-600' : 'bg-gray-100 group-hover:bg-gray-200'} shadow-sm`}>
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

                        <div className="overflow-x-auto" id="print-section">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-gray-50/50">
                                        {visibleColumns.vehicleNumber && <th className="px-6 py-4 text-sm font-bold text-gray-900 border-b border-gray-200 border-t border-gray-100 min-w-[140px]">Vehicle Number</th>}
                                        {visibleColumns.model && <th className="px-6 py-4 text-sm font-bold text-gray-900 border-b border-gray-200 border-t border-gray-100 min-w-[140px]">Vehicle Model</th>}
                                        {visibleColumns.yearMade && <th className="px-6 py-4 text-sm font-bold text-gray-900 border-b border-gray-200 border-t border-gray-100 min-w-[100px]">Year Made</th>}
                                        {visibleColumns.registrationNumber && <th className="px-6 py-4 text-sm font-bold text-gray-900 border-b border-gray-200 border-t border-gray-100 min-w-[160px]">Registration Number</th>}
                                        {visibleColumns.chasisNumber && <th className="px-6 py-4 text-sm font-bold text-gray-900 border-b border-gray-200 border-t border-gray-100 min-w-[140px]">Chasis Number</th>}
                                        {visibleColumns.seatingCapacity && <th className="px-6 py-4 text-sm font-bold text-gray-900 border-b border-gray-200 border-t border-gray-100 min-w-[140px]">Max Seating Capacity</th>}
                                        {visibleColumns.driverName && <th className="px-6 py-4 text-sm font-bold text-gray-900 border-b border-gray-200 border-t border-gray-100 min-w-[140px]">Driver Name</th>}
                                        {visibleColumns.driverLicense && <th className="px-6 py-4 text-sm font-bold text-gray-900 border-b border-gray-200 border-t border-gray-100 min-w-[140px]">Driver Licence</th>}
                                        {visibleColumns.driverContact && <th className="px-6 py-4 text-sm font-bold text-gray-900 border-b border-gray-200 border-t border-gray-100 min-w-[140px]">Driver Contact</th>}
                                        {visibleColumns.action && <th className="px-6 py-4 text-sm font-bold text-gray-900 border-b border-gray-200 border-t border-gray-100 text-right pr-8 print-hide">Action</th>}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                                    {vehicles.filter(v => 
                                        v.number.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                        v.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        v.model.toLowerCase().includes(searchTerm.toLowerCase())
                                    ).slice(0, rowsPerPage === 'All' ? undefined : Number(rowsPerPage)).map((vehicle) => (
                                        <tr key={vehicle.id} className="hover:bg-indigo-50/30 transition-all">
                                            {visibleColumns.vehicleNumber && <td className="px-6 py-6 border-b-2 border-gray-200 align-middle"><span className="text-sm text-gray-800">{vehicle.number}</span></td>}
                                            {visibleColumns.model && <td className="px-6 py-6 border-b-2 border-gray-200 align-middle"><span className="text-sm text-gray-800">{vehicle.model}</span></td>}
                                            {visibleColumns.yearMade && <td className="px-6 py-6 border-b-2 border-gray-200 align-middle"><span className="text-sm text-gray-800">{vehicle.year}</span></td>}
                                            {visibleColumns.registrationNumber && <td className="px-6 py-6 border-b-2 border-gray-200 align-middle"><span className="text-sm text-gray-800">{vehicle.registrationNumber}</span></td>}
                                            {visibleColumns.chasisNumber && <td className="px-6 py-6 border-b-2 border-gray-200 align-middle"><span className="text-sm text-gray-800">{vehicle.chasisNumber}</span></td>}
                                            {visibleColumns.seatingCapacity && <td className="px-6 py-6 border-b-2 border-gray-200 align-middle"><span className="text-sm text-gray-800">{vehicle.seatingCapacity}</span></td>}
                                            {visibleColumns.driverName && <td className="px-6 py-6 border-b-2 border-gray-200 align-middle"><span className="text-sm text-gray-800">{vehicle.driverName}</span></td>}
                                            {visibleColumns.driverLicense && <td className="px-6 py-6 border-b-2 border-gray-200 align-middle"><span className="text-sm text-gray-800">{vehicle.license}</span></td>}
                                            {visibleColumns.driverContact && <td className="px-6 py-6 border-b-2 border-gray-200 align-middle"><span className="text-sm text-gray-800">{vehicle.contact}</span></td>}
                                            {visibleColumns.action && (
                                                <td className="px-6 py-6 border-b-2 border-gray-200 text-right pr-8 align-middle print-hide">
                                                    <div className="flex items-center justify-end space-x-2">
                                                        <button 
                                                            onClick={() => { setVehicleToView(vehicle); setIsViewingDetails(true); }}
                                                            className="p-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-all shadow-sm" 
                                                            title="View Details"
                                                        >
                                                            <Eye size={16} />
                                                        </button>
                                                        <button onClick={() => handleEdit(vehicle)} className="p-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-all shadow-sm" title="Edit Vehicle"><Edit2 size={16} /></button>
                                                        <button onClick={() => { setVehicleToDelete(vehicle); setIsDeleting(true); }} className="p-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg transition-all shadow-sm" title="Delete Vehicle"><Trash2 size={16} /></button>
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

            {/* Add/Edit Modal based on Image Provided */}
            {isAddingVehicle && createPortal(
                <div 
                    className="absolute-full-overlay flex items-center justify-center backdrop-blur-sm px-4" 
                    onClick={() => { setIsAddingVehicle(false); setIsEditing(false); setSelectedFile(null); }}
                >
                    <div className="bg-white w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300" onClick={e => e.stopPropagation()}>
                        <div className={`px-6 py-2 flex items-center justify-between ${themeName === 'white' ? 'bg-indigo-600' : `bg-${theme.colors.primary}`}`}>
                            <h3 className="text-lg font-bold text-white tracking-tight">{isEditing ? 'Edit Vehicle' : 'Add Vehicle'}</h3>
                            <button onClick={() => { setIsAddingVehicle(false); setIsEditing(false); setSelectedFile(null); }} className="text-white hover:bg-white/20 rounded-lg p-1 transition-colors"><X size={24} /></button>
                        </div>
                        
                        <div className="p-4 space-y-3 overflow-y-auto max-h-[72vh]">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-4">
                                {/* Row 1 */}
                                <div className="space-y-2 flex flex-col items-start">
                                    <label className="text-sm font-medium text-gray-600">Vehicle Number <span className="text-rose-500 font-bold">*</span></label>
                                    <input type="text" className="w-full px-4 py-1.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 outline-none focus:border-indigo-500 transition-all font-bold" value={formData.number} onChange={e => setFormData({...formData, number: e.target.value})} />
                                </div>
                                <div className="space-y-2 flex flex-col items-start">
                                    <label className="text-sm font-medium text-gray-600">Vehicle Model</label>
                                    <input type="text" className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 outline-none focus:border-indigo-500 transition-all font-bold" value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})} />
                                </div>
                                <div className="space-y-2 flex flex-col items-start">
                                    <label className="text-sm font-medium text-gray-600">Year Made</label>
                                    <input type="text" className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 outline-none focus:border-indigo-500 transition-all font-bold" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} />
                                </div>

                                {/* Row 2 */}
                                <div className="space-y-2 flex flex-col items-start">
                                    <label className="text-sm font-medium text-gray-600">Registration Number</label>
                                    <input type="text" className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 outline-none focus:border-indigo-500 transition-all font-bold" value={formData.registrationNumber} onChange={e => setFormData({...formData, registrationNumber: e.target.value})} />
                                </div>
                                <div className="space-y-2 flex flex-col items-start">
                                    <label className="text-sm font-medium text-gray-600">Chasis Number</label>
                                    <input type="text" className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 outline-none focus:border-indigo-500 transition-all font-bold" value={formData.chasisNumber} onChange={e => setFormData({...formData, chasisNumber: e.target.value})} />
                                </div>
                                <div className="space-y-2 flex flex-col items-start">
                                    <label className="text-sm font-medium text-gray-600">Max Seating Capacity</label>
                                    <input type="number" className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 outline-none focus:border-indigo-500 transition-all font-bold" value={formData.seatingCapacity} onChange={e => setFormData({...formData, seatingCapacity: e.target.value})} />
                                </div>

                                {/* Row 3 */}
                                <div className="space-y-2 flex flex-col items-start">
                                    <label className="text-sm font-medium text-gray-600">Driver Name</label>
                                    <input type="text" className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 outline-none focus:border-indigo-500 transition-all font-bold" value={formData.driverName} onChange={e => setFormData({...formData, driverName: e.target.value})} />
                                </div>
                                <div className="space-y-2 flex flex-col items-start">
                                    <label className="text-sm font-medium text-gray-600">Driver Licence</label>
                                    <input type="text" className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 outline-none focus:border-indigo-500 transition-all font-bold" value={formData.driverLicense} onChange={e => setFormData({...formData, driverLicense: e.target.value})} />
                                </div>
                                <div className="space-y-2 flex flex-col items-start">
                                    <label className="text-sm font-medium text-gray-600">Driver Contact</label>
                                    <input type="text" className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 outline-none focus:border-indigo-500 transition-all font-bold" value={formData.driverContact} onChange={e => setFormData({...formData, driverContact: e.target.value})} />
                                </div>
                            </div>

                            {/* Dropzone Photo */}
                            <div className="space-y-1.5 flex flex-col items-start">
                                <label className="text-sm font-medium text-gray-600">Vehicle Photo</label>
                                <input 
                                    type="file" 
                                    ref={fileInputRef} 
                                    className="hidden" 
                                    accept="image/*" 
                                    onChange={handleFileChange} 
                                />
                                <div 
                                    onClick={() => fileInputRef.current?.click()}
                                    onDrop={handleDrop}
                                    onDragOver={handleDragOver}
                                    className="w-full md:w-1/3 p-3 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center space-x-2 bg-gray-50/30 cursor-pointer hover:bg-gray-100/50 transition-all group"
                                >
                                    <UploadCloud className="text-gray-400 group-hover:text-indigo-500" size={18} />
                                    <span className="text-xs font-bold text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap">
                                        {selectedFile ? selectedFile.name : 'Drag and drop a file here or click'}
                                    </span>
                                    {selectedFile && (
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); setSelectedFile(null); }}
                                            className="ml-2 text-rose-500 hover:text-rose-700"
                                        >
                                            <X size={14} />
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Note */}
                            <div className="space-y-1.5 flex flex-col items-start">
                                <label className="text-sm font-medium text-gray-600">Note</label>
                                <textarea rows={3} className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 outline-none focus:border-indigo-500 transition-all font-bold resize-none" value={formData.note} onChange={e => setFormData({...formData, note: e.target.value})} />
                            </div>
                        </div>

                        <div className="px-6 py-2.5 bg-[#f8f9fa] border-t border-gray-100 flex justify-end">
                            <button onClick={handleSave} className={`px-8 py-2 ${themeName === 'white' ? 'bg-indigo-500 hover:bg-indigo-600' : `bg-${theme.colors.primary} hover:opacity-90`} text-white rounded-lg text-sm font-bold shadow-lg transition-all`}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}

            {/* Delete Modal based on ClassNameCreate */}
            {isDeleting && createPortal(
                <div className="absolute-full-overlay flex items-center justify-center backdrop-blur-sm px-4" onClick={() => setIsDeleting(false)}>
                    <div className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300" onClick={e => e.stopPropagation()}>
                        <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4">
                            <div className="flex items-center justify-between font-black">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-white/20 rounded-lg"><AlertTriangle className="text-white" size={20} /></div>
                                    <h3 className="text-xl font-bold text-white">Delete Vehicle</h3>
                                </div>
                                <button onClick={() => setIsDeleting(false)} className="text-white hover:bg-white/20 rounded-lg p-1 transition-colors"><X size={24} /></button>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0"><div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center"><AlertTriangle className="text-red-600" size={24} /></div></div>
                                <div className="flex-1">
                                    <h4 className="text-[17px] font-bold text-gray-900 mb-2 leading-tight">Are you sure you want to delete this vehicle?</h4>
                                    {vehicleToDelete && (
                                        <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-400 font-bold">
                                            <p className="text-sm text-gray-600 mb-0.5">
                                                <span className="font-bold text-gray-800 text-[10px] block opacity-50">Vehicle Number</span> 
                                                <span className="text-gray-900">{vehicleToDelete.number}</span>
                                            </p>
                                        </div>
                                    )}
                                    <p className="text-xs font-semibold text-gray-500 leading-relaxed opacity-70">This action cannot be undone. All fleet associated data will be removed.</p>
                                </div>
                            </div>
                        </div>
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end space-x-3">
                            <button onClick={() => setIsDeleting(false)} className="px-6 py-2 text-sm font-bold border border-gray-400 bg-white rounded-lg hover:bg-gray-100 transition-all font-bold">Cancel</button>
                            <button onClick={handleDelete} className="px-6 py-2 text-sm font-bold bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all flex items-center space-x-2 shadow-md font-bold">
                                {deleteLoading ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                                <span>{deleteLoading ? 'Deleting...' : 'Delete'}</span>
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}

            {/* View Details Modal based on Image Provided */}
            {isViewingDetails && vehicleToView && createPortal(
                <div className="absolute-full-overlay flex items-center justify-center backdrop-blur-sm px-4" onClick={() => setIsViewingDetails(false)}>
                    <div className="bg-white w-full max-w-5xl rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300" onClick={e => e.stopPropagation()}>
                        <div className={`px-6 py-2.5 flex items-center justify-between ${themeName === 'white' ? 'bg-indigo-600' : `bg-${theme.colors.primary}`}`}>
                            <h3 className="text-lg font-bold text-white tracking-tight">Vehicle Details</h3>
                            <button onClick={() => setIsViewingDetails(false)} className="text-white hover:bg-white/20 rounded-lg p-1 transition-colors"><X size={24} /></button>
                        </div>
                        
                        <div className="p-8 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                                {/* Column 1: Photo */}
                                <div className="space-y-3">
                                    <h4 className="text-sm font-bold text-gray-500">Vehicle Photo</h4>
                                    <div className="w-24 h-24 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center overflow-hidden shadow-sm">
                                        <Truck className="text-gray-300" size={40} />
                                    </div>
                                </div>

                                {/* Column 2 */}
                                <div className="space-y-4 pt-1">
                                    <div className="flex flex-col">
                                        <p className="text-sm text-gray-600"><span className="font-bold">Vehicle Number:</span> {vehicleToView.number}</p>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-sm text-gray-600"><span className="font-bold">Registration Number:</span> {vehicleToView.registrationNumber}</p>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-sm text-gray-600"><span className="font-bold">Driver Name:</span> {vehicleToView.driverName}</p>
                                    </div>
                                </div>

                                {/* Column 3 */}
                                <div className="space-y-4 pt-1">
                                    <div className="flex flex-col">
                                        <p className="text-sm text-gray-600"><span className="font-bold">Vehicle Model:</span> {vehicleToView.model}</p>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-sm text-gray-600"><span className="font-bold">Chasis Number:</span> {vehicleToView.chasisNumber}</p>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-sm text-gray-600"><span className="font-bold">Driver Licence:</span> {vehicleToView.license}</p>
                                    </div>
                                </div>

                                {/* Column 4 */}
                                <div className="space-y-4 pt-1">
                                    <div className="flex flex-col">
                                        <p className="text-sm text-gray-600"><span className="font-bold">Year Made:</span> {vehicleToView.year}</p>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-sm text-gray-600"><span className="font-bold">Max Seating Capacity:</span> {vehicleToView.seatingCapacity}</p>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-sm text-gray-600"><span className="font-bold">Driver Contact:</span> {vehicleToView.contact}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="pt-2">
                                <p className="text-sm text-gray-600 font-bold">Note:</p>
                                <p className="text-sm text-gray-500 mt-1 italic">{vehicleToView.note || "No additional notes provided."}</p>
                            </div>
                        </div>

                        <div className="px-8 py-5 flex justify-end">
                            {/* Empty space or additional actions if needed */}
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}
