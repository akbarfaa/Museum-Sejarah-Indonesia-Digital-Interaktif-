import { Link, useRouterState } from "@tanstack/react-router";
import { useLanguage } from "@/contexts/LanguageContext";
import { HiOutlineGlobeAlt } from "react-icons/hi2";

export function Navbar({ floating = false }: { floating?: boolean }) {
  const { t, lang, toggle } = useLanguage();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const links: { to: string; label: string }[] = [
    { to: "/", label: t.nav.home },
    { to: "/museum", label: t.nav.museum },
    { to: "/cinema", label: t.nav.cinema },
    { to: "/timeline", label: t.nav.timeline },
    { to: "/quiz", label: t.nav.quiz },
    { to: "/passport", label: t.nav.passport },
  ];

  return (
    <header
      className={
        floating
          ? "absolute top-0 inset-x-0 z-40 px-6 py-5 flex items-center justify-between"
          : "sticky top-0 z-40 px-6 py-4 flex items-center justify-between backdrop-blur-xl bg-background/70 border-b border-border"
      }
    >
      <Link to="/" className="flex items-center gap-3 group">
        <span className="w-9 h-9 rounded-full bg-gradient-gold flex items-center justify-center text-primary-foreground font-display text-lg shadow-gold-glow">
          M
        </span>
        <span className="flex flex-col leading-none">
          <span className="font-display text-lg tracking-wide">{t.brand}</span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mt-1">
            {t.tagline}
          </span>
        </span>
      </Link>

      <nav className="hidden md:flex items-center gap-1">
        {links.map((l) => {
          const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
          return (
            <Link
              key={l.to}
              to={l.to}
              className={
                "px-4 py-2 text-sm rounded-full transition-colors " +
                (active
                  ? "text-primary bg-primary/10 border-gold-soft"
                  : "text-muted-foreground hover:text-foreground")
              }
            >
              {l.label}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={toggle}
        className="flex items-center gap-2 px-3 py-2 rounded-full border-gold-soft text-xs uppercase tracking-[0.2em] hover:bg-primary/10 transition-colors"
        aria-label="Toggle language"
      >
        <HiOutlineGlobeAlt className="text-primary" />
        <span className={lang === "en" ? "text-primary" : "text-muted-foreground"}>EN</span>
        <span className="text-muted-foreground">/</span>
        <span className={lang === "id" ? "text-primary" : "text-muted-foreground"}>ID</span>
      </button>
    </header>
  );
}
