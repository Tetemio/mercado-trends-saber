
// This is a mock service to simulate Mercado Livre API interactions
// In a real application, this would make actual API calls to the backend

// Types
export interface MLProduct {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
  sold_quantity: number;
  seller: {
    id: string;
    nickname: string;
    reputation: {
      status: string; // "green_dark", "green_light", "yellow", etc.
    };
  };
  shipping: {
    estimated_delivery_time: {
      days: number;
    };
  };
  rating: number;
}

export interface MLCategory {
  id: string;
  name: string;
  total_items_in_this_category: number;
}

export interface MLTrend {
  category_id: string;
  name: string;
  interest_over_time: Array<{ date: string; value: number }>;
  keywords: string[];
}

// Mock data
const mockCategories: MLCategory[] = [
  { id: "MLB1055", name: "Celulares e Telefones", total_items_in_this_category: 123456 },
  { id: "MLB1648", name: "Informática", total_items_in_this_category: 98765 },
  { id: "MLB1039", name: "Câmeras e Acessórios", total_items_in_this_category: 34567 },
  { id: "MLB1051", name: "Eletrônicos, Áudio e Vídeo", total_items_in_this_category: 78901 },
  { id: "MLB1000", name: "Eletrodomésticos", total_items_in_this_category: 45678 },
];

const mockProducts: MLProduct[] = [
  {
    id: "MLB1234567890",
    title: "Smartphone Advance 128GB 6GB RAM",
    price: 1299.9,
    thumbnail: "https://via.placeholder.com/120",
    sold_quantity: 1450,
    seller: {
      id: "123",
      nickname: "TechMobileStore",
      reputation: {
        status: "green_dark",
      },
    },
    shipping: {
      estimated_delivery_time: {
        days: 2,
      },
    },
    rating: 4.8,
  },
  {
    id: "MLB2345678901",
    title: "Notebook Ultra Pro i7 16GB 512GB SSD",
    price: 4599.9,
    thumbnail: "https://via.placeholder.com/120",
    sold_quantity: 830,
    seller: {
      id: "456",
      nickname: "MegaEletronicos",
      reputation: {
        status: "green_dark",
      },
    },
    shipping: {
      estimated_delivery_time: {
        days: 1,
      },
    },
    rating: 4.9,
  },
];

const mockTrends: MLTrend[] = [
  {
    category_id: "MLB1055",
    name: "Celulares e Telefones",
    interest_over_time: [
      { date: "2023-01", value: 100 },
      { date: "2023-02", value: 120 },
      { date: "2023-03", value: 110 },
      { date: "2023-04", value: 130 },
      { date: "2023-05", value: 150 },
      { date: "2023-06", value: 170 },
      { date: "2023-07", value: 160 },
    ],
    keywords: ["smartphone", "iphone", "samsung", "xiaomi"],
  },
  {
    category_id: "MLB1648",
    name: "Informática",
    interest_over_time: [
      { date: "2023-01", value: 80 },
      { date: "2023-02", value: 85 },
      { date: "2023-03", value: 90 },
      { date: "2023-04", value: 110 },
      { date: "2023-05", value: 105 },
      { date: "2023-06", value: 120 },
      { date: "2023-07", value: 135 },
    ],
    keywords: ["notebook", "laptop", "ssd", "memória ram"],
  },
];

// Mock API functions
export const mercadoLivreApi = {
  // Auth functions
  getAuthUrl: async (): Promise<string> => {
    // In a real app, this would call the backend to get the OAuth URL
    return "https://auth.mercadolivre.com.br/authorization?response_type=code&client_id=APP_ID&redirect_uri=REDIRECT_URI";
  },
  
  exchangeCodeForToken: async (code: string): Promise<{ success: boolean }> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Exchanging code for token:", code);
    return { success: true };
  },
  
  getConnectionStatus: async (): Promise<{ connected: boolean; username?: string }> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { connected: Math.random() > 0.5, username: "seller_test_12345" };
  },
  
  disconnectAccount: async (): Promise<{ success: boolean }> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { success: true };
  },
  
  // Data retrieval functions
  getCategories: async (): Promise<MLCategory[]> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    return mockCategories;
  },
  
  searchProducts: async (query: string): Promise<MLProduct[]> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1200));
    
    // Basic filtering for demo
    if (!query) return mockProducts;
    
    return mockProducts.filter(
      (product) => product.title.toLowerCase().includes(query.toLowerCase())
    );
  },
  
  getTrendingInCategory: async (categoryId: string): Promise<MLTrend | null> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    return mockTrends.find((trend) => trend.category_id === categoryId) || null;
  },
  
  getCompetitors: async (query: string): Promise<MLProduct[]> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Basic filtering for demo
    if (!query) return mockProducts;
    
    return mockProducts.filter(
      (product) => product.title.toLowerCase().includes(query.toLowerCase())
    );
  },
};
