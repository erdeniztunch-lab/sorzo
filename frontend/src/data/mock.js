export const mockData = {
  // Hero section content
  hero: {
    title: "Tesora for Manufacturing",
    subtitle: "Yapay Zekâ Destekli Tedarikçi Keşfi ve RFQ Otomasyonu",
    description: "Türkiye imalat sektörü için geliştirilmiş akıllı tedarik platformu. Satın alma süreçlerinizi hızlandırın, maliyetlerinizi düşürün.",
    cta: "Ücretsiz Demo Talep Et",
    heroImage: "https://images.unsplash.com/photo-1717386255773-1e3037c81788"
  },

  // Features data
  features: [
    {
      id: 1,
      title: "BOM/CAD Yükleme",
      description: "CSV ve PDF formatlarında BOM/CAD dosyalarınızı yükleyin. Manuel düzenleme ile kalemleri eşleştirin.",
      icon: "Upload",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
    },
    {
      id: 2,
      title: "AI Tedarikçi Eşleştirme",
      description: "Türkiye OSB ve ticaret dizini ile semantic search. Her kalem için minimum 5 tedarikçi önerisi.",
      icon: "Brain",
      image: "https://images.unsplash.com/photo-1647427060118-4911c9821b82"
    },
    {
      id: 3,
      title: "RFQ Otomasyonu",
      description: "Otomatik RFP/RFQ e-posta gönderimi. 5-10 tedarikçiye aynı anda teklif talebi gönderin.",
      icon: "Mail",
      image: "https://images.unsplash.com/photo-1516937941344-00b4e0337589"
    },
    {
      id: 4,
      title: "Teklif Skorlama",
      description: "Fiyat, teslim süresi, kapasite, sertifika ve risk kriterlerine göre otomatik skorlama.",
      icon: "BarChart3",
      image: "https://images.unsplash.com/photo-1511454493857-0a29f2c023c7"
    }
  ],

  // Benefits and KPI data
  benefits: [
    {
      id: 1,
      title: "RFQ Tamamlama Süresi",
      value: "<48 Saat",
      description: "Geleneksel süreçlere göre %75 daha hızlı",
      icon: "Clock"
    },
    {
      id: 2,
      title: "Tasarruf Hedefi",
      value: "%5-15",
      description: "RFP başına ortalama maliyet tasarrufu",
      icon: "TrendingDown"
    },
    {
      id: 3,
      title: "Tedarikçi Önerisi",
      value: "5+ Tedarikçi",
      description: "Her kalem için minimum tedarikçi sayısı",
      icon: "Users"
    },
    {
      id: 4,
      title: "ERP Entegrasyonu",
      value: "Netsis, Logo, SAP",
      description: "Mevcut sistemlerinizle uyumlu CSV export",
      icon: "Database"
    }
  ],

  // Target audience data
  targetAudience: [
    {
      id: 1,
      title: "Orta ve Büyük Ölçekli Firmalar",
      description: "250+ çalışan üretim şirketleri",
      icon: "Building"
    },
    {
      id: 2,
      title: "Satın Alma Yöneticileri",
      description: "Tedarik zinciri optimizasyonu",
      icon: "ShoppingCart"
    },
    {
      id: 3,
      title: "Üretim Mühendisleri",
      description: "Teknik spesifikasyon yönetimi",
      icon: "Cog"
    }
  ],

  // Demo form mock
  demoForm: {
    fields: [
      { name: "companyName", label: "Şirket Adı", type: "text", required: true },
      { name: "contactName", label: "İletişim Kişisi", type: "text", required: true },
      { name: "email", label: "E-posta", type: "email", required: true },
      { name: "phone", label: "Telefon", type: "tel", required: true },
      { name: "employeeCount", label: "Çalışan Sayısı", type: "select", options: ["50-100", "100-250", "250-500", "500+"], required: true }
    ]
  },

  // Footer data
  footer: {
    company: {
      name: "Tesora",
      description: "Türkiye imalat sektörü için geliştirilmiş yapay zekâ destekli tedarik platformu."
    },
    links: {
      product: [
        { name: "Özellikler", href: "#features" },
        { name: "Fiyatlandırma", href: "#pricing" },
        { name: "Demo", href: "#demo" }
      ],
      company: [
        { name: "Hakkımızda", href: "#about" },
        { name: "İletişim", href: "#contact" },
        { name: "Kariyer", href: "#careers" }
      ],
      support: [
        { name: "Yardım Merkezi", href: "#help" },
        { name: "Dokümantasyon", href: "#docs" },
        { name: "API", href: "#api" }
      ]
    }
  }
};