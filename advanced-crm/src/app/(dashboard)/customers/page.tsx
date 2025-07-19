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
  Building,
  MapPin,
  Calendar,
  DollarSign
} from 'lucide-react'
import { formatDate, formatCurrency, cn } from '@/lib/utils'

// Mock data para demonstração
const customersData = [
  {
    id: '1',
    name: 'TechCorp Ltda',
    contactPerson: 'João Silva',
    email: 'joao.silva@techcorp.com',
    phone: '+55 11 99999-9999',
    address: {
      street: 'Av. Paulista, 1000',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01310-100',
      country: 'Brasil'
    },
    totalValue: 125000,
    lastPurchase: new Date('2024-01-15'),
    status: 'active',
    assignedTo: 'Ana Costa',
    tags: ['tecnologia', 'enterprise'],
    createdAt: new Date('2023-06-15'),
  },
  {
    id: '2',
    name: 'Inovação Brasil',
    contactPerson: 'Maria Santos',
    email: 'maria@inovacaobrasil.com',
    phone: '+55 11 88888-8888',
    address: {
      street: 'Rua das Flores, 500',
      city: 'Rio de Janeiro',
      state: 'RJ',
      zipCode: '22000-000',
      country: 'Brasil'
    },
    totalValue: 85000,
    lastPurchase: new Date('2024-01-10'),
    status: 'active',
    assignedTo: 'Carlos Silva',
    tags: ['consultoria', 'médio'],
    createdAt: new Date('2023-08-20'),
  },
  {
    id: '3',
    name: 'StartupXYZ',
    contactPerson: 'Pedro Costa',
    email: 'pedro@startupxyz.com',
    phone: '+55 11 77777-7777',
    address: {
      street: 'Rua Inovação, 123',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567',
      country: 'Brasil'
    },
    totalValue: 45000,
    lastPurchase: new Date('2023-12-20'),
    status: 'inactive',
    assignedTo: 'Lucia Santos',
    tags: ['startup', 'saas'],
    createdAt: new Date('2023-05-10'),
  },
  {
    id: '4',
    name: 'Corporação ABC',
    contactPerson: 'Ana Oliveira',
    email: 'ana@corporacaoabc.com',
    phone: '+55 11 66666-6666',
    address: {
      street: 'Centro Empresarial, Torre A',
      city: 'Brasília',
      state: 'DF',
      zipCode: '70000-000',
      country: 'Brasil'
    },
    totalValue: 275000,
    lastPurchase: new Date('2024-01-05'),
    status: 'active',
    assignedTo: 'Roberto Lima',
    tags: ['corporativo', 'grande'],
    createdAt: new Date('2023-03-15'),
  },
  {
    id: '5',
    name: 'Serviços Pro',
    contactPerson: 'Carlos Ferreira',
    email: 'carlos@servicospro.com',
    phone: '+55 11 55555-5555',
    address: {
      street: 'Rua Comercial, 200',
      city: 'Belo Horizonte',
      state: 'MG',
      zipCode: '30000-000',
      country: 'Brasil'
    },
    totalValue: 95000,
    lastPurchase: new Date('2023-11-30'),
    status: 'prospect',
    assignedTo: 'Ana Costa',
    tags: ['serviços', 'médio'],
    createdAt: new Date('2023-09-10'),
  },
]

const statusColors = {
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-gray-100 text-gray-800',
  prospect: 'bg-blue-100 text-blue-800',
}

const statusLabels = {
  active: 'Ativo',
  inactive: 'Inativo',
  prospect: 'Prospect',
}

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')

  const filteredCustomers = customersData.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = selectedStatus === '' || customer.status === selectedStatus
    
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
          <p className="text-muted-foreground">
            Gerencie sua base de clientes e relacionamentos
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Novo Cliente
          </Button>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customersData.length}</div>
            <p className="text-xs text-muted-foreground">
              Base completa de clientes
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Ativos</CardTitle>
            <Building className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {customersData.filter(c => c.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">
                {Math.round((customersData.filter(c => c.status === 'active').length / customersData.length) * 100)}%
              </span> da base
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(customersData.reduce((sum, customer) => sum + customer.totalValue, 0))}
            </div>
            <p className="text-xs text-muted-foreground">
              Valor total de vendas
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(customersData.reduce((sum, customer) => sum + customer.totalValue, 0) / customersData.length)}
            </div>
            <p className="text-xs text-muted-foreground">
              Valor médio por cliente
            </p>
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
                placeholder="Buscar por nome, contato ou email..."
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
            
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtros Avançados
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Grid de clientes */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCustomers.map((customer) => (
          <Card key={customer.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{customer.name}</CardTitle>
                  <CardDescription className="flex items-center">
                    <Building className="h-4 w-4 mr-1" />
                    {customer.contactPerson}
                  </CardDescription>
                </div>
                <span className={cn(
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                  statusColors[customer.status as keyof typeof statusColors]
                )}>
                  {statusLabels[customer.status as keyof typeof statusLabels]}
                </span>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Informações de contato */}
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="truncate">{customer.email}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>{customer.phone}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="truncate">
                    {customer.address.city}, {customer.address.state}
                  </span>
                </div>
              </div>

              {/* Métricas */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {formatCurrency(customer.totalValue)}
                  </div>
                  <div className="text-xs text-gray-500">Receita Total</div>
                </div>
                <div>
                  <div className="text-sm font-medium">
                    {formatDate(customer.lastPurchase)}
                  </div>
                  <div className="text-xs text-gray-500">Última Compra</div>
                </div>
              </div>

              {/* Responsável */}
              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center space-x-2">
                  <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center">
                    <span className="text-xs font-medium text-white">
                      {customer.assignedTo.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600">{customer.assignedTo}</span>
                </div>
                
                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Mail className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Tags */}
              {customer.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-2">
                  {customer.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Resumo */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo da Base de Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            Mostrando {filteredCustomers.length} de {customersData.length} clientes
          </div>
        </CardContent>
      </Card>
    </div>
  )
}