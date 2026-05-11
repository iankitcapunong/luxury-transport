import { useEffect, useRef, useState } from "react";
import Chatbot from "./Chatbot";

// --- Tiny inline SVG icon set (no external lib) ----------------------------
const Icon = {
  Plane: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <path d="M10.5 19.5 8 22l-1-1 1.5-3.5L4 15l-2 1-1-1 4-4-1.5-5L5 5l3 4.5L13 8l5.5-5.5a2.12 2.12 0 0 1 3 3L16 11l1.5 5L19 18l-1 1-1-2-4.5-3z" />
    </svg>
  ),
  Crown: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <path d="M3 7l4 5 5-8 5 8 4-5-2 12H5L3 7z" />
      <path d="M5 19h14" />
    </svg>
  ),
  Ring: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <circle cx="12" cy="15" r="5" />
      <path d="M9 5h6l-2 5h-2L9 5z" />
    </svg>
  ),
  Briefcase: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
      <path d="M3 13h18" />
    </svg>
  ),
  Champagne: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <path d="M8 3h8l-1 7a3 3 0 0 1-6 0L8 3z" />
      <path d="M12 13v8" />
      <path d="M9 21h6" />
    </svg>
  ),
  Road: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <path d="M6 3l-3 18" />
      <path d="M18 3l3 18" />
      <path d="M12 4v2" />
      <path d="M12 10v2" />
      <path d="M12 16v2" />
    </svg>
  ),
  Phone: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.95.36 1.88.7 2.77a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.31-1.27a2 2 0 0 1 2.11-.45c.89.34 1.82.57 2.77.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  Mail: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  ),
  ArrowRight: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  ),
  Instagram: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" />
    </svg>
  ),
  Linkedin: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10v8" />
      <circle cx="8" cy="7" r=".8" fill="currentColor" />
      <path d="M12 18v-5a2 2 0 0 1 4 0v5" />
      <path d="M12 13v5" />
    </svg>
  ),
  X: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <path d="M4 4l16 16" />
      <path d="M20 4 4 20" />
    </svg>
  ),
};

// --- Reveal-on-scroll hook --------------------------------------------------
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    el.querySelectorAll(".reveal").forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);
  return ref;
}

// --- Nav --------------------------------------------------------------------
function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const links = [
    ["How it works", "#how"],
    ["Services", "#services"],
    ["The Fleet", "#features"],
    ["Clients", "#testimonials"],
  ];
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-ink-900/80 backdrop-blur-md border-b border-white/10 shadow-[0_8px_30px_-15px_rgba(0,0,0,0.45)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div
        className={`container-x flex items-center justify-between font-cormorant transition-all duration-300 ${
          scrolled ? "py-3" : "py-6"
        }`}
      >
        <a href="#top" className="flex items-center gap-4">
          <span className="grid h-10 w-10 place-items-center rounded-full border border-gold-400/70 text-gold-400 font-display italic text-[18px] font-bold">
            L
          </span>
          <div className="leading-tight">
            <div className="font-cormorant tracking-wide text-white text-[18px] font-bold drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
              Luxury Transport
            </div>
            <div className="uppercase tracking-[0.34em] text-white mt-1 text-[18px] font-bold drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
              Private Chauffeur · UK
            </div>
          </div>
        </a>
        <nav className="hidden md:flex items-center gap-10 text-[15px] uppercase tracking-[0.28em] text-white font-bold drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="relative transition-colors hover:text-gold-300"
            >
              {label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold-400 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>
        <button
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          className="md:hidden grid h-10 w-10 place-items-center rounded-full border border-white/30"
        >
          <div className="space-y-1.5">
            <span className="block h-px w-5 bg-white" />
            <span className="block h-px w-5 bg-white" />
          </div>
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/10 bg-ink-900/95 backdrop-blur text-white">
          <div className="container-x py-4 flex flex-col gap-3">
            {links.map(([l, h]) => (
              <a
                key={h}
                href={h}
                onClick={() => setOpen(false)}
                className="py-2 text-sm"
              >
                {l}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="btn-primary !py-3 mt-2 text-xs"
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

// --- Hero -------------------------------------------------------------------
function Hero() {
  const ref = useReveal();
  return (
    <section
      id="top"
      ref={ref}
      className="group/hero relative overflow-hidden pt-36 pb-28 lg:pt-44 lg:pb-36"
    >
      {/* Background video — clear, with hover dim */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-ink-900">
        <video
          src="/merc.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Black hover veil */}
        <div className="pointer-events-none absolute inset-0 bg-black opacity-0 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/hero:opacity-50" />
      </div>

      {/* atmospheric light wash */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-[36rem] w-[36rem] rounded-full bg-gold-300/25 blur-[120px] z-0" />
      <div className="pointer-events-none absolute -bottom-48 -left-48 h-[36rem] w-[36rem] rounded-full bg-ink-900/10 blur-[120px] z-0" />

      {/* vertical edition stamp */}
      <div className="hidden xl:block pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 v-text text-[10px] uppercase tracking-[0.4em] text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.55)] z-10">
        Edition MMXXVI · Vol. I
      </div>

      <div className="container-x relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center font-cormorant">
        <div className="lg:col-span-6">
          <div
            className="reveal eyebrow !text-[13px] flex items-center gap-3 !text-white font-bold drop-shadow-[0_1px_3px_rgba(0,0,0,0.55)]"
            style={{ transitionDelay: "100ms" }}
          >
            <span className="h-px w-14 bg-white" /> Est. London · Serving the
            United Kingdom
          </div>
          <h1
            className="reveal h-display !font-cormorant mt-8 text-[60px] leading-[1.05] text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)]"
            style={{ transitionDelay: "250ms" }}
          >
            Arrive
            <br />
            <span className="italic font-light text-gold-400 font-cormorant">
              Composed.
            </span>
          </h1>
          <div
            className="reveal mt-8 flex items-start gap-4 max-w-xl"
            style={{ transitionDelay: "450ms" }}
          >
            <span className="mt-3 h-px w-8 bg-gold-400 shrink-0" />
            <p className="text-[22px] text-white leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,0.55)]">
              A private chauffeur house, fluent in the small things: the chilled
              water, the unspoken route, the door already open.
            </p>
          </div>

          <div
            className="reveal mt-8 ml-12 inline-block animate-gentle-bounce"
            style={{ transitionDelay: "650ms" }}
          >
            <a
              href="#contact"
              className="btn-primary font-sans !rounded-[15px] !bg-gold-400 !text-ink-900 hover:!bg-cream-50 shadow-[0_15px_35px_-10px_rgba(158,126,54,0.65)]"
            >
              Send Inquiry <Icon.ArrowRight className="h-4 w-4" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

// Decorative V-Class outline (no external image dependency)
function VClassSVG() {
  return (
    <svg
      viewBox="0 0 500 300"
      className="h-full w-full"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <defs>
        <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2A2A2A" />
          <stop offset="100%" stopColor="#0B0B0B" />
        </linearGradient>
        <linearGradient id="goldStripe" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#D9B97A" stopOpacity="0" />
          <stop offset="50%" stopColor="#D9B97A" />
          <stop offset="100%" stopColor="#D9B97A" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* ground glow */}
      <ellipse
        cx="250"
        cy="255"
        rx="200"
        ry="10"
        fill="#D9B97A"
        opacity="0.18"
        stroke="none"
      />
      {/* body */}
      <path
        d="M40 210 Q60 150 120 130 L200 110 Q260 100 340 110 L400 130 Q450 150 460 200 L460 220 Q460 235 445 235 L405 235 A30 30 0 0 0 345 235 L165 235 A30 30 0 0 0 105 235 L60 235 Q40 235 40 220 Z"
        fill="url(#bodyGrad)"
        stroke="#D9B97A"
        strokeOpacity="0.4"
      />
      {/* windows */}
      <path
        d="M130 138 L200 122 Q260 113 340 122 L400 138 L380 175 L130 175 Z"
        fill="#0F0F0F"
        stroke="#D9B97A"
        strokeOpacity="0.35"
      />
      <path
        d="M210 122 L210 175 M280 116 L280 175 M340 122 L340 175"
        stroke="#D9B97A"
        strokeOpacity="0.25"
      />
      {/* gold pinstripe */}
      <line
        x1="60"
        y1="195"
        x2="450"
        y2="195"
        stroke="url(#goldStripe)"
        strokeWidth="1"
      />
      {/* wheels */}
      <g stroke="#D9B97A" strokeOpacity="0.55">
        <circle cx="135" cy="235" r="22" fill="#0B0B0B" />
        <circle cx="135" cy="235" r="10" fill="none" />
        <circle cx="375" cy="235" r="22" fill="#0B0B0B" />
        <circle cx="375" cy="235" r="10" fill="none" />
      </g>
      {/* headlight */}
      <path
        d="M455 195 Q470 200 460 215"
        stroke="#D9B97A"
        strokeOpacity="0.7"
      />
      {/* badge */}
      <circle cx="250" cy="210" r="6" stroke="#D9B97A" strokeOpacity="0.7" />
      <path
        d="M250 206 L246 213 M250 206 L254 213 M250 206 L250 214"
        stroke="#D9B97A"
        strokeOpacity="0.7"
      />
    </svg>
  );
}

// --- How it works -----------------------------------------------------------
function HowItWorks({ selectedService, onSelectService }) {
  const ref = useReveal();
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [displayService, setDisplayService] = useState(selectedService);
  const [isExiting, setIsExiting] = useState(false);
  useEffect(() => {
    setPickup("");
    setDestination("");
  }, [selectedService]);
  useEffect(() => {
    if (selectedService) {
      setDisplayService(selectedService);
      setIsExiting(false);
      return;
    }
    if (displayService) {
      setIsExiting(true);
      const id = setTimeout(() => {
        setDisplayService(null);
        setIsExiting(false);
      }, 550);
      return () => clearTimeout(id);
    }
  }, [selectedService]);
  const serviceTabs = [
    "Airport & Long-Distance",
    "Corporate & VIP",
    "Weddings & Group Travel",
  ];

  const defaultServiceTitle = "A Private Chauffeur House";
  const defaultServiceCopy =
    "Every journey begins with a luxury chauffeur, uniformed, DBS-checked, NDA-bound, and trained for the quiet things: the chilled water, the door already open, the unspoken route. Choose a service above and the inquiry adjusts itself to suit the journey.";

  const serviceDescriptions = {
    "Airport & Long-Distance":
      "A private chauffeur greets you airside, tracks your flight and waits with bottled water, hot towels and a calm boot. For the miles ahead, our luxury Mercedes hires arrive with champagne, refrigerator and reclining leather — a hotel suite that happens to be moving.",
    "Corporate & VIP":
      "Our luxury chauffeurs are DBS-checked, uniformed and NDA-bound — chosen for composure as much as skill. Day rates, board pickups, festival transfers and paparazzi-aware routes, all handled with the kind of discretion that keeps your name out of the conversation.",
    "Weddings & Group Travel":
      "A luxury chauffeur for the most photographed morning of your life. Immaculate interiors, ribbons on request, bride, groom and party coordinated to the minute. Up to eight passengers travel composed in a Mercedes V-Class with panoramic roof, massage seats and Wi-Fi.",
  };

  const locationGroupsByService = {
    "Airport & Long-Distance": [
      {
        label: "London Areas",
        options: ["Mayfair", "Knightsbridge", "Belgravia"],
      },
      {
        label: "Mayfair Airports",
        options: [
          "Heathrow (LHR) · Mayfair",
          "London City (LCY) · Mayfair",
          "Gatwick (LGW) · Mayfair",
        ],
      },
      {
        label: "Knightsbridge Airports",
        options: [
          "Heathrow (LHR) · Knightsbridge",
          "London City (LCY) · Knightsbridge",
          "Gatwick (LGW) · Knightsbridge",
        ],
      },
      {
        label: "Belgravia Airports",
        options: [
          "Heathrow (LHR) · Belgravia",
          "London City (LCY) · Belgravia",
          "Gatwick (LGW) · Belgravia",
        ],
      },
      {
        label: "Long-Distance Landmarks",
        options: [
          "Windsor Castle",
          "Royal Ascot",
          "Bath",
          "Oxford",
          "Cambridge",
          "The Cotswolds",
          "Brighton",
          "Bicester Village",
          "Stonehenge",
        ],
      },
    ],
    "Corporate & VIP": [
      {
        label: "London Areas",
        options: ["Mayfair", "Knightsbridge", "Belgravia"],
      },
      {
        label: "Mayfair Hotels",
        options: [
          "Claridge's",
          "The Connaught",
          "The Dorchester",
          "Brown's Hotel",
        ],
      },
      {
        label: "Knightsbridge Hotels",
        options: [
          "Mandarin Oriental Hyde Park",
          "The Berkeley",
          "Bulgari Hotel London",
        ],
      },
      {
        label: "Belgravia Hotels",
        options: ["The Lanesborough", "The Goring"],
      },
    ],
    "Weddings & Group Travel": [
      {
        label: "London Areas",
        options: ["Mayfair", "Knightsbridge", "Belgravia"],
      },
      {
        label: "Mayfair Hotels",
        options: [
          "Claridge's",
          "The Connaught",
          "The Dorchester",
          "Brown's Hotel",
        ],
      },
      {
        label: "Knightsbridge Hotels",
        options: [
          "Mandarin Oriental Hyde Park",
          "The Berkeley",
          "Bulgari Hotel London",
        ],
      },
      {
        label: "Belgravia Hotels",
        options: ["The Lanesborough", "The Goring"],
      },
    ],
  };

  const defaultLocationGroups = [
    {
      label: "Mayfair Airports",
      options: [
        "Heathrow (LHR) · Mayfair",
        "London City (LCY) · Mayfair",
        "Gatwick (LGW) · Mayfair",
      ],
    },
    {
      label: "Knightsbridge Airports",
      options: [
        "Heathrow (LHR) · Knightsbridge",
        "London City (LCY) · Knightsbridge",
        "Gatwick (LGW) · Knightsbridge",
      ],
    },
    {
      label: "Belgravia Airports",
      options: [
        "Heathrow (LHR) · Belgravia",
        "London City (LCY) · Belgravia",
        "Gatwick (LGW) · Belgravia",
      ],
    },
    {
      label: "London Areas",
      options: ["Mayfair", "Knightsbridge", "Belgravia"],
    },
    {
      label: "Mayfair Hotels",
      options: [
        "Claridge's",
        "The Connaught",
        "The Dorchester",
        "Brown's Hotel",
      ],
    },
    {
      label: "Knightsbridge Hotels",
      options: [
        "Mandarin Oriental Hyde Park",
        "The Berkeley",
        "Bulgari Hotel London",
      ],
    },
    {
      label: "Belgravia Hotels",
      options: ["The Lanesborough", "The Goring"],
    },
  ];

  const locationGroups =
    locationGroupsByService[selectedService] || defaultLocationGroups;
  const steps = [
    {
      n: "1",
      title: "Inquiry",
      body: "Submit your details through the booking form, by phone, or by email. We hold your preferred time the moment we hear from you.",
    },
    {
      n: "2",
      title: "Speak to Desk",
      body: "Our concierge confirms your journey, chauffeur, and route within the hour. Adjustments welcomed up to two hours before pickup.",
    },
    {
      n: "3",
      title: "Wait for Vehicle",
      body: "Your chauffeur arrives thirty minutes early and waits at the kerb. Step in, depart, and arrive composed.",
    },
  ];

  return (
    <section
      id="how"
      ref={ref}
      className="relative py-28 lg:py-40 bg-beige-50/50"
    >
      <div className="container-x">
        <div className="max-w-2xl mx-auto text-center">
          <div className="reveal eyebrow flex items-center gap-3 justify-center">
            <span className="hairline" /> The Process
          </div>
          <h2 className="reveal h-display mt-7 text-5xl sm:text-6xl text-mask-gold">
            Three steps.
          </h2>
          <p className="reveal mt-7 text-ink-700 leading-relaxed italic font-light max-w-xl mx-auto">
            Booking ought not feel like work. We have reduced it to a single
            message. The rest, we attend to.
          </p>
        </div>

        {/* Quick inquiry form — fixed in the right column, description animates in/out on the left */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start max-w-5xl mx-auto">
          <div className="lg:pt-6 min-h-[1px]">
            {displayService ? (
              <div
                key={isExiting ? "exit" : displayService}
                className={`${
                  isExiting
                    ? "animate-fade-down pointer-events-none"
                    : "animate-fade-up"
                }`}
              >
                <div className="eyebrow flex items-center gap-3">
                  <span className="hairline" /> Selected Service
                </div>
                <h3
                  className="font-display text-3xl mt-4 text-mask-gold"
                  style={
                    isExiting
                      ? undefined
                      : {
                          animation:
                            "fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) both",
                          animationDelay: "120ms",
                        }
                  }
                >
                  {displayService}
                </h3>
                <div
                  className="mt-4 h-px w-12 bg-gold-500/60"
                  style={
                    isExiting
                      ? undefined
                      : {
                          animation:
                            "fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) both",
                          animationDelay: "200ms",
                        }
                  }
                />
                <p
                  className="mt-5 text-ink-700 leading-relaxed italic font-light"
                  style={
                    isExiting
                      ? undefined
                      : {
                          animation:
                            "fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) both",
                          animationDelay: "280ms",
                        }
                  }
                >
                  {serviceDescriptions[displayService]}
                </p>
                <button
                  type="button"
                  onClick={() => onSelectService && onSelectService(null)}
                  className="mt-6 text-[10px] uppercase tracking-[0.28em] text-gold-600 hover:text-gold-700 underline underline-offset-4 decoration-gold-500/60 transition-colors"
                  style={
                    isExiting
                      ? undefined
                      : {
                          animation:
                            "fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) both",
                          animationDelay: "400ms",
                        }
                  }
                >
                  Clear selection
                </button>
              </div>
            ) : (
              <div key="default" className="animate-fade-up">
                <h3
                  className="font-display text-3xl text-mask-gold"
                  style={{
                    animation: "fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) both",
                    animationDelay: "120ms",
                  }}
                >
                  {defaultServiceTitle}
                </h3>
                <div
                  className="mt-4 h-px w-12 bg-gold-500/60"
                  style={{
                    animation: "fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) both",
                    animationDelay: "200ms",
                  }}
                />
                <p
                  className="mt-5 text-ink-700 leading-relaxed italic font-light"
                  style={{
                    animation: "fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) both",
                    animationDelay: "280ms",
                  }}
                >
                  {defaultServiceCopy}
                </p>
              </div>
            )}
          </div>
          <div id="contact" className="reveal w-full lg:max-w-md lg:ml-auto">
            <div className="relative">
              <div className="absolute -inset-6 rounded-2xl bg-gradient-to-tr from-gold-300/20 via-transparent to-gold-300/10 blur-3xl" />
              <div className="absolute -top-2 -left-2 h-5 w-5 border-l border-t border-gold-500/60" />
              <div className="absolute -top-2 -right-2 h-5 w-5 border-r border-t border-gold-500/60" />
              <div className="absolute -bottom-2 -left-2 h-5 w-5 border-l border-b border-gold-500/60" />
              <div className="absolute -bottom-2 -right-2 h-5 w-5 border-r border-b border-gold-500/60" />

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Thank you. The team will be in touch shortly.");
                }}
                className="relative bg-beige-50 text-ink-900 p-7 lg:p-9 border border-gold-500/40 rounded-[15px] shadow-[0_30px_70px_-15px_rgba(158,126,54,0.55),0_8px_24px_-10px_rgba(158,126,54,0.45)] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:shadow-[0_50px_100px_-20px_rgba(158,126,54,0.7),0_10px_30px_-10px_rgba(158,126,54,0.55)]"
              >
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-gold-600">
                  <span>Quick Inquiry</span>
                  <span>Vol. I · 2026</span>
                </div>
                <h3 className="mt-3 font-display text-2xl text-ink-900">
                  Begin your{" "}
                  <span className="italic font-light text-gold-600">
                    journey.
                  </span>
                </h3>
                <div className="mt-3 h-px w-12 bg-gold-500/60" />

                <div className="mt-5">
                  <select
                    aria-label="Select service"
                    value={selectedService || ""}
                    onChange={(e) =>
                      onSelectService &&
                      onSelectService(e.target.value || null)
                    }
                    className="w-full rounded-lg border border-ink-900/15 bg-cream-50 px-4 py-2.5 text-sm text-ink-900 focus:outline-none focus:border-gold-500 transition appearance-none bg-no-repeat bg-right pr-9"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%239E7E36'><path d='M5.5 7.5l4.5 5 4.5-5z'/></svg>\")",
                      backgroundPosition: "right 0.75rem center",
                      backgroundSize: "1rem",
                    }}
                  >
                    <option value="">Select a service</option>
                    {serviceTabs.map((tab) => (
                      <option key={tab} value={tab}>
                        {tab}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-5 space-y-3">
                  <input
                    required
                    type="email"
                    placeholder="Email address"
                    className="w-full rounded-lg border border-ink-900/15 bg-cream-50 px-4 py-2.5 text-sm placeholder:text-beige-200 focus:outline-none focus:border-gold-500 transition"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      required
                      type="tel"
                      placeholder="Phone number"
                      pattern="[0-9+\s()-]{7,}"
                      className="rounded-lg border border-ink-900/15 bg-cream-50 px-4 py-2.5 text-sm placeholder:text-beige-200 focus:outline-none focus:border-gold-500 transition"
                    />
                    <input
                      required
                      type="date"
                      aria-label="Journey date"
                      className="rounded-lg border border-ink-900/15 bg-cream-50 px-4 py-2.5 text-sm text-ink-900 focus:outline-none focus:border-gold-500 transition"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <select
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      className="rounded-lg border border-ink-900/15 bg-cream-50 px-4 py-2.5 text-sm text-ink-900 focus:outline-none focus:border-gold-500 transition appearance-none bg-no-repeat bg-right pr-9"
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%239E7E36'><path d='M5.5 7.5l4.5 5 4.5-5z'/></svg>\")",
                        backgroundPosition: "right 0.75rem center",
                        backgroundSize: "1rem",
                      }}
                    >
                      <option value="" disabled>
                        Pickup
                      </option>
                      {locationGroups.map((g) => (
                        <optgroup key={g.label} label={g.label}>
                          {g.options.map((o) => (
                            <option key={o}>{o}</option>
                          ))}
                        </optgroup>
                      ))}
                      <optgroup label="Other">
                        <option>Custom address</option>
                      </optgroup>
                    </select>
                    <select
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="rounded-lg border border-ink-900/15 bg-cream-50 px-4 py-2.5 text-sm text-ink-900 focus:outline-none focus:border-gold-500 transition appearance-none bg-no-repeat bg-right pr-9"
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%239E7E36'><path d='M5.5 7.5l4.5 5 4.5-5z'/></svg>\")",
                        backgroundPosition: "right 0.75rem center",
                        backgroundSize: "1rem",
                      }}
                    >
                      <option value="" disabled>
                        Destination
                      </option>
                      {locationGroups.map((g) => (
                        <optgroup key={g.label} label={g.label}>
                          {g.options.map((o) => (
                            <option key={o}>{o}</option>
                          ))}
                        </optgroup>
                      ))}
                      <optgroup label="Other">
                        <option>Custom address</option>
                      </optgroup>
                    </select>
                  </div>

                  {pickup === "Custom address" && (
                    <div className="animate-fade-up rounded-lg border border-gold-500/40 bg-cream-100/60 p-4 space-y-3">
                      <div className="text-[11px] uppercase tracking-[0.28em] text-gold-600">
                        Pickup address
                      </div>
                      <input
                        required
                        placeholder="Street address"
                        className="w-full rounded-md border border-ink-900/15 bg-cream-50 px-3 py-2 text-sm placeholder:text-beige-200 focus:outline-none focus:border-gold-500 transition"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          placeholder="City / Town"
                          className="rounded-md border border-ink-900/15 bg-cream-50 px-3 py-2 text-sm placeholder:text-beige-200 focus:outline-none focus:border-gold-500 transition"
                        />
                        <input
                          placeholder="Postcode"
                          className="rounded-md border border-ink-900/15 bg-cream-50 px-3 py-2 text-sm placeholder:text-beige-200 focus:outline-none focus:border-gold-500 transition"
                        />
                      </div>
                      <input
                        placeholder="Notes for the driver (gate code, floor…)"
                        className="w-full rounded-md border border-ink-900/15 bg-cream-50 px-3 py-2 text-sm placeholder:text-beige-200 focus:outline-none focus:border-gold-500 transition"
                      />
                    </div>
                  )}

                  {destination === "Custom address" && (
                    <div className="animate-fade-up rounded-lg border border-gold-500/40 bg-cream-100/60 p-4 space-y-3">
                      <div className="text-[11px] uppercase tracking-[0.28em] text-gold-600">
                        Destination address
                      </div>
                      <input
                        required
                        placeholder="Street address"
                        className="w-full rounded-md border border-ink-900/15 bg-cream-50 px-3 py-2 text-sm placeholder:text-beige-200 focus:outline-none focus:border-gold-500 transition"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          placeholder="City / Town"
                          className="rounded-md border border-ink-900/15 bg-cream-50 px-3 py-2 text-sm placeholder:text-beige-200 focus:outline-none focus:border-gold-500 transition"
                        />
                        <input
                          placeholder="Postcode"
                          className="rounded-md border border-ink-900/15 bg-cream-50 px-3 py-2 text-sm placeholder:text-beige-200 focus:outline-none focus:border-gold-500 transition"
                        />
                      </div>
                      <input
                        placeholder="Arrival notes (entrance, contact name…)"
                        className="w-full rounded-md border border-ink-900/15 bg-cream-50 px-3 py-2 text-sm placeholder:text-beige-200 focus:outline-none focus:border-gold-500 transition"
                      />
                    </div>
                  )}

                  <textarea
                    rows="3"
                    placeholder="A line about your journey"
                    className="w-full rounded-lg border border-ink-900/15 bg-cream-50 px-4 py-3 text-sm placeholder:text-beige-200 focus:outline-none focus:border-gold-500 transition resize-none"
                  />

                  <button
                    type="submit"
                    className="btn-primary w-full !rounded-[15px] !px-7 !py-3 !text-xs !tracking-[0.28em]"
                  >
                    Send Inquiry <Icon.ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                <p className="mt-4 text-[10px] uppercase tracking-[0.28em] text-ink-500 text-center">
                  Discretion · Punctuality · Composure
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Three steps — three columns below the form */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className="reveal group text-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="font-display italic font-light text-7xl leading-none bg-gradient-to-br from-gold-300 via-gold-500 to-gold-600 bg-clip-text text-transparent transition-all duration-700 group-hover:bg-gradient-to-tr group-hover:from-gold-400 group-hover:via-gold-600 group-hover:to-ink-900">
                {s.n}
              </div>
              <div className="mt-4 mx-auto h-px w-12 bg-gold-500/40 transition-all duration-700 group-hover:bg-gold-500 group-hover:w-20" />
              <h3 className="mt-6 font-display font-normal text-2xl bg-gradient-to-br from-gold-300 via-gold-500 to-gold-600 bg-clip-text text-transparent transition-all duration-700 group-hover:bg-gradient-to-tr group-hover:from-gold-400 group-hover:via-gold-600 group-hover:to-ink-900">
                {s.title}
              </h3>
              <p className="mt-4 text-sm leading-[1.85] bg-gradient-to-br from-ink-700 via-ink-700 to-ink-700 bg-clip-text text-transparent transition-all duration-700 group-hover:bg-gradient-to-tr group-hover:from-gold-500 group-hover:via-ink-700 group-hover:to-ink-900">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Social proof -----------------------------------------------------------
function SocialProof() {
  const ref = useReveal();
  const logos = [
    "MAYFAIR HOTEL CO.",
    "CLARIDGE CONCIERGE",
    "NORTHWOOD CAPITAL",
    "ASCOT EVENTS",
    "KENSINGTON & CO.",
    "HARLEY MEDICAL",
  ];
  return (
    <section
      ref={ref}
      className="bg-ink-900 text-cream-50 py-24 relative overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "4px 4px",
        }}
      />
      <div className="container-x relative">
        <div className="reveal text-center">
          <div className="editorial-rule justify-center mx-auto max-w-md !text-gold-300">
            In the company of
          </div>
          <h3 className="font-display italic font-light text-3xl sm:text-4xl mt-7 max-w-2xl mx-auto leading-snug text-mask-gold-bright">
            Hotels, concierges, labels and quietly discerning private clients
          </h3>
        </div>
        <div className="reveal mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-10 gap-y-8 items-center">
          {logos.map((l) => (
            <div
              key={l}
              className="text-center font-display tracking-[0.28em] text-[11px] text-cream-100/55 hover:text-gold-300 transition-all duration-700"
            >
              {l}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Features ---------------------------------------------------------------
function Services({ onSelect }) {
  const ref = useReveal();
  const groups = [
    {
      icon: Icon.Plane,
      icon2: Icon.Road,
      t: "Airport & Long-Distance",
      d: "All UK airports with met-and-greet, flight tracking and a calm boot for your luggage; plus city-to-city long-distance hires with champagne bar, refrigerator and reclining leather for the miles ahead.",
      tags: ["Airport Transfers", "Long-Distance Private Hire"],
    },
    {
      icon: Icon.Briefcase,
      icon2: Icon.Crown,
      t: "Corporate & VIP",
      d: "Day rates, board pickups and multi-stop schedules handled with the discretion your business needs. Tinted glass, NDAs as standard, paparazzi-aware route planning for festivals, labels and talent transfers.",
      tags: ["Corporate Chauffeur", "VIP & Celebrity"],
    },
    {
      icon: Icon.Ring,
      icon2: Icon.Champagne,
      t: "Weddings & Group Travel",
      d: "Ribbons optional, immaculate interiors essential. Bride, groom and party coordinated to the minute. Mercedes V-Class with panoramic roof, massage seats and Wi-Fi for up to eight passengers, zero compromise.",
      tags: ["Weddings & Events", "Group Travel · Up to 8"],
    },
  ];
  return (
    <section id="services" ref={ref} className="py-28 lg:py-40 bg-beige-50/60">
      <div className="container-x">
        <div className="reveal flex flex-col items-center text-center gap-7 max-w-2xl mx-auto">
          <div>
            <div className="eyebrow flex items-center gap-3 justify-center">
              <span className="hairline" /> The Offering
            </div>
            <h2 className="h-display mt-7 text-5xl sm:text-6xl text-mask-gold">
              A fleet for
              <br />
              <span className="italic font-light">every occasion.</span>
            </h2>
          </div>
          <p className="max-w-md text-ink-700 leading-relaxed italic font-light">
            Seven ways to travel; a single standard of service. The same chilled
            water, the same composed driver, the same time on your side.
          </p>
        </div>

        {/* Three grouped cards — static grid, white background, no hover */}
        <div
          id="features"
          className="reveal mt-20 grid grid-cols-1 md:grid-cols-3 gap-7"
        >
          {groups.map(({ icon: I, icon2: I2, t, d, tags }, i) => (
            <a
              key={t}
              href="#contact"
              onClick={() => onSelect && onSelect(t)}
              className="group relative flex flex-col h-full min-h-[500px] overflow-hidden
                         rounded-[15px] border border-gold-500/30 bg-[#3c2f1c] text-cream-50 p-9
                         shadow-[0_24px_50px_-18px_rgba(0,0,0,0.45)]
                         transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                         hover:-translate-y-3 hover:scale-[1.02]
                         hover:border-gold-500
                         hover:shadow-[0_45px_90px_-20px_rgba(158,126,54,0.55),0_15px_40px_-15px_rgba(158,126,54,0.45)]"
            >
              {/* Gold sweep highlight on hover */}
              <span className="pointer-events-none absolute -top-1/2 -left-1/4 h-[200%] w-[60%] rotate-[20deg] bg-gradient-to-r from-transparent via-gold-200/40 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-[260%] transition-all duration-[1500ms] ease-out" />

              <div className="relative flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <I className="h-7 w-7 text-gold-400 transition-transform duration-700 group-hover:-translate-y-1" />
                  <span className="h-px w-3 bg-gold-400/70 transition-all duration-700 group-hover:w-6" />
                  <I2 className="h-7 w-7 text-gold-400 transition-transform duration-700 group-hover:-translate-y-1" />
                </div>
                <span className="font-display italic font-light text-xl text-mask-gold-bright">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="relative mt-8 h-px w-12 bg-gold-400/70 transition-all duration-700 group-hover:w-24" />
              <h3 className="relative font-display font-normal text-2xl mt-6 leading-tight text-mask-gold-bright">
                {t}
              </h3>
              <p className="relative mt-4 text-[15px] text-cream-100/85 leading-[1.8] flex-1">
                {d}
              </p>
              <div className="relative mt-7 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] uppercase tracking-[0.28em] text-mask-gold-bright border border-gold-400/40 rounded-full px-3 py-1 transition-colors duration-700 group-hover:border-gold-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="relative mt-8 flex items-center gap-2 text-[10px] uppercase tracking-[0.34em] text-cream-50">
                <span className="border-b border-gold-400 group-hover:text-mask-gold-bright transition-colors duration-700">
                  Book Now
                </span>
                <Icon.ArrowRight className="h-3.5 w-3.5 text-gold-400 transition-transform duration-700 group-hover:translate-x-1.5" />
              </div>
            </a>
          ))}
        </div>

        {/* In-vehicle card */}
        <div className="reveal mt-16 rounded-[15px] border border-gold-500/50 bg-ink-900 text-cream-50 overflow-hidden shadow-[0_30px_70px_-15px_rgba(158,126,54,0.6),0_10px_30px_-12px_rgba(158,126,54,0.45)] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:shadow-[0_50px_100px_-20px_rgba(158,126,54,0.75),0_15px_40px_-12px_rgba(158,126,54,0.55)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
            {/* Left — features */}
            <div className="p-8 lg:p-12 flex flex-col">
              <div className="eyebrow !text-gold-300">Inside the Sprinter</div>
              <h3 className="font-display italic font-light text-4xl lg:text-5xl mt-4">
                <span className="text-mask-gold-bright">Quietly equipped.</span>
              </h3>
              <div className="mt-5 h-px w-12 bg-gold-500/60" />
              <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-cream-100/85">
                {[
                  "Leather seats",
                  "Climate control",
                  "Phone chargers",
                  "Bottled water",
                  "Optional Wi-Fi",
                  "Uniformed drivers",
                  "Child seats",
                  "Umbrellas & tissues",
                  "Panoramic roof",
                  "Fireplace ambience",
                  "Refrigerator",
                  "Champagne bar",
                  "Massage seats",
                  "360° camera",
                ].map((f) => (
                  <div key={f} className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-gold-400" />
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — video */}
            <div className="relative min-h-[280px] lg:min-h-[420px] bg-ink-800">
              <video
                src="/merc.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink-900/40 via-transparent to-transparent lg:from-ink-900/60" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Testimonials -----------------------------------------------------------
function Testimonials() {
  const ref = useReveal();
  const quotes = [
    {
      q: "“They moved an artist from a sold-out show to a private dinner in twenty minutes, and you wouldn't have known either was happening. Exactly what we needed.”",
      n: "Adaeze Williams",
      r: "Tour Manager · Independent label",
      i: "AW",
    },
    {
      q: "“Our concierge desk has used a dozen firms. Luxury Transport is the only one we hand the phone to and stop watching the clock. Drivers are immaculate.”",
      n: "Henry Caldwell",
      r: "Head Concierge · Mayfair hotel",
      i: "HC",
    },
    {
      q: "“Six pickups across three counties on the wedding morning. Not a single late minute, not a single crumpled dress. We've already booked them for next year.”",
      n: "Priya Shah",
      r: "Wedding Planner · Cotswolds",
      i: "PS",
    },
  ];
  return (
    <section id="testimonials" ref={ref} className="py-28 lg:py-40">
      <div className="container-x">
        <div className="reveal max-w-2xl mx-auto text-center">
          <div className="eyebrow flex items-center gap-3 justify-center">
            <span className="hairline" /> In Their Words
          </div>
          <h2 className="h-display mt-7 text-5xl sm:text-6xl text-mask-gold">
            Quietly
            <br />
            <span className="italic font-light">recommended.</span>
          </h2>
          <p className="mt-7 text-ink-700 leading-relaxed italic font-light max-w-xl mx-auto">
            Ninety-seven percent of our private clients return within twelve
            months. A number we mention only because they have asked us to.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-10 items-stretch">
          {quotes.map((t, i) => (
            <figure
              key={t.n}
              className="reveal relative pl-6 border-l border-gold-500/40 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-gold-500 flex flex-col h-full"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="absolute -left-3 -top-2 font-display italic font-light text-7xl text-gold-500/60 leading-none">
                “
              </div>
              <blockquote className="font-display font-light text-xl text-ink-900 leading-[1.55] italic flex-1">
                {t.q.replace(/[“”]/g, "")}
              </blockquote>
              <figcaption className="mt-10 flex items-center gap-4 border-t border-ink-900/15 pt-6">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-gold-500/50 text-gold-500 font-display italic">
                  {t.i}
                </div>
                <div>
                  <div className="font-display text-base text-ink-900">
                    {t.n}
                  </div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.28em] text-ink-500">
                    {t.r}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

      </div>
    </section>
  );
}

// --- Final CTA --------------------------------------------------------------
function CTA() {
  const ref = useReveal();
  return (
    <section
      ref={ref}
      className="relative py-28 lg:py-40 bg-ink-900 text-cream-50 overflow-hidden"
    >
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[36rem] w-[36rem] rounded-full bg-gold-400/20 blur-[120px]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "4px 4px",
        }}
      />
      <div className="container-x relative text-center max-w-3xl mx-auto">
        <div className="reveal editorial-rule justify-center mx-auto max-w-md !text-gold-300">
          Begin Inquiry
        </div>
        <h2 className="reveal h-display mt-8 text-5xl sm:text-6xl lg:text-7xl text-mask-gold-bright">
          A single message.
          <br />
          <span className="italic font-light">The rest is on us.</span>
        </h2>
        <p className="reveal mt-8 text-cream-100/75 leading-relaxed italic font-light max-w-xl mx-auto">
          Tell us when, where from, and where to. We return inside the hour,
          with a vehicle, a driver, and a price.
        </p>
        <div className="reveal mt-12 flex flex-wrap items-center justify-center gap-4">
          <a
            href="mailto:bookings@luxurytransport.co.uk"
            className="btn-primary !rounded-[15px] !bg-gold-400 !text-ink-900 hover:!bg-cream-50"
          >
            Email the Team <Icon.ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="tel:+440000000000"
            className="btn-ghost !rounded-[15px] !text-cream-50 !border-cream-50/30 hover:!border-gold-300 hover:!text-gold-300"
          >
            <Icon.Phone className="h-4 w-4" /> Speak to the team
          </a>
        </div>
      </div>
    </section>
  );
}

// --- Footer -----------------------------------------------------------------
function Footer() {
  const cols = [
    {
      h: "Services",
      l: [
        "Airport Transfers",
        "Corporate Chauffeur",
        "VIP & Celebrity",
        "Weddings & Events",
        "Long-Distance Hire",
      ],
    },
    { h: "Company", l: ["About", "The Fleet", "Drivers", "Press", "Careers"] },
    {
      h: "Support",
      l: ["Contact", "Bookings", "Lost & Found", "Account", "FAQ"],
    },
  ];
  return (
    <footer className="bg-ink-900 text-cream-100 border-t border-gold-500/20 relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "4px 4px",
        }}
      />
      <div className="container-x py-20 lg:py-24 relative">
        {/* Editorial signature line */}
        <div className="editorial-rule justify-center mx-auto max-w-md !text-gold-300 mb-16">
          Luxury Transport · Est. MMXXVI
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <a href="#top" className="group flex items-center gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-[15px] border border-gold-400/60 text-gold-400 font-display italic text-2xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1.5 group-hover:scale-110 group-hover:border-gold-400 group-hover:shadow-[0_15px_30px_-10px_rgba(191,156,83,0.55)]">
                L
              </span>
              <div className="leading-tight">
                <div className="font-display text-xl tracking-wide">
                  Luxury Transport
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.34em] text-cream-100/60">
                  Private Chauffeur · United Kingdom
                </div>
              </div>
            </a>
            <p className="mt-7 max-w-sm text-sm text-cream-100/70 leading-[1.85] italic font-light">
              Safe, stylish and quietly professional passenger transport. A
              Mercedes house, available across the United Kingdom, every hour of
              every day.
            </p>
            <div className="mt-8 flex items-center gap-3">
              {[Icon.Instagram, Icon.Linkedin, Icon.X].map((I, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="social"
                  className="group grid h-10 w-10 place-items-center rounded-[15px] border border-cream-100/20 text-cream-100/70 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-gold-400 hover:text-gold-400 hover:-translate-y-1.5 hover:scale-110 hover:shadow-[0_15px_30px_-10px_rgba(191,156,83,0.55)]"
                >
                  <I className="h-4 w-4 transition-transform duration-500 group-hover:rotate-12" />
                </a>
              ))}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.h} className="lg:col-span-2">
              <div className="eyebrow !text-gold-300">{c.h}</div>
              <ul className="mt-5 space-y-3 text-sm text-cream-100/80 font-light">
                {c.l.map((x) => (
                  <li key={x}>
                    <a
                      href="#"
                      className="hover:text-gold-300 transition-colors duration-500"
                    >
                      {x}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-2">
            <div className="eyebrow !text-gold-300">Contact</div>
            <ul className="mt-5 space-y-3 text-sm text-cream-100/80 font-light">
              <li className="flex items-center gap-3">
                <Icon.Phone className="h-3.5 w-3.5 text-gold-400" /> +44 (0)20
                0000 0000
              </li>
              <li className="flex items-center gap-3">
                <Icon.Mail className="h-3.5 w-3.5 text-gold-400" />{" "}
                bookings@luxurytransport.co.uk
              </li>
              <li className="mt-4 pt-4 border-t border-cream-100/10 text-cream-100/60 text-[10px] uppercase tracking-[0.28em] leading-relaxed">
                London · Manchester
                <br />
                Birmingham · Edinburgh
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-cream-100/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-[0.28em] text-cream-100/50">
          <p>
            © {new Date().getFullYear()} Luxury Transport Ltd · All rights
            reserved
          </p>
          <p className="font-display italic font-light text-sm normal-case tracking-normal text-gold-300">
            Move in silence. Discretion is our policy.
          </p>
        </div>
      </div>
    </footer>
  );
}

// --- App --------------------------------------------------------------------
export default function App() {
  const [selectedService, setSelectedService] = useState(null);
  return (
    <div className="min-h-screen font-sans text-ink-900">
      <Nav />
      <main>
        <Hero />
        <HowItWorks
          selectedService={selectedService}
          onSelectService={setSelectedService}
        />
        <SocialProof />
        <Services onSelect={setSelectedService} />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
