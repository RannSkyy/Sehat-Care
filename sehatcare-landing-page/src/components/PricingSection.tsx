import { Check, Info } from "lucide-react";

export default function PricingSection() {
  const tiers = [
    {
      name: "Basic (Pemula)",
      price: "Gratis",
      period: "Seterusnya",
      desc: "Sangat cocok untuk pemantauan data kesehatan harian dasar dan rujukan ringan.",
      features: [
        "1 Profil Kartu Medis Digital",
        "Pelacak Obat (Maks 2 obat harian)",
        "Chat konsultasi umum (Maks 3x sebulan)",
        "Riwayat rekam medis (Maks 30 hari terakhir)",
        "Koneksi 1 perangkat pintar (wearable)",
      ],
      isPopular: false,
      btnText: "Mulai Gratis",
      cardStyle: "bg-[#171717] border border-[#262626] shadow-md text-white/90",
    },
    {
      name: "Pro (Rekomendasi)",
      price: "Rp 89.000",
      period: "per bulan",
      desc: "Layanan utama untuk konsultasi tatap muka intensif bersama dokter spesialis.",
      features: [
        "Profil Kartu Medis Digital Premium",
        "Pelacak Obat Tanpa Batas dengan Pengingat SMS/WA",
        "Video Call dokter spesialis 24/7 (Tanpa Batas)",
        "Akses hasil lab & resep digital instan",
        "Riwayat rekam medis tak terbatas waktu",
        "Integrasi hasil rontgen visual (Hand X-Ray)",
        "Diskon obat & suplemen hingga 15%",
      ],
      isPopular: true,
      btnText: "Langganan Sekarang",
      cardStyle: "bg-[#171717] border-2 border-brand-blue shadow-xl scale-102 relative text-white/90",
    },
    {
      name: "Family (Keluarga)",
      price: "Rp 195.000",
      period: "per bulan",
      desc: "Perlindungan kesehatan digital menyeluruh untuk seluruh anggota keluarga.",
      features: [
        "Hingga 5 profil anggota keluarga",
        "Semua fitur paket Pro untuk setiap profil",
        "Dashboard pemantauan orang tua jarak jauh",
        "Prioritas antrean video call dokter spesialis",
        "Pengiriman obat resep gratis ke rumah",
        "Asisten kesehatan WhatsApp prioritas harian",
      ],
      isPopular: false,
      btnText: "Pilih Paket Keluarga",
      cardStyle: "bg-[#0f0f1c] text-white/90 border border-indigo-900/50 shadow-xl",
    },
  ];

  return (
    <section id="harga" className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background shape */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-brand-blue/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-blue bg-[#171717] border border-neutral-850 px-3 py-1.5 rounded-full inline-block mb-3">
            HARGA PAKET LAYANAN
          </span>
          <h2 className="font-display font-black text-3.5xl md:text-4.2xl leading-tight text-brand-dark">
            Komitmen Kesehatan Terbaik <br /> Dengan Investasi Terjangkau
          </h2>
          <p className="mt-4 text-[15.5px] text-brand-slate leading-relaxed">
            Pilihlah rencana keanggotaan SehatCare yang paling sesuai dengan kebutuhan pemantauan medis dan gaya hidup Anda saat ini. Tanpa biaya tersembunyi.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-transform duration-300 hover:scale-[1.03] ${tier.cardStyle}`}
            >
              {tier.isPopular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-blue text-white text-[11px] font-black uppercase tracking-wider px-4 py-1.5 rounded-full shadow-md">
                  Paling Populer 🔥
                </span>
              )}

              <div>
                <h3 className={`font-display font-bold text-xl text-white`}>
                  {tier.name}
                </h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className={`font-display font-extrabold text-3.5xl md:text-4.5xl leading-none`}>
                    {tier.price}
                  </span>
                  <span className={`text-[13px] font-medium text-brand-slate`}>
                    / {tier.period}
                  </span>
                </div>
                <p className={`mt-3 text-[13.5px] leading-relaxed text-brand-slate`}>
                  {tier.desc}
                </p>

                <div className="mt-8 border-t border-[#262626] pt-6">
                  <ul className="flex flex-col gap-3.5">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-emerald-500/10 text-emerald-400`}>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                        <span className={`text-[13.5px] leading-tight text-white/90`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10">
                <button
                  className={`w-full py-3.5 px-6 rounded-2xl font-bold text-[14.5px] transition-all active:scale-[0.98] ${
                    index === 1
                      ? "bg-brand-blue hover:bg-brand-blue/95 text-white shadow-lg shadow-brand-blue/20"
                      : index === 2
                      ? "bg-indigo-600 hover:bg-indigo-500 text-white"
                      : "bg-[#0a0a0a] border border-[#262626] hover:bg-neutral-900 text-brand-blue"
                  }`}
                  id={`pricing-btn-${index}`}
                >
                  {tier.btnText}
                </button>
                <div className="mt-3 flex items-center justify-center gap-1.5">
                  <Info className={`w-3.5 h-3.5 text-brand-slate`} />
                  <span className={`text-[11px] text-brand-slate`}>
                    Bisa dibatalkan kapan saja
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
