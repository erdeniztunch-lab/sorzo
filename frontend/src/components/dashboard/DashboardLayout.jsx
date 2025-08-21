import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { DashboardOverview } from './DashboardOverview';
import { BOMUpload } from './BOMUpload';
import { SupplierDiscovery } from './SupplierDiscovery';
import { RFQManagement } from './RFQManagement';
import { QuoteMatrix } from './QuoteMatrix';
import { ERPExport } from './ERPExport';
import { dashboardMock } from '../../data/dashboardMock';

export const DashboardLayout = () => {
  const [activeItem, setActiveItem] = useState('dashboard');

  const handleNavigate = (itemId) => {
    setActiveItem(itemId);
  };

  const renderContent = () => {
    switch (activeItem) {
      case 'dashboard':
        return (
          <DashboardOverview
            kpis={dashboardMock.kpis}
            activities={dashboardMock.activities}
            onNavigate={handleNavigate}
          />
        );
      case 'bom-upload':
        return <BOMUpload bomItems={dashboardMock.bomItems} />;
      case 'supplier-discovery':
        return <SupplierDiscovery suppliers={dashboardMock.suppliers} />;
      case 'rfq-management':
        return <RFQManagement projects={dashboardMock.rfqProjects} />;
      case 'quote-matrix':
        return <QuoteMatrix quotes={dashboardMock.quotes} />;
      case 'erp-export':
        return <ERPExport exports={dashboardMock.erpExports} />;
      default:
        return (
          <DashboardOverview
            kpis={dashboardMock.kpis}
            activities={dashboardMock.activities}
            onNavigate={handleNavigate}
          />
        );
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex">
      <Sidebar
        navigation={dashboardMock.navigation}
        activeItem={activeItem}
        onNavigate={handleNavigate}
        user={dashboardMock.user}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};