'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Brain,
  Download,
  RefreshCw,
  Zap,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area
} from 'recharts'
import { formatCurrency } from '@/lib/utils'

// Mock data para análises avançadas
const salesTrendData = [
  { month: 'Jul', vendas: 45000, meta: 50000, leads: 120, conversao: 18.5 },
  { month: 'Ago', vendas: 52000, meta: 50000, leads: 145, conversao: 21.2 },
  { month: 'Set', vendas: 48000, meta: 55000, leads: 132, conversao: 19.8 },
  { month: 'Out', vendas: 61000, meta: 55000, leads: 167, conversao: 23.1 },
  { month: 'Nov', vendas: 55000, meta: 60000, leads: 150, conversao: 20.5 },
  { month: 'Dez', vendas: 67000, meta: 60000, leads: 189, conversao: 24.3 },
  { month: 'Jan', vendas: 72000, meta: 65000, leads: 201, conversao: 26.1 },
]

const performanceData = [
  { name: 'Ana Costa', vendas: 145000, leads: 45, conversao: 28.9, satisfacao: 95 },
  { name: 'Carlos Silva', vendas: 128000, leads: 52, conversao: 24.6, satisfacao: 92 },
  { name: 'Lucia Santos', vendas: 95000, leads: 38, conversao: 21.1, satisfacao: 88 },
  { name: 'Roberto Lima', vendas: 78000, leads: 42, conversao: 18.6, satisfacao: 85 },
]

const funnelData = [
  { stage: 'Visitantes', value: 10000, color: '#3B82F6' },
  { stage: 'Leads', value: 1200, color: '#10B981' },
  { stage: 'Qualificados', value: 480, color: '#F59E0B' },
  { stage: 'Propostas', value: 120, color: '#EF4444' },
  { stage: 'Fechamentos', value: 36, color: '#8B5CF6' },
]

const segmentData = [
  { segment: 'Enterprise', value: 45, revenue: 285000 },
  { segment: 'Médio Porte', value: 35, revenue: 175000 },
  { segment: 'Pequeno', value: 20, revenue: 85000 },
]

const aiInsights = [
  {
    type: 'opportunity',
    title: 'Oportunidade de Crescimento',
    description: 'Clientes do segmento Enterprise têm 35% mais probabilidade de renovação. Foque em upselling.',
    impact: 'Alto',
    confidence: 92
  },
  {
    type: 'warning',
    title: 'Risco de Churn',
    description: '3 clientes grandes não têm atividade há mais de 30 dias. Ação imediata recomendada.',
    impact: 'Crítico',
    confidence: 88
  },
  {
    type: 'success',
    title: 'Performance Excepcional',
    description: 'Ana Costa superou a meta por 3 meses consecutivos. Considere promoção ou bonificação.',
    impact: 'Médio',
    confidence: 95
  },
  {
    type: 'insight',
    title: 'Padrão Sazonal',
    description: 'Vendas aumentam 23% no final do trimestre. Planeje campanhas específicas.',
    impact: 'Médio',
    confidence: 76
  }
]

const forecastData = [
  { month: 'Jan', atual: 72000, previsao: 78000, otimista: 85000, pessimista: 70000 },
  { month: 'Fev', atual: null, previsao: 82000, otimista: 92000, pessimista: 75000 },
  { month: 'Mar', atual: null, previsao: 85000, otimista: 98000, pessimista: 78000 },
  { month: 'Abr', atual: null, previsao: 89000, otimista: 105000, pessimista: 82000 },
  { month: 'Mai', atual: null, previsao: 93000, otimista: 112000, pessimista: 85000 },
  { month: 'Jun', atual: null, previsao: 97000, otimista: 118000, pessimista: 88000 },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Análises Avançadas</h1>
          <p className="text-muted-foreground">
            Insights impulsionados por IA para otimizar suas vendas
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Atualizar
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Relatório
          </Button>
          <Button>
            <Brain className="h-4 w-4 mr-2" />
            IA Insights
          </Button>
        </div>
      </div>

      {/* KPIs principais */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.3%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +2.8%
              </span> vs. mês anterior
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">LTV/CAC Ratio</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2x</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">Excelente</span> relação custo/benefício
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Churn Rate</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.1%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingDown className="h-3 w-3 mr-1" />
                -0.5%
              </span> vs. mês anterior
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Score de Saúde</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">92</div>
            <p className="text-xs text-muted-foreground">
              Performance geral <span className="text-green-600">excelente</span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* IA Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="h-5 w-5 mr-2 text-purple-600" />
            Insights de IA
          </CardTitle>
          <CardDescription>
            Análises automáticas baseadas em machine learning
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {aiInsights.map((insight, index) => (
              <div key={index} className="p-4 rounded-lg border">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {insight.type === 'opportunity' && (
                      <div className="p-2 bg-green-100 rounded-full">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      </div>
                    )}
                    {insight.type === 'warning' && (
                      <div className="p-2 bg-red-100 rounded-full">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                      </div>
                    )}
                    {insight.type === 'success' && (
                      <div className="p-2 bg-blue-100 rounded-full">
                        <CheckCircle className="h-4 w-4 text-blue-600" />
                      </div>
                    )}
                    {insight.type === 'insight' && (
                      <div className="p-2 bg-purple-100 rounded-full">
                        <Brain className="h-4 w-4 text-purple-600" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{insight.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                    <div className="flex items-center mt-2 space-x-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        insight.impact === 'Crítico' ? 'bg-red-100 text-red-800' :
                        insight.impact === 'Alto' ? 'bg-orange-100 text-orange-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {insight.impact}
                      </span>
                      <span className="text-xs text-gray-500">
                        {insight.confidence}% confiança
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Tendência de vendas */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Análise de Tendências</CardTitle>
            <CardDescription>
              Performance vs. metas e taxa de conversão
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'vendas' || name === 'meta' ? formatCurrency(value as number) : `${value}%`,
                    name === 'vendas' ? 'Vendas' : 
                    name === 'meta' ? 'Meta' : 
                    name === 'conversao' ? 'Conversão' : 'Leads'
                  ]}
                />
                <Bar yAxisId="left" dataKey="vendas" fill="#3B82F6" opacity={0.8} />
                <Line yAxisId="left" type="monotone" dataKey="meta" stroke="#EF4444" strokeWidth={2} strokeDasharray="5 5" />
                <Line yAxisId="right" type="monotone" dataKey="conversao" stroke="#10B981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Performance do time */}
        <Card>
          <CardHeader>
            <CardTitle>Performance do Time</CardTitle>
            <CardDescription>
              Vendas e conversão por vendedor
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={80} />
                <Tooltip formatter={(value) => formatCurrency(value as number)} />
                <Bar dataKey="vendas" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Funil de conversão */}
        <Card>
          <CardHeader>
            <CardTitle>Funil de Conversão</CardTitle>
            <CardDescription>
              Jornada do cliente desde visitante até fechamento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {funnelData.map((stage, index) => {
                const percentage = index === 0 ? 100 : (stage.value / funnelData[0].value) * 100
                return (
                  <div key={stage.stage} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: stage.color }}
                      />
                      <span className="font-medium">{stage.stage}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full" 
                          style={{ 
                            backgroundColor: stage.color,
                            width: `${percentage}%`
                          }}
                        />
                      </div>
                      <span className="text-sm font-medium w-16 text-right">
                        {stage.value.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-500 w-12 text-right">
                        {percentage.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Previsões */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="h-5 w-5 mr-2 text-yellow-600" />
            Previsões de IA
          </CardTitle>
          <CardDescription>
            Projeções baseadas em dados históricos e tendências de mercado
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(value as number)} />
              <Area type="monotone" dataKey="pessimista" stackId="1" stroke="#EF4444" fill="#FEE2E2" />
              <Area type="monotone" dataKey="otimista" stackId="2" stroke="#10B981" fill="#D1FAE5" />
              <Line type="monotone" dataKey="previsao" stroke="#3B82F6" strokeWidth={3} />
              <Line type="monotone" dataKey="atual" stroke="#000000" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Segmentação de clientes */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Análise de Segmentos</CardTitle>
            <CardDescription>
              Performance por segmento de cliente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {segmentData.map((segment) => (
                <div key={segment.segment} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{segment.segment}</h4>
                    <p className="text-sm text-gray-600">{segment.value}% da base</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">{formatCurrency(segment.revenue)}</p>
                    <p className="text-sm text-gray-600">receita</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Próximas Ações</CardTitle>
            <CardDescription>
              Recomendações baseadas em IA
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-900">Foque em Enterprise</p>
                <p className="text-xs text-blue-700">ROI 35% maior</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <p className="text-sm font-medium text-orange-900">Contate clientes inativos</p>
                <p className="text-xs text-orange-700">3 em risco de churn</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm font-medium text-green-900">Campanha Q1</p>
                <p className="text-xs text-green-700">Potencial +15% vendas</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}