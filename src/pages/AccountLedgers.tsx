import { useState } from 'react';
import {
    Plus,
    Search,
    Filter,
    BookOpen,
    MoreVertical,
    Edit,
    Trash2,
    ChevronRight,
    Save,
    X,
} from 'lucide-react';

const AccountLedgers = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const [ledgers] = useState([
        { id: 'LD-1021', name: 'State Bank of India', group: 'Bank Accounts', balance: '₹12,45,000', type: 'Debit', status: 'Active' },
        { id: 'LD-1025', name: 'Petty Cash', group: 'Cash-in-Hand', balance: '₹15,000', type: 'Debit', status: 'Active' },
        { id: 'LD-1028', name: 'Software Licenses', group: 'Fixed Assets', balance: '₹8,50,000', type: 'Debit', status: 'Active' },
        { id: 'LD-1032', name: 'Accrued Rent', group: 'Current Liabilities', balance: '₹45,000', type: 'Credit', status: 'Active' },
        { id: 'LD-1035', name: 'Sales Revenue', group: 'Direct Incomes', balance: '₹22,12,000', type: 'Credit', status: 'Active' },
    ]);

    return (
        <></>
    );
};

export default AccountLedgers;
