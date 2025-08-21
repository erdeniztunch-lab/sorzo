import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Progress } from '../ui/progress';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Edit3,
  Download,
  Trash2,
  Search,
  Filter,
  Plus,
  X
} from 'lucide-react';
import { useToast } from '../../hooks/use-toast';

export const BOMUpload = ({ bomItems: initialItems }) => {
  const [bomItems, setBomItems] = useState(initialItems);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingItem, setEditingItem] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const { toast } = useToast();

  const filteredItems = bomItems.filter(item => {
    const matchesSearch = item.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleFileUpload = async (files) => {
    if (!files || files.length === 0) return;
    
    const file = files[0];
    setUploading(true);
    setUploadProgress(0);
    
    // Simulate file upload with progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 20;
      });
    }, 200);

    // Mock file parsing
    setTimeout(() => {
      const newItems = [];
      const itemCount = Math.floor(Math.random() * 5) + 2;
      
      for (let i = 0; i < itemCount; i++) {
        newItems.push({
          id: bomItems.length + i + 1,
          partNumber: `${file.name.slice(0, 2).toUpperCase()}-${String(bomItems.length + i + 1).padStart(3, '0')}`,
          description: `${file.name} - Parça ${i + 1}`,
          quantity: Math.floor(Math.random() * 500) + 100,
          unit: "adet",
          category: ["Döküm", "Plastik", "Elektronik", "CNC"][Math.floor(Math.random() * 4)],
          status: "pending",
          suppliers: 0
        });
      }
      
      setBomItems([...bomItems, ...newItems]);
      setUploading(false);
      setUploadProgress(0);
      
      toast({
        title: "Dosya Başarıyla Yüklendi!",
        description: `${itemCount} yeni parça ${file.name} dosyasından analiz edildi.`,
      });
    }, 3000);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    handleFileUpload(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleItemEdit = (id, field, value) => {
    setBomItems(items => 
      items.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleSupplierMatch = (id) => {
    setBomItems(items =>
      items.map(item =>
        item.id === id 
          ? { ...item, status: 'mapped', suppliers: Math.floor(Math.random() * 10) + 3 }
          : item
      )
    );
    
    toast({
      title: "Tedarikçi Eşleştirme Tamamlandı!",
      description: "AI ile yeni tedarikçiler bulundu ve eşleştirildi.",
    });
  };

  const handleBulkSupplierMatch = () => {
    const pendingItems = bomItems.filter(item => item.status === 'pending');
    if (pendingItems.length === 0) {
      toast({
        title: "Eşleştirilecek Parça Yok",
        description: "Tüm parçalar zaten eşleştirilmiş.",
        variant: "destructive",
      });
      return;
    }

    setBomItems(items =>
      items.map(item =>
        item.status === 'pending'
          ? { ...item, status: 'mapped', suppliers: Math.floor(Math.random() * 10) + 3 }
          : item
      )
    );

    toast({
      title: "Toplu Eşleştirme Tamamlandı!",
      description: `${pendingItems.length} parça için tedarikçi eşleştirmesi yapıldı.`,
    });
  };

  const handleDeleteItem = (id) => {
    setBomItems(items => items.filter(item => item.id !== id));
    toast({
      title: "Parça Silindi",
      description: "Parça listeden başarıyla kaldırıldı.",
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      mapped: { color: 'bg-green-100 text-green-800', icon: CheckCircle, text: 'Eşleştirildi' },
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: AlertCircle, text: 'Bekliyor' }
    };
    
    const config = statusConfig[status];
    const IconComponent = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <IconComponent className="w-3 h-3 mr-1" />
        {config.text}
      </span>
    );
  };

  const EditableCell = ({ item, field, type = "text" }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(item[field]);

    const handleSave = () => {
      handleItemEdit(item.id, field, value);
      setIsEditing(false);
      toast({
        title: "Güncellendi",
        description: `${field} başarıyla güncellendi.`,
      });
    };

    if (isEditing) {
      return (
        <div className="flex items-center space-x-2">
          <Input
            type={type}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="h-8 text-sm"
            onKeyPress={(e) => e.key === 'Enter' && handleSave()}
          />
          <Button size="sm" variant="ghost" onClick={handleSave}>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)}>
            <X className="h-4 w-4 text-red-600" />
          </Button>
        </div>
      );
    }

    return (
      <div 
        className="cursor-pointer hover:bg-gray-50 px-2 py-1 rounded flex items-center space-x-2"
        onClick={() => setIsEditing(true)}
      >
        <span className="text-sm">{item[field]}</span>
        <Edit3 className="h-3 w-3 text-gray-400 opacity-0 group-hover:opacity-100" />
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">BOM/CAD Yükleme</h1>
          <p className="text-lg text-gray-600">Parça listelerinizi yükleyin ve tedarikçi eşleştirmesi yapın</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleBulkSupplierMatch}>
            <Search className="h-4 w-4 mr-2" />
            Toplu Eşleştir
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Şablon İndir
          </Button>
        </div>
      </div>

      {/* Upload Section */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="h-5 w-5 text-orange-500" />
            <span>Dosya Yükleme</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div 
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragOver 
                  ? 'border-orange-500 bg-orange-50' 
                  : 'border-gray-300 hover:border-orange-500'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <Upload className={`mx-auto h-12 w-12 mb-4 ${dragOver ? 'text-orange-500' : 'text-gray-400'}`} />
              <div className="space-y-2">
                <p className="text-lg font-medium text-gray-700">
                  {dragOver ? 'Dosyayı bırakın' : 'BOM/CAD dosyanızı buraya sürükleyin'}
                </p>
                <p className="text-sm text-gray-500">
                  Desteklenen formatlar: CSV, PDF, Excel (max 10MB)
                </p>
              </div>
              <div className="mt-4">
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <Button 
                    variant="outline" 
                    className="border-orange-500 text-orange-500 hover:bg-orange-50"
                    disabled={uploading}
                  >
                    {uploading ? 'Yükleniyor...' : 'Dosya Seç'}
                  </Button>
                </Label>
                <Input
                  id="file-upload"
                  type="file"
                  accept=".csv,.pdf,.xlsx,.xls"
                  onChange={(e) => handleFileUpload(e.target.files)}
                  className="hidden"
                />
              </div>
            </div>
            
            {uploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Yükleniyor...</span>
                  <span>{Math.round(uploadProgress)}%</span>
                </div>
                <Progress value={uploadProgress} className="w-full" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Filters and Search */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Parça numarası veya açıklama ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex space-x-2">
              {['all', 'pending', 'mapped'].map((status) => (
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
                  {status === 'all' ? 'Tümü' : status === 'pending' ? 'Bekleyen' : 'Eşleşen'}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* BOM Items Table */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-orange-500" />
              <span>Yüklenen Parçalar ({filteredItems.length})</span>
            </CardTitle>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span className="flex items-center">
                <div className="w-3 h-3 bg-green-100 rounded-full mr-1"></div>
                {bomItems.filter(item => item.status === 'mapped').length} Eşleşen
              </span>
              <span className="flex items-center">
                <div className="w-3 h-3 bg-yellow-100 rounded-full mr-1"></div>
                {bomItems.filter(item => item.status === 'pending').length} Bekleyen
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Parça No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Açıklama
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Miktar
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kategori
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Durum
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tedarikçi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <EditableCell item={item} field="partNumber" />
                    </td>
                    <td className="px-6 py-4">
                      <EditableCell item={item} field="description" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-1">
                        <EditableCell item={item} field="quantity" type="number" />
                        <span className="text-sm text-gray-500">{item.unit}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <EditableCell item={item} field="category" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(item.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {item.suppliers > 0 ? (
                          <span className="text-green-600 font-medium">{item.suppliers} tedarikçi</span>
                        ) : (
                          <span className="text-gray-400">Henüz yok</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      {item.status === 'pending' && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleSupplierMatch(item.id)}
                          className="text-orange-500 hover:text-orange-600 hover:bg-orange-50"
                        >
                          <Search className="h-4 w-4 mr-1" />
                          Eşleştir
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDeleteItem(item.id)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Parça bulunamadı</h3>
                <p className="text-gray-500">
                  {searchTerm || statusFilter !== 'all' 
                    ? 'Arama kriterlerinizi değiştirmeyi deneyin' 
                    : 'Başlamak için bir BOM/CAD dosyası yükleyin'}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};