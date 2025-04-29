
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrendingUp, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      toast.success("Email enviado! Verifique sua caixa de entrada.");
    }, 1500);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-6 rounded-lg border bg-card p-6 shadow-lg animate-fade-in">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-ml-primary">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold">Recuperar Senha</h1>
          <p className="text-muted-foreground">
            Insira seu email para receber um link de recuperação de senha
          </p>
        </div>

        {!isSubmitted ? (
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

            <Button
              type="submit"
              className="w-full bg-ml-primary hover:bg-ml-secondary"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></div>
                  Enviando...
                </div>
              ) : (
                "Enviar Link de Recuperação"
              )}
            </Button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">
                    Email enviado para {email}
                  </p>
                  <p className="mt-2 text-sm text-green-700">
                    Por favor, verifique sua caixa de entrada e siga as instruções para redefinir sua senha.
                  </p>
                </div>
              </div>
            </div>
            
            <Button
              className="w-full bg-ml-primary hover:bg-ml-secondary"
              onClick={() => setIsSubmitted(false)}
            >
              Tentar Novamente
            </Button>
          </div>
        )}

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

export default ForgotPassword;
