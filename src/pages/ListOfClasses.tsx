import { ChevronRight, ChevronDown, School, GraduationCap, Users, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface TreeItem {
    id: string;
    label: string;
    type: 'category' | 'class' | 'section';
    color?: string;
    bgColor?: string; // Add bgColor property
    children?: TreeItem[];
}

export default function ListOfClasses() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [expanded, setExpanded] = useState<string[]>([]);

    // Animate open on mount
    useEffect(() => {
        setIsOpen(true);
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        setTimeout(() => navigate(-1), 300); // Navigate back after animation
    };

    const toggle = (id: string) => {
        setExpanded(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    // Tree structure with custom colors and backgrounds
    const treeData: TreeItem[] = [
        {
            id: 'pre-primary',
            label: 'Pre-Primary',
            type: 'category',
            color: 'text-blue-600',
            bgColor: 'bg-blue-50/60',
            children: [
                {
                    id: 'nursery',
                    label: 'Nursery',
                    type: 'class',
                    children: [
                        { id: 'phoolwari-a', label: 'PHOOLWARI A', type: 'section' },
                        { id: 'phoolwari-b', label: 'PHOOLWARI B', type: 'section' },
                    ]
                },
                {
                    id: 'jkg',
                    label: 'JKG',
                    type: 'class',
                    children: [
                        { id: 'jkg-a', label: 'A', type: 'section' },
                        { id: 'jkg-b', label: 'B', type: 'section' },
                    ]
                },
                {
                    id: 'skg',
                    label: 'SKG',
                    type: 'class',
                    children: [
                        { id: 'skg-a', label: 'A', type: 'section' },
                        { id: 'skg-b', label: 'B', type: 'section' },
                    ]
                }
            ]
        },
        {
            id: 'primary',
            label: 'Primary',
            type: 'category',
            color: 'text-red-600',
            bgColor: 'bg-red-50/50',
            children: [
                ...[1, 2, 3, 4, 5].map(num => ({
                    id: `class-${num}`,
                    label: `Class - ${num}`,
                    type: 'class' as const,
                    children: [
                        { id: `c${num}-a`, label: 'A', type: 'section' as const },
                        { id: `c${num}-b`, label: 'B', type: 'section' as const },
                    ]
                }))
            ]
        },
        {
            id: 'middle',
            label: 'Middle',
            type: 'category',
            color: 'text-emerald-600',
            bgColor: 'bg-emerald-50/60',
            children: [
                ...[6, 7, 8].map(num => ({
                    id: `class-${num}`,
                    label: `Class - ${num}`,
                    type: 'class' as const,
                    children: [
                        { id: `c${num}-a`, label: 'A', type: 'section' as const },
                    ]
                }))
            ]
        },
        {
            id: 'secondary',
            label: 'Secondary',
            type: 'category',
            color: 'text-gray-900',
            bgColor: 'bg-gray-100/50',
            children: [
                ...[9, 10].map(num => ({
                    id: `class-${num}`,
                    label: `Class - ${num}`,
                    type: 'class' as const,
                    children: [
                        { id: `c${num}-a`, label: 'A', type: 'section' as const },
                    ]
                }))
            ]
        },
        {
            id: 'higher-secondary',
            label: 'Higher Secondary',
            type: 'category',
            color: 'text-amber-600',
            bgColor: 'bg-amber-50/50',
            children: [
                ...[11, 12].map(num => ({
                    id: `class-${num}`,
                    label: `Class - ${num}`,
                    type: 'class' as const,
                    children: [
                        { id: `c${num}-a`, label: 'A', type: 'section' as const },
                        { id: `c${num}-b`, label: 'B', type: 'section' as const },
                    ]
                }))
            ]
        }
    ];

    const renderTree = (items: TreeItem[], level = 0) => {
        return items.map(item => {
            const isExpanded = expanded.includes(item.id);
            const hasChildren = item.children && item.children.length > 0;

            return (
                <div key={item.id} className="select-none">
                    <div 
                        onClick={() => hasChildren && toggle(item.id)}
                        className={`flex items-center py-2.5 px-4 rounded-xl transition-all cursor-pointer group mb-1.5 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:translate-x-[1px] active:shadow-none ${
                            level === 0 ? (item.bgColor || 'bg-gray-50/50 hover:bg-gray-100') : 
                            level === 1 ? 'hover:bg-gray-50' : 'hover:bg-purple-50'
                        }`}
                        style={{ marginLeft: `${level * 24}px` }}
                    >
                        <div className="w-6 h-6 flex items-center justify-center mr-2">
                            {hasChildren ? (
                                isExpanded ? <ChevronDown size={16} className="text-gray-400 group-hover:text-indigo-600" /> : <ChevronRight size={16} className="text-gray-400 group-hover:text-indigo-600" />
                            ) : null}
                        </div>
                        
                        <div className={`mr-3 ${
                            item.type === 'category' ? (item.color || 'text-indigo-600') : 
                            item.type === 'class' ? 'text-purple-600' : 'text-emerald-600'
                        }`}>
                            {item.type === 'category' ? <School size={18} strokeWidth={2} /> : 
                             item.type === 'class' ? <GraduationCap size={18} strokeWidth={2} /> : <Users size={16} strokeWidth={2} />}
                        </div>

                        <span className={`text-sm font-bold ${
                            item.type === 'category' ? (item.color || 'text-gray-900') : 
                            item.type === 'class' ? 'text-gray-800' : 'text-gray-500'
                        }`}>
                            {item.label}
                        </span>
                    </div>

                    {hasChildren && isExpanded && (
                        <div className="animate-in fade-in slide-in-from-top-1 duration-200">
                            {renderTree(item.children!, level + 1)}
                        </div>
                    )}
                </div>
            );
        });
    };

    return (
        <div className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
                onClick={handleClose}
            />

            {/* Sliding Drawer */}
            <div className={`relative w-[360px] h-full bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10 transition-all">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Hierarchy</h2>
                        <div className="flex items-center space-x-1 mt-1">
                            <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></div>
                            <span className="text-xs font-medium text-indigo-600">Directory Tree</span>
                        </div>
                    </div>
                    <button 
                        onClick={handleClose}
                        className="p-2 rounded-xl bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all border border-gray-100 shadow-sm overflow-hidden active:scale-95 group"
                    >
                        <X size={20} className="transition-transform group-hover:rotate-90 duration-300" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                    <div className="space-y-1">
                        {renderTree(treeData)}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                    <div className="flex flex-col space-y-3">
                        <div className="flex items-center justify-between text-xs font-semibold text-gray-400">
                            <span>Last Updated</span>
                            <span>{new Date().toLocaleDateString('en-GB')}</span>
                        </div>
                        <div className="flex space-x-3">
                             <div className="flex-1 p-3 bg-indigo-50 rounded-xl text-center">
                                <span className="text-[10px] font-medium text-indigo-400 block mb-1">Total Category</span>
                                <span className="text-sm font-bold text-indigo-700">4</span>
                             </div>
                             <div className="flex-1 p-3 bg-purple-50 rounded-xl text-center">
                                <span className="text-[10px] font-medium text-purple-400 block mb-1">Total Class</span>
                                <span className="text-sm font-bold text-purple-700">15+</span>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
