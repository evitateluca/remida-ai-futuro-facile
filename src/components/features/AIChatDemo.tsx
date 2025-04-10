
import { useState } from 'react';
import { SendHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const AIChatDemo = () => {
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'ai'; content: string }>>([
    { role: 'ai', content: 'Ciao! Sono ReMida AI, il tuo assistente finanziario personale. Come posso aiutarti oggi?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    // Add user message to chat
    setChatHistory([...chatHistory, { role: 'user', content: question }]);
    
    // Simulate AI thinking
    setIsLoading(true);
    setTimeout(() => {
      // Generate a response based on the question (simplified demo with hardcoded responses)
      let aiResponse = "Mi dispiace, non ho una risposta per questa domanda.";
      
      if (question.toLowerCase().includes('cena') || question.toLowerCase().includes('ristorante')) {
        aiResponse = "Se risparmi €10 oggi evitando la cena fuori, alla fine del mese avrai €50 in più da investire o per le tue spese future!";
      } else if (question.toLowerCase().includes('risparmiare') || question.toLowerCase().includes('risparmio')) {
        aiResponse = "Prova a mettere da parte il 20% delle tue entrate ogni mese. Con uno stipendio di €1500, sarebbero €300 al mese o €3600 all'anno!";
      } else if (question.toLowerCase().includes('investire') || question.toLowerCase().includes('investimento')) {
        aiResponse = "Investire €100 al mese per 10 anni con un rendimento medio del 5% ti darebbe circa €15,500, di cui €3,500 sono interessi guadagnati!";
      } else if (question.toLowerCase().includes('spesa')) {
        aiResponse = "Per risparmiare sulla spesa, prova a fare un menu settimanale e una lista della spesa. Questo può ridurre gli sprechi e far risparmiare fino al 15% sul budget alimentare!";
      } else if (question.toLowerCase().includes('auto') || question.toLowerCase().includes('macchina')) {
        aiResponse = "Una macchina nuova perde circa il 20% del suo valore nel primo anno. Considera l'acquisto di un'auto usata di 2-3 anni per massimizzare il valore!";
      } else if (question.toLowerCase().includes('budget') || question.toLowerCase().includes('bilancio')) {
        aiResponse = "La regola 50/30/20 suggerisce di destinare il 50% del reddito ai bisogni, 30% ai desideri e 20% al risparmio. Con uno stipendio di €2000, sarebbero €1000 per l'essenziale, €600 per svaghi e €400 per risparmi.";
      } else if (question.toLowerCase().includes('vacanza') || question.toLowerCase().includes('viaggio')) {
        aiResponse = "Pianificare una vacanza con 6-8 mesi di anticipo può farti risparmiare fino al 40% sui costi di viaggio e alloggio. Se metti da parte €50 a settimana, avrai €1200 in 6 mesi!";
      }
      
      // Add AI response to chat
      setChatHistory(prev => [...prev, { role: 'ai', content: aiResponse }]);
      setIsLoading(false);
      setQuestion('');
    }, 1000);
  };

  return (
    <div className="feature-card h-full flex flex-col">
      <h3 className="text-xl font-semibold mb-4 text-remida-teal">Chat con ReMida AI</h3>
      
      <div className="flex-grow bg-gray-50 rounded-lg p-4 mb-4 overflow-y-auto h-80">
        {chatHistory.map((message, index) => (
          <div 
            key={index} 
            className={`mb-3 ${message.role === 'user' ? 'text-right' : ''}`}
          >
            <div 
              className={`
                inline-block px-4 py-2 rounded-lg max-w-[80%] 
                ${message.role === 'user' 
                  ? 'bg-remida-teal text-white rounded-tr-none' 
                  : 'bg-gray-200 text-gray-800 rounded-tl-none'}
              `}
            >
              {message.content}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex items-center space-x-2 text-gray-500">
            <div className="h-2.5 w-2.5 bg-gray-400 rounded-full animate-pulse"></div>
            <div className="h-2.5 w-2.5 bg-gray-400 rounded-full animate-pulse delay-150"></div>
            <div className="h-2.5 w-2.5 bg-gray-400 rounded-full animate-pulse delay-300"></div>
          </div>
        )}
      </div>
      
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
          <SendHorizontal size={18} />
        </Button>
      </form>
    </div>
  );
};

export default AIChatDemo;
