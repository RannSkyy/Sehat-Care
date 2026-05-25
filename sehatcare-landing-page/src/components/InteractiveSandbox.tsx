import { useState, useEffect, FormEvent } from "react";
import { AppState, Medication } from "../types";
import { 
  Heart, User, Sliders, Pill, AlertTriangle, Play, Pause, ChevronRight, Activity 
} from "lucide-react";

interface InteractiveSandboxProps {
  state: AppState;
  onChangeState: (updater: (prev: AppState) => AppState) => void;
}

export default function InteractiveSandbox({ state, onChangeState }: InteractiveSandboxProps) {
  const [newMedName, setNewMedName] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  // Auto slideshow script
  useEffect(() => {
    let intervalId: any = null;
    if (isPlaying) {
      intervalId = setInterval(() => {
        onChangeState(prev => {
          let nextId = prev.activeScreenId + 1;
          if (nextId > 5) nextId = 1;
          return { ...prev, activeScreenId: nextId };
        });
      }, 3500);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isPlaying]);

  const handleAddMedication = (e: FormEvent) => {
    e.preventDefault();
    if (!newMedName.trim()) return;

    const newMed: Medication = {
      id: `med-${Date.now()}`,
      name: newMedName,
      dosage: "1 tablet, sehabis makan",
      checked: false,
      type: "pill"
    };

    onChangeState(prev => ({
      ...prev,
      medications: [...prev.medications, newMed]
    }));
    setNewMedName("");
  };

  const handleBpChange = (sys: number, dia: number) => {
    onChangeState(prev => ({
      ...prev,
      bloodPressureSys: sys,
      bloodPressureDia: dia
    }));
  };

  return (
    <div className="bg-white rounded-3xl p-6.5 text-brand-dark shadow-xl border border-slate-200/60 flex flex-col justify-between h-full">
      <div>
        {/* Module Title */}
        <div className="flex items-center gap-2.5 mb-6.5">
          <div className="w-9 h-9 rounded-xl bg-brand-blue flex items-center justify-center">
            <Sliders className="w-4.5 h-4.5 text-white" />
          </div>
          <div>
            <h3 className="font-display font-bold text-[17.5px] leading-tight text-neutral-900">Pengontrol Sandbox</h3>
            <p className="text-[11.5px] text-slate-500 mt-0.5">Edit untuk melihat visualisasi langsung</p>
          </div>
        </div>

        {/* Input Name field */}
        <div className="mb-5 flex flex-col gap-2">
          <label htmlFor="sandbox-name-input" className="text-[12.5px] font-bold text-neutral-800 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-brand-blue" /> Nama Pasien (Live-sync)
          </label>
          <input
            id="sandbox-name-input"
            type="text"
            value={state.patientName}
            maxLength={22}
            onChange={(e) => onChangeState(prev => ({ ...prev, patientName: e.target.value || "Pasien" }))}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-[13.5px] text-neutral-900 focus:outline-none focus:ring-1 focus:ring-brand-blue focus:bg-white transition-colors"
          />
        </div>

        {/* Tensi darah sliders */}
        <div className="mb-6 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-[12.5px] font-bold text-neutral-800 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-red-500" /> Tensi Darah (Sistolik): <span className="font-mono text-red-500 font-extrabold">{state.bloodPressureSys}</span>
            </span>
          </div>
          <input
            type="range"
            min="90"
            max="190"
            value={state.bloodPressureSys}
            onChange={(e) => handleBpChange(parseInt(e.target.value), state.bloodPressureDia)}
            className="w-full accent-brand-blue opacity-90 hover:opacity-100 cursor-pointer"
          />
          
          <div className="flex items-center justify-between mt-1">
            <span className="text-[12.5px] font-bold text-neutral-800 flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-brand-blue" /> Tensi Darah (Diastolik): <span className="font-mono text-brand-blue font-extrabold">{state.bloodPressureDia}</span>
            </span>
          </div>
          <input
            type="range"
            min="50"
            max="110"
            value={state.bloodPressureDia}
            onChange={(e) => handleBpChange(state.bloodPressureSys, parseInt(e.target.value))}
            className="w-full accent-brand-blue opacity-90 hover:opacity-100 cursor-pointer"
          />

          {state.bloodPressureSys >= 140 && (
            <div className="bg-red-50 border border-red-200 p-2.5 rounded-xl flex items-center gap-2 mt-1.5 text-red-700">
              <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
              <span className="text-[11px] leading-tight font-medium">Fase Hipertensi Terdeteksi! Status indikator pada simulator akan berubah merah otomatis.</span>
            </div>
          )}
        </div>

        {/* Doctor selector */}
        <div className="mb-6 flex flex-col gap-2">
          <label htmlFor="sandbox-doctor-select" className="text-[12.5px] font-bold text-neutral-800">Pilih Spesialis Terkait</label>
          <select
            id="sandbox-doctor-select"
            value={state.selectedDoctorId}
            onChange={(e) => onChangeState(prev => ({ ...prev, selectedDoctorId: e.target.value }))}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-[13px] text-neutral-900 focus:outline-none focus:ring-1 focus:ring-brand-blue focus:bg-white transition-colors"
          >
            {state.doctors.map(doc => (
              <option key={doc.id} value={doc.id}>{doc.name} ({doc.specialty})</option>
            ))}
          </select>
        </div>

        {/* Add custom prescribed medicine */}
        <div className="mb-6 border-t border-slate-200/80 pt-4.5">
          <span className="text-[12.5px] font-bold text-neutral-800 block mb-2.5 flex items-center gap-1.5">
            <Pill className="w-3.5 h-3.5 text-emerald-600" /> Resepkan Obat Baru (Pill Tracker)
          </span>
          <form onSubmit={handleAddMedication} className="flex gap-2">
            <input
              type="text"
              value={newMedName}
              maxLength={22}
              onChange={(e) => setNewMedName(e.target.value)}
              placeholder="Cth: Vitamin C 500mg"
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[12.5px] text-neutral-900 focus:outline-none focus:ring-1 focus:ring-brand-blue focus:bg-white transition-colors"
            />
            <button
              type="submit"
              className="bg-brand-blue hover:bg-brand-blue/90 font-bold px-3 py-2 rounded-xl text-[12.5px] text-white transition-colors cursor-pointer"
            >
              Tambah
            </button>
          </form>
        </div>
      </div>

      {/* Auto Loops Slideshow triggers */}
      <div className="bg-slate-50 p-4.5 rounded-2xl border border-slate-200/50 mt-4.5">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[12.5px] font-extrabold leading-none text-neutral-900">Putar Slideshow</span>
            <span className="text-[10px] text-slate-500 mt-1.5 leading-tight">Otomatis beralih ke 5 screen</span>
          </div>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            id="sandbox-play-btn"
            className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 cursor-pointer ${
              isPlaying ? "bg-red-500 text-white" : "bg-brand-blue hover:bg-brand-blue/90 text-white"
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
