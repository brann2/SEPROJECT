import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, Bookmark, Clock, User, Home } from "lucide-react";
import { Link } from "react-router-dom";

const Articles = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [bookmarks, setBookmarks] = useState<number[]>([]);

  const articles = [
    {
      id: 1,
      title: "Mengatasi Kecemasan di Tempat Kerja",
      excerpt:
        "Tips praktis untuk mengelola stres dan kecemasan di lingkungan kerja yang dapat diterapkan sehari-hari.",
      author: "Dr. Sarah Putri, M.Psi",
      category: "Kecemasan",
      readTime: "5 menit",
      publishDate: "2024-01-10",
      content: `Kecemasan di tempat kerja adalah hal yang umum dialami banyak orang. Penyebabnya bisa beragam, mulai dari tekanan deadline, hubungan dengan rekan kerja, hingga tuntutan atasan. Untuk mengatasinya, penting untuk mengenali pemicu kecemasan, mengatur waktu dengan baik, dan tidak ragu untuk berkomunikasi secara terbuka dengan atasan atau HRD jika beban kerja terasa berlebihan. Selain itu, praktik mindfulness, teknik pernapasan dalam, dan menjaga keseimbangan antara pekerjaan dan kehidupan pribadi sangat membantu. Jika kecemasan terus berlanjut dan mengganggu produktivitas, pertimbangkan untuk berkonsultasi dengan profesional kesehatan mental.`,
      url: "https://www.halodoc.com/artikel/ini-cara-mengatasi-stres-di-tempat-kerja",
    },
    {
      id: 2,
      title: "Membangun Self-Esteem yang Sehat",
      excerpt:
        "Langkah-langkah untuk meningkatkan kepercayaan diri dan harga diri yang positif.",
      author: "Prof. Ahmad Wijaya, Ph.D",
      category: "Self-Esteem",
      readTime: "7 menit",
      publishDate: "2024-01-08",
      content: `Self-esteem atau harga diri adalah penilaian seseorang terhadap dirinya sendiri. Self-esteem yang sehat membuat seseorang lebih percaya diri, mampu menghadapi tantangan, dan tidak mudah terpengaruh oleh penilaian negatif orang lain. Cara membangun self-esteem antara lain: mengenali kelebihan diri, menerima kekurangan, menetapkan tujuan yang realistis, dan menghindari membandingkan diri dengan orang lain. Dukungan dari lingkungan sekitar juga sangat penting. Jika merasa sulit membangun self-esteem, cobalah berbicara dengan konselor atau psikolog.`,
      url: "https://hellosehat.com/mental/mental-lainnya/cara-meningkatkan-self-esteem/",
    },
    {
      id: 3,
      title: "Mengenali dan Mencegah Burnout",
      excerpt:
        "Cara mengidentifikasi tanda-tanda burnout dan strategi untuk mencegahnya.",
      author: "Dr. Lisa Maharani, M.Psi",
      category: "Burnout",
      readTime: "6 menit",
      publishDate: "2024-01-05",
      content: `Burnout adalah kondisi kelelahan fisik, emosional, dan mental akibat stres berkepanjangan, terutama di lingkungan kerja. Tanda-tandanya meliputi kelelahan ekstrem, kehilangan motivasi, dan penurunan kinerja. Untuk mencegah burnout, penting untuk mengenali batas kemampuan diri, mengambil waktu istirahat yang cukup, dan melakukan aktivitas yang menyenangkan di luar pekerjaan. Jangan ragu untuk meminta bantuan atau berbagi beban dengan rekan kerja. Jika burnout sudah terjadi, konsultasi dengan profesional sangat dianjurkan.`,
      url: "https://www.alodokter.com/burnout-syndrome",
    },
    {
      id: 4,
      title: "Teknik Mindfulness untuk Pemula",
      excerpt:
        "Panduan sederhana untuk memulai praktik mindfulness dalam kehidupan sehari-hari.",
      author: "Dr. Budi Santoso, M.Psi",
      category: "Mindfulness",
      readTime: "8 menit",
      publishDate: "2024-01-03",
      content: `Mindfulness adalah praktik memusatkan perhatian pada saat ini secara sadar dan tanpa menghakimi. Teknik ini terbukti efektif mengurangi stres dan meningkatkan kesejahteraan mental. Untuk memulai mindfulness, luangkan waktu beberapa menit setiap hari untuk duduk tenang, fokus pada napas, dan sadari sensasi tubuh serta pikiran yang muncul. Jika pikiran melayang, kembalikan fokus ke napas. Latihan rutin akan membuat mindfulness menjadi kebiasaan yang bermanfaat dalam kehidupan sehari-hari.`,
      url: "https://www.halodoc.com/artikel/teknik-mindfulness-untuk-mengurangi-stres",
    },
  ];

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleBookmark = (articleId: number) => {
    setBookmarks((prev) =>
      prev.includes(articleId)
        ? prev.filter((id) => id !== articleId)
        : [...prev, articleId]
    );
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Kecemasan: "bg-red-100 text-red-800",
      "Self-Esteem": "bg-green-100 text-green-800",
      Burnout: "bg-orange-100 text-orange-800",
      Mindfulness: "bg-blue-100 text-blue-800",
      Stres: "bg-purple-100 text-purple-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 relative">
            <Link to="/" className="z-10 mt-4">
              <button
                className="flex items-center gap-2 px-4 py-2 bg-white/90 text-primary rounded-full shadow-md border border-gray-200 hover:bg-blue-50 hover:scale-105 transition-all duration-150"
                style={{ minWidth: 0 }}
              >
                <Home size={20} />
                <span className="font-medium">Beranda</span>
              </button>
            </Link>
            <h1 className="text-2xl font-bold text-primary mx-auto">
              Artikel & Tips
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Artikel Kesehatan Mental
          </h2>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Cari artikel atau topik..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <Card
              key={article.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge className={getCategoryColor(article.category)}>
                    {article.category}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleBookmark(article.id)}
                    className={
                      bookmarks.includes(article.id)
                        ? "text-yellow-500"
                        : "text-gray-400"
                    }
                  >
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </div>
                <CardTitle className="text-lg leading-tight">
                  {article.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  {article.excerpt}
                </p>

                <div className="flex items-center text-xs text-muted-foreground space-x-4">
                  <div className="flex items-center">
                    <User className="h-3 w-3 mr-1" />
                    {article.author}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {article.readTime}
                  </div>
                </div>

                <div className="text-xs text-muted-foreground">
                  {new Date(article.publishDate).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>

                <Link to={`/article/${article.id}`}>
                  <Button className="w-full">Baca Artikel</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-muted-foreground">
                Tidak ada artikel yang ditemukan untuk pencarian "{searchTerm}"
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Articles;
