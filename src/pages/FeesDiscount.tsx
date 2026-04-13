import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { 
    Search, 
    ChevronDown, 
    Copy, 
    FileSpreadsheet, 
    FileText, 
    Printer, 
    Eye,
    Tag,
    Edit2,
    X,
    Calendar,
    Hash,
    Type,
    Percent,
    DollarSign,
    Layers,
    RotateCcw,
    AlertTriangle,
    Users,
    Trash2
} from 'lucide-react';

const FeesDiscount = () => {
    const { theme } = useTheme();
    
    // Form States
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [discountType, setDiscountType] = useState('Fix Amount');
    const [percentage, setPercentage] = useState('');
    const [amount, setAmount] = useState('');
    const [useCount, setUseCount] = useState('');
    const [expiry, setExpiry] = useState('');
    const [description, setDescription] = useState('');
    
    // UI States
    const [editingId, setEditingId] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [activeItem, setActiveItem] = useState<any>(null);
    const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);

    const initialData = [
        { id: '1', name: 'RKS Discount 1', code: 'rksdisc01', percentage: '', amount: '100.00', useCount: '5', expiry: '2026-01-31', description: 'Sample description for RKS' },
        { id: '2', name: 'Sibling Discount', code: 'sibling-disc', percentage: '', amount: '300.00', useCount: '10', expiry: '', description: '' },
        { id: '3', name: 'Handicapped Discount', code: 'handicap-disc', percentage: '', amount: '350.00', useCount: '10', expiry: '2026-01-15', description: '' },
        { id: '4', name: 'Class Topper Discount', code: 'cls-top-disc', percentage: '100.00', amount: '', useCount: '20', expiry: '', description: '' },
    ];

    const [dummyData] = useState(initialData);

    const handleEdit = (item: any) => {
        setIsDeleteSuccess(false);
        setDeletingId(null);
        setEditingId(item.id);
        setName(item.name);
        setCode(item.code);
        setDiscountType(item.percentage ? 'Percentage' : 'Fix Amount');
        setPercentage(item.percentage);
        setAmount(item.amount);
        setUseCount(item.useCount);
        setExpiry(item.expiry);
        setDescription(item.description);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDeleteClick = (item: any) => {
        setIsDeleteSuccess(false);
        setEditingId(null);
        setDeletingId(item.id);
        setActiveItem(item);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDeleteConfirm = () => {
        setIsDeleteSuccess(true);
        setDeletingId(null);
        setTimeout(() => setIsDeleteSuccess(false), 3000);
    };

    const handleCancel = () => {
        setEditingId(null);
        setDeletingId(null);
        setName('');
        setCode('');
        setDiscountType('Fix Amount');
        setPercentage('');
        setAmount('');
        setUseCount('');
        setExpiry('');
        setDescription('');
    };

    const exportOptions = [
        { icon: Copy, label: 'Copy' },
        { icon: FileSpreadsheet, label: 'Excel' },
        { icon: FileText, label: 'CSV' },
        { icon: FileText, label: 'PDF' },
        { icon: Printer, label: 'Print' },
        { icon: Eye, label: 'Visibility' },
    ];

    return (
        <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700 font-sans relative">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Fees Discount</h1>
                    <p className="text-gray-900 text-sm mt-1 font-medium italic">Configure and manage student fee discounts</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Form Section - Add/Edit/Delete Fees Discount */}
                <div className="lg:col-span-4 bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden transform transition-all duration-300 sticky top-8 min-h-[400px]">
                    {isDeleteSuccess ? (
                        /* SUCCESS MESSAGE */
                        <div className="flex flex-col items-center justify-center p-8 text-center h-full animate-in fade-in zoom-in-95 duration-500 min-h-[400px]">
                            <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-inner animate-bounce">
                                <Trash2 size={40} className="scale-x-[-1]" />
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 mb-2">Deleted!</h3>
                            <p className="text-gray-900 font-medium italic">Record has been removed successfully.</p>
                            <div className="mt-8 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-emerald-500 transition-all duration-[3000ms] ease-linear"
                                    style={{ width: isDeleteSuccess ? '0%' : '100%' }}
                                ></div>
                            </div>
                        </div>
                    ) : deletingId ? (
                        /* DELETE FORM UI */
                        <div className="animate-in fade-in zoom-in-95 duration-300">
                            <div className="px-6 py-4 border-b border-rose-100 bg-rose-50/30">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-rose-100 text-rose-600 rounded-lg">
                                        <AlertTriangle size={20} />
                                    </div>
                                    <h2 className="text-lg font-bold text-rose-800 tracking-tight">Delete Discount</h2>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="bg-rose-50 border border-rose-100 rounded-2xl p-5 mb-6">
                                    <p className="text-sm font-bold text-rose-900 leading-relaxed italic">
                                        Are you sure you want to delete <span className="text-rose-600 font-black not-italic underline decoration-rose-300 decoration-2 underline-offset-4">"{activeItem?.name}"</span>?
                                    </p>
                                    <p className="text-[11px] text-rose-700 mt-2 font-medium leading-relaxed">
                                        Deleting this record will permanently remove it from the system. It will also be detached from any students currently assigned this discount.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-900 mb-2 ml-1">Confirmation Note (Optional)</label>
                                        <textarea 
                                            rows={2}
                                            className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all placeholder:text-gray-400"
                                            placeholder="Reason for deletion..."
                                        />
                                    </div>

                                    <div className="pt-2 flex flex-col gap-3">
                                        <button 
                                            onClick={handleDeleteConfirm}
                                            className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-2xl text-sm font-bold transition-all shadow-lg shadow-rose-200/50 flex items-center justify-center gap-2 active:scale-95"
                                        >
                                            <Trash2 size={18} />
                                            <span>Delete Record</span>
                                        </button>
                                        <button 
                                            onClick={handleCancel}
                                            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 py-3 rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2 active:scale-95"
                                        >
                                            <RotateCcw size={18} />
                                            <span>Cancel Deletion</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* ADD/EDIT FORM UI */
                        <>
                            <div className={`px-6 py-4 border-b border-gray-100 ${editingId ? 'bg-amber-50/50' : 'bg-gray-50/30'}`}>
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-bold text-gray-800">
                                        {editingId ? 'Edit Fees Discount' : 'Add Fees Discount'}
                                    </h2>
                                    {editingId && (
                                        <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-[10px] font-black uppercase">Editing Mode</span>
                                    )}
                                </div>
                            </div>
                            
                            <div className="p-6 space-y-5">
                                <div>
                                    <label className="block text-sm font-bold text-gray-900 mb-2 ml-1">Name <span className="text-red-500">*</span></label>
                                    <div className="relative group">
                                        <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors ${editingId ? 'text-amber-400' : 'text-gray-400'}`}><Type size={18} /></div>
                                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={`block w-full pl-10 pr-4 py-2 rounded-xl text-sm font-medium outline-none transition-all ${editingId ? 'bg-amber-50/30 border-amber-200 focus:border-amber-500' : 'bg-gray-50 border-gray-300 focus:border-purple-500 focus:ring-purple-500/20'}`} placeholder="Enter discount name" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-900 mb-2 ml-1">Discount Code <span className="text-red-500">*</span></label>
                                    <div className="relative group">
                                        <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors ${editingId ? 'text-amber-400' : 'text-gray-400'}`}><Hash size={18} /></div>
                                        <input type="text" value={code} onChange={(e) => setCode(e.target.value)} className={`block w-full pl-10 pr-4 py-2 rounded-xl text-sm font-medium outline-none transition-all ${editingId ? 'bg-amber-50/30 border-amber-200 focus:border-amber-500' : 'bg-gray-50 border-gray-300 focus:border-purple-500'}`} placeholder="e.g. RKS-100" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-900 mb-3 ml-1">Discount Type</label>
                                    <div className="flex items-center gap-6 px-1">
                                        <label className="flex items-center gap-2.5 cursor-pointer group">
                                            <input type="radio" name="discount_type" value="Percentage" checked={discountType === 'Percentage'} onChange={(e) => setDiscountType(e.target.value)} className="w-5 h-5 border-2 border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer" />
                                            <span className="text-sm font-bold text-gray-700">Percentage</span>
                                        </label>
                                        <label className="flex items-center gap-2.5 cursor-pointer group">
                                            <input type="radio" name="discount_type" value="Fix Amount" checked={discountType === 'Fix Amount'} onChange={(e) => setDiscountType(e.target.value)} className="w-5 h-5 border-2 border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer" />
                                            <span className="text-sm font-bold text-gray-700">Fix Amount</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-900 mb-2 ml-1">Percentage (%)</label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"><Percent size={16} /></div>
                                            <input type="text" value={percentage} onChange={(e) => setPercentage(e.target.value)} disabled={discountType !== 'Percentage'} className={`block w-full pl-10 pr-4 py-2 border rounded-xl text-sm font-medium outline-none transition-all ${discountType === 'Percentage' ? (editingId ? 'bg-amber-50/30 border-amber-200' : 'bg-gray-50 border-gray-300') : 'bg-gray-100 border-gray-200 cursor-not-allowed opacity-50'}`} />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-900 mb-2 ml-1">Amount ($)</label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"><DollarSign size={16} /></div>
                                            <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} disabled={discountType !== 'Fix Amount'} className={`block w-full pl-10 pr-4 py-2 border rounded-xl text-sm font-medium outline-none transition-all ${discountType === 'Fix Amount' ? (editingId ? 'bg-amber-50/30 border-amber-200' : 'bg-gray-50 border-gray-300') : 'bg-gray-100 border-gray-200 cursor-not-allowed opacity-50'}`} />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-900 mb-2 ml-1">Number Of Use</label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"><Layers size={16} /></div>
                                            <input type="text" value={useCount} onChange={(e) => setUseCount(e.target.value)} className={`block w-full pl-10 pr-4 py-2 rounded-xl text-sm font-medium outline-none transition-all ${editingId ? 'bg-amber-50/30 border-amber-200' : 'bg-gray-50 border-gray-300'}`} />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-900 mb-2 ml-1">Expiry Date</label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"><Calendar size={16} /></div>
                                            <input type="date" value={expiry} onChange={(e) => setExpiry(e.target.value)} className={`block w-full pl-10 pr-4 py-2 rounded-xl text-sm font-medium outline-none transition-all ${editingId ? 'bg-amber-50/30 border-amber-200' : 'bg-gray-50 border-gray-300'}`} />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-900 mb-2 ml-1">Description</label>
                                    <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} className={`block w-full px-4 py-3 rounded-2xl text-sm font-medium outline-none transition-all ${editingId ? 'bg-amber-50/30 border-amber-200' : 'bg-gray-50 border-gray-300'}`} placeholder="Add details..." />
                                </div>

                                <div className="pt-2 flex flex-col gap-3">
                                    <button className={`w-full py-3 rounded-2xl text-sm font-bold transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95 ${editingId ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-200/50' : `bg-${theme.colors.primary} hover:bg-${theme.colors.primaryDark} text-white shadow-purple-200/50`}`}>
                                        <span>{editingId ? 'Update Discount' : 'Save Discount'}</span>
                                    </button>
                                    {editingId && (
                                        <button onClick={handleCancel} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 py-3 rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2 active:scale-95">
                                            <RotateCcw size={18} /><span>Cancel</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* List Section */}
                <div className="lg:col-span-8 bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden transform transition-all duration-300">
                    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/30">
                        <h2 className="text-lg font-bold text-gray-800">Fees Discount List</h2>
                    </div>

                    <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white">
                        <div className="relative group min-w-[200px]">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"><Search size={16} /></div>
                            <input type="text" className="block w-full pl-9 pr-4 py-1.5 bg-white border border-gray-300 rounded text-sm font-medium focus:ring-2 focus:ring-purple-500/20 outline-none transition-all placeholder:text-gray-400" placeholder="Search" />
                        </div>

                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex items-center space-x-2">
                                <select className="bg-white border border-gray-300 rounded px-3 py-1 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all cursor-pointer appearance-none pr-8"><option value="50">50</option></select>
                                <ChevronDown size={14} className="-ml-7 pointer-events-none text-gray-400" />
                            </div>
                            <div className="flex items-center bg-white space-x-2">
                                {exportOptions.map((opt, i) => (<button key={i} title={opt.label} className="p-1.5 text-gray-500 hover:text-purple-600 transition-all"><opt.icon size={18} /></button>))}
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto min-h-[400px]">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-white border-y border-gray-200">
                                    {['Name', 'Discount Code', 'Percentage (%)', 'Amount ($)', 'Number Of Use Count', 'Expiry Date', 'Action'].map((head, i) => (
                                        <th key={i} className="px-4 py-3 text-left border-x border-gray-100"><span className="text-sm font-bold text-gray-700 whitespace-nowrap">{head}</span></th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 italic font-medium">
                                {dummyData.map((row, idx) => (
                                    <tr key={idx} className={`hover:bg-gray-50/50 transition-colors ${editingId === row.id ? 'bg-amber-50/50' : (deletingId === row.id ? 'bg-rose-50/50' : '')}`}>
                                        <td className="px-4 py-4 text-sm text-gray-700 border-x border-gray-100">{row.name}</td>
                                        <td className="px-4 py-4 text-sm text-gray-700 border-x border-gray-100">{row.code}</td>
                                        <td className="px-4 py-4 text-sm text-gray-700 border-x border-gray-100 text-center">{row.percentage || '-'}</td>
                                        <td className="px-4 py-4 text-sm text-gray-700 border-x border-gray-100 text-right">{row.amount || '-'}</td>
                                        <td className="px-4 py-4 text-sm text-gray-700 border-x border-gray-100 text-center">{row.useCount}</td>
                                        <td className="px-4 py-4 text-sm text-gray-700 border-x border-gray-100">{row.expiry || '-'}</td>
                                        <td className="px-4 py-4 text-sm text-center border-x border-gray-100">
                                            <div className="flex items-center justify-center gap-1.5">
                                                <button onClick={() => { setActiveItem(row); setShowAssignModal(true); }} title="Assign" className="p-1.5 bg-purple-600 text-white rounded hover:bg-purple-700 transition-all shadow-sm active:scale-90"><Tag size={14} /></button>
                                                <button onClick={() => handleEdit(row)} title="Edit" className={`p-1.5 rounded transition-all shadow-sm active:scale-90 ${editingId === row.id ? 'bg-amber-500 text-white' : 'bg-purple-600 hover:bg-purple-700 text-white'}`}><Edit2 size={14} /></button>
                                                <button onClick={() => handleDeleteClick(row)} title="Delete" className={`p-1.5 rounded transition-all shadow-sm active:scale-90 ${deletingId === row.id ? 'bg-rose-600 text-white animate-pulse' : 'bg-purple-600 hover:bg-purple-700 text-white'}`}><X size={14} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* ASSIGN DISCOUNT MODAL (Select Criteria) */}
            {showAssignModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] shadow-2xl border border-gray-100 animate-in slide-in-from-bottom-8 duration-500 custom-scrollbar">
                        {/* Modal Header */}
                        <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/30 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-purple-600 text-white rounded-2xl shadow-lg shadow-purple-200">
                                    <Tag size={24} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black text-gray-900 tracking-tight leading-none mb-1">Assign Discount</h2>
                                    <p className="text-gray-900 text-[10px] font-black uppercase tracking-widest italic">{activeItem?.name} ({activeItem?.code})</p>
                                </div>
                            </div>
                            <button onClick={() => setShowAssignModal(false)} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors"><X size={24} /></button>
                        </div>

                        {/* Modal Body - Select Criteria */}
                        <div className="p-8">
                            <div className="bg-[#fcfdff] rounded-3xl border border-gray-100 p-8 shadow-sm">
                                <div className="flex items-center gap-2 mb-8">
                                    <span className="w-2 h-6 bg-purple-600 rounded-full"></span>
                                    <h3 className="text-lg font-bold text-gray-800">Select Criteria</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                                    {/* Class */}
                                    <div>
                                        <label className="block text-sm font-bold text-gray-900 mb-2 ml-1">Class</label>
                                        <div className="relative">
                                            <select className="w-full pl-4 pr-10 py-2.5 bg-white border border-gray-300 rounded-xl text-sm font-medium text-gray-700 outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 appearance-none transition-all cursor-pointer">
                                                <option value="">Select</option>
                                                <option value="1">Class 1</option>
                                                <option value="2">Class 2</option>
                                                <option value="3">Class 3</option>
                                                <option value="10">Class 10</option>
                                            </select>
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400"><ChevronDown size={14} /></div>
                                        </div>
                                    </div>

                                    {/* Section */}
                                    <div>
                                        <label className="block text-sm font-bold text-gray-900 mb-2 ml-1">Section</label>
                                        <div className="relative">
                                            <select className="w-full pl-4 pr-10 py-2.5 bg-white border border-gray-300 rounded-xl text-sm font-medium text-gray-700 outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 appearance-none transition-all cursor-pointer">
                                                <option value="">Select</option>
                                                <option value="A">Section A</option>
                                                <option value="B">Section B</option>
                                                <option value="C">Section C</option>
                                            </select>
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400"><ChevronDown size={14} /></div>
                                        </div>
                                    </div>

                                    {/* Category */}
                                    <div>
                                        <label className="block text-sm font-bold text-gray-900 mb-2 ml-1">Category</label>
                                        <div className="relative">
                                            <select className="w-full pl-4 pr-10 py-2.5 bg-white border border-gray-300 rounded-xl text-sm font-medium text-gray-700 outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 appearance-none transition-all cursor-pointer">
                                                <option value="">Select</option>
                                                <option value="gen">General</option>
                                                <option value="obc">OBC</option>
                                                <option value="sc">SC</option>
                                                <option value="st">ST</option>
                                            </select>
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400"><ChevronDown size={14} /></div>
                                        </div>
                                    </div>

                                    {/* Gender */}
                                    <div>
                                        <label className="block text-sm font-bold text-gray-900 mb-2 ml-1">Gender</label>
                                        <div className="relative">
                                            <select className="w-full pl-4 pr-10 py-2.5 bg-white border border-gray-300 rounded-xl text-sm font-medium text-gray-700 outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 appearance-none transition-all cursor-pointer">
                                                <option value="">Select</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="other">Other</option>
                                            </select>
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400"><ChevronDown size={14} /></div>
                                        </div>
                                    </div>

                                    {/* RTE */}
                                    <div>
                                        <label className="block text-sm font-bold text-gray-900 mb-2 ml-1">RTE</label>
                                        <div className="relative">
                                            <select className="w-full pl-4 pr-10 py-2.5 bg-white border border-gray-300 rounded-xl text-sm font-medium text-gray-700 outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 appearance-none transition-all cursor-pointer">
                                                <option value="">Select</option>
                                                <option value="yes">Yes</option>
                                                <option value="no">No</option>
                                            </select>
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400"><ChevronDown size={14} /></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 flex justify-end">
                                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-10 py-3 rounded-2xl text-sm font-bold transition-all shadow-xl shadow-purple-200 flex items-center gap-2 active:scale-95 group">
                                        <Search size={18} className="group-hover:scale-110 transition-transform" />
                                        <span>Search</span>
                                    </button>
                                </div>
                            </div>

                            {/* RESULTS SECTION - Assign Fees Discount */}
                            <div className="mt-8 bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
                                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/20">
                                    <h3 className="text-sm font-bold text-gray-700">Assign Fees Discount</h3>
                                </div>
                                <div className="p-0 flex flex-col lg:flex-row">
                                    {/* Left Mini Table */}
                                    <div className="w-full lg:w-1/4 border-r border-gray-100 p-6">
                                        <h4 className="text-md font-bold text-gray-800 mb-4">Fees Discount</h4>
                                        <table className="w-full text-left text-sm">
                                            <thead>
                                                <tr className="border-b border-gray-100">
                                                    <th className="pb-2 font-bold text-gray-700">Discount Code</th>
                                                    <th className="pb-2 font-bold text-gray-700 text-right">Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="py-3 font-medium text-gray-600">{activeItem?.code}</td>
                                                    <td className="py-3 font-bold text-gray-900 text-right">
                                                        {activeItem?.percentage ? `${activeItem.percentage}%` : `$${activeItem?.amount}`}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Right Main Table */}
                                    <div className="w-full lg:w-3/4 p-0">
                                        <div className="overflow-x-auto">
                                            <table className="w-full border-collapse">
                                                <thead>
                                                    <tr className="bg-gray-50/30 border-b border-gray-100">
                                                        <th className="px-4 py-3 text-left">
                                                            <div className="flex items-center gap-2">
                                                                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                                                                <span className="text-xs font-bold text-gray-700">All</span>
                                                            </div>
                                                        </th>
                                                        {['Admission No', 'Student Name', 'Class', 'Father Name', 'Category', 'Gender'].map((h) => (
                                                            <th key={h} className="px-4 py-3 text-left">
                                                                <span className="text-xs font-bold text-gray-700">{h}</span>
                                                            </th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-50 italic">
                                                    {[
                                                        { id: '1800011', name: 'Edward Thomas', class: 'Class 1(A)', father: 'Olivier Thomas', cat: 'OBC', gender: 'Male' },
                                                        { id: '003', name: 'Sneha Patel', class: 'Class 1(A)', father: 'Ramesh Patel', cat: '', gender: 'Female' },
                                                        { id: '011', name: 'Hariom Yadav', class: 'Class 1(A)', father: '', cat: 'OBC', gender: 'Male' },
                                                        { id: 'A003', name: 'Hariom Yadav', class: 'Class 1(A)', father: '', cat: 'OBC', gender: 'Male' },
                                                        { id: 'A004', name: 'Nisha', class: 'Class 1(A)', father: '', cat: 'General', gender: 'Female' },
                                                        { id: 'A41003', name: 'niya', class: 'Class 1(A)', father: '', cat: '', gender: 'Male' },
                                                        { id: 'RP2001', name: 'MARY FESTUS', class: 'Class 1(A)', father: 'festus', cat: '', gender: 'Female' },
                                                    ].map((row, i) => (
                                                        <tr key={i} className="hover:bg-gray-50/50">
                                                            <td className="px-4 py-3"><input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500" /></td>
                                                            <td className="px-4 py-3 text-xs font-medium text-gray-700">{row.id}</td>
                                                            <td className="px-4 py-3 text-xs font-medium text-gray-700">{row.name}</td>
                                                            <td className="px-4 py-3 text-xs font-medium text-gray-700">{row.class}</td>
                                                            <td className="px-4 py-3 text-xs font-medium text-gray-700">{row.father}</td>
                                                            <td className="px-4 py-3 text-xs font-medium text-gray-700">{row.cat}</td>
                                                            <td className="px-4 py-3 text-xs font-medium text-gray-700">{row.gender}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="p-4 flex justify-end">
                                            <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-2 rounded-xl text-sm font-bold shadow-lg shadow-purple-200 transition-all active:scale-95">Save</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Info Message */}
                            <div className="mt-8 p-6 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-start gap-4 text-left">
                                <div className="p-2 bg-white rounded-xl text-blue-600 shadow-sm"><Users size={20} /></div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-900 mb-1">Assigning to multiple students?</h4>
                                    <p className="text-xs text-slate-800 leading-relaxed font-medium">Use the filter above to find students by their category or class. You can then select all students from the results and apply this discount in one go.</p>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-8 py-6 bg-gray-50/30 border-t border-gray-100 flex justify-end gap-3">
                            <button onClick={() => setShowAssignModal(false)} className="px-6 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-xl transition-all font-sans">Close Window</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FeesDiscount;
