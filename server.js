import "dotenv/config";
import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Fungsi untuk memformat jawaban AI
function formatAIText(text) {
  if (!text) return "";
  // Hapus semua tanda kutip dan semua tanda * di seluruh teks
  let clean = text.replace(/["'*]/g, "");
  // Bersihkan spasi ekstra per baris, pertahankan baris baru
  clean = clean
    .split("\n")
    .map((line) => line.trim())
    .join("\n");
  return clean;
}

// Proxy endpoint for OpenAI GPT & Gemini
app.post("/api/ai-checkup", async (req, res) => {
  const { prompt } = req.body;
  const aiProvider = process.env.AI_PROVIDER || "gemini";
  const systemPrompt = `
    Anda adalah asisten AI kesehatan mental. Jawablah hanya pertanyaan seputar kesehatan mental, psikologi, stres, emosi, coping, dan self-care. Jika pertanyaan di luar topik, tolak dengan sopan dan arahkan ke topik kesehatan mental. Berikan jawaban yang akurat, empatik, dan mudah dipahami. Jangan memberikan diagnosis medis atau pengobatan, hanya edukasi dan saran umum.
  `;

  try {
    let response, data;
    if (aiProvider === "openai") {
      const apiKey = process.env.OPENAI_API_KEY;
      const url = "https://api.openai.com/v1/chat/completions";
      response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: prompt },
          ],
        }),
      });
      data = await response.json();
      if (data.choices && data.choices[0]?.message?.content) {
        data.choices[0].message.content = formatAIText(
          data.choices[0].message.content
        );
      }
    } else {
      const apiKey = process.env.GEMINI_API_KEY;
      const geminiModel = process.env.GEMINI_MODEL || "gemini-2.0-flash";
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${apiKey}`;
      response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            { role: "model", parts: [{ text: systemPrompt }] },
            { role: "user", parts: [{ text: prompt }] },
          ],
        }),
      });
      data = await response.json();
      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        data.candidates[0].content.parts[0].text = formatAIText(
          data.candidates[0].content.parts[0].text
        );
      }
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("MindCare Gemini API Proxy is running.");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
