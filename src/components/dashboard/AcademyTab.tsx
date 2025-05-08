
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Book, GraduationCap, BookOpen, Award, ChevronRight, Lightbulb } from 'lucide-react';

const AcademyTab = () => {
  const [activeTab, setActiveTab] = useState('courses');
  
  // Course data
  const courses = [
    {
      id: 1,
      title: "Fondamenti di Finanza Personale",
      description: "Impara i principi base per gestire efficacemente il tuo denaro e costruire solide fondamenta finanziarie.",
      image: "/placeholder.svg",
      progress: 75,
      level: "Principiante",
      duration: "3 ore",
      modules: 5,
      completed: 4
    },
    {
      id: 2,
      title: "Introduzione a Bitcoin e Crypto",
      description: "Scopri come funziona Bitcoin e il mondo delle criptovalute in modo semplice e chiaro.",
      image: "/placeholder.svg",
      progress: 30,
      level: "Principiante",
      duration: "4 ore",
      modules: 8,
      completed: 2
    },
    {
      id: 3,
      title: "Stablecoin e DeFi",
      description: "Esplora il mondo della finanza decentralizzata e come utilizzare le stablecoin per generare rendimenti.",
      image: "/placeholder.svg",
      progress: 0,
      level: "Intermedio",
      duration: "5 ore",
      modules: 10,
      completed: 0
    },
    {
      id: 4,
      title: "Strategie di Investimento Crypto",
      description: "Tecniche avanzate di investimento in crypto assets, diversificazione e gestione del rischio.",
      image: "/placeholder.svg",
      progress: 10,
      level: "Avanzato",
      duration: "6 ore",
      modules: 12,
      completed: 1
    }
  ];
  
  // Resources data
  const resources = [
    {
      category: "Articoli",
      items: [
        {
          title: "Come Costruire un Fondo di Emergenza",
          type: "Finanza Personale",
          date: "25 Apr 2025",
          readTime: "5 min"
        },
        {
          title: "Le 5 Migliori Piattaforme di Staking Crypto",
          type: "Crypto",
          date: "18 Apr 2025",
          readTime: "8 min"
        },
        {
          title: "Differenze tra USDT, USDC e altre Stablecoin",
          type: "Crypto",
          date: "10 Apr 2025",
          readTime: "6 min"
        }
      ]
    },
    {
      category: "Video",
      items: [
        {
          title: "Come Iniziare con DCA su Bitcoin",
          type: "Tutorial",
          date: "22 Apr 2025",
          duration: "12:45"
        },
        {
          title: "Guida alla Tassazione delle Crypto in Italia",
          type: "Webinar",
          date: "15 Apr 2025",
          duration: "45:30"
        }
      ]
    },
    {
      category: "Strumenti",
      items: [
        {
          title: "Calcolatore Rendimento Composto",
          type: "Tool",
          description: "Calcola quanto crescono i tuoi investimenti nel tempo"
        },
        {
          title: "Modello Excel Tracciamento Portfolio",
          type: "Template",
          description: "Tieni traccia di tutte le tue crypto asset con questo foglio di calcolo"
        }
      ]
    }
  ];
  
  // Certification data
  const certifications = [
    {
      id: 1,
      title: "Fondamenti di Finanza Personale",
      status: "Completa certificazione",
      progress: 75,
      requirements: "Completa tutti i moduli e supera l'esame finale con almeno l'80%"
    },
    {
      id: 2,
      title: "Crypto Investor Livello 1",
      status: "Completa i moduli",
      progress: 30,
      requirements: "Completa il corso 'Introduzione a Bitcoin' e supera l'esame"
    }
  ];
  
  return (
    <div className="space-y-6">
      {/* Academy Header */}
      <div className="bg-gradient-to-r from-remida-teal to-remida-teal/70 text-white p-6 rounded-lg">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">ReMida Academy</h2>
            <p className="mb-4">La tua piattaforma di educazione finanziaria e crypto personalizzata</p>
            <div className="flex space-x-2">
              <Badge variant="outline" className="bg-white/20 text-white border-white/50">
                2 corsi in progresso
              </Badge>
              <Badge variant="outline" className="bg-white/20 text-white border-white/50">
                35 punti XP questa settimana
              </Badge>
            </div>
          </div>
          <div className="bg-white rounded-full p-3 hidden sm:block">
            <GraduationCap size={36} className="text-remida-teal" />
          </div>
        </div>
      </div>
      
      {/* Academy Content */}
      <Tabs defaultValue="courses" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="courses">
            <BookOpen className="mr-2 h-4 w-4" />
            Corsi
          </TabsTrigger>
          <TabsTrigger value="resources">
            <Book className="mr-2 h-4 w-4" />
            Risorse
          </TabsTrigger>
          <TabsTrigger value="certifications">
            <Award className="mr-2 h-4 w-4" />
            Certificazioni
          </TabsTrigger>
        </TabsList>
        
        {/* Courses Tab */}
        <TabsContent value="courses">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <div className="h-40 bg-gray-200">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <Badge>{course.level}</Badge>
                  </div>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-500 mb-1">
                      <span>{course.completed} di {course.modules} moduli completati</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center text-gray-500">
                      <BookOpen className="h-4 w-4 mr-1" /> {course.modules} moduli
                    </span>
                    <span className="flex items-center text-gray-500">
                      <i className="h-4 w-4 mr-1" /> {course.duration}
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-remida-teal hover:bg-remida-teal/90">
                    {course.progress > 0 ? "Continua" : "Inizia"} Corso
                  </Button>
                </CardFooter>
              </Card>
            ))}
            
            {/* Upcoming Courses */}
            <Card className="border-dashed border-2 border-gray-300 flex flex-col items-center justify-center p-6 text-center">
              <Lightbulb className="h-12 w-12 text-gray-400 mb-3" />
              <h3 className="text-lg font-medium mb-2">Altri corsi in arrivo</h3>
              <p className="text-gray-500 mb-4">Stiamo preparando nuovi corsi per ampliare la tua conoscenza</p>
              <Button variant="outline">Suggerisci un argomento</Button>
            </Card>
          </div>
        </TabsContent>
        
        {/* Resources Tab */}
        <TabsContent value="resources">
          <div className="space-y-6">
            {resources.map((section, idx) => (
              <div key={idx}>
                <h3 className="text-lg font-medium mb-3 flex items-center">
                  {section.category === "Articoli" && <Book className="mr-2 h-5 w-5" />}
                  {section.category === "Video" && <i className="mr-2 h-5 w-5" />}
                  {section.category === "Strumenti" && <i className="mr-2 h-5 w-5" />}
                  {section.category}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {section.items.map((item, i) => (
                    <Card key={i} className="hover:bg-gray-50 transition-colors">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-base">{item.title}</CardTitle>
                          <Badge variant="outline">{item.type}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-500">
                          {item.description || ''}
                          {item.readTime && `Tempo di lettura: ${item.readTime}`}
                          {item.duration && `Durata: ${item.duration}`}
                        </p>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <span className="text-sm text-gray-500">{item.date || ''}</span>
                        <Button variant="ghost" size="sm" className="text-remida-teal">
                          Apri <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                
                {idx < resources.length - 1 && <div className="border-t my-6" />}
              </div>
            ))}
            
            <div className="text-center mt-6 pt-4">
              <Button variant="outline" className="text-remida-teal">
                Mostra tutte le risorse <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </TabsContent>
        
        {/* Certifications Tab */}
        <TabsContent value="certifications">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((cert) => (
              <Card key={cert.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{cert.title}</CardTitle>
                      <CardDescription>Certificazione ReMida Academy</CardDescription>
                    </div>
                    <Award className="h-10 w-10 text-remida-orange" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-500 mb-1">
                      <span>{cert.status}</span>
                      <span>{cert.progress}%</span>
                    </div>
                    <Progress value={cert.progress} className="h-2" />
                  </div>
                  <div className="p-3 bg-gray-50 rounded-md text-sm">
                    <p className="font-medium mb-1">Requisiti:</p>
                    <p className="text-gray-600">{cert.requirements}</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-remida-teal hover:bg-remida-teal/90">
                    Continua Percorso
                  </Button>
                </CardFooter>
              </Card>
            ))}
            
            <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-100">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>ReMida Certified Advisor</CardTitle>
                    <CardDescription>Certificazione di eccellenza</CardDescription>
                  </div>
                  <div className="bg-gradient-to-r from-orange-300 to-yellow-300 rounded-full p-2">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Diventa un consulente finanziario certificato ReMida completando tutti i corsi principali e superando l'esame finale.
                </p>
                <div className="p-3 bg-white/70 rounded-md text-sm">
                  <p className="font-medium mb-1">Sblocca l'accesso:</p>
                  <p className="text-gray-600">Completa almeno 2 certificazioni e accumula 500 punti XP</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline">
                  Scopri di più
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AcademyTab;
