'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  MoreHorizontal,
  Phone,
  Mail,
  Eye,
  Edit,
  Star,
  Tag
} from 'lucide-react'
import { formatDate, formatCurrency, cn } from '@/lib/utils'

// Mock data para demonstração
const leadsData = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '+55 11 99999-9999',
    company: 'TechCorp Ltda',
    source: 'website',
    status: 'new',
    priority: 'high',
    value: 25000,
    assignedTo: 'Ana Costa',
    tags: ['tecnologia', 'enterprise'],
    lastContact: new Date('2024-01-15'),
    createdAt: new Date('2024-01-10'),
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria.santos@empresa.com',
    phone: '+55 11 88888-8888',
    company: 'Inovação Brasil',
    source: 'referral',
    status: 'contacted',
    priority: 'medium',
    value: 15000,
    assignedTo: 'Carlos Silva',
    tags: ['consulta', 'pequeno'],
    lastContact: new Date('2024-01-14'),
    createdAt: new Date('2024-01-08'),
  },
  {
    id: '3',
    name: 'Pedro Costa',
    email: 'pedro@startup.com',
    phone: '+55 11 77777-7777',
    company: 'StartupXYZ',
    source: 'social',
    status: 'qualified',
    priority: 'high',
    value: 45000,
    assignedTo: 'Lucia Santos',
    tags: ['startup', 'saas'],
    lastContact: new Date('2024-01-13'),
    createdAt: new Date('2024-01-05'),
  },
  {
    id: '4',
    name: 'Ana Oliveira',
    email: 'ana@corporacao.com',
    phone: '+55 11 66666-6666',
    company: 'Corporação ABC',
    source: 'advertising',
    status: 'proposal',
    priority: 'high',
    value: 75000,
    assignedTo: 'Roberto Lima',
    tags: ['corporativo', 'grande'],
    lastContact: new Date('2024-01-12'),
    createdAt: new Date('2024-01-03'),
  },
  {
    id: '5',
    name: 'Carlos Ferreira',
    email: 'carlos@servicos.com',
    phone: '+55 11 55555-5555',
    company: 'Serviços Pro',
    source: 'cold_call',
    status: 'negotiation',
    priority: 'medium',
    value: 30000,
    assignedTo: 'Ana Costa',
    tags: ['serviços', 'médio'],
    lastContact: new Date('2024-01-11'),
    createdAt: new Date('2024-01-01'),
  },
]

const statusColors = {
  new: 'bg-blue-100 text-blue-800',
  contacted: 'bg-yellow-100 text-yellow-800',
  qualified: 'bg-green-100 text-green-800',
  proposal: 'bg-purple-100 text-purple-800',
  negotiation: 'bg-orange-100 text-orange-800',
  won: 'bg-emerald-100 text-emerald-800',
  lost: 'bg-red-100 text-red-800',
}

const statusLabels = {
  new: 'Novo',
  contacted: 'Contatado',
  qualified: 'Qualificado',
  proposal: 'Proposta',
  negotiation: 'Negociação',
  won: 'Ganho',
  lost: 'Perdido',
}

const priorityColors = {
  low: 'text-gray-500',
  medium: 'text-yellow-500',
  high: 'text-red-500',
}

const sourceLabels = {
  website: 'Website',
  referral: 'Indicação',
  social: 'Redes Sociais',
  advertising: 'Publicidade',
  cold_call: 'Cold Call',
  other: 'Outros',
}

export default function LeadsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedPriority, setSelectedPriority] = useState('')

  const filteredLeads = leadsData.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.company.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = selectedStatus === '' || lead.status === selectedStatus
    const matchesPriority = selectedPriority === '' || lead.priority === selectedPriority
    
    return matchesSearch && matchesStatus && matchesPriority
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leads</h1>
          <p className="text-muted-foreground">
            Gerencie seus leads e oportunidades de negócio
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Novo Lead
          </Button>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leadsData.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Novos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {leadsData.filter(l => l.status === 'new').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Qualificados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {leadsData.filter(l => l.status === 'qualified').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Negociação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {leadsData.filter(l => l.status === 'negotiation').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(leadsData.reduce((sum, lead) => sum + lead.value, 0))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e busca */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Buscar por nome, email ou empresa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="">Todos os status</option>
              {Object.entries(statusLabels).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
            
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="">Todas as prioridades</option>
              <option value="high">Alta</option>
              <option value="medium">Média</option>
              <option value="low">Baixa</option>
            </select>
            
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de leads */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Leads</CardTitle>
          <CardDescription>
            {filteredLeads.length} leads encontrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Lead</th>
                  <th className="text-left py-3 px-4 font-medium">Empresa</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">Prioridade</th>
                  <th className="text-left py-3 px-4 font-medium">Valor</th>
                  <th className="text-left py-3 px-4 font-medium">Responsável</th>
                  <th className="text-left py-3 px-4 font-medium">Último Contato</th>
                  <th className="text-right py-3 px-4 font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium">{lead.name}</div>
                        <div className="text-sm text-gray-500">{lead.email}</div>
                        <div className="text-sm text-gray-500">{lead.phone}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium">{lead.company}</div>
                        <div className="text-sm text-gray-500">
                          {sourceLabels[lead.source as keyof typeof sourceLabels]}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={cn(
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        statusColors[lead.status as keyof typeof statusColors]
                      )}>
                        {statusLabels[lead.status as keyof typeof statusLabels]}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <Star 
                          className={cn(
                            'h-4 w-4 mr-1',
                            priorityColors[lead.priority as keyof typeof priorityColors]
                          )}
                          fill="currentColor"
                        />
                        <span className="capitalize">{lead.priority}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium">
                      {formatCurrency(lead.value)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center mr-2">
                          <span className="text-xs font-medium text-white">
                            {lead.assignedTo.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span className="text-sm">{lead.assignedTo}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">
                      {formatDate(lead.lastContact)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="ghost" size="icon">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}