import { useEffect, useState } from "react";
import { TOOLS, FAQS, type Tool } from "./data";
import { useReveal } from "./useReveal";

const YEAR = new Date().getFullYear();

/* ------------------------------------------------------------------ header */
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<string>(() => document.documentElement.dataset.theme || "dark");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const flip = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    setTheme(next);
    try { localStorage.setItem("sx.theme", JSON.stringify(next)); } catch {}
  };

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="site-shell flex min-h-[4.5rem] items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-3" aria-label="Scrape X — home">
          <Wordmark className="h-6 w-auto sm:h-7" />
          <span className="eyebrow hidden whitespace-nowrap border-l pl-3 text-[0.62rem] tracking-[0.2em] text-[color:var(--muted-foreground)] sm:inline-block">
            Kraft Studios
          </span>
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          <a className="nav-link" href="#tools">Tools</a>
          <a className="nav-link" href="#local">Local-first</a>
          <a className="nav-link" href="#install">Install</a>
          <a className="nav-link" href="#faq">FAQ</a>
        </nav>
        <div className="flex items-center gap-3">
          <button onClick={flip} className="chip" aria-label="Toggle colour theme">
            {theme === "dark" ? "Light" : "Dark"}
          </button>
          <a className="pill hidden sm:inline-flex" href="#install">Get the kit</a>
        </div>
      </div>
    </header>
  );
}

/** The Scrape X wordmark, swapped for the ground it sits on. */
function Wordmark({ className = "" }: { className?: string }) {
  return (
    <>
      <img src="./logo-dark.webp" alt="Scrape X" width={900} height={208}
        className={`${className} hidden dark:block`} />
      <img src="./logo-light.webp" alt="Scrape X" width={900} height={208}
        className={`${className} block dark:hidden`} />
    </>
  );
}

/* -------------------------------------------------------------------- hero */
function Hero() {
  return (
    <section id="top" className="grain relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-28">
      <div className="blueprint-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div className="site-shell">
        <p className="eyebrow text-[color:var(--reg)]">A Kraft Studios tool kit · Five tools</p>
        <h1 className="mt-6 max-w-[16ch] text-[clamp(2.75rem,8vw,6.25rem)] font-bold leading-[0.95] tracking-[-0.03em]">
          Any website,<br />
          <span className="serif-note font-normal">turned into</span> data.
        </h1>
        <p className="mt-7 max-w-[52ch] text-[1.05rem] leading-relaxed text-[color:var(--muted-foreground)]">
          Five Chrome tools that read a page the way a designer needs to read it — the typefaces it
          really renders, the colours it is built from, the files it links to, the people it lists.
          Everything runs in your browser, and nothing leaves it.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a className="pill-solid" href="#tools">See the five tools</a>
          <a className="pill" href="#local">Why local-first</a>
        </div>
        <dl className="mt-16 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
          {[
            ["5", "Tools"],
            ["0", "Servers"],
            ["0", "Accounts"],
            ["MV3", "Manifest"],
          ].map(([v, k]) => (
            <div key={k}>
              <dt className="text-[2rem] font-bold leading-none tracking-tight">{v}</dt>
              <dd className="eyebrow mt-2 text-[color:var(--muted-foreground)]">{k}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- tools */
function ToolRow({ tool, i }: { tool: Tool; i: number }) {
  const flip = i % 2 === 1;
  return (
    <article className="reveal grid items-start gap-10 py-16 md:grid-cols-12 md:gap-14 md:py-24">
      <div className={`md:col-span-5 ${flip ? "md:order-2 md:col-start-8" : ""}`}>
        <div className="flex items-center gap-4">
          <img
            src={`./icon-${tool.slug}.png`}
            alt=""
            width={48}
            height={48}
            loading="lazy"
            className="h-12 w-12 rounded-[12px]"
          />
          <span className="eyebrow text-[color:var(--muted-foreground)]">Tool {tool.n}</span>
        </div>
        <h3 className="mt-6 text-[clamp(1.75rem,3.4vw,2.6rem)] font-bold leading-[1.05] tracking-[-0.02em]">
          {tool.name}
        </h3>
        <p className="serif-note mt-3 text-[1.15rem] text-[color:var(--reg)]">{tool.tagline}</p>
        <p className="mt-5 max-w-[46ch] leading-relaxed text-[color:var(--muted-foreground)]">{tool.blurb}</p>

        <ul className="mt-7 grid grid-cols-2 gap-x-6 gap-y-2">
          {tool.finds.map((f) => (
            <li key={f} className="mono flex items-baseline gap-2 text-[0.78rem] text-[color:var(--muted-foreground)]">
              <span className="text-[color:var(--reg)]">·</span>
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-wrap gap-2">
          {tool.outputs.map((o) => (
            <span key={o} className="chip">{o}</span>
          ))}
        </div>
      </div>

      <div className={`md:col-span-6 ${flip ? "md:order-1 md:col-start-1" : "md:col-start-7"}`}>
        <figure className="grain relative overflow-hidden rounded-2xl border bg-[color:var(--surface)] p-5 sm:p-7 md:sticky md:top-28">
          <picture>
            <source srcSet={`./shots/${tool.slug}-light.webp`} media="(prefers-color-scheme: light)" />
            <img
              src={`./shots/${tool.slug}.webp`}
              alt={`${tool.name} side panel`}
              width={396}
              height={900}
              loading="lazy"
              className="mx-auto block w-full max-w-[290px] rounded-xl border shadow-[0_30px_80px_-50px_rgba(0,0,0,0.9)]"
            />
          </picture>
        </figure>
      </div>
    </article>
  );
}

function Tools() {
  return (
    <section id="tools" className="site-shell">
      <SectionHead eyebrow="The kit" title="Five tools, one way of working" />
      <div className="divide-y">
        {TOOLS.map((t, i) => (
          <ToolRow key={t.slug} tool={t} i={i} />
        ))}
      </div>
    </section>
  );
}

function SectionHead({ eyebrow, title, note }: { eyebrow: string; title: string; note?: string }) {
  return (
    <div className="reveal max-w-3xl pt-20 md:pt-28">
      <p className="eyebrow text-[color:var(--reg)]">{eyebrow}</p>
      <h2 className="mt-5 text-[clamp(2rem,5vw,3.4rem)] font-bold leading-[1.03] tracking-[-0.025em]">{title}</h2>
      {note && <p className="mt-5 max-w-[56ch] leading-relaxed text-[color:var(--muted-foreground)]">{note}</p>}
    </div>
  );
}

/* --------------------------------------------------------------- local-first */
function LocalFirst() {
  const points = [
    ["Nothing is uploaded", "The page is read, measured and written to a file inside the browser. No request ever leaves for a server of ours, because there isn't one."],
    ["No account, no key", "Install and use. Nothing to sign up for, nothing to log into, nothing to forget."],
    ["Works where you work", "Anything you can open — an intranet, a staging site, a client's CMS behind a login — the tools can read."],
    ["Readable by anyone", "Plain JavaScript, no build step, no minified blob. You can open the folder and see exactly what it does."],
  ];
  return (
    <section id="local" className="grain relative overflow-hidden border-y bg-[color:var(--surface)]">
      <div className="site-shell pb-24">
        <SectionHead
          eyebrow="Local-first"
          title="The page never leaves your machine"
          note="Most scraping tools are a thin client in front of someone else's server — which means the pages you look at become somebody else's data. These don't work that way, and that is the whole point."
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border bg-[color:var(--line)] sm:grid-cols-2">
          {points.map(([h, p]) => (
            <div key={h} className="reveal bg-[color:var(--paper)] p-7 md:p-9">
              <h3 className="text-[1.05rem] font-bold tracking-tight">{h}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-[color:var(--muted-foreground)]">{p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- install */
function Install() {
  const live = TOOLS.filter((t) => t.storeUrl);
  return (
    <section id="install" className="site-shell pb-24">
      <SectionHead
        eyebrow="Install"
        title={live.length ? "Add the ones you need" : "Coming to the Chrome Web Store"}
        note={
          live.length
            ? "Each tool installs on its own. Chrome keeps them updated from there."
            : "The kit is being prepared for review. Each tool will install from the Chrome Web Store in one click, and update itself from there."
        }
      />
      <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border bg-[color:var(--line)] sm:grid-cols-2 lg:grid-cols-3">
        {TOOLS.map((t) => (
          <li key={t.slug} className="reveal flex flex-col gap-4 bg-[color:var(--paper)] p-7">
            <img src={`./icon-${t.slug}.png`} alt="" width={40} height={40} loading="lazy" className="h-10 w-10 rounded-[10px]" />
            <div>
              <h3 className="font-bold tracking-tight">{t.name}</h3>
              <p className="mt-1 text-[0.85rem] leading-relaxed text-[color:var(--muted-foreground)]">{t.tagline}</p>
            </div>
            {t.storeUrl ? (
              <a className="pill-solid mt-auto self-start" href={t.storeUrl} target="_blank" rel="noreferrer">
                Add to Chrome
              </a>
            ) : (
              <span className="chip mono mt-auto self-start">In review</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

/* --------------------------------------------------------------------- faq */
function Faq() {
  return (
    <section id="faq" className="border-t">
      <div className="site-shell pb-24">
        <SectionHead eyebrow="Questions" title="The things worth asking" />
        <dl className="mt-12 divide-y border-t">
          {FAQS.map(({ q, a }) => (
            <div key={q} className="reveal grid gap-3 py-8 md:grid-cols-12 md:gap-10">
              <dt className="text-[1.05rem] font-bold tracking-tight md:col-span-5">{q}</dt>
              <dd className="leading-relaxed text-[color:var(--muted-foreground)] md:col-span-7">{a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ footer */
function Footer() {
  return (
    <footer className="grain relative overflow-hidden border-t bg-[color:var(--surface)]">
      <div className="site-shell py-16">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <Wordmark className="h-10 w-auto sm:h-14" />
            <p className="serif-note mt-3 text-[1.1rem] text-[color:var(--muted-foreground)]">
              A tool kit by <span className="text-[color:var(--reg)]">Kraft Studios</span>
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 sm:items-end">
            <a className="pill" href="mailto:admin@kraftstudios.site">admin@kraftstudios.site</a>
            <a className="nav-link" href="https://kraftstudios.site" target="_blank" rel="noreferrer">
              kraftstudios.site
            </a>
          </div>
        </div>
        <div className="rule my-10" />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="eyebrow text-[color:var(--muted-foreground)]">Engineered Aesthetics</p>
          <p className="eyebrow text-[color:var(--muted-foreground)]">© {YEAR} Kraft Studios</p>
        </div>
      </div>
    </footer>
  );
}

export function App() {
  useReveal();
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Tools />
        <LocalFirst />
        <Install />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
