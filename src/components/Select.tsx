"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Icon } from "./Icons";

export type SelectOption = { value: string; label: string };

/**
 * Styled replacement for a native <select>, following the WAI-ARIA
 * "select-only combobox" pattern. Focus stays on the trigger and the
 * highlighted option is announced through aria-activedescendant. A hidden
 * input carries the value, so it submits with the form like a native field.
 */
export function Select({
  id,
  name,
  options,
  placeholder = "Select…",
  defaultValue = "",
  invalid = false,
  describedBy,
}: {
  id: string;
  name: string;
  options: SelectOption[];
  placeholder?: string;
  defaultValue?: string;
  invalid?: boolean;
  describedBy?: string;
}) {
  const listId = useId();
  const [value, setValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selectedIndex = options.findIndex((o) => o.value === value);
  const selected = options[selectedIndex];
  const optionId = (i: number) => `${listId}-opt-${i}`;

  // Close when the pointer goes down anywhere outside the control.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  // Keep the highlighted option in view while moving with the keyboard.
  useEffect(() => {
    if (!open) return;
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  const openList = (index = selectedIndex >= 0 ? selectedIndex : 0) => {
    setActive(index);
    setOpen(true);
  };

  const choose = (i: number) => {
    setValue(options[i].value);
    setOpen(false);
  };

  // Jump to the next option whose label starts with the typed character.
  const typeahead = (char: string) => {
    const c = char.toLowerCase();
    const start = open ? active : Math.max(selectedIndex, 0);
    for (let step = 1; step <= options.length; step++) {
      const i = (start + step) % options.length;
      if (options[i].label.toLowerCase().startsWith(c)) {
        if (open) setActive(i);
        else setValue(options[i].value);
        return;
      }
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = options.length - 1;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!open) openList();
        else setActive((i) => Math.min(i + 1, last));
        break;
      case "ArrowUp":
        e.preventDefault();
        if (!open) openList();
        else setActive((i) => Math.max(i - 1, 0));
        break;
      case "Home":
        if (open) {
          e.preventDefault();
          setActive(0);
        }
        break;
      case "End":
        if (open) {
          e.preventDefault();
          setActive(last);
        }
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (open) choose(active);
        else openList();
        break;
      case "Escape":
        if (open) {
          e.preventDefault();
          setOpen(false);
        }
        break;
      case "Tab":
        if (open) choose(active);
        break;
      default:
        if (e.key.length === 1 && /\S/.test(e.key) && !e.metaKey && !e.ctrlKey) {
          typeahead(e.key);
        }
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <input type="hidden" name={name} value={value} />
      <button
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open ? optionId(active) : undefined}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        className={`flex w-full items-center justify-between gap-3 rounded-xl border bg-white py-3 pl-4 pr-5 text-left text-[14px] transition-colors focus:outline-none focus:ring-2 ${
          invalid
            ? "border-red-400 focus:border-red-500 focus:ring-red-200"
            : open
              ? "border-brand-400 ring-2 ring-brand-200"
              : "border-navy-200 hover:border-navy-300 focus:border-brand-400 focus:ring-brand-200"
        }`}
      >
        <span className={selected ? "text-navy-800" : "text-navy-300"}>
          {selected ? selected.label : placeholder}
        </span>
        <Icon
          name="chevronDown"
          className={`h-4 w-4 shrink-0 text-navy-400 transition-transform duration-200 ${
            open ? "rotate-180 text-brand-500" : ""
          }`}
        />
      </button>

      <ul
        ref={listRef}
        id={listId}
        role="listbox"
        aria-labelledby={id}
        tabIndex={-1}
        className={`absolute inset-x-0 top-full z-30 mt-2 max-h-72 origin-top overflow-y-auto overscroll-contain rounded-xl border border-navy-100 bg-white p-1.5 shadow-[0_24px_60px_-12px_rgba(23,27,36,0.22)] transition-[opacity,transform] duration-150 ${
          open
            ? "visible scale-100 opacity-100"
            : "invisible scale-[0.98] opacity-0"
        }`}
      >
        {options.map((o, i) => {
          const isSelected = o.value === value;
          const isActive = i === active;
          return (
            <li
              key={o.value}
              id={optionId(i)}
              data-index={i}
              role="option"
              aria-selected={isSelected}
              // Keep focus on the trigger so keyboard handling stays in one place.
              onPointerDown={(e) => e.preventDefault()}
              onPointerMove={() => !isActive && setActive(i)}
              onClick={() => choose(i)}
              className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-[13.5px] transition-colors ${
                isActive ? "bg-cream-100 text-navy-900" : "text-navy-700"
              } ${isSelected ? "font-semibold text-brand-600" : ""}`}
            >
              {o.label}
              {isSelected && (
                <Icon name="check" className="h-4 w-4 shrink-0 text-brand-500" />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
