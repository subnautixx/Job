'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Zap,
  Plus,
  Clock,
  MessageSquare,
  Mail,
  Phone,
  Target,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Settings,
  Play,
  Pause,
  MoreHorizontal,
  Brain,
  Send,
  UserPlus,
  Calendar
} from 'lucide-react'
import { AutomationRule, AutomationAction } from '@/types'
import { cn } from '@/lib/utils'

const mockAutomationRules: (AutomationRule & {
  performance: {
    triggered: number
    success: number
    revenue: number
  }
})[] = [
  {
    id: '1',
    name: 'Follow-up Automático - Leads Frios',
    description: 'Envia WhatsApp automático para leads sem interação há 3 dias',
    trigger: {
      type: 'no_interaction',
      conditions: [
        { field: 'days_since_last_contact', operator: 'greater_than', value: 3 },
        { field: 'status', operator: 'equals', value: 'new' }
      ]
    },
    actions: [
      {
        type: 'send_whatsapp',
        parameters: {
          template: 'follow_up_cold_lead',
          message: 'Olá! Vi que você demonstrou interesse em nossos veículos. Posso te ajudar a encontrar o carro ideal? 🚗',
          priority: 'medium'
        }
      },
      {
        type: 'create_task',
        parameters: {
          title: 'Acompanhar resposta do WhatsApp',
          dueDate: '+1 day',
          priority: 'medium'
        }
      }
    ],
    active: true,
    lastRun: new Date('2024-01-15T10:30:00'),
    executionCount: 847,
    createdAt: new Date('2023-12-01'),
    performance: {
      triggered: 847,
      success: 234,
      revenue: 890000
    }
  },
  {
    id: '2',
    name: 'Proposta Automática - Clientes Qualificados',
    description: 'Gera e envia proposta PDF quando lead atinge score alto',
    trigger: {
      type: 'lead_created',
      conditions: [
        { field: 'score', operator: 'greater_than', value: 80 },
        { field: 'temperature', operator: 'equals', value: 'hot' }
      ]
    },
    actions: [
      {
        type: 'send_proposal',
        parameters: {
          template: 'proposal_qualified_lead',
          includeFinancing: true,
          priority: 'high'
        }
      },
      {
        type: 'send_email',
        parameters: {
          template: 'proposal_notification',
          subject: 'Proposta Personalizada Para Você!',
          priority: 'high'
        }
      }
    ],
    active: true,
    lastRun: new Date('2024-01-15T14:20:00'),
    executionCount: 342,
    createdAt: new Date('2023-11-15'),
    performance: {
      triggered: 342,
      success: 198,
      revenue: 1250000
    }
  },
  {
    id: '3',
    name: 'Alerta Negócio Estagnado',
    description: 'Notifica vendedor quando negócio fica mais de 7 dias no mesmo estágio',
    trigger: {
      type: 'deal_stage_changed',
      conditions: [
        { field: 'days_in_stage', operator: 'greater_than', value: 7 },
        { field: 'stage', operator: 'not_equals', value: 'closed_won' }
      ]
    },
    actions: [
      {
        type: 'create_task',
        parameters: {
          title: 'Revisar negócio estagnado',
          description: 'Negócio precisa de atenção - muito tempo no mesmo estágio',
          priority: 'high',
          dueDate: 'today'
        }
      },
      {
        type: 'send_whatsapp',
        parameters: {
          template: 'deal_follow_up',
          message: 'Olá! Como está sua análise? Posso esclarecer alguma dúvida sobre nossa proposta?'
        }
      }
    ],
    active: true,
    lastRun: new Date('2024-01-15T09:15:00'),
    executionCount: 156,
    createdAt: new Date('2023-10-20'),
    performance: {
      triggered: 156,
      success: 89,
      revenue: 445000
    }
  },
  {
    id: '4',
    name: 'Recuperação de Clientes Inativos',
    description: 'Campanha para reativar clientes sem compra há mais de 12 meses',
    trigger: {
      type: 'customer_inactive',
      conditions: [
        { field: 'days_since_last_purchase', operator: 'greater_than', value: 365 },
        { field: 'total_value', operator: 'greater_than', value: 50000 }
      ]
    },
    actions: [
      {
        type: 'send_email',
        parameters: {
          template: 'customer_reactivation',
          subject: 'Ofertas Especiais Para Você! 🎯',
          includeOffers: true
        }
      },
      {
        type: 'assign_user',
        parameters: {
          assignTo: 'sales_manager',
          reason: 'Customer reactivation campaign'
        }
      }
    ],
    active: false,
    lastRun: new Date('2024-01-10T16:45:00'),
    executionCount: 67,
    createdAt: new Date('2023-09-10'),
    performance: {
      triggered: 67,
      success: 23,
      revenue: 185000
    }
  }
]

const triggerIcons = {
  lead_created: UserPlus,
  deal_stage_changed: Target,
  activity_overdue: Clock,
  customer_inactive: AlertTriangle,
  no_interaction: MessageSquare,
  temperature_changed: TrendingUp
}

const actionIcons = {
  send_email: Mail,
  send_whatsapp: MessageSquare,
  create_task: CheckCircle,
  update_status: Settings,
  assign_user: UserPlus,
  send_proposal: Send
}

export function AutomationCenter() {
  const [rules, setRules] = useState(mockAutomationRules)
  const [selectedRule, setSelectedRule] = useState<string | null>(null)

  const toggleRule = (ruleId: string) => {
    setRules(prev => 
      prev.map(rule => 
        rule.id === ruleId 
          ? { ...rule, active: !rule.active }
          : rule
      )
    )
  }

  const getTotalPerformance = () => {
    return rules.reduce((acc, rule) => ({
      triggered: acc.triggered + rule.performance.triggered,
      success: acc.success + rule.performance.success,
      revenue: acc.revenue + rule.performance.revenue
    }), { triggered: 0, success: 0, revenue: 0 })
  }

  const performance = getTotalPerformance()
  const successRate = performance.triggered > 0 ? (performance.success / performance.triggered) * 100 : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Centro de Automação</h1>
          <p className="text-muted-foreground">
            Configure regras inteligentes para automatizar seu processo de vendas
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Brain className="h-4 w-4 mr-2" />
            IA Sugestões
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nova Automação
          </Button>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Regras Ativas</CardTitle>
            <Zap className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {rules.filter(r => r.active).length}
            </div>
            <p className="text-xs text-muted-foreground">
              de {rules.length} regras criadas
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Execuções</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performance.triggered.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              automações disparadas
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Sucesso</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{successRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              conversões efetivas
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Gerada</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {(performance.revenue / 1000000).toFixed(1)}M
            </div>
            <p className="text-xs text-muted-foreground">
              resultado das automações
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Rules List */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Regras de Automação</h2>
          
          {rules.map((rule) => {
            const TriggerIcon = triggerIcons[rule.trigger.type]
            const successRate = rule.performance.triggered > 0 
              ? (rule.performance.success / rule.performance.triggered) * 100 
              : 0

            return (
              <Card 
                key={rule.id} 
                className={cn(
                  "cursor-pointer transition-colors",
                  selectedRule === rule.id ? "ring-2 ring-blue-500" : "",
                  !rule.active ? "opacity-60" : ""
                )}
                onClick={() => setSelectedRule(rule.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className={cn(
                        "p-2 rounded-full",
                        rule.active ? "bg-green-100" : "bg-gray-100"
                      )}>
                        <TriggerIcon className={cn(
                          "h-4 w-4",
                          rule.active ? "text-green-600" : "text-gray-400"
                        )} />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-sm font-medium">
                          {rule.name}
                        </CardTitle>
                        <CardDescription className="text-xs mt-1">
                          {rule.description}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleRule(rule.id)
                        }}
                        className="h-6 w-6"
                      >
                        {rule.active ? (
                          <Pause className="h-3 w-3 text-orange-600" />
                        ) : (
                          <Play className="h-3 w-3 text-green-600" />
                        )}
                      </Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Execuções</p>
                      <p className="font-medium">{rule.performance.triggered}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Sucesso</p>
                      <p className="font-medium text-green-600">{successRate.toFixed(1)}%</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Receita</p>
                      <p className="font-medium">
                        R$ {(rule.performance.revenue / 1000).toFixed(0)}k
                      </p>
                    </div>
                  </div>
                  
                  {/* Actions Preview */}
                  <div className="flex items-center space-x-2 mt-3">
                    <span className="text-xs text-gray-500">Ações:</span>
                    {rule.actions.slice(0, 3).map((action, index) => {
                      const ActionIcon = actionIcons[action.type]
                      return (
                        <div key={index} className="p-1 bg-gray-100 rounded">
                          <ActionIcon className="h-3 w-3 text-gray-600" />
                        </div>
                      )
                    })}
                    {rule.actions.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{rule.actions.length - 3} mais
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Rule Details */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Detalhes da Regra</h2>
          
          {selectedRule ? (
            (() => {
              const rule = rules.find(r => r.id === selectedRule)
              if (!rule) return null

              return (
                <Card>
                  <CardHeader>
                    <CardTitle>{rule.name}</CardTitle>
                    <CardDescription>{rule.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    {/* Trigger */}
                    <div>
                      <h4 className="font-medium mb-3">Gatilho</h4>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="p-1 bg-blue-100 rounded">
                            {(() => {
                              const TriggerIcon = triggerIcons[rule.trigger.type]
                              return <TriggerIcon className="h-4 w-4 text-blue-600" />
                            })()}
                          </div>
                          <span className="font-medium text-blue-800">
                            {rule.trigger.type.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>
                        <div className="space-y-1">
                          {rule.trigger.conditions.map((condition, index) => (
                            <div key={index} className="text-sm text-blue-700">
                              <span className="font-medium">{condition.field}</span>{' '}
                              <span className="text-blue-600">{condition.operator}</span>{' '}
                              <span className="font-medium">{String(condition.value)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div>
                      <h4 className="font-medium mb-3">Ações</h4>
                      <div className="space-y-2">
                        {rule.actions.map((action, index) => {
                          const ActionIcon = actionIcons[action.type]
                          return (
                            <div key={index} className="p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center space-x-2 mb-2">
                                <div className="p-1 bg-gray-200 rounded">
                                  <ActionIcon className="h-4 w-4 text-gray-600" />
                                </div>
                                <span className="font-medium">
                                  {action.type.replace('_', ' ').toUpperCase()}
                                </span>
                              </div>
                              {action.parameters.message && (
                                <p className="text-sm text-gray-700 italic">
                                  "{action.parameters.message}"
                                </p>
                              )}
                              {action.parameters.template && (
                                <p className="text-sm text-gray-600">
                                  Template: {action.parameters.template}
                                </p>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Performance */}
                    <div>
                      <h4 className="font-medium mb-3">Performance</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">
                            {rule.performance.triggered}
                          </div>
                          <div className="text-sm text-blue-700">Execuções</div>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">
                            {rule.performance.success}
                          </div>
                          <div className="text-sm text-green-700">Sucessos</div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2 pt-4 border-t">
                      <Button variant="outline" className="flex-1">
                        <Settings className="h-4 w-4 mr-2" />
                        Editar
                      </Button>
                      <Button 
                        variant={rule.active ? "destructive" : "default"}
                        onClick={() => toggleRule(rule.id)}
                        className="flex-1"
                      >
                        {rule.active ? (
                          <>
                            <Pause className="h-4 w-4 mr-2" />
                            Pausar
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Ativar
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })()
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-64">
                <div className="text-center text-gray-500">
                  <Zap className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Selecione uma regra para ver os detalhes</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}