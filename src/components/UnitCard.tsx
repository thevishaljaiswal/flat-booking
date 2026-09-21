import { useState } from "react";
import { UnitType } from "@/data/buildingData";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { formatCountdown, useUnits } from "@/context/UnitsContext";
import EOIDialog from "./EOIDialog";

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
  allocated: {
    bg: "bg-indigo-50 border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300",
    bar: "bg-gradient-to-b from-indigo-400 to-violet-500",
    dot: "bg-indigo-500",
    label: "text-indigo-900",
    sub: "text-indigo-700",
  },
} as const;

const UnitCard = ({ unit }: UnitCardProps) => {
  const navigate = useNavigate();
  const { now } = useUnits();
  const [eoiOpen, setEoiOpen] = useState(false);
  const s = statusStyles[unit.status];

  const remaining = unit.status === "hold" && unit.holdExpiresAt ? unit.holdExpiresAt - now : 0;

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={() => navigate("/cost-sheet", { state: { unitNumber: unit.unitNumber } })}
        onKeyDown={(e) => {
          if (e.key === "Enter") navigate("/cost-sheet", { state: { unitNumber: unit.unitNumber } });
        }}
        className={cn(
          "group relative flex items-center gap-2 overflow-hidden rounded-md border px-2 py-1.5 cursor-pointer",
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
            {unit.status === "hold" && (
              <span className="ml-auto text-[9px] font-bold tabular-nums text-amber-800 bg-amber-200/70 rounded px-1">
                {formatCountdown(remaining)}
              </span>
            )}
            {unit.status === "available" && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setEoiOpen(true);
                }}
                className="ml-auto text-[9px] font-bold rounded px-1 py-0.5 bg-emerald-600 text-white hover:bg-emerald-700"
              >
                EOI
              </button>
            )}
          </div>
          <div className="flex items-center justify-between gap-1 mt-0.5">
            <span className={cn("text-[9px] font-semibold", s.sub)}>{unit.type}</span>
            <span className={cn("text-[9px] tabular-nums", s.sub)}>₹{(unit.value / 100000).toFixed(1)}L</span>
          </div>
        </div>
      </div>
      <EOIDialog unitNumber={unit.unitNumber} open={eoiOpen} onOpenChange={setEoiOpen} />
    </>
  );
};

export default UnitCard;
