import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import LogoutConfirmation from './LogoutConfirmation';
import {
  Home,
  Settings,
  User,
  LogOut,
  Menu,
  X,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Lock,
  CheckSquare,
  Users2,
  Database,
  Receipt,
  UserCircle,
  Wallet,
  BarChart,
  UserPlus,
  Video,
  Eye,
  Plus,
  Warehouse,
  ShoppingCart,
  Truck,
  FileText,
  Package,
  BarChart3,
  Search as SearchIcon,
  ArrowRightLeft
} from 'lucide-react';

import { LucideIcon } from 'lucide-react';

export interface HeaderSubMenu {
  label: string;
  onClick: () => void;
  icon?: LucideIcon;
}

export interface HeaderShortcut {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  variant?: 'primary' | 'orange' | 'white';
  subMenu?: HeaderSubMenu[];
}

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  shortcuts?: HeaderShortcut[];
}

// ────────────────────────────────────────────────────────────
// Self-contained SubMenu dropdown — avoids ref/event collision
// ────────────────────────────────────────────────────────────
interface SubMenuButtonProps {
  s: HeaderShortcut;
  bgColor: string;
  textColor: string;
  themeName: string;
}

function SubMenuButton({ s, bgColor, textColor, themeName }: SubMenuButtonProps) {
  const [open, setOpen] = useState(false);
  const [dropPos, setDropPos] = useState({ top: 0, left: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);
  const Icon = s.icon;

  const calcPos = () => {
    if (btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      setDropPos({ top: r.bottom + 6, left: r.left });
    }
  };

  const toggle = () => {
    calcPos();
    setOpen((prev) => !prev);
  };

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onMouseDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (
        btnRef.current?.contains(t) ||
        dropRef.current?.contains(t)
      ) return;
      setOpen(false);
    };
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, [open]);

  // Reposition on scroll / resize
  useEffect(() => {
    if (!open) return;
    const update = () => calcPos();
    window.addEventListener('scroll', update, true);
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update);
    };
  }, [open]);

  return (
    <div className="relative">
      <button
        ref={btnRef}
        type="button"
        onClick={toggle}
        className={`flex items-center gap-1.5 px-3 py-1.5 ${bgColor} ${textColor} ${themeName === 'white' ? 'border border-gray-300' : ''
          } rounded-md text-xs font-bold hover:opacity-90 transition-all whitespace-nowrap`}
      >
        <Icon size={14} />
        <span>{s.label}</span>
        <ChevronDown
          size={13}
          className={`ml-0.5 transition-transform duration-300 ${open ? 'rotate-180' : 'rotate-0'}`}
        />
      </button>

      {/* Fixed-position dropdown — escapes overflow-x-auto clipping in header */}
      {open && (
        <div
          ref={dropRef}
          style={{
            position: 'fixed',
            top: dropPos.top,
            left: dropPos.left,
            width: 260,
            zIndex: 999999,
          }}
          className="bg-white border border-gray-100 rounded-xl shadow-2xl overflow-hidden"
        >

          {/* Menu items */}
          <div className="py-1">
            {s.subMenu!.map((sub, i) => {
              const SubIcon = sub.icon;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => { sub.onClick(); setOpen(false); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors border-b border-gray-50 last:border-0 group"
                >
                  {SubIcon ? (
                    <SubIcon size={14} className="text-gray-400 group-hover:text-indigo-500 flex-shrink-0 transition-colors" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-indigo-500 flex-shrink-0 transition-colors" />
                  )}
                  <span className="text-left leading-tight">{sub.label}</span>
                  <ChevronRight size={12} className="ml-auto text-gray-300 group-hover:text-indigo-400 flex-shrink-0 transition-colors" />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}


interface YearSelectorButtonProps {
  years: string[];
  selectedYear: string;
  onSelect: (y: string) => void;
  bgColor: string;
  textColor: string;
  themeName: string;
  itemClasses: string;
}

function YearSelectorButton({ years, selectedYear, onSelect, bgColor, textColor, themeName, itemClasses }: YearSelectorButtonProps) {
  const [open, setOpen] = useState(false);
  const [dropPos, setDropPos] = useState({ top: 0, left: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  const calcPos = () => {
    if (btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      setDropPos({ top: r.bottom + 6, left: r.left });
    }
  };

  const toggle = () => {
    calcPos();
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!open) return;
    const onMouseDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (btnRef.current?.contains(t) || dropRef.current?.contains(t)) return;
      setOpen(false);
    };
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const update = () => calcPos();
    window.addEventListener('scroll', update, true);
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update);
    };
  }, [open]);

  return (
    <div className="relative">
      <button 
        ref={btnRef}
        onClick={toggle}
        className={`flex items-center space-x-2 px-3 py-1.5 border ${themeName === 'white' ? 'border-gray-300' : 'border-transparent'} rounded-md text-sm ${bgColor} ${textColor} font-medium whitespace-nowrap hover:opacity-90`}
      >
        <span>{selectedYear}</span>
        <ChevronDown size={14} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          ref={dropRef}
          style={{
            position: 'fixed',
            top: dropPos.top,
            left: dropPos.left,
            width: 140,
            zIndex: 999999,
          }}
          className="max-h-64 overflow-y-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-1"
        >
          {years.map((year) => (
            <button
              key={year}
              onClick={() => {
                onSelect(year);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors ${
                selectedYear === year 
                  ? 'bg-gray-100 text-gray-900 font-bold dark:bg-gray-700 dark:text-white' 
                  : itemClasses
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Layout({ children, title, shortcuts = [] }: LayoutProps) {
  const { user, logout } = useAuth();
  const { theme, setTheme, availableThemes } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const [selectedYear, setSelectedYear] = useState('2025 - 26');

  const getFinancialYears = () => {
    const years = [];
    for (let i = 2010; i <= 2098; i++) {
       years.push(`${i} - ${(i + 1).toString().slice(2)}`);
    }
    return years;
  };
  const financialYears = getFinancialYears();

  const toggleMenu = (label: string) => {
    setExpandedMenus(prev => 
      prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]
    );
  };

  // Get active menu item classes based on theme
  const getActiveMenuClasses = (isActive: boolean) => {
    if (!isActive) {
      // White theme needs black text, others need white text
      if (theme.name === 'white') {
        return 'text-gray-900 hover:bg-gray-100';
      }
      return 'text-white hover:bg-white hover:bg-opacity-10';
    }

    const activeClassMap: Record<string, string> = {
      blue: 'bg-white text-blue-600 rounded-lg border-2 border-black',
      purple: 'bg-white text-purple-600 rounded-lg border-2 border-black',
      green: 'bg-white text-green-600 rounded-lg border-2 border-black',
      orange: 'bg-white text-orange-600 rounded-lg border-2 border-black',
      red: 'bg-white text-red-600 rounded-lg border-2 border-black',
      indigo: 'bg-white text-indigo-600 rounded-lg border-2 border-black',
      black: 'bg-white text-gray-900 rounded-lg border-2 border-black',
      pink: 'bg-white text-pink-600 rounded-lg border-2 border-black',
      teal: 'bg-white text-teal-600 rounded-lg border-2 border-black',
      cyan: 'bg-white text-cyan-600 rounded-lg border-2 border-black',
      white: 'bg-gray-100 text-gray-900 rounded-lg border-2 border-black',
    };

    return activeClassMap[theme.name] || activeClassMap.blue;
  };

  // Get inactive icon color classes
  const getInactiveIconClasses = (isActive: boolean) => {
    if (isActive) {
      const iconColorMap: Record<string, string> = {
        blue: 'text-blue-600',
        purple: 'text-purple-600',
        green: 'text-green-600',
        orange: 'text-orange-600',
        red: 'text-red-600',
        indigo: 'text-indigo-600',
        black: 'text-gray-900',
        pink: 'text-pink-600',
        teal: 'text-teal-600',
        cyan: 'text-cyan-600',
        white: 'text-gray-900',
      };
      return iconColorMap[theme.name] || iconColorMap.blue;
    }
    // White theme needs black text, others need white text
    if (theme.name === 'white') {
      return 'text-gray-900';
    }
    return 'text-white';
  };

  // Get dropdown menu item classes based on theme
  const getDropdownItemClasses = () => {
    const itemClassMap: Record<string, string> = {
      blue: 'text-gray-700 hover:bg-blue-50 hover:text-blue-600',
      purple: 'text-gray-700 hover:bg-purple-50 hover:text-purple-600',
      green: 'text-gray-700 hover:bg-green-50 hover:text-green-600',
      orange: 'text-gray-700 hover:bg-orange-50 hover:text-orange-600',
      red: 'text-gray-700 hover:bg-red-50 hover:text-red-600',
      indigo: 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600',
      black: 'text-gray-700 hover:bg-gray-50 hover:text-gray-900',
      pink: 'text-gray-700 hover:bg-pink-50 hover:text-pink-600',
      teal: 'text-gray-700 hover:bg-teal-50 hover:text-teal-600',
      cyan: 'text-gray-700 hover:bg-cyan-50 hover:text-cyan-600',
      white: 'text-gray-700 hover:bg-gray-50 hover:text-gray-900',
    };
    return itemClassMap[theme.name] || itemClassMap.blue;
  };

  // Get dropdown icon color classes based on theme
  const getDropdownIconClasses = () => {
    const iconClassMap: Record<string, string> = {
      blue: 'text-blue-600',
      purple: 'text-purple-600',
      green: 'text-green-600',
      orange: 'text-orange-600',
      red: 'text-red-600',
      indigo: 'text-indigo-600',
      black: 'text-gray-900',
      pink: 'text-pink-600',
      teal: 'text-teal-600',
      cyan: 'text-cyan-600',
      white: 'text-gray-900',
    };
    return iconClassMap[theme.name] || iconClassMap.blue;
  };

  // Get sidebar header gradient classes
  const getSidebarHeaderClasses = () => {
    const headerClassMap: Record<string, string> = {
      blue: 'bg-gradient-to-r from-blue-600 to-blue-700',
      purple: 'bg-gradient-to-r from-purple-600 to-purple-700',
      green: 'bg-gradient-to-r from-green-600 to-green-700',
      orange: 'bg-gradient-to-r from-orange-600 to-orange-700',
      red: 'bg-gradient-to-r from-red-600 to-red-700',
      indigo: 'bg-gradient-to-r from-indigo-600 to-indigo-700',
      black: 'bg-gradient-to-r from-gray-900 to-black',
      pink: 'bg-gradient-to-r from-pink-600 to-pink-700',
      teal: 'bg-gradient-to-r from-teal-600 to-teal-700',
      cyan: 'bg-gradient-to-r from-cyan-600 to-cyan-700',
      white: 'bg-white border-b border-gray-300',
    };

    return headerClassMap[theme.name] || headerClassMap.blue;
  };

  // Get sidebar background gradient classes
  const getSidebarBgClasses = () => {
    const sidebarBgMap: Record<string, string> = {
      blue: 'bg-gradient-to-b from-blue-600 to-blue-700',
      purple: 'bg-gradient-to-b from-purple-600 to-purple-700',
      green: 'bg-gradient-to-b from-green-600 to-green-700',
      orange: 'bg-gradient-to-b from-orange-600 to-orange-700',
      red: 'bg-gradient-to-b from-red-600 to-red-700',
      indigo: 'bg-gradient-to-b from-indigo-600 to-indigo-700',
      black: 'bg-gradient-to-b from-gray-900 to-black',
      pink: 'bg-gradient-to-b from-pink-600 to-pink-700',
      teal: 'bg-gradient-to-b from-teal-600 to-teal-700',
      cyan: 'bg-gradient-to-b from-cyan-600 to-cyan-700',
      white: 'bg-white border-r border-gray-300',
    };

    return sidebarBgMap[theme.name] || sidebarBgMap.blue;
  };

  // Get page background color classes
  const getPageBgClasses = () => {
    const pageBgMap: Record<string, string> = {
      blue: 'bg-blue-50',
      purple: 'bg-purple-50',
      green: 'bg-green-50',
      orange: 'bg-orange-50',
      red: 'bg-red-50',
      indigo: 'bg-indigo-50',
      black: 'bg-gray-50',
      pink: 'bg-pink-50',
      teal: 'bg-teal-50',
      cyan: 'bg-cyan-50',
      white: 'bg-white',
    };

    return pageBgMap[theme.name] || pageBgMap.blue;
  };

  // Get theme-based background color class
  const getThemeBgClass = () => {
    const bgMap: Record<string, string> = {
      blue: 'bg-blue-600',
      purple: 'bg-purple-600',
      green: 'bg-green-600',
      orange: 'bg-orange-600',
      red: 'bg-red-600',
      indigo: 'bg-indigo-600',
      black: 'bg-gray-900',
      pink: 'bg-pink-600',
      teal: 'bg-teal-600',
      cyan: 'bg-cyan-600',
      white: 'bg-white',
    };
    return bgMap[theme.name] || 'bg-blue-600';
  };

  // Get theme-based border color class
  const getThemeBorderClass = () => {
    const borderMap: Record<string, string> = {
      blue: 'border-blue-600',
      purple: 'border-purple-600',
      green: 'border-green-600',
      orange: 'border-orange-600',
      red: 'border-red-600',
      indigo: 'border-indigo-600',
      black: 'border-gray-900',
      pink: 'border-pink-600',
      teal: 'border-teal-600',
      cyan: 'border-cyan-600',
      white: 'border-gray-300',
    };
    return borderMap[theme.name] || 'border-blue-600';
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirmation(true);
  };

  const handleLogoutConfirm = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };

    if (userDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userDropdownOpen]);

  // Format date for last login display
  const formatLastLogin = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes} IST`;
  };

  const menuItems = [
    { path: '/dashboard', label: 'School Overview', icon: Home },
    { 
      path: '#', 
      label: 'Student Information', 
      icon: Users2,
      subMenu: [
        { path: '/student_information/admission-create', label: 'Student Admission' },
        { path: '/student_information/student-list', label: 'Student Details' },
        { path: '/fees-management/academy/disabled-students', label: 'Disabled Students' },
        { path: '/fees-management/academy/bulk-delete', label: 'Bulk Delete' },
        { path: '/crm/Labels', label: 'Student Categories' },
        { path: '/fees-management/academy/student-house', label: 'Student House' },
        { path: '/fees-management/academy/disable-reason', label: 'Disable Reason' },
      ]
    },
    { 
      path: '#', 
      label: 'Transport', 
      icon: Truck,
      subMenu: [
        { path: '/transport/fees_master', label: 'Fees Master' },
        { path: '/transport/pickup-point', label: 'Pickup Point' },
        { path: '/transport/routes', label: 'Routes' },
        { path: '/transport/vehicles', label: 'Vehicles' },
        { path: '/transport/assign_vehicle', label: 'Assign Vehicle' },
        { path: '/transport/route_pickup_point', label: 'Route Pickup Point' },
        { path: '/fees-management/Transport_fee#student_transport_fees', label: 'Student Transport Fees' },
      ]
    },
    { 
      path: '#', 
      label: 'Fees Management', 
      icon: Receipt,
      subMenu: [
        { path: '/fees-management/collect-fees', label: 'Collect Fees' },
        { path: '/fees-management/search-fees-payment', label: 'Search Fees Payment' },
        { path: '/fees-management/search-due-fees', label: 'Search Due Fees' },
        { path: '/fees-management/fees-discount', label: 'Fees Discount' },
        { path: '/fees-management/fees-carry-forward', label: 'Fees Carry Forward' },
        { path: '/fees-management/fees-reminder', label: 'Fees Reminder' },
        { path: '/fees-management/list-of-classes', label: 'List of Classes' },
      ]
    },
    { 
      path: '#', 
      label: 'Master', 
      icon: Database,
      subMenu: [
        { path: '/master/account_create', label: 'Account Create' },
        { path: '/master/academy', label: 'Academics' },
      ]
    },
    { 
      path: '#', 
      label: 'ERP', 
      icon: Package,
      subMenu: [
        { path: '/erp/credit-note', label: 'Credit Note' },
        { path: '/erp/debit-note', label: 'Debit Note' },
      ]
    },
    { path: '/daybook', label: 'Daybook', icon: FileText },
    { path: '/summary', label: 'Summary', icon: BarChart3 },
    { path: '/reports', label: 'Reports', icon: BarChart },
    { path: '/calendar', label: 'Calendar', icon: Calendar },
    { path: '/setting', label: 'Setting', icon: Settings },
  ];

  const renderShortcuts = () => {
    if (!shortcuts || shortcuts.length === 0) return null;
    const bgColor = getThemeBgClass();
    const textColor = theme.name === 'white' ? 'text-gray-900' : 'text-white';

    return (
      <div className="flex items-center space-x-2">
        {shortcuts.map((s, index) => {
          const Icon = s.icon;

          // Shortcut WITH submenu → use the self-contained SubMenuButton
          if (s.subMenu && s.subMenu.length > 0) {
            return (
              <SubMenuButton
                key={`${s.label}-${index}`}
                s={s}
                bgColor={bgColor}
                textColor={textColor}
                themeName={theme.name}
              />
            );
          }

          // Plain shortcut button
          return (
            <button
              key={`${s.label}-${index}`}
              onClick={s.onClick}
              className={`flex items-center space-x-1 px-3 py-1.5 ${bgColor} ${textColor} ${theme.name === 'white' ? 'border border-gray-300' : ''
                } rounded-md text-sm font-medium hover:opacity-90 transition-all whitespace-nowrap`}
            >
              <Icon size={14} className="mr-1" />
              <span>{s.label}</span>
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className={`flex h-screen ${getPageBgClasses()} overflow-hidden`}>
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 ${getSidebarBgClasses()} shadow-lg transform transition-all duration-300 ease-in-out
        lg:relative lg:translate-x-0 flex flex-col h-screen
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${sidebarOpen ? 'w-64' : 'w-16 lg:w-16'}
      `}>
        <div className={`flex items-center ${sidebarOpen ? 'justify-between' : 'justify-center'} h-16 px-4 flex-shrink-0 ${getSidebarHeaderClasses()} ${!sidebarOpen ? 'px-2' : ''
          }`}>
          {sidebarOpen && (
            <h1 className={`text-xl font-bold whitespace-nowrap ${theme.name === 'white' ? 'text-gray-900' : 'text-white'}`}>Skystar Soluation</h1>
          )}
          {!sidebarOpen && (
            <div className={`font-bold text-lg ${theme.name === 'white' ? 'text-gray-900' : 'text-white'}`}>SS</div>
          )}
          <button
            onClick={() => setMobileMenuOpen(false)}
            className={`lg:hidden p-1 ${theme.name === 'white' ? 'text-gray-900 hover:text-gray-700' : 'text-white hover:text-gray-200'}`}
          >
            <X size={24} />
          </button>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`hidden lg:block p-1 ${theme.name === 'white' ? 'text-gray-900 hover:text-gray-700' : 'text-white hover:text-gray-200'}`}
          >
            {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        <div className="flex-1 px-2 py-6 overflow-y-auto overflow-x-hidden min-h-0">
          <nav className="space-y-2">
            <div className="pb-2">
              {sidebarOpen && (
                <h3 className={`text-xs font-semibold uppercase tracking-wider mb-3 px-2 ${theme.name === 'white' ? 'text-gray-700' : 'text-white text-opacity-70'}`}>
                  Main Menu
                </h3>
              )}
              {menuItems.map((item) => {
                const Icon = item.icon;
                const hasSubMenu = !!item.subMenu;
                const isExpanded = expandedMenus.includes(item.label);
                const isActive = location.pathname === item.path || (hasSubMenu && item.subMenu!.some(sub => location.pathname === sub.path));

                return (
                  <div key={item.label} className="w-full">
                    <button
                      onClick={() => {
                        if (hasSubMenu) {
                          toggleMenu(item.label);
                        } else {
                          navigate(item.path);
                          setMobileMenuOpen(false);
                        }
                      }}
                      className={`w-full flex items-center px-3 py-2.5 text-sm font-medium transition-all duration-200 group relative ${getActiveMenuClasses(isActive)} ${!sidebarOpen ? 'justify-center' : ''}`}
                      title={!sidebarOpen ? item.label : ''}
                    >
                      <Icon size={20} className={`${sidebarOpen ? 'mr-3' : ''} ${getInactiveIconClasses(isActive)}`} />
                      {sidebarOpen && (
                        <>
                          <span className={isActive ? '' : (theme.name === 'white' ? 'text-gray-900' : 'text-white')}>{item.label}</span>
                          {hasSubMenu && (
                            <div className="ml-auto">
                              {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                            </div>
                          )}
                        </>
                      )}
                      {!sidebarOpen && (
                        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                          {item.label}
                        </div>
                      )}
                    </button>

                    {/* SubMenu rendering */}
                    {sidebarOpen && hasSubMenu && isExpanded && (
                      <div className="mt-1 ml-4 space-y-1 border-l border-gray-100 pl-4">
                        {item.subMenu!.map((sub) => {
                          const isSubActive = location.pathname === sub.path;
                          return (
                            <button
                              key={sub.label}
                              onClick={() => {
                                navigate(sub.path);
                                setMobileMenuOpen(false);
                              }}
                              className={`w-full flex items-center px-3 py-1.5 text-sm font-semibold transition-all duration-200 rounded-md
                                ${isSubActive 
                                  ? (theme.name === 'white' ? 'bg-gray-200 text-gray-900' : 'bg-white bg-opacity-20 text-white') 
                                  : (theme.name === 'white' ? 'text-gray-600 hover:bg-gray-100 hover:text-gray-900' : 'text-white text-opacity-70 hover:bg-white hover:bg-opacity-10 hover:text-white')
                                }`}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-2 flex-shrink-0" />
                              <span className="truncate">{sub.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className={`bg-white dark:bg-gray-800 shadow-sm border-b ${getThemeBorderClass()} h-16 transition-colors duration-300`}>
          <div className="flex items-center justify-between px-6 h-full">
            {/* Top Row: Title and User Info */}

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className="lg:hidden text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <Menu size={24} />
                </button>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white whitespace-nowrap">{title}</h1>
              </div>

              {/* Shortcuts moved here */}
              <div className="hidden md:flex items-center space-x-3 overflow-x-auto no-scrollbar">
                <div className="flex items-center space-x-2">
                  <button className={`p-1.5 border ${theme.name === 'white' ? 'border-gray-300' : 'border-transparent'} rounded-md hover:opacity-90 ${getThemeBgClass()} ${theme.name === 'white' ? 'text-gray-900' : 'text-white'}`}>
                    <Eye size={18} />
                  </button>
                  <button className={`p-1.5 border ${theme.name === 'white' ? 'border-gray-300' : 'border-transparent'} rounded-md hover:opacity-90 ${getThemeBgClass()} ${theme.name === 'white' ? 'text-gray-900' : 'text-white'}`}>
                    <SearchIcon size={18} />
                  </button>
                </div>
                <YearSelectorButton 
                  years={financialYears} 
                  selectedYear={selectedYear} 
                  onSelect={setSelectedYear} 
                  bgColor={getThemeBgClass()} 
                  textColor={theme.name === 'white' ? 'text-gray-900' : 'text-white'} 
                  themeName={theme.name} 
                  itemClasses={getDropdownItemClasses()} 
                />
                <div className="flex items-center space-x-2">
                  {[
                    { label: 'Receipt', icon: Receipt, path: '/erp/receipt' },
                    { label: 'Payment', icon: Wallet, path: '/erp/payment' },
                    { label: 'Contra', icon: ArrowRightLeft, path: '/erp/contra' },
                    { label: 'Journal', icon: FileText, path: '/erp/journal' },
                    { label: 'Sale', icon: ShoppingCart, path: '/erp/sale' },
                    { label: 'Purchase', icon: Package, path: '/erp/purchase' },
                  ].map((s) => (
                    <button
                      key={s.label}
                      onClick={() => navigate(s.path)}
                      className={`flex items-center space-x-1 px-3 py-1.5 ${getThemeBgClass()} ${theme.name === 'white' ? 'text-gray-900' : 'text-white'} ${theme.name === 'white' ? 'border border-gray-300' : ''} rounded-md text-sm font-medium hover:opacity-90 transition-all whitespace-nowrap`}
                    >
                      <s.icon size={14} className="mr-1" />
                      <span>{s.label}</span>
                    </button>
                  ))}
                </div>
                {renderShortcuts()}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <Calendar size={16} />
                <span>{(() => {
                  const now = new Date();
                  const day = String(now.getDate()).padStart(2, '0');
                  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                  const month = monthNames[now.getMonth()];
                  const year = String(now.getFullYear()).slice(-2);
                  return `${day}/${month}/${year}`;
                })()}</span>
              </div>
              {title !== 'CRM' && (
                <div className="flex items-center space-x-3 relative" ref={userDropdownRef}>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center space-x-2 px-3 py-2 text-base text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <User size={18} />
                    <span className="font-medium">{user?.name || 'Kabita'}</span>
                    <ChevronDown
                      size={16}
                      className={`text-gray-500 dark:text-gray-400 transition-transform duration-200 ${userDropdownOpen ? 'rotate-180' : ''
                        }`}
                    />
                  </button>

                  {/* User Dropdown Menu */}
                  {userDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-bold">Last Logged In at</div>
                        <div className="text-sm text-gray-700 dark:text-gray-300 font-medium">{formatLastLogin()}</div>
                      </div>
                      <div className="py-2">
                        <button
                          onClick={() => {
                            navigate('/profile');
                            setUserDropdownOpen(false);
                          }}
                          className={`w-full flex items-center space-x-3 px-4 py-3 text-sm transition-colors ${getDropdownItemClasses()}`}
                        >
                          <User size={16} className={getDropdownIconClasses()} />
                          <span className="font-bold">My Profile</span>
                        </button>
                        <button
                          onClick={() => {
                            // Navigate to change password page or open modal
                            setUserDropdownOpen(false);
                            // Add change password functionality here
                          }}
                          className={`w-full flex items-center space-x-3 px-4 py-3 text-sm transition-colors ${getDropdownItemClasses()}`}
                        >
                          <Lock size={16} className={getDropdownIconClasses()} />
                          <span className="font-bold">Change Password</span>
                        </button>
                        <div className="relative">
                          {/* <button
                          onClick={() => setThemeMenuOpen(!themeMenuOpen)}
                          className={`w-full flex items-center justify-between px-4 py-3 text-sm transition-colors ${getDropdownItemClasses()}`}
                        > */}
                          {/* <div className="flex items-center space-x-3">
                            <Palette size={16} className={getDropdownIconClasses()} />
                            <span className="font-bold dark:text-gray-300">Theme Settings</span>
                          </div> */}
                          {/* <ChevronDown 
                            size={16} 
                            className={`text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
                              themeMenuOpen ? 'rotate-180' : ''
                            }`}
                          /> */}
                          {/* </button> */}
                          {themeMenuOpen && (
                            <div className="pl-4 pr-2 py-2 max-h-80 overflow-y-auto space-y-1">
                              {/* Dark Mode Toggle - Commented Out */}
                              {/* <button
                              onClick={() => {
                                toggleDarkMode();
                              }}
                              className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${
                                isDarkMode
                                  ? getDropdownItemClasses()
                                  : 'text-gray-600 hover:bg-gray-50'
                              }`}
                            >
                              <div className="flex items-center space-x-2">
                                {isDarkMode ? (
                                  <Moon size={16} className={getDropdownIconClasses()} />
                                ) : (
                                  <Sun size={16} className="text-gray-600" />
                                )}
                                <span className="font-medium">Dark Mode</span>
                              </div>
                              {isDarkMode && (
                                <div className={getDropdownIconClasses()}>
                                  <CheckSquare size={14} />
                                </div>
                              )}
                            </button> */}
                              {availableThemes.map((themeOption) => (
                                <button
                                  key={themeOption.name}
                                  onClick={() => {
                                    setTheme(themeOption.name);
                                    setThemeMenuOpen(false);
                                  }}
                                  className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${theme.name === themeOption.name
                                    ? getDropdownItemClasses()
                                    : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                  <div className="flex items-center space-x-2">
                                    <div
                                      className={`w-4 h-4 rounded-full ${(() => {
                                        const colorMap: Record<string, string> = {
                                          blue: 'bg-blue-600',
                                          purple: 'bg-purple-600',
                                          green: 'bg-green-600',
                                          orange: 'bg-orange-600',
                                          red: 'bg-red-600',
                                          indigo: 'bg-indigo-600',
                                          black: 'bg-gray-900',
                                          pink: 'bg-pink-600',
                                          teal: 'bg-teal-600',
                                          cyan: 'bg-cyan-600',
                                          white: 'bg-white border-2 border-gray-300',
                                        };
                                        return colorMap[themeOption.name] || 'bg-blue-600';
                                      })()
                                        }`}
                                    />
                                    <span className="font-medium">{themeOption.displayName}</span>
                                  </div>
                                  {theme.name === themeOption.name && (
                                    <div className={getDropdownIconClasses()}>
                                      <CheckSquare size={14} />
                                    </div>
                                  )}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            handleLogoutClick();
                          }}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut size={16} />
                          <span className="font-bold">Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>



          </div>
        </header>


        {/* Page content */}
        <main className={`flex-1 overflow-y-auto p-6 ${getPageBgClasses()}`}>
          {children}
        </main>
      </div>

      {/* Sidebar overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Logout Confirmation Dialog */}
      <LogoutConfirmation
        isOpen={showLogoutConfirmation}
        onClose={() => setShowLogoutConfirmation(false)}
        onConfirm={handleLogoutConfirm}
        userName={user?.name}
      />
    </div>
  );
}