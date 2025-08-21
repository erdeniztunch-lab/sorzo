import React from 'react';
import { Button } from '../ui/button';
import { 
  LayoutDashboard, 
  Upload, 
  Search, 
  Mail, 
  BarChart3, 
  Database,
  Settings,
  LogOut,
  User
} from 'lucide-react';

const iconMap = {
  LayoutDashboard,
  Upload,
  Search,
  Mail,
  BarChart3,
  Database,
  Settings,
  LogOut,
  User
};

export const Sidebar = ({ navigation, activeItem, onNavigate, user }) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <span className="text-2xl font-bold text-gray-900">Sorzo</span>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-gray-700">{user.avatar}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
            <p className="text-xs text-gray-500 truncate">{user.company}</p>
            <p className="text-xs text-gray-400 truncate">{user.role}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const IconComponent = iconMap[item.icon];
          const isActive = activeItem === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={`w-full justify-start h-10 px-3 ${
                isActive 
                  ? 'bg-orange-500 text-white hover:bg-orange-600' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => onNavigate(item.id)}
            >
              <IconComponent className="mr-3 h-4 w-4" />
              <span className="text-sm font-medium">{item.name}</span>
            </Button>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <Button variant="ghost" className="w-full justify-start h-10 px-3 text-gray-700 hover:bg-gray-100">
          <Settings className="mr-3 h-4 w-4" />
          <span className="text-sm font-medium">Ayarlar</span>
        </Button>
        <Button variant="ghost" className="w-full justify-start h-10 px-3 text-gray-700 hover:bg-gray-100">
          <LogOut className="mr-3 h-4 w-4" />
          <span className="text-sm font-medium">Çıkış Yap</span>
        </Button>
      </div>
    </div>
  );
};