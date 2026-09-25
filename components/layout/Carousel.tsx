"use client";
export function Carousel({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      {title && <h2 className="text-sm font-bold tracking-[0.18em] text-[#8a8a8a]">{title}</h2>}
      <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-thin">
        {children}
      </div>
    </section>
  );
}
export function Section({ title, action, children }: { title: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg md:text-xl font-bold text-white">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}
