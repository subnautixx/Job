export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'manager' | 'sales' | 'support'
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

export interface Lead {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  source: 'website' | 'referral' | 'social' | 'advertising' | 'cold_call' | 'other'
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost'
  priority: 'low' | 'medium' | 'high'
  value?: number
  assignedTo?: string
  tags: string[]
  notes: string
  lastContact?: Date
  createdAt: Date
  updatedAt: Date
}

export interface Customer {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  address?: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  totalValue: number
  lastPurchase?: Date
  status: 'active' | 'inactive' | 'prospect'
  assignedTo?: string
  tags: string[]
  notes: string
  createdAt: Date
  updatedAt: Date
}

export interface Deal {
  id: string
  title: string
  description?: string
  value: number
  probability: number
  stage: 'prospect' | 'qualification' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost'
  customerId: string
  customer: Customer
  assignedTo: string
  assignedUser: User
  expectedCloseDate?: Date
  actualCloseDate?: Date
  products: DealProduct[]
  activities: Activity[]
  createdAt: Date
  updatedAt: Date
}

export interface DealProduct {
  id: string
  dealId: string
  productId: string
  product: Product
  quantity: number
  unitPrice: number
  totalPrice: number
}

export interface Product {
  id: string
  name: string
  description?: string
  price: number
  category: string
  active: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Activity {
  id: string
  type: 'call' | 'email' | 'meeting' | 'task' | 'note'
  title: string
  description?: string
  completed: boolean
  dueDate?: Date
  completedDate?: Date
  leadId?: string
  customerId?: string
  dealId?: string
  assignedTo: string
  assignedUser: User
  createdBy: string
  createdByUser: User
  createdAt: Date
  updatedAt: Date
}

export interface Dashboard {
  totalLeads: number
  totalCustomers: number
  totalDeals: number
  totalRevenue: number
  conversionRate: number
  averageDealSize: number
  recentActivities: Activity[]
  topPerformers: User[]
  salesPipeline: {
    stage: string
    count: number
    value: number
  }[]
  monthlyRevenue: {
    month: string
    revenue: number
  }[]
}

export interface CRMSettings {
  companyName: string
  currency: string
  timezone: string
  emailSettings: {
    smtpHost: string
    smtpPort: number
    smtpUser: string
    smtpPassword: string
  }
  automationRules: AutomationRule[]
}

export interface AutomationCondition {
  field: string
  operator: string
  value: string | number | boolean
}

export interface AutomationAction {
  type: string
  parameters: Record<string, unknown>
}

export interface AutomationRule {
  id: string
  name: string
  trigger: 'lead_created' | 'deal_stage_changed' | 'activity_overdue' | 'customer_inactive'
  conditions: AutomationCondition[]
  actions: AutomationAction[]
  active: boolean
  createdAt: Date
}

export interface ReportFilter {
  field: string
  operator: string
  value: string | number | Date
}

export interface ReportData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor?: string[]
    borderColor?: string
  }[]
}

export interface Report {
  id: string
  name: string
  type: 'sales' | 'leads' | 'customers' | 'activities' | 'performance'
  dateRange: {
    start: Date
    end: Date
  }
  filters: ReportFilter[]
  data: ReportData
  createdBy: string
  createdAt: Date
}

export interface Notification {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message: string
  read: boolean
  userId: string
  createdAt: Date
}