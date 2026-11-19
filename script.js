const form = document.getElementById("question-form");
const textarea = document.getElementById("question");
const emailInput = document.getElementById("email");
const answerDiv = document.getElementById("answer");
const submitButton = form.querySelector('button[type="submit"]');

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const message = textarea.value.trim();
  const email = emailInput.value.trim();

  if (!message) {
    answerDiv.textContent = "Nejdřív napiš dotaz.";
    return;
  }

  answerDiv.textContent = "AI přemýšlí…";
  submitButton.disabled = true;

  try {
    const response = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        email: email || null,
        student: "Rohlena_Patrik_4ITE"
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `Chyba serveru (${response.status})`);
    }

    answerDiv.textContent = data.reply || "AI nevrátila žádnou odpověď.";
    textarea.value = "";
  } catch (error) {
    console.error(error);
    answerDiv.textContent =
      `Nepodařilo se získat odpověď: ${error.message}\n\n` +
      "Zkontroluj, že běží Node.js server i Ollama a že máš stažený model.";
  } finally {
    submitButton.disabled = false;
  }
});
