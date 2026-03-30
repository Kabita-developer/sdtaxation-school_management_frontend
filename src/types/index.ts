// Shared types (no API - used by mock service and components)

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
}

export interface ApiError {
  success: false;
  message: string;
  error?: string;
}

export interface CompanyAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface CreateCompanyRequest {
  company_name: string;
  company_email: string;
  company_phone: string;
  company_address: CompanyAddress;
  company_website?: string;
  company_logo?: File | string;
  gstNumber?: string;
  fiscalYear?: string;
  industry?: string;
  industries?: string;
  constitution_of_business?: string;
  tdsApplicable?: boolean;
  tdsNumber?: string;
  professional?: boolean;
  professionalNumber?: string;
  epf?: boolean;
  epfNumber?: string;
  pf?: boolean;
  pfNumber?: string;
  esic?: boolean;
  esicNumber?: string;
}

export interface Company {
  _id: string;
  company_id?: string;
  company_name: string;
  company_email: string;
  company_phone: string;
  company_address: CompanyAddress;
  company_logo?: string | null;
  company_website?: string | null;
  gstNumber?: string;
  fiscalYear?: string;
  industry?: string;
  industries?: string | null;
  constitution_of_business?: string | null;
  tdsApplicable?: boolean;
  tdsNumber?: string | null;
  professional?: boolean;
  professionalNumber?: string | null;
  epf?: boolean;
  epfNumber?: string | null;
  pf?: boolean;
  pfNumber?: string | null;
  esic?: boolean;
  esicNumber?: string | null;
  status: string;
  created_by: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CompaniesResponse {
  success: boolean;
  message: string;
  data: Company[];
  count: number;
}

export interface FilterCompaniesRequest {
  company_id?: string;
  status?: 'active' | 'inactive' | 'suspended';
}

export interface FilterCompaniesResponse {
  success: boolean;
  message: string;
  data: Company[];
  count: number;
  filter?: string;
}

export interface CreateCompanyResponse {
  success: boolean;
  message: string;
  data: Company;
}

export interface GetCompanyResponse {
  success: boolean;
  message: string;
  data: Company;
}

export interface UpdateCompanyRequest {
  company_name: string;
  company_email: string;
  company_phone: string;
  company_address: CompanyAddress;
  company_website?: string;
  company_logo?: string;
  gstNumber?: string;
  fiscalYear?: string;
  industry?: string;
  tdsApplicable?: boolean;
  status?: 'active' | 'inactive' | 'suspended';
}

export interface UpdateCompanyResponse {
  success: boolean;
  message: string;
  data: Company;
}

export interface DeleteCompanyResponse {
  success: boolean;
  message: string;
}

export interface ModulePermissions {
  access: boolean;
  canCreate: boolean;
  canRead: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  create?: boolean;
  read?: boolean;
  update?: boolean;
  delete?: boolean;
}

export interface AdminPermissions {
  hrm: ModulePermissions;
  payroll: ModulePermissions;
  crm: ModulePermissions;
  erp: ModulePermissions;
}

export interface CreateAdminRequest {
  fullname: string;
  username: string;
  email: string;
  role: string;
  password: string;
  originalPassword: string;
  phone: string;
  department: string;
  adminArea: string;
  company: string;
  permissions?: AdminPermissions;
}

export interface CreateAdminResponse {
  success: boolean;
  message: string;
  data: {
    _id: string;
    fullname: string;
    username: string;
    email: string;
    role: string;
    phone: string;
    department: string;
    adminArea: string;
    company: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface Admin {
  _id: string;
  fullname: string;
  username: string;
  email: string;
  password: string;
  originalPassword: string;
  role: string;
  phone: string;
  department: string;
  adminArea: string;
  company: {
    _id: string;
    company_name: string;
    company_email: string;
  } | null;
  created_by: unknown;
  status: string;
  lastLogin: string;
  permissions?: AdminPermissions;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface AdminsResponse {
  success: boolean;
  message: string;
  data: Admin[];
}

export interface Department {
  _id: string;
  department_name: string;
  description?: string;
  status: string;
  created_by: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateDepartmentRequest {
  department_name: string;
  description?: string;
  status?: 'active' | 'inactive';
}

export interface UpdateDepartmentRequest {
  department_name?: string;
  description?: string;
  status?: 'active' | 'inactive';
}

export interface CreateDepartmentResponse {
  success: boolean;
  message: string;
  data: Department;
}

export interface UpdateDepartmentResponse {
  success: boolean;
  message: string;
  data: Department;
}

export interface DeleteDepartmentResponse {
  success: boolean;
  message: string;
  data?: {
    _id: string;
    department_name: string;
  };
}

export interface DepartmentsResponse {
  success: boolean;
  message: string;
  data: Department[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface UpdateAdminRequest {
  fullname?: string;
  username?: string;
  email?: string;
  role?: string;
  phone?: string;
  department?: string;
  adminArea?: string;
  company?: string;
  permissions?: AdminPermissions;
}

export interface UpdateAdminResponse {
  success: boolean;
  message: string;
  data: Admin;
}

export interface DeleteAdminResponse {
  success: boolean;
  message: string;
}

// Dashboard types
export interface DashboardSummary {
  totalRevenue: number;
  activeRevenue: number;
  totalBalance: number;
  activeClients: number;
  totalCompanies: number;
  returnsFiled: number;
  taxSaved: number;
}

export interface DashboardKPI {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: string;
}

export interface SubscriptionStats {
  total: number;
  active: number;
  expired: number;
  cancelled: number;
  suspended: number;
  revenue: {
    total: number;
    active: number;
    expired: number;
  };
}

export interface CompanyStats {
  total: number;
  active: number;
  inactive: number;
  suspended: number;
  withSubscription: number;
  withoutSubscription: number;
}

export interface UserStats {
  admins: { total: number; active: number };
  hr: { total: number; active: number };
  employees: { total: number; active: number };
  total: number;
}

export interface CompanyBalance {
  companyId: string;
  companyName: string;
  companyEmail: string;
  status: string;
  balance: number;
  ledgerCount: number;
  voucherCount: number;
  subscription: {
    planName: string;
    status: string;
    isActive: boolean;
    endDate: string;
  } | null;
}

export interface RevenueTrend {
  month: string;
  revenue: number;
  subscriptions: number;
}

export interface ServiceDistribution {
  name: string;
  count: number;
  percentage: string;
}

export interface RecentTransaction {
  voucherNumber: string;
  type: string;
  date: string;
  amount: number;
  company: string;
}

export interface PlanSummary {
  id: string;
  name: string;
  price: number;
  duration: number;
  isActive: boolean;
}

export interface PlansData {
  total: number;
  active: number;
  list: PlanSummary[];
}

export interface DashboardData {
  summary: DashboardSummary;
  kpis: DashboardKPI[];
  subscriptions: SubscriptionStats;
  companies: CompanyStats;
  users: UserStats;
  companyBalances: CompanyBalance[];
  revenueTrend: RevenueTrend[];
  serviceDistribution: ServiceDistribution[];
  recentTransactions: RecentTransaction[];
  plans: PlansData;
}

export interface DashboardResponse {
  success: boolean;
  message: string;
  data: DashboardData;
}

export interface CreateSubscriptionPlanRequest {
  planName: string;
  description?: string;
  price: number;
  currency?: string;
  duration: number;
  features?: string[];
  maxEmployees?: number | null;
  maxAdmins?: number;
  isActive?: boolean;
}

export interface SubscriptionPlan {
  _id: string;
  planName: string;
  description?: string;
  price: number;
  currency: string;
  duration: number;
  features?: string[];
  maxEmployees?: number | null;
  maxAdmins?: number;
  isActive: boolean;
  created_by?: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface SubscriptionPlansResponse {
  success: boolean;
  message: string;
  data: SubscriptionPlan[];
  count: number;
}

export interface SubscriptionPlanResponse {
  success: boolean;
  message: string;
  data: SubscriptionPlan;
}

export interface AssignSubscriptionRequest {
  company: string;
  plan: string;
  startDate?: string;
  endDate: string;
  autoRenew?: boolean;
  notes?: string;
}

export interface CompanySubscription {
  _id: string;
  company: {
    _id: string;
    company_name: string;
    company_email?: string;
  };
  plan: {
    _id: string;
    planName: string;
    price?: number;
    duration?: number;
  };
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'cancelled' | 'suspended';
  autoRenew: boolean;
  notes?: string;
  assigned_by?: {
    _id: string;
    name: string;
    email: string;
  };
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CompanySubscriptionsResponse {
  success: boolean;
  message: string;
  data: CompanySubscription[];
  count: number;
}

export interface CompanySubscriptionResponse {
  success: boolean;
  message: string;
  data: CompanySubscription;
}

export interface UpdateSubscriptionRequest {
  endDate?: string;
  status?: 'active' | 'expired' | 'cancelled' | 'suspended';
  autoRenew?: boolean;
  notes?: string;
}
