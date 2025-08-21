import React, { useState } from 'react';
import { HeroSection } from './HeroSection';
import { FeaturesSection } from './FeaturesSection';
import { BenefitsSection } from './BenefitsSection';
import { DemoSection } from './DemoSection';
import { Header } from './Header';
import { Footer } from './Footer';
import { mockData } from '../../data/mock';
import { useToast } from '../../hooks/use-toast';

export const LandingPage = () => {
  const [showDemoForm, setShowDemoForm] = useState(false);
  const { toast } = useToast();

  const handleDemoRequest = () => {
    setShowDemoForm(true);
    // Scroll to demo section
    const demoSection = document.getElementById('demo');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDemoSubmit = (formData) => {
    // Mock form submission
    console.log('Demo form submitted:', formData);
    toast({
      title: "Demo Talebi Alındı!",
      description: "En kısa sürede sizinle iletişime geçeceğiz.",
    });
    setShowDemoForm(false);
  };

  return (
    <div className="min-h-screen">
      <Header onDemoRequest={handleDemoRequest} />
      
      <main>
        <HeroSection 
          data={mockData.hero} 
          onDemoRequest={handleDemoRequest}
        />
        
        <FeaturesSection 
          data={mockData.features} 
        />
        
        <BenefitsSection 
          data={mockData.benefits} 
        />
        
        <DemoSection 
          formData={mockData.demoForm}
          showForm={showDemoForm}
          onSubmit={handleDemoSubmit}
          targetAudience={mockData.targetAudience}
        />
      </main>
      
      <Footer data={mockData.footer} />
    </div>
  );
};