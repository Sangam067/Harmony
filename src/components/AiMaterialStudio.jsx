import React, { useState } from 'react';

export default function AiMaterialStudio() {
  const [productType, setProductType] = useState("Luxury Quilts");
  const [designStyle, setDesignStyle] = useState("Royal Burgundy");
  const [budget, setBudget] = useState(12000);
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");

  const categories = [
    "Bedcovers & Sheets",
    "Luxury Quilts",
    "Wool Blankets",
    "Carpets & Rugs",
    "Cushion Covers",
    "Bath Towels"
  ];

  const styles = [
    "Royal Burgundy",
    "Champagne Ivory",
    "Gold Jacquard",
    "Himalayan Charcoal"
  ];

  const handleAISubmit = async (e) => {
    e.preventDefault();

    if (!budget || !designStyle) {
      alert("Please fill out your preferences first!");
      return;
    }

    setIsLoading(true);
    setAiResponse("Weaving your custom Harmony textile combination...");

    // Modern HF Router API (OpenAI-compatible chat completions)
    const MODEL_URL = "https://router.huggingface.co/v1/chat/completions";

    // Reads securely from local environment file
    const HF_TOKEN = import.meta.env.VITE_HF_TOKEN;

    const systemPrompt = `You are the premium automated interior layout coordinator for "Harmony Home Textiles" based in China Town shopping Complex, Sundhara, Kathmandu, Nepal. Our active showroom specializes in premium Bedcovers, Bedsheets, Blankets, Quilts, Carpets, Cushion covers, and Towels. Generate sophisticated, highly descriptive recommendations suggesting specific complementary color pairings, textile layering methods, and styling directions. Keep the formatting clear, maintain a professional and welcoming tone, and enforce an absolute maximum length constraint of 90 words.`;

    const userMessage = `I'm looking for: ${productType}
My budget: NPR ${budget.toLocaleString()}
My preferred design aesthetic: ${designStyle}

Please recommend the perfect textile combination for my home.`;

    try {
      const response = await fetch(MODEL_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "Qwen/Qwen2.5-72B-Instruct",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userMessage }
          ],
          max_tokens: 200
        }),
      });

      console.log("HF API Response Status:", response.status, response.statusText);

      if (response.status === 503) {
        setAiResponse("The Harmony Design Studio is warming up. Please press the button again in 20-30 seconds!");
        return;
      }

      if (response.status === 401 || response.status === 403) {
        console.error("Auth error — token may be invalid or expired.");
        setAiResponse("Authentication failed. The API token may have expired. Please contact the site administrator.");
        return;
      }

      if (!response.ok) {
        const errText = await response.text().catch(() => "");
        console.error("HF API Error:", response.status, errText);
        setAiResponse(`API returned an error (${response.status}). Please try again shortly.`);
        return;
      }

      const data = await response.json();
      console.log("HF API Response Data:", JSON.stringify(data).slice(0, 500));

      // OpenAI-compatible chat completions response format
      if (data?.choices?.[0]?.message?.content) {
        setAiResponse(data.choices[0].message.content.trim());
      } else if (data?.error) {
        const errMsg = typeof data.error === 'string' ? data.error : data.error.message || JSON.stringify(data.error);
        console.warn("API Error:", errMsg);
        setAiResponse("Our virtual concierge encountered an issue. Please try again shortly.");
      } else {
        console.warn("Unexpected response shape:", data);
        setAiResponse("Our virtual concierge is temporarily resting. Please try again shortly.");
      }
    } catch (error) {
      console.error("API Error:", error);
      setAiResponse("Could not establish a secure connection to the AI studio. Please check your internet connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai-studio" className="relative min-h-screen flex flex-col justify-center px-6 sm:px-12 py-28 select-none z-10">
      <div className="max-w-4xl mx-auto w-full">

        {/* Section Header */}
        <div className="text-center mb-16 space-y-3">
          <span className="text-[11px] tracking-[0.3em] text-[#e5901c] font-sans font-semibold uppercase block">
            Atelier Consultation
          </span>
          <h2 className="font-editorial-title text-4xl sm:text-6xl text-[#9e1822] font-bold">
            Material <span className="font-editorial-italic font-normal text-[#c44e2b]">Matchmaker</span>
          </h2>
          <p className="text-sm text-[#6e3a2c] max-w-md mx-auto font-sans font-light leading-relaxed">
            Select your textile, mood, and target budget. Our AI curator designs a personalized ensemble.
          </p>
        </div>

        {/* Crystal Glass Card */}
        <div className="relative">
          <form onSubmit={handleAISubmit} className="glass-regal rounded-3xl p-8 sm:p-14 space-y-9 border border-white/20 shadow-lg">

            {/* 1. Textile Category */}
            <div className="space-y-3">
              <label className="text-[11px] font-semibold tracking-[0.2em] text-[#9e1822] uppercase block">
                Textile Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {categories.map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setProductType(c)}
                    className={`py-3 px-4 rounded-xl text-xs font-semibold transition-all duration-200 text-center ${
                      productType === c
                        ? 'bg-gradient-to-r from-[#9e1822] to-[#770f17] text-white shadow-md border border-[#f5a623]/40'
                        : 'glass-amber-box text-[#2c0b0e]'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Design Aesthetic */}
            <div className="space-y-3">
              <label className="text-[11px] font-semibold tracking-[0.2em] text-[#9e1822] uppercase block">
                Atmosphere & Colorway
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {styles.map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setDesignStyle(s)}
                    className={`py-3 px-3 rounded-xl text-xs font-semibold transition-all duration-200 text-center ${
                      designStyle === s
                        ? 'bg-gradient-to-r from-[#9e1822] to-[#770f17] text-white shadow-md border border-[#f5a623]/40'
                        : 'glass-amber-box text-[#2c0b0e]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Budget Slider */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-semibold tracking-[0.2em] text-[#9e1822] uppercase">
                  Budget Target
                </label>
                <span className="font-editorial-title text-xl font-bold text-[#9e1822]">
                  NPR {budget.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="2500"
                max="35000"
                step="500"
                value={budget}
                onChange={e => setBudget(parseInt(e.target.value))}
                className="w-full slider-regal cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#6e3a2c] font-sans">
                <span>NPR 2,500</span>
                <span>NPR 18,000</span>
                <span>NPR 35,000+</span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#9e1822] to-[#770f17] hover:from-[#b51c27] hover:to-[#8c121b] text-white text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 border border-[#f5a623]/30"
              >
                {isLoading ? "Consulting the AI Studio..." : "Consult the Harmony AI Studio ✨"}
              </button>
            </div>

            {/* AI Recommendation Output */}
            {aiResponse && (
              <div className="mt-6 p-6 sm:p-8 rounded-2xl glass-amber-box border border-white/20 backdrop-blur-md transition-all duration-500">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.15] text-[11px]">
                  <span className="font-semibold text-[#9e1822] uppercase tracking-[0.18em]">
                    ✨ Your Custom Harmony Layout
                  </span>
                  <span className="text-[#6e3a2c]">Shop 141, Chinatown</span>
                </div>
                
                <div className="py-5">
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2 py-4 text-xs text-[#9e1822]">
                      <div className="w-4 h-4 border-2 border-[#9e1822] border-t-transparent rounded-full animate-spin" />
                      <span>Weaving your recommendation...</span>
                    </div>
                  ) : (
                    <p className="font-editorial-italic text-lg sm:text-xl text-[#2c0b0e] leading-relaxed whitespace-pre-line">
                      &ldquo;{aiResponse}&rdquo;
                    </p>
                  )}
                </div>

                {aiResponse && !isLoading && (
                  <div className="pt-2 text-right">
                    <a
                      href={`mailto:shyammudbhari2151@gmail.com?subject=Harmony%20Inquiry&body=${encodeURIComponent(aiResponse)}`}
                      className="text-[11px] font-semibold text-[#9e1822] hover:text-[#e5901c] uppercase tracking-[0.16em] transition-colors"
                    >
                      Reserve with Shyam Mudbhari &rarr;
                    </a>
                  </div>
                )}
              </div>
            )}

          </form>
        </div>

      </div>
    </section>
  );
}
