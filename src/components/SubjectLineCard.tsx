import { CopyButton } from "@/components/CopyButton";

interface SubjectLineCardProps {
  subject: string;
  index: number;
}

export function SubjectLineCard({ subject, index }: SubjectLineCardProps) {
  return (
    <div className="flex items-center justify-between gap-3 p-3 rounded-xl border border-border bg-secondary/30 hover:bg-secondary/50 transition-colors duration-200">
      <div className="flex items-center gap-3 min-w-0">
        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center justify-center">
          {index}
        </span>
        <span className="text-sm font-medium text-foreground truncate">
          {subject}
        </span>
      </div>
      <CopyButton text={subject} />
    </div>
  );
}
