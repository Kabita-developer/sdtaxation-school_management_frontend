import React from 'react';
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
            onClick: () => navigate('/fees-management/academy'),
            variant: 'primary' as const,
            subMenu: [
                { label: 'Class Group Create', icon: LayoutGrid, onClick: () => navigate('/fees-management/academy/class_group') },
                { label: 'Class Name Create', icon: Layers, onClick: () => navigate('/fees-management/academy/class-create') },
                { label: 'Section Create', icon: SplitSquareVertical, onClick: () => navigate('/fees-management/academy/section-create') },
                { label: 'Subject Create', icon: BookMarked, onClick: () => navigate('/fees-management/academy/subject-create') },
                { label: 'Student Admission Create', icon: GraduationCap, onClick: () => navigate('/fees-management/academy/admission-create') },
                { label: 'Student List (Class-wise & Section-wise)', icon: List, onClick: () => navigate('/fees-management/academy/student-list') },
                { label: 'Assign Class Teacher', icon: UserCheck, onClick: () => navigate('/fees-management/academy/assign-teacher') },
            ]
        },
        {
            label: 'Transport Fee',
            icon: Download,
            onClick: () => navigate('/fees-management/Transport_fee'),
            variant: 'white' as const,
            subMenu: [
                { label: 'Fees Master', icon: Receipt, onClick: () => navigate('/fees-management/fees_master') },
                { label: 'Pickup Point', icon: MapPin, onClick: () => navigate('/fees-management/Transport_fee') },
                { label: 'Routes', icon: Map, onClick: () => navigate('/fees-management/Transport_fee') },
                { label: 'Vehicles', icon: Truck, onClick: () => navigate('/fees-management/Transport_fee') },
                { label: 'Assign Vehicle', icon: Car, onClick: () => navigate('/fees-management/Transport_fee') },
                { label: 'Route Pickup Point', icon: Navigation, onClick: () => navigate('/fees-management/Transport_fee') },
                { label: 'Student Transport Fees', icon: DollarSign, onClick: () => navigate('/fees-management/Transport_fee') },
            ]
        },
        { label: 'Hostal Fee', icon: History, onClick: () => navigate('/fees-management/hostal_fee'), variant: 'white' as const },
        {
            label: 'Fees Master',
            icon: BookOpen,
            onClick: () => navigate('/fees-management/fees_master'),
            variant: 'white' as const,
            subMenu: [
                { label: 'Fees Group', icon: FolderOpen, onClick: () => navigate('/fees-management/fees_master') },
                { label: 'Fees Type', icon: Tag, onClick: () => navigate('/fees-management/fees_master') },
                { label: 'Fees Discount Details List', icon: Percent, onClick: () => navigate('/fees-management/fees_master') },
                { label: 'Fees Reminder', icon: Bell, onClick: () => navigate('/fees-management/fees_master') },
            ]
        },
        { label: 'Class Master', icon: Layers, onClick: () => navigate('/fees-management/class_master'), variant: 'white' as const },
        { label: 'Class Group', icon: LayoutGrid, onClick: () => navigate('/fees-management/academy/class_group'), variant: 'white' as const },
    ];

    return (
        <Layout title="" shortcuts={feesShortcuts}>
            <Outlet />
        </Layout>
    );
};

export default FeesManagementLayout;
