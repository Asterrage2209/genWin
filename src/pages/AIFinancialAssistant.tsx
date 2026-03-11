import { useState, useRef, useEffect } from 'react';
import { Card } from '../components/ui/Card';

type Message = {
    id: string;
    text: string;
    sender: 'user' | 'ai';
};

const MOCK_AI_RESPONSE = "Based on the extracted financial statements, the company shows steady revenue growth over the last three years. However, operating expenses have increased significantly, which slightly reduced the overall profit margin. The system recommends reviewing operational costs and improving efficiency to maintain sustainable financial growth.";

export function AIFinancialAssistant() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: 'Hello! I am your AI Financial Assistant. How can I help you analyze your documents today?',
            sender: 'ai'
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;

        const newUserMessage: Message = {
            id: Date.now().toString(),
            text: inputValue,
            sender: 'user'
        };

        setMessages(prev => [...prev, newUserMessage]);
        setInputValue('');
        setIsTyping(true);

        // Simulate AI thinking delay
        setTimeout(() => {
            const newAiMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: MOCK_AI_RESPONSE,
                sender: 'ai'
            };
            setMessages(prev => [...prev, newAiMessage]);
            setIsTyping(false);
        }, 1500);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className="flex flex-col h-full max-h-[calc(100vh-3rem)]">
            <h2 className="text-2xl font-bold text-white mb-6 shrink-0">AI Financial Assistant</h2>

            <Card className="flex-1 flex flex-col min-h-0">
                {/* Chat Messages Area */}
                <div className="flex-1 overflow-y-auto pr-4 mb-4 space-y-6">
                    {messages.map((message) => (
                        <div 
                            key={message.id} 
                            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-[80%] rounded-2xl px-5 py-3 ${
                                message.sender === 'user' 
                                    ? 'bg-[#2A2F3A] text-[#E6E8EC]' 
                                    : 'bg-[#0B0F19] border border-[#2A2F3A] text-[#9CA3AF]'
                            }`}>
                                {message.sender === 'ai' && (
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-2 h-2 rounded-full bg-[#FF7A00]"></div>
                                        <span className="text-xs font-semibold text-[#FF7A00] uppercase tracking-wider">FinAI Assistant</span>
                                    </div>
                                )}
                                <p className="text-sm leading-relaxed">{message.text}</p>
                            </div>
                        </div>
                    ))}
                    
                    {isTyping && (
                        <div className="flex justify-start">
                           <div className="max-w-[80%] rounded-2xl px-5 py-4 bg-[#0B0F19] border border-[#2A2F3A]">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-2 h-2 rounded-full bg-[#FF7A00]"></div>
                                    <span className="text-xs font-semibold text-[#FF7A00] uppercase tracking-wider">FinAI Assistant</span>
                                </div>
                                <div className="flex gap-1.5 mt-1">
                                    <div className="w-2 h-2 bg-[#5C667B] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                    <div className="w-2 h-2 bg-[#5C667B] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                    <div className="w-2 h-2 bg-[#5C667B] rounded-full animate-bounce"></div>
                                </div>
                           </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="mt-auto shrink-0 border-t border-[#2A2F3A] pt-4">
                    <div className="flex items-end gap-3 bg-[#0B0F19] border border-[#2A2F3A] rounded-xl p-2 focus-within:border-[#FF7A00]/50 transition-colors">
                        <textarea 
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder="Ask about revenue trends, operational costs, or generated models..."
                            className="flex-1 bg-transparent border-none text-sm text-[#E6E8EC] placeholder-[#5C667B] resize-none focus:ring-0 py-2 px-3 max-h-32 min-h-[44px]"
                            rows={1}
                        />
                        <button 
                            onClick={handleSendMessage}
                            disabled={!inputValue.trim() || isTyping}
                            className="shrink-0 p-2.5 bg-[#FF7A00] hover:bg-[#FF9A3D] disabled:bg-[#2A2F3A] disabled:text-[#5C667B] text-white rounded-lg transition-colors flex items-center justify-center"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                        </button>
                    </div>
                    <div className="text-center mt-2">
                        <span className="text-[10px] text-[#5C667B]">AI responses are simulated for this demonstration.</span>
                    </div>
                </div>
            </Card>
        </div>
    );
}
