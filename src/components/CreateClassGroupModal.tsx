import { useState, useEffect } from 'react';
import { X, LayoutGrid, Tag, AlignLeft, Loader2, Plus, CheckCircle2 } from 'lucide-react';
import { useNotification } from '../contexts/NotificationContext';

interface CreateClassGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { groupName: string; description: string }) => Promise<void>;
  loading?: boolean;
}

export default function CreateClassGroupModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  loading = false 
}: CreateClassGroupModalProps) {
  const { showSuccess, showError } = useNotification();
  const [formData, setFormData] = useState({
    groupName: '',
    description: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setFormData({
        groupName: '',
        description: ''
      });
      setErrors({});
    }
  }, [isOpen]);

  const handleInputChange = (field: 'groupName' | 'description', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.groupName.trim()) {
      newErrors.groupName = 'Class group name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit(formData);
      showSuccess('Class group created successfully!');
      onClose();
    } catch (error) {
      console.error('Form submission error:', error);
      showError('Failed to create class group. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-[2rem] shadow-2xl max-w-lg w-full overflow-hidden transform transition-all duration-500 ease-out animate-in zoom-in-95 slide-in-from-bottom-8">
        {/* Header with Premium Gradient */}
        <div className="relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white p-8">
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center space-x-5">
              <div className="p-3.5 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20 shadow-lg group-hover:scale-110 transition-transform duration-500">
                <LayoutGrid className="text-white" size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-black tracking-tight flex items-center">
                  CREATE CLASS GROUP
                </h3>
                <p className="text-indigo-100/80 text-[10px] font-bold uppercase tracking-[0.2em] mt-1 font-mono">
                  Academic Organization Architecture
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2.5 hover:bg-white/10 rounded-xl transition-all duration-300 group"
              disabled={loading}
            >
              <X size={22} className="text-white group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>
          
          {/* Abstract background decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-400/10 rounded-full -ml-8 -mb-8 blur-xl"></div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-8 space-y-8 bg-white">
          <div className="space-y-6">
            {/* Input Field: Group Name */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between ml-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center">
                  <Tag size={12} className="mr-2 text-indigo-400" />
                  Class Group Name <span className="text-rose-500 ml-1">*</span>
                </label>
                {errors.groupName && (
                   <span className="text-rose-500 text-[9px] font-bold uppercase tracking-tight animate-pulse">
                     {errors.groupName}
                   </span>
                )}
              </div>
              <div className="relative group/input">
                <input
                  type="text"
                  value={formData.groupName}
                  onChange={(e) => handleInputChange('groupName', e.target.value)}
                  className={`w-full px-6 py-4.5 bg-gray-50/50 border-2 rounded-[1.25rem] text-sm font-bold text-gray-700 outline-none focus:ring-8 focus:ring-indigo-500/5 transition-all duration-300 placeholder:text-gray-300 placeholder:font-medium ${
                    errors.groupName 
                      ? 'border-rose-200 bg-rose-50/30 text-rose-600' 
                      : 'border-gray-100 hover:border-indigo-100 focus:border-indigo-500'
                  }`}
                  placeholder="Ex: Primary Wing / Senior Secondary"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Input Field: Description */}
            <div className="space-y-2.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center">
                <AlignLeft size={12} className="mr-2 text-indigo-400" />
                Strategic Description
              </label>
              <div className="relative group/input">
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  className="w-full px-6 py-5 bg-gray-50/50 border-2 border-gray-100 rounded-[1.25rem] text-sm font-bold text-gray-700 outline-none focus:border-indigo-500 focus:ring-8 focus:ring-indigo-500/5 transition-all duration-300 resize-none hover:border-indigo-100 placeholder:text-gray-300 placeholder:font-medium"
                  placeholder="Define the objectives for this academic group..."
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          {/* Footer Info Box */}
          <div className="p-5 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 rounded-2xl border border-indigo-100/50 flex items-start space-x-4">
             <div className="p-2 bg-white rounded-xl shadow-sm text-indigo-600">
                <CheckCircle2 size={16} />
             </div>
             <p className="text-[10px] text-gray-500 font-bold leading-relaxed">
                Groups enable categorized financial reporting and specialized academic tracking across multiple grades. Ensure nomenclature consistency.
             </p>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-8 py-4.5 text-[11px] font-black uppercase tracking-widest text-gray-500 bg-gray-50 border-2 border-gray-100 rounded-2xl hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-100 transition-all duration-300 active:scale-95"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-[1.5] px-8 py-4.5 text-[11px] font-black uppercase tracking-[0.15em] text-white bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-2xl hover:from-indigo-700 hover:to-indigo-800 focus:outline-none focus:ring-8 focus:ring-indigo-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 shadow-xl shadow-indigo-100 transform active:scale-95 group"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>Commit Group</span>
                  <Plus size={18} className="group-hover:rotate-90 transition-transform duration-500" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Brand Bottom Lip */}
        <div className="h-1.5 bg-indigo-600/10">
           <div className="h-full bg-indigo-600 w-1/3 blur-sm"></div>
        </div>
      </div>
    </div>
  );
}
