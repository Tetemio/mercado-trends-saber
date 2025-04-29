
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { TrendingUp } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      console.error("Login error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-6 rounded-lg border bg-card p-6 shadow-lg animate-fade-in">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-ml-primary">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold">ML Trends</h1>
          <p className="text-muted-foreground">
            Entre com sua conta para acessar seu dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="email@exemplo.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Senha</Label>
              <Link
                to="/forgot-password"
                className="text-xs text-ml-primary hover:underline"
              >
                Esqueceu a senha?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-ml-primary hover:bg-ml-secondary"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></div>
                Entrando...
              </div>
            ) : (
              "Entrar"
            )}
          </Button>
        </form>

        <div className="text-center text-sm text-muted-foreground">
          Ainda não tem uma conta?{" "}
          <Link to="/register" className="text-ml-primary hover:underline">
            Registre-se
          </Link>
        </div>

        <div className="text-center text-xs text-muted-foreground">
          <p>Credenciais para teste:</p>
          <p>Admin: admin@example.com / password</p>
          <p>Usuário: user@example.com / password</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
