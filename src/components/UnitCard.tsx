import { useState } from "react";
import { UnitType } from "@/data/buildingData";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { formatCountdown, useUnits } from "@/context/UnitsContext";
import EOIDialog from "./EOIDialog";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UnitCardProps {
  unit: UnitType;
}

const statusStyles = {
  available: {
    card: "bg-status-available-soft border-status-available/25 hover:border-status-available/50",
    accent: "bg-status-available",
    text: "text-status-available-foreground",
    badge: "bg-status-available/10 text-status-available-foreground",
    label: "Available",
  },
  booked: {
    card: "bg-status-booked-soft border-status-booked/25 hover:border-status-booked/50",
    accent: "bg-status-booked",
    text: "text-status-booked-foreground",
    badge: "bg-status-booked/10 text-status-booked-foreground",
    label: "Booked",
  },
  hold: {
    card: "bg-status-hold-soft border-status-hold/25 hover:border-status-hold/50",
    accent: "bg-status-hold",
    text: "text-status-hold-foreground",
    badge: "bg-status-hold/10 text-status-hold-foreground",
    label: "On hold",
  },
  allocated: {
    card: "bg-status-allocated-soft border-status-allocated/25 hover:border-status-allocated/50",
    accent: "bg-status-allocated",
    text: "text-status-allocated-foreground",
    badge: "bg-status-allocated/10 text-status-allocated-foreground",
    label: "Allocated",
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
          "group relative min-h-16 cursor-pointer overflow-hidden rounded-md border px-3 py-2 text-left",
          "shadow-sm transition-all hover:-translate-y-px hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          s.card
        )}
        title={`${unit.unitNumber} • ${unit.type} • ${unit.carpetArea} sqft • ₹${(unit.value / 100000).toFixed(1)}L • ${unit.status}`}
      >
        <div className={cn("absolute inset-y-0 left-0 w-1", s.accent)} />
        <div className="min-w-0 pl-1">
          <div className="flex min-w-0 items-center gap-2">
            <span className="truncate text-xs font-extrabold text-foreground">{unit.unitNumber}</span>
            <span className={cn("shrink-0 rounded px-1.5 py-0.5 text-[9px] font-bold uppercase", s.badge)}>
              {s.label}
            </span>
            {unit.status === "hold" && (
              <span className={cn("ml-auto shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold tabular-nums", s.badge)}>
                {formatCountdown(remaining)}
              </span>
            )}
            {unit.status === "available" && (
              <Button
                type="button"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setEoiOpen(true);
                }}
                className="ml-auto h-6 shrink-0 bg-status-available px-2 text-[10px] font-bold text-status-available-contrast hover:bg-status-available/90"
              >
                EOI
              </Button>
            )}
          </div>
          <div className="mt-2 flex min-w-0 items-center gap-2 text-[10px] font-semibold text-muted-foreground">
            <span className={cn("font-bold", s.text)}>{unit.type}</span>
            <span aria-hidden="true">•</span>
            <span className="whitespace-nowrap">{unit.carpetArea.toLocaleString("en-IN")} sq.ft.</span>
            <span className="ml-auto flex shrink-0 items-center gap-1" title={`${unit.interestedLeads} leads interested in this unit`}>
              <Users className="h-3 w-3" />
              {unit.interestedLeads}
            </span>
            <span className="shrink-0 text-xs font-extrabold tabular-nums text-foreground">₹{(unit.value / 100000).toFixed(1)}L</span>
          </div>
        </div>
      </div>
      <EOIDialog unitNumber={unit.unitNumber} open={eoiOpen} onOpenChange={setEoiOpen} />
    </>
  );
};

export default UnitCard;
