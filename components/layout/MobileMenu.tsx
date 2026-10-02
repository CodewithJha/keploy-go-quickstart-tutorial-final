"use client";

import { useEffect, useId, useRef, useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { navLinks } from "@/config/nav";
import { toc } from "@/config/toc";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="text-fg hover:bg-surface border-line inline-flex h-10 items-center gap-2 rounded-lg border px-3 text-sm font-medium"
      >
        {open ? <CloseIcon /> : <MenuIcon />}
        Contents
      </button>
      <nav
        id={panelId}
        aria-label="Mobile"
        hidden={!open}
        className="bg-bg border-line absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-b px-4 py-4 shadow-lg"
      >
        <p className="text-muted mb-2 text-sm font-semibold">On this page</p>
        <ul className="grid gap-1 sm:grid-cols-2">
          {toc.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className="hover:bg-surface block rounded-md px-2 py-2 text-sm"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="text-muted mt-4 mb-2 text-sm font-semibold">Links</p>
        <ul className="grid gap-1 sm:grid-cols-2">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="hover:bg-surface block rounded-md px-2 py-2 text-sm">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
