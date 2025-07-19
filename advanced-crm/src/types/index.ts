export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'manager' | 'sales' | 'support'
  avatar?: string
  permissions: Permission[]
  territory?: string
  quota?: number
  createdAt: Date
  updatedAt: Date
}

export interface Permission {
  resource: string
  actions: ('create' | 'read' | 'update' | 'delete')[]
}

export interface Lead {
  id: string
  name: string
  email: string
  phone?: string
  whatsapp?: string
  company?: string
  source: 'website' | 'referral' | 'social' | 'advertising' | 'cold_call' | 'whatsapp' | 'other'
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost'
  priority: 'low' | 'medium' | 'high'
  temperature: 'hot' | 'warm' | 'cold' // IA determina baseado em interações
  score: number // Score de 0-100 calculado por IA
  value?: number
  assignedTo?: string
  tags: string[]
  notes: string
  lastContact?: Date
  nextFollowUp?: Date
  interactions: Interaction[]
  aiProfile: AICustomerProfile
  createdAt: Date
  updatedAt: Date
}

export interface AICustomerProfile {
  customerType: 'family' | 'investor' | 'enthusiast' | 'business' | 'first_time_buyer'
  preferences: {
    vehicleType: string[]
    priceRange: { min: number; max: number }
    preferredColors: string[]
    transmission: 'manual' | 'automatic' | 'both'
    fuelType: string[]
    features: string[]
  }
  behavior: {
    responseTime: number // média em horas
    preferredContactMethod: 'phone' | 'email' | 'whatsapp'
    bestContactTime: string
    decisionSpeed: 'fast' | 'medium' | 'slow'
    priceConsciousness: 'low' | 'medium' | 'high'
  }
  insights: string[]
  lastUpdated: Date
}

export interface Interaction {
  id: string
  type: 'call' | 'email' | 'whatsapp' | 'meeting' | 'test_drive' | 'proposal_sent' | 'visit'
  direction: 'inbound' | 'outbound'
  content: string
  duration?: number
  sentiment: 'positive' | 'neutral' | 'negative'
  leadId?: string
  customerId?: string
  userId: string
  createdAt: Date
}

export interface Customer {
  id: string
  name: string
  email: string
  phone?: string
  whatsapp?: string
  company?: string
  cpf?: string
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
  aiProfile: AICustomerProfile
  interactions: Interaction[]
  vehicles: CustomerVehicle[]
  financingHistory: FinancingSimulation[]
  healthScore: number // Score de saúde do relacionamento (0-100)
  churnRisk: 'low' | 'medium' | 'high'
  createdAt: Date
  updatedAt: Date
}

export interface CustomerVehicle {
  id: string
  customerId: string
  vehicleId: string
  vehicle: Vehicle
  purchaseDate: Date
  salePrice: number
  status: 'sold' | 'trade_in' | 'service'
}

export interface Vehicle {
  id: string
  brand: string
  model: string
  year: number
  price: number
  mileage: number
  color: string
  transmission: 'manual' | 'automatic'
  fuelType: string
  features: string[]
  images: string[]
  status: 'available' | 'sold' | 'reserved'
  description: string
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
  vehicleId?: string
  vehicle?: Vehicle
  assignedTo: string
  assignedUser: User
  expectedCloseDate?: Date
  actualCloseDate?: Date
  financing?: FinancingSimulation
  activities: Activity[]
  aiRecommendations: AIRecommendation[]
  createdAt: Date
  updatedAt: Date
}

export interface FinancingSimulation {
  id: string
  vehiclePrice: number
  downPayment: number
  loanAmount: number
  interestRate: number
  termMonths: number
  monthlyPayment: number
  totalAmount: number
  bank: string
  approved: boolean
  customerId?: string
  dealId?: string
  createdAt: Date
}

export interface AIRecommendation {
  id: string
  type: 'next_action' | 'offer' | 'pricing' | 'timing' | 'communication'
  title: string
  description: string
  confidence: number
  priority: 'low' | 'medium' | 'high'
  implemented: boolean
  createdAt: Date
}

export interface Activity {
  id: string
  type: 'call' | 'email' | 'meeting' | 'task' | 'note' | 'whatsapp' | 'proposal'
  title: string
  description?: string
  completed: boolean
  dueDate?: Date
  completedDate?: Date
  automated: boolean
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

export interface AutomationRule {
  id: string
  name: string
  description: string
  trigger: {
    type: 'lead_created' | 'deal_stage_changed' | 'activity_overdue' | 'customer_inactive' | 'no_interaction' | 'temperature_changed'
    conditions: AutomationCondition[]
  }
  actions: AutomationAction[]
  active: boolean
  lastRun?: Date
  executionCount: number
  createdAt: Date
}

export interface AutomationCondition {
  field: string
  operator: 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'contains' | 'not_contains'
  value: string | number | boolean
}

export interface AutomationAction {
  type: 'send_email' | 'send_whatsapp' | 'create_task' | 'update_status' | 'assign_user' | 'send_proposal'
  parameters: {
    template?: string
    message?: string
    assignTo?: string
    status?: string
    priority?: string
    dueDate?: string
    [key: string]: unknown
  }
}

export interface Dashboard {
  totalLeads: number
  totalCustomers: number
  totalDeals: number
  totalRevenue: number
  conversionRate: number
  averageDealSize: number
  healthScore: number
  churnRisk: {
    high: number
    medium: number
    low: number
  }
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
    target: number
  }[]
  leadSources: {
    source: string
    count: number
    conversion: number
  }[]
  vehiclePerformance: {
    brand: string
    model: string
    views: number
    leads: number
    sales: number
  }[]
}

export interface WhatsAppMessage {
  id: string
  from: string
  to: string
  message: string
  messageType: 'text' | 'image' | 'document' | 'audio'
  status: 'sent' | 'delivered' | 'read'
  customerId?: string
  leadId?: string
  automated: boolean
  createdAt: Date
}

export interface EmailTemplate {
  id: string
  name: string
  subject: string
  body: string
  variables: string[]
  type: 'welcome' | 'follow_up' | 'proposal' | 'reminder' | 'custom'
  active: boolean
  createdAt: Date
}

export interface WhatsAppTemplate {
  id: string
  name: string
  message: string
  variables: string[]
  type: 'welcome' | 'follow_up' | 'proposal' | 'reminder' | 'custom'
  active: boolean
  createdAt: Date
}

export interface KanbanColumn {
  id: string
  title: string
  color: string
  order: number
  dealStage: string
  automations: AutomationRule[]
}

export interface CRMSettings {
  companyName: string
  currency: string
  timezone: string
  theme: 'light' | 'dark' | 'auto'
  emailSettings: {
    smtpHost: string
    smtpPort: number
    smtpUser: string
    smtpPassword: string
    fromEmail: string
    fromName: string
  }
  whatsappSettings: {
    apiKey: string
    phoneNumber: string
    webhookUrl: string
    enabled: boolean
  }
  aiSettings: {
    enabled: boolean
    provider: 'openai' | 'anthropic' | 'custom'
    apiKey: string
    model: string
  }
  automationRules: AutomationRule[]
  kanbanColumns: KanbanColumn[]
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
  type: 'sales' | 'leads' | 'customers' | 'activities' | 'performance' | 'vehicles' | 'ai_insights'
  dateRange: {
    start: Date
    end: Date
  }
  filters: ReportFilter[]
  data: ReportData
  aiInsights?: string[]
  createdBy: string
  createdAt: Date
}

export interface Notification {
  id: string
  type: 'info' | 'success' | 'warning' | 'error' | 'ai_insight'
  title: string
  message: string
  read: boolean
  actionRequired: boolean
  actionUrl?: string
  userId: string
  createdAt: Date
}

export interface AIInsight {
  id: string
  type: 'customer_risk' | 'opportunity' | 'pricing' | 'market_trend' | 'performance'
  title: string
  description: string
  impact: 'low' | 'medium' | 'high' | 'critical'
  confidence: number
  actionable: boolean
  suggestedActions: string[]
  relatedEntity?: {
    type: 'lead' | 'customer' | 'deal' | 'vehicle'
    id: string
  }
  createdAt: Date
  dismissedAt?: Date
}