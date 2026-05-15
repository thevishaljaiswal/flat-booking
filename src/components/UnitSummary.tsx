import { UnitType } from "@/data/buildingData";
import { CheckCircle2, XCircle, Clock, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";

interface UnitSummaryProps {
  units: UnitType[];
}

const UnitSummary = ({ units }: UnitSummaryProps) => {
  const available = units.filter((u) => u.status === "available").length;
  const booked = units.filter((u) => u.status === "booked").length;
  const hold = units.filter((u) => u.status === "hold").length;
  const total = units.length;
  const pct = (v: number) => (total > 0 ? Math.round((v / total) * 100) : 0);

  const stats = [
    {
      label: "Total",
      value: total,
      pct: 100,
      icon: LayoutGrid,
      bg: "bg-slate-100 border-slate-200",
      iconColor: "text-slate-700",
      text: "text-slate-900",
    },
    {
      label: "Available",
      value: available,
      pct: pct(available),
      icon: CheckCircle2,
      bg: "bg-emerald-100 border-emerald-200",
      iconColor: "text-emerald-700",
      text: "text-emerald-900",
    },
    {
      label: "Booked",
      value: booked,
      pct: pct(booked),
      icon: XCircle,
      bg: "bg-rose-100 border-rose-200",
      iconColor: "text-rose-700",
      text: "text-rose-900",
    },
    {
      label: "On Hold",
      value: hold,
      pct: pct(hold),
      icon: Clock,
      bg: "bg-amber-100 border-amber-200",
      iconColor: "text-amber-700",
      text: "text-amber-900",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
      {stats.map((s) => {
        const Icon = s.icon;
        return (
          <div
            key={s.label}
            className={cn(
              "flex items-center gap-2 rounded-lg px-2.5 py-1.5 border shadow-sm",
              s.bg
            )}
          >
            <div className={cn("w-7 h-7 rounded-md bg-white/70 flex items-center justify-center shrink-0", s.iconColor)}>
              <Icon className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className={cn("text-[10px] uppercase tracking-wider font-semibold leading-tight", s.text, "opacity-70")}>
                {s.label}
              </p>
              <div className="flex items-baseline gap-1.5">
                <p className={cn("text-base font-bold leading-tight", s.text)}>{s.value}</p>
                <p className={cn("text-[10px] font-semibold", s.text, "opacity-70")}>{s.pct}%</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UnitSummary;
