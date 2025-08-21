import React from 'react';
import { Button } from '../ui/button';
import { ArrowRight, Play } from 'lucide-react';

export const HeroSection = ({ data, onDemoRequest }) => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={data.heroImage}
          alt="Manufacturing"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/60"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/30 backdrop-blur-md mb-8">
            <span className="text-blue-300 text-sm font-medium">Türkiye İmalat Sektörü için Özel Çözüm</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="block">{data.title}</span>
          </h1>
          
          {/* Subtitle */}
          <h2 className="text-2xl md:text-3xl font-semibold text-blue-400 mb-8">
            {data.subtitle}
          </h2>
          
          {/* Description */}
          <p className="text-xl text-gray-300 mb-12 leading-relaxed max-w-2xl">
            {data.description}
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={onDemoRequest}
            >
              {data.cta}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold transition-all duration-300 backdrop-blur-md"
            >
              <Play className="mr-2 h-5 w-5" />
              Demo Videosu İzle
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};