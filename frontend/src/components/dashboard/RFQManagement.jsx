import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
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
  FileEdit,
  Search,
  Filter,
  AlertCircle,
  TrendingUp,
  MessageSquare
} from 'lucide-react';
import { useToast } from '../../hooks/use-toast';

export const RFQManagement = ({ projects: initialProjects }) => {
  const [projects, setProjects] = useState(initialProjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newProject, setNewProject] = useState({
    projectName: '',
    totalItems: '',
    deadline: ''
  });
  const { toast } = useToast();

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.projectName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-blue-100 text-blue-800', text: 'Aktif', icon: Clock },
      completed: { color: 'bg-green-100 text-green-800', text: 'Tamamlandı', icon: CheckCircle },
      draft: { color: 'bg-gray-100 text-gray-800', text: 'Taslak', icon: FileEdit }
    };
    
    const config = statusConfig[status];
    const IconComponent = config.icon;
    
    return (
      <Badge className={`${config.color} border-0 text-xs`}>
        <IconComponent className="w-3 h-3 mr-1" />
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
    if (!newProject.projectName.trim()) {
      toast({
        title: "Hata",
        description: "Proje adı gereklidir.",
        variant: "destructive",
      });
      return;
    }

    const project = {
      id: projects.length + 1,
      projectName: newProject.projectName,
      status: 'draft',
      totalItems: parseInt(newProject.totalItems) || 0,
      suppliersContacted: 0,
      quotesReceived: 0,
      deadline: newProject.deadline || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      estimatedSavings: '-%',
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setProjects([project, ...projects]);
    setNewProject({ projectName: '', totalItems: '', deadline: '' });
    setShowCreateForm(false);
    
    toast({
      title: "RFQ Projesi Oluşturuldu!",
      description: `${project.projectName} başarıyla oluşturuldu.`,
    });
  };

  const handleProjectAction = (projectId, action) => {
    const project = projects.find(p => p.id === projectId);
    
    switch (action) {
      case 'send':
        setProjects(prev => prev.map(p => 
          p.id === projectId 
            ? { ...p, status: 'active', suppliersContacted: Math.floor(Math.random() * 8) + 3 }
            : p
        ));
        toast({
          title: "RFQ Gönderildi!",
          description: `${project.projectName} tedarikçilere gönderildi.`,
        });
        break;
      case 'complete':
        setProjects(prev => prev.map(p => 
          p.id === projectId 
            ? { 
                ...p, 
                status: 'completed', 
                quotesReceived: p.suppliersContacted,
                estimatedSavings: `%${Math.floor(Math.random() * 10) + 5}`
              }
            : p
        ));
        toast({
          title: "RFQ Tamamlandı!",
          description: `${project.projectName} başarıyla tamamlandı.`,
        });
        break;
      case 'delete':
        setProjects(prev => prev.filter(p => p.id !== projectId));
        toast({
          title: "Proje Silindi",
          description: `${project.projectName} silindi.`,
        });
        break;
      default:
        break;
    }
  };

  const calculateTotalStats = () => {
    return {
      total: projects.length,
      active: projects.filter(p => p.status === 'active').length,
      completed: projects.filter(p => p.status === 'completed').length,
      avgSavings: projects
        .filter(p => p.estimatedSavings !== '-%')
        .reduce((acc, p) => acc + parseInt(p.estimatedSavings.replace('%', '')), 0) / 
        Math.max(projects.filter(p => p.estimatedSavings !== '-%').length, 1) || 0
    };
  };

  const stats = calculateTotalStats();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">RFQ Yönetimi</h1>
          <p className="text-lg text-gray-600">Teklif taleplerini oluşturun ve takip edin</p>
        </div>
        <div className="flex space-x-2">
          {selectedProjects.length > 0 && (
            <>
              <Button variant="outline" size="sm">
                <Mail className="h-4 w-4 mr-2" />
                Toplu Gönder ({selectedProjects.length})
              </Button>
              <Button variant="outline" size="sm" onClick={() => setSelectedProjects([])}>
                İptal
              </Button>
            </>
          )}
          <Button 
            onClick={() => setShowCreateForm(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Yeni RFQ Oluştur
          </Button>
        </div>
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
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
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
                <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
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
                <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
                <p className="text-sm text-gray-600">Aktif</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">%{stats.avgSavings.toFixed(1)}</p>
                <p className="text-sm text-gray-600">Ort. Tasarruf</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create RFQ Form */}
      {showCreateForm && (
        <Card className="bg-white border border-orange-200 shadow-sm">
          <CardHeader className="bg-orange-50">
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <Plus className="h-5 w-5 text-orange-500" />
                <span>Yeni RFQ Projesi</span>
              </span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowCreateForm(false)}
              >
                ✕
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Proje Adı *
                </label>
                <Input
                  value={newProject.projectName}
                  onChange={(e) => setNewProject(prev => ({...prev, projectName: e.target.value}))}
                  placeholder="Örn: Q1 2024 Metal Parçalar"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Parça Sayısı
                </label>
                <Input
                  type="number"
                  value={newProject.totalItems}
                  onChange={(e) => setNewProject(prev => ({...prev, totalItems: e.target.value}))}
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Son Tarih
                </label>
                <Input
                  type="date"
                  value={newProject.deadline}
                  onChange={(e) => setNewProject(prev => ({...prev, deadline: e.target.value}))}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                İptal
              </Button>
              <Button onClick={handleCreateRFQ} className="bg-orange-500 hover:bg-orange-600">
                Proje Oluştur
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Proje adı ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex space-x-2">
              {['all', 'draft', 'active', 'completed'].map((status) => (
                <Button
                  key={status}
                  variant={statusFilter === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter(status)}
                  className={statusFilter === status ? 
                    'bg-orange-500 hover:bg-orange-600 text-white' : 
                    'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }
                >
                  {status === 'all' ? 'Tümü' : 
                   status === 'draft' ? 'Taslak' :
                   status === 'active' ? 'Aktif' : 'Tamamlanan'}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* RFQ Projects Table */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-orange-500" />
            <span>RFQ Projeleri ({filteredProjects.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedProjects(filteredProjects.map(p => p.id));
                        } else {
                          setSelectedProjects([]);
                        }
                      }}
                      className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                    />
                  </th>
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
                {filteredProjects.map((project) => {
                  const progressPercentage = getProgressPercentage(project.quotesReceived, project.suppliersContacted);
                  const isOverdue = new Date(project.deadline) < new Date() && project.status === 'active';
                  
                  return (
                    <tr key={project.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedProjects.includes(project.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedProjects([...selectedProjects, project.id]);
                            } else {
                              setSelectedProjects(selectedProjects.filter(id => id !== project.id));
                            }
                          }}
                          className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{project.projectName}</div>
                        <div className="text-xs text-gray-500 flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          Oluşturulma: {formatDate(project.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-1">
                          {getStatusBadge(project.status)}
                          {isOverdue && (
                            <div className="flex items-center text-xs text-red-600">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              Süresi Geçti
                            </div>
                          )}
                        </div>
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
                        <div className={`text-sm ${isOverdue ? 'text-red-600 font-medium' : 'text-gray-900'}`}>
                          {formatDate(project.deadline)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm font-medium ${
                          project.estimatedSavings !== '-%' ? 'text-green-600' : 'text-gray-400'
                        }`}>
                          {project.estimatedSavings}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          {project.status === 'draft' && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-orange-500 hover:text-orange-600"
                              onClick={() => handleProjectAction(project.id, 'send')}
                            >
                              <Send className="h-4 w-4" />
                            </Button>
                          )}
                          {project.status === 'active' && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-green-500 hover:text-green-600"
                              onClick={() => handleProjectAction(project.id, 'complete')}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            
            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">RFQ projesi bulunamadı</h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm || statusFilter !== 'all' 
                    ? 'Arama kriterlerinizi değiştirmeyi deneyin' 
                    : 'İlk RFQ projenizi oluşturun'}
                </p>
                <Button onClick={() => setShowCreateForm(true)} className="bg-orange-500 hover:bg-orange-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Yeni RFQ Oluştur
                </Button>
              </div>
            )}
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
            {[
              { name: 'Metal Parçalar', desc: 'Döküm ve CNC parçalar için standart şablon', items: 15 },
              { name: 'Plastik Komponentler', desc: 'Enjeksiyon kalıplama şablonu', items: 8 },
              { name: 'Elektronik Kartlar', desc: 'PCB ve elektronik montaj şablonu', items: 12 }
            ].map((template, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-orange-300 cursor-pointer transition-colors group">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900 group-hover:text-orange-600">{template.name}</h4>
                  <Badge variant="secondary" className="text-xs">{template.items} parça</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">{template.desc}</p>
                <Button size="sm" variant="outline" className="w-full group-hover:border-orange-500 group-hover:text-orange-600">
                  Şablonu Kullan
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};