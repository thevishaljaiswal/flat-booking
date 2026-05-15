import { FloorType } from "@/data/buildingData";
import UnitCard from "./UnitCard";
import { Layers } from "lucide-react";

interface FloorUnitsProps {
  floor: FloorType;
}

const FloorUnits = ({ floor }: FloorUnitsProps) => {
  if (floor.units.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-sm font-semibold shadow-sm">
          <Layers className="w-3.5 h-3.5" />
          Floor {floor.floorNumber}
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent" />
        <span className="text-xs text-slate-500 font-medium">{floor.units.length} units</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {floor.units.map((unit) => (
          <UnitCard key={unit.unitNumber} unit={unit} />
        ))}
      </div>
    </div>
  );
};

export default FloorUnits;
