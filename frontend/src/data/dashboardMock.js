export const dashboardMock = {
  // User profile
  user: {
    name: "Ahmet Yılmaz",
    company: "Bosch Türkiye A.Ş.",
    role: "Satın Alma Müdürü",
    avatar: "AY"
  },

  // KPI metrics
  kpis: [
    {
      id: 1,
      title: "Toplam RFQ",
      value: "47",
      change: "+12%",
      changeType: "positive",
      icon: "FileText",
      description: "Bu ay"
    },
    {
      id: 2,
      title: "Ortalama Tasarruf",
      value: "%8.3",
      change: "+2.1%",
      changeType: "positive", 
      icon: "TrendingDown",
      description: "Son 3 ay"
    },
    {
      id: 3,
      title: "Aktif Projeler",
      value: "12",
      change: "-3",
      changeType: "neutral",
      icon: "Briefcase",
      description: "Devam eden"
    },
    {
      id: 4,
      title: "Teklif Süresi",
      value: "36 Saat",
      change: "-12h",
      changeType: "positive",
      icon: "Clock",
      description: "Ortalama"
    }
  ],

  // Recent activities
  activities: [
    {
      id: 1,
      type: "rfq_completed",
      title: "Metal Parça RFQ'su tamamlandı",
      description: "7 tedarikçiden teklif alındı, %12 tasarruf sağlandı",
      timestamp: "2 saat önce",
      status: "success"
    },
    {
      id: 2,
      type: "supplier_matched",
      title: "Yeni tedarikçi eşleştirmesi",
      description: "Plastik parçalar için 5 yeni tedarikçi bulundu",
      timestamp: "4 saat önce",
      status: "info"
    },
    {
      id: 3,
      type: "quote_received",
      title: "Otomatik teklif alındı",
      description: "Ankara Makine'den elektronik komponent teklifi",
      timestamp: "6 saat önce",
      status: "info"
    },
    {
      id: 4,
      type: "export_completed",
      title: "ERP Export tamamlandı",
      description: "SAP formatında 25 teklif verileri aktarıldı",
      timestamp: "1 gün önce",
      status: "success"
    }
  ],

  // BOM/CAD upload mock data
  bomItems: [
    {
      id: 1,
      partNumber: "MP-001",
      description: "Metal Döküm Parça",
      quantity: 1000,
      unit: "adet",
      category: "Döküm",
      status: "mapped",
      suppliers: 7
    },
    {
      id: 2,
      partNumber: "PL-045",
      description: "Plastik Kapak",
      quantity: 500,
      unit: "adet", 
      category: "Plastik",
      status: "pending",
      suppliers: 3
    },
    {
      id: 3,
      partNumber: "EL-123",
      description: "Elektronik Kart",
      quantity: 100,
      unit: "adet",
      category: "Elektronik",
      status: "mapped",
      suppliers: 12
    }
  ],

  // Supplier database mock
  suppliers: [
    {
      id: 1,
      name: "Konya Metal San. Ltd.",
      location: "Konya OSB",
      rating: 4.8,
      specialties: ["Döküm", "CNC Tezgahı"],
      responseTime: "2 saat",
      certifications: ["ISO 9001", "TS 16949"],
      matchScore: 95,
      contactPerson: "Mehmet Demir"
    },
    {
      id: 2,
      name: "Ankara Plastik A.Ş.",
      location: "Ankara Siteler",
      rating: 4.6,
      specialties: ["Enjeksiyon", "Kalıplama"],
      responseTime: "4 saat",
      certifications: ["ISO 9001"],
      matchScore: 89,
      contactPerson: "Ayşe Kaya"
    },
    {
      id: 3,
      name: "İzmir Elektronik Ltd.",
      location: "İzmir Atatürk OSB",
      rating: 4.9,
      specialties: ["PCB", "Elektronik Montaj"],
      responseTime: "1 saat",
      certifications: ["ISO 9001", "IPC-A-610"],
      matchScore: 92,
      contactPerson: "Can Özkan"
    }
  ],

  // RFQ projects mock
  rfqProjects: [
    {
      id: 1,
      projectName: "Q1 2024 Metal Parçalar",
      status: "active",
      totalItems: 15,
      suppliersContacted: 8,
      quotesReceived: 6,
      deadline: "2024-02-15",
      estimatedSavings: "%12",
      createdAt: "2024-01-10"
    },
    {
      id: 2,
      projectName: "Plastik Komponentler",
      status: "completed",
      totalItems: 8,
      suppliersContacted: 5,
      quotesReceived: 5,
      deadline: "2024-01-30",
      estimatedSavings: "%8",
      createdAt: "2024-01-05"
    },
    {
      id: 3,
      projectName: "Elektronik Kartlar RFQ",
      status: "draft",
      totalItems: 12,
      suppliersContacted: 0,
      quotesReceived: 0,
      deadline: "2024-03-01",
      estimatedSavings: "-%",
      createdAt: "2024-01-20"
    }
  ],

  // Quote matrix mock data
  quotes: [
    {
      id: 1,
      partNumber: "MP-001",
      supplier: "Konya Metal San.",
      price: 125.50,
      leadTime: "14 gün",
      capacity: "5000/ay",
      quality: "A+",
      totalScore: 94,
      priceScore: 90,
      timeScore: 95,
      capacityScore: 98,
      qualityScore: 92,
      riskScore: 96
    },
    {
      id: 2,
      partNumber: "MP-001", 
      supplier: "Bursa Döküm Ltd.",
      price: 135.00,
      leadTime: "10 gün",
      capacity: "3000/ay",
      quality: "A",
      totalScore: 87,
      priceScore: 82,
      timeScore: 98,
      capacityScore: 85,
      qualityScore: 88,
      riskScore: 90
    },
    {
      id: 3,
      partNumber: "MP-001",
      supplier: "Ankara Makine",
      price: 145.75,
      leadTime: "21 gün", 
      capacity: "8000/ay",
      quality: "A-",
      totalScore: 79,
      priceScore: 75,
      timeScore: 80,
      capacityScore: 95,
      qualityScore: 82,
      riskScore: 85
    }
  ],

  // Navigation menu items
  navigation: [
    {
      id: "dashboard",
      name: "Dashboard", icon: "LayoutDashboard", href: "/dashboard"
    },
    {
      id: "bom-upload",
      name: "BOM/CAD Yükleme",
      icon: "Upload",
      href: "/bom-upload"
    },
    {
      id: "supplier-discovery",
      name: "Tedarikçi Keşfi",
      icon: "Search",
      href: "/supplier-discovery"
    },
    {
      id: "rfq-management", 
      name: "RFQ Yönetimi",
      icon: "Mail",
      href: "/rfq-management"
    },
    {
      id: "quote-matrix",
      name: "Teklif Skorlama",
      icon: "BarChart3",
      href: "/quote-matrix"
    },
    {
      id: "erp-export",
      name: "ERP Export",
      icon: "Database",
      href: "/erp-export"
    }
  ],

  // ERP export data
  erpExports: [
    {
      id: 1,
      name: "Q1 2024 Metal Parçalar",
      format: "SAP",
      records: 25,
      size: "2.3 MB",
      createdAt: "2024-01-20",
      status: "completed"
    },
    {
      id: 2,
      name: "Plastik Komponentler", 
      format: "Netsis",
      records: 15,
      size: "1.8 MB",
      createdAt: "2024-01-18",
      status: "completed"
    },
    {
      id: 3,
      name: "Elektronik Export",
      format: "Logo",
      records: 32,
      size: "3.1 MB",
      createdAt: "2024-01-15",
      status: "processing"
    }
  ]
};