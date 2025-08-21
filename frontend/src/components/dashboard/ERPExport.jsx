import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { 
  Database, 
  Download,
  FileText,
  Settings,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
  Filter
} from 'lucide-react';
import { useToast } from '../../hooks/use-toast';

export const ERPExport = ({ exports: initialExports }) => {
  const [exports, setExports] = useState(initialExports);
  const [selectedFormat, setSelectedFormat] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { color: 'bg-green-100 text-green-800', icon: CheckCircle, text: 'Tamamlandı' },
      processing: { color: 'bg-blue-100 text-blue-800', icon: Clock, text: 'İşleniyor' },
      failed: { color: 'bg-red-100 text-red-800', icon: AlertCircle, text: 'Başarısız' }
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleExport = async () => {
    if (!selectedFormat) {
      toast({
        title: "Format Seçin",
        description: "Lütfen bir ERP format seçin.",
        variant: "destructive",
      });
      return;
    }

    setIsExporting(true);

    // Mock export process
    setTimeout(() => {
      const newExport = {
        id: exports.length + 1,
        name: `Export ${new Date().toLocaleDateString('tr-TR')}`,
        format: selectedFormat,
        records: Math.floor(Math.random() * 50) + 10,
        size: `${(Math.random() * 3 + 1).toFixed(1)} MB`,
        createdAt: new Date().toISOString(),
        status: 'completed'
      };

      setExports([newExport, ...exports]);
      setIsExporting(false);
      setSelectedFormat('');

      toast({
        title: "Export Tamamlandı!",
        description: `${selectedFormat} formatında ${newExport.records} kayıt başarıyla export edildi.`,
      });
    }, 3000);
  };

  const erpFormats = [
    { 
      value: 'SAP', 
      label: 'SAP R/3', 
      description: 'SAP standart format (.csv)', 
      icon: '🔷' 
    },
    { 
      value: 'Netsis', 
      label: 'Netsis ERP', 
      description: 'Netsis uyumlu format (.txt)', 
      icon: '🔶' 
    },
    { 
      value: 'Logo', 
      label: 'Logo Tiger', 
      description: 'Logo ERP format (.xml)', 
      icon: '🔸' 
    },
    { 
      value: 'Custom', 
      label: 'Özel Format', 
      description: 'Özelleştirilebilir format', 
      icon: '⚙️' 
    }
  ];

  const exportFields = [
    { id: 'partNumber', label: 'Parça Numarası', required: true },
    { id: 'supplier', label: 'Tedarikçi Bilgileri', required: true },
    { id: 'price', label: 'Fiyat Bilgileri', required: false },
    { id: 'leadTime', label: 'Teslimat Süresi', required: false },
    { id: 'capacity', label: 'Kapasite Bilgileri', required: false },
    { id: 'quality', label: 'Kalite Notları', required: false },
    { id: 'certificates', label: 'Sertifikalar', required: false }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">ERP Export</h1>
        <p className="text-lg text-gray-600">Teklif verilerini ERP sisteminize aktarın</p>
      </div>

      {/* Export Configuration */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5 text-orange-500" />
            <span>Yeni Export Oluştur</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* ERP Format Selection */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-3 block">ERP Format Seçin:</label>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {erpFormats.map((format) => (
                <div
                  key={format.value}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedFormat === format.value
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedFormat(format.value)}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">{format.icon}</div>
                    <h3 className="font-medium text-gray-900 mb-1">{format.label}</h3>
                    <p className="text-xs text-gray-500">{format.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Field Selection */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-3 block">Export Edilecek Alanlar:</label>
            <div className="grid md:grid-cols-2 gap-3">
              {exportFields.map((field) => (
                <div key={field.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                  <Checkbox
                    id={field.id}
                    checked={field.required || selectedItems.includes(field.id)}
                    disabled={field.required}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedItems([...selectedItems, field.id]);
                      } else {
                        setSelectedItems(selectedItems.filter(item => item !== field.id));
                      }
                    }}
                  />
                  <div className="flex-1">
                    <label htmlFor={field.id} className="text-sm font-medium text-gray-900 cursor-pointer">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Export Button */}
          <div className="flex justify-end">
            <Button 
              onClick={handleExport}
              disabled={isExporting || !selectedFormat}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              {isExporting ? (
                <>
                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                  Export Ediliyor...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Export Başlat
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Export History */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-orange-500" />
              <span>Export Geçmişi</span>
            </CardTitle>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filtrele
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Export Adı
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Format
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kayıt Sayısı
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dosya Boyutu
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tarih
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Durum
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {exports.map((exportItem) => (
                  <tr key={exportItem.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{exportItem.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="outline" className="text-xs">
                        {exportItem.format}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{exportItem.records} kayıt</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{exportItem.size}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(exportItem.createdAt)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(exportItem.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          disabled={exportItem.status !== 'completed'}
                          className="text-orange-500 hover:text-orange-600 disabled:text-gray-400"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-600">
                          <Settings className="h-4 w-4" />
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

      {/* Integration Guide */}
      <Card className="bg-blue-50 border border-blue-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-blue-800">
            <Database className="h-5 w-5" />
            <span>ERP Entegrasyon Rehberi</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg border border-blue-200">
              <h4 className="font-medium text-gray-900 mb-2">1. Format Seçimi</h4>
              <p className="text-sm text-gray-600">
                ERP sisteminize uygun format seçin. Tereddüt durumunda sistem yöneticinizle iletişime geçin.
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-blue-200">
              <h4 className="font-medium text-gray-900 mb-2">2. Alan Mapping</h4>
              <p className="text-sm text-gray-600">
                Export edilecek alanları ERP sisteminizin gerekliliklerine göre seçin.
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-blue-200">
              <h4 className="font-medium text-gray-900 mb-2">3. Import İşlemi</h4>
              <p className="text-sm text-gray-600">
                Export edilen dosyayı ERP sisteminizin import modülü ile sisteme aktarın.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};