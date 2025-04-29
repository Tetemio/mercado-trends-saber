
import { ReactNode, useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { 
  Home, 
  TrendingUp, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  ChevronDown,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
}

const NavItem = ({ to, icon, label, active }: NavItemProps) => (
  <Link 
    to={to} 
    className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
      active 
        ? "bg-sidebar-accent text-sidebar-accent-foreground" 
        : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
    }`}
  >
    <div className="flex-shrink-0">{icon}</div>
    <span>{label}</span>
  </Link>
);

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Navigation items
  const navItems = [
    { to: "/dashboard", icon: <Home size={20} />, label: "Dashboard" },
    { to: "/dashboard/trends", icon: <TrendingUp size={20} />, label: "Tendências" },
    { to: "/dashboard/competition", icon: <Users size={20} />, label: "Concorrência" }
  ];
  
  // Admin-only navigation items
  const adminItems = [
    { to: "/admin/users", icon: <Users size={20} />, label: "Usuários" }
  ];

  // Setting items for all users
  const settingsItems = [
    { to: "/settings", icon: <Settings size={20} />, label: "Configurações" }
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar for desktop */}
      <div className={`bg-sidebar fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:relative lg:w-64 flex-shrink-0 border-r`}>
        <div className="flex h-full flex-col">
          {/* Sidebar header */}
          <div className="flex h-16 items-center justify-between px-4 border-b">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="bg-ml-primary text-white p-1 rounded">
                <TrendingUp size={24} />
              </div>
              <span className="text-lg font-semibold">ML Trends</span>
            </Link>
            <button
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-1">
              {navItems.map((item) => (
                <NavItem
                  key={item.to}
                  to={item.to}
                  icon={item.icon}
                  label={item.label}
                  active={location.pathname === item.to}
                />
              ))}
            </div>

            {/* Admin section */}
            {user && (user.role === "admin" || user.role === "manager") && (
              <>
                <div className="mt-8 mb-2 px-3">
                  <h3 className="text-xs font-semibold uppercase text-sidebar-foreground/60">
                    Administração
                  </h3>
                </div>
                <div className="space-y-1">
                  {adminItems.map((item) => (
                    <NavItem
                      key={item.to}
                      to={item.to}
                      icon={item.icon}
                      label={item.label}
                      active={location.pathname.startsWith(item.to)}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Settings section */}
            <div className="mt-8 mb-2 px-3">
              <h3 className="text-xs font-semibold uppercase text-sidebar-foreground/60">
                Configurações
              </h3>
            </div>
            <div className="space-y-1">
              {settingsItems.map((item) => (
                <NavItem
                  key={item.to}
                  to={item.to}
                  icon={item.icon}
                  label={item.label}
                  active={location.pathname.startsWith(item.to)}
                />
              ))}
            </div>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top navbar */}
        <header className="bg-background z-10 flex h-16 items-center justify-between border-b px-4 lg:px-6">
          <button
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
          
          <div className="flex-1 lg:ml-0">
            <div className="relative max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Buscar..."
                className="w-full rounded-md border border-input bg-background pl-8 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 flex items-center space-x-2">
                    <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full bg-muted">
                      <span className="text-sm font-medium uppercase">{user.name.charAt(0)}</span>
                    </div>
                    <div className="hidden md:flex flex-col items-start text-left">
                      <span className="text-sm font-medium">{user.name}</span>
                      <span className="text-xs text-muted-foreground">{user.role}</span>
                    </div>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Perfil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings">Configurações</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-red-500 cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </header>
        
        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
      
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
