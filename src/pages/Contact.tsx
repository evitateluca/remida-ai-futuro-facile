
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MapPin, Phone, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      
      toast({
        title: "Messaggio inviato!",
        description: "Ti risponderemo al più presto.",
        duration: 5000,
      });
    }, 1500);
  };
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-remida-teal text-white py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contattaci</h1>
            <p className="text-xl">
              Hai domande, suggerimenti o vuoi saperne di più su ReMida AI? Siamo qui per aiutarti.
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Form Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h2 className="text-2xl font-semibold mb-6 text-remida-teal">Inviaci un Messaggio</h2>
              
              {submitted ? (
                <div className="text-center p-8">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Messaggio Inviato!</h3>
                  <p className="text-gray-600">
                    Grazie per averci contattato. Ti risponderemo al più presto possibile.
                  </p>
                  <Button 
                    className="mt-6 bg-remida-teal hover:bg-remida-teal/90"
                    onClick={() => setSubmitted(false)}
                  >
                    Invia un altro messaggio
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Nome</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Il tuo nome"
                      required
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="La tua email"
                      required
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Messaggio</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Come possiamo aiutarti?"
                      required
                      className="mt-1 min-h-[150px]"
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    className="w-full bg-remida-orange hover:bg-remida-orange/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Invio in corso...' : 'Invia Messaggio'}
                  </Button>
                </form>
              )}
            </div>
            
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold mb-6 text-remida-teal">Informazioni di Contatto</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-remida-teal/20 flex items-center justify-center shrink-0">
                      <Mail className="h-5 w-5 text-remida-teal" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-gray-600">info@remida-ai.it</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-remida-teal/20 flex items-center justify-center shrink-0">
                      <Phone className="h-5 w-5 text-remida-teal" />
                    </div>
                    <div>
                      <p className="font-medium">Telefono</p>
                      <p className="text-gray-600">+39 02 1234567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-remida-teal/20 flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5 text-remida-teal" />
                    </div>
                    <div>
                      <p className="font-medium">Sede</p>
                      <p className="text-gray-600">
                        Via dell'Innovazione, 123<br />
                        20100 Milano, Italia
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold mb-6 text-remida-teal">Domande Frequenti</h2>
                
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-medium mb-1">ReMida AI è gratuito?</p>
                    <p className="text-gray-600">
                      Offriamo un piano base gratuito con funzionalità essenziali. Per accedere a tutte le funzionalità premium,
                      è disponibile un abbonamento a pagamento.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-medium mb-1">Come gestite i miei dati personali?</p>
                    <p className="text-gray-600">
                      La tua privacy è la nostra priorità. I tuoi dati sono crittografati e non vengono mai condivisi con terze parti.
                      Li utilizziamo solo per personalizzare i tuoi consigli finanziari.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-medium mb-1">Posso parlare con un consulente umano?</p>
                    <p className="text-gray-600">
                      Sì, gli utenti premium possono prenotare consultazioni con i nostri esperti finanziari. Inviaci un messaggio
                      per maggiori dettagli.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
