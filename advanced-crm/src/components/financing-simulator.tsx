'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Calculator,
  Car,
  CreditCard,
  Percent,
  Calendar,
  TrendingUp,
  Save,
  Send,
  FileText,
  DollarSign
} from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { FinancingSimulation } from '@/types'

interface FinancingSimulatorProps {
  vehiclePrice?: number
  customerId?: string
  dealId?: string
  onSave?: (simulation: FinancingSimulation) => void
  onSendProposal?: (simulation: FinancingSimulation) => void
}

const banks = [
  { id: 'santander', name: 'Santander', rate: 1.89, maxTerm: 60 },
  { id: 'itau', name: 'Itaú', rate: 1.95, maxTerm: 60 },
  { id: 'bradesco', name: 'Bradesco', rate: 1.92, maxTerm: 48 },
  { id: 'caixa', name: 'Caixa', rate: 1.85, maxTerm: 60 },
  { id: 'banco_brasil', name: 'Banco do Brasil', rate: 1.88, maxTerm: 60 },
]

export function FinancingSimulator({ 
  vehiclePrice = 0, 
  customerId, 
  dealId, 
  onSave, 
  onSendProposal 
}: FinancingSimulatorProps) {
  const [price, setPrice] = useState(vehiclePrice)
  const [downPayment, setDownPayment] = useState(vehiclePrice * 0.2)
  const [selectedBank, setSelectedBank] = useState(banks[0])
  const [termMonths, setTermMonths] = useState(48)
  const [simulations, setSimulations] = useState<FinancingSimulation[]>([])
  const [currentSimulation, setCurrentSimulation] = useState<FinancingSimulation | null>(null)

  // Calculadora de financiamento
  const calculateFinancing = (
    vehiclePrice: number,
    downPayment: number,
    interestRate: number,
    term: number
  ) => {
    const loanAmount = vehiclePrice - downPayment
    const monthlyRate = interestRate / 100
    const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, term)) / 
                          (Math.pow(1 + monthlyRate, term) - 1)
    const totalAmount = monthlyPayment * term + downPayment
    
    return {
      loanAmount,
      monthlyPayment,
      totalAmount,
      totalInterest: totalAmount - vehiclePrice
    }
  }

  // Gerar simulações para todos os bancos
  const generateSimulations = () => {
    const newSimulations = banks.map(bank => {
      const calc = calculateFinancing(price, downPayment, bank.rate, termMonths)
      
      return {
        id: `${bank.id}-${Date.now()}`,
        vehiclePrice: price,
        downPayment,
        loanAmount: calc.loanAmount,
        interestRate: bank.rate,
        termMonths,
        monthlyPayment: calc.monthlyPayment,
        totalAmount: calc.totalAmount,
        bank: bank.name,
        approved: Math.random() > 0.2, // Simula aprovação
        customerId,
        dealId,
        createdAt: new Date()
      }
    })
    
    setSimulations(newSimulations)
    setCurrentSimulation(newSimulations[0])
  }

  useEffect(() => {
    if (price > 0) {
      generateSimulations()
    }
  }, [price, downPayment, termMonths])

  const downPaymentPercentage = price > 0 ? (downPayment / price) * 100 : 0

  const handleSaveSimulation = () => {
    if (currentSimulation && onSave) {
      onSave(currentSimulation)
    }
  }

  const handleSendProposal = () => {
    if (currentSimulation && onSendProposal) {
      onSendProposal(currentSimulation)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-blue-100 rounded-full">
          <Calculator className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-medium">Simulador de Financiamento</h3>
          <p className="text-sm text-gray-600">
            Calcule as melhores condições para seu cliente
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Formulário de Entrada */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Car className="h-4 w-4 mr-2" />
              Dados do Veículo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Valor do Veículo</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="pl-10"
                  placeholder="Ex: 85000"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">
                Entrada ({downPaymentPercentage.toFixed(0)}%)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="pl-10"
                  placeholder="Ex: 17000"
                />
              </div>
              <div className="mt-2">
                <input
                  type="range"
                  min={price * 0.1}
                  max={price * 0.5}
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>10%</span>
                  <span>50%</span>
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Prazo (meses)</label>
              <select
                value={termMonths}
                onChange={(e) => setTermMonths(Number(e.target.value))}
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value={12}>12 meses</option>
                <option value={24}>24 meses</option>
                <option value={36}>36 meses</option>
                <option value={48}>48 meses</option>
                <option value={60}>60 meses</option>
              </select>
            </div>

            <Button onClick={generateSimulations} className="w-full">
              <Calculator className="h-4 w-4 mr-2" />
              Calcular Financiamento
            </Button>
          </CardContent>
        </Card>

        {/* Resultados */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="h-4 w-4 mr-2" />
              Simulações
            </CardTitle>
            <CardDescription>
              Compare as opções disponíveis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {simulations.length > 0 ? (
              <>
                {/* Seletor de Banco */}
                <div className="grid gap-2">
                  {simulations.map((sim) => (
                    <div
                      key={sim.id}
                      onClick={() => setCurrentSimulation(sim)}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        currentSimulation?.id === sim.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${
                            sim.approved ? 'bg-green-500' : 'bg-red-500'
                          }`} />
                          <div>
                            <p className="font-medium">{sim.bank}</p>
                            <p className="text-sm text-gray-600">
                              {sim.interestRate}% a.m.
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">
                            {formatCurrency(sim.monthlyPayment)}
                          </p>
                          <p className="text-xs text-gray-500">por mês</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Detalhes da Simulação Selecionada */}
                {currentSimulation && (
                  <div className="border-t pt-4 space-y-3">
                    <h4 className="font-medium">Detalhes - {currentSimulation.bank}</h4>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Valor Financiado</p>
                        <p className="font-medium">{formatCurrency(currentSimulation.loanAmount)}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Taxa de Juros</p>
                        <p className="font-medium">{currentSimulation.interestRate}% a.m.</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Parcela Mensal</p>
                        <p className="font-medium text-green-600">
                          {formatCurrency(currentSimulation.monthlyPayment)}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Total a Pagar</p>
                        <p className="font-medium">{formatCurrency(currentSimulation.totalAmount)}</p>
                      </div>
                    </div>

                    {/* Status da Aprovação */}
                    <div className={`p-3 rounded-lg ${
                      currentSimulation.approved 
                        ? 'bg-green-50 border border-green-200' 
                        : 'bg-red-50 border border-red-200'
                    }`}>
                      <div className="flex items-center space-x-2">
                        {currentSimulation.approved ? (
                          <>
                            <TrendingUp className="h-4 w-4 text-green-600" />
                            <span className="text-green-800 font-medium">Pré-aprovado</span>
                          </>
                        ) : (
                          <>
                            <Calendar className="h-4 w-4 text-red-600" />
                            <span className="text-red-800 font-medium">Análise necessária</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Ações */}
                    <div className="flex space-x-2 pt-2">
                      <Button variant="outline" onClick={handleSaveSimulation} className="flex-1">
                        <Save className="h-4 w-4 mr-2" />
                        Salvar
                      </Button>
                      <Button onClick={handleSendProposal} className="flex-1">
                        <Send className="h-4 w-4 mr-2" />
                        Enviar Proposta
                      </Button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Calculator className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Preencha os dados para calcular</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Resumo Comparativo */}
      {simulations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Comparativo de Simulações</CardTitle>
            <CardDescription>
              Análise completa das opções disponíveis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Banco</th>
                    <th className="text-right py-2">Taxa</th>
                    <th className="text-right py-2">Parcela</th>
                    <th className="text-right py-2">Total</th>
                    <th className="text-center py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {simulations.map((sim) => (
                    <tr key={sim.id} className="border-b">
                      <td className="py-2 font-medium">{sim.bank}</td>
                      <td className="py-2 text-right">{sim.interestRate}%</td>
                      <td className="py-2 text-right font-medium text-green-600">
                        {formatCurrency(sim.monthlyPayment)}
                      </td>
                      <td className="py-2 text-right">{formatCurrency(sim.totalAmount)}</td>
                      <td className="py-2 text-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          sim.approved 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {sim.approved ? 'Aprovado' : 'Pendente'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}