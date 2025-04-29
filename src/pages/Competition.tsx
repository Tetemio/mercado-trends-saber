
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  SortAsc, 
  SortDesc, 
  ExternalLink,
  Filter,
  ChevronDown
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

// Mock competitors data
const mockCompetitors = [
  {
    id: 1,
    image: "https://via.placeholder.com/80",
    title: "Smartphone Advance 128GB 6GB RAM",
    seller: "TechMobileStore",
    price: 1299.90,
    monthlySales: 1450,
    rating: 4.8,
    reputation: "green-dark",
    shippingDays: 2
  },
  {
    id: 2,
    image: "https://via.placeholder.com/80",
    title: "Smartphone Advance Pro 128GB 8GB RAM",
    seller: "MegaEletronicos",
    price: 1499.90,
    monthlySales: 980,
    rating: 4.9,
    reputation: "green-dark",
    shippingDays: 1
  },
  {
    id: 3,
    image: "https://via.placeholder.com/80",
    title: "Smartphone Advance 128GB 6GB RAM - Recondicionado",
    seller: "ReciclaCell",
    price: 999.90,
    monthlySales: 630,
    rating: 4.5,
    reputation: "green-light",
    shippingDays: 3
  },
  {
    id: 4,
    image: "https://via.placeholder.com/80",
    title: "Smartphone Advance Lite 64GB 4GB RAM",
    seller: "SmartShopBR",
    price: 899.90,
    monthlySales: 820,
    rating: 4.7,
    reputation: "green-dark",
    shippingDays: 2
  },
  {
    id: 5,
    image: "https://via.placeholder.com/80",
    title: "Smartphone Advance 128GB 6GB RAM + Fone + Capa",
    seller: "KitCellShop",
    price: 1399.90,
    monthlySales: 540,
    rating: 4.6,
    reputation: "green-light",
    shippingDays: 4
  },
  {
    id: 6,
    image: "https://via.placeholder.com/80",
    title: "Smartphone Advance 128GB 6GB RAM - Novo Lacrado",
    seller: "OfficialTechStore",
    price: 1289.90,
    monthlySales: 1320,
    rating: 4.9,
    reputation: "green-dark",
    shippingDays: 1
  },
];

// Helper function to format currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { 
    style: 'currency', 
    currency: 'BRL' 
  }).format(value);
};

const Competition = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [competitors, setCompetitors] = useState(mockCompetitors);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [filterOpen, setFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [minSales, setMinSales] = useState(500);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm) {
      const filteredCompetitors = mockCompetitors.filter(
        comp => comp.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                comp.seller.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setCompetitors(filteredCompetitors);
    } else {
      setCompetitors(mockCompetitors);
    }
  };

  const handleSort = (column: string) => {
    const isAsc = sortColumn === column && sortDirection === "asc";
    setSortDirection(isAsc ? "desc" : "asc");
    setSortColumn(column);
    
    const sortedCompetitors = [...competitors].sort((a: any, b: any) => {
      if (a[column] < b[column]) return isAsc ? 1 : -1;
      if (a[column] > b[column]) return isAsc ? -1 : 1;
      return 0;
    });
    
    setCompetitors(sortedCompetitors);
  };

  const getSortIcon = (column: string) => {
    if (sortColumn !== column) return null;
    return sortDirection === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />;
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

  const applyFilters = () => {
    const filtered = mockCompetitors.filter(comp => {
      return comp.price >= priceRange[0] && 
             comp.price <= priceRange[1] && 
             comp.monthlySales >= minSales;
    });
    setCompetitors(filtered);
    setFilterOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="ml-page-header">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Análise da Concorrência</h1>
          <p className="text-muted-foreground">
            Compare anúncios e acompanhe seus concorrentes
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex-1">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Busque por produto ou vendedor"
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
        </div>
        
        <Button
          variant="outline"
          onClick={() => setFilterOpen(!filterOpen)}
          className="sm:w-auto"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filtros
        </Button>
      </div>

      {/* Filters panel */}
      {filterOpen && (
        <Card className="p-4 space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Filtros</h2>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setFilterOpen(false)}
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label>Faixa de Preço</Label>
              <div className="pt-2">
                <Slider
                  defaultValue={[0, 2000]}
                  max={2000}
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
                  max={2000}
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
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button 
              variant="outline" 
              onClick={() => {
                setPriceRange([0, 2000]);
                setMinSales(500);
                setCompetitors(mockCompetitors);
              }}
            >
              Limpar
            </Button>
            <Button 
              onClick={applyFilters} 
              className="bg-ml-primary hover:bg-ml-secondary"
            >
              Aplicar Filtros
            </Button>
          </div>
        </Card>
      )}

      {/* Competition Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Imagem</TableHead>
                <TableHead>Produto</TableHead>
                <TableHead onClick={() => handleSort('seller')} className="cursor-pointer">
                  <div className="flex items-center">
                    Vendedor
                    {getSortIcon('seller')}
                  </div>
                </TableHead>
                <TableHead onClick={() => handleSort('price')} className="cursor-pointer">
                  <div className="flex items-center">
                    Preço
                    {getSortIcon('price')}
                  </div>
                </TableHead>
                <TableHead onClick={() => handleSort('monthlySales')} className="cursor-pointer">
                  <div className="flex items-center">
                    Vendas/Mês
                    {getSortIcon('monthlySales')}
                  </div>
                </TableHead>
                <TableHead onClick={() => handleSort('rating')} className="cursor-pointer">
                  <div className="flex items-center">
                    Avaliação
                    {getSortIcon('rating')}
                  </div>
                </TableHead>
                <TableHead>Reputação</TableHead>
                <TableHead onClick={() => handleSort('shippingDays')} className="cursor-pointer">
                  <div className="flex items-center">
                    Entrega
                    {getSortIcon('shippingDays')}
                  </div>
                </TableHead>
                <TableHead className="w-[70px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {competitors.map((competitor) => (
                <TableRow key={competitor.id}>
                  <TableCell>
                    <img 
                      src={competitor.image} 
                      alt={competitor.title} 
                      className="h-12 w-12 object-contain"
                    />
                  </TableCell>
                  <TableCell className="max-w-[300px]">
                    <div className="line-clamp-2 text-sm">{competitor.title}</div>
                  </TableCell>
                  <TableCell>{competitor.seller}</TableCell>
                  <TableCell className="font-medium">
                    {formatCurrency(competitor.price)}
                  </TableCell>
                  <TableCell>{competitor.monthlySales}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {competitor.rating}
                      <span className="ml-1 text-yellow-500">★</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      {getReputationBadge(competitor.reputation)}
                    </div>
                  </TableCell>
                  <TableCell>
                    {competitor.shippingDays === 1 ? "1 dia" : `${competitor.shippingDays} dias`}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menu</span>
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="flex items-center">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          <span>Ver no Mercado Livre</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Adicionar ao Monitoramento</DropdownMenuItem>
                        <DropdownMenuItem>Ver Histórico de Preços</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Pagination controls would go here */}
      <div className="flex justify-center">
        <Button variant="outline" onClick={() => console.log("Load more")}>
          Carregar Mais
        </Button>
      </div>
    </div>
  );
};

export default Competition;
