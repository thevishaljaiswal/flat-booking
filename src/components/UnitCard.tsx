import { UnitType } from "@/data/buildingData";
import { cn } from "@/lib/utils";
import { Home, Maximize2, IndianRupee, ArrowRight, BedDouble } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

interface UnitCardProps {
  unit: UnitType;
}

const statusStyles = {
  available: {
    badge: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    dot: "bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.18)]",
    accent: "from-emerald-400 to-teal-500",
    glow: "group-hover:shadow-emerald-200/60",
  },
  booked: {
    badge: "bg-rose-50 text-rose-700 ring-1 ring-rose-200",
    dot: "bg-rose-500 shadow-[0_0_0_3px_rgba(244,63,94,0.18)]",
    accent: "from-rose-400 to-pink-500",
    glow: "group-hover:shadow-rose-200/60",
  },
  hold: {
    badge: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
    dot: "bg-amber-500 shadow-[0_0_0_3px_rgba(245,158,11,0.18)]",
    accent: "from-amber-400 to-orange-500",
    glow: "group-hover:shadow-amber-200/60",
  },
} as const;

const UnitCard = ({ unit }: UnitCardProps) => {
  const navigate = useNavigate();
  const s = statusStyles[unit.status];
  const isAvailable = unit.status === "available";

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-white border border-slate-200/80",
        "shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300",
        s.glow
      )}
    >
      {/* Top accent stripe */}
      <div className={cn("h-1 w-full bg-gradient-to-r", s.accent)} />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">Unit</p>
            <h3 className="text-lg font-bold text-slate-900 leading-tight">{unit.unitNumber}</h3>
          </div>
          <div className={cn("flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold", s.badge)}>
            <span className={cn("w-1.5 h-1.5 rounded-full", s.dot)} />
            {unit.status.charAt(0).toUpperCase() + unit.status.slice(1)}
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="rounded-lg bg-slate-50 p-2.5 text-center">
            <BedDouble className="w-3.5 h-3.5 text-slate-400 mx-auto mb-1" />
            <p className="text-[10px] text-slate-500">Type</p>
            <p className="text-xs font-semibold text-slate-900">{unit.type}</p>
          </div>
          <div className="rounded-lg bg-slate-50 p-2.5 text-center">
            <Maximize2 className="w-3.5 h-3.5 text-slate-400 mx-auto mb-1" />
            <p className="text-[10px] text-slate-500">Carpet</p>
            <p className="text-xs font-semibold text-slate-900">{unit.carpetArea}<span className="text-[9px] text-slate-400 ml-0.5">sqft</span></p>
          </div>
          <div className="rounded-lg bg-slate-50 p-2.5 text-center">
            <IndianRupee className="w-3.5 h-3.5 text-slate-400 mx-auto mb-1" />
            <p className="text-[10px] text-slate-500">Value</p>
            <p className="text-xs font-semibold text-slate-900">{(unit.value / 100000).toFixed(1)}<span className="text-[9px] text-slate-400 ml-0.5">L</span></p>
          </div>
        </div>

        {/* CTA */}
        <Button
          onClick={() => navigate("/cost-sheet", { state: { unit } })}
          className={cn(
            "w-full h-9 text-xs font-semibold rounded-lg group/btn",
            isAvailable
              ? "bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 text-white"
              : "bg-slate-100 hover:bg-slate-200 text-slate-700"
          )}
        >
          View Cost Sheet
          <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover/btn:translate-x-0.5 transition-transform" />
        </Button>
      </div>
    </div>
  );
};

export default UnitCard;
