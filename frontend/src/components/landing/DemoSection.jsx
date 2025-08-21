import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Building, ShoppingCart, Cog, CheckCircle } from 'lucide-react';

const iconMap = {
  Building,
  ShoppingCart,
  Cog
};

export const DemoSection = ({ formData, showForm, onSubmit, targetAudience }) => {
  const [formValues, setFormValues] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    employeeCount: ''
  });

  const handleInputChange = (field, value) => {
    setFormValues(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
    setFormValues({
      companyName: '',
      contactName: '',
      email: '',
      phone: '',
      employeeCount: ''
    });
  };

  return (
    <section id="demo" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Target Audience */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Kimler İçin Tasarlandı?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Türkiye'nin önde gelen imalat firmalarının tedarik süreçlerini optimize etmek için geliştirildi
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {targetAudience.map((audience) => {
              const IconComponent = iconMap[audience.icon];
              return (
                <Card key={audience.id} className="bg-white border border-gray-200 shadow-none hover:shadow-lg transition-all duration-300 rounded-lg group">
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 mx-auto mb-4 bg-orange-500 rounded-2xl flex items-center justify-center group-hover:bg-orange-600 transition-colors duration-300">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      {audience.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600 leading-relaxed">
                      {audience.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Demo Form */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Ücretsiz Demo Talep Edin
            </h3>
            <p className="text-lg text-gray-600">
              Sorzo platformunu deneyimleyin ve tedarik süreçlerinizdeki potansiyel tasarrufları keşfedin
            </p>
          </div>

          {showForm ? (
            <Card className="bg-white border border-gray-200 shadow-lg rounded-lg">
              <CardHeader className="bg-orange-500 text-white rounded-t-lg">
                <CardTitle className="text-2xl text-center">Demo Formu</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Şirket Adı *</Label>
                      <Input
                        id="companyName"
                        value={formValues.companyName}
                        onChange={(e) => handleInputChange('companyName', e.target.value)}
                        placeholder="Şirket adınızı girin"
                        className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactName">İletişim Kişisi *</Label>
                      <Input
                        id="contactName"
                        value={formValues.contactName}
                        onChange={(e) => handleInputChange('contactName', e.target.value)}
                        placeholder="Adınız ve soyadınız"
                        className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">E-posta *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formValues.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="ornek@sirket.com"
                        className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefon *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formValues.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+90 555 123 45 67"
                        className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="employeeCount">Çalışan Sayısı *</Label>
                    <Select onValueChange={(value) => handleInputChange('employeeCount', value)}>
                      <SelectTrigger className="border-gray-300 focus:border-orange-500 focus:ring-orange-500">
                        <SelectValue placeholder="Çalışan sayınızı seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="50-100">50-100 çalışan</SelectItem>
                        <SelectItem value="100-250">100-250 çalışan</SelectItem>
                        <SelectItem value="250-500">250-500 çalışan</SelectItem>
                        <SelectItem value="500+">500+ çalışan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg font-semibold shadow-none hover:shadow-none border-0 rounded-lg">
                    Demo Talebini Gönder
                    <CheckCircle className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            <div className="text-center">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-12">
                <div className="w-24 h-24 mx-auto mb-6 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Demo Talebiniz Alındı!
                </h3>
                <p className="text-lg text-gray-600 mb-8">
                  Sorzo ekibi en kısa sürede sizinle iletişime geçecek ve kişiselleştirilmiş demo sunumunuzu ayarlayacaktır.
                </p>
                <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-500">
                  <div>
                    <div className="font-semibold text-gray-700">24 Saat İçinde</div>
                    <div>İlk iletişim</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-700">30 Dakika</div>
                    <div>Demo süresi</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-700">Kişiselleştirilmiş</div>
                    <div>Sektörünüze özel sunum</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};