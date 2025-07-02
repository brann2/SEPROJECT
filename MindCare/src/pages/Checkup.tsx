import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";

interface Message {
  role: "user" | "ai";
  content: string;
}

const defaultQuestions = [
  // Aspek Emosi dan Suasana Hati
  "💭 Bagaimana perasaan dan suasana hati Anda akhir-akhir ini? Ceritakan dengan lebih detail.",
  "💭 Bisakah Anda menjelaskan bagaimana Anda mengelola emosi dalam beberapa hari terakhir?",
  // Aspek Motivasi dan Minat
  "😔 Ceritakan tentang hal-hal yang biasanya Anda nikmati. Apakah masih sama menariknya sekarang?",
  "😔 Bagaimana Anda melihat kemampuan diri dalam menjalani aktivitas sehari-hari?",
  // Aspek Energi dan Fisik
  "😴 Bagaimana kondisi energi dan vitalitas Anda selama seminggu terakhir?",
  "😴 Ceritakan tentang pola tidur dan istirahat Anda. Apakah ada perubahan?",
  // Aspek Sosial
  "🤝 Bagaimana perasaan Anda saat berinteraksi dengan orang lain?",
  "🤝 Seberapa nyaman Anda berbagi perasaan dengan orang terdekat?",
  // Aspek Pikiran dan Konsentrasi
  "🧠 Bagaimana kemampuan Anda dalam berkonsentrasi dan menyelesaikan tugas?",
  "🧠 Apa yang sering Anda pikirkan akhir-akhir ini?",
  // Aspek Harapan dan Dukungan
  "💫 Apa yang membuat Anda merasa lebih baik saat ini?",
  "💫 Bagaimana Anda melihat masa depan? Ceritakan harapan atau keinginan Anda.",
  // Aspek Keselamatan (Opsional)
  "🚨 (Opsional) Apakah ada pikiran yang membuat Anda khawatir tentang keselamatan diri? Jika ya, mohon ceritakan.",
];

const Checkup: React.FC = () => {
  const [answers, setAnswers] = useState<string[]>(
    Array(defaultQuestions.length).fill("")
  );
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleAnswerChange = (idx: number, value: string) => {
    setAnswers((prev) => prev.map((ans, i) => (i === idx ? value : ans)));
  };

  const handleAnalyze = async () => {
    setIsLoading(true);
    setResult(null);
    const prompt = `Sebagai seorang psikolog klinis dengan spesialisasi kesehatan mental, saya akan melakukan analisis profesional berdasarkan informasi yang Anda berikan:

Berikut adalah hasil asesmen dari jawaban Anda:
${defaultQuestions.map((q, i) => `- ${q} ${answers[i]}`).join("\n")}

Berdasarkan DSM-5 (Diagnostic and Statistical Manual of Mental Disorders) dan pendekatan psikodiagnostik, berikut adalah analisis komprehensif:

1. ASESMEN AWAL
• Presentasi Klinis:
[Deskripsikan manifestasi gejala utama]

• Riwayat Gejala:
[Analisis pola dan durasi gejala]

• Faktor Kontekstual:
[Identifikasi faktor pemicu dan protektif]

2. ANALISIS KLINIS
• Aspek Afektif:
[Evaluasi kondisi emosional dan regulasi afek]

• Aspek Kognitif:
[Analisis pola pikir dan proses mental]

• Aspek Behavioral:
[Observasi pola perilaku dan respons]

• Aspek Somatik:
[Evaluasi manifestasi fisik]

• Aspek Interpersonal:
[Analisis fungsi sosial dan relasional]

3. FORMULASI KASUS
• Faktor Predisposisi:
[Identifikasi faktor yang berkontribusi]

• Faktor Presipitasi:
[Analisis pemicu akut]

• Faktor Perpetuasi:
[Evaluasi faktor pemelihara]

• Faktor Protektif:
[Identifikasi sumber daya dan dukungan]

4. KESIMPULAN DIAGNOSTIK
• Gambaran Klinis:
[Sintesis temuan utama]

• Area Perhatian:
[Identifikasi aspek yang memerlukan intervensi]

5. REKOMENDASI TERAPEUTIK
• Intervensi Primer:
[Saran penanganan utama]

• Strategi Manajemen:
[Teknik pengelolaan gejala]

• Dukungan Psikososial:
[Rekomendasi sistem dukungan]

6. LANGKAH-LANGKAH YANG HARUS DILAKUKAN
• Tindakan Segera:
[Langkah-langkah yang harus diambil dalam 24-48 jam ke depan]

• Tindakan Jangka Pendek (1-2 minggu):
[Aktivitas dan perubahan yang perlu dimulai segera]

• Tindakan Jangka Menengah (1-3 bulan):
[Program dan kebiasaan yang perlu dibangun]

• Tindakan Pencegahan:
[Langkah-langkah untuk mencegah memburuknya kondisi]

7. PANDUAN IMPLEMENTASI
• Prioritas Utama:
[Tindakan yang harus diprioritaskan]

• Jadwal Harian:
[Struktur rutinitas yang disarankan]

• Teknik Manajemen Diri:
[Strategi praktis untuk mengelola gejala]

• Indikator Kemajuan:
[Tanda-tanda perbaikan yang perlu diperhatikan]

8. CATATAN PROFESIONAL
• Pertimbangan Khusus:
[Aspek yang memerlukan perhatian lebih lanjut]

• Rekomendasi Rujukan:
[Saran untuk penanganan spesifik jika diperlukan]

Berikan analisis yang profesional, empatis, dan berbasis bukti ilmiah, dengan memperhatikan aspek etika dan kerahasiaan klinis. Sertakan langkah-langkah konkret yang dapat langsung diterapkan.`;

    try {
      const res = await fetch("/api/ai-checkup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (
        data?.error &&
        (data.error.code === 429 ||
          (data.error.message &&
            data.error.message.toLowerCase().includes("quota")))
      ) {
        setResult(
          "Kuota AI habis. Silakan coba lagi nanti atau hubungi admin."
        );
      } else {
        const response = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (response) {
          // Format the response with better styling
          const formattedResponse = response
            .replace(/•/g, "\n•") // Add newline before bullets
            .replace(/\[([^\]]+)\]/g, (_, p1) => `\n${p1}\n`); // Format bracketed text
          setResult(formattedResponse);
        } else {
          setResult("Gagal mendapatkan jawaban dari AI.");
        }
      }
    } catch (err) {
      setResult("Gagal terhubung ke AI.");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-2">
      <div className="w-full max-w-4xl flex flex-col items-start mb-4 relative">
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2 bg-white/90 text-primary rounded-full shadow-md border border-gray-200 hover:bg-blue-50 hover:scale-105 transition-all duration-150 absolute -top-4 left-0 z-10"
          style={{ minWidth: 0 }}
        >
          <Home size={20} />
          <span className="font-medium">Beranda</span>
        </Link>
      </div>
      <h1 className="text-4xl font-extrabold mb-2 text-center text-primary drop-shadow">
        Cek Kesehatan Mental Anda
      </h1>
      <p className="mb-8 text-center text-lg text-gray-600 max-w-2xl">
        Isi kuisoner berikut untuk cek kesehatan mental Anda. AI akan
        menganalisis jawaban Anda secara instan dan akurat.
      </p>
      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-8">
        {/* Kiri: Kuisoner */}
        <div className="flex-1 bg-white/90 rounded-2xl shadow-xl p-6 flex flex-col items-center">
          <div className="w-full mt-2">
            <h3 className="text-lg font-semibold mb-2">
              Asesmen Kesehatan Mental
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Mohon jawab pertanyaan berikut secara jujur dan lengkap untuk
              membantu proses asesmen psikologis Anda.
            </p>
            <form className="flex flex-col gap-3">
              {defaultQuestions.map((q, idx) => (
                <div key={idx} className="flex flex-col">
                  <label className="mb-1 text-gray-700 text-base">{q}</label>
                  <textarea
                    className="border rounded-lg px-3 py-2 text-base focus:outline-primary bg-white/80 min-h-[100px] resize-none"
                    value={answers[idx]}
                    onChange={(e) => handleAnswerChange(idx, e.target.value)}
                    placeholder="Ceritakan dengan detail..."
                  />
                </div>
              ))}
            </form>
          </div>
        </div>
        {/* Kanan: Hasil Analisis */}
        <div className="flex-1 bg-white/90 rounded-2xl shadow-xl p-6 flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4">Hasil Asesmen Klinis</h2>
          <div className="w-full min-h-[120px] bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4 text-gray-800 whitespace-pre-line overflow-y-auto max-h-[600px]">
            {result ? (
              <div className="prose prose-sm">
                {result.split("\n").map((line, i) => (
                  <p
                    key={i}
                    className={`mb-2 ${
                      line.match(/^\d+\./)
                        ? "font-semibold text-primary mt-4"
                        : line.match(/^•/)
                        ? "font-medium text-gray-700 ml-4"
                        : line.match(/^[A-Z][a-z]+ [A-Za-z]+:/)
                        ? "font-medium text-gray-800 ml-2"
                        : ""
                    }`}
                  >
                    {line}
                  </p>
                ))}
              </div>
            ) : (
              <span className="text-gray-400">
                Belum ada hasil. Lengkapi asesmen untuk mendapatkan analisis
                klinis.
              </span>
            )}
          </div>
          <Button
            onClick={handleAnalyze}
            disabled={isLoading || answers.some((a) => !a)}
            className="w-full py-3 text-lg font-semibold rounded-xl"
          >
            {isLoading ? "reasoning..." : "Generate Penjelasan"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Checkup;
