import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  BarChart3, 
  Trophy,
  DollarSign,
  Clock,
  Users,
  Shield,
  Award,
  TrendingUp,
  Download,
  Filter
} from 'lucide-react';

export const QuoteMatrix = ({ quotes: initialQuotes }) => {
  const [quotes, setQuotes] = useState(initialQuotes);
  const [selectedPart, setSelectedPart] = useState('MP-001');

  const filteredQuotes = quotes.filter(quote => quote.partNumber === selectedPart);
  const partNumbers = [...new Set(quotes.map(quote => quote.partNumber))];

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score) => {
    if (score >= 90) return 'bg-green-100';
    if (score >= 80) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getRankBadge = (index) => {
    const badges = [
      { color: 'bg-yellow-100 text-yellow-800', icon: Trophy, text: '1. Sıra' },
      { color: 'bg-gray-100 text-gray-800', icon: Award, text: '2. Sıra' },
      { color: 'bg-orange-100 text-orange-800', icon: Award, text: '3. Sıra' }
    ];
    
    if (index < badges.length) {
      const badge = badges[index];
      const IconComponent = badge.icon;
      return (
        <Badge className={`${badge.color} border-0 text-xs font-medium`}>
          <IconComponent className="w-3 h-3 mr-1" />
          {badge.text}
        </Badge>
      );
    }
    return null;
  };

  const criteriaConfig = [
    { key: 'priceScore', label: 'Fiyat', icon: DollarSign, weight: '30%' },
    { key: 'timeScore', label: 'Teslimat', icon: Clock, weight: '25%' },
    { key: 'capacityScore', label: 'Kapasite', icon: Users, weight: '20%' },
    { key: 'qualityScore', label: 'Kalite', icon: Award, weight: '15%' },
    { key: 'riskScore', label: 'Risk', icon: Shield, weight: '10%' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Teklif Skorlama</h1>
          <p className="text-lg text-gray-600">Çok kriterli analiz ile en iyi teklifleri belirleyin</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filtrele
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Rapor Al
          </Button>
        </div>
      </div>

      {/* Part Selection */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Parça Seçin:</label>
            <div className="flex space-x-2">
              {partNumbers.map((partNumber) => (
                <Button
                  key={partNumber}
                  variant={selectedPart === partNumber ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPart(partNumber)}
                  className={selectedPart === partNumber ? 
                    'bg-orange-500 hover:bg-orange-600 text-white' : 
                    'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }
                >
                  {partNumber}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scoring Criteria */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-orange-500" />
            <span>Skorlama Kriterleri</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-5 gap-4">
            {criteriaConfig.map((criteria) => {
              const IconComponent = criteria.icon;
              return (
                <div key={criteria.key} className="text-center p-4 border border-gray-200 rounded-lg">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <IconComponent className="h-5 w-5 text-orange-600" />
                  </div>
                  <p className="font-medium text-gray-900 text-sm">{criteria.label}</p>
                  <p className="text-xs text-gray-500">{criteria.weight}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quote Comparison Table */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-orange-500" />
            <span>Teklif Karşılaştırması - {selectedPart}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sıralama
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tedarikçi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Toplam Skor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fiyat
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Teslimat
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kapasite
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kalite
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Risk
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredQuotes
                  .sort((a, b) => b.totalScore - a.totalScore)
                  .map((quote, index) => (
                    <tr key={quote.id} className={`hover:bg-gray-50 ${index === 0 ? 'bg-green-50' : ''}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getRankBadge(index)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{quote.supplier}</div>
                        <div className="text-xs text-gray-500">₺{quote.price.toFixed(2)} | {quote.leadTime}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getScoreBg(quote.totalScore)}`}>
                            <span className={`text-sm font-bold ${getScoreColor(quote.totalScore)}`}>
                              {quote.totalScore}
                            </span>
                          </div>
                          <div className="flex-1">
                            <Progress value={quote.totalScore} className="h-2" />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <span className={`text-sm font-medium ${getScoreColor(quote.priceScore)}`}>
                            {quote.priceScore}
                          </span>
                          <Progress value={quote.priceScore} className="w-16 h-1" />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <span className={`text-sm font-medium ${getScoreColor(quote.timeScore)}`}>
                            {quote.timeScore}
                          </span>
                          <Progress value={quote.timeScore} className="w-16 h-1" />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <span className={`text-sm font-medium ${getScoreColor(quote.capacityScore)}`}>
                            {quote.capacityScore}
                          </span>
                          <Progress value={quote.capacityScore} className="w-16 h-1" />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <span className={`text-sm font-medium ${getScoreColor(quote.qualityScore)}`}>
                            {quote.qualityScore}
                          </span>
                          <Progress value={quote.qualityScore} className="w-16 h-1" />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <span className={`text-sm font-medium ${getScoreColor(quote.riskScore)}`}>
                            {quote.riskScore}
                          </span>
                          <Progress value={quote.riskScore} className="w-16 h-1" />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            className={index === 0 ? 
                              'bg-green-500 hover:bg-green-600 text-white' : 
                              'bg-orange-500 hover:bg-orange-600 text-white'
                            }
                          >
                            {index === 0 ? 'Seç' : 'Değerlendir'}
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

      {/* Recommendations */}
      <Card className="bg-blue-50 border border-blue-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-blue-800">
            <TrendingUp className="h-5 w-5" />
            <span>AI Önerileri</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-blue-200">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Trophy className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">En İyi Seçim</p>
                <p className="text-sm text-gray-600">
                  Konya Metal San. hem fiyat hem kalite açısından en dengeli seçim. %12 tasarruf sağlayabilirsiniz.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-blue-200">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <Clock className="h-4 w-4 text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Hızlı Teslimat</p>
                <p className="text-sm text-gray-600">
                  Acil projeler için Bursa Döküm Ltd. 10 günde teslimat yapabilir.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};