"use client";

import { useEffect, useId, useRef, useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { navLinks } from "@/config/nav";
import { toc } from "@/config/toc";

/** Matches the `xl` breakpoint, where the sidebar table of contents takes over. */
const DESKTOP_QUERY = "(min-width: 80rem)";

const linkClass =
  "hover:bg-surface flex min-h-11 items-center rounded-md px-3 py-2 text-[0.9375rem] leading-snug";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    const desktop = window.matchMedia(DESKTOP_QUERY);
    function onBreakpoint() {
      if (desktop.matches) setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="xl:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="text-fg hover:bg-surface border-line inline-flex size-11 items-center justify-center gap-2 rounded-lg border text-sm font-medium sm:h-10 sm:w-auto sm:px-3"
      >
        {open ? <CloseIcon /> : <MenuIcon />}
        <span className="sr-only sm:not-sr-only">Contents</span>
      </button>
      <div
        aria-hidden="true"
        hidden={!open}
        onClick={() => setOpen(false)}
        className="bg-fg/25 absolute inset-x-0 top-full h-dvh"
      />
      <nav
        id={panelId}
        aria-label="Contents"
        hidden={!open}
        className="bg-bg border-line absolute inset-x-0 top-full max-h-[calc(100dvh-var(--header-h))] overflow-y-auto overscroll-contain border-b shadow-[0_12px_24px_-12px_rgb(0_0_0/0.25)] sm:top-[calc(100%+0.5rem)] sm:right-(--gutter) sm:left-auto sm:max-h-[calc(100dvh-var(--header-h)-1.5rem)] sm:w-[34rem] sm:rounded-xl sm:border"
      >
        <div className="px-(--gutter) py-4 sm:px-2 sm:py-3">
          <p className="text-muted px-3 pb-1 text-sm font-semibold">On this page</p>
          <ul className="grid gap-0.5 sm:grid-cols-2 sm:gap-x-4">
            {toc.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} onClick={() => setOpen(false)} className={linkClass}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="lg:hidden">
            <p className="text-muted border-line mt-3 border-t px-3 pt-4 pb-1 text-sm font-semibold">
              Links
            </p>
            <ul className="grid gap-0.5 sm:grid-cols-2 sm:gap-x-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} onClick={() => setOpen(false)} className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
