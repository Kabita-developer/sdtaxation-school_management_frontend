import {
    Search, ChevronDown, FileText, Copy, Printer, FileSpreadsheet,
    X, ArrowLeft, CornerDownRight, RefreshCw, User
} from 'lucide-react';
import { useState } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────
interface Student {
    class: string; section: string; admNo: string; name: string;
    father: string; dob: string; mobile: string;
}

interface FeeRow {
    id: string; feeName: string; dueDate: string;
    status: 'Paid' | 'Unpaid'; amount: number; fine: number;
    discount: number; paid: number; balance: number;
    payments?: { paymentId: string; mode: string; date: string; amount: number; }[];
}

// ─── Student Fees Modal ───────────────────────────────────────────────────────
function StudentFeesModal({ student, onClose }: { student: Student; onClose: () => void }) {
    const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });

    const fees: FeeRow[] = [
        {
            id: '1', feeName: 'Previous Session Balance\n(Previous Session Balance)',
            dueDate: '03/22/2026', status: 'Paid', amount: 0, fine: 0, discount: 0, paid: 0, balance: 0,
            payments: []
        },
        {
            id: '2', feeName: 'April Month Fees\n(apr-month-fees)',
            dueDate: '04/10/2025', status: 'Paid', amount: 350, fine: 50, discount: 300, paid: 50, balance: 0,
            payments: [{ paymentId: '1362/1', mode: 'Cash', date: '04/02/2026', amount: 300 }]
        },
        {
            id: '3', feeName: 'Admission Fees\n(admission-fees)',
            dueDate: '04/10/2025', status: 'Unpaid', amount: 2500, fine: 0, discount: 0, paid: 0, balance: 2500,
            payments: []
        },
        {
            id: '4', feeName: 'May Month Fees\n(may-month-fees)',
            dueDate: '05/10/2025', status: 'Unpaid', amount: 350, fine: 50, discount: 0, paid: 0, balance: 350,
            payments: []
        },
        {
            id: '5', feeName: 'June Month Fees\n(jun-month-fees)',
            dueDate: '06/10/2025', status: 'Unpaid', amount: 350, fine: 50, discount: 0, paid: 0, balance: 350,
            payments: []
        },
        {
            id: '6', feeName: 'July Month Fees\n(jul-month-fees)',
            dueDate: '07/10/2025', status: 'Unpaid', amount: 350, fine: 50, discount: 0, paid: 0, balance: 350,
            payments: []
        },
        {
            id: '7', feeName: 'Transport Fees (November)',
            dueDate: '11/05/2025', status: 'Unpaid', amount: 50, fine: 20, discount: 0, paid: 0, balance: 50,
            payments: []
        },
        {
            id: '8', feeName: 'Transport Fees (December)',
            dueDate: '12/05/2025', status: 'Unpaid', amount: 50, fine: 20, discount: 0, paid: 0, balance: 50,
            payments: []
        },
    ];

    const grandTotal = {
        amount: fees.reduce((s, f) => s + f.amount, 0),
        fine: fees.reduce((s, f) => s + f.fine, 0),
        discount: fees.reduce((s, f) => s + f.discount, 0),
        paid: fees.reduce((s, f) => s + f.paid, 0),
        balance: fees.reduce((s, f) => s + f.balance, 0),
    };

    const [checkedRows, setCheckedRows] = useState<Set<string>>(new Set());
    const toggleRow = (id: string) => {
        setCheckedRows(prev => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };
    const allChecked = checkedRows.size === fees.length;
    const toggleAll = () => setCheckedRows(allChecked ? new Set() : new Set(fees.map(f => f.id)));

    const [showColSettings, setShowColSettings] = useState(false);
    const [visibleCols, setVisibleCols] = useState({
        'Fees': true, 'Due Date': true, 'Status': true, 'Amount ($)': true, 'Payment ID': true, 'Mode': true, 'Date': true, 'Discount ($)': true, 'Fine ($)': true, 'Paid ($)': true, 'Balance ($)': true, 'Action': true
    });
    const toggleCol = (col: string) => setVisibleCols(prev => ({ ...prev, [col as keyof typeof prev]: !prev[col as keyof typeof prev] }));

    const [showPaymentModal, setShowPaymentModal] = useState(false);

    return (
        /* Overlay */
        <div className="fixed inset-0 z-50 flex items-start justify-end bg-black/40 backdrop-blur-sm"
            onClick={onClose}>
            {/* Panel */}
            <div
                className="relative h-full w-full max-w-5xl bg-white shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300"
                onClick={e => e.stopPropagation()}
            >
                {/* ── Header bar ── */}
                <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white flex-shrink-0">
                    <h2 className="text-base font-bold tracking-wide">Student Fees</h2>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={onClose}
                            className="flex items-center space-x-1.5 px-4 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-semibold transition-all"
                        >
                            <ArrowLeft size={14} />
                            <span>Back</span>
                        </button>
                        <button onClick={onClose} className="p-1.5 hover:bg-white/20 rounded-lg transition-all">
                            <X size={18} />
                        </button>
                    </div>
                </div>

                {/* ── Scrollable body ── */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50">

                    {/* ── Student Info Card ── */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                        <div className="flex items-start gap-5">
                            {/* Avatar */}
                            <div className="w-20 h-20 rounded-xl border-2 border-gray-100 bg-gray-50 flex items-center justify-center flex-shrink-0 shadow-sm">
                                <User size={32} className="text-gray-300" />
                            </div>
                            {/* Info Grid */}
                            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-3">
                                {[
                                    { label: 'Name', value: student.name, highlight: false },
                                    { label: 'Class (Section)', value: `${student.class} (${student.section})`, highlight: false },
                                    { label: 'Father Name', value: student.father, highlight: true, color: 'text-indigo-600' },
                                    { label: 'Admission No', value: student.admNo, highlight: false },
                                    { label: 'Mobile Number', value: student.mobile, highlight: false },
                                    { label: 'Roll Number', value: '20026', highlight: false },
                                    { label: 'Category', value: 'General', highlight: false },
                                    { label: 'RTE', value: 'No', highlight: true, color: 'text-red-500 font-bold' },
                                ].map(({ label, value, highlight, color }) => (
                                    <div key={label}>
                                        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">{label}</p>
                                        <p className={`text-sm font-semibold ${highlight && color ? color : 'text-gray-800'}`}>{value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ── Action Bar ── */}
                    <div className="flex items-center justify-between flex-wrap gap-3">
                        <div className="flex items-center gap-3">
                            <button className="flex items-center space-x-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 hover:shadow-lg transition-all active:scale-95 shadow-md">
                                <Printer size={15} />
                                <span>Print Selected</span>
                            </button>
                            <button className="flex items-center space-x-2 px-5 py-2.5 bg-amber-500 text-white rounded-xl text-sm font-semibold hover:bg-amber-600 hover:shadow-lg transition-all active:scale-95 shadow-md" onClick={() => setShowPaymentModal(true)}>
                                <FileText size={15} />
                                <span>Collect Selected</span>
                            </button>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Date:</span>
                            <span className="text-sm font-semibold text-gray-700">{today}</span>
                        </div>
                    </div>

                    {/* ── Session Label ── */}
                    <div className="text-center">
                        <span className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-700 text-sm font-bold rounded-full border border-indigo-100">
                            Session: 2025-26
                        </span>
                    </div>

                    {/* ── Export Toolbar ── */}
                    <div className="flex justify-end relative">
                        <div className="flex items-center bg-white border border-gray-200 rounded-xl shadow-sm divide-x divide-gray-100">
                            {[
                                { icon: <Copy size={16} />, label: 'Copy', hoverBg: 'hover:bg-indigo-50', hoverText: 'hover:text-indigo-600' },
                                { icon: <FileSpreadsheet size={16} />, label: 'CSV', hoverBg: 'hover:bg-emerald-50', hoverText: 'hover:text-emerald-600' },
                                { icon: <FileText size={16} />, label: 'PDF', hoverBg: 'hover:bg-rose-50', hoverText: 'hover:text-rose-500' },
                                { icon: <FileText size={16} />, label: 'Doc', hoverBg: 'hover:bg-blue-50', hoverText: 'hover:text-blue-600' },
                                { icon: <Printer size={16} />, label: 'Print', hoverBg: 'hover:bg-gray-100', hoverText: 'hover:text-gray-700' },
                            ].map((btn, i) => (
                                <button
                                    key={i}
                                    className={`relative flex flex-col items-center justify-center px-4 py-2 text-gray-400 transition-all active:scale-95 ${btn.hoverBg} ${btn.hoverText} group`}
                                >
                                    <span className="transition-transform group-hover:scale-110">{btn.icon}</span>
                                    {/* Tooltip */}
                                    <span className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-[10px] font-bold px-2 py-1 rounded-md whitespace-nowrap z-20 pointer-events-none shadow-lg">
                                        {btn.label}
                                    </span>
                                </button>
                            ))}
                            {/* Column Toggle */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowColSettings(!showColSettings)}
                                    className={`relative flex flex-col items-center justify-center px-4 py-2 transition-all active:scale-95 group ${showColSettings ? 'bg-indigo-50 text-indigo-600' : 'text-gray-400 hover:bg-gray-100 hover:text-gray-700'}`}
                                >
                                    <span className="transition-transform group-hover:scale-110">
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="3" width="7" height="18" rx="1"/><rect x="14" y="3" width="7" height="18" rx="1"/>
                                        </svg>
                                    </span>
                                    {/* Tooltip */}
                                    <span className="absolute -top-8 right-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-[10px] font-bold px-2 py-1 rounded-md whitespace-nowrap z-20 pointer-events-none shadow-lg">
                                        Column visibility
                                    </span>
                                </button>

                                {/* Column Visibility Dropdown */}
                                {showColSettings && (
                                    <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                                        <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                                            <span className="text-[10px] font-black text-gray-700 uppercase tracking-widest">Columns</span>
                                        </div>
                                        <div className="max-h-64 overflow-y-auto p-2 space-y-0.5">
                                            {Object.entries(visibleCols).map(([col, isVisible]) => (
                                                <label key={col} className="flex items-center justify-between px-3 py-2 hover:bg-indigo-50 rounded-lg cursor-pointer transition-colors group">
                                                    <span className={`text-[11px] font-semibold transition-colors ${isVisible ? 'text-indigo-600' : 'text-gray-500 group-hover:text-gray-700'}`}>{col}</span>
                                                    <input
                                                        type="checkbox"
                                                        checked={isVisible}
                                                        onChange={() => toggleCol(col)}
                                                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer w-3.5 h-3.5"
                                                    />
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* ── Fees Table ── */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse text-sm">
                                <thead>
                                    <tr className="bg-indigo-600 text-white">
                                        <th className="px-4 py-3 w-10">
                                            <input type="checkbox" checked={allChecked} onChange={toggleAll}
                                                className="rounded accent-white cursor-pointer" />
                                        </th>
                                        {['Fees', 'Due Date', 'Status', 'Amount ($)', 'Payment ID', 'Mode', 'Date', 'Discount ($)', 'Fine ($)', 'Paid ($)', 'Balance ($)', 'Action'].map(h => (
                                            visibleCols[h as keyof typeof visibleCols] && (
                                                <th key={h} className="px-3 py-3 font-semibold whitespace-nowrap text-xs">{h}</th>
                                            )
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {fees.map((fee) => (
                                        <>
                                            {/* Main fee row */}
                                            <tr key={fee.id}
                                                className={`border-b border-gray-100 transition-colors ${fee.status === 'Unpaid' ? 'bg-red-50/60 hover:bg-red-50' : 'bg-white hover:bg-gray-50/50'}`}
                                            >
                                                <td className="px-4 py-3">
                                                    <input type="checkbox" checked={checkedRows.has(fee.id)}
                                                        onChange={() => toggleRow(fee.id)}
                                                        className="rounded accent-indigo-600 cursor-pointer" />
                                                </td>
                                                {visibleCols['Fees'] && <td className="px-3 py-3"><span className="text-xs font-semibold text-indigo-600 leading-tight whitespace-pre-line">{fee.feeName}</span></td>}
                                                {visibleCols['Due Date'] && <td className="px-3 py-3 text-xs font-medium text-gray-600 whitespace-nowrap">{fee.dueDate}</td>}
                                                {visibleCols['Status'] && <td className="px-3 py-3">
                                                    <span className={`inline-flex px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide ${fee.status === 'Paid' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-red-100 text-red-600 border border-red-200'}`}>
                                                        {fee.status}
                                                    </span>
                                                </td>}
                                                {visibleCols['Amount ($)'] && <td className="px-3 py-3 text-xs font-medium text-gray-800">
                                                    {fee.amount.toFixed(2)}
                                                    {fee.fine > 0 && <span className="text-red-500"> + {fee.fine.toFixed(2)}</span>}
                                                </td>}
                                                {visibleCols['Payment ID'] && <td className="px-3 py-3 text-xs text-gray-400">—</td>}
                                                {visibleCols['Mode'] && <td className="px-3 py-3 text-xs text-gray-400">—</td>}
                                                {visibleCols['Date'] && <td className="px-3 py-3 text-xs text-gray-400">—</td>}
                                                {visibleCols['Discount ($)'] && <td className="px-3 py-3 text-xs font-medium text-gray-700">{fee.discount.toFixed(2)}</td>}
                                                {visibleCols['Fine ($)'] && <td className="px-3 py-3 text-xs font-medium text-gray-700">{fee.fine.toFixed(2)}</td>}
                                                {visibleCols['Paid ($)'] && <td className="px-3 py-3 text-xs font-medium text-gray-700">{fee.paid.toFixed(2)}</td>}
                                                {visibleCols['Balance ($)'] && <td className="px-3 py-3 text-xs font-semibold text-gray-900">{fee.balance.toFixed(2)}</td>}
                                                {visibleCols['Action'] && <td className="px-3 py-3">
                                                    <div className="flex items-center gap-1.5">
                                                        {fee.status === 'Unpaid' && (
                                                            <button className="w-6 h-6 flex items-center justify-center rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-all text-xs font-bold shadow">+</button>
                                                        )}
                                                        <button className="w-6 h-6 flex items-center justify-center rounded-md bg-gray-100 text-gray-500 hover:bg-gray-200 transition-all">
                                                            <Printer size={11} />
                                                        </button>
                                                    </div>
                                                </td>}
                                            </tr>
                                            {/* Payment sub-rows */}
                                            {fee.payments && fee.payments.map((p, pi) => (
                                                <tr key={`${fee.id}-p${pi}`} className="border-b border-gray-100 bg-gray-50/50">
                                                    <td className="px-4 py-2"></td>
                                                    {visibleCols['Fees'] && <td className="px-3 py-2"><div className="flex items-center justify-end space-x-2 text-gray-400"><CornerDownRight size={13} /></div></td>}
                                                    {visibleCols['Due Date'] && <td className="px-3 py-2"></td>}
                                                    {visibleCols['Status'] && <td className="px-3 py-2"></td>}
                                                    {visibleCols['Amount ($)'] && <td className="px-3 py-2"></td>}
                                                    {visibleCols['Payment ID'] && <td className="px-3 py-2 text-xs font-semibold text-gray-600">{p.paymentId}</td>}
                                                    {visibleCols['Mode'] && <td className="px-3 py-2 text-xs font-medium text-gray-600">{p.mode}</td>}
                                                    {visibleCols['Date'] && <td className="px-3 py-2 text-xs font-medium text-gray-600">{p.date}</td>}
                                                    {visibleCols['Discount ($)'] && <td className="px-3 py-2 text-xs font-semibold text-indigo-500">{p.amount.toFixed(2)}</td>}
                                                    {visibleCols['Fine ($)'] && <td className="px-3 py-2 text-xs text-gray-500">0.00</td>}
                                                    {visibleCols['Paid ($)'] && <td className="px-3 py-2 text-xs text-gray-500">0.00</td>}
                                                    {visibleCols['Balance ($)'] && <td className="px-3 py-2 text-xs text-gray-500">0.00</td>}
                                                    {visibleCols['Action'] && <td className="px-3 py-2">
                                                        <div className="flex items-center gap-1.5">
                                                            <button className="w-6 h-6 flex items-center justify-center rounded-md bg-gray-100 text-gray-400 hover:bg-amber-100 hover:text-amber-600 transition-all"><RefreshCw size={10} /></button>
                                                            <button className="w-6 h-6 flex items-center justify-center rounded-md bg-gray-100 text-gray-400 hover:bg-gray-200 transition-all"><Printer size={11} /></button>
                                                        </div>
                                                    </td>}
                                                </tr>
                                            ))}
                                        </>
                                    ))}

                                    {/* Grand Total Row */}
                                    <tr className="bg-gray-100 border-t-2 border-gray-200 font-bold">
                                        <td className="px-4 py-4"><span className="text-sm font-black text-gray-800">Grand Total</span></td>
                                        {visibleCols['Fees'] && <td className="px-3 py-4"></td>}
                                        {visibleCols['Due Date'] && <td className="px-3 py-4"></td>}
                                        {visibleCols['Status'] && <td className="px-3 py-4"></td>}
                                        {visibleCols['Amount ($)'] && <td className="px-3 py-4 text-sm font-black text-gray-900">
                                            ${grandTotal.amount.toFixed(2)}
                                            {grandTotal.fine > 0 && <span className="text-red-500"> + {grandTotal.fine.toFixed(2)}</span>}
                                        </td>}
                                        {visibleCols['Payment ID'] && <td className="px-3 py-4"></td>}
                                        {visibleCols['Mode'] && <td className="px-3 py-4"></td>}
                                        {visibleCols['Date'] && <td className="px-3 py-4"></td>}
                                        {visibleCols['Discount ($)'] && <td className="px-3 py-4 text-sm font-black text-gray-800">${grandTotal.discount.toFixed(2)}</td>}
                                        {visibleCols['Fine ($)'] && <td className="px-3 py-4 text-sm font-black text-gray-800">${grandTotal.fine.toFixed(2)}</td>}
                                        {visibleCols['Paid ($)'] && <td className="px-3 py-4 text-sm font-black text-gray-800">${grandTotal.paid.toFixed(2)}</td>}
                                        {visibleCols['Balance ($)'] && <td className="px-3 py-4 text-sm font-black text-indigo-700">${grandTotal.balance.toFixed(2)}</td>}
                                        {visibleCols['Action'] && <td className="px-3 py-4"></td>}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Collect Payment Modal ── */}
            {showPaymentModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm"
                    onClick={() => setShowPaymentModal(false)}>
                    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
                        onClick={e => e.stopPropagation()}>
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 bg-[#7a60d6] text-white">
                            <h2 className="text-base font-bold tracking-wide">Collect Fees</h2>
                            <button onClick={() => setShowPaymentModal(false)} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        {/* Body */}
                        <div className="p-8 space-y-6 bg-gray-50/50">
                            <div className="space-y-5 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                {/* Date */}
                                <div className="flex items-center">
                                    <label className="w-1/3 text-sm font-semibold text-gray-600">Date <span className="text-red-500">*</span></label>
                                    <div className="w-2/3">
                                        <input type="date" className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-sm text-gray-700 shadow-sm" />
                                    </div>
                                </div>
                                {/* Payment Mode */}
                                <div className="flex items-start">
                                    <label className="w-1/3 text-sm font-semibold text-gray-600 pt-1">Payment Mode</label>
                                    <div className="w-2/3 flex flex-wrap gap-x-5 gap-y-3">
                                        {['Cash', 'Cheque', 'DD', 'Bank Transfer', 'UPI', 'Card'].map(mode => (
                                            <label key={mode} className="flex items-center gap-2 cursor-pointer group">
                                                <input type="radio" name="payment_mode" value={mode} defaultChecked={mode === 'Cash'} className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500 cursor-pointer" />
                                                <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition-colors">{mode}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                {/* Note */}
                                <div className="flex items-start">
                                    <label className="w-1/3 text-sm font-semibold text-gray-600 pt-2">Note</label>
                                    <div className="w-2/3">
                                        <textarea rows={2} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-sm text-gray-700 shadow-sm resize-none"></textarea>
                                    </div>
                                </div>
                            </div>

                            {/* Action Banner */}
                            <div className="mt-4">
                                {checkedRows.size === 0 ? (
                                    <div className="px-5 py-4 bg-[#f0f9ff] border border-[#bae6fd] rounded-xl flex items-center justify-between">
                                        <p className="text-[13px] font-semibold text-[#0369a1]">No Fees Found</p>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-between px-5 py-4 bg-indigo-50 border border-indigo-100 rounded-xl">
                                        <p className="text-[13px] font-semibold text-indigo-700">Ready to process {checkedRows.size} selected fee(s)</p>
                                        <button className="px-6 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-lg shadow-sm hover:bg-indigo-700 hover:shadow-md transition-all active:scale-95">
                                            Process Payment
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CollectFees() {
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [tableSearch, setTableSearch] = useState('');
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

    const classes = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7'];
    const sections = ['A', 'B', 'C', 'D'];

    const students: Student[] = [
        { class: 'Class 1', section: 'A', admNo: '10024', name: 'Steven Taylor', father: 'Jason Taylor', dob: '08/17/2017', mobile: '890567345' },
        { class: 'Class 1', section: 'A', admNo: '111', name: 'mdhp Tripathi', father: 'dd', dob: '04/01/2026', mobile: '07805959322' },
        { class: 'Class 1', section: 'A', admNo: '120020', name: 'Ashwani Kumar', father: 'Arjun Kumar', dob: '09/25/2009', mobile: '980678463' },
        { class: 'Class 1', section: 'A', admNo: '125005', name: 'Nehal Wadhera', father: 'Karun wadhera', dob: '11/23/2006', mobile: '890786784' },
        { class: 'Class 1', section: 'A', admNo: '18001', name: 'Edward Thomas', father: 'Olivier Thomas', dob: '10/24/2013', mobile: '8906785675' },
        { class: 'Class 1', section: 'A', admNo: '19001', name: 'Edward Thomas', father: 'Olivier Thomas', dob: '11/03/2014', mobile: '8233366613' },
        { class: 'Class 1', section: 'A', admNo: '25001', name: 'Georgia Wareham', father: 'Zakary Foulkes', dob: '05/10/2021', mobile: '9808908777' },
        { class: 'Class 1', section: 'A', admNo: '520039', name: 'xavier bartlett', father: 'David bartlett', dob: '05/13/2009', mobile: '0890789657' },
        { class: 'Class 1', section: 'A', admNo: '659990', name: 'James Bennett', father: 'David Wilson', dob: '05/05/2009', mobile: '8978786866' },
        { class: 'Class 1', section: 'A', admNo: '7656', name: 'RAM', father: 'jay', dob: '01/07/2020', mobile: '9876543210' },
    ];

    const filteredStudents = students.filter(student => {
        const term = tableSearch.toLowerCase();
        if (!term) return true;
        return (
            student.name.toLowerCase().includes(term) ||
            student.admNo.toLowerCase().includes(term) ||
            student.father.toLowerCase().includes(term) ||
            student.class.toLowerCase().includes(term) ||
            student.section.toLowerCase().includes(term) ||
            student.mobile.toLowerCase().includes(term) ||
            student.dob.toLowerCase().includes(term)
        );
    });

    return (
        <>
            {/* ── Student Fees Modal ── */}
            {selectedStudent && (
                <StudentFeesModal student={selectedStudent} onClose={() => setSelectedStudent(null)} />
            )}

            <div className="space-y-6 text-left p-6">
                {/* Select Criteria Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 pt-5 pb-4 flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" /><path d="m21 21-4.3-4.3" />
                            </svg>
                        </div>
                        <h2 className="text-base font-semibold text-gray-800">Select Criteria</h2>
                    </div>
                    <div className="border-t border-gray-100" />
                    <div className="px-6 py-6">
                        <div className="flex flex-wrap items-end gap-6">
                            {/* Class */}
                            <div className="space-y-1.5 min-w-[150px]">
                                <label className="text-xs font-semibold text-gray-500 flex items-center">
                                    Class <span className="text-red-500 ml-0.5">*</span>
                                </label>
                                <div className="relative">
                                    <select className="w-full pl-4 pr-10 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 appearance-none transition-all cursor-pointer hover:border-gray-400 shadow-sm"
                                        value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
                                        <option value="">Select</option>
                                        {classes.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                            {/* Section */}
                            <div className="space-y-1.5 min-w-[150px]">
                                <label className="text-xs font-semibold text-gray-500">Section</label>
                                <div className="relative">
                                    <select className="w-full pl-4 pr-10 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 appearance-none transition-all cursor-pointer hover:border-gray-400 shadow-sm"
                                        value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)}>
                                        <option value="">Select</option>
                                        {sections.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                            <div className="pb-0">
                                <button className="flex items-center space-x-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-100 transition-all active:scale-95 shadow-md">
                                    <Search size={15} /><span>Search</span>
                                </button>
                            </div>
                            <div className="hidden lg:block w-px h-10 bg-gray-200 self-end mb-0.5" />
                            <div className="space-y-1.5 flex-1 min-w-[280px]">
                                <label className="text-xs font-semibold text-gray-500">Search By Keyword</label>
                                <input type="text" placeholder="Search by Keyword..."
                                    className="w-full pl-4 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-600 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all hover:border-gray-400 shadow-sm"
                                    value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
                            </div>
                            <div className="pb-0">
                                <button className="flex items-center space-x-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-100 transition-all active:scale-95 shadow-md">
                                    <Search size={15} /><span>Search</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Student List Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100">
                        <h2 className="text-xl font-black text-gray-800 tracking-tight uppercase italic underline decoration-purple-500/30 decoration-4 underline-offset-4">Student List</h2>
                    </div>
                    <div className="p-6 overflow-hidden">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                            <div className="relative flex-1 max-w-xs">
                                <input type="text" placeholder="Search..."
                                    className="w-full pl-6 pr-6 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-black text-gray-800 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all shadow-sm"
                                    value={tableSearch} onChange={(e) => setTableSearch(e.target.value)} />
                            </div>
                            <div className="flex items-center space-x-6">
                                <div className="relative">
                                    <select className="appearance-none pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-[11px] font-black uppercase text-gray-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 cursor-pointer shadow-sm">
                                        <option>50</option><option>100</option>
                                    </select>
                                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                                <div className="flex items-center space-x-2">
                                    {[
                                        { icon: <Copy size={16} />, color: 'text-gray-400 hover:text-indigo-600' },
                                        { icon: <FileSpreadsheet size={16} />, color: 'text-gray-400 hover:text-emerald-600' },
                                        { icon: <FileText size={16} />, color: 'text-gray-400 hover:text-amber-600' },
                                        { icon: <Printer size={16} />, color: 'text-gray-400 hover:text-indigo-600' }
                                    ].map((btn, i) => (
                                        <button key={i} className={`p-2.5 rounded-xl bg-gray-50 border border-gray-100 shadow-sm transition-all hover:scale-110 active:scale-95 ${btn.color}`}>
                                            {btn.icon}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto rounded-3xl border border-gray-100">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50/50">
                                        {['Class', 'Section', 'Admission No', 'Student Name', 'Father Name', 'Date Of Birth', 'Mobile No.', 'Action'].map(head => (
                                            <th key={head} className={`px-4 py-3 text-sm font-medium text-gray-500 border-b border-gray-100 ${head === 'Action' ? 'text-right' : ''}`}>
                                                {head}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredStudents.length === 0 ? (
                                        <tr>
                                            <td colSpan={8} className="px-4 py-10 text-center text-sm font-medium text-gray-400">
                                                No students found matching your search.
                                            </td>
                                        </tr>
                                    ) : filteredStudents.map((student, idx) => (
                                        <tr key={idx} className="hover:bg-indigo-50/20 transition-colors group">
                                            <td className="px-4 py-3 text-sm font-medium text-gray-600">{student.class}</td>
                                            <td className="px-4 py-3 text-sm font-medium text-gray-600">{student.section}</td>
                                            <td className="px-4 py-3 text-sm font-medium text-gray-900">{student.admNo}</td>
                                            <td className="px-4 py-3">
                                                <span className="text-sm font-medium text-indigo-600 hover:underline cursor-pointer">{student.name}</span>
                                            </td>
                                            <td className="px-4 py-3 text-sm font-medium text-gray-500">{student.father}</td>
                                            <td className="px-4 py-3 text-sm font-medium text-gray-900">{student.dob}</td>
                                            <td className="px-4 py-3 text-sm font-medium text-gray-900">{student.mobile || '-'}</td>
                                            <td className="px-4 py-3 text-right">
                                                <button
                                                    onClick={() => setSelectedStudent(student)}
                                                    className="px-5 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-100 transition-all active:scale-95 inline-flex items-center space-x-2 shadow-md"
                                                >
                                                    <span>Collect Fees</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between mt-4">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">
                                Showing 1 to {filteredStudents.length} of {students.length} entries
                            </p>
                            <div className="flex items-center space-x-2">
                                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-50 text-gray-400 text-xs font-black shadow-sm">{'<'}</button>
                                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-600 text-white text-xs font-black shadow-lg shadow-indigo-100">1</button>
                                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-50 text-gray-400 text-xs font-black shadow-sm">{'>'}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
