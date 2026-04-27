import React, { useEffect, useRef, useState } from "react";

const quickPrompts = [
  "What services do you offer?",
  "How can I contact your team?",
  "Can you help with pricing?",
];

const initialMessage = {
  id: 1,
  sender: "assistant",
  text: "Hi, I'm the Zedflux AI assistant. I can help with general questions about our services, projects, timelines, and how to reach the team.",
};

function buildReply(message) {
  const normalized = message.toLowerCase();

  const knowledgeBase = [
    {
      keywords: ["hello", "hi", "hey", "good morning", "good afternoon"],
      reply:
        "Hello. I'm here to help with general questions about Zedflux, our services, and the best next step for your project.",
    },
    {
      keywords: ["service", "offer", "do you do", "what can you build"],
      reply:
        "Zedflux can help with software development, digital products, web experiences, data services, AI initiatives, and tailored technology solutions. If you share what you're trying to build, I can point you to the most relevant service area.",
    },
    {
      keywords: ["price", "pricing", "cost", "budget", "quote"],
      reply:
        "Pricing usually depends on scope, timeline, and the complexity of the work. For an accurate quote, the best path is to send your project details through the contact section so the team can follow up with a tailored estimate.",
    },
    {
      keywords: ["contact", "email", "phone", "reach", "talk to someone"],
      reply:
        "You can reach the team through the contact section on the site. If you'd like, I can also suggest the kind of project details to include so the team can respond faster.",
    },
    {
      keywords: ["time", "timeline", "delivery", "how long", "turnaround"],
      reply:
        "Timelines depend on the size of the project, but most engagements start with a discovery phase so requirements, milestones, and delivery dates are clear from the beginning.",
    },
    {
      keywords: ["portfolio", "case study", "projects", "work"],
      reply:
        "You can explore the portfolio and case studies on the site to see the kinds of products and solutions Zedflux has delivered. If you tell me your industry, I can suggest the closest fit.",
    },
    {
      keywords: ["support", "help", "issue", "problem"],
      reply:
        "I can help with general guidance here. If your question is specific to an existing project, account, or technical issue, it's best to contact the team directly so they can look into the details properly.",
    },
    {
      keywords: ["ai", "chatbot", "automation", "assistant"],
      reply:
        "Yes, Zedflux can support AI and automation conversations as part of broader digital solutions. The right approach depends on whether you need customer support automation, internal tooling, or a product feature.",
    },
  ];

  const match = knowledgeBase.find((entry) =>
    entry.keywords.some((keyword) => normalized.includes(keyword))
  );

  if (match) {
    return match.reply;
  }

  return "I can help with general questions about services, pricing, timelines, portfolio work, and how to contact the team. For anything project-specific, the contact form is the best next step.";
}

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([initialMessage]);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const sendMessage = (text) => {
    const trimmed = text.trim();

    if (!trimmed) {
      return;
    }

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: trimmed,
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setIsTyping(true);

    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          sender: "assistant",
          text: buildReply(trimmed),
        },
      ]);
      setIsTyping(false);
    }, 700);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="chat-widget">
      {isOpen ? (
        <div className="chat-widget__panel" aria-label="Customer service chat">
          <div className="chat-widget__header">
            <div>
              <p className="chat-widget__eyebrow">Customer Support</p>
              <h3>Zedflux AI Assistant</h3>
            </div>
            <button
              type="button"
              className="chat-widget__close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              x
            </button>
          </div>

          <div className="chat-widget__body" ref={bodyRef}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`chat-widget__message chat-widget__message--${message.sender}`}
              >
                <span>{message.text}</span>
              </div>
            ))}

            {isTyping ? (
              <div className="chat-widget__message chat-widget__message--assistant">
                <span>Typing...</span>
              </div>
            ) : null}
          </div>

          <div className="chat-widget__prompts">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                className="chat-widget__prompt"
                onClick={() => sendMessage(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>

          <form className="chat-widget__form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask a general question..."
              aria-label="Type your message"
            />
            <button type="submit">Send</button>
          </form>
        </div>
      ) : null}

      <button
        type="button"
        className="chat-widget__launcher"
        onClick={() => setIsOpen((current) => !current)}
        aria-label="Open chat assistant"
      >
        AI Chat
      </button>
    </div>
  );
}

export default ChatWidget;
