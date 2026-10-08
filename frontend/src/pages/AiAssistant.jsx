import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, AlertCircle, Loader2 } from 'lucide-react';
import { Card } from '../components/common/Card.jsx';
import { Button } from '../components/common/Button.jsx';
import api from '../services/api.js';

const AiAssistant = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I am your CodeForge AI Learning Assistant. How can I help you today? I can provide concept explanations, debugging guidance, programming hints, or study recommendations.'
    }
  ]);
  const [input, setInput] = useState('');
  const [type, setType] = useState('general');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setError(null);
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const res = await api.post('/ai/ask', {
        message: userMessage,
        type: type
      });
      
      const reply = res.data?.data?.reply;
      if (reply) {
         setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
      } else {
         throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error('AI Request Error:', err);
      // The backend will throw a 503 if the API key is not configured or unavailable
      let errorMsg = 'The AI Service is currently unavailable. Please try again later.';
      if (err.data && err.data.message) {
         errorMsg = err.data.message;
      } else if (err.message) {
         errorMsg = err.message;
      }
      
      setError(errorMsg);
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm sorry, I'm having trouble connecting to my brain right now. " + errorMsg }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 animate-fade-in h-[calc(100vh-80px)] flex flex-col space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-violet-500/20 rounded-lg shadow-[0_0_15px_rgba(139,92,246,0.3)]">
          <Bot className="w-8 h-8 text-violet-500" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-100">AI Learning Assistant</h1>
          <p className="text-slate-400 mt-1">Get personalized hints, explanations, and debugging help.</p>
        </div>
      </div>

      <Card className="flex-1 flex flex-col border-slate-700/50 bg-slate-900/40 backdrop-blur-sm overflow-hidden">
        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mt-1 ${
                  msg.role === 'user' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-violet-500/20 text-violet-400'
                }`}>
                  {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`p-4 rounded-2xl ${
                  msg.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-sm shadow-md' 
                    : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-sm shadow-sm'
                }`}>
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</div>
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start animate-fade-in">
              <div className="flex gap-3 max-w-[85%]">
                 <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mt-1 bg-violet-500/20 text-violet-400">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700 rounded-tl-sm flex items-center gap-2 text-slate-400">
                  <Loader2 className="w-4 h-4 animate-spin text-violet-500" />
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {error && (
          <div className="px-6 py-3 bg-rose-500/10 border-t border-rose-500/20 flex items-center gap-3 animate-fade-in">
             <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />
             <p className="text-sm text-rose-400 font-medium">{error}</p>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 bg-slate-800/80 border-t border-slate-700/50 backdrop-blur-md">
          <form onSubmit={handleSend} className="flex gap-3">
            <div className="flex-shrink-0">
               <select 
                 value={type}
                 onChange={(e) => setType(e.target.value)}
                 className="h-12 bg-slate-900 border border-slate-700 text-slate-300 rounded-xl px-3 outline-none focus:border-violet-500 text-sm transition-colors cursor-pointer hover:bg-slate-800"
               >
                 <option value="general">General</option>
                 <option value="concept">Explain Concept</option>
                 <option value="hint">Get a Hint</option>
                 <option value="debug">Debug Code</option>
                 <option value="recommendation">Study Advice</option>
               </select>
            </div>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask for an explanation, a hint, or paste an error..."
              disabled={isLoading}
              className="flex-1 bg-slate-900 border border-slate-700 text-slate-200 rounded-xl px-4 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 disabled:opacity-50 transition-all placeholder:text-slate-600"
            />
            <Button 
              type="submit" 
              variant="primary" 
              disabled={isLoading || !input.trim()}
              className="h-12 px-6 bg-violet-600 hover:bg-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all"
            >
              <Send className="w-5 h-5" />
            </Button>
          </form>
          <div className="mt-3 text-center">
            <p className="text-xs text-slate-500">AI can make mistakes. Verify important programming concepts.</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AiAssistant;
