import { GlassWater, Snowflake, Truck, Users } from "lucide-react";

/** Section 2 — 4 advantage icons in a row (Doreca "vantaggi" strip). */
const BENEFITS = [
  { Icon: GlassWater, label: "Vasto assortimento" },
  { Icon: Snowflake, label: "Prodotti a temperatura" },
  { Icon: Truck, label: "Consegna 7/7" },
  { Icon: Users, label: "Team di esperti" },
];

export function BenefitsStrip() {
  return (
    <section aria-label="I nostri vantaggi" className="border-b border-border bg-bg">
      <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-6 px-6 py-8 md:grid-cols-4 md:py-10">
        {BENEFITS.map(({ Icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-3 text-center">
            <Icon className="h-11 w-11 text-text" strokeWidth={1.4} />
            <span className="text-[14px] font-medium text-text md:text-[15px]">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
