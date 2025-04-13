
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { Loader2, User, Settings, LogOut, Shield, Activity } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ProfileData {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
}

const Profile = () => {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
  });
  
  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
      return;
    }
    
    if (user) {
      fetchProfileData();
    }
  }, [user, loading, navigate]);
  
  const fetchProfileData = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
        
      if (error) {
        throw error;
      }
      
      setProfileData(data);
      setFormData({
        username: data.username || '',
        fullName: data.full_name || '',
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: 'Error fetching profile',
        description: 'There was a problem loading your profile data.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          username: formData.username,
          full_name: formData.fullName,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);
        
      if (error) {
        throw error;
      }
      
      toast({
        title: 'Profile updated',
        description: 'Your profile has been successfully updated.',
      });
      
      // Refresh profile data
      fetchProfileData();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Error updating profile',
        description: 'There was a problem updating your profile.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/auth');
    } catch (error) {
      console.error('Error logging out:', error);
      toast({
        title: 'Error logging out',
        description: 'There was a problem logging out of your account.',
        variant: 'destructive',
      });
    }
  };
  
  if (loading || isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-remida-teal" />
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container-custom py-10">
        <h1 className="text-3xl font-bold mb-8">Il Tuo Profilo</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar with user information */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profileData?.avatar_url || ''} alt={profileData?.full_name || 'User'} />
                    <AvatarFallback className="text-2xl bg-remida-teal text-white">
                      {profileData?.full_name?.[0] || profileData?.username?.[0] || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="text-center">{profileData?.full_name || 'User'}</CardTitle>
                <CardDescription className="text-center">@{profileData?.username || 'username'}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Livello</span>
                  <span className="font-bold text-remida-teal">2</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Punti</span>
                  <span className="font-bold text-remida-teal">120</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Traguardi</span>
                  <span className="font-bold text-remida-teal">2/5</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleLogout} 
                  className="w-full" 
                  variant="outline"
                >
                  <LogOut className="mr-2 h-4 w-4" /> Esci
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Main content */}
          <div className="md:col-span-2">
            <Tabs defaultValue="account">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="account" className="flex items-center gap-2">
                  <User className="h-4 w-4" /> Account
                </TabsTrigger>
                <TabsTrigger value="activity" className="flex items-center gap-2">
                  <Activity className="h-4 w-4" /> Attività
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" /> Sicurezza
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="account">
                <Card>
                  <CardHeader>
                    <CardTitle>Informazioni Account</CardTitle>
                    <CardDescription>Aggiorna le informazioni del tuo profilo</CardDescription>
                  </CardHeader>
                  <form onSubmit={handleUpdateProfile}>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={user?.email || ''} 
                          disabled 
                          className="bg-gray-50"
                        />
                        <p className="text-xs text-gray-500">L'email non può essere modificata</p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input 
                          id="username" 
                          name="username"
                          value={formData.username} 
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Nome Completo</Label>
                        <Input 
                          id="fullName" 
                          name="fullName"
                          value={formData.fullName} 
                          onChange={handleInputChange}
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        type="submit" 
                        className="bg-remida-teal hover:bg-remida-teal/90"
                        disabled={isSaving}
                      >
                        {isSaving ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Salvataggio...
                          </>
                        ) : (
                          <>
                            <Settings className="mr-2 h-4 w-4" /> Salva Modifiche
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
              
              <TabsContent value="activity">
                <Card>
                  <CardHeader>
                    <CardTitle>Attività Recente</CardTitle>
                    <CardDescription>Visualizza le tue attività recenti e interazioni</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-5">
                      <div className="border-b pb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">Obiettivo completato</h4>
                            <p className="text-sm text-gray-500">Hai raggiunto il tuo obiettivo di risparmio "Vacanza Estate"</p>
                          </div>
                          <span className="text-xs text-gray-500">2 giorni fa</span>
                        </div>
                      </div>
                      
                      <div className="border-b pb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">Nuovo livello</h4>
                            <p className="text-sm text-gray-500">Sei salito al Livello 2</p>
                          </div>
                          <span className="text-xs text-gray-500">5 giorni fa</span>
                        </div>
                      </div>
                      
                      <div className="border-b pb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">Prima simulazione budget</h4>
                            <p className="text-sm text-gray-500">Hai creato la tua prima simulazione di budget mensile</p>
                          </div>
                          <span className="text-xs text-gray-500">1 settimana fa</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">Account creato</h4>
                            <p className="text-sm text-gray-500">Benvenuto in ReMida AI!</p>
                          </div>
                          <span className="text-xs text-gray-500">2 settimane fa</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Impostazioni di Sicurezza</CardTitle>
                    <CardDescription>Gestisci le impostazioni di sicurezza del tuo account</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Password Attuale</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="new-password">Nuova Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Conferma Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="bg-remida-teal hover:bg-remida-teal/90">
                      <Settings className="mr-2 h-4 w-4" /> Aggiorna Password
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
