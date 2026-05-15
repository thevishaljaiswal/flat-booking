import { UnitType } from "@/data/buildingData";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface UnitCardProps {
  unit: UnitType;
}

const statusStyles = {
  available: {
    bar: "bg-gradient-to-b from-emerald-400 to-teal-500",
    dot: "bg-emerald-500",
    hover: "hover:border-emerald-300 hover:shadow-emerald-100",
  },
  booked: {
    bar: "bg-gradient-to-b from-rose-400 to-pink-500",
    dot: "bg-rose-500",
    hover: "hover:border-rose-300 hover:shadow-rose-100",
  },
  hold: {
    bar: "bg-gradient-to-b from-amber-400 to-orange-500",
    dot: "bg-amber-500",
    hover: "hover:border-amber-300 hover:shadow-amber-100",
  },
} as const;

const UnitCard = ({ unit }: UnitCardProps) => {
  const navigate = useNavigate();
  const s = statusStyles[unit.status];

  return (
    <button
      onClick={() => navigate("/cost-sheet", { state: { unit } })}
      className={cn(
        "group relative flex items-center gap-2 overflow-hidden rounded-md bg-white border border-slate-200 px-2 py-1.5",
        "shadow-sm hover:shadow-md transition-all text-left",
        s.hover
      )}
      title={`${unit.unitNumber} • ${unit.type} • ${unit.carpetArea} sqft • ₹${(unit.value / 100000).toFixed(1)}L • ${unit.status}`}
    >
      <div className={cn("absolute left-0 top-0 bottom-0 w-1", s.bar)} />
      <div className="flex-1 min-w-0 pl-1">
        <div className="flex items-center gap-1">
          <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", s.dot)} />
          <span className="text-[11px] font-bold text-slate-900 truncate">{unit.unitNumber}</span>
        </div>
        <div className="flex items-center justify-between gap-1 mt-0.5">
          <span className="text-[9px] font-semibold text-slate-500">{unit.type}</span>
          <span className="text-[9px] text-slate-600 tabular-nums">₹{(unit.value / 100000).toFixed(1)}L</span>
        </div>
      </div>
    </button>
  );
};

export default UnitCard;
