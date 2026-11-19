VDF Games X – lokální AI přes Ollama

POŽADAVKY
- Windows 10/11
- Node.js 18 nebo novější
- Ollama
- Doporučeně alespoň 8 GB RAM; model qwen2.5:3b zabere několik GB místa a rychlost závisí na PC.

INSTALACE
1. Nainstaluj Ollama: https://ollama.com/download
2. Nainstaluj Node.js: https://nodejs.org/
3. Otevři PowerShell v této složce.
4. Stáhni model:
      ollama pull qwen2.5:3b
5. Nainstaluj závislosti projektu:
      npm install
6. Spusť server:
      npm start
7. Otevři v prohlížeči:
      http://localhost:3000

POZNÁMKY
- Neotvírej index.html přímo dvojklikem. Otevři web přes http://localhost:3000.
- Ollama musí běžet na stejném počítači jako backend.
- Zastavení serveru: Ctrl+C v PowerShellu.
- Pokud příkaz ollama nefunguje, zavři a znovu otevři PowerShell, případně spusť aplikaci Ollama.
- Projekt používá lokální endpoint Ollama http://127.0.0.1:11434/api/chat.
- Dotazy se posílají do lokálního modelu; tento projekt je neposílá do OpenAI.
- E-mail se zatím nikam neukládá ani neposílá.
- Při zveřejnění webu na internetu samotná adresa localhost fungovat nebude. Pro veřejný provoz je potřeba backend hostovaný na dostupném počítači/serveru s Ollama a zabezpečeným přístupem.
