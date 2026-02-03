import { cn } from "@/lib/utils";

interface TonePillProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export function TonePill({ label, isSelected, onClick }: TonePillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
        "border hover:shadow-sm active:scale-[0.97]",
        isSelected
          ? "bg-primary text-primary-foreground border-primary shadow-sm"
          : "bg-card text-foreground border-border hover:border-primary/30 hover:bg-secondary"
      )}
    >
      {label}
    </button>
  );
}
