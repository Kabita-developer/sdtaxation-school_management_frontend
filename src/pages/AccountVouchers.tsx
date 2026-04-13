import { useState } from 'react';
import {
    Plus,
    Search,
    Filter,
    FileText,
    MoreVertical,
    Edit,
    Trash2,
    Save,
    X
} from 'lucide-react';

const AccountVouchers = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const [vouchers] = useState([
        { id: 'V-TYPE-01', name: 'Sales Payment Receipt', type: 'Receipt', prefix: 'REC', suffix: '2025', status: 'Active' },
        { id: 'V-TYPE-02', name: 'Vendor Payment Voucher', type: 'Payment', prefix: 'PAY', suffix: '2025', status: 'Active' },
        { id: 'V-TYPE-03', name: 'Journal Adjustment', type: 'Journal', prefix: 'JRN', suffix: 'GEN', status: 'Active' },
        { id: 'V-TYPE-04', name: 'Cash Contra Transfer', type: 'Contra', prefix: 'CON', suffix: 'BNK', status: 'Active' },
    ]);

    return (
        <></>
    );
};

export default AccountVouchers;
