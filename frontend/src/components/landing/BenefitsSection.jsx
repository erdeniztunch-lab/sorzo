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
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ölçülebilir Sonuçlar
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            MVP-1 pilot programımızdan elde edilen performans hedefleri
          </p>
        </div>
        
        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.map((benefit) => {
            const IconComponent = iconMap[benefit.icon];
            return (
              <Card key={benefit.id} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 group hover:scale-105">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-3xl font-bold text-blue-400 mb-2">
                    {benefit.value}
                  </CardTitle>
                  <h3 className="text-lg font-semibold text-white">
                    {benefit.title}
                  </h3>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {/* ROI Showcase */}
        <div className="mt-20 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-md border border-blue-500/30 rounded-3xl p-12 text-center">
          <h3 className="text-3xl font-bold mb-6">Yatırım Getirisi (ROI)</h3>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-16">
            <div>
              <div className="text-5xl font-bold text-green-400 mb-2">48 Saat</div>
              <div className="text-slate-300">RFQ Tamamlama</div>
            </div>
            <div className="hidden md:block w-px h-16 bg-slate-600"></div>
            <div>
              <div className="text-5xl font-bold text-green-400 mb-2">%75</div>
              <div className="text-slate-300">Süre Tasarrufu</div>
            </div>
            <div className="hidden md:block w-px h-16 bg-slate-600"></div>
            <div>
              <div className="text-5xl font-bold text-green-400 mb-2">%5-15</div>
              <div className="text-slate-300">Maliyet Tasarrufu</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};