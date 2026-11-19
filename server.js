const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;
const OLLAMA_URL = "http://127.0.0.1:11434/api/chat";
const MODEL = "qwen2.5:3b";

app.use(express.json({ limit: "20kb" }));
app.use(express.static(path.join(__dirname, "public")));

app.post("/chat", async (req, res) => {
  const { message } = req.body || {};

  if (typeof message !== "string" || !message.trim()) {
    return res.status(400).json({ error: "Dotaz nesmí být prázdný." });
  }
  if (message.length > 4000) {
    return res.status(400).json({ error: "Dotaz je příliš dlouhý (maximum 4000 znaků)." });
  }

  try {
    const ollamaResponse = await fetch(OLLAMA_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: MODEL,
        stream: false,
        messages: [
          {
            role: "system",
            content:
              "Jsi virtuální technická podpora projektu VDF Games X. " +
              "Odpovídej česky, stručně, srozumitelně a krok za krokem. " +
              "Pomáhej s běžnými problémy s počítačovými hrami, instalací, aktualizacemi, " +
              "výkonem a chybovými hláškami. Nevymýšlej si konkrétní informace o VDF Games X, " +
              "které neznáš. Pokud nemáš dost informací, řekni to a požádej o přesné znění chyby " +
              "nebo potřebné údaje. Nikdy nežádej hesla ani jiné citlivé údaje."
          },
          { role: "user", content: message.trim() }
        ],
        options: { temperature: 0.4 }
      })
    });

    if (!ollamaResponse.ok) {
      const detail = await ollamaResponse.text();
      console.error("Ollama error:", detail);
      return res.status(502).json({
        error: "Ollama neodpovídá správně. Ověř, že běží a že je stažen model " + MODEL + "."
      });
    }

    const data = await ollamaResponse.json();
    const reply = data.message?.content;

    if (!reply) {
      return res.status(502).json({ error: "Ollama vrátila prázdnou odpověď." });
    }

    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.status(503).json({
      error: "Nelze se spojit s Ollama na http://127.0.0.1:11434. Spusť aplikaci Ollama."
    });
  }
});

app.listen(PORT, () => {
  console.log(`VDF Games X běží na http://localhost:${PORT}`);
  console.log(`AI model: ${MODEL}`);
});
