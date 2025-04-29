
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrendingUp, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // In a real app, we would get the token from URL params
  // const { token } = useParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Senha alterada com sucesso!");
      navigate("/login", { replace: true });
    }, 1500);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-6 rounded-lg border bg-card p-6 shadow-lg animate-fade-in">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-ml-primary">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold">Redefinir Senha</h1>
          <p className="text-muted-foreground">
            Crie uma nova senha para sua conta
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">Nova Senha</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="********"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar Senha</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="********"
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
                Atualizando...
              </div>
            ) : (
              "Redefinir Senha"
            )}
          </Button>
        </form>

        <div className="text-center">
          <Link to="/login" className="inline-flex items-center text-sm text-ml-primary hover:underline">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Voltar para Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
