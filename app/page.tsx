"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Calendar,
  MapPin,
  Clock,
  Menu,
  X,
  Landmark,
  QrCode,
  Upload,
  Images,
  Martini,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type RSVPState = {
  name: string;
  phone: string;
  attending: string;
  allergies: string;
  notes: string;
};

type ScheduleItem = {
  time: string;
  title: string;
  detail: string;
};

type SponsorData = {
  principal: {
    male: string[];
    female: string[];
  };
  secondary: {
    candle: string[];
    veil: string[];
    cord: string[];
  };
};

type EntourageData = {
  bestMen: string[];
  maidsOfHonor: string[];
  groomsmen: string[];
  bridesmaids: string[];
  ringBearer: string[];
  bibleBearer: string[];
  coinBearer: string[];
  flowerGirl: string[];
};

type WeddingData = {
  parents: {
    left: string[];
    right: string[];
  };
  couple: string;
  subtitle: string;
  date: string;
  countdownDate: string;
  story: string;
  contactInfo: string;
  attireGuideImage: string;
  dressCode: {
    attire: string;
    gentlemen: string;
    ladies: string;
    note: string;
  };
  ceremony: {
    label: string;
    time: string;
    venue: string;
    locationDetail: string;
    mapLink: string;
    note: string;
    arrivalNote: string;
    dressNote: string;
    tidbits: string[];
  };
  reception: {
    label: string;
    cocktailsTime: string;
    doorsOpenTime: string;
    venue: string;
    room: string;
    locationDetail: string;
    mapLink: string;
    note: string;
    momentTitle: string;
    momentDescription: string;
  };
  photoDrive: {
    title: string;
    description: string;
    driveLink: string;
    qrImage: string;
    note: string;
    quickAccess: string;
    qrCaption: string;
  };
  hashtag: string;
  sponsors: SponsorData;
  entourage: EntourageData;
  faqs: { q: string; a: string }[];
  gallery: string[];
  schedule: {
    ceremony: ScheduleItem[];
    reception: ScheduleItem[];
  };
};

const weddingData: WeddingData = {
  parents: {
    left: ["Mr. Robert L. Yu", "Mrs. Pamela L. Yu"],
    right: ["Mr. Roy J. Tiu", "Mrs. Jean Gina T. Tiu"],
  },
  couple: "Lance & Elaiza",
  subtitle: "A timeless celebration of love, family, and tradition",
  date: "May 17, 2026",
  countdownDate: "2026-05-17T09:00:00+08:00",
  story:
    "We met in college—two people in the same room, with no idea what we would become to each other.\n\nWe were together for four years. It wasn’t perfect, and it wasn’t easy—but it was real.\n\nThen we went our separate ways.\n\nFor the next four years, we tried to move on. But something was always missing.\n\nHe couldn’t forget her.\nShe told herself she had let go.\n\nUntil one day, a single photo changed everything.\n\nAnd just like that, we found our way back.\n\nThis time, with clarity.\nThis time, we’re not letting go.",
  contactInfo:
    "For any questions or assistance, please feel free to reach out to:\n\nSteph — +63 956 669 5848",
  attireGuideImage: "/images/dresscode.png",
  dressCode: {
    attire: "Strictly Formal",
    gentlemen: "Black Tie",
    ladies: "Long gown. White and black are respectfully discouraged.",
    note: "",
  },
  ceremony: {
    label: "Ceremony",
    time: "9:00 AM",
    venue: "San Agustin Church",
    locationDetail: "General Luna St, Intramuros, Manila, 1002 Metro Manila",
    mapLink: "https://maps.google.com/?q=San+Agustin+Church+Intramuros+Manila",
    note: "Join us as we exchange vows and begin our life together, surrounded by our loved ones.",
    arrivalNote: "Kindly arrive on time as the ceremony will begin promptly.",
    dressNote:
      "The church is truly breathtaking, and we highly encourage guests to take photos and appreciate its beauty. We recommend arriving early, as there will be no opportunity for photos after the ceremony due to a scheduled mass. Out of respect for the sanctity of the church, we ask guests to observe proper decorum.",
    tidbits: [
      "This church is a UNESCO World Heritage Site.",
      "Completed in 1607, it stands as the oldest stone church in the country—a timeless testament to centuries of faith, history, and exquisite craftsmanship.",
    ],
  },
  reception: {
    label: "Reception",
    cocktailsTime: "4:30 PM",
    doorsOpenTime: "5:30 PM",
    venue: "Conrad Manila",
    room: "Forbes 1 & 2",
    locationDetail: "Seaside Boulevard corner Coral Way, Pasay, Metro Manila",
    mapLink: "https://maps.google.com/?q=Conrad+Manila+Pasay",
    note: "We’ll have dinner and drinks ready—just bring your energy.",
    momentTitle: "An evening of celebration",
    momentDescription: "We can’t wait to celebrate this moment with you.",
  },
  photoDrive: {
    title: "Share Your Moments With Us",
    description:
      "We would love to see the day through your eyes. During the celebration, you may upload your photos and videos to our shared wedding drive.",
    driveLink:
      "https://weduploader.com/upload/4fGC6SwKZTRHSdsL?utm_source=site&utm_medium=qrcode&utm_campaign=dashboard&utm_content=4fGC6SwKZTRHSdsL",
    qrImage: "/images/drive.png",
    note: "Scan the QR code or use the link below to upload your photos and videos during the event.",
    quickAccess: "Snap and upload—quick and easy, no downloads needed.",
    qrCaption: "Scan to help us remember it all. ♡",
  },
  hashtag: "#ElaizaFellInLoveAtFirstLance",
  sponsors: {
    principal: {
      male: [
        "Mr. Ashford Bobby U. Chua",
        "Mr. Vicente G. Gotil",
        "Mr. Chemson Y. Lee",
        "Mr. Jovencio Ong",
        "Mr. Arvin L. Siy",
        "Mr. Romeo A. Yu",
        "Atty. Romero A. Yu",
        "Mr. Ronnie L. Yu",
      ],
      female: [
        "Mrs. Cecily M. Chua Lim",
        "Dr. Ana Victoria S. Gotil",
        "Mrs. Diana O. Lee",
        "Mrs. Corazon V. Ong",
        "Mrs. Marilyn T. Siy",
        "Mrs. Jean T. Chin",
        "Mrs. Caroline L. Yu",
        "Mrs. Catherine G. Tiu",
      ],
    },
    secondary: {
      candle: ["Tinker J. Lu", "Lorraine L. Yu"],
      veil: ["Alexander Ritchell P. Cagang", "Kimberly Alyza T. Ang"],
      cord: ["Mario Gregorio F. Aglipay", "Shannon Casey A. Tan"],
    },
  },
  entourage: {
    bestMen: ["Chris Nicolo L. Syfu", "Aaron Eldon L. Choi"],
    maidsOfHonor: ["Jolle Marigold E. Tong", "Maria Lourdes Kristia R. Cabrera"],
    groomsmen: ["Hans Cedric O. Lee", "Kyle Kristoffer C. Dy", "John Patrick Chan"],
    bridesmaids: ["Danica Camille L. Yu", "Reza D. Tan", "Nicole Blanche B. Lim"],
    ringBearer: ["Renzdl Yosef D. Yu"],
    bibleBearer: ["Laurence L. Yu"],
    coinBearer: ["Roy T. Tiu Jr."],
    flowerGirl: ["Julia Amaris S. Lim"],
  },
  faqs: [
    {
      q: "Are the ceremony and reception in the same place?",
      a: "No. Our ceremony and reception are held at different venues, so please check both location details before the wedding day.\n\nFor the ceremony, guests are welcome to bring a shawl or light covering for use inside the church.",
    },
    {
      q: "Can I bring a plus one?",
      a: "Seating is limited, and unless a plus one has been explicitly extended to you, we regret that we were unable to reserve an additional seat. Should you need one, please feel free to reach out to:\n\nElaiza — +63 917 633 3305\nLance — +63 917 321 5611",
    },
    {
      q: "Help with reservations or any concerns regarding Conrad Manila (hotel)",
      a: "For assistance with reservations or any concerns regarding Conrad Manila, please contact:\n\nNina — +63 915 658 7682",
    },
    {
      q: "Who do I contact for questions?",
      a: "For general inquiries, or if you need help on the day itself such as finding your way to the venues, please feel free to reach out to:\n\nSteph — +63 956 669 5848",
    },
  ],
  gallery: [
    "/images/photo1.jpg",
    "/images/photo2.jpg",
    "/images/photo3.jpg",
    "/images/photo4.jpg",
  ],
  schedule: {
    ceremony: [
      { time: "", title: "Ceremony", detail: "" },
      {
        time: "9:00 AM – 10:00 AM",
        title: "Wedding Ceremony",
        detail:
          "Guests are kindly encouraged to arrive early and be on time, especially if you wish to take photos inside the church. A pictorial will take place immediately after the ceremony.",
      },
    ],
    reception: [
      { time: "", title: "Reception", detail: "" },
      {
        time: "4:30 PM",
        title: "Cocktails",
        detail: "Light snacks and refreshments will be served as guests arrive.",
      },
      {
        time: "5:30 PM",
        title: "Reception Begins",
        detail:
          "Reception doors will open around this time as we prepare to begin the evening program. Dinner will be served.",
      },
      {
        time: "6:30 PM",
        title: "Manila Craft Bar Service",
        detail:
          "Manila Craft will begin its service, offering a selection of cocktails—personally handpicked by the bride and groom. These will be served free-flowing throughout the evening, so please feel free to enjoy, celebrate, and make the most of it.",
      },
    ],
  },
};

function getCountdownParts(targetDate: string) {
  const target = new Date(targetDate).getTime();
  const now = new Date().getTime();
  const diff = Math.max(target - now, 0);

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
  };
}

function validateWeddingData(data: WeddingData) {
  console.assert(Boolean(data.date), "date is required");
  console.assert(Boolean(data.countdownDate), "countdown date is required");
  console.assert(Boolean(data.ceremony.mapLink), "ceremony map link is required");
  console.assert(Boolean(data.reception.mapLink), "reception map link is required");
  console.assert(Boolean(data.photoDrive.driveLink), "photo drive link is required");
  console.assert(data.gallery.length === 4, "gallery should have 4 images");
  console.assert(data.schedule.ceremony.length >= 1, "ceremony schedule should not be empty");
  console.assert(data.schedule.reception.length >= 1, "reception schedule should not be empty");
  console.assert(data.faqs.length >= 1, "faq should not be empty");
  console.assert(data.parents.left.length === 2 && data.parents.right.length === 2, "parents should have 2 names per side");
  console.assert(data.entourage.flowerGirl.length === 1, "flower girl should have 1 entry");
  console.assert(data.entourage.bestMen.length === 2, "best men should have 2 entries");
}

validateWeddingData(weddingData);

const appsScriptUrl =
  "https://script.google.com/macros/s/AKfycbwTzL-EQzcnf5P5xre4-TJdtDS4t6VFw7cBgJ6l--hwL2Q9Ztq4AX12NCYxjpTIaCHi/exec";

function NamedList({ names, compact = false }: { names: string[]; compact?: boolean }) {
  return (
    <div className={compact ? "space-y-1.5 text-center text-[#444444]" : "space-y-2 text-center text-[#444444]"}>
      {names.map((name, index) => (
        <p
          key={`${name}-${index}`}
          className={compact ? "text-[13px] leading-5 tracking-[0.01em] sm:text-base sm:leading-7" : "tracking-wide"}
        >
          {name}
        </p>
      ))}
    </div>
  );
}

function FaqAnswer({ answer }: { answer: string }) {
  return <div className="whitespace-pre-line leading-7 text-[#6b6b6b]">{answer}</div>;
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-8 text-center">
      <div className="text-[11px] uppercase tracking-[0.35em] text-[#9c948a] sm:text-sm">{eyebrow}</div>
      <h2 className="mt-3 font-serif text-3xl tracking-[-0.02em] text-[#3a3a3a] sm:text-4xl">{title}</h2>
      {description ? <p className="mx-auto mt-4 max-w-[1100px] leading-8 text-[#6b6b6b]">{description}</p> : null}
    </div>
  );
}

function CountdownCard({ label, value }: { label: string; value: number }) {
  return (
    <Card className="rounded-3xl border border-[#e5e5e5] bg-white shadow-[0_12px_30px_rgba(44,36,31,0.04)]">
      <CardContent className="p-6 text-center sm:p-8">
        <div className="font-serif text-4xl text-[#3a3a3a] sm:text-5xl">{value}</div>
        <div className="mt-2 text-xs uppercase tracking-[0.24em] text-[#9d8c77] sm:text-sm sm:tracking-[0.25em]">
          {label} Until Ceremony
        </div>
      </CardContent>
    </Card>
  );
}

function DetailInfoCard({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="rounded-[1.5rem] bg-[#f1f1f1] p-5">
      <div className="text-xs uppercase tracking-[0.25em] text-[#9e8d79]">{label}</div>
      <div className="mt-2 font-serif text-2xl text-[#3a3a3a]">{value}</div>
      {note ? <p className="mt-2 text-sm italic text-[#7a7065]">{note}</p> : null}
    </div>
  );
}

function ScheduleRow({ item }: { item: ScheduleItem }) {
  if (!item.time) {
    return <div className="pt-2 text-xs uppercase tracking-[0.35em] text-[#b1a493]">{item.title}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="grid gap-4 md:grid-cols-[140px_1fr] md:items-start"
    >
      <div className="text-lg font-semibold text-[#444444]">{item.time}</div>
      <div>
        <div className="font-serif text-2xl text-[#3a3a3a]">{item.title}</div>
        <p className="mt-2 text-[#6b6b6b]">{item.detail}</p>
      </div>
    </motion.div>
  );
}

export default function WeddingWebsiteTemplate() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [rsvp, setRsvp] = useState<RSVPState>({
    name: "",
    phone: "",
    attending: "Attending both ceremony and reception",
    allergies: "",
    notes: "",
  });
  const [countdown, setCountdown] = useState(getCountdownParts(weddingData.countdownDate));

  const wedding = useMemo(() => weddingData, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCountdown(getCountdownParts(wedding.countdownDate));
    }, 60000);
    return () => window.clearInterval(interval);
  }, [wedding.countdownDate]);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "rsvp", label: "RSVP" },
    { id: "details", label: "Location" },
    { id: "schedule", label: "Schedule" },
    { id: "dress-code", label: "Dress Code" },
    { id: "story", label: "Our Story" },
    { id: "gallery", label: "Gallery" },
    { id: "photos", label: "Upload Photos" },
    { id: "sponsors", label: "Sponsors" },
    { id: "entourage", label: "Entourage" },
    { id: "faq", label: "FAQ" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setMenuOpen(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (submitting) return;

    const trimmedName = rsvp.name.trim();
    const trimmedPhone = rsvp.phone.trim();
    const trimmedAllergies = rsvp.allergies.trim();
    const trimmedNotes = rsvp.notes.trim();

    if (!trimmedName) {
      alert("Please enter your full name.");
      return;
    }

    const payload = {
      submittedAt: new Date().toISOString(),
      name: trimmedName,
      phone: trimmedPhone,
      attending: rsvp.attending,
      allergies: trimmedAllergies,
      notes: trimmedNotes,
    };

    try {
      setSubmitting(true);

      const response = await fetch(appsScriptUrl, {
        method: "POST",
        redirect: "follow",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
      });

      const rawText = await response.text();

      let result: { success?: boolean; message?: string } = {};
      try {
        result = rawText ? JSON.parse(rawText) : {};
      } catch {
        result = {};
      }

      if (!response.ok) {
        throw new Error(result.message || "Failed to submit RSVP.");
      }

      if (result.success === false) {
        throw new Error(result.message || "Failed to submit RSVP.");
      }

      alert("Thank you! Your RSVP has been submitted.");
      setRsvp({
        name: "",
        phone: "",
        attending: "Attending both ceremony and reception",
        allergies: "",
        notes: "",
      });
    } catch (error) {
      console.error("RSVP submit error:", error);
      const message =
        error instanceof Error && error.message
          ? error.message
          : "There was a problem submitting your RSVP. Please try again.";
      alert(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f7f4] text-[#444444]">
      <header className="sticky top-0 z-50 border-b border-[#e8e8e8] bg-[#fdfcf9]/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <button onClick={() => scrollToSection("home")} className="flex flex-col items-start gap-1 text-left">
            <div className="flex h-20 w-28 items-center justify-center overflow-hidden bg-transparent sm:h-24 sm:w-32">
              <img src="/images/monogram.png" alt="Wedding monogram" className="h-full w-full object-contain" />
            </div>
          </button>

          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm font-semibold text-[#5a5a5a] transition hover:text-[#2f2f2f]"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button className="text-[#444444] md:hidden" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-[#e8e8e8] bg-[#fdfcf9] md:hidden">
            <div className="flex flex-col px-4 py-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="py-2 text-left text-sm font-semibold text-[#5a5a5a]"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      <main>
<section id="home" className="relative overflow-hidden">
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.45),rgba(255,255,255,0.16),transparent_68%)] z-[1]" />

<div className="relative min-h-[64vh] sm:min-h-[86vh] md:min-h-[92vh]">

  {/* fallback background (prevents blank flash) */}
  <div className="absolute inset-0 bg-[#f8f7f4]" />

  <video
    className="absolute inset-0 h-full w-full object-cover"
    autoPlay
    loop
    muted
    playsInline
    preload="auto"
  >
    <source src="/images/0410(2).mp4" type="video/mp4" />
  </video>

  {/* overlay (keeps text readable & luxury feel) */}
  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.28),rgba(248,247,244,0.68))]" />

  {/* your content continues below */}

    <div className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(248,247,244,0.58))]" />

    <div className="relative z-[2] mx-auto flex min-h-[64vh] max-w-[1440px] items-center px-4 py-6 sm:min-h-[86vh] sm:px-6 sm:py-16 md:min-h-[92vh] lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative max-w-[1120px] rounded-[2rem] border border-white/50 bg-white/78 p-4 shadow-[0_20px_60px_rgba(44,36,31,0.08)] backdrop-blur sm:p-8 md:p-12"
      >
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#e5e5e5] bg-white px-3 py-2 text-[9px] uppercase tracking-[0.18em] text-[#7d7164] sm:mb-4 sm:px-4 sm:text-xs sm:tracking-[0.25em]">
          <Heart className="h-4 w-4" /> Love, when it is true, asks to be witnessed
        </div>

        <h1 className="font-serif text-3xl leading-tight tracking-[-0.03em] text-[#3a3a3a] sm:text-5xl md:text-6xl">
          {wedding.couple}
        </h1>
        <p className="mt-3 text-sm text-[#6b6b6b] sm:mt-4 sm:text-lg md:text-xl">{wedding.subtitle}</p>

        <div className="mt-5 grid gap-3 min-[520px]:grid-cols-2 lg:mt-8">
          <Card className="rounded-2xl border border-[#e5e5e5] bg-white shadow-[0_10px_28px_rgba(44,36,31,0.05)]">
            <CardContent className="p-4 sm:p-5">
              <div className="mb-3 text-xs uppercase tracking-[0.25em] text-[#a08f7b]">{wedding.ceremony.label}</div>
              <div className="grid gap-3 text-[#6b6b6b]">
                <div className="text-xs italic text-[#8a8176]">{wedding.ceremony.arrivalNote}</div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5" />
                  <div>
                    <div className="text-xs uppercase tracking-wide text-[#a08f7b]">Date</div>
                    <div className="font-medium text-[#444444]">{wedding.date}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5" />
                  <div>
                    <div className="text-xs uppercase tracking-wide text-[#a08f7b]">Time</div>
                    <div className="font-medium text-[#444444]">{wedding.ceremony.time}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5" />
                  <div>
                    <div className="text-xs uppercase tracking-wide text-[#a08f7b]">Venue</div>
                    <div className="font-medium text-[#444444]">{wedding.ceremony.venue}</div>
                    <div className="text-sm text-[#7a7065]">{wedding.ceremony.locationDetail}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-[#e5e5e5] bg-white shadow-[0_10px_28px_rgba(44,36,31,0.05)]">
            <CardContent className="p-4 sm:p-5">
              <div className="mb-3 text-xs uppercase tracking-[0.25em] text-[#a08f7b]">{wedding.reception.label}</div>
              <div className="grid gap-3 text-[#6b6b6b]">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5" />
                  <div>
                    <div className="text-xs uppercase tracking-wide text-[#a08f7b]">Date</div>
                    <div className="font-medium text-[#444444]">{wedding.date}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5" />
                  <div>
                    <div className="text-xs uppercase tracking-wide text-[#a08f7b]">Time</div>
                    <div className="font-medium text-[#444444]">{wedding.reception.doorsOpenTime} - Doors Open</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5" />
                  <div>
                    <div className="text-xs uppercase tracking-wide text-[#a08f7b]">Venue</div>
                    <div className="font-medium text-[#444444]">{wedding.reception.venue}</div>
                    <div className="text-sm text-[#7a7065]">{wedding.reception.locationDetail}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
          <Button
            className="w-full rounded-2xl bg-[#4a433b] text-[#f8f3ec] hover:bg-[#3b352f] sm:w-auto"
            onClick={() => scrollToSection("rsvp")}
          >
            RSVP Now
          </Button>
          <Button
            variant="outline"
            className="w-full rounded-2xl border-[#e5e5e5] bg-white text-[#444444] hover:bg-[#f5f5f5] sm:w-auto"
            onClick={() => scrollToSection("details")}
          >
            View Details
          </Button>
        </div>
      </motion.div>
    </div>
  </div>
</section>

        <section className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="grid grid-cols-3 gap-3 sm:gap-6">
            <CountdownCard label="Days" value={countdown.days} />
            <CountdownCard label="Hours" value={countdown.hours} />
            <CountdownCard label="Minutes" value={countdown.minutes} />
          </div>
        </section>

        <section id="story" className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <div className="grid items-center gap-6 md:grid-cols-2">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <SectionHeading eyebrow="Our Story" title="From one class to one lifetime." />
              <div className="mt-3 whitespace-pre-line text-base leading-5 text-[#6b6b6b] sm:mt-4 sm:leading-6">
                {wedding.story}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <img
                src="/images/story.jpg"
                alt="Couple"
                className="mx-auto h-[320px] w-auto max-w-[320px] rounded-[2rem] object-cover shadow-[0_18px_48px_rgba(44,36,31,0.08)] sm:h-[420px] sm:max-w-[380px]"
              />
            </motion.div>
          </div>
        </section>

        <section id="details" className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <SectionHeading
            eyebrow="Location"
            title="Each part of the day has its own moment"
            description="From a sacred exchange of vows to an evening of celebration, we are honored to share both parts of our day with you. Please note that the ceremony and reception are held at different times and in different locations."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="overflow-hidden rounded-[2rem] border border-[#e5e5e5] bg-[linear-gradient(180deg,#ffffff,#f8f8f8)] shadow-[0_18px_60px_rgba(44,36,31,0.05)]">
              <CardContent className="p-0">
                <div className="border-b border-[#e5e5e5] px-6 py-7 sm:px-8">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#e5e5e5] bg-white px-4 py-2 text-xs uppercase tracking-[0.3em] text-[#8f806d]">
                    <Landmark className="h-4 w-4" /> Ceremony
                  </div>
                  <h3 className="font-serif text-3xl tracking-[-0.02em] text-[#3a3a3a] md:text-4xl">{wedding.ceremony.venue}</h3>
                  <p className="mt-3 min-h-[84px] max-w-[720px] leading-8 text-[#6b6b6b]">{wedding.ceremony.note}</p>
                </div>
                <div className="grid gap-6 px-6 py-7 sm:px-8">
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <DetailInfoCard label="Time" value={wedding.ceremony.time} note={wedding.ceremony.arrivalNote} />
                    <DetailInfoCard label="Date" value={wedding.date} />
                  </div>
                  <div className="rounded-[1.5rem] bg-[#f1f1f1] p-5">
                    <a
                      href={wedding.ceremony.mapLink}
                      target="_blank"
                      rel="noreferrer"
                      className="block overflow-hidden rounded-[1.25rem] border border-[#e5e5e5] bg-white"
                    >
                      <iframe
                        title="San Agustin Church map preview"
                        src="https://www.google.com/maps?q=San+Agustin+Church+Intramuros+Manila&z=16&output=embed"
                        className="h-64 w-full"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </a>
                    <div className="mt-5 flex items-start gap-3 text-[#6b6b6b]">
                      <MapPin className="mt-1 h-5 w-5 text-[#a2907d]" />
                      <div>
                        <div className="text-xs uppercase tracking-[0.25em] text-[#9e8d79]">Location</div>
                        <div className="mt-2">{wedding.ceremony.locationDetail}</div>
                      </div>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <Button asChild className="w-full rounded-2xl bg-[#4a433b] text-[#f8f3ec] hover:bg-[#3b352f] sm:w-auto">
                        <a href={wedding.ceremony.mapLink} target="_blank" rel="noreferrer">
                          Open in Google Maps
                        </a>
                      </Button>
                    </div>
                  </div>
                  <div className="rounded-[1.5rem] border border-[#e5e5e5] bg-white p-5">
                    <div className="text-xs uppercase tracking-[0.25em] text-[#8c7048]">About the Church</div>
                    <ul className="mt-4 space-y-3 text-sm leading-7 text-[#6b6b6b]">
                      {wedding.ceremony.tidbits.map((item, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-[#8c7048]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-[1.5rem] border border-[#e5e5e5] bg-white p-5">
                    <div className="text-xs uppercase tracking-[0.25em] text-[#9e8d79]">Guest Note</div>
                    <p className="mt-3 leading-7 text-[#6b6b6b]">{wedding.ceremony.dressNote}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden rounded-[2rem] border border-[#e5e5e5] bg-[linear-gradient(180deg,#ffffff,#f8f8f8)] shadow-[0_18px_60px_rgba(44,36,31,0.05)]">
              <CardContent className="p-0">
                <div className="border-b border-[#e5e5e5] px-6 py-7 sm:px-8">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#e5e5e5] bg-white px-4 py-2 text-xs uppercase tracking-[0.3em] text-[#8f806d]">
                    <Martini className="h-4 w-4" /> Reception
                  </div>
                  <h3 className="font-serif text-3xl tracking-[-0.02em] text-[#3a3a3a] md:text-4xl">{wedding.reception.venue}</h3>
                  <p className="mt-3 min-h-[84px] max-w-[720px] leading-8 text-[#6b6b6b]">{wedding.reception.momentDescription}</p>
                </div>
                <div className="grid gap-6 px-6 py-7 sm:px-8">
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                   <DetailInfoCard label="Doors Open" value="5:30 PM" />
                    <DetailInfoCard label="Ballroom" value={wedding.reception.room} />
                  </div>
                  <div className="rounded-[1.5rem] bg-[#f1f1f1] p-5">
                    <a
                      href={wedding.reception.mapLink}
                      target="_blank"
                      rel="noreferrer"
                      className="block overflow-hidden rounded-[1.25rem] border border-[#e5e5e5] bg-white"
                    >
                      <iframe
                        title="Conrad Manila map preview"
                        src="https://www.google.com/maps?q=Conrad+Manila+Pasay&z=16&output=embed"
                        className="h-64 w-full"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </a>
                    <div className="mt-5 flex items-start gap-3 text-[#6b6b6b]">
                      <MapPin className="mt-1 h-5 w-5 text-[#a2907d]" />
                      <div>
                        <div className="text-xs uppercase tracking-[0.25em] text-[#9e8d79]">Location</div>
                        <div className="mt-2">{wedding.reception.locationDetail}</div>
                      </div>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <Button asChild className="w-full rounded-2xl bg-[#4a433b] text-[#f8f3ec] hover:bg-[#3b352f] sm:w-auto">
                        <a href={wedding.reception.mapLink} target="_blank" rel="noreferrer">
                          Open in Google Maps
                        </a>
                      </Button>
                    </div>
                  </div>
                  <div className="rounded-[1.5rem] border border-[#e5e5e5] bg-white p-5">
                    <div className="text-xs uppercase tracking-[0.25em] text-[#9e8d79]">Reception Moment</div>
                    <h4 className="mt-2 font-serif text-2xl tracking-[-0.01em] text-[#3a3a3a]">{wedding.reception.momentTitle}</h4>
                    <p className="mt-3 leading-7 text-[#6b6b6b]">{wedding.reception.note}</p>
                  </div>
                  <div className="rounded-[1.5rem] border border-[#e5e5e5] bg-white p-5">
                    <div className="text-xs uppercase tracking-[0.25em] text-[#9e8d79]">Contact</div>
                    <p className="mt-3 whitespace-pre-line leading-7 text-[#6b6b6b]">{wedding.contactInfo}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="schedule" className="mx-auto max-w-[1360px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <SectionHeading eyebrow="Schedule" title="The day at a glance" />
          <div className="space-y-4 sm:space-y-6">
            {[...wedding.schedule.ceremony, ...wedding.schedule.reception].map((item, index) => (
              <ScheduleRow key={`schedule-${index}`} item={item} />
            ))}
          </div>
        </section>

        <section id="dress-code" className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <SectionHeading eyebrow="Dress Code" title="Attire Guide" />
          <Card className="overflow-hidden rounded-[2rem] border border-[#e5e5e5] bg-white shadow-[0_12px_30px_rgba(44,36,31,0.04)]">
            <CardContent className="grid items-center gap-6 p-5 min-[560px]:grid-cols-[1.05fr_0.95fr] sm:gap-10 sm:p-8 md:p-10">
              <div className="flex flex-col items-center justify-center text-center md:px-6">
                <p className="font-serif text-3xl text-[#3a3a3a]">{wedding.dressCode.attire}</p>
                <div className="mt-6 space-y-4 text-left text-[#6b6b6b]">
                  <p>
                    <span className="font-semibold">Gentlemen:</span> {wedding.dressCode.gentlemen}
                  </p>
                  <p>
                    <span className="font-semibold">Ladies:</span> {wedding.dressCode.ladies}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src={wedding.attireGuideImage}
                  alt="Dress code attire guide"
                  className="h-full min-h-[300px] w-full max-w-[420px] rounded-[1.5rem] object-contain bg-[#f3f3f3] p-4"
                />
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <SectionHeading eyebrow="Parents" title="Together with their families" />
          <Card className="rounded-3xl border border-[#e5e5e5] bg-white shadow-[0_12px_30px_rgba(44,36,31,0.04)]">
            <CardContent className="p-6 sm:p-8">
              <div className="grid grid-cols-2 items-start gap-4 text-center sm:gap-8">
                <NamedList names={wedding.parents.left} compact />
                <NamedList names={wedding.parents.right} compact />
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="sponsors" className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <SectionHeading eyebrow="Sponsors" title="With gratitude to our sponsors" />
          <div className="grid gap-6">
            <Card className="rounded-3xl border border-[#e5e5e5] bg-white shadow-[0_12px_30px_rgba(44,36,31,0.04)]">
              <CardContent className="p-4 sm:p-8">
                <h3 className="text-center font-serif text-2xl tracking-[-0.01em] text-[#3a3a3a]">Principal Sponsors</h3>
                <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-4 text-center sm:mt-6 sm:gap-x-8 sm:gap-y-6">
                  <NamedList names={wedding.sponsors.principal.male} compact />
                  <NamedList names={wedding.sponsors.principal.female} compact />
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border border-[#e5e5e5] bg-white shadow-[0_12px_30px_rgba(44,36,31,0.04)]">
              <CardContent className="p-4 sm:p-8">
                <h3 className="text-center font-serif text-2xl tracking-[-0.01em] text-[#3a3a3a]">Secondary Sponsors</h3>
                <div className="mt-4 grid grid-cols-3 gap-x-2 gap-y-4 text-center sm:mt-6 sm:gap-x-6 sm:gap-y-5">
                  <div>
                    <div className="mb-2 text-[10px] uppercase tracking-[0.24em] text-[#a08f7b] sm:mb-3 sm:text-xs sm:tracking-[0.25em]">Candle</div>
                    <NamedList names={wedding.sponsors.secondary.candle} compact />
                  </div>
                  <div>
                    <div className="mb-2 text-[10px] uppercase tracking-[0.24em] text-[#a08f7b] sm:mb-3 sm:text-xs sm:tracking-[0.25em]">Veil</div>
                    <NamedList names={wedding.sponsors.secondary.veil} compact />
                  </div>
                  <div>
                    <div className="mb-2 text-[10px] uppercase tracking-[0.24em] text-[#a08f7b] sm:mb-3 sm:text-xs sm:tracking-[0.25em]">Cord</div>
                    <NamedList names={wedding.sponsors.secondary.cord} compact />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="entourage" className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <SectionHeading eyebrow="Entourage" title="" />
          <div className="grid gap-6">
            <Card className="rounded-3xl border border-[#e5e5e5] bg-white shadow-[0_12px_30px_rgba(44,36,31,0.04)]">
              <CardContent className="p-4 sm:p-8">
                <div className="grid grid-cols-2 gap-x-4 gap-y-6 text-center sm:gap-x-8">
                  <div>
                    <h3 className="font-serif text-xl tracking-[-0.01em] text-[#3a3a3a] sm:text-2xl">Best Men</h3>
                    <div className="mt-3 sm:mt-4">
                      <NamedList names={wedding.entourage.bestMen} compact />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl tracking-[-0.01em] text-[#3a3a3a] sm:text-2xl">Maids of Honor</h3>
                    <div className="mt-3 sm:mt-4">
                      <NamedList names={wedding.entourage.maidsOfHonor} compact />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border border-[#e5e5e5] bg-white shadow-[0_12px_30px_rgba(44,36,31,0.04)]">
              <CardContent className="p-4 sm:p-8">
                <div className="grid grid-cols-2 gap-x-4 gap-y-6 text-center sm:gap-x-8">
                  <div>
                    <h3 className="font-serif text-xl tracking-[-0.01em] text-[#3a3a3a] sm:text-2xl">Groomsmen</h3>
                    <div className="mt-3 sm:mt-4">
                      <NamedList names={wedding.entourage.groomsmen} compact />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl tracking-[-0.01em] text-[#3a3a3a] sm:text-2xl">Bridesmaids</h3>
                    <div className="mt-3 sm:mt-4">
                      <NamedList names={wedding.entourage.bridesmaids} compact />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border border-[#e5e5e5] bg-white shadow-[0_12px_30px_rgba(44,36,31,0.04)]">
              <CardContent className="p-4 sm:p-8">
                <div className="grid grid-cols-3 gap-x-3 gap-y-6 text-center sm:gap-x-6">
                  <div>
                    <h3 className="font-serif text-lg tracking-[-0.01em] text-[#3a3a3a] sm:text-2xl">Ring Bearer</h3>
                    <div className="mt-3 sm:mt-4">
                      <NamedList names={wedding.entourage.ringBearer} compact />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-serif text-lg tracking-[-0.01em] text-[#3a3a3a] sm:text-2xl">Bible Bearer</h3>
                    <div className="mt-3 sm:mt-4">
                      <NamedList names={wedding.entourage.bibleBearer} compact />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-serif text-lg tracking-[-0.01em] text-[#3a3a3a] sm:text-2xl">Coin Bearer</h3>
                    <div className="mt-3 sm:mt-4">
                      <NamedList names={wedding.entourage.coinBearer} compact />
                    </div>
                  </div>
                </div>
                <div className="mt-6 border-t border-[#e5e5e5] pt-6 text-center sm:mt-8 sm:pt-8">
                  <h3 className="font-serif text-xl tracking-[-0.01em] text-[#3a3a3a] sm:text-2xl">Flower Girl</h3>
                  <div className="mt-3 sm:mt-4">
                    <NamedList names={wedding.entourage.flowerGirl} compact />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="gallery" className="mx-auto max-w-[1360px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <SectionHeading eyebrow="Gallery" title="A few favorite moments" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {wedding.gallery.map((src, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="overflow-hidden rounded-[1rem] border border-[#e5e5e5] bg-white shadow-[0_10px_24px_rgba(44,36,31,0.04)] sm:rounded-[1.4rem]"
              >
                <img src={src} alt={`Gallery ${index + 1}`} className="aspect-square h-full w-full object-cover" />
              </motion.div>
            ))}
          </div>
        </section>

        <section id="photos" className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <Card className="overflow-hidden rounded-[2rem] border border-[#e5e5e5] bg-[linear-gradient(180deg,#ffffff,#f7f7f7)] shadow-[0_18px_60px_rgba(44,36,31,0.05)]">
            <CardContent className="grid gap-0 p-0 min-[720px]:grid-cols-[1fr_320px] lg:grid-cols-[1fr_420px] lg:gap-8">
              <div className="p-5 sm:p-8 md:p-10">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#e5e5e5] bg-white px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-[#8d7f6f] sm:text-xs sm:tracking-[0.3em]">
                  <Images className="h-4 w-4" /> Guest Photo &amp; Video Drive
                </div>
                <h2 className="font-serif text-2xl leading-tight tracking-[-0.02em] text-[#3a3a3a] sm:text-4xl md:text-5xl">
                  {wedding.photoDrive.title}
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-[#6b6b6b] sm:mt-4 sm:text-base sm:leading-8">
                  {wedding.photoDrive.description}
                </p>
                <div className="mt-5 rounded-[1.25rem] border border-[#e5e5e5] bg-white p-4 sm:mt-6 sm:rounded-[1.5rem] sm:p-5">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-[#9f8e79] sm:text-xs sm:tracking-[0.25em]">
                    Wedding Hashtag
                  </div>
                  <p className="mt-2 font-serif text-xl leading-tight text-[#3a3a3a] sm:mt-3 sm:text-2xl">{wedding.hashtag}</p>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-3 min-[560px]:grid-cols-2 sm:mt-8 sm:gap-4">
                  <div className="rounded-[1.25rem] bg-white p-4 shadow-[0_10px_24px_rgba(44,36,31,0.04)] sm:rounded-[1.5rem] sm:p-5">
                    <div className="flex items-center gap-3 text-[#3a3a3a]">
                      <QrCode className="h-5 w-5" />
                      <div className="text-xs uppercase tracking-[0.22em] text-[#9f8e79] sm:text-sm sm:tracking-[0.25em]">
                        Quick Access
                      </div>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-[#6b6b6b] sm:mt-3 sm:leading-7">
                      {wedding.photoDrive.quickAccess}
                    </p>
                  </div>
                  <div className="rounded-[1.25rem] bg-white p-4 shadow-[0_10px_24px_rgba(44,36,31,0.04)] sm:rounded-[1.5rem] sm:p-5">
                    <div className="flex items-center gap-3 text-[#3a3a3a]">
                      <Upload className="h-5 w-5" />
                      <div className="text-xs uppercase tracking-[0.22em] text-[#9f8e79] sm:text-sm sm:tracking-[0.25em]">
                        Upload Note
                      </div>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-[#6b6b6b] sm:mt-3 sm:leading-7">
                      {wedding.photoDrive.note}
                    </p>
                  </div>
                </div>
                <div className="mt-5 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
                  <Button asChild className="w-full rounded-2xl bg-[#4a433b] text-[#f8f3ec] hover:bg-[#3b352f] sm:w-auto">
                    <a href={wedding.photoDrive.driveLink} target="_blank" rel="noreferrer">
                      Open Wedding Drive
                    </a>
                  </Button>
                </div>
              </div>
              <div className="border-t border-[#e5e5e5] bg-white p-4 sm:p-6 md:p-10 lg:border-l lg:border-t-0 lg:p-10">
                <div className="mx-auto w-full max-w-[280px] rounded-[1.5rem] border border-[#e5e5e5] bg-[#f3f3f3] p-4 text-center shadow-[0_10px_24px_rgba(44,36,31,0.04)] sm:max-w-[320px] sm:rounded-[2rem] sm:p-5">
                  <img
                    src={wedding.photoDrive.qrImage}
                    alt="Wedding drive QR code"
                    className="mx-auto h-auto w-full max-w-[220px] rounded-2xl border border-[#e5e5e5] bg-white object-contain p-2 sm:max-w-[288px]"
                  />
                  <p className="mt-3 text-sm leading-6 text-[#6b6b6b] sm:mt-4 sm:leading-7">{wedding.photoDrive.qrCaption}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="faq" className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <SectionHeading eyebrow="FAQ" title="Helpful answers" />
          <div className="grid gap-4 min-[700px]:grid-cols-2">
            {wedding.faqs.map((item, index) => (
              <Card key={index} className="rounded-3xl border border-[#e5e5e5] bg-white shadow-[0_12px_30px_rgba(44,36,31,0.04)]">
                <CardContent className="p-6">
                  <h3 className="font-serif text-2xl tracking-[-0.01em] text-[#3a3a3a]">{item.q}</h3>
                  <div className="mt-3">
                    <FaqAnswer answer={item.a} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="rsvp" className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
          <SectionHeading eyebrow="RSVP" title="Let us know if you can make it" />
          <Card className="rounded-[2rem] border border-[#e5e5e5] bg-white shadow-[0_16px_36px_rgba(44,36,31,0.05)]">
            <CardContent className="p-6 sm:p-8">
              <div className="grid gap-5 opacity-70 pointer-events-none">
                <div className="grid gap-4 min-[700px]:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#444444]">Full name</label>
                    <Input
                      value={rsvp.name}
                      onChange={(e) => setRsvp({ ...rsvp, name: e.target.value })}
                      placeholder="Your name"
                      className="rounded-2xl border-[#e5e5e5] bg-white"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#444444]">Contact Number</label>
                    <Input
                      value={rsvp.phone}
                      onChange={(e) => setRsvp({ ...rsvp, phone: e.target.value })}
                      placeholder="09XXXXXXXXX"
                      className="rounded-2xl border-[#e5e5e5] bg-white"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#444444]">Will you attend?</label>
                    <select
                      value={rsvp.attending}
                      onChange={(e) => setRsvp({ ...rsvp, attending: e.target.value })}
                      className="w-full rounded-2xl border border-[#e5e5e5] bg-white px-3 py-2 text-sm text-[#444444]"
                    >
                      <option>Attending both ceremony and reception</option>
                      <option>Attending ceremony only</option>
                      <option>Attending reception only</option>
                      <option>Sorry, I can’t make it</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#444444]">Message</label>
                  <Textarea
                    value={rsvp.notes}
                    onChange={(e) => setRsvp({ ...rsvp, notes: e.target.value })}
                    placeholder="For guests with a plus one, kindly provide their name here and any additional information you’d like to include."
                    className="min-h-[120px] rounded-2xl border-[#e5e5e5] bg-white"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-2xl bg-[#4a433b] text-[#f8f3ec] hover:bg-[#3b352f] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                >
                  {submitting ? "Submitting..." : "Submit RSVP"}
                </Button>
              <p className="text-center text-sm text-[#7a7065] italic">
  RSVP submissions are now closed.
</p>
</div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t border-[#e8e8e8] bg-[#fdfcf9]">
        <div className="mx-auto max-w-[1440px] px-4 py-10 text-center sm:px-6 lg:px-8">
          <div className="font-serif text-2xl tracking-[0.06em] text-[#3a3a3a]">{wedding.couple}</div>
          <p className="mt-2 text-[#6b6b6b]">
            {wedding.date} · {wedding.ceremony.venue} · {wedding.reception.venue}
          </p>
          <p className="mt-4 text-sm text-[#988877]">{wedding.hashtag}</p>
        </div>
      </footer>
    </div>
  );
}
