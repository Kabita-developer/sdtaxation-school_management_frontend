import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { 
    Search, 
    Copy, 
    FileSpreadsheet, 
    FileText, 
    Printer, 
    Eye, 
    ChevronDown,
    MoreVertical,
    Edit2,
    Trash2,
    CheckCircle2
} from 'lucide-react';

const SearchFeesPayment = () => {
    const { theme } = useTheme();
    const [paymentId, setPaymentId] = useState('11222');
    const [searchQuery, setSearchQuery] = useState('');
    const [openActionId, setOpenActionId] = useState<string | null>(null);
    const [isVisibilityOpen, setIsVisibilityOpen] = useState(false);

    const initialColumns = [
        { id: 'payment_id', label: 'Payment ID', visible: true },
        { id: 'date', label: 'Date', visible: true },
        { id: 'name', label: 'Name', visible: true },
        { id: 'class', label: 'Class', visible: true },
        { id: 'fees_group', label: 'Fees Group', visible: true },
        { id: 'fee_type', label: 'Fee Type', visible: true },
        { id: 'mode', label: 'Mode', visible: true },
        { id: 'paid', label: 'Paid', visible: true },
        { id: 'discount', label: 'Discount', visible: true },
        { id: 'fine', label: 'Fine', visible: true },
        { id: 'action', label: 'Action', visible: true },
    ];

    const [columns, setColumns] = useState(initialColumns);

    const dummyData = [
        { id: '11222', date: '08/04/2026', name: 'Aavya Sharma', class: '10-A', group: 'Tuition Fee', type: 'Monthly', mode: 'Cash', paid: '₹4,500', discount: '₹0', fine: '₹0' },
    ];

    const toggleColumn = (id: string) => {
        setColumns(prev => prev.map(col => col.id === id ? { ...col, visible: !col.visible } : col));
    };

    const exportOptions = [
        { icon: Copy, label: 'Copy' },
        { icon: FileSpreadsheet, label: 'Excel' },
        { icon: FileText, label: 'CSV' },
        { icon: FileText, label: 'PDF' },
        { icon: Printer, label: 'Print' },
    ];

    const filteredData = dummyData.filter(item => 
        item.id.includes(searchQuery) || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Search Fees Payment</h1>
                    <p className="text-gray-900 text-sm mt-1 font-medium italic">Track and manage student fee receipts efficiently</p>
                </div>
            </div>

            {/* Search Input Card */}
            <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6 mb-8 transform transition-all hover:shadow-2xl hover:shadow-gray-200/60 duration-300">
                <div className="max-w-md">
                    <label className="block text-sm font-bold text-gray-900 mb-2 ml-1">Payment ID <span className="text-red-500">*</span></label>
                    <div className="flex items-center gap-3">
                        <div className="relative flex-1 group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-purple-500 transition-colors">
                                <Search size={18} />
                            </div>
                            <input 
                                type="text"
                                value={paymentId}
                                onChange={(e) => setPaymentId(e.target.value)}
                                className="block w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm font-semibold focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all placeholder:text-gray-400"
                                placeholder="Enter Payment ID e.g. 11222"
                            />
                        </div>
                        <button className={`bg-${theme.colors.primary} hover:bg-${theme.colors.primaryDark} text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-purple-200/50 flex items-center gap-2 active:scale-95`}>
                            <Search size={18} />
                            <span>Search</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Detail Section Title */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <span className={`w-2 h-8 bg-${theme.colors.primary} rounded-full`}></span>
                    Payment ID Detail
                </h2>
                <div className="h-px flex-1 bg-gradient-to-r from-gray-200 to-transparent ml-6 hidden md:block"></div>
            </div>

            {/* Data Table Card */}
            <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-visible transform transition-all duration-300 font-sans">
                {/* Table Controls */}
                <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-50/10">
                    <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-gray-900">Show</span>
                        <select className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all cursor-pointer">
                            <option value="10">10</option>
                            <option value="25">25</option>
                        </select>
                        <span className="text-sm font-bold text-gray-900">entries</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <div className="relative group mr-4">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                <Search size={16} />
                            </div>
                            <input 
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="block w-full max-w-xs pl-9 pr-4 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-purple-500/20 outline-none transition-all placeholder:text-gray-400"
                                placeholder="Quick search..."
                            />
                        </div>
                        
                        <div className="flex items-center bg-white border border-gray-200 rounded-lg p-1 shadow-sm relative">
                            {exportOptions.map((opt, i) => (
                                <button key={i} title={opt.label} className="p-1.5 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-md transition-all">
                                    <opt.icon size={18} />
                                </button>
                            ))}
                            
                            {/* Visibility Icon and Menu */}
                            <div className="relative">
                                <button 
                                    onClick={() => setIsVisibilityOpen(!isVisibilityOpen)}
                                    title="Column Visibility" 
                                    className={`p-1.5 transition-all rounded-md ${isVisibilityOpen ? 'bg-purple-600 text-white' : 'text-gray-500 hover:text-purple-600 hover:bg-purple-50'}`}
                                >
                                    <Eye size={18} />
                                </button>

                                {isVisibilityOpen && (
                                    <div className="absolute right-0 mt-2 z-[100] w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                        <div className="px-4 py-3 bg-gray-50/50 border-b border-gray-100 font-sans">
                                            <h3 className={`text-sm font-bold text-${theme.colors.primary}`}>Column Visibility</h3>
                                        </div>
                                        <div className="p-2 max-h-80 overflow-y-auto font-sans">
                                            {columns.map((col) => (
                                                <button 
                                                    key={col.id}
                                                    onClick={() => toggleColumn(col.id)}
                                                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-bold transition-all mb-1 ${col.visible ? 'bg-purple-50 text-purple-700' : 'bg-transparent text-gray-400 hover:bg-gray-50'}`}
                                                >
                                                    <span>{col.label}</span>
                                                    {col.visible && <CheckCircle2 size={16} className="text-purple-500" />}
                                                </button>
                                            ))}
                                        </div>
                                        <div className="p-2 border-t border-gray-100 bg-gray-50/30">
                                            <button 
                                                onClick={() => setColumns(initialColumns)}
                                                className={`w-full py-1.5 text-xs font-bold text-${theme.colors.primary} hover:bg-purple-600 hover:text-white rounded-lg transition-all`}
                                            >
                                                Reset All Columns
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table Area */}
                <div className="overflow-x-auto min-h-[400px]">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                {columns.filter(c => c.visible).map((col) => (
                                    <th key={col.id} className="px-6 py-2 text-left border border-gray-400">
                                        <div className="flex items-center gap-2 group cursor-pointer">
                                            <span className="text-sm font-bold text-gray-700 whitespace-nowrap">{col.label}</span>
                                            {col.id !== 'action' && (
                                                <div className="flex flex-col text-gray-300 group-hover:text-purple-300 transition-colors">
                                                    <ChevronDown size={10} className="rotate-180" />
                                                    <ChevronDown size={10} />
                                                </div>
                                            )}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredData.length > 0 ? (
                                filteredData.map((row, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                        {columns.find(c => c.id === 'payment_id')?.visible && <td className="px-6 py-3 text-sm font-medium text-gray-900 border border-gray-400">{row.id}</td>}
                                        {columns.find(c => c.id === 'date')?.visible && <td className="px-6 py-3 text-sm font-medium text-gray-900 border border-gray-400">{row.date}</td>}
                                        {columns.find(c => c.id === 'name')?.visible && <td className="px-6 py-3 text-sm font-bold text-gray-900 border border-gray-400">{row.name}</td>}
                                        {columns.find(c => c.id === 'class')?.visible && <td className="px-6 py-3 text-sm font-medium text-gray-900 border border-gray-400">{row.class}</td>}
                                        {columns.find(c => c.id === 'fees_group')?.visible && <td className="px-6 py-3 text-sm font-medium text-gray-900 border border-gray-400">{row.group}</td>}
                                        {columns.find(c => c.id === 'fee_type')?.visible && <td className="px-6 py-3 text-sm font-medium text-gray-900 border border-gray-400">{row.type}</td>}
                                        {columns.find(c => c.id === 'mode')?.visible && <td className="px-6 py-3 text-sm font-medium text-gray-900 border border-gray-400"><span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] font-bold uppercase">{row.mode}</span></td>}
                                        {columns.find(c => c.id === 'paid')?.visible && <td className="px-6 py-3 text-sm font-bold text-emerald-600 border border-gray-400">{row.paid}</td>}
                                        {columns.find(c => c.id === 'discount')?.visible && <td className="px-6 py-3 text-sm font-medium text-orange-600 border border-gray-400">{row.discount}</td>}
                                        {columns.find(c => c.id === 'fine')?.visible && <td className="px-6 py-3 text-sm font-medium text-rose-600 border border-gray-400">{row.fine}</td>}
                                        {columns.find(c => c.id === 'action')?.visible && (
                                            <td className="px-6 py-3 text-sm text-center border border-gray-400 relative">
                                                <button onClick={() => setOpenActionId(openActionId === row.id ? null : row.id)} className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-900"><MoreVertical size={16} /></button>
                                                {openActionId === row.id && (
                                                    <div className="absolute right-12 top-2 z-50 w-32 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 animate-in fade-in slide-in-from-right-2">
                                                        <button className="w-full flex items-center gap-3 px-4 py-2 text-sm font-bold text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"><Edit2 size={14} /><span>Edit</span></button>
                                                        <button className="w-full flex items-center gap-3 px-4 py-2 text-sm font-bold text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition-colors border-t border-gray-50"><Trash2 size={14} /><span>Delete</span></button>
                                                    </div>
                                                )}
                                            </td>
                                        )}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={columns.filter(c => c.visible).length} className="py-20 border border-gray-400">
                                        <div className="flex flex-col items-center justify-center text-center">
                                            <Search size={48} className="text-gray-200 mb-4" />
                                            <h3 className="text-lg font-bold text-gray-800">No data available</h3>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Table Footer */}
                <div className="p-4 border-t border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <p className="text-sm font-semibold text-gray-900">Showing {filteredData.length} entries</p>
                    <div className="flex items-center space-x-2">
                        <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-400 bg-white">Previous</button>
                        <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-400 bg-white">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchFeesPayment;
