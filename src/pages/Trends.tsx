
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  ChevronDown, 
  ChevronUp,
  Filter,
  ExternalLink
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectItem 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

// Mock data for trends
const mockCategoryData = [
  { date: "2023-01", interest: 100 },
  { date: "2023-02", interest: 120 },
  { date: "2023-03", interest: 110 },
  { date: "2023-04", interest: 130 },
  { date: "2023-05", interest: 150 },
  { date: "2023-06", interest: 170 },
  { date: "2023-07", interest: 160 },
];

const mockProducts = [
  {
    id: 1,
    title: "Smartphone Advance 128GB 6GB RAM",
    price: 1299.90,
    monthlySales: 1450,
    monthlySalesValue: 1884855.0,
    image: "https://via.placeholder.com/120",
    reputation: "green-dark",
    trend: 12
  },
  {
    id: 2,
    title: "Notebook Ultra Pro i7 16GB 512GB SSD",
    price: 4599.90,
    monthlySales: 830,
    monthlySalesValue: 3817917.0,
    image: "https://via.placeholder.com/120",
    reputation: "green-light",
    trend: 5
  },
  {
    id: 3,
    title: "Smart TV 4K 55\" Ultra HD",
    price: 2899.90,
    monthlySales: 950,
    monthlySalesValue: 2754905.0,
    image: "https://via.placeholder.com/120",
    reputation: "green-dark",
    trend: -3
  },
  {
    id: 4,
    title: "Fone de Ouvido Bluetooth Wireless",
    price: 299.90,
    monthlySales: 2100,
    monthlySalesValue: 629790.0,
    image: "https://via.placeholder.com/120",
    reputation: "green-dark",
    trend: 18
  },
  {
    id: 5,
    title: "Console de Videogame NextGen 1TB",
    price: 3999.90,
    monthlySales: 720,
    monthlySalesValue: 2879928.0,
    image: "https://via.placeholder.com/120",
    reputation: "green-light",
    trend: 8
  },
  {
    id: 6,
    title: "Smartwatch Advanced Fitness Tracker",
    price: 699.90,
    monthlySales: 1050,
    monthlySalesValue: 734895.0,
    image: "https://via.placeholder.com/120",
    reputation: "yellow",
    trend: 15
  },
];

const categories = [
  "Eletrônicos",
  "Casa e Jardim",
  "Moda",
  "Esportes",
  "Saúde e Beleza",
  "Automotivo",
  "Bebês",
  "Brinquedos",
  "Alimentos e Bebidas"
];

// Helper function to format currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { 
    style: 'currency', 
    currency: 'BRL' 
  }).format(value);
};

const Trends = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [minSales, setMinSales] = useState(500);
  const [filterOpen, setFilterOpen] = useState(true);
  const [sortBy, setSortBy] = useState("sales");
  const [products, setProducts] = useState(mockProducts);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger an API call with all filters
    console.log("Search term:", searchTerm);
    console.log("Category:", selectedCategory);
    console.log("Price range:", priceRange);
    console.log("Min sales:", minSales);
    console.log("Sort by:", sortBy);
    
    // For now, just simulate filtering
    if (searchTerm) {
      const filteredProducts = mockProducts.filter(
        product => product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setProducts(filteredProducts);
    } else {
      setProducts(mockProducts);
    }
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    
    // Sort products accordingly
    const sortedProducts = [...products];
    if (value === "sales") {
      sortedProducts.sort((a, b) => b.monthlySales - a.monthlySales);
    } else if (value === "revenue") {
      sortedProducts.sort((a, b) => b.monthlySalesValue - a.monthlySalesValue);
    } else if (value === "price_asc") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (value === "price_desc") {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (value === "trend") {
      sortedProducts.sort((a, b) => b.trend - a.trend);
    }
    
    setProducts(sortedProducts);
  };

  const getReputationBadge = (reputation: string) => {
    switch (reputation) {
      case "green-dark":
        return <div className="h-3 w-3 rounded-full bg-green-700" />;
      case "green-light":
        return <div className="h-3 w-3 rounded-full bg-green-500" />;
      case "yellow":
        return <div className="h-3 w-3 rounded-full bg-yellow-500" />;
      default:
        return <div className="h-3 w-3 rounded-full bg-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="ml-page-header">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Análise de Tendências</h1>
          <p className="text-muted-foreground">
            Descubra produtos em alta no Mercado Livre
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className={`lg:w-1/4 space-y-6 ${filterOpen ? "block" : "hidden lg:block"}`}>
          <Card className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">Filtros</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                className="lg:hidden"
                onClick={() => setFilterOpen(false)}
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as categorias</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category.toLowerCase()}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Faixa de Preço</Label>
                <div className="pt-2">
                  <Slider
                    defaultValue={[0, 5000]}
                    max={10000}
                    step={100}
                    value={priceRange}
                    onValueChange={(value) => setPriceRange(value as [number, number])}
                    className="mb-6"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {formatCurrency(priceRange[0])}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {formatCurrency(priceRange[1])}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Vendas Mensais (min)</Label>
                <div className="pt-2">
                  <Slider
                    defaultValue={[500]}
                    max={5000}
                    step={100}
                    value={[minSales]}
                    onValueChange={(value) => setMinSales(value[0])}
                    className="mb-6"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {minSales}+ vendas/mês
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Reputação do Vendedor</Label>
                <div className="space-y-2 pt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="rep-green-dark" defaultChecked />
                    <Label 
                      htmlFor="rep-green-dark" 
                      className="flex items-center space-x-2 text-sm font-normal"
                    >
                      <div className="h-3 w-3 rounded-full bg-green-700" />
                      <span>Verde Escuro</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="rep-green-light" defaultChecked />
                    <Label 
                      htmlFor="rep-green-light" 
                      className="flex items-center space-x-2 text-sm font-normal"
                    >
                      <div className="h-3 w-3 rounded-full bg-green-500" />
                      <span>Verde Claro</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="rep-yellow" defaultChecked />
                    <Label 
                      htmlFor="rep-yellow" 
                      className="flex items-center space-x-2 text-sm font-normal"
                    >
                      <div className="h-3 w-3 rounded-full bg-yellow-500" />
                      <span>Amarelo</span>
                    </Label>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleSearch} 
                className="w-full bg-ml-primary hover:bg-ml-secondary"
              >
                Aplicar Filtros
              </Button>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4 space-y-6">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-1">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Busque por categoria ou palavra-chave"
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </form>
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant="outline"
                className="flex sm:hidden"
                onClick={() => setFilterOpen(!filterOpen)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>

              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sales">Mais Vendidos</SelectItem>
                  <SelectItem value="revenue">Maior Faturamento</SelectItem>
                  <SelectItem value="price_asc">Menor Preço</SelectItem>
                  <SelectItem value="price_desc">Maior Preço</SelectItem>
                  <SelectItem value="trend">Maior Crescimento</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Category Trend Chart */}
          <Card className="p-4">
            <h3 className="text-lg font-medium mb-4">Tendência da Categoria</h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={mockCategoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return `${date.getMonth() + 1}/${date.getFullYear().toString().substr(-2)}`;
                  }}
                />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`Interesse: ${value}`, "Pontuação"]}
                  contentStyle={{ backgroundColor: "var(--color-card)" }}
                />
                <Area 
                  type="monotone" 
                  dataKey="interest" 
                  stroke="#9b87f5" 
                  fill="#9b87f5" 
                  fillOpacity={0.2} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* Product Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden h-full flex flex-col">
                <div className="p-4 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="h-32 object-contain"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h4 className="font-medium text-sm mb-2 line-clamp-2">{product.title}</h4>
                  <div className="mb-2">
                    <span className="text-lg font-bold">
                      {formatCurrency(product.price)}
                    </span>
                  </div>
                  <div className="space-y-2 mt-auto">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Vendas/mês:</span>
                      <span className="font-medium">{product.monthlySales}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Faturamento:</span>
                      <span className="font-medium">{formatCurrency(product.monthlySalesValue)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Tendência:</span>
                      <div className="flex items-center">
                        {product.trend > 0 ? (
                          <>
                            <ChevronUp className="h-4 w-4 text-green-600 mr-1" />
                            <span className="text-green-600">+{product.trend}%</span>
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-4 w-4 text-red-600 mr-1" />
                            <span className="text-red-600">{product.trend}%</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Reputação:</span>
                      <div className="flex items-center space-x-1">
                        {getReputationBadge(product.reputation)}
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-4 w-full flex items-center justify-center"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Ver no Mercado Livre
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Show more button */}
          <div className="flex justify-center">
            <Button variant="outline" onClick={() => console.log("Load more")}>
              Ver Mais
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trends;
