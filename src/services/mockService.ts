/**
 * Mock service - no API calls. All data is in-memory for demo/offline use.
 * Re-exports types from ../types for convenience.
 */
import type {
  LoginRequest,
  LoginResponse,
  Company,
  CompanyAddress,
  CreateCompanyRequest,
  FilterCompaniesRequest,
  FilterCompaniesResponse,
  GetCompanyResponse,
  UpdateCompanyRequest,
  CreateCompanyResponse,
  DeleteCompanyResponse,
  Admin,
  CreateAdminRequest,
  CreateAdminResponse,
  AdminsResponse,
  UpdateAdminRequest,
  UpdateAdminResponse,
  DeleteAdminResponse,
  Department,
  CreateDepartmentRequest,
  UpdateDepartmentRequest,
  CreateDepartmentResponse,
  UpdateDepartmentResponse,
  DeleteDepartmentResponse,
  DepartmentsResponse,
  DashboardData,
  DashboardResponse,
  CreateSubscriptionPlanRequest,
  SubscriptionPlan,
  SubscriptionPlansResponse,
  SubscriptionPlanResponse,
  AssignSubscriptionRequest,
  CompanySubscription,
  CompanySubscriptionsResponse,
  CompanySubscriptionResponse,
  UpdateSubscriptionRequest,
} from '../types';

export * from '../types';

const creator = { _id: 'mock-creator', name: 'Kabita', email: 'superadmin@gmail.com' };

function id(): string {
  return `mock-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

// --- In-memory stores ---
let mockCompanies: Company[] = [
  {
    _id: 'mock-company-1',
    company_name: 'Demo Company Ltd',
    company_email: 'demo@company.com',
    company_phone: '9876543210',
    company_address: { street: '123 Main St', city: 'Mumbai', state: 'Maharashtra', country: 'India', zipCode: '400001' },
    status: 'active',
    created_by: creator,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    __v: 0,
  },
];

let mockAdmins: Admin[] = [
  {
    _id: 'mock-admin-1',
    fullname: 'Demo Admin',
    username: 'demoadmin',
    email: 'admin@demo.com',
    password: '***',
    originalPassword: '***',
    role: 'admin',
    phone: '9876543210',
    department: 'Operations',
    adminArea: 'General',
    company: { _id: 'mock-company-1', company_name: 'Demo Company Ltd', company_email: 'demo@company.com' },
    created_by: creator,
    status: 'active',
    lastLogin: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    __v: 0,
  },
];

let mockDepartments: Department[] = [
  { _id: 'mock-dept-1', department_name: 'Operations', description: 'General operations', status: 'active', created_by: creator, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { _id: 'mock-dept-2', department_name: 'Finance', description: 'Finance & accounts', status: 'active', created_by: creator, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
];

let mockPlans: SubscriptionPlan[] = [
  {
    _id: 'mock-plan-1',
    planName: 'Basic',
    description: 'Basic plan',
    price: 999,
    currency: 'INR',
    duration: 12,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'mock-plan-2',
    planName: 'Professional',
    description: 'Professional plan',
    price: 2999,
    currency: 'INR',
    duration: 12,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

let mockCompanySubscriptions: CompanySubscription[] = [
  {
    _id: 'mock-cs-1',
    company: { _id: 'mock-company-1', company_name: 'Demo Company Ltd', company_email: 'demo@company.com' },
    plan: { _id: 'mock-plan-1', planName: 'Basic', price: 999, duration: 12 },
    startDate: new Date().toISOString().slice(0, 10),
    endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    status: 'active',
    autoRenew: true,
    assigned_by: creator,
  },
];

// --- Token manager (localStorage, no server) ---
const MOCK_TOKEN = 'mock-jwt-token';
const MOCK_EXP = Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60; // 1 year

export const tokenManager = {
  getToken: (): string | null => localStorage.getItem('auth_token'),
  setToken: (token: string): void => {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('auth_token_exp', String(MOCK_EXP));
  },
  removeToken: (): void => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_token_exp');
  },
  getUserData: (): { id: string; name: string; email: string } | null => {
    const d = localStorage.getItem('user_data');
    return d ? JSON.parse(d) : null;
  },
  setUserData: (userData: { id: string; name: string; email: string }): void => {
    localStorage.setItem('user_data', JSON.stringify(userData));
  },
  removeUserData: (): void => localStorage.removeItem('user_data'),
  clearAuth: (): void => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_token_exp');
    localStorage.removeItem('user_data');
  },
  isTokenExpired(): boolean {
    const t = this.getToken();
    if (!t) return true;
    const exp = localStorage.getItem('auth_token_exp');
    if (exp) return Math.floor(Date.now() / 1000) >= parseInt(exp, 10);
    return false;
  },
  getTokenExpirationTime(): number | null {
    const exp = localStorage.getItem('auth_token_exp');
    return exp ? parseInt(exp, 10) : null;
  },
};

// --- Mock API service (same method names as original) ---
export const apiService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    await new Promise((r) => setTimeout(r, 300));
    return {
      success: true,
      message: 'Login successful',
      data: { id: 'mock-superadmin', name: 'Kabita', email: credentials.email },
      token: MOCK_TOKEN,
    };
  },

  async getSuperAdminProfile(): Promise<LoginResponse> {
    const user = tokenManager.getUserData();
    if (!user) throw new Error('Not authenticated');
    return {
      success: true,
      message: 'OK',
      data: { id: user.id, name: user.name, email: user.email },
      token: tokenManager.getToken() || MOCK_TOKEN,
    };
  },

  async logout(): Promise<{ success: boolean; message: string }> {
    return { success: true, message: 'Logged out' };
  },

  async getCompanies() {
    return { success: true, message: 'OK', data: [...mockCompanies], count: mockCompanies.length };
  },

  async filterCompanies(filterData: FilterCompaniesRequest): Promise<FilterCompaniesResponse> {
    await new Promise((r) => setTimeout(r, 100));
    let list = [...mockCompanies];
    if (filterData.company_id) list = list.filter((c) => c._id === filterData.company_id);
    if (filterData.status) list = list.filter((c) => c.status === filterData.status);
    return { success: true, message: 'OK', data: list, count: list.length };
  },

  async createCompany(companyData: CreateCompanyRequest): Promise<CreateCompanyResponse> {
    await new Promise((r) => setTimeout(r, 200));
    const now = new Date().toISOString();
    const newCompany: Company = {
      _id: id(),
      company_name: companyData.company_name,
      company_email: companyData.company_email,
      company_phone: companyData.company_phone,
      company_address: companyData.company_address,
      status: 'active',
      created_by: creator,
      createdAt: now,
      updatedAt: now,
      __v: 0,
    };
    if (companyData.gstNumber) newCompany.gstNumber = companyData.gstNumber;
    if (companyData.fiscalYear) newCompany.fiscalYear = companyData.fiscalYear;
    if (companyData.industry) newCompany.industry = companyData.industry;
    if (companyData.tdsApplicable !== undefined) newCompany.tdsApplicable = companyData.tdsApplicable;
    if (companyData.tdsNumber) newCompany.tdsNumber = companyData.tdsNumber;
    mockCompanies.push(newCompany);
    return { success: true, message: 'Company created', data: newCompany };
  },

  async getCompanyById(companyId: string): Promise<GetCompanyResponse> {
    await new Promise((r) => setTimeout(r, 100));
    const c = mockCompanies.find((x) => x._id === companyId);
    if (!c) throw new Error('Company not found');
    return { success: true, message: 'OK', data: c };
  },

  async updateCompany(companyId: string, companyData: UpdateCompanyRequest): Promise<{ success: boolean; message: string; data: Company }> {
    await new Promise((r) => setTimeout(r, 200));
    const idx = mockCompanies.findIndex((c) => c._id === companyId);
    if (idx === -1) throw new Error('Company not found');
    const updated: Company = {
      ...mockCompanies[idx],
      ...companyData,
      company_address: companyData.company_address ?? mockCompanies[idx].company_address,
      updatedAt: new Date().toISOString(),
    };
    mockCompanies[idx] = updated;
    return { success: true, message: 'Updated', data: updated };
  },

  async updateCompanyStatus(companyId: string, status: 'active' | 'inactive' | 'suspended'): Promise<FilterCompaniesResponse> {
    const idx = mockCompanies.findIndex((c) => c._id === companyId);
    if (idx !== -1) mockCompanies[idx] = { ...mockCompanies[idx], status, updatedAt: new Date().toISOString() };
    return this.filterCompanies({ company_id: companyId, status });
  },

  async deleteCompany(companyId: string): Promise<DeleteCompanyResponse> {
    await new Promise((r) => setTimeout(r, 150));
    mockCompanies = mockCompanies.filter((c) => c._id !== companyId);
    mockCompanySubscriptions = mockCompanySubscriptions.filter((cs) => cs.company._id !== companyId);
    return { success: true, message: 'Deleted' };
  },

  async createAdmin(adminData: CreateAdminRequest): Promise<CreateAdminResponse> {
    await new Promise((r) => setTimeout(r, 200));
    const company = mockCompanies.find((c) => c._id === adminData.company) ?? null;
    const now = new Date().toISOString();
    const newAdmin: Admin = {
      _id: id(),
      fullname: adminData.fullname,
      username: adminData.username,
      email: adminData.email,
      password: '***',
      originalPassword: adminData.originalPassword,
      role: adminData.role,
      phone: adminData.phone,
      department: adminData.department,
      adminArea: adminData.adminArea,
      company: company ? { _id: company._id, company_name: company.company_name, company_email: company.company_email } : null,
      created_by: creator,
      status: 'active',
      lastLogin: now,
      permissions: adminData.permissions,
      createdAt: now,
      updatedAt: now,
      __v: 0,
    };
    mockAdmins.push(newAdmin);
    return {
      success: true,
      message: 'Admin created',
      data: {
        _id: newAdmin._id,
        fullname: newAdmin.fullname,
        username: newAdmin.username,
        email: newAdmin.email,
        role: newAdmin.role,
        phone: newAdmin.phone,
        department: newAdmin.department,
        adminArea: newAdmin.adminArea,
        company: adminData.company,
        createdAt: now,
        updatedAt: now,
      },
    };
  },

  async getAdmins(): Promise<AdminsResponse> {
    return { success: true, message: 'OK', data: [...mockAdmins] };
  },

  async updateAdmin(adminId: string, adminData: UpdateAdminRequest): Promise<UpdateAdminResponse> {
    await new Promise((r) => setTimeout(r, 200));
    const idx = mockAdmins.findIndex((a) => a._id === adminId);
    if (idx === -1) throw new Error('Admin not found');
    const adm = mockAdmins[idx];
    const company = adminData.company != null ? mockCompanies.find((c) => c._id === adminData.company) : adm.company;
    mockAdmins[idx] = {
      ...adm,
      ...adminData,
      company: company ? { _id: company._id, company_name: company.company_name, company_email: company.company_email } : null,
      updatedAt: new Date().toISOString(),
    };
    return { success: true, message: 'Updated', data: mockAdmins[idx] };
  },

  async deleteAdmin(adminId: string): Promise<DeleteAdminResponse> {
    mockAdmins = mockAdmins.filter((a) => a._id !== adminId);
    return { success: true, message: 'Deleted' };
  },

  async createDepartment(data: CreateDepartmentRequest): Promise<CreateDepartmentResponse> {
    await new Promise((r) => setTimeout(r, 150));
    const now = new Date().toISOString();
    const newDept: Department = {
      _id: id(),
      department_name: data.department_name,
      description: data.description,
      status: data.status ?? 'active',
      created_by: creator,
      createdAt: now,
      updatedAt: now,
    };
    mockDepartments.push(newDept);
    return { success: true, message: 'Created', data: newDept };
  },

  async getDepartments(params?: { status?: 'active' | 'inactive'; search?: string; page?: number; limit?: number }): Promise<DepartmentsResponse> {
    await new Promise((r) => setTimeout(r, 100));
    let list = [...mockDepartments];
    if (params?.status) list = list.filter((d) => d.status === params.status);
    if (params?.search) list = list.filter((d) => d.department_name.toLowerCase().includes(params!.search!.toLowerCase()));
    return { success: true, message: 'OK', data: list, pagination: { page: 1, limit: list.length, total: list.length, pages: 1 } };
  },

  async updateDepartment(departmentId: string, data: UpdateDepartmentRequest): Promise<UpdateDepartmentResponse> {
    const idx = mockDepartments.findIndex((d) => d._id === departmentId);
    if (idx === -1) throw new Error('Department not found');
    mockDepartments[idx] = { ...mockDepartments[idx], ...data, updatedAt: new Date().toISOString() };
    return { success: true, message: 'Updated', data: mockDepartments[idx] };
  },

  async deleteDepartment(departmentId: string): Promise<DeleteDepartmentResponse> {
    mockDepartments = mockDepartments.filter((d) => d._id !== departmentId);
    return { success: true, message: 'Deleted' };
  },

  async getDashboardData(): Promise<DashboardResponse> {
    await new Promise((r) => setTimeout(r, 200));
    const totalStudents = 1250;
    const activeTeachers = 45;
    const totalClasses = 15;
    const data: DashboardData = {
      summary: {
        totalRevenue: 4500000,
        activeRevenue: 3800000,
        totalBalance: 700000,
        activeClients: totalStudents,
        totalCompanies: activeTeachers,
        returnsFiled: totalClasses,
        taxSaved: 120, // Average Attendance percentage or similar
      },
      kpis: [
        { title: 'Total Fees Collected', value: '₹45,00,000', change: '8.4', trend: 'up', icon: 'revenue' },
        { title: 'Total Students', value: String(totalStudents), change: '15', trend: 'up', icon: 'clients' },
        { title: 'Total Teachers', value: String(activeTeachers), change: '2', trend: 'up', icon: 'companies' },
        { title: 'Total Classes', value: String(totalClasses), change: '0', trend: 'neutral', icon: 'balance' },
      ],
      subscriptions: {
        total: 120, // Ongoing applications
        active: 85,
        expired: 10,
        cancelled: 25,
        suspended: 0,
        revenue: { total: 4500000, active: 3800000, expired: 0 },
      },
      companies: {
        total: activeTeachers,
        active: 42,
        inactive: 3,
        suspended: 0,
        withSubscription: 40,
        withoutSubscription: 5,
      },
      users: {
        admins: { total: 5, active: 5 },
        hr: { total: 2, active: 2 },
        employees: { total: activeTeachers, active: 42 },
        total: 52,
      },
      companyBalances: [
        {
          companyId: '1',
          companyName: 'Class X-A',
          companyEmail: 'class-x-a@school.com',
          status: 'active',
          balance: 65, // Percentage of fees collected
          ledgerCount: 50, // Students in class
          voucherCount: 45, // Paid students
          subscription: { planName: 'Science', status: 'active', isActive: true, endDate: '2026-03-31' },
        },
        {
          companyId: '2',
          companyName: 'Class X-B',
          companyEmail: 'class-x-b@school.com',
          status: 'active',
          balance: 72,
          ledgerCount: 48,
          voucherCount: 42,
          subscription: { planName: 'Commerce', status: 'active', isActive: true, endDate: '2026-03-31' },
        },
      ],
      revenueTrend: [
        { month: 'Jan 2025', revenue: 450000, subscriptions: 120 },
        { month: 'Feb 2025', revenue: 520000, subscriptions: 135 },
        { month: 'Mar 2025', revenue: 610000, subscriptions: 150 },
      ],
      serviceDistribution: [
        { name: 'Secondary', count: 650, percentage: '52' },
        { name: 'Primary', count: 400, percentage: '32' },
        { name: 'Pre-Primary', count: 200, percentage: '16' },
      ],
      recentTransactions: [
        { voucherNumber: 'R-1001', type: 'Receipt', date: new Date().toISOString(), amount: 15000, company: 'Aditya Kumar (Class X-A)' },
      ],
      plans: {
        total: 3,
        active: 3,
        list: [
          { id: '1', name: 'Science-Theory', price: 150000, duration: 12, isActive: true },
          { id: '2', name: 'Commerce-Core', price: 120000, duration: 12, isActive: true },
        ],
      },
    };
    return { success: true, message: 'OK', data };
  },

  async createSubscriptionPlan(data: CreateSubscriptionPlanRequest): Promise<SubscriptionPlanResponse> {
    await new Promise((r) => setTimeout(r, 150));
    const now = new Date().toISOString();
    const newPlan: SubscriptionPlan = {
      _id: id(),
      planName: data.planName,
      description: data.description,
      price: data.price,
      currency: data.currency ?? 'INR',
      duration: data.duration,
      features: data.features,
      maxEmployees: data.maxEmployees ?? null,
      maxAdmins: data.maxAdmins,
      isActive: data.isActive ?? true,
      createdAt: now,
      updatedAt: now,
    };
    mockPlans.push(newPlan);
    return { success: true, message: 'Created', data: newPlan };
  },

  async getSubscriptionPlans(isActive?: boolean): Promise<SubscriptionPlansResponse> {
    await new Promise((r) => setTimeout(r, 100));
    let list = [...mockPlans];
    if (isActive !== undefined) list = list.filter((p) => p.isActive === isActive);
    return { success: true, message: 'OK', data: list, count: list.length };
  },

  async getSubscriptionPlanById(planId: string): Promise<SubscriptionPlanResponse> {
    const p = mockPlans.find((x) => x._id === planId);
    if (!p) throw new Error('Plan not found');
    return { success: true, message: 'OK', data: p };
  },

  async updateSubscriptionPlan(planId: string, data: Partial<CreateSubscriptionPlanRequest>): Promise<SubscriptionPlanResponse> {
    const idx = mockPlans.findIndex((p) => p._id === planId);
    if (idx === -1) throw new Error('Plan not found');
    mockPlans[idx] = { ...mockPlans[idx], ...data, updatedAt: new Date().toISOString() };
    return { success: true, message: 'Updated', data: mockPlans[idx] };
  },

  async deleteSubscriptionPlan(planId: string): Promise<{ success: boolean; message: string }> {
    mockPlans = mockPlans.filter((p) => p._id !== planId);
    return { success: true, message: 'Deleted' };
  },

  async assignSubscription(data: AssignSubscriptionRequest): Promise<CompanySubscriptionResponse> {
    await new Promise((r) => setTimeout(r, 150));
    const company = mockCompanies.find((c) => c._id === data.company);
    const plan = mockPlans.find((p) => p._id === data.plan);
    if (!company || !plan) throw new Error('Company or plan not found');
    const newCs: CompanySubscription = {
      _id: id(),
      company: { _id: company._id, company_name: company.company_name, company_email: company.company_email },
      plan: { _id: plan._id, planName: plan.planName, price: plan.price, duration: plan.duration },
      startDate: data.startDate ?? new Date().toISOString().slice(0, 10),
      endDate: data.endDate,
      status: 'active',
      autoRenew: data.autoRenew ?? false,
      notes: data.notes,
      assigned_by: creator,
    };
    mockCompanySubscriptions.push(newCs);
    return { success: true, message: 'Assigned', data: newCs };
  },

  async getCompanySubscriptions(status?: string, companyId?: string): Promise<CompanySubscriptionsResponse> {
    await new Promise((r) => setTimeout(r, 100));
    let list = [...mockCompanySubscriptions];
    if (status) list = list.filter((s) => s.status === status);
    if (companyId) list = list.filter((s) => s.company._id === companyId);
    return { success: true, message: 'OK', data: list, count: list.length };
  },

  async getCompanySubscriptionById(id: string): Promise<CompanySubscriptionResponse> {
    const cs = mockCompanySubscriptions.find((s) => s._id === id);
    if (!cs) throw new Error('Subscription not found');
    return { success: true, message: 'OK', data: cs };
  },

  async getCompanySubscriptionByCompanyId(companyId: string): Promise<CompanySubscriptionResponse> {
    const cs = mockCompanySubscriptions.find((s) => s.company._id === companyId);
    if (!cs) throw new Error('No subscription for company');
    return { success: true, message: 'OK', data: cs };
  },

  async updateCompanySubscription(id: string, data: UpdateSubscriptionRequest): Promise<CompanySubscriptionResponse> {
    const idx = mockCompanySubscriptions.findIndex((s) => s._id === id);
    if (idx === -1) throw new Error('Subscription not found');
    mockCompanySubscriptions[idx] = { ...mockCompanySubscriptions[idx], ...data };
    return { success: true, message: 'Updated', data: mockCompanySubscriptions[idx] };
  },

  async deleteCompanySubscription(id: string): Promise<{ success: boolean; message: string }> {
    mockCompanySubscriptions = mockCompanySubscriptions.filter((s) => s._id !== id);
    return { success: true, message: 'Deleted' };
  },

  isAuthenticated(): boolean {
    return !!tokenManager.getToken();
  },
};
