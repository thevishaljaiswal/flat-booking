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
      label: "Total Units",
      value: total,
      pct: 100,
      icon: LayoutGrid,
      ring: "ring-slate-200",
      iconBg: "bg-slate-100 text-slate-700",
      bar: "bg-slate-800",
    },
    {
      label: "Available",
      value: available,
      pct: pct(available),
      icon: CheckCircle2,
      ring: "ring-emerald-200",
      iconBg: "bg-emerald-100 text-emerald-700",
      bar: "bg-gradient-to-r from-emerald-400 to-teal-500",
    },
    {
      label: "Booked",
      value: booked,
      pct: pct(booked),
      icon: XCircle,
      ring: "ring-rose-200",
      iconBg: "bg-rose-100 text-rose-700",
      bar: "bg-gradient-to-r from-rose-400 to-pink-500",
    },
    {
      label: "On Hold",
      value: hold,
      pct: pct(hold),
      icon: Clock,
      ring: "ring-amber-200",
      iconBg: "bg-amber-100 text-amber-700",
      bar: "bg-gradient-to-r from-amber-400 to-orange-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      {stats.map((s) => {
        const Icon = s.icon;
        return (
          <div
            key={s.label}
            className={cn(
              "relative overflow-hidden rounded-xl bg-white p-4 ring-1 shadow-sm hover:shadow-md transition-shadow",
              s.ring
            )}
          >
            <div className="flex items-start justify-between mb-2">
              <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center", s.iconBg)}>
                <Icon className="w-4.5 h-4.5" />
              </div>
              <span className="text-xs font-semibold text-slate-500">{s.pct}%</span>
            </div>
            <p className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">{s.label}</p>
            <p className="text-2xl font-bold text-slate-900 mt-0.5">{s.value}</p>
            <div className="mt-3 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className={cn("h-full rounded-full transition-all duration-500", s.bar)} style={{ width: `${s.pct}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UnitSummary;
