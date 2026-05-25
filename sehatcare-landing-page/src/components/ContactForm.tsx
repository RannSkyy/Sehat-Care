import { useState, FormEvent } from "react";
import { Mail, Phone, MapPin, Send, HelpCircle, CheckCircle, Clock } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    subject: "Konsultasi Umum",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Nama lengkap wajib diisi";
    if (!formData.email.trim()) {
      newErrors.email = "Alamat email wajib diisi";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Alamat email tidak valid";
    }
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = "Nomor WhatsApp wajib diisi";
    } else if (!/^\+?[0-9]{9,15}$/.test(formData.whatsapp.replace(/[\s-]/g, ""))) {
      newErrors.whatsapp = "Nomor WhatsApp tidak valid (Gunakan format angka)";
    }
    if (!formData.message.trim()) newErrors.message = "Pesan Anda wajib diisi";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      // Simulate API submit
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 1500);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      whatsapp: "",
      subject: "Konsultasi Umum",
      message: "",
    });
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <section id="hubungi" className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-brand-blue/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Info Details */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-blue bg-[#171717] border border-neutral-800 px-3 py-1.5 rounded-full inline-block mb-3">
                HUBUNGI KAMI
              </span>
              <h2 className="font-display font-black text-3.5xl md:text-4.2xl leading-none text-brand-dark">
                Ada Pertanyaan? <br /> Tim Kami Siap Membantu Anda
              </h2>
              <p className="mt-5 text-[15.5px] text-brand-slate leading-relaxed">
                Butuh bantuan instalasi aplikasi, integrasi klinik, atau konsultasi seputar kerja sama keagenan medis? Silakan isi formulir atau hubungi saluran bantuan resmi kami.
              </p>

              <div className="mt-10 flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#171717] border border-[#262626] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-brand-blue" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[15px] text-brand-dark">Email Resmi</h4>
                    <p className="text-[13.5px] text-brand-slate mt-0.5">halo@sehatcare.co.id</p>
                    <p className="text-[12px] text-brand-blue font-medium mt-0.5">Dibalas dalam waktu &lt; 2 jam</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-900/30 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[15px] text-brand-dark">Respons Cepat WhatsApp</h4>
                    <p className="text-[13.5px] text-brand-slate mt-0.5">+62 821-4432-8800</p>
                    <p className="text-[12px] text-emerald-400 font-medium mt-0.5">Senin - Minggu (24 Jam Online)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-900/30 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[15px] text-brand-dark">Kantor Pusat</h4>
                    <p className="text-[13.5px] text-brand-slate leading-normal mt-0.5">
                      Menara SehatCare, Lantai 18-20, <br />
                      Kawasan Sudirman Central Business District, Jakarta Selatan
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-[#171717]/50 p-6 rounded-2xl border border-neutral-800/80 flex items-center gap-4">
              <Clock className="w-8 h-8 text-brand-blue shrink-0 animate-pulse-subtle" />
              <p className="text-[12.5px] text-brand-dark/80 leading-relaxed font-semibold">
                Tim layanan pelanggan kami online setiap hari tanpa hari libur untuk melayani kebutuhan darurat.
              </p>
            </div>
          </div>

          {/* Form Card */}
          <div className="lg:col-span-7 bg-[#171717] rounded-3xl border border-[#262626] p-8 shadow-2xl relative shadow-black/40">
            {isSubmitted ? (
              <div className="py-12 text-center flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6 shadow-inner animate-pulse-subtle">
                  <CheckCircle className="w-12 h-12 stroke-[2.5]" />
                </div>
                <h3 className="font-display font-bold text-2xl text-white">
                  Pesan Terkirim dengan Sukses!
                </h3>
                <p className="mt-3 text-[14.5px] text-brand-slate max-w-md mx-auto leading-relaxed">
                  Halo <span className="font-semibold text-white">{formData.name}</span>, pesan konsultasi Anda telah tersimpan ke sistem kami. Konselor SehatCare akan mengirim kabar balasan ke email <span className="underline">{formData.email}</span> atau WhatsApp dalam beberapa menit.
                </p>
                <div className="mt-8 flex gap-3">
                  <button
                    onClick={handleReset}
                    className="bg-brand-blue text-white font-bold py-3 px-8 rounded-xl text-[14px] shadow-md shadow-brand-blue/20 hover:bg-brand-blue/90 transition-all active:scale-[0.98]"
                  >
                    Kirim Pesan Baru
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <input type="hidden" name="contact-secret-token" value="SC-AISTUDIO-2026" />
                <h3 className="font-display font-bold text-xl text-white">
                  Kirim Formulir Konsultasi
                </h3>

                {/* Name */}
                <div>
                  <label htmlFor="form-name" className="block text-[13px] font-bold text-white/85 mb-1.5">
                    Nama Lengkap Anda
                  </label>
                  <input
                    id="form-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Contoh: Adrian William"
                    className={`w-full px-4 py-3 rounded-xl border text-[14px] transition-colors focus:outline-none focus:ring-2 focus:ring-brand-blue/25 ${
                      errors.name ? "border-red-400 bg-red-500/15 text-white" : "border-[#262626] bg-[#0a0a0a] text-white"
                    }`}
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1 font-semibold">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email */}
                  <div>
                    <label htmlFor="form-email" className="block text-[13px] font-bold text-white/85 mb-1.5">
                      Alamat Email Aktif
                    </label>
                    <input
                      id="form-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Contoh: adrian@example.com"
                      className={`w-full px-4 py-3 rounded-xl border text-[14px] transition-colors focus:outline-none focus:ring-2 focus:ring-brand-blue/25 ${
                        errors.email ? "border-red-400 bg-red-500/15 text-white" : "border-[#262626] bg-[#0a0a0a] text-white"
                      }`}
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1 font-semibold">{errors.email}</p>}
                  </div>

                  {/* Whatsapp */}
                  <div>
                    <label htmlFor="form-whatsapp" className="block text-[13px] font-bold text-white/85 mb-1.5">
                      Nomor WhatsApp (Angka saja)
                    </label>
                    <input
                      id="form-whatsapp"
                      type="text"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      placeholder="Contoh: 082144328800"
                      className={`w-full px-4 py-3 rounded-xl border text-[14px] transition-colors focus:outline-none focus:ring-2 focus:ring-brand-blue/25 ${
                        errors.whatsapp ? "border-red-400 bg-red-500/15 text-white" : "border-[#262626] bg-[#0a0a0a] text-white"
                      }`}
                    />
                    {errors.whatsapp && <p className="text-red-400 text-xs mt-1 font-semibold">{errors.whatsapp}</p>}
                  </div>
                </div>

                {/* Subject Dropdown */}
                <div>
                  <label htmlFor="form-subject" className="block text-[13px] font-bold text-white/85 mb-1.5">
                    Topik / Kebutuhan Hubungan
                  </label>
                  <select
                    id="form-subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#262626] text-[14px] focus:outline-none focus:ring-2 focus:ring-brand-blue/25 bg-[#0a0a0a] text-white"
                  >
                    <option value="Konsultasi Umum">Konsultasi Umum Telemedis</option>
                    <option value="Kemitraan Klinik">Kemitraan Rumah Sakit / Klinik</option>
                    <option value="Bantuan Aplikasi">Masalah Teknis &amp; Bug Aplikasi</option>
                    <option value="Kerja Sama Dokter">Pendaftaran Dokter Spesialis Baru</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="form-message" className="block text-[13px] font-bold text-white/85 mb-1.5">
                    Isi Pesan / Pertanyaan
                  </label>
                  <textarea
                    id="form-message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tulis rincian pesan atau keluhan medis Anda secara ringkas di sini..."
                    className={`w-full px-4 py-3 rounded-xl border text-[14px] transition-colors focus:outline-none focus:ring-2 focus:ring-brand-blue/25 ${
                      errors.message ? "border-red-400 bg-red-500/15 text-white" : "border-[#262626] bg-[#0a0a0a] text-white"
                    }`}
                  />
                  {errors.message && <p className="text-red-400 text-xs mt-1 font-semibold">{errors.message}</p>}
                </div>

                {/* Submit button */}
                <button
                  id="form-submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-blue hover:bg-brand-blue/90 disabled:bg-blue-800 text-white font-bold py-3.5 px-6 rounded-xl text-[14px] shadow-lg shadow-brand-blue/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sedang mengirim pesan...
                    </>
                  ) : (
                    <>
                      <Send className="w-4.5 h-4.5" />
                      Kirim Pesan Sekarang
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
