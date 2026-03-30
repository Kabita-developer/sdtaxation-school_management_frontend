import { useState } from 'react';
import {
  Search,
  Trash2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileSpreadsheet,
  FileText,
  Printer,
  FileDown,
  Columns,
  Table as TableIcon,
  Copy,
  CheckSquare,
} from 'lucide-react';

interface Student {
  id: string;
  admissionNo: string;
  studentName: string;
  class: string;
  dob: string;
  gender: string;
  category: string;
  mobile: string;
}

export default function BulkDelete() {
  const [selectedClass, setSelectedClass] = useState('Class 3');
  const [selectedSection, setSelectedSection] = useState('B');
  const [tableSearch, setTableSearch] = useState('');
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState('50');
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const classes = [
    'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
    'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10',
    'Class 11', 'Class 12',
  ];
  const sections = ['A', 'B', 'C', 'D'];

  const allStudents: Student[] = [
    { id: '1', admissionNo: '0202',  studentName: 'Emma Thomas',     class: 'Class 3(B)', dob: '07/14/2016', gender: 'Female', category: 'General', mobile: '6881016512' },
    { id: '2', admissionNo: '18077', studentName: 'Dharambir Singh', class: 'Class 3(B)', dob: '02/11/2020', gender: 'Male',   category: 'General', mobile: '852522872525' },
    { id: '3', admissionNo: '5482',  studentName: 'Mayer Roy',       class: 'Class 3(B)', dob: '06/13/2019', gender: 'Male',   category: 'OBC',     mobile: '5360648401' },
    { id: '4', admissionNo: '9808',  studentName: 'Vinni Khatri',    class: 'Class 3(B)', dob: '01/07/2019', gender: 'Female', category: 'General', mobile: '8908979595' },
  ];

  const filteredStudents = allStudents.filter(
    (s) =>
      s.studentName.toLowerCase().includes(tableSearch.toLowerCase()) ||
      s.admissionNo.includes(tableSearch) ||
      s.mobile.includes(tableSearch),
  );

  const isAllSelected = filteredStudents.length > 0 && selectedStudents.length === filteredStudents.length;
  const isIndeterminate = selectedStudents.length > 0 && selectedStudents.length < filteredStudents.length;

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredStudents.map((s) => s.id));
    }
  };

  const toggleSelectStudent = (id: string) => {
    if (selectedStudents.includes(id)) {
      setSelectedStudents(selectedStudents.filter((sid) => sid !== id));
    } else {
      setSelectedStudents([...selectedStudents, id]);
    }
  };

  const handleDelete = () => {
    if (selectedStudents.length === 0) return;
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    setSelectedStudents([]);
    setShowDeleteConfirm(false);
    alert(`${selectedStudents.length} student(s) deleted successfully.`);
  };

  const exportIcons = [Copy, FileSpreadsheet, FileText, FileDown, Printer, Columns, TableIcon];

  return (
    <div className="space-y-5 animate-in fade-in duration-500 pb-12">

      {/* ── Select Criteria Card ─────────────────────────────── */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Card header */}
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-800">Select Criteria</h2>
        </div>

        {/* Filters */}
        <div className="p-6">
          <div className="flex flex-wrap items-end gap-6">
            {/* Class */}
            <div className="flex-1 min-w-[200px] space-y-1.5">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block">
                Class
              </label>
              <div className="relative">
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border-2 border-indigo-300 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all appearance-none pr-10 cursor-pointer"
                >
                  <option value="">Select</option>
                  {classes.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Section */}
            <div className="flex-1 min-w-[200px] space-y-1.5">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block">
                Section
              </label>
              <div className="relative">
                <select
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all appearance-none pr-10 cursor-pointer"
                >
                  <option value="">Select</option>
                  {sections.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Search Button */}
            <div className="flex-none">
              <button className="flex items-center space-x-2 px-6 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold shadow-md shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all">
                <Search size={16} />
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Select All + Delete Row ───────────────────────────── */}
      <div className="flex items-center justify-between">
        {/* Select All checkbox */}
        <label className="flex items-center space-x-2.5 cursor-pointer group select-none">
          <div
            onClick={toggleSelectAll}
            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all
              ${isAllSelected
                ? 'bg-indigo-600 border-indigo-600'
                : isIndeterminate
                  ? 'bg-indigo-100 border-indigo-400'
                  : 'bg-white border-gray-300 group-hover:border-indigo-400'}
            `}
          >
            {isAllSelected && (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            {isIndeterminate && !isAllSelected && (
              <span className="block w-2.5 h-0.5 bg-indigo-600 rounded" />
            )}
          </div>
          <span className="text-sm font-semibold text-gray-700 group-hover:text-indigo-600 transition-colors">
            Select All
          </span>
        </label>

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          disabled={selectedStudents.length === 0}
          className={`flex items-center space-x-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all
            ${selectedStudents.length > 0
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100 hover:bg-indigo-700 active:scale-95'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
        >
          <Trash2 size={16} />
          <span>Delete{selectedStudents.length > 0 ? ` (${selectedStudents.length})` : ''}</span>
        </button>
      </div>

      {/* ── Data Table Card ───────────────────────────────────── */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

        {/* Table Toolbar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-white gap-4 flex-wrap">
          {/* Left: Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="pl-3 pr-4 py-2 bg-white border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all w-48 placeholder:text-gray-400"
              value={tableSearch}
              onChange={(e) => setTableSearch(e.target.value)}
            />
          </div>

          {/* Right: rows-per-page + export icons */}
          <div className="flex items-center space-x-3">
            {/* Rows Per Page */}
            <div className="flex items-center space-x-1">
              <select
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(e.target.value)}
                className="pl-2 pr-7 py-1.5 border border-gray-200 rounded-md text-sm font-medium bg-white focus:outline-none appearance-none text-gray-600 cursor-pointer"
              >
                {['10', '25', '50', '100'].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
              <ChevronDown size={14} className="-ml-6 text-gray-400 pointer-events-none" />
            </div>

            {/* Export Icons */}
            <div className="flex items-center space-x-0.5">
              {exportIcons.map((Icon, i) => (
                <button
                  key={i}
                  className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-all"
                  title={['Copy', 'Excel', 'CSV', 'PDF', 'Print', 'Column visibility', 'Table'][i]}
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-gray-100 bg-white">
                {/* Checkbox header */}
                <th className="px-5 py-3.5 w-10">
                  <div
                    onClick={toggleSelectAll}
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center cursor-pointer transition-all
                      ${isAllSelected
                        ? 'bg-indigo-600 border-indigo-600'
                        : isIndeterminate
                          ? 'bg-indigo-100 border-indigo-400'
                          : 'bg-white border-gray-300 hover:border-indigo-400'}
                    `}
                  >
                    {isAllSelected && (
                      <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                        <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                    {isIndeterminate && !isAllSelected && (
                      <span className="block w-2 h-0.5 bg-indigo-600 rounded" />
                    )}
                  </div>
                </th>
                {[
                  { label: '#' },
                  { label: 'Admission No' },
                  { label: 'Student Name' },
                  { label: 'Class' },
                  { label: 'Date Of Birth' },
                  { label: 'Gender' },
                  { label: 'Category' },
                  { label: 'Mobile Number' },
                ].map((col) => (
                  <th
                    key={col.label}
                    className="px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap"
                  >
                    <div className="flex items-center space-x-1">
                      <span>{col.label}</span>
                      {col.label !== '#' && (
                        <span className="flex flex-col -space-y-1 opacity-40">
                          <svg width="6" height="4" viewBox="0 0 6 4" fill="currentColor"><path d="M3 0L6 4H0L3 0Z"/></svg>
                          <svg width="6" height="4" viewBox="0 0 6 4" fill="currentColor"><path d="M3 4L0 0H6L3 4Z"/></svg>
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-5 py-12 text-center text-sm text-gray-400">
                    No students found.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((s, index) => {
                  const isSelected = selectedStudents.includes(s.id);
                  return (
                    <tr
                      key={s.id}
                      onClick={() => toggleSelectStudent(s.id)}
                      className={`cursor-pointer transition-colors hover:bg-indigo-50/40
                        ${isSelected ? 'bg-indigo-50/60' : 'bg-white'}`}
                    >
                      {/* Checkbox */}
                      <td className="px-5 py-3.5">
                        <div
                          className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all
                            ${isSelected
                              ? 'bg-indigo-600 border-indigo-600'
                              : 'bg-white border-gray-300'}`}
                        >
                          {isSelected && (
                            <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                              <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>
                      </td>

                      {/* Row # */}
                      <td className="px-5 py-3.5 text-sm text-gray-500 font-medium">
                        {index + 1}
                      </td>

                      {/* Admission No */}
                      <td className="px-5 py-3.5 text-sm font-medium text-gray-700">
                        {s.admissionNo}
                      </td>

                      {/* Student Name — link style like reference */}
                      <td className="px-5 py-3.5 text-sm font-semibold text-indigo-600 hover:text-indigo-800">
                        {s.studentName}
                      </td>

                      {/* Class */}
                      <td className="px-5 py-3.5 text-sm text-gray-600">
                        {s.class}
                      </td>

                      {/* DOB */}
                      <td className="px-5 py-3.5 text-sm text-gray-600">
                        {s.dob}
                      </td>

                      {/* Gender */}
                      <td className="px-5 py-3.5 text-sm text-gray-600">
                        {s.gender}
                      </td>

                      {/* Category */}
                      <td className="px-5 py-3.5 text-sm text-gray-600">
                        {s.category || <span className="text-gray-300">—</span>}
                      </td>

                      {/* Mobile */}
                      <td className="px-5 py-3.5 text-sm text-gray-600 font-mono">
                        {s.mobile}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* ── Pagination Footer ────────────────────────────────── */}
        <div className="px-5 py-3.5 border-t border-gray-100 flex items-center justify-between bg-white flex-wrap gap-3">
          <p className="text-xs text-gray-500">
            Showing {filteredStudents.length === 0 ? 0 : 1} to {filteredStudents.length} of {filteredStudents.length} entries
          </p>

          {/* Page buttons */}
          <div className="flex items-center space-x-1">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-gray-400 hover:border-indigo-400 hover:text-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all text-xs"
            >
              <ChevronLeft size={14} />
            </button>

            <button className="w-7 h-7 flex items-center justify-center rounded bg-indigo-600 text-white text-xs font-bold shadow-sm">
              {currentPage}
            </button>

            <button
              disabled
              onClick={() => setCurrentPage(p => p + 1)}
              className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-gray-400 hover:border-indigo-400 hover:text-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all text-xs"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Delete Confirm Modal ─────────────────────────────── */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm mx-4 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-center w-14 h-14 bg-rose-50 rounded-2xl mx-auto">
              <Trash2 size={26} className="text-rose-500" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-gray-900">Confirm Bulk Delete</h3>
              <p className="text-sm text-gray-500">
                You are about to permanently delete{' '}
                <span className="font-bold text-rose-600">{selectedStudents.length}</span> student record(s).
                This action cannot be undone.
              </p>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-5 py-2.5 bg-gray-100 text-gray-600 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 flex items-center justify-center space-x-2 px-5 py-2.5 bg-rose-600 text-white rounded-xl text-sm font-semibold hover:bg-rose-700 active:scale-95 transition-all shadow-lg shadow-rose-100"
              >
                <Trash2 size={15} />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
