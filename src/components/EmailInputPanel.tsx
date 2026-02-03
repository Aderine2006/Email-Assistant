import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { TonePill } from "@/components/TonePill";
import { Sparkles, Loader2 } from "lucide-react";

const TONES = [
  "Formal",
  "Friendly",
  "Assertive",
  "Apologetic",
  "Confident",
  "Persuasive",
] as const;

export type ToneType = (typeof TONES)[number];

interface EmailInputPanelProps {
  context: string;
  setContext: (value: string) => void;
  selectedTone: ToneType;
  setSelectedTone: (tone: ToneType) => void;
  keyPoints: string;
  setKeyPoints: (value: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

export function EmailInputPanel({
  context,
  setContext,
  selectedTone,
  setSelectedTone,
  keyPoints,
  setKeyPoints,
  onGenerate,
  isLoading,
}: EmailInputPanelProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-foreground">
          Generate Your Email
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-6">
        {/* Situation / Context */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Situation / Context
          </label>
          <Textarea
            placeholder="Describe the situation or purpose of the email…"
            value={context}
            onChange={(e) => setContext(e.target.value)}
            className="min-h-[120px]"
          />
        </div>

        {/* Desired Tone */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">
            Desired Tone
          </label>
          <div className="flex flex-wrap gap-2">
            {TONES.map((tone) => (
              <TonePill
                key={tone}
                label={tone}
                isSelected={selectedTone === tone}
                onClick={() => setSelectedTone(tone)}
              />
            ))}
          </div>
        </div>

        {/* Key Points */}
        <div className="space-y-2 flex-1">
          <label className="text-sm font-medium text-foreground">
            Key Points to Include
          </label>
          <Textarea
            placeholder="Add bullet points or important details…"
            value={keyPoints}
            onChange={(e) => setKeyPoints(e.target.value)}
            className="min-h-[100px] flex-1"
          />
        </div>

        {/* Generate Button */}
        <Button
          variant="generate"
          size="xl"
          onClick={onGenerate}
          disabled={isLoading || !context.trim()}
          className="w-full mt-auto"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate Email
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
