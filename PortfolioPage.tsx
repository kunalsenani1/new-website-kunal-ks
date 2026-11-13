"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUp,
  ExternalLink,
  Mail,
  Menu,
  Phone,
  Play,
  Sparkles,
  X
} from "lucide-react";
import {
  capabilities,
  experience,
  navItems,
  processSteps,
  projects,
  services,
  showreelTags,
  software,
  stats,
  testimonials
} from "@/lib/portfolio-data";
import { Reveal } from "@/components/MotionPrimitives";
import { Section } from "@/components/Section";

const contact = {
  phone: "9983989783",
  email: "kunalsenani2@gmail.com",
  portfolio: "https://linktr.ee/kunalsenani1",
  location: "Jaipur, India"
};

const showreelEmbedUrl = "https://www.youtube.com/embed/rg1Yn9ctYWs?si=VZggy5BsStSTnQQw&playsinline=1&rel=0";
const showreelAutoplayEmbedUrl = "https://www.youtube.com/embed/rg1Yn9ctYWs?si=VZggy5BsStSTnQQw&autoplay=1&playsinline=1&rel=0";

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      let current = "home";
      for (const item of navItems) {
        const id = item.href.replace("#", "");
        const el = document.getElementById(id);
        if (el && el.offsetTop - 160 <= window.scrollY) current = id;
      }
      if (current) setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-white/10 bg-ink/[0.72] shadow-glow backdrop-blur-2xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
        <a href="#home" className="group flex items-center gap-3" aria-label="Kunal Senani home">
          <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-cyanfire/40 bg-white/5 shadow-glow">
            <img src="/assets/kunal-senani-brand.jpg" alt="Kunal Senani" style={{ position: "absolute", width: "260%", maxWidth: "none", height: "auto", left: "-104%", top: "-52%" }} />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-sm font-semibold uppercase tracking-[0.25em] text-zinc-50">
              Kunal Senani
            </span>
            <span className="block text-xs text-zinc-400">Video Editor / Jaipur</span>
          </span>
        </a>

        <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.045] p-1 backdrop-blur-xl lg:flex">
          {navItems.map((item) => {
            const id = item.href.replace("#", "");
            return (
              <a
                key={item.href}
                href={item.href}
                className={`relative rounded-full px-4 py-2 text-xs font-medium transition ${
                  active === id ? "text-ink" : "text-zinc-300 hover:text-white"
                }`}
              >
                {active === id && (
                  <motion.span
                    layoutId="active-pill"
                    className="absolute inset-0 rounded-full bg-cyanfire"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </a>
            );
          })}
        </div>

        <a
          href={`mailto:${contact.email}`}
          className="hidden rounded-full border border-amberglow/40 bg-amberglow/10 px-5 py-2.5 text-sm font-semibold text-amberglow transition hover:border-amberglow hover:bg-amberglow hover:text-ink md:inline-flex"
        >
          Book Edit
        </a>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-5 mb-5 rounded-3xl border border-white/10 bg-ink/90 p-3 shadow-glow backdrop-blur-2xl lg:hidden"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-2xl px-4 py-3 text-sm font-medium text-zinc-200 hover:bg-white/[0.08] hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </motion.div>
      )}
    </header>
  );
}

function EditingConsole() {
  const waveform = [30, 52, 38, 72, 42, 61, 34, 80, 55, 46, 68, 36, 78, 45, 58, 32];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative mx-auto w-full max-w-2xl"
    >
      <motion.div
        animate={{ y: [0, 18, 0], x: [0, -8, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-3 bottom-28 z-20 hidden w-52 rounded-2xl border border-cyanfire/20 bg-ink/[0.65] p-4 shadow-glow backdrop-blur-2xl md:block"
      >
        <div className="mb-3 flex items-center gap-2 text-xs text-cyanfire">
          <Sparkles size={14} /> Retention Map
        </div>
        <div className="space-y-2">
          {[86, 72, 94, 61].map((width, index) => (
            <span key={index} className="block h-2 rounded-full bg-white/10">
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: `${width}%` }}
                transition={{ delay: 0.6 + index * 0.18, duration: 1.1 }}
                className="block h-full rounded-full bg-gradient-to-r from-cyanfire to-amberglow"
              />
            </span>
          ))}
        </div>
      </motion.div>

      <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.15] bg-zinc-950/70 p-3 shadow-[0_40px_120px_rgba(0,0,0,.65)] backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,240,255,.16),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(255,181,69,.14),transparent_28%)]" />
        <div className="relative rounded-[1.45rem] border border-white/10 bg-black/70 p-4">
          <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3 text-[11px] uppercase tracking-[0.28em] text-zinc-400">
            <span>Sequence / Showreel_2026</span>
            <span className="text-cyanfire">00:09:27:14</span>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900 via-zinc-950 to-cyan-950/40">
            <iframe
              className="absolute inset-0 h-full w-full"
              src={showreelEmbedUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
            <div className="pointer-events-none absolute inset-4 border border-white/[0.15]" />
            <div className="pointer-events-none absolute left-4 top-4 h-5 w-5 border-l border-t border-cyanfire" />
            <div className="pointer-events-none absolute right-4 top-4 h-5 w-5 border-r border-t border-cyanfire" />
            <div className="pointer-events-none absolute bottom-4 left-4 h-5 w-5 border-b border-l border-cyanfire" />
            <div className="pointer-events-none absolute bottom-4 right-4 h-5 w-5 border-b border-r border-cyanfire" />
          </div>
          <div className="mt-4 grid gap-3">
            {[0, 1, 2].map((row) => (
              <div key={row} className="grid grid-cols-12 gap-2">
                {Array.from({ length: 12 }).map((_, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0.25 }}
                    animate={{ opacity: [0.25, 0.85, 0.35] }}
                    transition={{ duration: 2.2, delay: (index + row) * 0.08, repeat: Infinity }}
                    className={`h-8 rounded-md ${
                      row === 0
                        ? "bg-cyanfire/20"
                        : row === 1
                        ? "bg-amberglow/20"
                        : "bg-record/20"
                    }`}
                  />
                ))}
              </div>
            ))}
            <div className="flex h-16 items-end gap-1 rounded-xl border border-white/10 bg-white/[0.03] px-3 pb-3">
              {waveform.map((height, index) => (
                <motion.span
                  key={index}
                  animate={{ height: [`${height * 0.6}%`, `${height}%`, `${height * 0.72}%`] }}
                  transition={{ duration: 1.5, delay: index * 0.04, repeat: Infinity }}
                  className="w-full rounded-full bg-gradient-to-t from-cyanfire to-amberglow"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Hero({ onViewShowreel }: { onViewShowreel: () => void }) {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden px-5 pb-24 pt-32 sm:px-8 lg:px-12 lg:pt-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(0,240,255,.16),transparent_30%),radial-gradient(circle_at_80%_24%,rgba(255,181,69,.13),transparent_28%),linear-gradient(180deg,#050608_0%,#07090d_58%,#050608_100%)]" />
      <div className="absolute inset-0 opacity-[0.08] grain" />
      <div className="absolute inset-x-0 top-24 h-px bg-gradient-to-r from-transparent via-cyanfire/40 to-transparent" />
      <div className="relative mx-auto grid min-h-[calc(100vh-9rem)] max-w-7xl items-center gap-14 lg:grid-cols-[0.92fr_1.08fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-medium uppercase tracking-[0.26em] text-zinc-300 backdrop-blur-xl"
          >
            <span className="h-2 w-2 rounded-full bg-record shadow-[0_0_18px_rgba(255,49,88,.9)]" />
            10+ years in the edit room
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08 }}
            className="font-display text-6xl font-semibold leading-[0.85] text-zinc-50 sm:text-7xl lg:text-8xl xl:text-[8.3rem]"
          >
            Kunal
            <span className="block bg-gradient-to-r from-zinc-50 via-cyan-100 to-amber-100 bg-clip-text text-transparent">
              Senani
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.18 }}
            className="mt-7 max-w-2xl font-display text-2xl font-medium leading-tight text-zinc-100 sm:text-3xl"
          >
            Video Editor for Reels, YouTube, Podcasts, Campaigns & Cinematic Stories
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.28 }}
            className="mt-6 max-w-xl text-base leading-8 text-zinc-400 sm:text-lg"
          >
            Jaipur-based editor shaping raw footage into cinematic, social-first stories for creators,
            brands, public figures, campaigns, and production teams.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.38 }}
            className="mt-9 flex flex-col gap-4 sm:flex-row"
          >
            <button
              type="button"
              onClick={onViewShowreel}
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-cyanfire px-7 text-sm font-bold uppercase tracking-[0.18em] text-ink shadow-glow transition hover:scale-[1.03]"
            >
              <Play size={18} fill="currentColor" /> View Showreel
            </button>
            <a
              href="#contact"
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-white/[0.15] bg-white/[0.05] px-7 text-sm font-bold uppercase tracking-[0.18em] text-zinc-50 backdrop-blur-xl transition hover:border-amberglow/70 hover:text-amberglow"
            >
              <Mail size={18} /> Contact Kunal
            </a>
          </motion.div>
        </div>

        <EditingConsole />
      </div>
    </section>
  );
}

function Showreel({ shouldAutoplay }: { shouldAutoplay: boolean }) {
  return (
    <Section id="showreel" eyebrow="Featured Showreel" title="Cinematic pacing built for modern attention.">
      <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <Reveal>
          <div className="group relative overflow-hidden rounded-[2rem] border border-white/[0.12] bg-white/[0.04] p-3 shadow-glow backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-cyanfire/10 via-transparent to-amberglow/10 opacity-70 transition group-hover:opacity-100" />
            <div className="relative aspect-video overflow-hidden rounded-[1.45rem] bg-gradient-to-br from-zinc-900 via-black to-cyan-950/40">
              <iframe
                className="absolute inset-0 h-full w-full"
                src={shouldAutoplay ? showreelAutoplayEmbedUrl : showreelEmbedUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="text-lg leading-8 text-zinc-300">
            Edits are shaped for story, rhythm, platform behavior, and emotion: fast-paced reels,
            polished podcasts, cinematic campaign films, music videos, documentaries, and YouTube
            cuts with clean retention logic.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {showreelTags.map((tag) => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.06, y: -3 }}
                className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-zinc-200 shadow-glow backdrop-blur-xl"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function PortfolioGrid() {
  return (
    <Section id="portfolio" eyebrow="Portfolio Grid" title="Selected edits across campaign, creator, and brand worlds.">
      <div className="mb-8 flex justify-end">
        <a href="https://www.youtube.com/playlist?list=PLpMcE_GzXKYK2IdVjVypkjdQKE1dbQaAC" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-cyanfire hover:underline">
          View more from what I made <ExternalLink size={17} />
        </a>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
          <Reveal key={project.title} delay={(index % 3) * 0.06}>
            <motion.article
              whileHover={{ y: -8, scale: 1.015 }}
              className="group relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/[0.045] p-3 shadow-[0_24px_70px_rgba(0,0,0,.35)] backdrop-blur-xl"
            >
              <div className={`relative aspect-[4/3] overflow-hidden rounded-[1.15rem] bg-gradient-to-br ${project.tone}`}>
                {project.embedUrl ? (
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src={project.embedUrl}
                    title={project.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,.16),transparent_35%),radial-gradient(circle_at_70%_20%,rgba(255,255,255,.18),transparent_20%)]" />
                    <div className="absolute inset-4 border border-white/10" />
                    <div className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/[0.35] text-white backdrop-blur-xl transition group-hover:bg-cyanfire group-hover:text-ink">
                      <Play size={24} fill="currentColor" />
                    </div>
                  </>
                )}
                <div className="absolute left-4 top-4 rounded-full border border-white/[0.12] bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white backdrop-blur-xl">
                  {project.platform}
                </div>
                <div className="absolute right-4 top-4 rounded-full bg-black/[0.45] px-3 py-1 text-xs text-zinc-200 backdrop-blur-xl">
                  {project.duration}
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-display text-xl font-semibold text-zinc-50">{project.title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-400">{project.description}</p>
              </div>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Services() {
  return (
    <Section id="services" eyebrow="Services" title="Editing systems for every screen and story format.">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <Reveal key={service.title} delay={(index % 4) * 0.05}>
              <motion.article
                whileHover={{ y: -8 }}
                className="group h-full rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-white/[0.075] to-white/[0.025] p-6 shadow-[0_24px_70px_rgba(0,0,0,.3)] backdrop-blur-xl transition hover:border-cyanfire/[0.35]"
              >
                <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl border border-cyanfire/25 bg-cyanfire/10 text-cyanfire shadow-glow transition group-hover:scale-110 group-hover:bg-cyanfire group-hover:text-ink">
                  <Icon size={24} />
                </div>
                <h3 className="font-display text-xl font-semibold text-zinc-50">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{service.description}</p>
              </motion.article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

function About() {
  return (
    <Section id="about" eyebrow="About Kunal" title="A story-first editor with production instincts.">
      <div className="grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr]">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] p-4 shadow-amber backdrop-blur-xl">
            <div className="aspect-[4/5] rounded-[1.45rem] bg-[radial-gradient(circle_at_35%_22%,rgba(255,181,69,.18),transparent_30%),linear-gradient(145deg,#15171c,#050608_62%,rgba(0,240,255,.16))]" />
            <div className="absolute left-8 top-8 rounded-full border border-record/40 bg-record/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-record">
              Director / Writer / Editor
            </div>
            <div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-white/10 bg-black/[0.45] p-4 backdrop-blur-xl">
              <p className="font-display text-2xl font-semibold text-zinc-50">Jaipur, India</p>
              <p className="mt-1 text-sm text-zinc-400">Cinematic edits for social, campaign, and long-form worlds.</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-xl leading-9 text-zinc-200">
            Kunal Senani is a Jaipur-based video editor with 10+ years of experience helping creators,
            brands, public figures, and production teams transform raw footage into cinematic and
            engaging stories.
          </p>
          <p className="mt-6 text-base leading-8 text-zinc-400">
            His work spans films, music videos, podcasts, reels, political campaigns, YouTube videos,
            brand content, documentaries, and social media campaigns. He has also worked as a writer,
            director, team lead, and creative editor.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {stats.map((stat, index) => (
              <motion.div
                key={stat}
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 text-sm font-semibold text-zinc-100 backdrop-blur-xl"
              >
                {stat}
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function ExperienceTimeline() {
  return (
    <Section id="experience" eyebrow="Experience Timeline" title="Ten years of production pressure, polish, and pacing.">
      <div className="relative">
        <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-cyanfire via-white/20 to-amberglow md:block" />
        <div className="space-y-6">
          {experience.map((item, index) => (
            <Reveal key={`${item.company}-${item.dates}`} delay={index * 0.04}>
              <motion.article
                whileHover={{ x: 6 }}
                className="relative rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl md:ml-12"
              >
                <span className="absolute -left-[3.22rem] top-8 hidden h-4 w-4 rounded-full border border-cyanfire bg-ink shadow-glow md:block" />
                <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
                  <div>
                    <p className="text-sm uppercase tracking-[0.25em] text-cyanfire">{item.company}</p>
                    <h3 className="mt-2 font-display text-2xl font-semibold text-zinc-50">{item.position}</h3>
                  </div>
                  <div className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm text-zinc-300">
                    {item.dates} / {item.location}
                  </div>
                </div>
                <div className="mt-5 grid gap-3 lg:grid-cols-3">
                  {item.achievements.map((achievement) => (
                    <p key={achievement} className="rounded-2xl border border-white/[0.08] bg-black/20 p-4 text-sm leading-6 text-zinc-400">
                      {achievement}
                    </p>
                  ))}
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Skills() {
  return (
    <Section id="skills" eyebrow="Editing Toolkit" title="Software fluency with a cinematic operating system.">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl">
            <div className="space-y-6">
              {software.map((tool) => (
                <div key={tool.name}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-semibold text-zinc-100">{tool.name}</span>
                    <span className="text-cyanfire">{tool.level}%</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${tool.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-cyanfire via-zinc-100 to-amberglow"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex flex-wrap gap-3">
            {capabilities.map((capability, index) => (
              <motion.span
                key={capability}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.035 }}
                whileHover={{ scale: 1.06, y: -3 }}
                className="rounded-full border border-white/10 bg-white/[0.055] px-5 py-3 text-sm font-medium text-zinc-200 shadow-glow backdrop-blur-xl"
              >
                {capability}
              </motion.span>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function Process() {
  return (
    <Section id="process" eyebrow="Process" title="A professional editing pipeline from brief to delivery.">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {processSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <Reveal key={step.title} delay={(index % 3) * 0.06}>
              <div className="relative h-full rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl">
                <div className="mb-7 flex items-center justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-amberglow/25 bg-amberglow/10 text-amberglow">
                    <Icon size={22} />
                  </div>
                  <span className="font-display text-4xl font-semibold text-white/10">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="font-display text-xl font-semibold text-zinc-50">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{step.description}</p>
                <motion.span
                  animate={{ x: ["0%", "90%", "0%"] }}
                  transition={{ duration: 4, repeat: Infinity, delay: index * 0.2 }}
                  className="mt-6 block h-1 w-full rounded-full bg-gradient-to-r from-transparent via-cyanfire to-transparent"
                />
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

function Testimonials() {
  return (
    <Section id="testimonials" eyebrow="Client Notes" title="Trusted for pace, taste, and delivery discipline.">
      <div className="grid gap-5 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Reveal key={testimonial.quote} delay={index * 0.08}>
            <motion.figure
              whileHover={{ y: -8 }}
              className="h-full rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-6 shadow-[0_24px_70px_rgba(0,0,0,.28)] backdrop-blur-xl"
            >
              <blockquote className="font-display text-2xl font-medium leading-tight text-zinc-50">
                "{testimonial.quote}"
              </blockquote>
              <figcaption className="mt-8 text-sm text-zinc-400">
                <span className="block font-semibold text-cyanfire">{testimonial.name}</span>
                {testimonial.role}
              </figcaption>
            </motion.figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Contact() {
  return (
    <Section id="contact" className="pb-16">
      <div className="relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-white/[0.055] p-8 shadow-glow backdrop-blur-xl sm:p-10 lg:p-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(0,240,255,.18),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(255,181,69,.18),transparent_34%)]" />
        <div className="relative grid items-end gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.36em] text-cyanfire">Contact</p>
            <h2 className="font-display text-4xl font-semibold leading-[0.98] text-zinc-50 sm:text-6xl">
              Build the next story with a sharper edit.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
              Available for reels, YouTube edits, podcasts, campaign films, brand content, music videos,
              documentaries, and ongoing social packages.
            </p>
          </div>
          <div className="space-y-4">
            {[
              ["Email", contact.email],
              ["Phone", contact.phone],
              ["Portfolio", "linktr.ee/kunalsenani1"],
              ["Location", contact.location]
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-black/25 p-4 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">{label}</p>
                <p className="mt-1 font-display text-lg font-semibold text-zinc-50">{value}</p>
              </div>
            ))}
            <div className="grid gap-3 sm:grid-cols-3">
              <a className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cyanfire px-4 text-sm font-bold text-ink" href={`mailto:${contact.email}`}>
                <Mail size={17} /> Email
              </a>
              <a className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/[0.15] bg-white/[0.08] px-4 text-sm font-bold text-zinc-50" href={contact.portfolio} target="_blank" rel="noreferrer">
                <ExternalLink size={17} /> Portfolio
              </a>
              <a className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-amberglow/40 bg-amberglow/10 px-4 text-sm font-bold text-amberglow" href={`tel:${contact.phone}`}>
                <Phone size={17} /> Call
              </a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="px-5 pb-8 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-zinc-500 sm:flex-row">
        <p>Kunal Senani © 2026. Premium video editing portfolio.</p>
        <div className="flex items-center gap-4">
          <a href={contact.portfolio} target="_blank" rel="noreferrer" className="hover:text-cyanfire">
            Portfolio
          </a>
          <a href="#home" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-200 hover:border-cyanfire hover:text-cyanfire" aria-label="Back to top">
            <ArrowUp size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export function PortfolioPage() {
  const [shouldAutoplayShowreel, setShouldAutoplayShowreel] = useState(false);

  const handleViewShowreel = () => {
    setShouldAutoplayShowreel(true);
    document.getElementById("showreel")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="min-h-screen overflow-hidden bg-ink text-zinc-100">
      <Header />
      <Hero onViewShowreel={handleViewShowreel} />
      <Showreel shouldAutoplay={shouldAutoplayShowreel} />
      <PortfolioGrid />
      <Services />
      <About />
      <ExperienceTimeline />
      <Skills />
      <Process />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
