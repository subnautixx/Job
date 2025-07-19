'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Brain,
  TrendingUp,
  Clock,
  MessageSquare,
  Target,
  DollarSign,
  Car,
  Palette,
  Settings,
  Zap,
  AlertTriangle,
  CheckCircle,
  Heart,
  Star,
  Trophy
} from 'lucide-react'
import { AICustomerProfile } from '@/types'
import { formatCurrency, cn } from '@/lib/utils'

interface CustomerAIProfileProps {
  profile: AICustomerProfile
  customerName: string
  onUpdateProfile?: () => void
}

const customerTypeLabels = {
  family: 'Família',
  investor: 'Investidor',
  enthusiast: 'Entusiasta',
  business: 'Empresarial',
  first_time_buyer: 'Primeira Compra'
}

const customerTypeIcons = {
  family: Heart,
  investor: TrendingUp,
  enthusiast: Star,
  business: Target,
  first_time_buyer: Trophy
}

const customerTypeColors = {
  family: 'text-pink-600 bg-pink-100',
  investor: 'text-green-600 bg-green-100',
  enthusiast: 'text-purple-600 bg-purple-100',
  business: 'text-blue-600 bg-blue-100',
  first_time_buyer: 'text-orange-600 bg-orange-100'
}

const decisionSpeedLabels = {
  fast: 'Rápida',
  medium: 'Moderada',
  slow: 'Lenta'
}

const decisionSpeedColors = {
  fast: 'text-green-600',
  medium: 'text-yellow-600',
  slow: 'text-red-600'
}

const priceConsciousnessLabels = {
  low: 'Baixa',
  medium: 'Média',
  high: 'Alta'
}

const priceConsciousnessColors = {
  low: 'text-green-600',
  medium: 'text-yellow-600',
  high: 'text-red-600'
}

export function CustomerAIProfile({ profile, customerName, onUpdateProfile }: CustomerAIProfileProps) {
  const CustomerTypeIcon = customerTypeIcons[profile.customerType]
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={cn(
                "p-3 rounded-full",
                customerTypeColors[profile.customerType]
              )}>
                <Brain className="h-6 w-6" />
              </div>
              <div>
                <CardTitle>Perfil de IA - {customerName}</CardTitle>
                <CardDescription>
                  Análise comportamental atualizada em {profile.lastUpdated.toLocaleDateString()}
                </CardDescription>
              </div>
            </div>
            <Button variant="outline" onClick={onUpdateProfile}>
              <Zap className="h-4 w-4 mr-2" />
              Atualizar Perfil
            </Button>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Tipo de Cliente */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CustomerTypeIcon className="h-5 w-5 mr-2" />
              Perfil do Cliente
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className={cn(
              "p-4 rounded-lg text-center",
              customerTypeColors[profile.customerType]
            )}>
              <CustomerTypeIcon className="h-8 w-8 mx-auto mb-2" />
              <h3 className="font-bold text-lg">
                {customerTypeLabels[profile.customerType]}
              </h3>
              <p className="text-sm opacity-80">
                {profile.customerType === 'family' && 'Busca veículos para uso familiar, valoriza segurança e economia'}
                {profile.customerType === 'investor' && 'Foca no valor de revenda e investimento'}
                {profile.customerType === 'enthusiast' && 'Apaixonado por carros, valoriza performance'}
                {profile.customerType === 'business' && 'Uso corporativo, valoriza status e praticidade'}
                {profile.customerType === 'first_time_buyer' && 'Primeira compra, precisa de orientação'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Velocidade de Decisão</p>
                <p className={cn(
                  "font-medium",
                  decisionSpeedColors[profile.behavior.decisionSpeed]
                )}>
                  {decisionSpeedLabels[profile.behavior.decisionSpeed]}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Sensibilidade ao Preço</p>
                <p className={cn(
                  "font-medium",
                  priceConsciousnessColors[profile.behavior.priceConsciousness]
                )}>
                  {priceConsciousnessLabels[profile.behavior.priceConsciousness]}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comportamento */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Padrões de Comportamento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">Método Preferido</span>
                </div>
                <span className="text-sm font-bold text-blue-600">
                  {profile.behavior.preferredContactMethod === 'whatsapp' ? 'WhatsApp' :
                   profile.behavior.preferredContactMethod === 'email' ? 'E-mail' : 'Telefone'}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">Melhor Horário</span>
                </div>
                <span className="text-sm font-bold text-green-600">
                  {profile.behavior.bestContactTime}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium">Tempo de Resposta</span>
                </div>
                <span className="text-sm font-bold text-purple-600">
                  {profile.behavior.responseTime}h média
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preferências de Veículo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Car className="h-5 w-5 mr-2" />
              Preferências de Veículo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">Faixa de Preço</p>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="font-bold text-green-600">
                  {formatCurrency(profile.preferences.priceRange.min)}
                </span>
                <span className="text-gray-400">até</span>
                <span className="font-bold text-green-600">
                  {formatCurrency(profile.preferences.priceRange.max)}
                </span>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">Tipos de Veículo</p>
              <div className="flex flex-wrap gap-2">
                {profile.preferences.vehicleType.map((type, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                    {type.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">Cores Preferidas</p>
              <div className="flex flex-wrap gap-2">
                {profile.preferences.preferredColors.map((color, index) => (
                  <div key={index} className="flex items-center space-x-1">
                    <Palette className="h-3 w-3 text-gray-400" />
                    <span className="text-xs font-medium capitalize">{color}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">Transmissão</p>
              <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                {profile.preferences.transmission === 'automatic' ? 'Automático' :
                 profile.preferences.transmission === 'manual' ? 'Manual' : 'Ambos'}
              </span>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">Combustível</p>
              <div className="flex flex-wrap gap-2">
                {profile.preferences.fuelType.map((fuel, index) => (
                  <span key={index} className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                    {fuel.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Insights de IA */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="h-5 w-5 mr-2 text-purple-600" />
              Insights de IA
            </CardTitle>
            <CardDescription>
              Análises comportamentais automatizadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {profile.insights.map((insight, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                  <div className="p-1 bg-purple-100 rounded-full mt-0.5">
                    <Zap className="h-3 w-3 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-purple-800">{insight}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Recomendações */}
            <div className="mt-6 p-4 border border-purple-200 rounded-lg">
              <h4 className="font-medium text-purple-800 mb-3 flex items-center">
                <Target className="h-4 w-4 mr-2" />
                Recomendações de Abordagem
              </h4>
              <div className="space-y-2 text-sm">
                {profile.customerType === 'family' && (
                  <>
                    <div className="flex items-center text-green-700">
                      <CheckCircle className="h-3 w-3 mr-2" />
                      Enfatize segurança e espaço interno
                    </div>
                    <div className="flex items-center text-green-700">
                      <CheckCircle className="h-3 w-3 mr-2" />
                      Mostre economia de combustível
                    </div>
                  </>
                )}
                {profile.customerType === 'business' && (
                  <>
                    <div className="flex items-center text-green-700">
                      <CheckCircle className="h-3 w-3 mr-2" />
                      Destaque status e tecnologia
                    </div>
                    <div className="flex items-center text-green-700">
                      <CheckCircle className="h-3 w-3 mr-2" />
                      Ofereça condições empresariais
                    </div>
                  </>
                )}
                {profile.customerType === 'first_time_buyer' && (
                  <>
                    <div className="flex items-center text-green-700">
                      <CheckCircle className="h-3 w-3 mr-2" />
                      Ofereça orientação detalhada
                    </div>
                    <div className="flex items-center text-green-700">
                      <CheckCircle className="h-3 w-3 mr-2" />
                      Explique processo de financiamento
                    </div>
                  </>
                )}
                
                {profile.behavior.priceConsciousness === 'high' && (
                  <div className="flex items-center text-orange-700">
                    <AlertTriangle className="h-3 w-3 mr-2" />
                    Cliente sensível ao preço - ofereça descontos estratégicos
                  </div>
                )}
                
                {profile.behavior.decisionSpeed === 'fast' && (
                  <div className="flex items-center text-blue-700">
                    <TrendingUp className="h-3 w-3 mr-2" />
                    Decisão rápida - acelere o processo de fechamento
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}