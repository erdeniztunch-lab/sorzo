import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Menu, X, ArrowRight } from 'lucide-react';

export const Header = ({ onDemoRequest }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Özellikler', href: '#features' },
    { name: 'Avantajlar', href: '#benefits' },
    { name: 'Demo', href: '#demo' },
    { name: 'İletişim', href: '#contact' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm' 
        : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">Sorzo</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="font-medium text-gray-700 hover:text-orange-500 transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="outline"
              onClick={() => window.location.href = '/dashboard'}
              className="border-orange-500 text-orange-500 hover:bg-orange-50 px-6 py-2 transition-colors duration-200 shadow-none hover:shadow-none border rounded-lg"
            >
              Dashboard'a Git
            </Button>
            <Button 
              onClick={onDemoRequest}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 transition-colors duration-200 shadow-none hover:shadow-none border-0 rounded-lg"
            >
              Demo Talep Et
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:text-orange-500 transition-colors duration-200"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="py-4 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-2 text-gray-700 font-medium hover:text-orange-500 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="px-4 pt-4 border-t border-gray-200">
                <Button 
                  onClick={() => {
                    onDemoRequest();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white shadow-none hover:shadow-none border-0 rounded-lg"
                >
                  Demo Talep Et
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};