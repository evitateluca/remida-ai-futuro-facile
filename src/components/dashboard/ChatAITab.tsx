
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle } from 'lucide-react';

interface ChatAITabProps {
  chatMessages: { role: string, content: string }[];
  setChatMessages: (messages: { role: string, content: string }[]) => void;
  aiResponses: Record<string, string>;
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: () => void;
}

const ChatAITab = ({ 
  chatMessages, 
  setChatMessages, 
  aiResponses, 
  newMessage, 
  setNewMessage, 
  handleSendMessage 
}: ChatAITabProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageCircle className="mr-2 h-5 w-5" /> 
              Domande frequenti
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.keys(aiResponses).map((key, index) => (
                <Button 
                  key={index} 
                  variant="outline" 
                  className="w-full justify-start text-left h-auto py-2"
                  onClick={() => {
                    setNewMessage(key);
                    handleSendMessage();
                  }}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}?
                </Button>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <div className="text-sm text-gray-500">
              <p>Puoi chiedere informazioni su crypto, strategie di risparmio, obiettivi finanziari e molto altro!</p>
            </div>
          </CardFooter>
        </Card>
      </div>
      
      <div className="md:col-span-2">
        <Card className="h-full flex flex-col">
          <CardHeader>
            <CardTitle>ReMida AI Chat</CardTitle>
            <CardDescription>Il tuo assistente finanziario personale</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow overflow-y-auto max-h-[500px]">
            <div className="space-y-4">
              {chatMessages.map((message, index) => (
                <div 
                  key={index} 
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === 'user' 
                        ? 'bg-remida-teal text-white' 
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4 mt-auto">
            <div className="flex w-full gap-2">
              <Input 
                placeholder="Scrivi un messaggio..." 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
              />
              <Button 
                className="bg-remida-teal hover:bg-remida-teal/90"
                onClick={handleSendMessage}
              >
                Invia
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ChatAITab;
