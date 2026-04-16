import { Outlet, useNavigate } from 'react-router-dom';
import Layout from './Layout';
import {
    Plus,
    Download,
    History,
    BookOpen,
    Layers,
    LayoutGrid,
    SplitSquareVertical,
    BookMarked,
    GraduationCap,
    List,
    UserCheck,
    Receipt,
    MapPin,
    Map,
    Truck,
    Car,
    Navigation,
    DollarSign,
    FolderOpen,
    Tag,
    Percent,
    Bell
} from 'lucide-react';

const FeesManagementLayout = () => {
    const navigate = useNavigate();

    const feesShortcuts = [
        {
            label: 'Academy Fee',
            icon: Plus,
            onClick: () => navigate('/master/academy'),
            variant: 'primary' as const,
            subMenu: [
                { label: 'Class Group Create', icon: LayoutGrid, onClick: () => navigate('/master/academy/subject_group') },
                { label: 'Class Name Create', icon: Layers, onClick: () => navigate('/master/academy/class-create') },
                { label: 'Section Create', icon: SplitSquareVertical, onClick: () => navigate('/master/academy/section-create') },
                { label: 'Subject Create', icon: BookMarked, onClick: () => navigate('/master/academy/subject-create') },
                { label: 'Student Admission Create', icon: GraduationCap, onClick: () => navigate('/student_information/admission-create') },
                { label: 'Student List (Class-wise & Section-wise)', icon: List, onClick: () => navigate('/student_information/student-list') },
                { label: 'Assign Class Teacher', icon: UserCheck, onClick: () => navigate('/master/academy/assign-teacher') },
            ]
        },
        {
            label: 'Transport Fee',
            icon: Download,
            onClick: () => navigate('/fees-management/Transport_fee'),
            variant: 'white' as const,
            subMenu: [
                { label: 'Fees Master', icon: Receipt, onClick: () => navigate('/transport/fees_master') },
                { label: 'Pickup Point', icon: MapPin, onClick: () => navigate('/transport/pickup-point') },
                { label: 'Routes', icon: Map, onClick: () => navigate('/transport/routes') },
                { label: 'Vehicles', icon: Truck, onClick: () => navigate('/transport/vehicles') },
                { label: 'Assign Vehicle', icon: Car, onClick: () => navigate('/transport/assign_vehicle') },
                { label: 'Route Pickup Point', icon: Navigation, onClick: () => navigate('/transport/route_pickup_point') },
                { label: 'Student Transport Fees', icon: DollarSign, onClick: () => navigate('/fees-management/Transport_fee#student_transport_fees') },
            ]
        },
        { label: 'Hostal Fee', icon: History, onClick: () => navigate('/fees-management/hostal_fee'), variant: 'white' as const },
        {
            label: 'Fees Master',
            icon: BookOpen,
            onClick: () => navigate('/transport/fees_master'),
            variant: 'white' as const,
            subMenu: [
                { label: 'Fees Group', icon: FolderOpen, onClick: () => navigate('/transport/fees_master') },
                { label: 'Fees Type', icon: Tag, onClick: () => navigate('/transport/fees_master') },
                { label: 'Fees Discount Details List', icon: Percent, onClick: () => navigate('/transport/fees_master') },
                { label: 'Fees Reminder', icon: Bell, onClick: () => navigate('/transport/fees_master') },
            ]
        },
        { label: 'Class Master', icon: Layers, onClick: () => navigate('/fees-management/class_master'), variant: 'white' as const },
        { label: 'Class Group', icon: LayoutGrid, onClick: () => navigate('/master/academy/subject_group'), variant: 'white' as const },
    ];

    return (
        <Layout title="" shortcuts={feesShortcuts}>
            <Outlet />
        </Layout>
    );
};

export default FeesManagementLayout;
