import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, UserCheck, XCircle } from "lucide-react";
import CostSheetDetails from "@/components/CostSheetDetails";
import { formatCountdown, useUnits } from "@/context/UnitsContext";
import EOIDialog from "@/components/EOIDialog";
import { toast } from "sonner";

const CostSheet = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getUnit, now, allocateUnit, releaseUnit } = useUnits();
  const [eoiOpen, setEoiOpen] = useState(false);

  const state = location.state as { unitNumber?: string; unit?: { unitNumber: string } } | null;
  const unitNumber = state?.unitNumber ?? state?.unit?.unitNumber;
  const unit = unitNumber ? getUnit(unitNumber) : undefined;

  if (!unit) {
    return (
      <div className="container mx-auto py-16 px-4 text-center space-y-4">
        <h1 className="text-xl font-semibold">No unit selected</h1>
        <p className="text-sm text-muted-foreground">
          Pick a unit from the booking page to view its cost sheet.
        </p>
        <Button onClick={() => navigate("/")}>Go to units</Button>
      </div>
    );
  }

  const remaining = unit.status === "hold" && unit.holdExpiresAt ? unit.holdExpiresAt - now : 0;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <Button variant="ghost" onClick={() => navigate(-1)} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        <div className="flex flex-wrap items-center gap-2">
          {unit.status === "available" && (
            <Button size="sm" onClick={() => setEoiOpen(true)}>
              Submit EOI (15 min hold)
            </Button>
          )}
          {unit.status === "hold" && (
            <>
              <span className="flex items-center gap-1.5 rounded-md bg-amber-100 border border-amber-200 px-2.5 py-1.5 text-sm font-semibold text-amber-900 tabular-nums">
                <Clock className="w-4 h-4" /> Hold expires in {formatCountdown(remaining)}
              </span>
              <Button
                size="sm"
                onClick={() => {
                  allocateUnit(unit.unitNumber);
                  toast.success(`${unit.unitNumber} allocated`);
                }}
                className="gap-1.5"
              >
                <UserCheck className="w-4 h-4" /> Allocate
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  releaseUnit(unit.unitNumber);
                  toast(`${unit.unitNumber} hold cancelled`);
                }}
                className="gap-1.5"
              >
                <XCircle className="w-4 h-4" /> Cancel
              </Button>
            </>
          )}
          {unit.status === "allocated" && (
            <>
              <span className="rounded-md bg-indigo-100 border border-indigo-200 px-2.5 py-1.5 text-sm font-semibold text-indigo-900">
                Allocated{unit.customer ? ` — ${unit.customer.name}` : ""}
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  releaseUnit(unit.unitNumber);
                  toast(`${unit.unitNumber} released — no show / cancelled`);
                }}
              >
                No show / Cancel
              </Button>
            </>
          )}
        </div>
      </div>

      <CostSheetDetails unit={unit} />
      <EOIDialog unitNumber={unit.unitNumber} open={eoiOpen} onOpenChange={setEoiOpen} />
    </div>
  );
};

export default CostSheet;
