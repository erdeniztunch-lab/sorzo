import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Edit3,
  Download,
  Trash2
} from 'lucide-react';
import { useToast } from '../../hooks/use-toast';

export const BOMUpload = ({ bomItems: initialItems }) => {
  const [bomItems, setBomItems] = useState(initialItems);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    
    // Mock file upload process
    setTimeout(() => {
      const newItem = {
        id: bomItems.length + 1,
        partNumber: `NP-${String(bomItems.length + 1).padStart(3, '0')}`,
        description: `${file.name} - Yeni Parça`,
        quantity: 100,
        unit: "adet",
        category: "Genel",
        status: "pending",
        suppliers: 0
      };
      
      setBomItems([...bomItems, newItem]);
      setUploading(false);
      
      toast({
        title: "Dosya Yüklendi!",
        description: `${file.name} başarıyla yüklendi ve analiz edildi.`,
      });
    }, 2000);
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
      description: "AI ile yeni tedarikçiler bulundu.",
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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">BOM/CAD Yükleme</h1>
        <p className="text-lg text-gray-600">Parça listelerinizi yükleyin ve tedarikçi eşleştirmesi yapın</p>
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
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-orange-500 transition-colors">
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <div className="space-y-2">
                <p className="text-lg font-medium text-gray-700">
                  BOM/CAD dosyanızı buraya sürükleyin
                </p>
                <p className="text-sm text-gray-500">
                  Desteklenen formatlar: CSV, PDF (max 10MB)
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
                  accept=".csv,.pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
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
              <span>Yüklenen Parçalar ({bomItems.length})</span>
            </CardTitle>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Şablon İndir
            </Button>
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
                {bomItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{item.partNumber}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{item.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.quantity} {item.unit}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(item.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {item.suppliers > 0 ? `${item.suppliers} tedarikçi` : 'Henüz yok'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      {item.status === 'pending' && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleSupplierMatch(item.id)}
                          className="text-orange-500 hover:text-orange-600"
                        >
                          Eşleştir
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};