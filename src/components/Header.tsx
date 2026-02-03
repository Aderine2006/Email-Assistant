import { Sparkles } from "lucide-react";

export function Header() {
  return (
    <header className="py-6 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white overflow-hidden flex items-center justify-center shadow-md border border-border">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground flex items-center gap-1.5">
              Email Generator
              <Sparkles className="w-4 h-4 text-primary" />
            </h1>
            <p className="text-xs text-muted-foreground">
              Craft perfect emails in seconds
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
