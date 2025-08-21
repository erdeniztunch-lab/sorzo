import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
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
  SortAsc,
  Heart,
  MessageCircle,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  X
} from 'lucide-react';
import { useToast } from '../../hooks/use-toast';

export const SupplierDiscovery = ({ suppliers: initialSuppliers }) => {
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('matchScore');
  const [favorites, setFavorites] = useState([]);
  const [contactedSuppliers, setContactedSuppliers] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedSuppliers, setSelectedSuppliers] = useState([]);
  const { toast } = useToast();

  const categories = ['all', 'Döküm', 'Plastik', 'Elektronik', 'CNC', 'Montaj'];
  const sortOptions = [
    { value: 'matchScore', label: 'Eşleşme Skoru' },
    { value: 'rating', label: 'Değerlendirme' },
    { value: 'responseTime', label: 'Yanıt Süresi' },
    { value: 'name', label: 'Alfabetik' }
  ];

  useEffect(() => {
    if (searchTerm) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        setIsSearching(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [searchTerm]);

  const filteredSuppliers = suppliers
    .filter(supplier => {
      const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           supplier.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           supplier.specialties.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || 
                             supplier.specialties.includes(selectedCategory);
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'matchScore':
          return b.matchScore - a.matchScore;
        case 'rating':
          return b.rating - a.rating;
        case 'responseTime':
          return parseInt(a.responseTime) - parseInt(b.responseTime);
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const toggleFavorite = (supplierId) => {
    setFavorites(prev => 
      prev.includes(supplierId) 
        ? prev.filter(id => id !== supplierId)
        : [...prev, supplierId]
    );
    
    const action = favorites.includes(supplierId) ? 'kaldırıldı' : 'eklendi';
    toast({
      title: `Favoriler ${action}`,
      description: `Tedarikçi favorilerinize ${action}.`,
    });
  };

  const contactSupplier = (supplier) => {
    setContactedSuppliers(prev => [...prev, supplier.id]);
    toast({
      title: "İletişim Başlatıldı",
      description: `${supplier.name} ile iletişime geçildi.`,
    });
  };

  const sendBulkRFQ = () => {
    if (selectedSuppliers.length === 0) {
      toast({
        title: "Tedarikçi Seçin",
        description: "RFQ göndermek için en az bir tedarikçi seçin.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Toplu RFQ Gönderildi!",  
      description: `${selectedSuppliers.length} tedarikçiye RFQ gönderildi.`,
    });
    setSelectedSuppliers([]);
  };

  const toggleSupplierSelection = (supplierId) => {
    setSelectedSuppliers(prev =>
      prev.includes(supplierId)
        ? prev.filter(id => id !== supplierId)
        : [...prev, supplierId]
    );
  };

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

  const getResponseTimeColor = (responseTime) => {
    const hours = parseInt(responseTime);
    if (hours <= 2) return 'text-green-600';
    if (hours <= 4) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tedarikçi Keşfi</h1>
          <p className="text-lg text-gray-600">AI destekli tedarikçi arama ve eşleştirme</p>
        </div>
        {selectedSuppliers.length > 0 && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">{selectedSuppliers.length} seçili</span>
            <Button onClick={sendBulkRFQ} className="bg-orange-500 hover:bg-orange-600">
              Toplu RFQ Gönder
            </Button>
            <Button variant="outline" onClick={() => setSelectedSuppliers([])}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
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
              {isSearching && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin h-4 w-4 border-2 border-orange-500 border-t-transparent rounded-full"></div>
                </div>
              )}
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
            
            {/* Sort Dropdown */}
            <div className="flex space-x-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:border-orange-500 focus:ring-orange-500"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 text-sm text-gray-600">
            <div className="flex space-x-4">
              <span>{filteredSuppliers.length} tedarikçi bulundu</span>
              <span>{favorites.length} favori</span>
              <span>{contactedSuppliers.length} iletişime geçilen</span>
            </div>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm">
                <Filter className="h-4 w-4 mr-1" />
                Gelişmiş Filtre
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Suppliers Grid */}
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredSuppliers.map((supplier) => (
          <Card key={supplier.id} className={`bg-white border shadow-sm hover:shadow-md transition-all cursor-pointer ${
            selectedSuppliers.includes(supplier.id) ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
          }`}>
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <input
                      type="checkbox"
                      checked={selectedSuppliers.includes(supplier.id)}
                      onChange={() => toggleSupplierSelection(supplier.id)}
                      className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                    />
                    <CardTitle className="text-lg font-bold text-gray-900">
                      {supplier.name}
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFavorite(supplier.id)}
                      className="p-1"
                    >
                      <Heart className={`h-4 w-4 ${
                        favorites.includes(supplier.id) 
                          ? 'text-red-500 fill-current' 
                          : 'text-gray-400'
                      }`} />
                    </Button>
                  </div>
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
                  <Badge className={`${getMatchScoreColor(supplier.matchScore)} border-0 mb-2`}>
                    %{supplier.matchScore} Eşleşme
                  </Badge>
                  {contactedSuppliers.includes(supplier.id) && (
                    <div className="flex items-center text-xs text-green-600">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      İletişime Geçildi
                    </div>
                  )}
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
                  <span className={`${getResponseTimeColor(supplier.responseTime)}`}>
                    Yanıt: {supplier.responseTime}
                  </span>
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-600 truncate">{supplier.contactPerson}</span>
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

              {/* Match Score Breakdown */}
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs font-medium text-gray-700 mb-2">Eşleşme Detayı:</p>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span>Uzmanlık</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={supplier.matchScore} className="w-16 h-1" />
                      <span className="w-8 text-right">{supplier.matchScore}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span>Lokasyon</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={Math.max(supplier.matchScore - 10, 70)} className="w-16 h-1" />
                      <span className="w-8 text-right">{Math.max(supplier.matchScore - 10, 70)}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 pt-4 border-t border-gray-100">
                <Button 
                  size="sm" 
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-xs"
                  onClick={() => {
                    toast({
                      title: "RFQ Gönderildi!",
                      description: `${supplier.name} şirketine RFQ gönderildi.`,
                    });
                  }}
                >
                  RFQ Gönder
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-gray-300 text-xs"
                  onClick={() => contactSupplier(supplier)}
                >
                  <MessageCircle className="h-3 w-3 mr-1" />
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
      {filteredSuppliers.length === 0 && !isSearching && (
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="text-center py-12">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Tedarikçi bulunamadı</h3>
            <p className="text-gray-500 mb-4">Arama kriterlerinizi değiştirmeyi deneyin</p>
            <Button variant="outline" onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}>
              Filtreleri Temizle
            </Button>
          </CardContent>
        </Card>
      )}

      {/* AI Suggestions */}
      <Card className="bg-orange-50 border border-orange-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-orange-800">
            <TrendingUp className="h-5 w-5" />
            <span>AI Önerileri</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-orange-200">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Yeni Tedarikçi Keşfi</p>
                  <p className="text-sm text-gray-600">Metal parçalar için 3 yeni potansiyel tedarikçi bulundu</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-100">
                Görüntüle
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-orange-200">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-orange-600 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Coğrafi Optimizasyon</p>
                  <p className="text-sm text-gray-600">Yakın lokasyonlarda daha uygun tedarikçiler mevcut</p>
                </div>
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