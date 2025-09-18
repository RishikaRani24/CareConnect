//<script>
  let diseasesData = [];

  // Load the JSON dataset
  fetch("diseases.json")
    .then(res => res.json())
    .then(data => { diseasesData = data; })
    .catch(err => console.error("Error loading dataset:", err));

  const chatArea   = document.getElementById("chat-area");
  const inputField = document.getElementById("userInput");
  const sendBtn    = document.getElementById("sendBtn");

  function addMessage(text, isUser = false) {
    const msg = document.createElement("div");
    msg.classList.add("chat-message");
    msg.style.background = isUser ? "#e2e8f0" : "#0a6dd9";
    msg.style.color      = isUser ? "#222" : "white";
    msg.textContent      = text;
    chatArea.appendChild(msg);
    chatArea.scrollTop   = chatArea.scrollHeight; // auto-scroll
  }

  function ask(query) {
    addMessage(query, true);

    const lower = query.toLowerCase();
    // collect all diseases whose symptoms OR name contain any keyword in query
    const matches = diseasesData.filter(d =>
      d.disease.toLowerCase().includes(lower) ||
      lower.split(/[ ,]+/).some(word =>
        d.symptoms.toLowerCase().includes(word))
    );

    if (matches.length > 0) {
      let reply = "Possible matches:\n\n";
      matches.forEach(d => {
        reply += `• ${d.disease}\n   Symptoms: ${d.symptoms}\n   Prevention: ${d.prevention}\n\n`;
      });
      addMessage(reply.trim());
    } else {
      addMessage("Sorry, I couldn't find diseases matching those symptoms. Try different keywords.");
    }
  }

  sendBtn.addEventListener("click", () => {
    const text = inputField.value.trim();
    if (!text) return;
    ask(text);
    inputField.value = "";
  });
</script>
//