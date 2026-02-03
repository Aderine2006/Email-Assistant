import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SubjectLineCard } from "@/components/SubjectLineCard";
import { CopyButton } from "@/components/CopyButton";
import { Mail, Lightbulb, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmailOutput {
  subjectLines: string[];
  previewLine: string;
  body: string;
  explanation: string;
}

interface EmailOutputPanelProps {
  output: EmailOutput | null;
  isLoading: boolean;
}

function LoadingState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 py-12">
      <div className="relative">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-primary animate-sparkle" />
        </div>
      </div>
      <div className="text-center space-y-2">
        <p className="text-sm font-medium text-foreground">
          Crafting your email...
        </p>
        <p className="text-xs text-muted-foreground">
          AI is generating the perfect message
        </p>
      </div>
      <div className="w-48 h-1.5 rounded-full bg-muted overflow-hidden">
        <div className="h-full bg-primary rounded-full animate-shimmer" />
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 py-12">
      <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center">
        <Mail className="w-8 h-8 text-muted-foreground" />
      </div>
      <div className="text-center space-y-1">
        <p className="text-sm font-medium text-muted-foreground">
          Your AI-generated email will appear here
        </p>
        <p className="text-xs text-muted-foreground/70">
          Fill in the details and click "Generate Email"
        </p>
      </div>
    </div>
  );
}

export function EmailOutputPanel({ output, isLoading }: EmailOutputPanelProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
          <Mail className="w-5 h-5 text-primary" />
          Your AI-Generated Email
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        {isLoading ? (
          <LoadingState />
        ) : output ? (
          <div className="flex flex-col gap-5 animate-fade-in">
            {/* Subject Lines */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Subject Line Options
              </label>
              <div className="space-y-2">
                {output.subjectLines.map((subject, i) => (
                  <SubjectLineCard
                    key={i}
                    subject={subject}
                    index={i + 1}
                  />
                ))}
              </div>
            </div>

            {/* Preview Line */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Email Preview
              </label>
              <div className="p-3 rounded-xl bg-success-muted border border-success/20">
                <p className="text-sm text-foreground/80 italic">
                  {output.previewLine}
                </p>
              </div>
            </div>

            {/* Email Body */}
            <div className="space-y-2 flex-1">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">
                  Email Body
                </label>
                <CopyButton text={output.body} />
              </div>
              <div className="p-4 rounded-xl border border-border bg-background min-h-[200px]">
                <div className="prose prose-sm max-w-none">
                  {output.body.split("\n").map((paragraph, i) => (
                    <p key={i} className={cn(
                      "text-sm text-foreground leading-relaxed",
                      paragraph.trim() === "" ? "h-4" : "mb-3"
                    )}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Writing Style Explanation */}
            <div className="p-3 rounded-xl bg-primary/5 border border-primary/10">
              <div className="flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-xs font-medium text-primary">
                    Why this works:
                  </span>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {output.explanation}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <EmptyState />
        )}
      </CardContent>
    </Card>
  );
}
