import { useState, useRef } from "react";
import { AppState, Doctor, Medication } from "./types";
import Navigation from "./components/Navigation";
import BentoFeatures from "./components/BentoFeatures";
import PricingSection from "./components/PricingSection";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import MobileSimulator from "./components/MobileSimulator";
import InteractiveSandbox from "./components/InteractiveSandbox";
import { 
  Heart, Shield, Video, Flame, Star, ArrowRight, CheckCircle, 
  Smartphone, BellRing, Award, ShieldAlert, HeartHandshake, Smile, Users
} from "lucide-react";

export default function App() {
  // Initialize general doctors array matching screenshot criteria
  const defaultDoctors: Doctor[] = [
    {
      id: "doc-1",
      name: "Dr. Camilo Tauregi",
      specialty: "Therapist",
      rating: 4.9,
      rate: "$65/hour",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=250",
      slots: [
        { day: "Mon", date: 21 },
        { day: "Tue", date: 22 },
        { day: "Wed", date: 23 },
        { day: "Thu", date: 24 },
        { day: "Fri", date: 25 },
        { day: "Sat", date: 26 },
        { day: "Sun", date: 27 },
      ]
    },
    {
      id: "doc-2",
      name: "Dr. John Mitchell",
      specialty: "Cardiologist",
      rating: 4.9,
      rate: "$80/hour",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=250",
      slots: [
        { day: "Mon", date: 21 },
        { day: "Tue", date: 22 },
        { day: "Thu", date: 24 },
        { day: "Fri", date: 25 },
      ]
    }
  ];

  // Initialize general medications
  const defaultMedications: Medication[] = [
    { id: "med-1", name: "Omega-3 Fish Oil", dosage: "1 capsule, with meal", checked: true, type: "pill" },
    { id: "med-2", name: "Magnesium Citrate 200 mg", dosage: "1 tablet, with water", checked: false, type: "tablet" },
    { id: "med-3", name: "Vitamin D3 Liquid Drops", dosage: "5 drops, in the morning", checked: false, type: "droplet" },
  ];

  // Initialize unified app state
  const [appState, setAppState] = useState<AppState>({
    patientName: "Adrian William",
    patientAge: 32,
    bloodPressureSys: 170,
    bloodPressureDia: 80,
    activeScreenId: 2, // Welcome search screen is a brilliant default
    medications: defaultMedications,
    doctors: defaultDoctors,
    selectedDoctorId: "doc-1",
    selectedSlot: "Mon 21",
    videoCallTimer: 0,
    isVideoMuted: false,
    isVideoCameraOff: false,
    labResultsCount: 2,
    checkupsCount: 5,
    contactFormSubmitted: false,
  });

  const handleChangeState = (updater: (prev: AppState) => AppState) => {
    setAppState(prev => updater(prev));
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div id="landing-root" className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden antialiased">
      
      {/* Decorative Hand-Drawn Abstract Waves In Background to match reference canvas layout perfectly */}
      <div className="bg-abstract-waves opacity-20">
        <svg viewBox="0 0 1440 850" fill="none" className="w-full h-full min-h-[850px] absolute top-0 left-0" xmlns="http://www.w3.org/2000/svg">
          <path d="M-80 150C250 250 550 -100 850 180C1150 460 1350 150 1600 300" stroke="#6366f1" strokeWidth="6" strokeLinecap="round" strokeDasharray="1 15" />
          <path d="M-20 400C300 480 620 180 920 420C1220 660 1380 400 1620 540" stroke="#4b5563" strokeWidth="5.5" strokeLinecap="round" strokeDasharray="1 18" />
          <path d="M120 75C400 240 700 80 1000 220C1300 360 1480 200 1720 310" stroke="#6366f1" strokeWidth="2.5" opacity="0.3" />
        </svg>
      </div>

      {/* Navigation component hooks */}
      <Navigation 
        onOpenDemo={() => scrollToSection("simulator")} 
        onOpenContact={() => scrollToSection("hubungi")} 
      />

      {/* SECTION 1: HERO CONTAINER */}
      <header className="pt-32 md:pt-40 pb-20 relative px-6 max-w-7xl mx-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Description column */}
          <div className="lg:col-span-7 select-text">
            
            {/* Soft high-fidelity trust badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#171717] rounded-full shadow-sm border border-neutral-850/80 mb-7 animate-pulse-subtle">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-[11.5px] font-bold uppercase tracking-wider text-white/85">
                Konsultasi Medis Online Terakreditasi Kemenkes RI
              </span>
            </div>

            <h1 className="font-display font-black text-4xl md:text-5.5xl leading-[1.1] tracking-tight text-white">
              Akses Layanan <span className="text-brand-blue relative">Medis Pintar <span className="absolute bottom-1 left-0 w-full h-2 bg-[#171717] -z-10" /></span> <br />
              Dalam Satu Genggaman Anda.
            </h1>

            <p className="mt-6 text-[16px] md:text-[17.5px] text-brand-slate leading-relaxed max-w-2xl font-normal">
              SehatCare menghadirkan solusi telemedis komparatif nomor #1 di Indonesia. Hubungkan rekam medis, rontgen cetak, jadwal vaksinasi, dan konsultasi tatap muka HD bersama puluhan dokter spesialis berlisensi secara aman tanpa hambatan.
            </p>

            {/* Quick CTAs button bar */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => scrollToSection("simulator")}
                className="bg-brand-blue hover:bg-[#4f46e5] text-white font-bold py-4 px-8 rounded-2xl shadow-lg shadow-brand-blue/20 transition-all text-[15px] flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                Coba Demo Interaktif
                <ArrowRight className="w-4.5 h-4.5" />
              </button>
              
              <button
                onClick={() => scrollToSection("cara-kerja")}
                className="bg-[#171717] hover:bg-[#222] text-white/90 border border-[#262626] font-bold py-4 px-8 rounded-2xl shadow-sm transition-all text-[15px] flex items-center justify-center gap-1.5 cursor-pointer"
              >
                Bagaimana Cara Kerja?
              </button>
            </div>

            {/* Micro-trust proof badges */}
            <div className="mt-12 pt-10 border-t border-neutral-800/80 flex flex-wrap items-center gap-8 text-brand-slate">
              <div className="flex items-center gap-2.5">
                <Users className="w-5 h-5 text-brand-blue" />
                <span className="text-[13px] font-bold text-white/90 border-0">100rb+ Pasien Aktif</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Award className="w-5 h-5 text-brand-blue" />
                <span className="text-[13px] font-bold text-white/90 border-0">Sertifikat HIPAA Medis</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Shield className="w-5 h-5 text-brand-blue" />
                <span className="text-[13px] font-bold text-white/90 border-0">Server Data Terenkripsi SSL</span>
              </div>
            </div>

          </div>

          {/* Right Hero Preview: Mini preview mockup peeking or simple branding illustration */}
          <div className="lg:col-span-5 hidden lg:flex items-center justify-center relative">
            <div className="absolute inset-0 bg-brand-blue/5 rounded-[50px] blur-3xl pointer-events-none -z-10" />
            <div className="relative p-6 bg-[#171717] rounded-[40px] border border-[#262626] shadow-2xl flex flex-col gap-4 max-w-[340px] rotate-2 hover:rotate-0 transition-all duration-500">
              <span className="bg-[#0a0a0a] text-brand-blue border border-[#262626] font-black text-[10px] uppercase tracking-wider px-3 py-1 rounded-full self-start">
                Tampilan Dashboard 💡
              </span>
              <h3 className="font-display font-medium text-xl text-white mt-1 leading-snug">
                "Akhirnya ada kartu digital yang bisa terbaca di faskes manapun secara cepat!"
              </h3>
              <div className="flex items-center gap-3.5 mt-2">
                <img 
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100" 
                  alt="Ulasan Adrian" 
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <span className="font-bold text-[13px] text-white">Adrian William</span>
                  <span className="text-[11px] text-brand-slate">Pasien Aktif sejak 2024</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* SECTION 2: BENTO GRID FEATURES HOOK */}
      <BentoFeatures />

      {/* SECTION 3: THE EXPERIMENTAL INTERACTIVE APPS SIMULATOR */}
      <section id="simulator" className="py-24 bg-[#F4F7FE] relative overflow-hidden">
        {/* Background abstract curves */}
        <div className="absolute top-0 right-10 w-[700px] h-[700px] rounded-full bg-brand-blue/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6">
          
          {/* Section banner introduction */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-blue bg-brand-blue/10 border border-brand-blue/20 px-3.5 py-1.5 rounded-full inline-block mb-3 shadow-sm">
              DEMO SIMULATOR INTERAKTIF
            </span>
            <h2 className="font-display font-black text-3.2xl md:text-4.2xl leading-tight text-brand-dark">
              Uji Coba Genggaman <br /> Aplikasi Secara Instan
            </h2>
            <p className="mt-4 text-[14.5px] text-slate-600 leading-relaxed">
              Silakan coba berinteraksi dengan widget handphone di bawah ini. Anda dapat mengklik checklist obat, memicu video call dokter spesialis, atau mengedit informasi menggunakan panel kontrol di sebelah kiri.
            </p>
          </div>

          {/* Grid of Simulator on the Center-Right, and Controller Sandbox on Left */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
            
            {/* LEFT COLUMN: Controls Sandbox Panel */}
            <div className="lg:col-span-5 h-full">
              <InteractiveSandbox 
                state={appState} 
                onChangeState={handleChangeState} 
              />
            </div>

            {/* RIGHT COLUMN: Mobile Simulator Frame */}
            <div className="lg:col-span-7 flex justify-center items-center">
              <MobileSimulator 
                state={appState} 
                onChangeState={handleChangeState} 
              />
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 4: HOW IT WORKS STEP TIMELINE */}
      <section id="cara-kerja" className="py-24 bg-[#0a0a0a] relative">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B25E1A] bg-[#171717] border border-[#262626] px-3 py-1.5 rounded-full inline-block mb-3">
              ALUR KERJA MUDAH
            </span>
            <h2 className="font-display font-black text-3.5xl md:text-4.2xl leading-tight text-white">
              Langkah Sederhana Menuju <br /> Hidup Sehat Tepercaya
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto relative">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-3xl bg-[#171717] text-brand-blue border border-[#262626] flex items-center justify-center font-display font-extrabold text-2xl mb-6 relative group-hover:scale-105 transition-transform">
                1
                <span className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-brand-blue text-white text-[11px] font-black flex items-center justify-center">
                  ✓
                </span>
              </div>
              <h4 className="font-bold text-lg text-white">Simpan Profil &amp; Riwayat</h4>
              <p className="mt-3 text-[13.5px] text-brand-slate leading-relaxed">
                Isi profil kesehatan pribadi, tensi standar, dan gol darah Anda secara cepat di dalam Kartu Personal aplikasi.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-3xl bg-[#171717] text-brand-blue border border-[#262626] flex items-center justify-center font-display font-extrabold text-2xl mb-6 relative group-hover:scale-105 transition-transform">
                2
              </div>
              <h4 className="font-bold text-lg text-white">Konsultasikan Tatap Muka</h4>
              <p className="mt-3 text-[13.5px] text-brand-slate leading-relaxed">
                Pilih puluhan katalog dokter, tentukan slot temu yang pas, dan mulai konsultasi video online HD berenkripsi tinggi.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-3xl bg-[#171717] text-brand-blue border border-[#262626] flex items-center justify-center font-display font-extrabold text-2xl mb-6 relative group-hover:scale-105 transition-transform">
                3
              </div>
              <h4 className="font-bold text-lg text-white">Ikuti Jadwal &amp; Obati</h4>
              <p className="mt-3 text-[13.5px] text-brand-slate leading-relaxed">
                Asisten SehatCare akan mengirimkan notifikasi otomatis harian untuk resep kustom dan kemajuan progres obat Anda.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 5: PRICING HOOK */}
      <PricingSection />

      {/* SECTION 6: CONTACT FORM HOOK */}
      <ContactForm />

      {/* SECTION 7: FOOTER HOOK */}
      <Footer />

    </div>
  );
}
