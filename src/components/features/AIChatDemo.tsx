
import { useState } from 'react';
import { SendHorizontal, Loader2, User, Bot, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

// Tipologie di domande che l'utente può porre
type QuestionCategory = 'budget' | 'risparmio' | 'investimento' | 'spesa' | 'trasporti' | 'casa' | 'vacanza' | 'crypto' | 'general';

// Interfaccia per rappresentare i messaggi della chat
interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const AIChatDemo = () => {
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    { 
      id: '1',
      role: 'ai', 
      content: 'Ciao! Sono ReMida AI, il tuo assistente finanziario personale. Come posso aiutarti oggi? Puoi chiedermi consigli su risparmio, investimenti, budget o decisioni di spesa quotidiane.',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState([
    'Come posso risparmiare per una vacanza?',
    'Dovrei mangiare fuori stasera?',
    'Conviene comprare o affittare casa?',
    'Come creare un fondo di emergenza?'
  ]);

  // Funzione per determinare la categoria della domanda
  const categorizeQuestion = (question: string): QuestionCategory => {
    const lowerCaseQuestion = question.toLowerCase();
    
    if (lowerCaseQuestion.includes('budget') || lowerCaseQuestion.includes('bilancio') || 
        lowerCaseQuestion.includes('entrate') || lowerCaseQuestion.includes('uscite')) {
      return 'budget';
    } else if (lowerCaseQuestion.includes('risparmio') || lowerCaseQuestion.includes('risparmiare') || 
               lowerCaseQuestion.includes('accumulare')) {
      return 'risparmio';
    } else if (lowerCaseQuestion.includes('investimento') || lowerCaseQuestion.includes('investire') || 
               lowerCaseQuestion.includes('rendimento')) {
      return 'investimento';
    } else if (lowerCaseQuestion.includes('spesa') || lowerCaseQuestion.includes('comprare') || 
               lowerCaseQuestion.includes('acquistare') || lowerCaseQuestion.includes('costo')) {
      return 'spesa';
    } else if (lowerCaseQuestion.includes('auto') || lowerCaseQuestion.includes('macchina') || 
               lowerCaseQuestion.includes('trasporto') || lowerCaseQuestion.includes('benzina')) {
      return 'trasporti';
    } else if (lowerCaseQuestion.includes('casa') || lowerCaseQuestion.includes('affitto') || 
               lowerCaseQuestion.includes('mutuo') || lowerCaseQuestion.includes('appartamento')) {
      return 'casa';
    } else if (lowerCaseQuestion.includes('vacanza') || lowerCaseQuestion.includes('viaggio') || 
               lowerCaseQuestion.includes('ferie') || lowerCaseQuestion.includes('weekend')) {
      return 'vacanza';
    } else if (lowerCaseQuestion.includes('crypto') || lowerCaseQuestion.includes('bitcoin') || 
               lowerCaseQuestion.includes('criptovalute') || lowerCaseQuestion.includes('blockchain')) {
      return 'crypto';
    } else {
      return 'general';
    }
  };

  // Risposte predefinite basate sulla categoria
  const getResponseByCategory = (category: QuestionCategory): string => {
    switch (category) {
      case 'budget':
        return "Per gestire efficacemente il tuo budget, ti consiglio di seguire la regola 50/30/20: destina il 50% del reddito alle necessità, il 30% ai desideri e il 20% al risparmio. Con uno stipendio di €2000, sarebbero €1000 per l'essenziale, €600 per svaghi e €400 per risparmi o investimenti.";
      case 'risparmio':
        return "Ti consiglio di automatizzare i risparmi: imposta un trasferimento automatico di almeno il 10-20% del tuo stipendio verso un conto di risparmio appena ricevi lo stipendio. Se risparmi €300 al mese per un anno, accumulerai €3.600, che possono crescere ulteriormente se investiti.";
      case 'investimento':
        return "Per iniziare a investire, considera un portafoglio diversificato di ETF a basso costo. Investendo €100 al mese per 10 anni con un rendimento medio del 5%, potresti accumulare circa €15.500, di cui €3.500 sarebbero rendimenti. Ricorda che ogni investimento comporta rischi.";
      case 'spesa':
        return "Pianificare gli acquisti può farti risparmiare significativamente. Preparando un menu settimanale e una lista della spesa prima di andare al supermercato, puoi ridurre gli sprechi e risparmiare fino al 15% sul budget alimentare. Per una famiglia media, questo può significare €100-150 in meno al mese.";
      case 'trasporti':
        return "Un'auto nuova perde circa il 20-30% del suo valore nei primi 2-3 anni. Se stai considerando l'acquisto di un'auto, valuta un veicolo usato di 2-3 anni per massimizzare il valore. Inoltre, confronta i costi totali di possesso (carburante, assicurazione, manutenzione) che possono ammontare a €3.000-5.000 all'anno.";
      case 'casa':
        return "La regola generale suggerisce di non spendere più del 30% del reddito lordo per l'affitto o il mutuo. Con uno stipendio di €2.000, il tuo budget abitativo ideale sarebbe di circa €600. Per il mutuo, considera che i tassi attualmente variano tra il 2-4%, il che influenza significativamente il costo totale nel lungo termine.";
      case 'vacanza':
        return "Pianificare una vacanza con 6-8 mesi di anticipo può farti risparmiare fino al 40% sui costi di viaggio e alloggio. Se metti da parte €50 a settimana, in 6 mesi avrai €1.200 per il tuo viaggio. Inoltre, considera le opzioni di alloggio alternative come Airbnb o lo scambio di case che possono ridurre i costi fino al 50%.";
      case 'crypto':
        return "Le criptovalute sono un investimento ad alto rischio e alta volatilità. Se sei interessato, considera di allocare solo una piccola percentuale del tuo portafoglio (5-10% massimo) e preferibilmente in asset più consolidati come Bitcoin o Ethereum. Ricorda che potresti perdere l'intero investimento, quindi investi solo ciò che sei disposto a perdere.";
      default:
        return "Per prendere decisioni finanziarie informate, considera sempre il tuo quadro finanziario completo: reddito, spese fisse, risparmi e obiettivi a lungo termine. Ti consiglio di tenere un fondo di emergenza pari a 3-6 mesi di spese e di rivedere regolarmente il tuo budget. Posso aiutarti con una domanda più specifica?";
    }
  };

  // Gestione dell'invio della domanda
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    // Genera un ID unico per il messaggio
    const userMessageId = `user-${Date.now()}`;
    
    // Aggiungi il messaggio dell'utente alla chat
    const userMessage: ChatMessage = {
      id: userMessageId,
      role: 'user',
      content: question,
      timestamp: new Date()
    };
    
    setChatHistory(prev => [...prev, userMessage]);
    
    // Simula l'elaborazione dell'AI
    setIsLoading(true);
    setTimeout(() => {
      // Categorizza la domanda e ottieni una risposta appropriata
      const category = categorizeQuestion(question);
      const aiResponse = getResponseByCategory(category);
      
      // Genera un ID unico per la risposta dell'AI
      const aiMessageId = `ai-${Date.now()}`;
      
      // Aggiungi la risposta dell'AI alla chat
      const aiMessage: ChatMessage = {
        id: aiMessageId,
        role: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };
      
      setChatHistory(prev => [...prev, aiMessage]);
      setIsLoading(false);
      setQuestion('');
      
      // Aggiorna le domande suggerite in base alla categoria
      updateSuggestedQuestions(category);
    }, 1000);
  };

  // Aggiorna le domande suggerite in base alla categoria della domanda precedente
  const updateSuggestedQuestions = (category: QuestionCategory) => {
    switch (category) {
      case 'budget':
        setSuggestedQuestions([
          'Come posso ridurre le spese mensili?',
          'Quali app consigli per gestire il budget?',
          'Come dividere le spese in famiglia?'
        ]);
        break;
      case 'risparmio':
        setSuggestedQuestions([
          'Quanto dovrei risparmiare ogni mese?',
          'Come creare un fondo di emergenza?',
          'Quali sono i migliori conti di risparmio?'
        ]);
        break;
      case 'investimento':
        setSuggestedQuestions([
          'Come iniziare a investire con poco capitale?',
          'Quali sono i rischi degli ETF?',
          'Dovrei investire in azioni o obbligazioni?'
        ]);
        break;
      case 'casa':
        setSuggestedQuestions([
          'È meglio comprare o affittare casa?',
          'Come risparmiare per l\'anticipo del mutuo?',
          'Quanto posso permettermi di spendere per la casa?'
        ]);
        break;
      default:
        setSuggestedQuestions([
          'Come posso risparmiare per una vacanza?',
          'Quanto dovrei mettere da parte per la pensione?',
          'Conviene comprare o affittare casa?',
          'Come gestire spese impreviste?'
        ]);
    }
  };

  // Gestione del feedback dell'utente
  const handleFeedback = (messageId: string, isPositive: boolean) => {
    toast({
      title: isPositive ? "Grazie per il feedback positivo!" : "Ci dispiace che la risposta non ti sia stata utile",
      description: isPositive 
        ? "Siamo felici che la risposta ti sia stata utile." 
        : "Useremo questo feedback per migliorare le nostre risposte.",
      duration: 3000,
    });
  };

  // Gestione dell'uso di una domanda suggerita
  const handleSuggestedQuestion = (q: string) => {
    setQuestion(q);
    // Opzionale: invia automaticamente la domanda
    // setTimeout(() => {
    //   handleSubmit(new Event('submit') as unknown as React.FormEvent);
    // }, 100);
  };

  return (
    <div className="feature-card h-full flex flex-col">
      <h3 className="text-xl font-semibold mb-4 text-remida-teal">Chat con ReMida AI</h3>
      
      <div className="flex-grow bg-gray-50 rounded-lg p-4 mb-4 overflow-y-auto h-80 relative">
        {chatHistory.map((message) => (
          <div 
            key={message.id} 
            className={`mb-3 ${message.role === 'user' ? 'text-right' : ''}`}
          >
            <div 
              className={`
                inline-block px-4 py-2 rounded-lg max-w-[85%] 
                ${message.role === 'user' 
                  ? 'bg-remida-teal text-white rounded-tr-none' 
                  : 'bg-gray-200 text-gray-800 rounded-tl-none'}
              `}
            >
              <div className="flex items-center gap-2 mb-1">
                {message.role === 'ai' ? (
                  <Bot className="h-4 w-4 text-remida-teal" />
                ) : (
                  <User className="h-4 w-4" />
                )}
                <span className="text-xs opacity-70">
                  {message.role === 'ai' ? 'ReMida AI' : 'Tu'} • {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
              </div>
              <div className="text-sm">{message.content}</div>
              
              {/* Feedback buttons - only show for AI messages */}
              {message.role === 'ai' && (
                <div className="flex justify-end gap-2 mt-2">
                  <button 
                    onClick={() => handleFeedback(message.id, true)}
                    className="text-gray-500 hover:text-remida-teal"
                    aria-label="Feedback positivo"
                  >
                    <ThumbsUp className="h-3.5 w-3.5" />
                  </button>
                  <button 
                    onClick={() => handleFeedback(message.id, false)}
                    className="text-gray-500 hover:text-remida-orange"
                    aria-label="Feedback negativo"
                  >
                    <ThumbsDown className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex items-center space-x-2 text-gray-500">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">ReMida AI sta elaborando una risposta...</span>
          </div>
        )}
      </div>
      
      {/* Suggested questions */}
      {suggestedQuestions.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {suggestedQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSuggestedQuestion(q)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs py-1 px-2 rounded-full transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <Input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Chiedi qualcosa a ReMida AI..."
          className="flex-grow"
          disabled={isLoading}
        />
        <Button 
          type="submit" 
          className="bg-remida-teal hover:bg-remida-teal/90"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <SendHorizontal size={18} />
          )}
        </Button>
      </form>
    </div>
  );
};

export default AIChatDemo;
