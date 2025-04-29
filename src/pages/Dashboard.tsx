
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { 
  TrendingUp, 
  Users, 
  ArrowRight, 
  TrendingDown,
  EyeIcon,
  ChevronUp,
  ChevronDown
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Legend
} from "recharts";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

// Mock data for charts
const salesData = [
  { name: "Jan", value: 400 },
  { name: "Fev", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Abr", value: 800 },
  { name: "Mai", value: 700 },
  { name: "Jun", value: 900 },
  { name: "Jul", value: 1100 },
];

const categoryData = [
  { name: "Eletrônicos", vendas: 1200, crescimento: 23 },
  { name: "Casa", vendas: 900, crescimento: 14 },
  { name: "Moda", vendas: 850, crescimento: -3 },
  { name: "Esportes", vendas: 750, crescimento: 17 },
  { name: "Saúde", vendas: 650, crescimento: 8 },
];

const trendingProducts = [
  {
    id: 1,
    name: "Smartphone Advance 128GB",
    price: 1299.90,
    sales: 432,
    growth: 17,
    image: "https://via.placeholder.com/80"
  },
  {
    id: 2,
    name: "Fone de Ouvido Wireless Pro",
    price: 299.90,
    sales: 378,
    growth: 24,
    image: "https://via.placeholder.com/80"
  },
  {
    id: 3,
    name: "Smart TV 4K 50 polegadas",
    price: 2499.90,
    sales: 210,
    growth: -5,
    image: "https://via.placeholder.com/80"
  },
];

const Dashboard = () => {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState("3m");

  return (
    <div className="space-y-6">
      <div className="ml-page-header">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Bem-vindo, {user?.name}! Aqui está o resumo da sua loja no Mercado Livre.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="ml-stats-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Vendas Total</p>
              <h3 className="text-2xl font-bold">R$ 34.729,00</h3>
            </div>
            <div className="rounded-full bg-ml-success/20 p-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center space-x-1 text-xs">
            <ChevronUp className="h-4 w-4 text-green-600" />
            <span className="text-green-600">12%</span>
            <span className="text-muted-foreground">em relação ao mês anterior</span>
          </div>
        </Card>
        
        <Card className="ml-stats-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Produtos Vendidos</p>
              <h3 className="text-2xl font-bold">879</h3>
            </div>
            <div className="rounded-full bg-ml-success/20 p-2">
              <Users className="h-5 w-5 text-green-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center space-x-1 text-xs">
            <ChevronUp className="h-4 w-4 text-green-600" />
            <span className="text-green-600">8%</span>
            <span className="text-muted-foreground">em relação ao mês anterior</span>
          </div>
        </Card>
        
        <Card className="ml-stats-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Taxa de Conversão</p>
              <h3 className="text-2xl font-bold">3.2%</h3>
            </div>
            <div className="rounded-full bg-ml-success/20 p-2">
              <EyeIcon className="h-5 w-5 text-green-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center space-x-1 text-xs">
            <ChevronUp className="h-4 w-4 text-green-600" />
            <span className="text-green-600">0.5%</span>
            <span className="text-muted-foreground">em relação ao mês anterior</span>
          </div>
        </Card>
        
        <Card className="ml-stats-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Reputação</p>
              <h3 className="text-2xl font-bold">Verde Escuro</h3>
            </div>
            <div className="rounded-full bg-green-700/20 p-2">
              <div className="h-5 w-5 rounded-full bg-green-700" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-xs">
            <span className="text-muted-foreground">98% de avaliações positivas</span>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium">Vendas Mensais</h3>
            <div className="flex space-x-2">
              {["1m", "3m", "6m", "1a"].map((range) => (
                <Button
                  key={range}
                  variant={timeRange === range ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeRange(range)}
                  className={timeRange === range ? "bg-ml-primary hover:bg-ml-secondary" : ""}
                >
                  {range}
                </Button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={salesData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <Line type="monotone" dataKey="value" stroke="#9b87f5" strokeWidth={2} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "var(--color-card)", 
                  borderColor: "var(--color-border)"
                }}
                formatter={(value) => [`R$ ${value}`, "Vendas"]}
              />
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
        
        <Card className="p-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium">Desempenho por Categoria</h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={categoryData} margin={{ top: 5, right: 30, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "var(--color-card)", 
                  borderColor: "var(--color-border)"
                }}
              />
              <Legend />
              <Bar name="Vendas" dataKey="vendas" fill="#9b87f5" />
              <Bar name="Crescimento (%)" dataKey="crescimento" fill="#7E69AB" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Trending Products */}
      <Card className="p-4">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-medium">Produtos em Alta</h3>
          <Link to="/dashboard/trends">
            <Button variant="link" className="text-ml-primary hover:text-ml-secondary">
              Ver Todos <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        <div className="divide-y">
          {trendingProducts.map((product) => (
            <div key={product.id} className="flex items-center justify-between py-3">
              <div className="flex items-center space-x-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-14 w-14 rounded-md object-cover"
                />
                <div>
                  <h4 className="font-medium">{product.name}</h4>
                  <p className="text-muted-foreground">R$ {product.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">{product.sales} vendas</p>
                <div className="flex items-center justify-end space-x-1">
                  {product.growth > 0 ? (
                    <>
                      <ChevronUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-600">+{product.growth}%</span>
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4 text-red-600" />
                      <span className="text-sm text-red-600">{product.growth}%</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
