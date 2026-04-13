import { useState } from 'react';
import {
    Plus,
    Search,
    Filter,
    FolderTree,
    MoreVertical,
    Edit,
    Trash2,
    ChevronRight,
    Save,
    X,
} from 'lucide-react';

const AccountGroups = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const [groups] = useState([
        { id: 'GRP-001', name: 'Fixed Assets', parent: 'Primary', type: 'Asset', status: 'Active' },
        { id: 'GRP-002', name: 'Current Liabilities', parent: 'Primary', type: 'Liability', status: 'Active' },
        { id: 'GRP-003', name: 'Direct Expenses', parent: 'Primary', type: 'Expense', status: 'Active' },
        { id: 'GRP-004', name: 'Indirect Incomes', parent: 'Primary', type: 'Income', status: 'Active' },
        { id: 'GRP-005', name: 'Bank Accounts', parent: 'Current Assets', type: 'Asset', status: 'Active' },
    ]);

    return (
        <></>
    );
};

export default AccountGroups;
