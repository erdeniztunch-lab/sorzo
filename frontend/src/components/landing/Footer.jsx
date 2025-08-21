import React from 'react';
import { Separator } from '../ui/separator';
import { Mail, Phone, MapPin, Linkedin, Twitter } from 'lucide-react';

export const Footer = ({ data }) => {
  return (
    <footer id="contact" className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <span className="text-3xl font-bold">Tesora</span>
            </div>
            <p className="text-slate-300 mb-6 max-w-md leading-relaxed">
              {data.company.description}
            </p>
            
            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-slate-300">info@tesora.com.tr</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <span className="text-slate-300">+90 212 123 45 67</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span className="text-slate-300">İstanbul, Türkiye</span>
              </div>
            </div>
          </div>
          
          {/* Product Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Ürün</h3>
            <ul className="space-y-2">
              {data.links.product.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-slate-400 hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Şirket</h3>
            <ul className="space-y-2">
              {data.links.company.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-slate-400 hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <Separator className="bg-slate-700 mb-8" />
        
        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-slate-400 text-sm">
            © 2024 Tesora. Tüm hakları saklıdır.
          </div>
          
          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <a 
              href="#" 
              className="text-slate-400 hover:text-white transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a 
              href="#" 
              className="text-slate-400 hover:text-white transition-colors duration-300"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>
          
          {/* Legal Links */}
          <div className="flex items-center space-x-6 text-sm">
            <a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">
              Gizlilik Politikası
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">
              Kullanım Koşulları
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};