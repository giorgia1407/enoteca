import type { MenuItem, SpiceLevel } from "./data/menuData";
import { LeafIcon } from "./Icons";

/** Small dietary + spice pills shown on menu cards and in the upsell popup. */
export function DietaryTags({
  item,
  size = "sm",
}: {
  item: MenuItem;
  size?: "sm" | "xs";
}) {
  const pad = size === "xs" ? "px-1.5 py-0.5 text-[10px]" : "px-2 py-0.5 text-[11px]";
  const pills: { label: string; className: string; icon?: boolean }[] = [];

  if (item.tags.vegan) {
    pills.push({ label: "Vegan", className: "bg-[#E6EFE3] text-[#3B5A3F]", icon: true });
  } else if (item.tags.veg) {
    pills.push({ label: "Veg", className: "bg-[#E6EFE3] text-[#3B5A3F]", icon: true });
  }
  if (item.tags.gf) {
    pills.push({ label: "GF", className: "bg-[#FBEBD8] text-[#8A5A17]" });
  }

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {pills.map((pill) => (
        <span
          key={pill.label}
          className={`inline-flex items-center gap-1 rounded-full font-semibold ${pad} ${pill.className}`}
        >
          {pill.icon && <LeafIcon className="h-3 w-3" />}
          {pill.label}
        </span>
      ))}
      {item.spice > 0 && <SpicePills level={item.spice} size={size} />}
    </div>
  );
}

export function SpicePills({
  level,
  size = "sm",
}: {
  level: SpiceLevel;
  size?: "sm" | "xs";
}) {
  const pad = size === "xs" ? "px-1.5 py-0.5 text-[10px]" : "px-2 py-0.5 text-[11px]";
  return (
    <span
      className={`inline-flex items-center gap-0.5 rounded-full bg-[#FBE3DC] font-semibold text-[#C7401A] ${pad}`}
      aria-label={`Spice level ${level} of 3`}
    >
      {"🌶".repeat(level)}
    </span>
  );
}
