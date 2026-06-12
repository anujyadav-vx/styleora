import { useState } from "react";
import api from "../services/api";

function AIStylist() {
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");

  const askAI = async () => {
    const res = await api.post("/ai/fashion-chat", {
      prompt,
    });

    setAnswer(res.data.answer);
  };

  return (
    <>
      <input value={prompt} onChange={(e) => setPrompt(e.target.value)} />

      <button onClick={askAI}>Ask AI</button>

      <p>{answer}</p>
    </>
  );
}

export default AIStylist;
