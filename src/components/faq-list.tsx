import { ChevronDown } from 'lucide-react';

import type { FaqItem } from '@/lib/site';

type FaqListProps = {
  items: FaqItem[];
  defaultOpenFirst?: boolean;
};

export function FaqList({ items, defaultOpenFirst = false }: FaqListProps) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <details
          key={item.question}
          open={defaultOpenFirst && index === 0}
          className="group rounded-3xl border border-slate-200 bg-white p-0 shadow-[0_16px_40px_rgba(15,23,42,0.04)]"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 text-left">
            <span className="text-base font-semibold text-slate-950 sm:text-lg">{item.question}</span>
            <ChevronDown className="h-5 w-5 shrink-0 text-slate-400 transition-transform group-open:rotate-180" />
          </summary>
          <div className="border-t border-slate-100 px-6 py-5 text-sm leading-7 text-slate-600 sm:text-base">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
