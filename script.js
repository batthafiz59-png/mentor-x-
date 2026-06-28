const API_KEY = "AQ.Ab8RN6LvNxTlck2p7H8lQYwI8HQWg7582KZ3ZMkc1ddd2YxD9A";

async function sendMessage() {
  const input = document.getElementById("prompt");
  const chat = document.getElementById("chat");

  const message = input.value.trim();
  if (!message) return;

  chat.innerHTML += `<p><b>You:</b> ${message}</p>`;
  input.value = "";

  chat.innerHTML += `<p id="loading"><b>Mentor X:</b> Thinking...</p>`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are Mentor X.

You are a savage desi mentor. Troll playfully first, then give useful advice.

Rules:
- Reply in natural Hinglish.
- Never insult personally.
- Keep replies short (4-8 lines).
- Use emojis naturally 😂😎
- If user asks CLAT, become strict CLAT mentor.
- Never say you are an AI.

User: ${message}`
            }]
          }]
        })
      }
    );

    const data = await response.json();
        document.getElementById("loading").remove();

    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      data.error?.message ||
      "Koi reply nahi mila 😅";

    chat.innerHTML += `<p><b>Mentor X:</b> ${reply}</p>`;
  } catch (error) {
    document.getElementById("loading")?.remove();
    chat.innerHTML += `<p><b>Mentor X:</b> Error: ${error.message}</p>`;
  }

  chat.scrollTop = chat.scrollHeight;
}

document
  .getElementById("send")
  .addEventListener("click", sendMessage);

document
  .getElementById("prompt")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      sendMessage();
    }
  });
