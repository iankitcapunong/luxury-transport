import { useEffect, useRef, useState } from "react";

const greeting = {
  from: "bot",
  text:
    "Good day. I'm the Luxury Transport concierge, happy to help with bookings, vehicles, pricing or anything else. What can I answer for you?",
};

const quickPrompts = [
  "How do I book?",
  "Airport transfers",
  "Pricing",
  "What vehicles?",
  "Weddings",
];

// Pattern -> reply lookup. First match wins.
const intents = [
  {
    keys: ["hi", "hello", "hey", "good morning", "good afternoon", "good evening"],
    reply:
      "Hello, welcome. Whatever you need today, I'll keep it brief and discreet. Are you looking at a one-off journey, a wedding, or a corporate arrangement?",
  },
  {
    keys: ["book", "booking", "reserve", "reservation", "schedule"],
    reply:
      "Booking is a single message. Share your date, pickup and destination, either through the inquiry form below, by email at bookings@luxurytransport.co.uk, or call +44 (0)20 0000 0000. We reply inside the hour with a vehicle, driver and quote.",
  },
  {
    keys: ["price", "pricing", "cost", "quote", "rate", "how much", "fare"],
    reply:
      "Pricing is set per journey rather than per mile, based on route, hours and any additions like a champagne bar or onboard refreshments. Share your itinerary and we'll come back with a fixed quote, in writing, the same day.",
  },
  {
    keys: ["vehicle", "car", "fleet", "sprinter", "v-class", "vito", "mercedes", "mpv"],
    reply:
      "Our primary vehicle is the Mercedes Sprinter (8-seater) with leather, panoramic roof, refrigerator, champagne bar, massage seats, 360° camera and Wi-Fi. Mercedes V-Class and Vito MPVs are also available on request.",
  },
  {
    keys: ["airport", "heathrow", "gatwick", "stansted", "luton", "city airport", "manchester airport", "edinburgh airport"],
    reply:
      "We cover every UK airport with meet-and-greet, live flight tracking and a thirty-minute grace period after landing. Driver awaits airside; we'll handle the luggage and a chilled bottle of water is already in the boot.",
  },
  {
    keys: ["wedding", "bride", "groom", "ceremony"],
    reply:
      "Wedding transport is one of our quietest specialties. Ribbons optional, immaculate interiors essential. We coordinate bride, groom and party with timing to the minute. Tell us the date and we'll hold a vehicle for you.",
  },
  {
    keys: ["corporate", "business", "executive", "office", "company"],
    reply:
      "For corporate accounts we offer day rates, multi-stop schedules, board pickups and monthly invoicing. Drivers sign NDAs as standard. Email bookings@luxurytransport.co.uk and we'll set up an account within 24 hours.",
  },
  {
    keys: ["vip", "celebrity", "artist", "talent", "festival", "label", "tour"],
    reply:
      "Festival, label and talent transfers, we handle these often. Tinted glass, NDAs as standard, paparazzi-aware route planning on request. Share the run sheet and we'll fit around it discreetly.",
  },
  {
    keys: ["wifi", "wi-fi", "internet", "charger", "phone", "water", "drink", "refreshment", "champagne", "bar", "fridge", "refrigerator", "massage", "seat", "child seat", "panoramic", "fire", "fireplace"],
    reply:
      "Onboard you'll find leather seats, climate control, phone chargers, complimentary bottled water, optional Wi-Fi, child seats on request, umbrellas, tissues, a panoramic roof, refrigerator, champagne bar, massage seats and a 360° camera.",
  },
  {
    keys: ["how long", "duration", "wait", "waiting"],
    reply:
      "Drivers arrive 10–15 minutes ahead of pickup and wait at no extra charge for up to 30 minutes (longer at airports). Hourly day-hire is also available if you'd prefer the car on standby throughout the day.",
  },
  {
    keys: ["area", "where", "city", "london", "manchester", "birmingham", "edinburgh", "uk", "travel", "long distance", "long-distance"],
    reply:
      "We're UK-wide. London, Manchester, Birmingham, Edinburgh and city-to-city long-distance hires are all routine. If you're crossing borders for a job, let us know the schedule and we'll plan around it.",
  },
  {
    keys: ["passenger", "people", "group", "seats", "size", "many"],
    reply:
      "Our Mercedes Sprinter seats up to 8 passengers comfortably with full luggage. For larger groups we can arrange a coordinated multi-vehicle run, just tell us the headcount.",
  },
  {
    keys: ["driver", "chauffeur", "uniform"],
    reply:
      "All drivers are uniformed, DBS-checked, NDA-bound and trained in close-protection-aware driving. They're chosen for composure as much as skill. You'll find them quiet, punctual and immaculate.",
  },
  {
    keys: ["safe", "insurance", "license", "licensed"],
    reply:
      "Fully licensed for private hire across the UK, fully insured, with comprehensive public liability cover. Vehicles are inspected weekly and serviced on Mercedes' main-dealer schedule.",
  },
  {
    keys: ["pay", "payment", "card", "invoice"],
    reply:
      "We accept card, bank transfer and account invoicing. Corporate clients can be set up on net-30 monthly billing. Personal bookings are confirmed with a small holding deposit refunded against the final invoice.",
  },
  {
    keys: ["cancel", "cancellation", "refund"],
    reply:
      "Cancellations made more than 24 hours before pickup are refunded in full. Within 24 hours, we hold the deposit; same-day cancellations are charged at 50%. Reschedules are free at any time, subject to availability.",
  },
  {
    keys: ["contact", "phone", "call", "email", "speak", "human"],
    reply:
      "Of course. +44 (0)20 0000 0000 (24/7 dispatch) or bookings@luxurytransport.co.uk. You can also use the inquiry form on this page and we'll be back to you within the hour.",
  },
  {
    keys: ["lost", "found", "left", "belonging"],
    reply:
      "Anything left in a vehicle is logged immediately and returned that day where possible. Call the office on +44 (0)20 0000 0000 and quote your booking reference.",
  },
  {
    keys: ["thanks", "thank you", "cheers", "ta"],
    reply:
      "My pleasure. Anything else I can answer? If not, the inquiry form on this page is the fastest way to get a real person on the case.",
  },
];

function findReply(input) {
  const text = input.toLowerCase();
  for (const intent of intents) {
    if (intent.keys.some((k) => text.includes(k))) return intent.reply;
  }
  return null;
}

const fallback =
  "I don't have an answer on hand for that. Let me hand you to a person. The fastest route is the inquiry form on this page, or email bookings@luxurytransport.co.uk and we'll reply inside the hour.";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([greeting]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing, open]);

  const send = (raw) => {
    const text = (raw ?? input).trim();
    if (!text) return;
    const userMsg = { from: "user", text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);

    const delay = 700 + Math.min(1400, text.length * 25);
    setTimeout(() => {
      const reply = findReply(text) ?? fallback;
      setMessages((m) => [...m, { from: "bot", text: reply }]);
      setTyping(false);
    }, delay);
  };

  return (
    <>
      {/* Launcher */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat"}
        className={`fixed bottom-6 right-6 z-[60] grid h-14 w-14 place-items-center rounded-full
                    bg-ink-900 text-cream-50 shadow-[0_15px_35px_-8px_rgba(0,0,0,0.45)]
                    transition-all duration-300 hover:bg-gold-500 hover:text-ink-900
                    hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gold-400/50`}
      >
        {open ? (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <path d="M5 5l14 14M19 5L5 19" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.7-.85L3 21l1.85-5.8A8.5 8.5 0 1 1 21 11.5z" />
          </svg>
        )}
        {!open && (
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-gold-400 ring-2 ring-cream-50 animate-pulse" />
        )}
      </button>

      {/* Panel */}
      <div
        className={`fixed bottom-24 right-6 z-[60] w-[min(360px,calc(100vw-3rem))]
                    origin-bottom-right rounded-2xl border border-ink-900/10
                    bg-cream-50 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)]
                    transition-all duration-300
                    ${open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-3 pointer-events-none"}`}
      >
        {/* Header */}
        <div className="flex items-center gap-3 rounded-t-2xl bg-ink-900 px-5 py-4 text-cream-50">
          <div className="grid h-9 w-9 place-items-center rounded-full border border-gold-400/60 text-gold-400 font-serif">
            L
          </div>
          <div className="leading-tight">
            <div className="font-serif text-sm">Luxury Transport · Concierge</div>
            <div className="text-[10px] uppercase tracking-widest-x text-cream-50/60 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Online · Replies instantly
            </div>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="px-4 py-4 h-[360px] overflow-y-auto space-y-3 text-sm">
          {messages.map((m, i) => (
            <Bubble key={i} from={m.from} text={m.text} />
          ))}
          {typing && <Typing />}
        </div>

        {/* Quick prompts */}
        {messages.length <= 2 && (
          <div className="px-4 pb-2 flex flex-wrap gap-2">
            {quickPrompts.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                className="rounded-full border border-ink-900/15 px-3 py-1 text-[11px] text-ink-700
                           transition hover:border-gold-500 hover:text-gold-600 hover:bg-cream-100"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
          className="flex items-center gap-2 border-t border-ink-900/10 p-3"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything: bookings, pricing, vehicles…"
            className="flex-1 rounded-full border border-ink-900/15 bg-cream-50 px-4 py-2.5 text-sm
                       focus:outline-none focus:border-gold-500 transition"
          />
          <button
            type="submit"
            aria-label="Send"
            className="grid h-10 w-10 place-items-center rounded-full bg-ink-900 text-cream-50
                       transition hover:bg-gold-500 hover:text-ink-900 disabled:opacity-40"
            disabled={!input.trim() || typing}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>
          </button>
        </form>
        <p className="px-4 pb-3 text-center text-[10px] uppercase tracking-widest-x text-ink-500">
          Discretion · Punctuality · Composure
        </p>
      </div>
    </>
  );
}

function Bubble({ from, text }) {
  const isUser = from === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[82%] rounded-2xl px-4 py-2.5 leading-relaxed
                    ${isUser
                      ? "bg-ink-900 text-cream-50 rounded-br-md"
                      : "bg-cream-100 text-ink-900 rounded-bl-md"}`}
      >
        {text}
      </div>
    </div>
  );
}

function Typing() {
  return (
    <div className="flex justify-start">
      <div className="bg-cream-100 text-ink-900 rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-ink-500 animate-bounce" style={{ animationDelay: "0ms" }} />
        <span className="h-1.5 w-1.5 rounded-full bg-ink-500 animate-bounce" style={{ animationDelay: "120ms" }} />
        <span className="h-1.5 w-1.5 rounded-full bg-ink-500 animate-bounce" style={{ animationDelay: "240ms" }} />
      </div>
    </div>
  );
}
