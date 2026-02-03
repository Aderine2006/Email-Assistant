import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Required for client-side usage
});

interface EmailOutput {
  subjectLines: string[];
  previewLine: string;
  body: string;
  explanation: string;
}

const generateEmail = async (context: string, tone: ToneType, keyPoints: string): Promise<EmailOutput> => {
  const prompt = `
    Generate a professional email based on the following:
    Context/Situation: ${context}
    Tone: ${tone}
    Key Points: ${keyPoints}

    Return the response as a JSON object with the following keys:
    - subjectLines: an array of 2 punchy subject lines
    - previewLine: a one-line preview text (approx 50-80 characters)
    - body: the full email body with appropriate greeting and closing
    - explanation: a short explanation of how the ${tone} tone was applied

    Ensure the body includes a professional greeting and closing. Do not include placeholders like [Your Name] unless necessary.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Cost-effective and fast
      messages: [
        { role: "system", content: "You are a professional email assistant. You must respond in valid JSON." },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" }
    });

    const content = response.choices[0].message.content;
    if (!content) throw new Error("No content received from OpenAI");

    return JSON.parse(content) as EmailOutput;
  } catch (error) {
    console.error("OpenAI Error:", error);
    throw error;
  }
};

import { useState } from "react";
import { Header } from "@/components/Header";
import { EmailInputPanel, ToneType } from "@/components/EmailInputPanel";
import { EmailOutputPanel } from "@/components/EmailOutputPanel";
import { toast } from "sonner";

// Fallback mock email generation when API is unavailable
const generateMockEmail = (context: string, tone: ToneType, keyPoints: string): EmailOutput => {
  const toneDescriptions: Record<ToneType, string> = {
    Formal: "maintains professional distance while showing respect",
    Friendly: "creates warmth and approachability while staying professional",
    Assertive: "conveys confidence and clarity without being aggressive",
    Apologetic: "shows genuine remorse while offering solutions",
    Confident: "projects self-assurance and credibility",
    Persuasive: "uses compelling language to motivate action",
  };

  const toneStyles: Record<ToneType, { greeting: string; closing: string }> = {
    Formal: { greeting: "Dear", closing: "Best regards" },
    Friendly: { greeting: "Hi", closing: "Cheers" },
    Assertive: { greeting: "Hello", closing: "Looking forward to your response" },
    Apologetic: { greeting: "Dear", closing: "With sincere apologies" },
    Confident: { greeting: "Hello", closing: "Sincerely" },
    Persuasive: { greeting: "Hi", closing: "Best" },
  };

  const style = toneStyles[tone];

  return {
    subjectLines: [
      `Regarding: ${context.slice(0, 30)}...`,
      `Follow-up on ${context.slice(0, 30)}`,
    ],
    previewLine: `${style.greeting} — I'm writing to touch base regarding ${context.slice(0, 40)}...`,
    body: `${style.greeting},

I hope you're having a productive week. I'm reaching out to discuss ${context.toLowerCase()}.

${keyPoints ? `Specifically, I wanted to address:
${keyPoints.split("\n").filter(p => p.trim()).map(p => `• ${p.trim()}`).join("\n")}` : "I've been giving this some thought and wanted to share my perspective with you."}

I'd welcome the chance to discuss this further. Let me know if you have any availability this week.

${style.closing},
[Your Name]`,
    explanation: `(Demo Mode) This ${tone.toLowerCase()} draft ${toneDescriptions[tone]}. Note: OpenAI Quota exceeded; generating high-quality template instead.`,
  };
};

const Index = () => {
  const [context, setContext] = useState("");
  const [selectedTone, setSelectedTone] = useState<ToneType>("Formal");
  const [keyPoints, setKeyPoints] = useState("");
  const [output, setOutput] = useState<EmailOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!context.trim()) {
      toast.error("Please provide some context for the email");
      return;
    }

    setIsLoading(true);
    try {
      const result = await generateEmail(context, selectedTone, keyPoints);
      setOutput(result);
      toast.success("AI email generated successfully!");
    } catch (error: any) {
      console.error("OpenAI Error:", error);

      // Handle Quota Error (429) specifically
      if (error.message?.includes("429") || error.message?.includes("quota")) {
        toast.warning("API Quota exceeded. Using high-quality Demo Fallback.");
        const fallback = generateMockEmail(context, selectedTone, keyPoints);
        setOutput(fallback);
      } else {
        toast.error(`Generation failed: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6">
            <EmailInputPanel
              context={context}
              setContext={setContext}
              selectedTone={selectedTone}
              setSelectedTone={setSelectedTone}
              keyPoints={keyPoints}
              setKeyPoints={setKeyPoints}
              onGenerate={handleGenerate}
              isLoading={isLoading}
            />
            <EmailOutputPanel output={output} isLoading={isLoading} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
