import { UnitType } from "@/data/buildingData";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface UnitCardProps {
  unit: UnitType;
}

const statusStyles = {
  available: {
    bg: "bg-emerald-50 border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300",
    bar: "bg-gradient-to-b from-emerald-400 to-teal-500",
    dot: "bg-emerald-500",
    label: "text-emerald-900",
    sub: "text-emerald-700",
  },
  booked: {
    bg: "bg-rose-50 border-rose-200 hover:bg-rose-100 hover:border-rose-300",
    bar: "bg-gradient-to-b from-rose-400 to-pink-500",
    dot: "bg-rose-500",
    label: "text-rose-900",
    sub: "text-rose-700",
  },
  hold: {
    bg: "bg-amber-50 border-amber-200 hover:bg-amber-100 hover:border-amber-300",
    bar: "bg-gradient-to-b from-amber-400 to-orange-500",
    dot: "bg-amber-500",
    label: "text-amber-900",
    sub: "text-amber-700",
  },
} as const;

const UnitCard = ({ unit }: UnitCardProps) => {
  const navigate = useNavigate();
  const s = statusStyles[unit.status];

  return (
    <button
      onClick={() => navigate("/cost-sheet", { state: { unit } })}
      className={cn(
        "group relative flex items-center gap-2 overflow-hidden rounded-md border px-2 py-1.5",
        "shadow-sm hover:shadow-md transition-all text-left",
        s.bg
      )}
      title={`${unit.unitNumber} • ${unit.type} • ${unit.carpetArea} sqft • ₹${(unit.value / 100000).toFixed(1)}L • ${unit.status}`}
    >
      <div className={cn("absolute left-0 top-0 bottom-0 w-1", s.bar)} />
      <div className="flex-1 min-w-0 pl-1">
        <div className="flex items-center gap-1">
          <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", s.dot)} />
          <span className={cn("text-[11px] font-bold truncate", s.label)}>{unit.unitNumber}</span>
        </div>
        <div className="flex items-center justify-between gap-1 mt-0.5">
          <span className={cn("text-[9px] font-semibold", s.sub)}>{unit.type}</span>
          <span className={cn("text-[9px] tabular-nums", s.sub)}>₹{(unit.value / 100000).toFixed(1)}L</span>
        </div>
      </div>
    </button>
  );
};

export default UnitCard;
