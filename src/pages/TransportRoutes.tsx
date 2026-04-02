import { useState } from 'react';
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
    Columns
} from 'lucide-react';

const TransportRoutes = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [routeTitle, setRouteTitle] = useState('');
    const [showColumnDropdown, setShowColumnDropdown] = useState(false);
    const [visibleColumns, setVisibleColumns] = useState({
        routeTitle: true,
        action: true
    });
    
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

    return (
        <div className="space-y-8 animate-in fade-in duration-700 text-left">
            {/* Page Header */}
            <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm flex items-center justify-between relative overflow-hidden group transition-all duration-500 hover:shadow-xl">
                <div className="relative z-10 text-left">
                    <div className="inline-flex items-center px-4 py-1.5 bg-purple-50/50 rounded-full border border-purple-100 text-[10px] font-black uppercase tracking-[0.25em] text-purple-600 mb-5">
                        Logistics Management
                    </div>
                    <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter italic leading-none">Transport Routes</h1>
                    <p className="text-[12px] text-gray-400 font-bold mt-3 max-w-sm leading-relaxed text-left opacity-70">
                        Establish topological connections and define geometric boundaries for student transit networks.
                    </p>
                </div>
                <div className="absolute right-0 top-0 opacity-[0.03] -translate-y-8 translate-x-8 rotate-12 pointer-events-none">
                   <Map size={240} className="text-gray-900" />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Create Route Section - Left Column */}
                <div className="lg:col-span-4 bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden group">
                    <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/30">
                        <h2 className="text-[16px] font-bold text-gray-700">
                            Create Route
                        </h2>
                    </div>
                    <div className="p-8 space-y-6">
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest ml-1">Route Title <span className="text-rose-500 font-bold ml-1">*</span></label>
                            <input 
                                type="text" 
                                placeholder="Example: Sector-4 Gateway"
                                className="w-full px-5 py-4 bg-white border border-gray-200 focus:border-purple-500 rounded-2xl text-sm font-bold text-gray-900 transition-all outline-none shadow-sm focus:ring-4 focus:ring-purple-50 placeholder:text-gray-300"
                                value={routeTitle}
                                onChange={(e) => setRouteTitle(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-end pt-2">
                            <button className="px-8 py-2.5 bg-[#6366f1] text-white rounded-lg text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95">
                                Save
                            </button>
                        </div>
                    </div>
                    {/* Footnote */}
                    <div className="px-8 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-center">
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest italic opacity-60">Route Registration Protocol Active</span>
                    </div>
                </div>

                {/* Route List Section - Right Column */}
                <div className="lg:col-span-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-visible min-h-[500px] flex flex-col">
                    {/* List Header / Toolbar */}
                    <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <h2 className="text-[16px] font-bold text-gray-700">
                             Route List
                        </h2>
                        
                        <div className="flex items-center space-x-4">
                            <div className="relative group/search">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 peer-focus:text-purple-600 transition-colors" size={16} />
                                <input 
                                    type="text" 
                                    placeholder="Search..."
                                    className="bg-white border border-gray-200 focus:border-purple-500 rounded-xl pl-11 pr-4 py-2.5 text-[11px] font-bold text-gray-900 w-full md:w-48 transition-all outline-none shadow-sm focus:ring-4 focus:ring-purple-50 peer"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            <div className="flex items-center space-x-2 px-3 py-2 bg-white rounded-xl border border-gray-100 text-[11px] font-black text-gray-600 uppercase tracking-widest shadow-sm">
                                <span>50</span>
                                <ChevronDown size={14} className="text-gray-400" />
                            </div>

                            <div className="flex items-center space-x-1 pl-4 border-l border-gray-100">
                                {[
                                    { Icon: FileSpreadsheet, label: 'Export XLSX' },
                                    { Icon: FileText, label: 'Export PDF' },
                                    { Icon: FileCode, label: 'Export CSV' },
                                    { Icon: Printer, label: 'Print List' },
                                    { Icon: Columns, label: 'Column Visibility' },
                                ].map((action, i) => (
                                    <div key={i} className="relative group/tooltip">
                                        <button 
                                            onClick={() => action.label === 'Column Visibility' ? setShowColumnDropdown(!showColumnDropdown) : null}
                                            className={`p-2.5 rounded-xl transition-all shadow-sm border ${
                                                action.label === 'Column Visibility' && showColumnDropdown 
                                                ? 'bg-gray-900 text-white border-gray-900' 
                                                : 'text-gray-400 hover:text-white hover:bg-gray-900 border-transparent hover:border-gray-900'
                                            }`}>
                                            <action.Icon size={16} />
                                        </button>
                                        {!showColumnDropdown && (
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2.5 py-1.5 bg-gray-900 text-white text-[9px] font-black uppercase tracking-widest rounded-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all whitespace-nowrap z-50 shadow-xl border border-gray-800">
                                                {action.label}
                                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-x-4 border-x-transparent border-b-4 border-b-gray-900"></div>
                                            </div>
                                        )}

                                        {/* Column Visibility Dropdown */}
                                        {action.label === 'Column Visibility' && showColumnDropdown && (
                                            <div className="absolute top-full right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 z-[99] overflow-hidden animate-in slide-in-from-top-2 duration-300">
                                                <div className="px-5 py-4 bg-gray-50/50 border-b border-gray-100">
                                                    <h3 className="text-[10px] font-black text-gray-800 uppercase tracking-[0.2em] italic">Toggle Columns</h3>
                                                </div>
                                                <div className="p-2">
                                                    {[
                                                        { key: 'routeTitle' as const, label: 'Route Title' },
                                                        { key: 'action' as const, label: 'Action Panel' },
                                                    ].map((col) => (
                                                        <button
                                                            key={col.key}
                                                            onClick={() => setVisibleColumns({ ...visibleColumns, [col.key]: !visibleColumns[col.key] })}
                                                            className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-purple-50 group transition-colors"
                                                        >
                                                            <span className={`text-[11px] font-bold ${visibleColumns[col.key] ? 'text-gray-900' : 'text-gray-400'} transition-colors`}>
                                                                {col.label}
                                                            </span>
                                                            <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${
                                                                visibleColumns[col.key] 
                                                                ? 'bg-purple-600 border-purple-600 ring-4 ring-purple-100' 
                                                                : 'bg-white border-gray-200'
                                                            }`}>
                                                                {visibleColumns[col.key] && <X size={12} className="text-white rotate-45" />}
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                                <div className="px-5 py-3 bg-gray-50/50 border-t border-gray-100 flex justify-center">
                                                     <button 
                                                        onClick={() => setShowColumnDropdown(false)}
                                                        className="text-[9px] font-black text-purple-600 uppercase tracking-widest hover:text-purple-700"
                                                     >
                                                        Close Selection
                                                     </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Table Container */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-separate border-spacing-0">
                            <thead>
                                <tr className="bg-gray-50/80">
                                    {visibleColumns.routeTitle && <th className="px-10 py-5 text-[12px] font-bold text-gray-700 border-b border-gray-100 transition-all">Route Title</th>}
                                    {visibleColumns.action && <th className="px-10 py-5 text-[12px] font-bold text-gray-700 border-b border-gray-100 text-right pr-16 transition-all">Action</th>}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {routes.filter(r => r.title.toLowerCase().includes(searchTerm.toLowerCase())).map((route) => (
                                    <tr key={route.id} className="group/row hover:bg-purple-50/30 transition-all">
                                        {visibleColumns.routeTitle && (
                                            <td className="px-10 py-6 transition-all">
                                                <span className="text-[13px] font-medium text-gray-600 group-hover/row:text-purple-600 transition-colors uppercase tracking-tight italic">{route.title}</span>
                                            </td>
                                        )}
                                        {visibleColumns.action && (
                                            <td className="px-10 py-6 text-right pr-16 transition-all">
                                                <div className="flex items-center justify-end space-x-2">
                                                    {/* Action: Edit */}
                                                    <div className="relative group/tooltip">
                                                        <button className="p-2 bg-[#6366f1] text-white rounded-lg hover:bg-indigo-700 transition-all active:scale-90 shadow-md shadow-indigo-50">
                                                            <Edit2 size={16} />
                                                        </button>
                                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 bg-gray-900 text-white text-[9px] font-black uppercase tracking-widest rounded-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all whitespace-nowrap z-20 shadow-xl">
                                                            Edit
                                                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-6 border-transparent border-t-gray-900"></div>
                                                        </div>
                                                    </div>

                                                    {/* Action: Delete */}
                                                    <div className="relative group/tooltip">
                                                        <button className="p-2 bg-[#6366f1] text-white rounded-lg hover:bg-indigo-700 transition-all active:scale-90 shadow-md shadow-indigo-50">
                                                            <X size={16} />
                                                        </button>
                                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 bg-gray-900 text-white text-[9px] font-black uppercase tracking-widest rounded-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all whitespace-nowrap z-20 shadow-xl">
                                                            Delete
                                                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-6 border-transparent border-t-gray-900"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Registry Footer */}
                    <div className="px-10 py-6 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between mt-auto rounded-b-[2.5rem]">
                         <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic opacity-60 flex items-center">
                            Synchronized with Central Transit Hub 0x22F4
                         </span>
                         <span className="text-[9px] font-black text-purple-600 uppercase tracking-[0.2em] italic">
                             Total Registered Nodes: {routes.length}
                         </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransportRoutes;
