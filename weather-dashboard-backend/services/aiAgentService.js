const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");

const model = new ChatGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
  model: "gemini-2.5-flash",   // ✅ STABLE MODEL
  temperature: 0.3,
});

const buildPrompt = (question, cities) => {
  return `
You are an intelligent weather analysis assistant.

You MUST:
- Use ONLY the provided weather data
- Do NOT hallucinate
- Give practical advice
- Be concise but helpful

User Weather Data:
${JSON.stringify(cities, null, 2)}

User Question:
${question}

Respond professionally and clearly.
`;
};

const askWeatherAgent = async (question, cities) => {
  try {
    const prompt = buildPrompt(question, cities);
    const response = await model.invoke(prompt);
    return response.content;
  } catch (error) {
    console.error("AI Agent Error:", error.message);
    throw new Error("AI service failed");
  }
};

module.exports = { askWeatherAgent };