import { Home, BookOpen, BarChart3, Settings } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/dashboard", label: "Home", icon: Home },
  { path: "/lessons", label: "Lessons", icon: BookOpen },
  { path: "/progress", label: "Progress", icon: BarChart3 },
  { path: "/settings", label: "Settings", icon: Settings },
];

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-md">
        {navItems.map(({ path, label, icon: Icon }) => {
          const active = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 py-3 text-sm transition-colors min-h-[56px]",
                active ? "text-accent font-semibold" : "text-muted-foreground"
              )}
              aria-label={label}
              aria-current={active ? "page" : undefined}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
