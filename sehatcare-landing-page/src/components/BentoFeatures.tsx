import { Contact, Calendar, Pill, Video } from "lucide-react";

export default function BentoFeatures() {
  const features = [
    {
      id: "bento-id-card",
      title: "Kartu Medis Digital (Personal Card)",
      desc: "Simpan identitas kesehatan Anda, golongan darah, riwayat alergi, dan data vital pribadi dalam satu kartu digital interaktif yang siap dipindai di klinik mitra.",
      icon: <Contact className="w-6 h-6 text-brand-blue" />,
      color: "bg-[#171717] border-[#262626]",
      pill: "Identitas Instan",
      colSpan: "md:col-span-2",
      badgeColor: "bg-brand-blue/10 text-brand-blue"
    },
    {
      id: "bento-telehealth",
      title: "Konsultasi Video HD 24/7",
      desc: "Tatap muka langsung dengan Dr. Camilo Tauregi atau puluhan spesialis lainnya langsung dari ponsel Anda. Dilengkapi enkripsi end-to-end medis standar tinggi.",
      icon: <Video className="w-6 h-6 text-emerald-400" />,
      color: "bg-[#171717] border-[#262626]",
      pill: "Layanan 24 Jam",
      colSpan: "md:col-span-1",
      badgeColor: "bg-emerald-500/10 text-emerald-400"
    },
    {
      id: "bento-tracker",
      title: "Asisten Pelacak Obat",
      desc: "Ingatkan asupan nutrisi dan suplemen harian Anda seperti Omega-3 Fish Oil, Magnesium Citrate, atau resep dokter secara terjadwal otomatis dengan status keberhasilan.",
      icon: <Pill className="w-6 h-6 text-amber-500" />,
      color: "bg-[#171717] border-[#262626]",
      pill: "Pill Tracker",
      colSpan: "md:col-span-1",
      badgeColor: "bg-amber-500/10 text-amber-400"
    },
    {
      id: "bento-sched",
      title: "Sistem Reservasi Terpadu",
      desc: "Atur jadwal rontgen, tes darah umum, atau kunjungan klinik dengan mudah. Atur pengingat notifikasi otomatis sehingga tak ada jadwal yang terlewat.",
      icon: <Calendar className="w-6 h-6 text-indigo-400" />,
      color: "bg-[#171717] border-[#262626]",
      pill: "Kalender Cerdas",
      colSpan: "md:col-span-2",
      badgeColor: "bg-indigo-500/10 text-indigo-400"
    }
  ];

  return (
    <section id="fitur" className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      {/* Decorative blurry circle */}
      <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-brand-blue/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-blue bg-[#171717] border border-neutral-800 px-3 py-1.5 rounded-full inline-block mb-3">
            FITUR UNGGULAN SEHATCARE
          </span>
          <h2 className="font-display font-black text-3.5xl md:text-4.5xl leading-tight text-brand-dark">
            Solusi Kesehatan Cerdas, <br className="hidden sm:inline" /> Dirancang Khusus Untuk Anda
          </h2>
          <p className="mt-4 text-[16px] text-brand-slate leading-relaxed">
            SehatCare mengintegrasikan seluruh elemen rekam medis dan konsultasi jarak jauh ke dalam satu platform mobile yang simpel dan sangat mudah dipahami.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feat) => (
            <div
              key={feat.id}
              id={feat.id}
              className={`rounded-3xl p-8 border ${feat.color} ${feat.colSpan} transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/40 flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#0a0a0a] border border-neutral-800 flex items-center justify-center shadow-sm">
                    {feat.icon}
                  </div>
                  <span className={`text-[12px] font-bold px-3 py-1.5 rounded-full ${feat.badgeColor}`}>
                    {feat.pill}
                  </span>
                </div>
                <h3 className="font-display font-bold text-xl text-brand-dark leading-snug">
                  {feat.title}
                </h3>
                <p className="mt-3 text-[14.5px] text-brand-dark/70 leading-relaxed">
                  {feat.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#262626] flex items-center gap-2 group cursor-pointer">
                <span className="text-[13px] font-bold text-brand-dark group-hover:text-brand-blue transition-colors">
                  Pelajari selengkapnya
                </span>
                <span className="text-[14px] text-brand-slate group-hover:translate-x-1 group-hover:text-brand-blue transition-all">
                  →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section bar */}
        <div className="mt-16 bg-gradient-to-r from-brand-blue to-indigo-600 rounded-3xl p-8 md:p-12 text-white shadow-xl shadow-brand-blue/20 relative overflow-hidden">
          {/* Wave background shapes */}
          <div className="absolute inset-0 opacity-10">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
              <path d="M0,50 Q25,70 50,50 T100,50 L100,100 L0,100 Z" fill="white" />
            </svg>
          </div>

          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="font-display font-extrabold text-3xl md:text-4.5xl leading-none">99.4%</div>
              <p className="text-[13px] text-white/85 font-medium mt-2">Kepuasan Pengguna</p>
            </div>
            <div>
              <div className="font-display font-extrabold text-3xl md:text-4.5xl leading-none">150+</div>
              <p className="text-[13px] text-white/85 font-medium mt-2">Dokter Spesialis Aktif</p>
            </div>
            <div>
              <div className="font-display font-extrabold text-3xl md:text-4.5xl leading-none">500k+</div>
              <p className="text-[13px] text-white/85 font-medium mt-2">Resep Selesai</p>
            </div>
            <div>
              <div className="font-display font-extrabold text-3xl md:text-4.5xl leading-none">&lt; 3 Mnt</div>
              <p className="text-[13px] text-white/85 font-medium mt-2">Waktu Respon Konsultasi</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
