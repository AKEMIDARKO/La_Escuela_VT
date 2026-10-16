"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import { AudioLines, Crown, Gamepad2, Globe2, GraduationCap, Heart, Menu, MessageCircle, Moon, MousePointer2, Pause, Play, Sparkles, Star, Sun, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { content, groupArtworkAlt, isLocale, languages, type Copy } from "./content";
import { readPreferences } from "./preferences";

const worldDefinitions = [
  { id: "gaming", number: "01", icon: Gamepad2, color: "#177f94", image: "/assets/shared-adventure.webp", imageWidth: 1024, imageHeight: 1024 },
  { id: "musica", number: "02", icon: AudioLines, color: "#174a73", image: "/assets/school-plaque.webp", imageWidth: 768, imageHeight: 768 },
  { id: "charlas", number: "03", icon: MessageCircle, color: "#b64074", image: "/assets/shared-moment.webp", imageWidth: 1280, imageHeight: 1201 },
];

function Wordmark({ inverse = false, copy }: { inverse?: boolean; copy: Copy }) {
  return (
    <a className={"wordmark " + (inverse ? "wordmark-inverse" : "")} href="#inicio" aria-label={copy.ui.home}>
      <img className="school-crest" src="/assets/school-crest.webp" width="512" height="512" alt="" />
      <span className="wordmark-text">LA ESCUELA VT<span>{copy.ui.brand}</span></span>
    </a>
  );
}

const subscribeHydration = () => () => {};
const clientReady = () => true;
const serverReady = () => false;
const motionQuery = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const preference = window.matchMedia(motionQuery);
  preference.addEventListener("change", onChange);
  return () => preference.removeEventListener("change", onChange);
}

const readReducedMotion = () => window.matchMedia(motionQuery).matches;

export default function Home() {
  const hero = useRef<HTMLElement>(null);
  const [preferences, setPreferences] = useState(readPreferences);
  // Match the server HTML before displaying saved browser preferences.
  const preferencesReady = useSyncExternalStore(subscribeHydration, clientReady, serverReady);
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, readReducedMotion, serverReady);
  const motionEnabled = preferencesReady ? preferences.motionEnabled : true;
  const locale = preferencesReady ? preferences.locale : "es";
  const theme = preferencesReady ? preferences.theme : "light";
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeWorld, setActiveWorld] = useState("gaming");
  const [activePeople, setActivePeople] = useState("teachers");
  const copy = content[locale];
  const selectedLanguage = languages.find(language => language.code === locale) ?? languages[0];
  const worlds = worldDefinitions.map((definition, index) => ({ ...definition, ...copy.worlds[index] }));
  const navigation = [
    { label: copy.nav.group, href: "#grupo" },
    { label: copy.nav.universe, href: "#universo" },
    { label: copy.nav.people, href: "#personas" },
    { label: copy.nav.community, href: "#comunidad" },
  ];

  useEffect(() => {
    if (!preferencesReady) return;
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  }, [theme, preferencesReady]);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = "La Escuela VT — " + copy.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", copy.meta.description);
  }, [locale, copy]);

  const moving = motionEnabled && !reducedMotion;

  useEffect(() => {
    const node = hero.current;
    if (!node) return;
    node.style.setProperty("--pointer-x", "0");
    node.style.setProperty("--pointer-y", "0");
    if (!moving || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let targetX = 0, targetY = 0, currentX = 0, currentY = 0, frame = 0;
    const render = () => {
      currentX += (targetX - currentX) * 0.075;
      currentY += (targetY - currentY) * 0.075;
      node.style.setProperty("--pointer-x", currentX.toFixed(4));
      node.style.setProperty("--pointer-y", currentY.toFixed(4));
      if (Math.abs(targetX - currentX) + Math.abs(targetY - currentY) > 0.002) frame = requestAnimationFrame(render);
      else frame = 0;
    };
    const animate = () => { if (!frame) frame = requestAnimationFrame(render); };
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const box = node.getBoundingClientRect();
      targetX = Math.max(-1, Math.min(1, ((event.clientX - box.left) / box.width - 0.5) * 2));
      targetY = Math.max(-1, Math.min(1, ((event.clientY - box.top) / box.height - 0.5) * 2));
      animate();
    };
    const reset = () => { targetX = 0; targetY = 0; animate(); };
    node.addEventListener("pointermove", onMove, { passive: true });
    node.addEventListener("pointerleave", reset);
    window.addEventListener("blur", reset);
    return () => {
      cancelAnimationFrame(frame);
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", reset);
      window.removeEventListener("blur", reset);
    };
  }, [moving]);

  function toggleMotion() {
    const next = !motionEnabled;
    setPreferences(current => ({ ...current, motionEnabled: next }));
    try { localStorage.setItem("escuela-motion", next ? "on" : "off"); } catch { /* Optional preference. */ }
  }

  function changeLocale(value: string) {
    if (!isLocale(value)) return;
    setPreferences(current => ({ ...current, locale: value }));
    try { localStorage.setItem("escuela-locale", value); } catch { /* Works without storage. */ }
  }

  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    setPreferences(current => ({ ...current, theme: next }));
    try { localStorage.setItem("escuela-theme", next); } catch { /* Works without storage. */ }
  }

  return (
    <div className={"site " + (moving ? "motion-on" : "motion-off")} lang={locale}>
      <a className="skip-link" href="#contenido">{copy.ui.skip}</a>
      <header className="site-header">
        <Wordmark copy={copy} />
        <nav className="desktop-nav" aria-label={copy.ui.mainNav}>
          {navigation.map(item => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
        <div className="header-preferences">
          <div className="language-control">
            <Select value={locale} onValueChange={changeLocale}>
              <SelectTrigger className="language-trigger" aria-label={copy.ui.language + ": " + selectedLanguage.name}>
                <Globe2 size={17} aria-hidden="true" />
                <SelectValue><span>{selectedLanguage.short}</span></SelectValue>
              </SelectTrigger>
              <SelectContent className="language-options" position="popper" align="end">
                {languages.map(language => <SelectItem className="language-option" key={language.code} value={language.code}><span lang={language.code}>{language.name}</span><span className="language-code" aria-hidden="true">{language.short}</span></SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <button className="theme-toggle" onClick={toggleTheme} aria-label={theme === "dark" ? copy.ui.light : copy.ui.dark} title={theme === "dark" ? copy.ui.light : copy.ui.dark} aria-pressed={theme === "dark"}>{theme === "dark" ? <Sun size={21} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}</button>
        </div>
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild><button className="menu-toggle" aria-label={copy.ui.openMenu}><Menu size={25} /></button></SheetTrigger>
          <SheetContent className="mobile-sheet" showCloseButton={false} lang={locale}>
            <SheetHeader><SheetTitle>La Escuela VT</SheetTitle><SheetDescription>{copy.meta.title}</SheetDescription></SheetHeader>
            <SheetClose asChild><button className="menu-close" aria-label={copy.ui.closeMenu}><X size={24} /></button></SheetClose>
            <nav aria-label={copy.ui.mobileNav}>{navigation.map((item, index) => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}><span>0{index + 1}</span>{item.label}</a>)}</nav>
            <div className="mobile-menu-bottom"><Star size={28} aria-hidden="true" />{copy.hero.lines.join(" ")}</div>
          </SheetContent>
        </Sheet>
      </header>

      <main id="contenido">
        <section className="hero" id="inicio" ref={hero} aria-labelledby="hero-title">
          <div className="hero-image-layer"><img src="/assets/school-group-1024.webp" srcSet="/assets/school-group-640.webp 640w, /assets/school-group-1024.webp 1024w, /assets/school-group-1600.webp 1600w" sizes="(max-width: 700px) calc(100vw - 60px), (max-width: 1000px) 680px, 58vw" alt={groupArtworkAlt[locale]} fetchPriority="high" width="1024" height="1024" /></div>
          <div className="hero-wash" aria-hidden="true" /><div className="hero-grid" aria-hidden="true" />
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow"><span />{copy.hero.eyebrow}</p>
            <h1 id="hero-title">{copy.hero.lines[0]}<br />{copy.hero.lines[1]}<br /><span>{copy.hero.lines[2]}</span><Star className="title-star" fill="currentColor" strokeWidth={1} aria-hidden="true" /></h1>
            <p className="hero-description">{copy.hero.description[0]}<br />{copy.hero.description[1]}</p>
            <a className="button-primary" href="#grupo">{copy.hero.cta}<Sparkles size={19} aria-hidden="true" /></a>
          </div>
          <div className="hero-stamp" aria-hidden="true"><span>{copy.hero.stamp[0]}</span><Heart size={25} fill="currentColor" strokeWidth={1.5} /><strong>{copy.hero.stamp[1]}<br />{copy.hero.stamp[2]}</strong></div>
          <div className="hero-orbit" aria-hidden="true"><Sparkles size={38} /></div>
          <div className="hero-caption"><span>LA ESCUELA VT</span><span>{copy.hero.caption}</span></div>
          <div className="hero-bottom">
            <a className="scroll-cue" href="#grupo"><span className="scroll-line" />{copy.hero.scroll}</a>
            <div className="motion-controls">
              <span className="pointer-hint"><MousePointer2 size={14} aria-hidden="true" />{moving ? copy.hero.pointer : copy.hero.still}</span>
              <button className="motion-toggle" onClick={toggleMotion} disabled={reducedMotion} aria-pressed={!moving} aria-label={reducedMotion ? copy.hero.reduced : moving ? copy.hero.pause : copy.hero.play} title={reducedMotion ? copy.hero.reduced : moving ? copy.hero.pause : copy.hero.play}>{moving ? <Pause size={15} fill="currentColor" /> : <Play size={15} fill="currentColor" />}</button>
            </div>
          </div>
        </section>

        <div className="ticker" aria-label={copy.ticker.join(", ")}>
          <div className="ticker-track" aria-hidden="true">{[0, 1, 2, 3].map(i => <div className="ticker-group" key={i}>{copy.ticker.map(label => <span className="ticker-item" key={label}><span>{label}</span><Star size={22} fill="currentColor" /></span>)}</div>)}</div>
        </div>

        <section className="about section-shell" id="grupo" aria-labelledby="about-title">
          <div className="section-side"><span className="section-number">01 / {copy.nav.group.toLocaleUpperCase(locale)}</span><div className="about-illustration" aria-hidden="true"><img src="/assets/character-trio.webp" alt="" loading="lazy" width="640" height="1138" /></div></div>
          <div className="about-main">
            <p className="eyebrow">{copy.about.eyebrow}</p>
            <h2 id="about-title">{copy.about.title[0]}<br /><span>{copy.about.title[1]}</span></h2>
            <div className="about-body">{copy.about.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
            <div className="about-note"><Heart size={18} aria-hidden="true" /><span>{copy.about.note}</span></div>
          </div>
        </section>

        <section className="universe" id="universo" aria-labelledby="universe-title">
          <div className="section-shell universe-inner">
            <div className="section-heading"><div><span className="section-number">02 / {copy.nav.universe.toLocaleUpperCase(locale)}</span><h2 id="universe-title">{copy.universe.title[0]}<br /><em>{copy.universe.title[1]}</em></h2></div><p>{copy.universe.introduction}</p></div>
            <Tabs className="world-tabs" value={activeWorld} onValueChange={setActiveWorld}>
              <TabsList className="world-tabs-list" aria-label={copy.universe.tabs}>{worlds.map(world => <TabsTrigger key={world.id} value={world.id} className="world-tab"><world.icon size={20} aria-hidden="true" />{world.label}<span>{world.number}</span></TabsTrigger>)}</TabsList>
              {worlds.map(world => <TabsContent key={world.id} value={world.id} className="world-panel" style={{ "--world-color": world.color } as CSSProperties}>
                <div className="world-art" aria-hidden="true"><span className="world-sticker">{world.sticker}<Star size={14} fill="currentColor" /></span><img src={world.image} alt="" loading="lazy" width={world.imageWidth} height={world.imageHeight} /><div className="world-art-footer"><world.icon size={22} strokeWidth={1.5} /><p>{world.quote}</p><span>LA ESCUELA / {copy.universe.room} {world.number}</span></div></div>
                <div className="world-copy"><span className="world-code">{copy.universe.room} {world.number} — {world.label.toLocaleUpperCase(locale)}</span><h3>{world.title}</h3><p>{world.description}</p><ul className="world-tags">{world.tags.map(tag => <li key={tag}>{tag}</li>)}</ul></div>
              </TabsContent>)}
            </Tabs>
          </div>
        </section>

        <section className="people section-shell" id="personas" aria-labelledby="people-title">
          <div className="section-heading people-heading">
            <div><span className="section-number">03 / {copy.people.eyebrow}</span><h2 id="people-title">{copy.people.title[0]}<br /><em>{copy.people.title[1]}</em></h2></div>
            <p>{copy.people.intro}</p>
          </div>
          <Tabs className="people-tabs" value={activePeople} onValueChange={setActivePeople}>
            <TabsList className="people-tabs-list" aria-label={copy.people.tabs}>
              <TabsTrigger className="people-tab" value="teachers"><GraduationCap size={21} aria-hidden="true" />{copy.people.teachers}</TabsTrigger>
              <TabsTrigger className="people-tab" value="honor"><Crown size={21} aria-hidden="true" />{copy.people.honor}</TabsTrigger>
            </TabsList>
            <TabsContent className="people-panel" value="teachers">
              <div className="people-emblem people-emblem-art teacher-emblem" aria-hidden="true"><img src="/assets/school-crest.webp" alt="" loading="lazy" width="512" height="512" /></div>
              <div className="people-copy"><p className="eyebrow">{copy.people.teacherLabel}</p><h3>{copy.people.teacherTitle}</h3><p>{copy.people.teacherDescription}</p><div className="profiles-coming"><Sparkles size={17} aria-hidden="true" /><span>{copy.people.soon}</span></div></div>
            </TabsContent>
            <TabsContent className="people-panel" value="honor">
              <div className="people-emblem people-emblem-art honor-emblem" aria-hidden="true"><img src="/assets/honor-frame.webp" alt="" loading="lazy" width="512" height="910" /></div>
              <div className="people-copy"><p className="eyebrow">{copy.people.honorLabel}</p><h3>{copy.people.honorTitle}</h3><p>{copy.people.honorDescription}</p><div className="profiles-coming"><Sparkles size={17} aria-hidden="true" /><span>{copy.people.soon}</span></div></div>
            </TabsContent>
          </Tabs>
        </section>

        <section className="community section-shell" id="comunidad" aria-labelledby="community-title">
          <div className="community-top"><span className="section-number">04 / {copy.nav.community.toLocaleUpperCase(locale)}</span><span className="community-label"><Heart size={16} aria-hidden="true" />{copy.community.badge}</span></div>
          <h2 id="community-title">{copy.community.title[0]}<br />{copy.community.title[1]}{copy.community.title[1] && " "}<span>{copy.community.title[2]}</span></h2>
          <p className="community-description">{copy.community.description[0]}<br />{copy.community.description[1]}</p>
          <div className="community-values">{copy.community.values.map((value, index) => <article key={index}><span>0{index + 1}</span><h3>{value.title}</h3><p>{value.description}</p></article>)}</div>
          <div className="community-ending"><span>{copy.community.ending}</span><Sparkles size={24} aria-hidden="true" /></div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-top"><Wordmark inverse copy={copy} /><nav aria-label={copy.ui.footerNav}>{navigation.map(item => <a key={item.href} href={item.href}>{item.label}</a>)}</nav></div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} La Escuela VT</span><span>{copy.footer}<Star size={12} fill="currentColor" /></span><a href="#inicio">{copy.ui.back}</a></div>
      </footer>
    </div>
  );
}
