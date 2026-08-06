"use client";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Send, Bot, User, Trash2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import api from "@/lib/api";

interface Message {
  role: "user" | "model";
  content: string;
}

const initialMessage = "Hello. I am RASMUS AI.\n\nYour intelligent mobility co-pilot.";

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      content: initialMessage,
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    
    // Add user message to UI immediately
    const newHistory = [...messages, { role: "user" as const, content: userMessage }];
    setMessages(newHistory);
    setIsLoading(true);

    try {
      // Send chat history (excluding the new user message, which we send explicitly)
      const apiHistory = messages
        .filter((_, index) => index > 0)
        .map(m => ({ role: m.role, content: m.content }));
      
      const { data } = await api.post<{ success: boolean; data: { reply: string } }>("/assistant/chat", {
        message: userMessage,
        history: apiHistory,
      });

      setMessages([...newHistory, { role: "model", content: data.data.reply }]);
    } catch (error: any) {
      console.error("Chat error:", error);
      const errorMsg = error.response?.data?.message || error.message || "Unknown error";
      setMessages([
        ...newHistory,
        {
          role: "model",
          content: `⚠️ I encountered an error connecting to my AI core. Please check the API key configuration on the server or try again later.\n\n**Debug Details:** ${errorMsg}`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        role: "model",
        content: initialMessage,
      }
    ]);
  };

  return (
    <div className="flex flex-col h-full bg-card/80 backdrop-blur-md rounded-xl border border-border/50 shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border/50 bg-muted/10">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-background shadow-md border border-border/50">
            <Image src="/logo.png" alt="RASMUS" width={32} height={32} className="object-contain mix-blend-screen" />
          </div>
          <div>
            <h3 className="font-semibold leading-none font-heading text-lg text-primary">RASMUS AI</h3>
            <p className="text-xs text-muted-foreground mt-1 tracking-wide uppercase font-mono">Powered by MOIRA Core</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={handleClear} className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors">
          <Trash2 className="h-4 w-4 mr-2" />
          Clear Chat
        </Button>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-4 max-w-[85%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : ""}`}>
            {/* Avatar */}
            <div className={`shrink-0 flex h-10 w-10 items-center justify-center rounded-full shadow-sm mt-1 border border-border/50
              ${msg.role === "user" ? "bg-primary/20 text-primary border-none" : "bg-background"}
            `}>
              {msg.role === "user" ? <User className="h-5 w-5" /> : <Image src="/logo.png" alt="RASMUS" width={24} height={24} className="object-contain mix-blend-screen" />}
            </div>

            {/* Bubble */}
            <div className={`px-5 py-3.5 rounded-2xl shadow-sm ${
              msg.role === "user" 
                ? "bg-primary text-primary-foreground rounded-tr-sm" 
                : "bg-muted/50 border border-border/50 text-foreground rounded-tl-sm backdrop-blur-sm"
            }`}>
              {msg.role === "user" ? (
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              ) : (
                <div className="prose prose-sm prose-invert max-w-none 
                  prose-p:leading-relaxed prose-p:mb-2 prose-p:last:mb-0
                  prose-strong:text-primary prose-strong:font-semibold
                  prose-ul:my-2 prose-li:my-0.5
                ">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-4 max-w-[85%]">
            <div className="shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-background border border-border/50 shadow-sm mt-1">
              <Image src="/logo.png" alt="RASMUS" width={24} height={24} className="object-contain animate-pulse mix-blend-screen" />
            </div>
            <div className="px-5 py-4 rounded-2xl rounded-tl-sm bg-muted/50 border border-border/50 backdrop-blur-sm flex items-center gap-2 shadow-sm">
              <div className="h-2 w-2 bg-primary rounded-full animate-pulse_glow"></div>
              <div className="h-2 w-2 bg-primary rounded-full animate-pulse_glow [animation-delay:0.2s]"></div>
              <div className="h-2 w-2 bg-primary rounded-full animate-pulse_glow [animation-delay:0.4s]"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-muted/10 border-t border-border/50 backdrop-blur-md">
        <form onSubmit={handleSend} className="relative flex items-center">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask RASMUS about routing, predictive maintenance, or fleet metrics..."
            className="pr-12 h-12 bg-background/50 border-border/50 shadow-inner rounded-xl focus-visible:ring-primary/50"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={!input.trim() || isLoading}
            className="absolute right-1.5 h-9 w-9 rounded-lg bg-primary hover:bg-primary/90 transition-transform active:scale-95 disabled:opacity-50 shadow-md"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
        <p className="text-[10px] text-center text-muted-foreground mt-3 uppercase tracking-wider font-mono">
          RASMUS AI generated content may be inaccurate. Verify critical operations.
        </p>
      </div>
    </div>
  );
}
