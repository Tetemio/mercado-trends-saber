
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const Settings = () => {
  const { user } = useAuth();
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleConnectML = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsConnected(true);
      toast.success("Conta do Mercado Livre conectada com sucesso!");
    }, 1500);
  };

  const handleDisconnectML = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsConnected(false);
      toast.success("Conta do Mercado Livre desconectada!");
    }, 1500);
  };

  const handleSaveSettings = () => {
    toast.success("Configurações salvas com sucesso!");
  };

  return (
    <div className="space-y-6">
      <div className="ml-page-header">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Configurações</h1>
          <p className="text-muted-foreground">
            Gerencie suas preferências e integrações
          </p>
        </div>
      </div>

      <Tabs defaultValue="integrations" className="space-y-4">
        <TabsList>
          <TabsTrigger value="integrations">Integrações</TabsTrigger>
          <TabsTrigger value="account">Conta</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="appearance">Aparência</TabsTrigger>
        </TabsList>
        
        {/* Mercado Livre Integration */}
        <TabsContent value="integrations">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="text-xl font-bold">Mercado Livre</h3>
                  <p className="text-muted-foreground">
                    Conecte sua conta do Mercado Livre para acessar dados de vendas e mercado
                  </p>
                </div>
                <img 
                  src="https://http2.mlstatic.com/frontend-assets/ui-navigation/5.19.1/mercadolibre/logo__large_plus.png" 
                  alt="Mercado Livre" 
                  className="h-10"
                />
              </div>

              {isConnected ? (
                <div className="space-y-4">
                  <div className="rounded-md bg-green-50 dark:bg-green-900/20 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-green-800 dark:text-green-200">
                          Conta conectada com sucesso!
                        </p>
                        <p className="mt-2 text-sm text-green-700 dark:text-green-300">
                          Sua conta do Mercado Livre está conectada. Você está pronto para obter insights sobre seus produtos e concorrentes.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h4 className="font-medium">Usuário ML: seller_test_12345</h4>
                      <p className="text-sm text-muted-foreground">Último sincronismo: hoje às 14:30</p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button 
                        variant="outline" 
                        className="flex items-center"
                        onClick={() => toast.success("Sincronização iniciada")}
                      >
                        Sincronizar Dados
                      </Button>
                      <Button 
                        variant="destructive" 
                        disabled={isLoading}
                        onClick={handleDisconnectML}
                      >
                        {isLoading ? "Desconectando..." : "Desconectar"}
                      </Button>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">Permissões Conectadas</h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center text-green-600 dark:text-green-400">
                        <svg className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Leitura de perfil de vendedor
                      </li>
                      <li className="flex items-center text-green-600 dark:text-green-400">
                        <svg className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Leitura de dados de produtos
                      </li>
                      <li className="flex items-center text-green-600 dark:text-green-400">
                        <svg className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Leitura de dados de vendas
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p>
                    Para usar todas as funcionalidades desta plataforma, você precisa conectar sua conta do Mercado Livre. 
                    Isso permitirá acesso aos seus produtos, estatísticas de vendas e dados do mercado.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button 
                      onClick={handleConnectML} 
                      disabled={isLoading || !user || user.role !== "admin"}
                      className="bg-ml-primary hover:bg-ml-secondary"
                    >
                      {isLoading ? "Conectando..." : "Conectar Mercado Livre"}
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex items-center"
                      asChild
                    >
                      <a href="https://developers.mercadolivre.com.br/" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Documentação da API
                      </a>
                    </Button>
                  </div>
                  
                  {user && user.role !== "admin" && (
                    <div className="rounded-md bg-yellow-50 dark:bg-yellow-900/20 p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-yellow-800 dark:text-yellow-200">
                            Apenas usuários administradores podem conectar a conta do Mercado Livre.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Card>

          <Card className="p-6 mt-4">
            <div className="space-y-6">
              <div className="space-y-0.5">
                <h3 className="text-xl font-bold">Outras Integrações</h3>
                <p className="text-muted-foreground">
                  Adicione outras ferramentas e serviços para expandir as funcionalidades
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-gray-100 p-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Google Analytics</h4>
                      <p className="text-sm text-muted-foreground">Conecte para análise de tráfego</p>
                    </div>
                  </div>
                  <Button variant="outline">Conectar</Button>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-gray-100 p-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Importar/Exportar CSV</h4>
                      <p className="text-sm text-muted-foreground">Importe ou exporte seus dados</p>
                    </div>
                  </div>
                  <Button variant="outline">Configurar</Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        {/* Account Settings */}
        <TabsContent value="account">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="space-y-0.5">
                <h3 className="text-xl font-bold">Informações da Conta</h3>
                <p className="text-muted-foreground">
                  Atualize suas informações pessoais e de contato
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input id="name" defaultValue={user?.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue={user?.email} />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="role">Papel</Label>
                    <Input id="role" defaultValue={user?.role} disabled />
                  </div>
                </div>
              </div>
              
              <Button onClick={handleSaveSettings} className="bg-ml-primary hover:bg-ml-secondary">
                Salvar Alterações
              </Button>
            </div>
          </Card>
          
          <Card className="p-6 mt-4">
            <div className="space-y-6">
              <div className="space-y-0.5">
                <h3 className="text-xl font-bold">Segurança</h3>
                <p className="text-muted-foreground">
                  Atualize sua senha e configure opções de segurança
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Senha Atual</Label>
                    <Input id="current-password" type="password" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="new-password">Nova Senha</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
              </div>
              
              <Button onClick={() => toast.success("Senha alterada com sucesso!")} className="bg-ml-primary hover:bg-ml-secondary">
                Alterar Senha
              </Button>
            </div>
          </Card>
          
          <Card className="p-6 mt-4">
            <div className="space-y-6">
              <div className="space-y-0.5">
                <h3 className="text-xl font-bold text-destructive">Zona de Perigo</h3>
                <p className="text-muted-foreground">
                  Ações irreversíveis para sua conta
                </p>
              </div>
              
              <Button 
                variant="destructive" 
                onClick={() => toast.error("Esta funcionalidade está desativada no momento.")}
              >
                Excluir Minha Conta
              </Button>
            </div>
          </Card>
        </TabsContent>
        
        {/* Notifications Settings */}
        <TabsContent value="notifications">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="space-y-0.5">
                <h3 className="text-xl font-bold">Preferências de Notificação</h3>
                <p className="text-muted-foreground">
                  Escolha como e quando deseja ser notificado
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="font-medium">Relatórios Semanais</h4>
                    <p className="text-sm text-muted-foreground">
                      Receba um relatório semanal com os principais insights
                    </p>
                  </div>
                  <Switch defaultChecked id="weekly-report" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="font-medium">Alterações de Preço</h4>
                    <p className="text-sm text-muted-foreground">
                      Notificações quando seus concorrentes alterarem preços
                    </p>
                  </div>
                  <Switch defaultChecked id="price-changes" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="font-medium">Novos Concorrentes</h4>
                    <p className="text-sm text-muted-foreground">
                      Seja notificado quando novos vendedores entrarem no mercado
                    </p>
                  </div>
                  <Switch id="new-competitors" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="font-medium">Tendências Emergentes</h4>
                    <p className="text-sm text-muted-foreground">
                      Alertas sobre categorias e produtos em ascensão
                    </p>
                  </div>
                  <Switch defaultChecked id="trending-alerts" />
                </div>
              </div>
              
              <Button onClick={() => toast.success("Preferências de notificação salvas!")} className="bg-ml-primary hover:bg-ml-secondary">
                Salvar Preferências
              </Button>
            </div>
          </Card>
          
          <Card className="p-6 mt-4">
            <div className="space-y-6">
              <div className="space-y-0.5">
                <h3 className="text-xl font-bold">Canais de Notificação</h3>
                <p className="text-muted-foreground">
                  Escolha como deseja receber suas notificações
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="font-medium">Email</h4>
                    <p className="text-sm text-muted-foreground">
                      Notificações enviadas para {user?.email}
                    </p>
                  </div>
                  <Switch defaultChecked id="email-notifications" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="font-medium">Notificações no Navegador</h4>
                    <p className="text-sm text-muted-foreground">
                      Receba alertas enquanto utiliza a plataforma
                    </p>
                  </div>
                  <Switch defaultChecked id="browser-notifications" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="font-medium">WhatsApp</h4>
                    <p className="text-sm text-muted-foreground">
                      Conecte seu WhatsApp para receber alertas importantes
                    </p>
                  </div>
                  <Button variant="outline" size="sm">Conectar</Button>
                </div>
              </div>
              
              <Button onClick={() => toast.success("Canais de notificação atualizados!")} className="bg-ml-primary hover:bg-ml-secondary">
                Salvar Canais
              </Button>
            </div>
          </Card>
        </TabsContent>
        
        {/* Appearance Settings */}
        <TabsContent value="appearance">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="space-y-0.5">
                <h3 className="text-xl font-bold">Tema e Aparência</h3>
                <p className="text-muted-foreground">
                  Personalize a aparência da interface
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Tema</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" className="justify-start p-4 h-auto border-2 border-ml-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>
                      Claro
                    </Button>
                    <Button variant="outline" className="justify-start p-4 h-auto">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>
                      Escuro
                    </Button>
                    <Button variant="outline" className="justify-start p-4 h-auto">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path><path d="M12 8v.01"></path><path d="M12 12v.01"></path><path d="M12 16v.01"></path><path d="M8 12H2"></path><path d="M22 12h-6"></path><path d="m15 5-2 2"></path><path d="m15 19-2-2"></path><path d="m9 5 2 2"></path><path d="m9 19 2-2"></path></svg>
                      Sistema
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Densidade</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" className="justify-start p-4 h-auto">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><rect width="4" height="6" x="4" y="4" rx="1"></rect><rect width="4" height="6" x="4" y="14" rx="1"></rect><rect width="4" height="6" x="10" y="4" rx="1"></rect><rect width="4" height="6" x="10" y="14" rx="1"></rect><rect width="4" height="6" x="16" y="4" rx="1"></rect><rect width="4" height="6" x="16" y="14" rx="1"></rect></svg>
                      Compacta
                    </Button>
                    <Button variant="outline" className="justify-start p-4 h-auto border-2 border-ml-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><rect width="7" height="7" x="3" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="14" rx="1"></rect><rect width="7" height="7" x="3" y="14" rx="1"></rect></svg>
                      Padrão
                    </Button>
                    <Button variant="outline" className="justify-start p-4 h-auto">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><rect width="18" height="18" x="3" y="3" rx="2"></rect></svg>
                      Confortável
                    </Button>
                  </div>
                </div>
              </div>
              
              <Button onClick={() => toast.success("Aparência atualizada!")} className="bg-ml-primary hover:bg-ml-secondary">
                Salvar Preferências
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
