import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle, X, Send, Coffee } from "lucide-react";
import API from "../api/api";

const QUICK_REPLIES = ["Menu & prices", "Hours", "Locations", "Rewards", "Contact us"];

const LOCATIONS_INFO = [
    { name: "Downtown", address: "123 Main St, Berlin", hours: "Mon–Sun · 7am–9pm" },
    { name: "Riverside", address: "456 River Rd, Berlin", hours: "Mon–Sun · 8am–8pm" },
    { name: "Uptown", address: "789 Uptown Ave, Berlin", hours: "Mon–Fri 6am–10pm · Sat–Sun 7am–10pm" },
];

function buildResponse(rawText, menuItems, navigate) {
    const text = rawText.toLowerCase();

    // A specific menu item mentioned by name
    const matchedItem = menuItems.find((item) => text.includes(item.name.toLowerCase()));
    if (matchedItem) {
        return {
            text: `${matchedItem.name} is $${Number(matchedItem.price).toFixed(2)} — ${matchedItem.description}`,
            action: { label: "View full menu", to: "/menu" },
        };
    }

    if (/\b(hour|open|close|time)\b/.test(text)) {
        return {
            text: "Our cafés are generally open 7am–9pm, seven days a week (hours vary slightly by location).",
            action: { label: "See all locations & hours", to: "/locations" },
        };
    }

    if (/\b(location|where|address|find|near)\b/.test(text)) {
        const list = LOCATIONS_INFO.map((l) => `• ${l.name} — ${l.address}`).join("\n");
        return {
            text: `We have three cafés:\n${list}`,
            action: { label: "View on the locations page", to: "/locations" },
        };
    }

    if (/\b(menu|price|cost|how much|coffee|latte|espresso)\b/.test(text)) {
        if (menuItems.length > 0) {
            const sample = menuItems.slice(0, 4).map((i) => `• ${i.name} — $${Number(i.price).toFixed(2)}`).join("\n");
            return {
                text: `A few favorites:\n${sample}`,
                action: { label: "Browse the full menu", to: "/menu" },
            };
        }
        return { text: "You can browse our full menu with prices and photos.", action: { label: "Browse the menu", to: "/menu" } };
    }

    if (/\b(order|buy|purchase|cart|checkout)\b/.test(text)) {
        return { text: "You can order online any time — add items to your cart from the menu and check out in a couple taps.", action: { label: "Start an order", to: "/menu" } };
    }

    if (/\b(reward|points|loyalty|member)\b/.test(text)) {
        return { text: "Coffee House Rewards is free to join — earn stars on every order and redeem them for free drinks.", action: { label: "See rewards", to: "/rewards" } };
    }

    if (/\b(contact|human|agent|support|call|email|phone)\b/.test(text)) {
        return { text: "Happy to connect you with our team — you can reach us by phone, email, or the contact form.", action: { label: "Go to contact page", to: "/contact" } };
    }

    if (/\b(hi|hello|hey|sup)\b/.test(text)) {
        return { text: "Hey there! I can help with our menu, hours, locations, rewards, or ordering. What do you need?" };
    }

    if (/\b(thank|thanks|thx)\b/.test(text)) {
        return { text: "Anytime! Let me know if there's anything else." };
    }

    return {
        text: "I'm not sure about that one — but I can help with our menu, prices, hours, locations, rewards, or ordering. You can also reach our team directly.",
        action: { label: "Contact our team", to: "/contact" },
    };
}

export default function ChatWidget() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        { from: "bot", text: "Hi! I'm the Coffee House assistant. Ask me about our menu, hours, locations, or rewards." },
    ]);
    const [input, setInput] = useState("");
    const [menuItems, setMenuItems] = useState([]);
    const scrollRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        API.get("/menu").then((res) => setMenuItems(res.data)).catch(() => setMenuItems([]));
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, open]);

    const respond = (userText) => {
        setMessages((prev) => [...prev, { from: "user", text: userText }]);

        setTimeout(() => {
            const reply = buildResponse(userText, menuItems, navigate);
            setMessages((prev) => [...prev, { from: "bot", ...reply }]);
        }, 500);
    };

    const handleSend = () => {
        const trimmed = input.trim();
        if (!trimmed) return;
        respond(trimmed);
        setInput("");
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {open && (
                <div className="mb-3 w-[340px] max-w-[90vw] h-[460px] bg-paper rounded-2xl shadow-lift border border-coffee/10 flex flex-col overflow-hidden">
                    {/* Header */}
                    <div className="bg-espresso px-5 py-4 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-gold flex items-center justify-center shrink-0">
                            <Coffee size={16} className="text-espresso" />
                        </span>
                        <div>
                            <p className="text-cream font-display font-medium text-sm leading-tight">Coffee House Assistant</p>
                            <p className="text-cream/50 text-xs">Usually replies instantly</p>
                        </div>
                    </div>

                    {/* Messages */}
                    <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                        {messages.map((m, i) => (
                            <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                                <div
                                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm whitespace-pre-line ${m.from === "user"
                                            ? "bg-gold text-cream rounded-br-sm"
                                            : "bg-cream text-ink rounded-bl-sm"
                                        }`}
                                >
                                    {m.text}
                                    {m.action && (
                                        <button
                                            onClick={() => { setOpen(false); navigate(m.action.to); }}
                                            className="block mt-2 text-xs font-semibold text-gold hover:underline"
                                        >
                                            {m.action.label} →
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Quick replies */}
                    {messages.length <= 2 && (
                        <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                            {QUICK_REPLIES.map((q) => (
                                <button
                                    key={q}
                                    onClick={() => respond(q)}
                                    className="text-xs border border-coffee/15 text-coffee/70 rounded-full px-3 py-1.5 hover:border-gold hover:text-gold transition"
                                >
                                    {q}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Input */}
                    <div className="border-t border-coffee/10 p-3 flex items-center gap-2">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            placeholder="Ask a question…"
                            className="flex-1 bg-cream rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                        />
                        <button
                            onClick={handleSend}
                            aria-label="Send message"
                            className="w-9 h-9 rounded-full bg-gold text-cream flex items-center justify-center hover:bg-clay-600 transition shrink-0"
                        >
                            <Send size={15} />
                        </button>
                    </div>
                </div>
            )}

            {/* Toggle bubble */}
            <button
                onClick={() => setOpen(!open)}
                aria-label={open ? "Close chat" : "Open chat"}
                className="w-14 h-14 rounded-full bg-espresso text-cream shadow-lift flex items-center justify-center hover:scale-105 active:scale-95 transition-transform ml-auto"
            >
                {open ? <X size={22} /> : <MessageCircle size={22} />}
            </button>
        </div>
    );
}
