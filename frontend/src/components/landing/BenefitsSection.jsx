import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Clock, TrendingDown, Users, Database } from 'lucide-react';

const iconMap = {
  Clock,
  TrendingDown,
  Users,
  Database
};

export const BenefitsSection = ({ data }) => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ölçülebilir Sonuçlar
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            MVP-1 pilot programımızdan elde edilen performans hedefleri
          </p>
        </div>
        
        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.map((benefit) => {
            const IconComponent = iconMap[benefit.icon];
            return (
              <Card key={benefit.id} className="bg-white border border-gray-200 shadow-none hover:shadow-lg transition-all duration-300 rounded-lg group">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-50 border border-gray-200 rounded-2xl flex items-center justify-center group-hover:bg-orange-50 group-hover:border-orange-200 transition-colors duration-300">
                    <IconComponent className="h-8 w-8 text-gray-700 group-hover:text-orange-500" />
                  </div>
                  <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                    {benefit.value}
                  </CardTitle>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {benefit.title}
                  </h3>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {/* ROI Showcase */}
        <div className="mt-20 bg-gray-50 border border-gray-200 rounded-2xl p-12 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">Yatırım Getirisi (ROI)</h3>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-16">
            <div>
              <div className="text-5xl font-bold text-orange-500 mb-2">48 Saat</div>
              <div className="text-gray-600">RFQ Tamamlama</div>
            </div>
            <div className="hidden md:block w-px h-16 bg-gray-300"></div>
            <div>
              <div className="text-5xl font-bold text-orange-500 mb-2">%75</div>
              <div className="text-gray-600">Süre Tasarrufu</div>
            </div>
            <div className="hidden md:block w-px h-16 bg-gray-300"></div>
            <div>
              <div className="text-5xl font-bold text-orange-500 mb-2">%5-15</div>
              <div className="text-gray-600">Maliyet Tasarrufu</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};