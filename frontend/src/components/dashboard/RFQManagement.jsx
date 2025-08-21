import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  Mail, 
  Plus, 
  Calendar,
  Users,
  FileText,
  BarChart3,
  Eye,
  Edit,
  Send,
  Clock,
  CheckCircle,
  FileEdit
} from 'lucide-react';

export const RFQManagement = ({ projects: initialProjects }) => {
  const [projects, setProjects] = useState(initialProjects);

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-blue-100 text-blue-800', text: 'Aktif' },
      completed: { color: 'bg-green-100 text-green-800', text: 'Tamamlandı' },
      draft: { color: 'bg-gray-100 text-gray-800', text: 'Taslak' }
    };
    
    const config = statusConfig[status];
    return (
      <Badge className={`${config.color} border-0 text-xs`}>
        {config.text}
      </Badge>
    );
  };

  const getProgressPercentage = (quotesReceived, suppliersContacted) => {
    if (suppliersContacted === 0) return 0;
    return Math.round((quotesReceived / suppliersContacted) * 100);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('tr-TR');
  };

  const handleCreateRFQ = () => {
    const newProject = {
      id: projects.length + 1,
      projectName: `Yeni RFQ Projesi ${projects.length + 1}`,
      status: 'draft',
      totalItems: 0,
      suppliersContacted: 0,
      quotesReceived: 0,
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      estimatedSavings: '-%',
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setProjects([newProject, ...projects]);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">RFQ Yönetimi</h1>
          <p className="text-lg text-gray-600">Teklif taleplerini oluşturun ve takip edin</p>
        </div>
        <Button 
          onClick={handleCreateRFQ}
          className="bg-orange-500 hover:bg-orange-600 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Yeni RFQ Oluştur
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <Mail className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{projects.length}</p>
                <p className="text-sm text-gray-600">Toplam RFQ</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {projects.filter(p => p.status === 'completed').length}
                </p>
                <p className="text-sm text-gray-600">Tamamlanan</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {projects.filter(p => p.status === 'active').length}
                </p>
                <p className="text-sm text-gray-600">Aktif</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                <BarChart3 className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">%8.5</p>
                <p className="text-sm text-gray-600">Ort. Tasarruf</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* RFQ Projects Table */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-orange-500" />
            <span>RFQ Projeleri</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Proje Adı
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Durum
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Parça Sayısı
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tedarikçi/Teklif
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İlerleme
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Son Tarih
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tasarruf
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {projects.map((project) => {
                  const progressPercentage = getProgressPercentage(project.quotesReceived, project.suppliersContacted);
                  
                  return (
                    <tr key={project.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{project.projectName}</div>
                        <div className="text-xs text-gray-500">Oluşturulma: {formatDate(project.createdAt)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(project.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{project.totalItems} parça</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {project.suppliersContacted}/{project.quotesReceived}
                        </div>
                        <div className="text-xs text-gray-500">iletişim/teklif</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap w-32">
                        <div className="flex items-center space-x-2">
                          <Progress value={progressPercentage} className="flex-1" />
                          <span className="text-xs text-gray-600">{progressPercentage}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatDate(project.deadline)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm font-medium ${
                          project.estimatedSavings !== '-' ? 'text-green-600' : 'text-gray-400'
                        }`}>
                          {project.estimatedSavings}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          {project.status === 'draft' && (
                            <Button variant="ghost" size="sm" className="text-orange-500">
                              <Send className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* RFQ Templates */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileEdit className="h-5 w-5 text-orange-500" />
            <span>RFQ Şablonları</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg hover:border-orange-300 cursor-pointer transition-colors">
              <h4 className="font-medium text-gray-900 mb-2">Metal Parçalar</h4>
              <p className="text-sm text-gray-600 mb-3">Döküm ve CNC parçalar için standart şablon</p>
              <Button size="sm" variant="outline">Kullan</Button>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg hover:border-orange-300 cursor-pointer transition-colors">
              <h4 className="font-medium text-gray-900 mb-2">Plastik Komponentler</h4>
              <p className="text-sm text-gray-600 mb-3">Enjeksiyon kalıplama şablonu</p>
              <Button size="sm" variant="outline">Kullan</Button>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg hover:border-orange-300 cursor-pointer transition-colors">
              <h4 className="font-medium text-gray-900 mb-2">Elektronik Kartlar</h4>
              <p className="text-sm text-gray-600 mb-3">PCB ve elektronik montaj şablonu</p>
              <Button size="sm" variant="outline">Kullan</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};