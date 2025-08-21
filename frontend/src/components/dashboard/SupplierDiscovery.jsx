import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { 
  Search, 
  MapPin, 
  Star, 
  Clock,
  Award,
  User,
  Mail,
  Phone,
  Filter,
  SortAsc
} from 'lucide-react';

export const SupplierDiscovery = ({ suppliers: initialSuppliers }) => {
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Döküm', 'Plastik', 'Elektronik', 'CNC', 'Montaj'];

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.specialties.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || 
                           supplier.specialties.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  const getMatchScoreColor = (score) => {
    if (score >= 90) return 'bg-green-100 text-green-800';
    if (score >= 80) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tedarikçi Keşfi</h1>
        <p className="text-lg text-gray-600">AI destekli tedarikçi arama ve eşleştirme</p>
      </div>

      {/* Search and Filters */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Tedarikçi adı, uzmanlık alanı veya lokasyon ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
            
            {/* Category Filter */}
            <div className="flex space-x-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? 
                    'bg-orange-500 hover:bg-orange-600 text-white' : 
                    'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }
                >
                  {category === 'all' ? 'Tümü' : category}
                </Button>
              ))}
            </div>
            
            {/* Action Buttons */}
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtrele
              </Button>
              <Button variant="outline" size="sm">
                <SortAsc className="h-4 w-4 mr-2" />
                Sırala
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Suppliers Grid */}
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredSuppliers.map((supplier) => (
          <Card key={supplier.id} className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg font-bold text-gray-900 mb-1">
                    {supplier.name}
                  </CardTitle>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {supplier.location}
                  </div>
                  <div className="flex items-center space-x-1 mb-3">
                    {getRatingStars(supplier.rating)}
                    <span className="text-sm font-medium text-gray-700 ml-2">
                      {supplier.rating}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={`${getMatchScoreColor(supplier.matchScore)} border-0`}>
                    %{supplier.matchScore} Eşleşme
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              {/* Specialties */}
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Uzmanlık Alanları:</p>
                <div className="flex flex-wrap gap-1">
                  {supplier.specialties.map((specialty, index) => (
                    <Badge key={index} variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-600">Yanıt: {supplier.responseTime}</span>
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-600">{supplier.contactPerson}</span>
                </div>
              </div>

              {/* Certifications */}
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Sertifikalar:</p>
                <div className="flex flex-wrap gap-1">
                  {supplier.certifications.map((cert, index) => (
                    <Badge key={index} variant="outline" className="text-xs border-green-300 text-green-700">
                      <Award className="h-3 w-3 mr-1" />
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 pt-4 border-t border-gray-100">
                <Button 
                  size="sm" 
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-xs"
                >
                  RFQ Gönder
                </Button>
                <Button variant="outline" size="sm" className="border-gray-300 text-xs">
                  <Mail className="h-3 w-3 mr-1" />
                  İletişim
                </Button>
                <Button variant="outline" size="sm" className="border-gray-300 text-xs">
                  Detay
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredSuppliers.length === 0 && (
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="text-center py-12">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Tedarikçi bulunamadı</h3>
            <p className="text-gray-500">Arama kriterlerinizi değiştirmeyi deneyin</p>
          </CardContent>
        </Card>
      )}

      {/* AI Suggestions */}
      <Card className="bg-orange-50 border border-orange-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-orange-800">
            <Search className="h-5 w-5" />
            <span>AI Önerileri</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-orange-200">
              <div>
                <p className="font-medium text-gray-900">Yeni Tedarikçi Keşfi</p>
                <p className="text-sm text-gray-600">Metal parçalar için 3 yeni potansiyel tedarikçi bulundu</p>
              </div>
              <Button size="sm" variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-100">
                Görüntüle
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-orange-200">
              <div>
                <p className="font-medium text-gray-900">Coğrafi Optimizasyon</p>
                <p className="text-sm text-gray-600">Yakın lokasyonlarda daha uygun tedarikçiler mevcut</p>
              </div>
              <Button size="sm" variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-100">
                Analiz Et
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};