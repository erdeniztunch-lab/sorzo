import React from 'react';
import { Button } from '../ui/button';
import { ArrowRight, Play } from 'lucide-react';

export const HeroSection = ({ data, onDemoRequest }) => {
  return (
    <section className="min-h-screen flex items-center bg-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-50 border border-orange-200 mb-8">
              <span className="text-orange-600 text-sm font-medium">Türkiye İmalat Sektörü için Özel Çözüm</span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              {data.title}
            </h1>
            
            {/* Subtitle */}
            <h2 className="text-2xl md:text-3xl font-medium text-gray-700 mb-8 leading-relaxed">
              {data.subtitle}
            </h2>
            
            {/* Description */}
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              {data.description}
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold transition-colors duration-200 shadow-none hover:shadow-none border-0 rounded-lg"
                onClick={onDemoRequest}
              >
                {data.cta}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-semibold transition-colors duration-200 shadow-none hover:shadow-none rounded-lg"
                onClick={() => window.location.href = '/dashboard'}
              >
                Dashboard'a Git
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-semibold transition-colors duration-200 shadow-none hover:shadow-none rounded-lg"
              >
                <Play className="mr-2 h-5 w-5" />
                Demo Videosu İzle
              </Button>
            </div>
          </div>
          
          {/* Right Column - Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden border border-gray-200">
              <img 
                src={data.heroImage}
                alt="Manufacturing"
                className="w-full h-96 lg:h-[500px] object-cover"
              />
            </div>
            
            {/* Stats Cards */}
            <div className="absolute -bottom-8 -left-8 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="text-3xl font-bold text-gray-900">48 Saat</div>
              <div className="text-gray-600">RFQ Tamamlama</div>
            </div>
            
            <div className="absolute -top-8 -right-8 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="text-3xl font-bold text-orange-500">%5-15</div>
              <div className="text-gray-600">Maliyet Tasarrufu</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};