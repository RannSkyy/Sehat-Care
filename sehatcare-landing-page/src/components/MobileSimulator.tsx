import { useState, useEffect } from "react";
import { 
  ArrowLeft, RefreshCw, MoreHorizontal, Heart, Droplets, Calendar, 
  ArrowRight, ShieldCheck, Search, Star, Bell, Plus, PhoneOff, Mic, MicOff, 
  Video, VideoOff, Check, CheckSquare, Square, ClipboardList, RefreshCcw 
} from "lucide-react";
import { AppState, Medication } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface MobileSimulatorProps {
  state: AppState;
  onChangeState: (updater: (prev: AppState) => AppState) => void;
}

export default function MobileSimulator({ state, onChangeState }: MobileSimulatorProps) {
  const { 
    patientName, patientAge, bloodPressureSys, bloodPressureDia, 
    activeScreenId, medications, doctors, selectedDoctorId, selectedSlot,
    videoCallTimer, isVideoMuted, isVideoCameraOff, labResultsCount, checkupsCount
  } = state;

  // Track timer increment on active screen 5
  useEffect(() => {
    let timerId: any = null;
    if (activeScreenId === 5) {
      timerId = setInterval(() => {
        onChangeState(prev => ({
          ...prev,
          videoCallTimer: prev.videoCallTimer + 1
        }));
      }, 1000);
    }
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [activeScreenId]);

  const currentDoctor = doctors.find(doc => doc.id === selectedDoctorId) || doctors[0];

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleScreenChange = (id: number) => {
    onChangeState(prev => ({ ...prev, activeScreenId: id }));
  };

  const toggleMedication = (id: string) => {
    onChangeState(prev => ({
      ...prev,
      medications: prev.medications.map(med => 
        med.id === id ? { ...med, checked: !med.checked } : med
      )
    }));
  };

  // Helper calculation for Screen 4 radial progress
  const checkedMedsCount = medications.filter(m => m.checked).length;
  const totalMedsCount = medications.length;
  const progressRatio = totalMedsCount > 0 ? (checkedMedsCount / totalMedsCount) : 0.5;

  return (
    <div id="interactive-phone-container" className="flex flex-col items-center select-none">
      
      {/* Target Screen Selector Tabs for rapid navigation on desktop landing page */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6 max-w-md">
        {[1, 2, 3, 4, 5].map((id) => (
          <button
            key={id}
            id={`tab-screen-btn-${id}`}
            onClick={() => handleScreenChange(id)}
            className={`cursor-pointer text-[12px] font-bold px-3 py-1.5 rounded-full transition-all ${
              activeScreenId === id 
                ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20 scale-105"
                : "bg-white text-slate-700 hover:bg-slate-50 hover:text-brand-blue border border-slate-200/80 shadow-sm"
            }`}
          >
            {id === 1 && "1. Kartu Medis"}
            {id === 2 && "2. Cari Dokter"}
            {id === 3 && "3. Pelak Obat"}
            {id === 4 && "4. Progres Obat"}
            {id === 5 && "5. Video Call"}
          </button>
        ))}
      </div>

      {/* Main SmartPhone Frame */}
      <div 
        id="phone-device-body"
        className="w-[370px] h-[780px] bg-[#e2e8f0] rounded-[55px] p-3.5 shadow-[0_25px_60px_-15px_rgba(30,45,74,0.15)] border-4 border-[#cbd5e1] relative flex flex-col justify-between overflow-hidden"
      >
        {/* Dynamic Notch / Island */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-6.5 bg-black rounded-full z-30 flex items-center justify-between px-3 text-[10px] text-white/90">
          <span className="font-bold text-[9px] tracking-tight">14:01</span>
          <div className="w-12 h-3.5 bg-neutral-900 rounded-full border border-neutral-800 flex items-center justify-end px-1 gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4.5 h-2.5 border border-white/50 rounded-[3px] p-[1px] flex">
              <div className="w-full h-full bg-white rounded-[1px]" />
            </div>
          </div>
        </div>

        {/* Side physical buttons indicators decoratives */}
        <div className="absolute top-32 -left-1 w-1 h-12 bg-slate-350 rounded-r z-0" />
        <div className="absolute top-48 -left-1 w-1 h-16 bg-slate-350 rounded-r z-0" />
        <div className="absolute top-40 -right-1 w-1 h-20 bg-slate-350 rounded-l z-0" />

        {/* Outer Phone Screen container with soft rounded corners */}
        <div className="w-full h-full bg-[#EEF2F6] rounded-[42px] overflow-hidden relative flex flex-col pt-9 z-10 font-sans shadow-inner">
          
          <AnimatePresence mode="wait">
            
            {/* SCREEN 1: Personal Card Layout */}
            {activeScreenId === 1 && (
              <motion.div
                key="screen-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="w-full h-full flex flex-col justify-between p-4.5 overflow-y-auto no-scrollbar"
                id="screen-view-1"
              >
                {/* Header Navbar */}
                <div className="flex items-center justify-between mb-4 mt-1">
                  <button 
                    onClick={() => handleScreenChange(2)}
                    className="w-9 h-9 items-center justify-center flex bg-white rounded-xl text-brand-dark/80 active:scale-95 shadow-sm"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <span className="font-display font-bold text-[14.5px] text-brand-dark">Personal Card</span>
                  <button 
                    onClick={() => {
                      onChangeState(prev => ({
                        ...prev,
                        patientName: "Adrian William",
                        bloodPressureSys: 170,
                        bloodPressureDia: 80
                      }));
                    }}
                    title="Reset Simulator"
                    className="w-9 h-9 items-center justify-center flex bg-white rounded-xl text-brand-dark/80 active:slide-up-arrow shadow-sm group"
                  >
                    <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                  </button>
                </div>

                {/* Patient Profile badge Card */}
                <div className="bg-white rounded-3xl p-4.5 shadow-sm border border-white flex items-center justify-between gap-3 mb-4.5">
                  <div className="flex items-center gap-3">
                    <img 
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200" 
                      alt="Avatar Adrian" 
                      className="w-12 h-12 rounded-2xl object-cover shrink-0 border border-gray-100"
                    />
                    <div className="flex flex-col">
                      <span className="font-bold text-[14.5px] text-brand-dark leading-tight">{patientName}</span>
                      <span className="text-[11.5px] text-brand-slate font-medium mt-0.5">{patientAge} years</span>
                    </div>
                  </div>
                  <button className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-brand-dark/60">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>

                {/* Health Metrics Tiles (Blood Pressure, General Test) */}
                <div className="grid grid-cols-2 gap-3.5 mb-4.5">
                  {/* Grid Left: Blood Pressure */}
                  <div className="bg-white rounded-3xl p-4 shadow-sm border-2 border-transparent hover:border-brand-blue/30 transition-all flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
                        <Heart className="w-4 h-4 text-red-500 fill-red-500/20" />
                      </div>
                      <span className="text-[10px] text-brand-slate font-medium font-mono">14:01</span>
                    </div>
                    
                    <div className="my-3">
                      <span className="font-display font-extrabold text-[22px] tracking-tight text-brand-dark">
                        {bloodPressureSys}/{bloodPressureDia}
                      </span>
                    </div>

                    {/* Blood Pressure bar indicator lines chart similar to the reference! */}
                    <div className="flex items-end justify-between h-10 w-full mb-1">
                      <div className="w-1.5 h-6 bg-brand-blue/20 rounded-full relative flex items-end">
                        <div className="w-full h-4 bg-brand-blue rounded-full" />
                      </div>
                      <div className="w-1.5 h-8 bg-brand-blue/20 rounded-full relative flex items-end">
                        <div className="w-full h-5 bg-brand-blue rounded-full" />
                      </div>
                      <div className="w-1.5 h-10 bg-red-400/20 rounded-full relative flex items-end">
                        <div className="w-full h-8 bg-red-500 rounded-full" />
                      </div>
                      <div className="w-1.5 h-7 bg-brand-blue/20 rounded-full relative flex items-end">
                        <div className="w-full h-3 bg-brand-blue rounded-full" />
                      </div>
                      <div className="w-1.5 h-8 bg-brand-blue/20 rounded-full relative flex items-end">
                        <div className="w-full h-6 bg-brand-blue rounded-full" />
                      </div>
                      <div className="w-1.5 h-6 bg-red-400/20 rounded-full relative flex items-end">
                        <div className="w-full h-5 bg-red-500 rounded-full" />
                      </div>
                      <div className="w-1.5 h-9 bg-brand-blue/20 rounded-full relative flex items-end">
                        <div className="w-full h-4 bg-brand-blue rounded-full" />
                      </div>
                    </div>

                    <span className="text-[10px] uppercase font-bold tracking-wider text-brand-dark/80">Blood Pressure</span>
                  </div>

                  {/* Grid Right: General Blood Test */}
                  <div className="bg-white rounded-3xl p-4 shadow-sm border border-transparent flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                        <Droplets className="w-4 h-4 text-brand-blue fill-brand-blue/10" />
                      </div>
                      <span className="text-[10px] text-brand-slate font-medium">21 Dec</span>
                    </div>

                    <div className="my-3.5">
                      <h4 className="font-display font-extrabold text-[15.5px] leading-tight text-brand-dark">
                        General <br /> Blood Test
                      </h4>
                    </div>

                    {/* Yellow round toggles identical to reference */}
                    <div className="flex items-center gap-2 mt-1">
                      <button className="w-7 h-7 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-700">
                        <span className="text-[10px] font-bold">🔕</span>
                      </button>
                      <button className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center text-blue-700">
                        <span className="text-[10px]">💡</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Check-up Schedule with circle arrow and blue highlight */}
                <div className="bg-brand-blue rounded-3xl p-4.5 text-white shadow-md relative overflow-hidden flex flex-col justify-between min-h-[145px] mb-4.5">
                  <div className="flex items-start justify-between relative z-10">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                      <Calendar className="w-4.5 h-4.5 text-white" />
                    </div>
                    {/* Badge count 5 */}
                    <span className="bg-red-500 text-white text-[9.5px] font-extrabold uppercase px-2 py-0.5 rounded-full shadow-sm">
                      {checkupsCount} slots
                    </span>
                  </div>

                  <div className="relative z-10 mt-3">
                    <h4 className="font-display font-extrabold text-[14.5px]">Check-up schedule</h4>
                    <p className="text-[10px] text-white/80 leading-normal mt-1.5 font-normal max-w-[210px]">
                      Stay on top of your health with a personalized schedule for medical check-ups designed just for you.
                    </p>
                  </div>

                  {/* Corner action clicker */}
                  <button 
                    onClick={() => handleScreenChange(4)}
                    className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-white text-brand-blue flex items-center justify-center shadow-lg active:scale-90 transition-transform"
                  >
                    <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-0.5" />
                  </button>
                </div>

                {/* Bottom twin widgets (Lab results, Hand X-ray) */}
                <div className="grid grid-cols-2 gap-3.5">
                  {/* Lab Results Tile */}
                  <div 
                    onClick={() => handleScreenChange(4)}
                    className="bg-white rounded-3xl p-3.5 shadow-sm border border-transparent cursor-pointer hover:border-brand-blue/30 transition-all flex flex-col gap-2.5"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-xl bg-violet-50 flex items-center justify-center">
                        <span className="text-violet-600 text-[11px] font-black">🧪</span>
                      </div>
                      <span className="bg-red-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">
                        {labResultsCount}
                      </span>
                    </div>
                    <span className="text-[11.5px] font-extrabold text-brand-dark">Lab Results</span>
                  </div>

                  {/* Hand X-Ray Tile */}
                  <div 
                    onClick={() => handleScreenChange(4)}
                    className="bg-white rounded-3xl p-3.5 shadow-sm border border-transparent cursor-pointer hover:border-brand-blue/30 transition-all flex flex-col gap-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11.5px] font-extrabold text-brand-dark">Hand x-ray</span>
                    </div>
                    
                    {/* Simulated hand X-Ray visual thumbnail with dynamic scan glow */}
                    <div className="h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center relative overflow-hidden">
                      <span className="text-[11px]">🦴</span>
                      <div className="absolute inset-0 bg-red-500/25 animate-pulse" />
                      {/* Red glow marker coordinates */}
                      <span className="absolute top-1.5 left-1/3 w-1.5 h-1.5 rounded-full bg-red-500 ring-2 ring-red-300 animate-ping" />
                    </div>
                  </div>
                </div>

              </motion.div>
            )}

            {/* SCREEN 2: Home Welcome Search & Therapists */}
            {activeScreenId === 2 && (
              <motion.div
                key="screen-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="w-full h-full flex flex-col p-4.5 overflow-y-auto no-scrollbar"
                id="screen-view-2"
              >
                {/* Welcoming Top Row */}
                <div className="flex items-center justify-between mb-4.5 mt-1">
                  <div className="flex items-center gap-2.5">
                    <img 
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200" 
                      alt="Avatar Adrian" 
                      className="w-10 h-10 rounded-xl object-cover shrink-0 border border-white shadow-sm"
                    />
                    <div className="flex flex-col">
                      <span className="text-[10px] text-brand-slate font-semibold leading-none">Welcome back 👋</span>
                      <span className="font-display font-extrabold text-[13.5px] text-brand-dark mt-1 leading-none">
                        {patientName}
                      </span>
                    </div>
                  </div>

                  <button className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-brand-dark shadow-sm relative">
                    <Bell className="w-4.5 h-4.5 text-brand-dark" />
                    <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
                  </button>
                </div>

                {/* Big Search Input Field */}
                <div className="relative mb-5 shadow-sm">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-slate" />
                  <input 
                    type="text" 
                    placeholder="Search doctor, spec..." 
                    className="w-full h-11 pl-11 pr-4 bg-white rounded-2xl text-[12.5px] font-medium border border-transparent focus:outline-none focus:ring-1 focus:ring-brand-blue"
                  />
                </div>

                {/* Categories Slider Icons */}
                <div className="flex items-center justify-between gap-2.5 mb-5 overflow-x-auto no-scrollbar pb-1">
                  {[
                    { label: "Cardiologist", icon: "🩺" },
                    { label: "Dentist", icon: "🦷" },
                    { label: "Therapist", icon: "🧠" },
                    { label: "Geneticist", icon: "🧬" }
                  ].map((category, idx) => (
                    <div key={idx} className="flex flex-col items-center shrink-0">
                      <button 
                        onClick={() => {
                          onChangeState(prev => ({
                            ...prev,
                            selectedDoctorId: idx === 1 ? "doc-2" : "doc-1"
                          }));
                        }}
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center text-md shadow-sm transition-all active:scale-95 ${
                          (idx === 2 && currentDoctor.specialty === "Therapist") || (idx === 0 && currentDoctor.specialty === "Cardiologist")
                            ? "bg-brand-blue text-white shadow-brand-blue/20"
                            : "bg-white text-brand-dark hover:bg-gray-50"
                        }`}
                      >
                        {category.icon}
                      </button>
                      <span className="text-[9.5px] font-bold text-brand-slate mt-1.5">{category.label}</span>
                    </div>
                  ))}
                </div>

                {/* Dr. Camilo Tauregi Card Frame matching reference screen exactly! */}
                <div className="bg-white rounded-3xl p-4.5 shadow-sm relative overflow-hidden border border-white flex flex-col mb-4.5">
                  
                  {/* Top tags row inside therapist layout */}
                  <div className="flex items-center justify-between mb-3.5">
                    <span className="bg-[#FAF0E6]/80 text-[#B25E1A] text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Star className="w-2.5 h-2.5 fill-current" /> {currentDoctor.rating}
                    </span>
                    <button 
                      onClick={() => handleScreenChange(5)}
                      className="w-8 h-8 rounded-full bg-blue-50 text-brand-blue hover:bg-brand-blue hover:text-white flex items-center justify-center transition-all shadow-sm"
                      title="Mulai Video Call"
                    >
                      <span className="text-[14px]">↗</span>
                    </button>
                  </div>

                  {/* Doctor Info column & image stacked neatly */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex flex-col">
                      <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#B25E1A]">
                        {currentDoctor.specialty}
                      </span>
                      <h4 className="font-display font-extrabold text-[16px] text-brand-dark leading-tight mt-1">
                        {currentDoctor.name}
                      </h4>
                      <span className="text-[13px] font-extrabold text-[#3E7DF5] mt-1.5">
                        {currentDoctor.rate}
                      </span>
                    </div>

                    <img 
                      src={currentDoctor.image} 
                      alt={currentDoctor.name} 
                      className="w-20 h-20 rounded-2xl object-cover shrink-0 border border-gray-100 shadow-sm"
                    />
                  </div>

                  {/* Book slots label */}
                  <span className="text-[10px] font-extrabold text-brand-slate uppercase tracking-wider mb-2">Available Slots</span>
                  {/* Slots Slider horizontal */}
                  <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
                    {currentDoctor.slots.map((slot, idx) => {
                      const displayStr = `${slot.day} ${slot.date}`;
                      const isSelected = selectedSlot === displayStr;
                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            onChangeState(prev => ({ ...prev, selectedSlot: displayStr }));
                          }}
                          className={`px-2.5 py-2.5 rounded-xl shrink-0 text-center flex flex-col items-center justify-center transition-all ${
                            isSelected
                              ? "bg-brand-blue text-white shadow-sm shadow-brand-blue/20 scale-102 font-extrabold"
                              : "bg-[#F4F7FE] text-brand-dark/75 hover:bg-gray-150 font-medium"
                          }`}
                        >
                          <span className="text-[8px] uppercase tracking-wide leading-none">{slot.day}</span>
                          <span className="text-[11.5px] font-extrabold mt-1 leading-none">{slot.date}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Secondary doctor peeking row */}
                <div className="bg-white rounded-3xl p-3.5 shadow-sm flex items-center justify-between gap-3 mb-1">
                  <div className="flex items-center gap-3">
                    <img 
                      src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=150" 
                      alt="Dr John" 
                      className="w-10 h-10 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex flex-col">
                      <span className="bg-red-50 text-red-600 font-bold text-[8px] uppercase px-1.5 py-0.5 rounded-full inline-block self-start">Cardiologist</span>
                      <span className="font-extrabold text-[12px] text-brand-dark mt-1">Dr. John Mitchell</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      onChangeState(prev => ({
                        ...prev,
                        selectedDoctorId: "doc-2",
                        activeScreenId: 2
                      }));
                    }}
                    className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-brand-dark/85 text-[12px]"
                  >
                    ↗
                  </button>
                </div>

              </motion.div>
            )}

            {/* SCREEN 3: Medication Tracker */}
            {activeScreenId === 3 && (
              <motion.div
                key="screen-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="w-full h-full flex flex-col justify-between p-4.5 overflow-y-auto no-scrollbar"
                id="screen-view-3"
              >
                {/* Upper Status Block */}
                <div>
                  <div className="flex items-center justify-between mb-4.5 mt-1">
                    <button onClick={() => handleScreenChange(2)} className="w-8 h-8 rounded-lg bg-white/70 flex items-center justify-center">
                      <ArrowLeft className="w-4 h-4 text-brand-dark" />
                    </button>
                    <span className="text-[12.5px] font-bold text-brand-dark uppercase tracking-widest bg-yellow-50 px-2.5 py-1 rounded-full text-yellow-700">Pelacak Obat</span>
                    <div className="w-4 h-4" />
                  </div>

                  {/* BP status bar miniature */}
                  <div className="bg-white rounded-3xl p-4 shadow-sm border border-white flex items-center justify-between gap-3 mb-4.5">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-brand-slate">Blood pressure</span>
                      <span className="font-display font-extrabold text-[18px] text-brand-dark mt-0.5">
                        {bloodPressureSys}/{bloodPressureDia}
                      </span>
                    </div>

                    {/* Miniature wave graphics identical to reference */}
                    <div className="flex items-end h-7 gap-1">
                      <div className="w-1 h-3 bg-red-500 rounded-full" />
                      <div className="w-1 h-4 bg-red-400 rounded-full animate-pulse-subtle" />
                      <div className="w-1 h-6 bg-brand-blue rounded-full" />
                      <div className="w-1 h-5 bg-brand-blue rounded-full" />
                      <div className="w-1 h-2 bg-brand-blue rounded-full" />
                    </div>
                  </div>

                  {/* Checklist Section Label */}
                  <div className="flex items-center justify-between mb-3.5">
                    <span className="text-[11.5px] font-extrabold text-brand-dark">Prescribed Items</span>
                    <span className="text-[11px] font-medium text-brand-blue">{checkedMedsCount} of {totalMedsCount} checked</span>
                  </div>

                  {/* Virtual Medication Checklist */}
                  <div className="flex flex-col gap-3">
                    {medications.map((med) => (
                      <div 
                        key={med.id}
                        onClick={() => toggleMedication(med.id)}
                        className={`p-3.5 rounded-2.5xl flex items-center justify-between gap-3 shadow-inner border cursor-pointer transition-all ${
                          med.checked 
                            ? "bg-[#F3FAF5] border-emerald-100/50" 
                            : "bg-white border-transparent hover:border-gray-150"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                            med.type === "pill" ? "bg-red-50" : med.type === "tablet" ? "bg-blue-50" : "bg-cyan-50"
                          }`}>
                            {med.type === "pill" && <span className="text-md">💊</span>}
                            {med.type === "tablet" && <span className="text-md">🔘</span>}
                            {med.type === "droplet" && <span className="text-md">💦</span>}
                          </div>

                          <div className="flex flex-col">
                            <span className={`text-[12.5px] font-extrabold leading-tight ${med.checked ? "line-through text-brand-slate" : "text-brand-dark"}`}>
                              {med.name}
                            </span>
                            <span className="text-[10px] text-brand-slate font-medium mt-0.5">{med.dosage}</span>
                          </div>
                        </div>

                        {/* Interactive custom checklist box */}
                        <div className={`w-5.5 h-5.5 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                          med.checked ? "bg-emerald-500 text-white" : "border-2 border-gray-200"
                        }`}>
                          {med.checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Simulated Tab Bar matching Screens bottom control visuals */}
                <div className="bg-white rounded-2.5xl p-2.5 shadow-sm flex items-center justify-between gap-4 mt-5">
                  <button 
                    onClick={() => handleScreenChange(1)}
                    className="flex-1 py-2 flex.5 flex items-center justify-center gap-1 text-[11px] font-bold text-brand-slate hover:text-brand-blue"
                  >
                    <ClipboardList className="w-4 h-4" /> Reports
                  </button>
                  <button 
                    onClick={() => handleScreenChange(4)}
                    className="flex-1 py-2 flex.5 flex items-center justify-center gap-1 text-[11px] font-bold text-brand-slate hover:text-brand-blue"
                  >
                    <Calendar className="w-4 h-4" /> Progress
                  </button>
                </div>

              </motion.div>
            )}

            {/* SCREEN 4: Weekly Progress Dashboard */}
            {activeScreenId === 4 && (
              <motion.div
                key="screen-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="w-full h-full flex flex-col p-4.5 overflow-y-auto no-scrollbar"
                id="screen-view-4"
              >
                {/* Back Arrow Header */}
                <div className="flex items-center justify-between mb-4.5 mt-1">
                  <button onClick={() => handleScreenChange(2)} className="w-8 h-8 rounded-lg bg-white/70 flex items-center justify-center">
                    <ArrowLeft className="w-4 h-4 text-brand-dark" />
                  </button>
                  <span className="font-display font-bold text-[14px]">Today's Progress</span>
                  <div className="w-4 h-4" />
                </div>

                {/* Calendar Slider Day row (Wed 23 Active) */}
                <div className="flex items-center justify-between bg-white rounded-3xl p-3.5 gap-2 mb-4.5 shadow-sm">
                  {[
                    { day: "Mon", date: 21 },
                    { day: "Tue", date: 22 },
                    { day: "Wed", date: 23, active: true },
                    { day: "Thu", date: 24 },
                    { day: "Fri", date: 25 },
                  ].map((item, idx) => (
                    <div 
                      key={idx} 
                      className={`flex-1 py-2 rounded-xl text-center flex flex-col items-center justify-center transition-colors ${
                        item.active 
                          ? "bg-brand-blue text-white shadow-sm" 
                          : "text-brand-dark/70 hover:bg-gray-50"
                      }`}
                    >
                      <span className="text-[8px] uppercase tracking-wide">{item.day}</span>
                      <span className="text-[11.5px] font-extrabold mt-0.5">{item.date}</span>
                    </div>
                  ))}
                </div>

                {/* Progress Wheel Indicator Widget Frame matching reference */}
                <div className="bg-white rounded-3xl p-5 shadow-sm border border-blue-50/10 mb-4.5 flex items-center justify-between gap-4">
                  <div className="flex flex-col max-w-[140px]">
                    <span className="bg-indigo-50 text-indigo-700 font-extrabold text-[8.5px] uppercase tracking-wider px-2 py-0.5 rounded-full inline-block self-start">Current Plan</span>
                    <h4 className="font-display font-extrabold text-[15.5px] text-brand-dark leading-tight mt-2.5">Today's Progress</h4>
                    <p className="text-[10px] text-brand-slate leading-normal mt-1.5 font-medium">Keep taking your prescribed medicine to maintain stable indicators.</p>
                  </div>

                  {/* SVG circular progress indicator drawing */}
                  <div className="w-24 h-24 shrink-0 flex items-center justify-center relative">
                    <svg className="w-full h-full transform -rotate-95">
                      <circle 
                        cx="48" 
                        cy="48" 
                        r="34" 
                        stroke="#F0F4FF" 
                        strokeWidth="8" 
                        fill="transparent" 
                      />
                      <circle 
                        cx="48" 
                        cy="48" 
                        r="34" 
                        stroke="#3E7DF5" 
                        strokeWidth="8.5" 
                        fill="transparent" 
                        strokeDasharray="213"
                        strokeDashoffset={213 - (213 * progressRatio)}
                        strokeLinecap="round"
                        className="transition-all duration-500"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="font-display font-extrabold text-[18px] text-brand-dark leading-none">
                        {checkedMedsCount}/{totalMedsCount}
                      </span>
                      <span className="text-[9px] text-brand-slate font-bold mt-1 uppercase tracking-wide">Pills</span>
                    </div>
                  </div>
                </div>

                {/* Simulated Agenda Card showing pill checklist quick shortcut */}
                <span className="text-[10.5px] font-extrabold uppercase text-brand-slate tracking-wider mb-2.5 inline-block">Today's Activities</span>
                <div className="flex flex-col gap-3">
                  {medications.slice(0, 2).map((med, idx) => (
                    <div key={idx} className="bg-white rounded-3xl p-4 shadow-sm border border-white flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                          <Check className={`w-4 h-4 ${med.checked ? 'text-emerald-500' : 'text-brand-slate'}`} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[12.5px] font-extrabold text-brand-dark leading-tight">{med.name}</span>
                          <span className="text-[9.5px] text-brand-slate mt-0.5">{med.dosage}</span>
                        </div>
                      </div>
                      <span className={`text-[9.5px] font-extrabold uppercase px-2 py-0.5 rounded-full ${med.checked ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                        {med.checked ? "Done" : "Pending"}
                      </span>
                    </div>
                  ))}
                </div>

              </motion.div>
            )}

            {/* SCREEN 5: HD Video Consultation Specialist */}
            {activeScreenId === 5 && (
              <motion.div
                key="screen-5"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full relative overflow-hidden bg-slate-950 flex flex-col justify-between"
                id="screen-view-5"
              >
                
                {/* Simulated Camera Feed Doctor background cover illustration */}
                {!isVideoCameraOff ? (
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={currentDoctor.image} 
                      alt="Doctor HD Cover View" 
                      className="w-full h-full object-cover opacity-85 filter brightness-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/50" />
                  </div>
                ) : (
                  <div className="absolute inset-0 z-0 bg-slate-900 flex items-center justify-center flex-col text-slate-400">
                    <VideoOff className="w-12 h-12 stroke-[1.5] text-slate-500 mb-3" />
                    <span className="text-[11.5px] font-bold text-center">Your doctor is active, <br /> your camera is turned OFF</span>
                  </div>
                )}

                {/* Floating Patient (Adrian William) PiP Camera Frame right corner */}
                <div className="absolute top-18 right-3.5 w-24 h-32 bg-slate-900 rounded-2xl border-2 border-white/20 shadow-lg overflow-hidden z-20">
                  <img 
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150" 
                    alt="Patient PiP Screen" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-1 right-1.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white" />
                </div>

                {/* Top overlay headers controls */}
                <div className="relative z-10 p-4.5 flex items-start justify-between w-full mt-1">
                  <button 
                    onClick={() => handleScreenChange(2)}
                    className="w-8 h-8 rounded-lg bg-black/45 backdrop-blur-md text-white flex items-center justify-center border border-white/10 active:scale-90 transition-transform"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>

                  {/* Red pulsing live timer */}
                  <div className="bg-black/55 backdrop-blur-md px-3 py-1.5 rounded-full border border-red-500/30 flex items-center gap-1.5 shadow-md">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    <span className="text-red-500 text-[10.5px] font-mono font-bold leading-none">
                      {formatTimer(videoCallTimer)}
                    </span>
                  </div>
                </div>

                {/* Lower stack information with call controls console */}
                <div className="relative z-10 p-4.5 text-white flex flex-col gap-4">
                  <div>
                    {/* Specialty indicator */}
                    <span className="text-[9.5px] text-white/70 font-extrabold uppercase tracking-widest bg-brand-blue/35 px-2.5 py-1 rounded-full inline-block backdrop-blur-md">
                      Telehealth Consultation
                    </span>
                    <h3 className="font-display font-black text-xl leading-tight mt-2">{currentDoctor.name}</h3>
                    <p className="text-[10px] text-white/75 mt-1 font-medium font-mono">ID: SEC-2024-81109 • Specialist</p>
                  </div>

                  {/* Operational console buttons frame */}
                  <div className="bg-black/65 backdrop-blur-md rounded-3xl p-3.5 border border-white/10 flex items-center justify-around gap-2">
                    
                    {/* Toggle mute */}
                    <button 
                      onClick={() => onChangeState(prev => ({ ...prev, isVideoMuted: !prev.isVideoMuted }))}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                        isVideoMuted ? "bg-red-500 text-white" : "bg-white/10 hover:bg-white/20 text-white"
                      }`}
                      title={isVideoMuted ? "Unmute Mic" : "Mute Mic"}
                    >
                      {isVideoMuted ? <MicOff className="w-4.5 h-4.5" /> : <Mic className="w-4.5 h-4.5" />}
                    </button>

                    {/* RED END CALL BUTTON identical to reference structure! */}
                    <button 
                      onClick={() => handleScreenChange(2)}
                      className="w-13 h-13 rounded-full bg-red-600 hover:bg-red-700 active:scale-95 text-white flex items-center justify-center shadow-lg shadow-red-600/30 transition-all cursor-pointer"
                      title="Akhiri Panggilan Video"
                    >
                      <PhoneOff className="w-5.5 h-5.5" />
                    </button>

                    {/* Toggle camera video icon */}
                    <button 
                      onClick={() => onChangeState(prev => ({ ...prev, isVideoCameraOff: !prev.isVideoCameraOff }))}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                        isVideoCameraOff ? "bg-red-500 text-white" : "bg-white/10 hover:bg-white/20 text-white"
                      }`}
                      title={isVideoCameraOff ? "Turn On Camera" : "Turn Off Camera"}
                    >
                      {isVideoCameraOff ? <VideoOff className="w-4.5 h-4.5" /> : <Video className="w-4.5 h-4.5" />}
                    </button>

                  </div>
                </div>

              </motion.div>
            )}
            
          </AnimatePresence>

        </div>
      </div>

      {/* Mini state helper tooltip */}
      <span className="text-[11px] text-brand-slate font-medium text-center mt-3 max-w-sm leading-normal">
        *Klik tombol navigasi di atas handphone atau di dalam fungsionalitas handphone untuk berpindah di antara 5 screenshot referensi secara instan.
      </span>

    </div>
  );
}
