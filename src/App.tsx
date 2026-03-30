import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { NotificationProvider, useNotification } from './contexts/NotificationContext';
import { ThemeProvider } from './contexts/ThemeContext';
import NotificationContainer from './components/NotificationContainer';
import { setNotificationContext } from './utils/toast';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Setup from './pages/Setup';
import SetupConfiguration from './pages/SetupConfiguration';
import DownloadSetup from './pages/DownloadSetup';
import BackupData from './pages/BackupData';
import SplitFinancialYear from './pages/SplitFinancialYear';
import VersionUpdates from './pages/VersionUpdates';
import Company from './pages/Company';
import CompanyDetails from './pages/CompanyDetails';
import EditCompany from './pages/EditCompany';
import Users from './pages/Users';
import AdminManagement from './pages/AdminManagement';
import CRM from './pages/CRM';
import Pipeline from './pages/Pipeline';
import Lead from './pages/Lead';
import Deal from './pages/Deal';
import Sources from './pages/Sources';
import Labels from './pages/Labels';
import ContactType from './pages/ContactType';
import ERP from './pages/ERP';
import FeesManagement from './pages/FeesManagement';
import FeesManagementLayout from './components/FeesManagementLayout';
import AcademyFee from './pages/AcademyFee';
import AcademyFeeLayout from './components/AcademyFeeLayout';
import TransportFee from './pages/TransportFee';
import HostalFee from './pages/HostalFee';
import FeesMaster from './pages/FeesMaster';
import ClassMaster from './pages/ClassMaster';
import ClassGroup from './pages/ClassGroup';
import ClassNameCreate from './pages/ClassNameCreate';
import SectionCreate from './pages/SectionCreate';
import SubjectCreate from './pages/SubjectCreate';
import AdmissionCreate from './pages/AdmissionCreate';
import OnlineAdmission from './pages/OnlineAdmission';
import DisabledStudents from './pages/DisabledStudents';
import StudentList from './pages/StudentList';
import BulkDelete from './pages/BulkDelete';
import AssignTeacher from './pages/AssignTeacher';
import HRM from './pages/HRM';
import Payroll from './pages/Payroll';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Setting from './pages/Setting';
import UsersCreate from './pages/UsersCreate';
import Meetings from './pages/Meetings';
import Calendar from './pages/Calendar';
import GST from './pages/GST';
import TDS from './pages/TDS';
import ITR from './pages/ITR';
import Profile from './pages/Profile';
import SubscriptionPlans from './pages/SubscriptionPlans';
import CompanySubscriptions from './pages/CompanySubscriptions';
import { Loader2 } from 'lucide-react';

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <div className="text-center">
        <Loader2 className="animate-spin mx-auto mb-4 text-blue-600" size={48} />
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
}

function AppContent() {
  const { notifications, closeNotification, showSuccess, showError, showWarning, showInfo } = useNotification();

  // Set the notification context for the toast utility
  useEffect(() => {
    setNotificationContext({
      showSuccess,
      showError,
      showWarning,
      showInfo
    });
  }, [showSuccess, showError, showWarning, showInfo]);

  // ProtectedRoute component must be inside AppContent to access useAuth
  function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
      return <LoadingScreen />;
    }

    return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
  }

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/setup" element={
            <ProtectedRoute>
              <Setup />
            </ProtectedRoute>
          } />
          <Route path="/setup/configuration" element={
            <ProtectedRoute>
              <SetupConfiguration />
            </ProtectedRoute>
          } />
          <Route path="/setup/download" element={
            <ProtectedRoute>
              <DownloadSetup />
            </ProtectedRoute>
          } />
          <Route path="/setup/backup" element={
            <ProtectedRoute>
              <BackupData />
            </ProtectedRoute>
          } />
          <Route path="/setup/split-financial-year" element={
            <ProtectedRoute>
              <SplitFinancialYear />
            </ProtectedRoute>
          } />
          <Route path="/setup/version-updates" element={
            <ProtectedRoute>
              <VersionUpdates />
            </ProtectedRoute>
          } />
          <Route path="/company" element={
            <ProtectedRoute>
              <Company />
            </ProtectedRoute>
          } />
          <Route path="/company/:id" element={
            <ProtectedRoute>
              <CompanyDetails />
            </ProtectedRoute>
          } />
          <Route path="/company/:id/edit" element={
            <ProtectedRoute>
              <EditCompany />
            </ProtectedRoute>
          } />
          <Route path="/users" element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          } />
          <Route path="/admin-management" element={
            <ProtectedRoute>
              <AdminManagement />
            </ProtectedRoute>
          } />
          <Route path="/crm" element={
            <ProtectedRoute>
              <CRM />
            </ProtectedRoute>
          } />
          <Route path="/crm/PIPLINE" element={
            <ProtectedRoute>
              <Pipeline />
            </ProtectedRoute>
          } />
          <Route path="/crm/LEAD" element={
            <ProtectedRoute>
              <Lead />
            </ProtectedRoute>
          } />
          <Route path="/crm/DEAL" element={
            <ProtectedRoute>
              <Deal />
            </ProtectedRoute>
          } />
          <Route path="/crm/Sources" element={
            <ProtectedRoute>
              <Sources />
            </ProtectedRoute>
          } />
          <Route path="/crm/Labels" element={
            <ProtectedRoute>
              <Labels />
            </ProtectedRoute>
          } />
          <Route path="/crm/Contact_type" element={
            <ProtectedRoute>
              <ContactType />
            </ProtectedRoute>
          } />
          <Route path="/erp" element={
            <ProtectedRoute>
              <ERP />
            </ProtectedRoute>
          } />

          <Route path="/fees-management" element={
            <ProtectedRoute>
              <FeesManagementLayout />
            </ProtectedRoute>
          }>
            <Route index element={<FeesManagement />} />
            <Route path="academy" element={<AcademyFeeLayout />}>
              <Route index element={<AcademyFee />} />
              <Route path="class_group" element={<ClassGroup />} />
              <Route path="class-create" element={<ClassNameCreate />} />
              <Route path="section-create" element={<SectionCreate />} />
              <Route path="subject-create" element={<SubjectCreate />} />
              <Route path="admission-create" element={<AdmissionCreate />} />
              <Route path="online-admission" element={<OnlineAdmission />} />
              <Route path="disabled-students" element={<DisabledStudents />} />
              <Route path="student-list" element={<StudentList />} />
              <Route path="assign-teacher" element={<AssignTeacher />} />
            </Route>
            <Route path="academy_fee" element={<Navigate to="/fees-management/academy" replace />} />
            <Route path="Transport_fee" element={<TransportFee />} />
            <Route path="hostal_fee" element={<HostalFee />} />
            <Route path="fees_master" element={<FeesMaster />} />
            <Route path="class_master" element={<ClassMaster />} />
          </Route>

          <Route path="/hrms" element={
            <ProtectedRoute>
              <HRM />
            </ProtectedRoute>
          } />
          <Route path="/payroll" element={
            <ProtectedRoute>
              <Payroll />
            </ProtectedRoute>
          } />
          <Route path="/subjects" element={
            <ProtectedRoute>
              <SubjectCreate />
            </ProtectedRoute>
          } />
          <Route path="/exams" element={
            <ProtectedRoute>
              <ERP />
            </ProtectedRoute>
          } />
          <Route path="/reports" element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } />
          <Route path="/setting" element={
            <ProtectedRoute>
              <Setting />
            </ProtectedRoute>
          } />
          <Route path="/users-create" element={
            <ProtectedRoute>
              <UsersCreate />
            </ProtectedRoute>
          } />
          <Route path="/meetings" element={
            <ProtectedRoute>
              <Meetings />
            </ProtectedRoute>
          } />
          <Route path="/calendar" element={
            <ProtectedRoute>
              <Calendar />
            </ProtectedRoute>
          } />
          <Route path="/gst" element={
            <ProtectedRoute>
              <GST />
            </ProtectedRoute>
          } />
          <Route path="/tds" element={
            <ProtectedRoute>
              <TDS />
            </ProtectedRoute>
          } />
          <Route path="/itr" element={
            <ProtectedRoute>
              <ITR />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/subscription-plans" element={
            <ProtectedRoute>
              <SubscriptionPlans />
            </ProtectedRoute>
          } />
          <Route path="/company-subscriptions" element={
            <ProtectedRoute>
              <CompanySubscriptions />
            </ProtectedRoute>
          } />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
      <NotificationContainer
        notifications={notifications}
        onClose={closeNotification}
      />
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;