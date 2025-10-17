import { ModeToggle } from "./dark-mode-toggle";

export function Navbar() {
  return (
    <nav className="border-b border-border bg-background">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-xl font-bold text-foreground">BRIDGE</div>
        <ModeToggle />
      </div>
    </nav>
  );
}
