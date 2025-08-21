import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Upload, Brain, Mail, BarChart3 } from 'lucide-react';

const iconMap = {
  Upload,
  Brain,
  Mail,
  BarChart3
};

export const FeaturesSection = ({ data }) => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Temel Özellikler
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Yapay zekâ destekli platformumuz ile tedarik süreçlerinizi modernize edin
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.map((feature) => {
            const IconComponent = iconMap[feature.icon];
            return (
              <Card key={feature.id} className="group hover:shadow-lg transition-all duration-300 border border-gray-200 shadow-none hover:shadow-lg bg-white rounded-lg">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 mx-auto mb-4 bg-orange-500 rounded-2xl flex items-center justify-center group-hover:bg-orange-600 transition-colors duration-300">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {/* Process Flow */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Nasıl Çalışır?
          </h3>
          
          <div className="flex flex-col md:flex-row justify-between items-start space-y-8 md:space-y-0 md:space-x-8">
            {data.map((step, index) => {
              const IconComponent = iconMap[step.icon];
              return (
                <div key={step.id} className="flex flex-col items-center text-center max-w-sm relative">
                  <div className="relative">
                    <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mb-4 shadow-sm">
                      <IconComponent className="h-10 w-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {step.description}
                  </p>
                  
                  {/* Arrow */}
                  {index < data.length - 1 && (
                    <div className="hidden md:block absolute right-0 top-10 transform translate-x-1/2">
                      <ArrowRight className="h-6 w-6 text-gray-400" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

// Add ArrowRight import at the top
import { ArrowRight } from 'lucide-react';