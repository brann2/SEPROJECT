import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const articles = [
  {
    id: 1,
    title: "Mengatasi Kecemasan di Tempat Kerja",
    category: "Kecemasan",
    author: "Dr. Sarah Putri, M.Psi",
    publishDate: "10 Januari 2024",
    content: `Kecemasan di tempat kerja adalah hal yang umum dialami banyak orang. Penyebabnya bisa beragam, mulai dari tekanan deadline, hubungan dengan rekan kerja, hingga tuntutan atasan. Untuk mengatasinya, penting untuk mengenali pemicu kecemasan, mengatur waktu dengan baik, dan tidak ragu untuk berkomunikasi secara terbuka dengan atasan atau HRD jika beban kerja terasa berlebihan. Selain itu, praktik mindfulness, teknik pernapasan dalam, dan menjaga keseimbangan antara pekerjaan dan kehidupan pribadi sangat membantu. Jika kecemasan terus berlanjut dan mengganggu produktivitas, pertimbangkan untuk berkonsultasi dengan profesional kesehatan mental.`,
  },
  {
    id: 2,
    title: "Membangun Self-Esteem yang Sehat",
    category: "Self-Esteem",
    author: "Prof. Ahmad Wijaya, Ph.D",
    publishDate: "8 Januari 2024",
    content: `Self-esteem atau harga diri adalah penilaian seseorang terhadap dirinya sendiri. Self-esteem yang sehat membuat seseorang lebih percaya diri, mampu menghadapi tantangan, dan tidak mudah terpengaruh oleh penilaian negatif orang lain. Cara membangun self-esteem antara lain: mengenali kelebihan diri, menerima kekurangan, menetapkan tujuan yang realistis, dan menghindari membandingkan diri dengan orang lain. Dukungan dari lingkungan sekitar juga sangat penting. Jika merasa sulit membangun self-esteem, cobalah berbicara dengan konselor atau psikolog.`,
  },
  {
    id: 3,
    title: "Mengenali dan Mencegah Burnout",
    category: "Burnout",
    author: "Dr. Lisa Maharani, M.Psi",
    publishDate: "5 Januari 2024",
    content: `Burnout adalah kondisi kelelahan fisik, emosional, dan mental akibat stres berkepanjangan, terutama di lingkungan kerja. Tanda-tandanya meliputi kelelahan ekstrem, kehilangan motivasi, dan penurunan kinerja. Untuk mencegah burnout, penting untuk mengenali batas kemampuan diri, mengambil waktu istirahat yang cukup, dan melakukan aktivitas yang menyenangkan di luar pekerjaan. Jangan ragu untuk meminta bantuan atau berbagi beban dengan rekan kerja. Jika burnout sudah terjadi, konsultasi dengan profesional sangat dianjurkan.`,
  },
  {
    id: 4,
    title: "Teknik Mindfulness untuk Pemula",
    category: "Mindfulness",
    author: "Dr. Budi Santoso, M.Psi",
    publishDate: "3 Januari 2024",
    content: `Mindfulness adalah praktik memusatkan perhatian pada saat ini secara sadar dan tanpa menghakimi. Teknik ini terbukti efektif mengurangi stres dan meningkatkan kesejahteraan mental. Untuk memulai mindfulness, luangkan waktu beberapa menit setiap hari untuk duduk tenang, fokus pada napas, dan sadari sensasi tubuh serta pikiran yang muncul. Jika pikiran melayang, kembalikan fokus ke napas. Latihan rutin akan membuat mindfulness menjadi kebiasaan yang bermanfaat dalam kehidupan sehari-hari.`,
  },
];

const ArticleDetail = () => {
  const { id } = useParams();
  const article = articles.find((a) => a.id === Number(id));

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-xl w-full p-8 text-center">
          <CardTitle>Artikel tidak ditemukan</CardTitle>
          <Link to="/articles">
            <Button className="mt-4">Kembali ke Daftar Artikel</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8">
      <Card className="max-w-2xl w-full p-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold mb-2">
            {article.title}
          </CardTitle>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
            <span className="px-3 py-1 rounded-full bg-gray-100 font-semibold text-gray-700">
              {article.category}
            </span>
            <span>{article.author}</span>
            <span>{article.publishDate}</span>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-lg leading-relaxed text-gray-800 whitespace-pre-line">
            {article.content}
          </p>
          <Link to="/articles">
            <Button className="mt-8">Kembali ke Daftar Artikel</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArticleDetail;
