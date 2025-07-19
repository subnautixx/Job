'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Phone,
  Mail,
  MessageSquare,
  User,
  Car,
  Calendar,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Zap,
  Target,
  Clock
} from 'lucide-react'
import { formatCurrency, formatDate, cn } from '@/lib/utils'
import { Deal, AIRecommendation, Vehicle } from '@/types'

// Mock data com informações mais ricas
const kanbanColumns = [
  { 
    id: 'prospect', 
    title: 'Prospects', 
    color: 'bg-blue-500',
    count: 12,
    value: 485000
  },
  { 
    id: 'qualification', 
    title: 'Qualificação', 
    color: 'bg-yellow-500',
    count: 8,
    value: 320000
  },
  { 
    id: 'proposal', 
    title: 'Proposta', 
    color: 'bg-orange-500',
    count: 5,
    value: 275000
  },
  { 
    id: 'negotiation', 
    title: 'Negociação', 
    color: 'bg-purple-500',
    count: 3,
    value: 195000
  },
  { 
    id: 'closed_won', 
    title: 'Fechado', 
    color: 'bg-green-500',
    count: 7,
    value: 425000
  }
]

const dealsData: (Deal & { 
  vehicle?: Vehicle
  aiRecommendations: AIRecommendation[]
  lastActivity: string
  temperature: 'hot' | 'warm' | 'cold'
  daysInStage: number
})[] = [
  {
    id: '1',
    title: 'João Silva - Honda Civic',
    description: 'Interessado em Honda Civic 2024, financiamento 48x',
    value: 95000,
    probability: 75,
    stage: 'proposal',
    customerId: '1',
    customer: {
      id: '1',
      name: 'João Silva',
      email: 'joao@email.com',
      phone: '+55 11 99999-9999',
      whatsapp: '+55 11 99999-9999',
      totalValue: 95000,
      status: 'prospect',
      assignedTo: 'Ana Costa',
      tags: ['hot_lead', 'financing'],
      notes: 'Cliente muito interessado, já fez test drive',
      aiProfile: {
        customerType: 'family',
        preferences: {
          vehicleType: ['sedan', 'suv'],
          priceRange: { min: 80000, max: 120000 },
          preferredColors: ['prata', 'branco'],
          transmission: 'automatic',
          fuelType: ['flex', 'hybrid'],
          features: ['ar_condicionado', 'multimidia']
        },
        behavior: {
          responseTime: 2,
          preferredContactMethod: 'whatsapp',
          bestContactTime: '18:00-20:00',
          decisionSpeed: 'medium',
          priceConsciousness: 'medium'
        },
        insights: ['Compra por necessidade familiar', 'Valoriza economia de combustível'],
        lastUpdated: new Date()
      },
      interactions: [],
      vehicles: [],
      financingHistory: [],
      healthScore: 85,
      churnRisk: 'low',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    vehicle: {
      id: 'vehicle-1',
      brand: 'Honda',
      model: 'Civic',
      year: 2024,
      price: 95000,
      mileage: 0,
      color: 'Prata',
      transmission: 'automatic',
      fuelType: 'Flex',
      features: ['Ar-condicionado', 'Multimídia'],
      images: [],
      status: 'available',
      description: 'Honda Civic 2024 novo',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    assignedTo: 'ana-costa',
    assignedUser: {
      id: 'ana-costa',
      name: 'Ana Costa',
      email: 'ana@empresa.com',
      role: 'sales',
      permissions: [],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    expectedCloseDate: new Date('2024-02-15'),
    activities: [],
    aiRecommendations: [
      {
        id: '1',
        type: 'next_action',
        title: 'Enviar Proposta Revisada',
        description: 'Cliente demonstrou sensibilidade ao preço. Revisar condições de financiamento.',
        confidence: 85,
        priority: 'high',
        implemented: false,
        createdAt: new Date()
      }
    ],
    lastActivity: 'Proposta enviada há 2 dias',
    temperature: 'warm',
    daysInStage: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    title: 'Maria Santos - Toyota Corolla',
    description: 'Primeira compra, avaliando opções',
    value: 85000,
    probability: 45,
    stage: 'qualification',
    customerId: '2',
    customer: {
      id: '2',
      name: 'Maria Santos',
      email: 'maria@email.com',
      phone: '+55 11 88888-8888',
      totalValue: 0,
      status: 'prospect',
      assignedTo: 'Carlos Silva',
      tags: ['first_time_buyer'],
      notes: 'Primeira compra, precisa de orientação',
      aiProfile: {
        customerType: 'first_time_buyer',
        preferences: {
          vehicleType: ['hatch', 'sedan'],
          priceRange: { min: 70000, max: 90000 },
          preferredColors: ['branco', 'prata'],
          transmission: 'automatic',
          fuelType: ['flex'],
          features: ['direcao_assistida', 'ar_condicionado']
        },
        behavior: {
          responseTime: 8,
          preferredContactMethod: 'phone',
          bestContactTime: '14:00-17:00',
          decisionSpeed: 'slow',
          priceConsciousness: 'high'
        },
        insights: ['Precisa de mais informações', 'Sensível ao preço'],
        lastUpdated: new Date()
      },
      interactions: [],
      vehicles: [],
      financingHistory: [],
      healthScore: 65,
      churnRisk: 'medium',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    vehicle: {
      id: 'vehicle-2',
      brand: 'Toyota',
      model: 'Corolla',
      year: 2023,
      price: 85000,
      mileage: 15000,
      color: 'Branco',
      transmission: 'automatic',
      fuelType: 'Flex',
      features: ['Ar-condicionado', 'Direção Assistida'],
      images: [],
      status: 'available',
      description: 'Toyota Corolla 2023 seminovo',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    assignedTo: 'carlos-silva',
    assignedUser: {
      id: 'carlos-silva',
      name: 'Carlos Silva',
      email: 'carlos@empresa.com',
      role: 'sales',
      permissions: [],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    expectedCloseDate: new Date('2024-02-28'),
    activities: [],
    aiRecommendations: [
      {
        id: '2',
        type: 'communication',
        title: 'Agendar Test Drive',
        description: 'Cliente ainda não experimentou o veículo. Agendar test drive aumentará conversão em 40%.',
        confidence: 92,
        priority: 'high',
        implemented: false,
        createdAt: new Date()
      }
    ],
    lastActivity: 'Ligação realizada há 1 dia',
    temperature: 'warm',
    daysInStage: 12,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    title: 'Pedro Costa - BMW 320i',
    description: 'Empresário, upgrade do veículo atual',
    value: 180000,
    probability: 85,
    stage: 'negotiation',
    customerId: '3',
    customer: {
      id: '3',
      name: 'Pedro Costa',
      email: 'pedro@empresa.com',
      phone: '+55 11 77777-7777',
      totalValue: 150000,
      status: 'active',
      assignedTo: 'Ana Costa',
      tags: ['vip', 'upgrade'],
      notes: 'Cliente VIP, já comprou anteriormente',
      aiProfile: {
        customerType: 'business',
        preferences: {
          vehicleType: ['sedan', 'suv'],
          priceRange: { min: 150000, max: 250000 },
          preferredColors: ['preto', 'cinza'],
          transmission: 'automatic',
          fuelType: ['gasolina', 'hybrid'],
          features: ['couro', 'multimidia', 'teto_solar']
        },
        behavior: {
          responseTime: 1,
          preferredContactMethod: 'whatsapp',
          bestContactTime: '19:00-21:00',
          decisionSpeed: 'fast',
          priceConsciousness: 'low'
        },
        insights: ['Valoriza status e tecnologia', 'Decide rapidamente'],
        lastUpdated: new Date()
      },
      interactions: [],
      vehicles: [],
      financingHistory: [],
      healthScore: 95,
      churnRisk: 'low',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    vehicle: {
      id: 'vehicle-3',
      brand: 'BMW',
      model: '320i',
      year: 2024,
      price: 180000,
      mileage: 0,
      color: 'Preto',
      transmission: 'automatic',
      fuelType: 'Gasolina',
      features: ['Couro', 'Multimídia', 'Teto Solar'],
      images: [],
      status: 'available',
      description: 'BMW 320i 2024 zero quilômetro',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    assignedTo: 'ana-costa',
    assignedUser: {
      id: 'ana-costa',
      name: 'Ana Costa',
      email: 'ana@empresa.com',
      role: 'sales',
      permissions: [],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    expectedCloseDate: new Date('2024-02-10'),
    activities: [],
    aiRecommendations: [
      {
        id: '3',
        type: 'pricing',
        title: 'Oferecer Desconto Estratégico',
        description: 'Cliente tem histórico de pagamento à vista. Oferecer 3% de desconto pode acelerar fechamento.',
        confidence: 78,
        priority: 'medium',
        implemented: false,
        createdAt: new Date()
      }
    ],
    lastActivity: 'WhatsApp enviado há 3 horas',
    temperature: 'hot',
    daysInStage: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

const temperatureColors = {
  hot: 'bg-red-500',
  warm: 'bg-yellow-500',
  cold: 'bg-blue-500'
}

const temperatureLabels = {
  hot: 'Quente',
  warm: 'Morno',
  cold: 'Frio'
}

export default function DealsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedColumn, setSelectedColumn] = useState('')

  const totalValue = kanbanColumns.reduce((sum, col) => sum + col.value, 0)
  const totalDeals = kanbanColumns.reduce((sum, col) => sum + col.count, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pipeline de Vendas</h1>
          <p className="text-muted-foreground">
            Gerencie seus negócios com IA integrada e automação inteligente
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Target className="h-4 w-4 mr-2" />
            Automações
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Novo Negócio
          </Button>
        </div>
      </div>

      {/* Métricas do Pipeline */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total no Pipeline</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalValue)}</div>
            <p className="text-xs text-muted-foreground">
              {totalDeals} negócios ativos
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">67%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+5%</span> vs. mês anterior
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tempo Médio</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18 dias</div>
            <p className="text-xs text-muted-foreground">
              Da prospecção ao fechamento
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">IA Insights</CardTitle>
            <Zap className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">
              Recomendações pendentes
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Buscar por cliente, veículo ou vendedor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select
              value={selectedColumn}
              onChange={(e) => setSelectedColumn(e.target.value)}
              className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="">Todos os estágios</option>
              {kanbanColumns.map((column) => (
                <option key={column.id} value={column.id}>{column.title}</option>
              ))}
            </select>
            
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtros Avançados
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Kanban Board */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-5 min-h-[600px]">
        {kanbanColumns.map((column) => (
          <Card key={column.id} className="flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={cn("w-3 h-3 rounded-full", column.color)} />
                  <CardTitle className="text-sm font-medium">{column.title}</CardTitle>
                </div>
                <span className="text-sm text-gray-500">{column.count}</span>
              </div>
              <CardDescription className="text-xs">
                {formatCurrency(column.value)}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="flex-1 space-y-3">
              {dealsData
                .filter(deal => deal.stage === column.id.replace('_', '_'))
                .map((deal) => (
                  <Card key={deal.id} className="p-3 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="space-y-3">
                      {/* Header do Card */}
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm line-clamp-1">{deal.title}</h4>
                          <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                            {deal.description}
                          </p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </div>

                      {/* Valor e Temperatura */}
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-green-600">{formatCurrency(deal.value)}</span>
                        <div className="flex items-center space-x-1">
                          <div className={cn("w-2 h-2 rounded-full", temperatureColors[deal.temperature])} />
                          <span className="text-xs text-gray-500">
                            {temperatureLabels[deal.temperature]}
                          </span>
                        </div>
                      </div>

                      {/* Veículo */}
                      {deal.vehicle && (
                        <div className="flex items-center text-xs text-gray-600">
                          <Car className="h-3 w-3 mr-1" />
                          <span>{deal.vehicle.brand} {deal.vehicle.model} {deal.vehicle.year}</span>
                        </div>
                      )}

                      {/* IA Recommendations */}
                      {deal.aiRecommendations.length > 0 && (
                        <div className="space-y-1">
                          {deal.aiRecommendations.slice(0, 1).map((rec) => (
                            <div key={rec.id} className="flex items-start space-x-2 p-2 bg-yellow-50 rounded text-xs">
                              <Zap className="h-3 w-3 text-yellow-600 mt-0.5 flex-shrink-0" />
                              <div className="flex-1">
                                <p className="font-medium text-yellow-800">{rec.title}</p>
                                <p className="text-yellow-700 line-clamp-2">{rec.description}</p>
                                <div className="flex items-center mt-1 space-x-2">
                                  <span className="text-yellow-600">{rec.confidence}% confiança</span>
                                  {rec.priority === 'high' && (
                                    <AlertTriangle className="h-3 w-3 text-red-500" />
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Footer */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
                            <span className="text-xs font-medium text-white">
                              {deal.assignedUser.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">{deal.assignedUser.name}</span>
                        </div>
                        
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <Phone className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <Mail className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <MessageSquare className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      {/* Tempo no estágio */}
                      <div className="text-xs text-gray-500 border-t pt-2">
                        <div className="flex items-center justify-between">
                          <span>{deal.daysInStage} dias no estágio</span>
                          <span>{deal.probability}% probabilidade</span>
                        </div>
                        <div className="mt-1">
                          <div className="w-full bg-gray-200 rounded-full h-1">
                            <div 
                              className="bg-blue-600 h-1 rounded-full" 
                              style={{ width: `${deal.probability}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              
              {/* Add Deal Button */}
              <Button variant="ghost" className="w-full h-12 border-2 border-dashed border-gray-300 hover:border-gray-400">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Negócio
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}