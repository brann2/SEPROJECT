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
  "💭 Apakah Anda sering merasa cemas atau khawatir akhir-akhir ini? (Tidak Pernah / Jarang / Kadang / Sering / Sangat Sering)",
  "💭 Apakah Anda merasa mudah marah atau tersinggung dalam beberapa hari terakhir?",
  // Aspek Motivasi dan Minat
  "😔 Apakah Anda merasa kehilangan minat terhadap hal-hal yang biasanya Anda sukai?",
  "😔 Apakah Anda merasa sulit untuk memulai atau menyelesaikan aktivitas harian Anda?",
  // Aspek Energi dan Fisik
  "😴 Bagaimana tingkat energi Anda selama seminggu terakhir? (Sangat Rendah / Rendah / Biasa Saja / Tinggi / Sangat Tinggi)",
  "😴 Apakah Anda merasa mudah lelah walaupun tidak banyak beraktivitas?",
  // Aspek Sosial
  "🤝 Apakah Anda merasa kesepian walaupun berada di tengah orang lain?",
  "🤝 Apakah Anda merasa nyaman berbicara dengan orang lain tentang perasaan Anda?",
  // Aspek Pikiran dan Konsentrasi
  "🧠 Apakah Anda mengalami kesulitan untuk fokus atau berkonsentrasi?",
  "🧠 Apakah pikiran Anda dipenuhi oleh hal-hal negatif atau pesimis?",
  // Aspek Risiko (Opsional)
  "🚨 (Opsional & Pribadi) Apakah Anda pernah memiliki pikiran untuk menyakiti diri sendiri atau ingin menyerah? (Ya / Tidak) Jika Ya, mohon hubungi layanan bantuan profesional.",
  // Pertanyaan Terbuka (Lanjutan)
  "📋 Apa hal kecil yang membuat Anda merasa lebih baik belakangan ini?",
  "📋 Apa harapan atau keinginan yang ingin Anda capai dalam waktu dekat?",
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
    // Gabungkan jawaban menjadi satu prompt
    const prompt = `Saya ingin melakukan checkup kesehatan mental. Berikut jawaban saya:\n${defaultQuestions
      .map((q, i) => `- ${q} ${answers[i]}`)
      .join(
        "\n"
      )}\nBerikan analisis dan saran kesehatan mental berdasarkan jawaban di atas. Jika pertanyaan di luar kesehatan mental, jawab: 'Saya hanya bisa menjawab seputar kesehatan mental saja.'`;
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
        setResult(
          data?.candidates?.[0]?.content?.parts?.[0]?.text ||
            "Gagal mendapatkan jawaban dari AI."
        );
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
              Kuisoner Kesehatan Mental
            </h3>
            <form className="flex flex-col gap-3">
              {defaultQuestions.map((q, idx) => (
                <div key={idx} className="flex flex-col">
                  <label className="mb-1 text-gray-700 text-base">{q}</label>
                  <input
                    type="text"
                    className="border rounded-lg px-3 py-2 text-base focus:outline-primary bg-white/80"
                    value={answers[idx]}
                    onChange={(e) => handleAnswerChange(idx, e.target.value)}
                    placeholder="Jawaban Anda..."
                  />
                </div>
              ))}
            </form>
          </div>
        </div>
        {/* Kanan: Hasil Analisis */}
        <div className="flex-1 bg-white/90 rounded-2xl shadow-xl p-6 flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4">Hasil Analisis</h2>
          <div className="w-full min-h-[120px] bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4 text-gray-800 whitespace-pre-line">
            {result ? (
              result
            ) : (
              <span className="text-gray-400">
                Belum ada hasil. Isi kuisoner dan klik Generate Penjelasan.
              </span>
            )}
          </div>
          <Button
            onClick={handleAnalyze}
            disabled={isLoading || answers.some((a) => !a)}
            className="w-full py-3 text-lg font-semibold rounded-xl"
          >
            {isLoading ? "Mengirim..." : "Generate Penjelasan"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Checkup;
