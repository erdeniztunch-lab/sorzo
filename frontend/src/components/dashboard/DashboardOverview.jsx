import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { 
  FileText, 
  TrendingDown, 
  Briefcase, 
  Clock,
  Upload,
  Search,
  Mail,
  BarChart3,
  ArrowRight,
  CheckCircle,
  Info,
  AlertCircle
} from 'lucide-react';

const iconMap = {
  FileText,
  TrendingDown,
  Briefcase,
  Clock,
  Upload,
  Search,
  Mail,
  BarChart3
};

const activityIcons = {
  rfq_completed: CheckCircle,
  supplier_matched: Search,
  quote_received: Mail,
  export_completed: CheckCircle
};

const activityColors = {
  success: 'text-green-500 bg-green-50',
  info: 'text-blue-500 bg-blue-50',
  warning: 'text-yellow-500 bg-yellow-50'
};

export const DashboardOverview = ({ kpis, activities, onNavigate }) => {
  const quickActions = [
    { 
      id: 'bom-upload', 
      title: 'BOM/CAD Yükle', 
      description: 'Yeni parça listesi yükleyin',
      icon: 'Upload',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    { 
      id: 'supplier-discovery', 
      title: 'Tedarikçi Bul', 
      description: 'AI ile tedarikçi keşfedin',
      icon: 'Search',
      color: 'bg-green-500 hover:bg-green-600'
    },
    { 
      id: 'rfq-management', 
      title: 'RFQ Başlat', 
      description: 'Yeni teklif talebi oluşturun',
      icon: 'Mail',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    { 
      id: 'quote-matrix', 
      title: 'Teklifleri Analiz Et', 
      description: 'Skorlama matrisini görüntüleyin',
      icon: 'BarChart3',
      color: 'bg-orange-500 hover:bg-orange-600'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-lg text-gray-600">Tedarik süreçlerinizi yönetin ve analiz edin</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi) => {
          const IconComponent = iconMap[kpi.icon];
          const isPositive = kpi.changeType === 'positive';
          const isNeutral = kpi.changeType === 'neutral';
          
          return (
            <Card key={kpi.id} className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {kpi.title}
                  </CardTitle>
                  <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
                    <IconComponent className="h-4 w-4 text-gray-600" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-3xl font-bold text-gray-900 mb-1">{kpi.value}</div>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm font-medium ${
                    isPositive ? 'text-green-600' : 
                    isNeutral ? 'text-gray-500' : 'text-red-600'
                  }`}>
                    {kpi.change}
                  </span>
                  <span className="text-sm text-gray-500">{kpi.description}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Hızlı İşlemler</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {quickActions.map((action) => {
              const IconComponent = iconMap[action.icon];
              return (
                <Card key={action.id} className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${action.color} group-hover:scale-110 transition-transform`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{action.title}</h3>
                        <p className="text-sm text-gray-500 mb-3">{action.description}</p>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-orange-500 hover:text-orange-600 hover:bg-orange-50 p-0 h-auto font-medium"
                          onClick={() => onNavigate(action.id)}
                        >
                          Başla
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recent Activities */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6">Son Aktiviteler</h2>
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardContent className="p-0">
              <div className="space-y-0">
                {activities.map((activity, index) => {
                  const IconComponent = activityIcons[activity.type];
                  const colorClass = activityColors[activity.status];
                  
                  return (
                    <div key={activity.id} className={`p-4 ${index !== activities.length - 1 ? 'border-b border-gray-100' : ''}`}>
                      <div className="flex items-start space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${colorClass}`}>
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                          <p className="text-sm text-gray-500 mt-1">{activity.description}</p>
                          <p className="text-xs text-gray-400 mt-2">{activity.timestamp}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};