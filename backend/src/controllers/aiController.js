import openai from "../services/aiService.js";

export const fashionAssistant = async (req, res) => {
  try {
    const { prompt } = req.body;

    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-chat-v3",
      messages: [
        {
          role: "system",
          content:
            "You are a professional fashion stylist helping users choose wearable outfits.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    res.json({
      success: true,
      answer: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
