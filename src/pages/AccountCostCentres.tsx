import { useState } from 'react';
import {
    Plus,
    Search,
    Filter,
    Target,
    MoreVertical,
    Edit,
    Trash2,
    Save,
    X,
    Activity
} from 'lucide-react';

const AccountCostCentres = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const [centres] = useState([
        { id: 'CC-ADM', name: 'Administration Dept.', type: 'Departmental', allocation: '45%', budget: '₹12,00,000', status: 'Active' },
        { id: 'CC-ACD', name: 'Academic Faculty', type: 'Departmental', allocation: '65%', budget: '₹45,00,000', status: 'Active' },
        { id: 'CC-MNT', name: 'Campus Maintenance', type: 'Operational', allocation: '25%', budget: '₹8,50,000', status: 'Active' },
        { id: 'CC-TRS', name: 'Transport Fleet', type: 'Operational', allocation: '30%', budget: '₹15,00,000', status: 'Active' },
        { id: 'CC-LIB', name: 'Library Resources', type: 'Resource', allocation: '15%', budget: '₹4,50,000', status: 'Active' },
    ]);

    return (
        <></>
    );
};

export default AccountCostCentres;
