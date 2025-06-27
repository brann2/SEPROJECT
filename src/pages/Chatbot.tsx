import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Send, Bot, User, Home } from "lucide-react";
import { Link } from "react-router-dom";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Halo! Saya adalah AI Assistant untuk kesehatan mental. Saya di sini untuk memberikan tips harian dan afirmasi positif. Bagaimana perasaan Anda hari ini?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const dailyTips = [
    "Cobalah teknik pernapasan 4-7-8: Tarik napas selama 4 detik, tahan 7 detik, hembuskan 8 detik.",
    "Luangkan 5 menit untuk menulis 3 hal yang Anda syukuri hari ini.",
    "Lakukan peregangan ringan untuk mengurangi ketegangan di tubuh.",
    "Dengarkan musik yang menenangkan selama 10 menit.",
    "Jalan kaki selama 15 menit di luar ruangan untuk vitamin D alami.",
  ];

  const affirmations = [
    "Anda lebih kuat dari yang Anda pikirkan.",
    "Setiap hari adalah kesempatan baru untuk tumbuh.",
    "Anda layak mendapatkan kebahagiaan dan kedamaian.",
    "Perasaan ini akan berlalu, dan Anda akan melewatinya.",
    "Anda sudah melakukan yang terbaik dengan kemampuan yang Anda miliki.",
  ];

  const responses = {
    sedih:
      "Saya memahami Anda sedang merasa sedih. Perasaan ini normal dan akan berlalu. Cobalah untuk menarik napas dalam-dalam dan ingatlah bahwa Anda tidak sendirian.",
    cemas:
      "Kecemasan bisa sangat mengganggu. Cobalah teknik grounding 5-4-3-2-1: Sebutkan 5 hal yang bisa Anda lihat, 4 hal yang bisa Anda sentuh, 3 hal yang bisa Anda dengar, 2 hal yang bisa Anda cium, dan 1 hal yang bisa Anda rasakan.",
    stres:
      "Stres adalah respons alami tubuh. Cobalah untuk mengidentifikasi sumber stres dan ambil istirahat sejenak. Pernapasan dalam bisa membantu menenangkan sistem saraf Anda.",
    tips: dailyTips[Math.floor(Math.random() * dailyTips.length)],
    afirmasi: affirmations[Math.floor(Math.random() * affirmations.length)],
    "apa itu kesehatan mental":
      "Kesehatan mental adalah kondisi di mana seseorang dapat berkembang secara fisik, mental, spiritual, dan sosial sehingga individu tersebut dapat menyadari kemampuannya sendiri, mengatasi tekanan, bekerja secara produktif, dan berkontribusi pada komunitasnya.",
    "pentingnya kesehatan mental":
      "Kesehatan mental penting karena memengaruhi cara kita berpikir, merasa, dan bertindak. Kesehatan mental yang baik membantu kita menghadapi stres, menjalin hubungan yang sehat, dan membuat keputusan yang baik.",
    "panda masalah kesehatan mental":
      "Tanda-tanda masalah kesehatan mental bisa berupa perubahan suasana hati yang drastis, menarik diri dari lingkungan sosial, perubahan pola tidur atau makan, merasa putus asa, atau kesulitan berkonsentrasi.",
    "cara menjaga kesehatan mental":
      "Beberapa cara menjaga kesehatan mental antara lain: cukup tidur, makan makanan bergizi, berolahraga, berbicara dengan orang yang dipercaya, melakukan aktivitas yang disukai, dan mencari bantuan profesional jika diperlukan.",
    "kapan cari bantuan profesional":
      "Jika Anda merasa kesulitan mengendalikan emosi, mengalami stres atau kecemasan berlebihan, atau pikiran untuk menyakiti diri sendiri, sebaiknya segera mencari bantuan profesional seperti psikolog atau psikiater.",
    "perbedaan stres cemas depresi":
      "Stres biasanya reaksi terhadap tekanan eksternal, cemas adalah rasa khawatir berlebihan tanpa sebab jelas, sedangkan depresi adalah kondisi perasaan sedih mendalam dan kehilangan minat yang berlangsung lama.",
    "cara bantu teman masalah mental":
      "Dengarkan tanpa menghakimi, tawarkan dukungan, ajak bicara secara terbuka, dan sarankan untuk mencari bantuan profesional jika diperlukan. Jangan memaksa, tapi tetap dampingi dan beri semangat.",
    "mengatasi kesehatan mental":
      "Untuk mengatasi masalah kesehatan mental, penting untuk mengenali perasaan Anda, berbicara dengan orang yang dipercaya, menjaga pola hidup sehat, melakukan aktivitas yang disukai, dan jangan ragu mencari bantuan profesional jika diperlukan. Setiap orang bisa memiliki cara yang berbeda, jadi temukan yang paling cocok untuk Anda.",
  };

  const generateResponse = (message: string) => {
    const lowerMessage = message.toLowerCase();

    // Salam waktu spesifik
    if (lowerMessage.includes("selamat pagi")) {
      return "Selamat pagi! Semoga harimu menyenangkan. Ada yang bisa saya bantu seputar kesehatan mental?";
    }
    if (lowerMessage.includes("selamat siang")) {
      return "Selamat siang! Jangan lupa istirahat sejenak. Ada yang bisa saya bantu seputar kesehatan mental?";
    }
    if (lowerMessage.includes("selamat sore")) {
      return "Selamat sore! Semoga harimu berjalan lancar. Ada yang bisa saya bantu seputar kesehatan mental?";
    }
    if (lowerMessage.includes("selamat malam")) {
      return "Selamat malam! Semoga istirahatmu tenang. Ada yang bisa saya bantu seputar kesehatan mental?";
    }

    // Sapaan sebaliknya
    if (lowerMessage.includes("hai")) {
      return "Hallo! Ada yang bisa saya bantu seputar kesehatan mental?";
    }
    if (lowerMessage.includes("hallo") || lowerMessage.includes("halo")) {
      return "Hai! Ada yang bisa saya bantu seputar kesehatan mental?";
    }

    // Daftar kata kunci salam umum
    const greetings = ["assalamualaikum"];

    // Daftar kata kunci terkait kesehatan mental
    const mentalKeywords = [
      "sedih",
      "down",
      "cemas",
      "khawatir",
      "stres",
      "tertekan",
      "tips",
      "saran",
      "afirmasi",
      "motivasi",
      "apa itu kesehatan mental",
      "kesehatan mental",
      "pentingnya kesehatan mental",
      "tanda masalah kesehatan mental",
      "cara menjaga kesehatan mental",
      "kapan cari bantuan profesional",
      "perbedaan stres cemas depresi",
      "cara bantu teman masalah mental",
      "mengatasi kesehatan mental",
      "mengatasi masalah kesehatan mental",
      "cara mengatasi kesehatan mental",
    ];

    // Cek salam umum
    const isGreeting = greetings.some((greet) => lowerMessage.includes(greet));
    if (isGreeting) {
      return "Halo! Ada yang bisa saya bantu seputar kesehatan mental hari ini?";
    }

    // Cek topik kesehatan mental
    const isMentalHealthTopic = mentalKeywords.some((keyword) =>
      lowerMessage.includes(keyword)
    );
    if (isMentalHealthTopic) {
      if (lowerMessage.includes("sedih") || lowerMessage.includes("down")) {
        return responses["sedih"];
      } else if (
        lowerMessage.includes("cemas") ||
        lowerMessage.includes("khawatir")
      ) {
        return responses["cemas"];
      } else if (
        lowerMessage.includes("stres") ||
        lowerMessage.includes("tertekan")
      ) {
        return responses["stres"];
      } else if (
        lowerMessage.includes("tips") ||
        lowerMessage.includes("saran")
      ) {
        return responses["tips"];
      } else if (
        lowerMessage.includes("afirmasi") ||
        lowerMessage.includes("motivasi")
      ) {
        return responses["afirmasi"];
      } else if (lowerMessage.includes("apa itu kesehatan mental")) {
        return responses["apa itu kesehatan mental"];
      } else if (lowerMessage.includes("pentingnya kesehatan mental")) {
        return responses["pentingnya kesehatan mental"];
      } else if (lowerMessage.includes("tanda masalah kesehatan mental")) {
        return responses["panda masalah kesehatan mental"];
      } else if (lowerMessage.includes("cara menjaga kesehatan mental")) {
        return responses["cara menjaga kesehatan mental"];
      } else if (lowerMessage.includes("kapan cari bantuan profesional")) {
        return responses["kapan cari bantuan profesional"];
      } else if (lowerMessage.includes("perbedaan stres cemas depresi")) {
        return responses["perbedaan stres cemas depresi"];
      } else if (lowerMessage.includes("cara bantu teman masalah mental")) {
        return responses["cara bantu teman masalah mental"];
      } else if (
        lowerMessage.includes("cara mengatasi kesehatan mental") ||
        lowerMessage.includes("mengatasi kesehatan mental") ||
        lowerMessage.includes("mengatasi masalah kesehatan mental")
      ) {
        return responses["mengatasi kesehatan mental"];
      }
    } else {
      return "Maaf, saya hanya dapat membantu seputar kesehatan mental. Silakan ajukan pertanyaan terkait kesehatan mental, tips, atau afirmasi positif.";
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: "user" as const,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await fetch("/api/ai-checkup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: inputMessage }),
      });
      const data = await res.json();
      const aiResponse =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        data?.choices?.[0]?.message?.content ||
        "Tidak ada jawaban dari AI.";
      const botResponse = {
        id: Date.now() + 1,
        text: aiResponse,
        sender: "bot" as const,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          text: "Gagal mendapatkan jawaban dari AI: " + (err.message || err),
          sender: "bot" as const,
          timestamp: new Date(),
        },
      ]);
    }

    setInputMessage("");
  };

  const quickActions = [
    { label: "Tips Hari Ini", message: "Berikan saya tips untuk hari ini" },
    { label: "Afirmasi Positif", message: "Saya butuh afirmasi positif" },
    { label: "Merasa Cemas", message: "Saya merasa cemas" },
    { label: "Merasa Stres", message: "Saya sedang stres" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 relative">
            <Link to="/" className="z-10 mt-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-white/90 text-primary rounded-full shadow-md border border-gray-200 hover:bg-blue-50 hover:scale-105 transition-all duration-150">
                <Home size={20} />
                <span className="font-medium">Beranda</span>
              </button>
            </Link>
            <div className="flex items-center mx-auto">
              <Bot className="h-6 w-6 text-primary mr-2" />
              <h1 className="text-2xl font-bold text-primary">AI Assistant</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex flex-col">
        {/* Deskripsi Chatbot Interaktif */}
        <div className="mb-6 bg-blue-100 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-blue-900 mb-2">
            Chatbot Interaktif (AI Assistant)
          </h2>
          <ul className="list-disc pl-5 text-blue-800 text-sm space-y-1">
            <li>Menjawab pertanyaan umum seputar kesehatan mental.</li>
            <li>Memberikan tips harian dan afirmasi positif.</li>
            <li>
              Tidak menggantikan psikolog, hanya memberikan pendampingan awal.
            </li>
          </ul>
          <p className="text-xs text-blue-700 mt-2">
            AI Assistant ini bertujuan untuk memberikan dukungan awal dan
            edukasi terkait kesehatan mental. Untuk masalah serius atau krisis
            psikologis, segera hubungi profesional.
          </p>
        </div>
        {/* Box Penting untuk Diingat */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-amber-800 mb-2">
            Penting untuk Diingat
          </h3>
          <ul className="text-sm text-amber-700 space-y-1">
            <li>
              • AI Assistant ini tidak menggantikan konsultasi dengan psikolog
              profesional
            </li>
            <li>
              • Untuk masalah serius atau krisis psikologis, segera hubungi
              profesional
            </li>
            <li>• Informasi yang diberikan bersifat umum dan edukatif</li>
            <li>
              • Jika membutuhkan konsultasi mendalam, gunakan fitur Konseling
              Online
            </li>
          </ul>
        </div>

        <Card className="flex flex-col flex-1 mt-6 shadow-md bg-white min-h-[600px]">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bot className="h-5 w-5 mr-2" />
              Chat dengan AI Assistant
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col bg-white overflow-hidden">
            {/* Scroll container */}
            <div className="flex-1 overflow-y-auto pr-1 flex flex-col">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  } mb-2`}
                >
                  <div
                    className={`
                      inline-block
                      max-w-[80%]
                      rounded-2xl
                      p-3
                      shadow
                      ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }
                    `}
                    style={{
                      wordBreak: "break-word",
                      borderTopLeftRadius:
                        message.sender === "bot" ? "1.5rem" : "0.75rem",
                      borderTopRightRadius:
                        message.sender === "user" ? "1.5rem" : "0.75rem",
                      borderBottomLeftRadius: "1.5rem",
                      borderBottomRightRadius: "1.5rem",
                    }}
                  >
                    <div className="flex items-start space-x-2">
                      {message.sender === "bot" && (
                        <Bot className="h-4 w-4 mt-1 flex-shrink-0" />
                      )}
                      {message.sender === "user" && (
                        <User className="h-4 w-4 mt-1 flex-shrink-0" />
                      )}
                      <div>
                        <p className="text-sm break-words">{message.text}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString("id-ID", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Aksi Cepat */}
            <div className="mt-4">
              <p className="text-sm text-muted-foreground mb-2">Aksi Cepat:</p>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setInputMessage(action.message)}
                    className="text-xs"
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Input chat */}
            <form onSubmit={handleSendMessage} className="flex space-x-2 mt-4">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ketik pesan Anda..."
                className="flex-1"
              />
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Chatbot;
