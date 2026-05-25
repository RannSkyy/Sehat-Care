import { Heart, Facebook, Twitter, Instagram, Linkedin, Award, ShieldCheck } from "lucide-react";

export default function Footer() {
  const links = [
    {
      title: "Layanan Kesehatan",
      items: [
        { label: "Spesialis Kardiologi", href: "#" },
        { label: "Konsultasi Terapi", href: "#" },
        { label: "Pemeriksaan Umum", href: "#" },
        { label: "Tes Laboratorium", href: "#" },
        { label: "Pengantaran Obat", href: "#" },
      ]
    },
    {
      title: "Perusahaan",
      items: [
        { label: "Tentang Kami", href: "#" },
        { label: "Karir Pendukung", href: "#" },
        { label: "Hubungan Mitra", href: "#" },
        { label: "Siaran Pers", href: "#" },
        { label: "Kontak Resmi", href: "#hubungi" },
      ]
    },
    {
      title: "Kebijakan & Privasi",
      items: [
        { label: "Syarat & Ketentuan", href: "#" },
        { label: "Kebijakan Privasi", href: "#" },
        { label: "Kode Etik Medis", href: "#" },
        { label: "Kebijakan Cookie", href: "#" },
        { label: "Pusat Bantuan", href: "#" },
      ]
    }
  ];

  return (
    <footer className="bg-[#0a0a0a] text-white border-t border-[#262626] relative overflow-hidden">
      <div className="absolute top-0 right-1/3 w-80 h-80 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />
      
      {/* Upper links section */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand-blue flex items-center justify-center">
                <Heart className="w-5 h-5 text-white fill-white/10" />
              </div>
              <span className="font-display font-semibold text-xl tracking-tight">
                Sehat<span className="text-brand-blue">Care</span>
              </span>
            </div>
            
            <p className="text-[13px] text-white/70 leading-relaxed">
              SehatCare berkomitmen memberikan akses telemedis standar tinggi yang aman, tepercaya, dan nyaman bagi seluruh lapisan keluarga di Indonesia guna mewujudkan masa depan bangsa yang bugar dan produktif.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              <a href="#" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-brand-blue hover:text-white text-white/80 flex items-center justify-center transition-all" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-brand-blue hover:text-white text-white/80 flex items-center justify-center transition-all" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-brand-blue hover:text-white text-white/80 flex items-center justify-center transition-all" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-brand-blue hover:text-white text-white/80 flex items-center justify-center transition-all" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links cols */}
          {links.map((col, index) => (
            <div key={index} className="flex flex-col gap-5">
              <h4 className="font-bold text-[14px] uppercase tracking-wider text-brand-blue">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.items.map((item, idx) => (
                  <li key={idx}>
                    <a href={item.href} className="text-[13px] text-white/60 hover:text-white hover:translate-x-0.5 transition-all inline-block">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Standards & Badges */}
          <div className="flex flex-col gap-5">
            <h4 className="font-bold text-[14px] uppercase tracking-wider text-brand-blue">
              Standar Regulasi
            </h4>
            <div className="flex flex-col gap-3">
              <div className="bg-white/5 p-3.5 rounded-xl border border-white/5 flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
                <div>
                  <h5 className="font-bold text-[11.5px]">Sertifikasi PSE</h5>
                  <p className="text-[10px] text-white/60 mt-0.5">Kominfo RI No. 04221</p>
                </div>
              </div>

              <div className="bg-white/5 p-3.5 rounded-xl border border-white/5 flex items-center gap-3">
                <Award className="w-6 h-6 text-brand-blue shrink-0" />
                <div>
                  <h5 className="font-bold text-[11.5px]">Terdaftar Kemenkes</h5>
                  <p className="text-[10px] text-white/60 mt-0.5">Asosiasi Telemedis Nasional</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legal lower bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-white/40 text-center md:text-left">
            &copy; {new Date().getFullYear()} SehatCare Indonesia (PT SehatCare Teknologi Nusantara). Hak Cipta Dilindungi Undang-Undang.
          </p>
          <div className="flex items-center gap-4 text-[11px] text-white/30">
            <span>Server Terenkripsi SSL 256-Bit</span>
            <span>•</span>
            <span>Standar Medis HIPAA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
