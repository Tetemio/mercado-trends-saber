
import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "manager" | "employee";
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check for existing user session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem("ml_user");
        const storedToken = localStorage.getItem("ml_token");
        
        if (storedUser && storedToken) {
          // In a real app, validate token with the backend here
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Auth check error:", error);
        localStorage.removeItem("ml_user");
        localStorage.removeItem("ml_token");
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // Mock login function - In real app, this would call the backend
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Mock API call - replace with actual API call
      if (email === "admin@example.com" && password === "password") {
        const mockUser = {
          id: "1",
          email: "admin@example.com",
          name: "Admin User",
          role: "admin" as const
        };
        
        const mockToken = "mock-jwt-token";
        
        // Store in localStorage (in real app, store JWT token)
        localStorage.setItem("ml_user", JSON.stringify(mockUser));
        localStorage.setItem("ml_token", mockToken);
        
        setUser(mockUser);
        toast.success("Login successful!");
        navigate("/dashboard");
      } else if (email === "user@example.com" && password === "password") {
        const mockUser = {
          id: "2",
          email: "user@example.com",
          name: "Regular User",
          role: "employee" as const
        };
        
        const mockToken = "mock-jwt-token-employee";
        
        localStorage.setItem("ml_user", JSON.stringify(mockUser));
        localStorage.setItem("ml_token", mockToken);
        
        setUser(mockUser);
        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("ml_user");
    localStorage.removeItem("ml_token");
    setUser(null);
    toast.success("You have been logged out");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
