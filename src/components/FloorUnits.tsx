import { FloorType } from "@/data/buildingData";
import UnitCard from "./UnitCard";

interface FloorUnitsProps {
  floor: FloorType;
}

const FloorUnits = ({ floor }: FloorUnitsProps) => {
  if (floor.units.length === 0) return null;

  return (
    <div className="flex items-center gap-2 mb-1.5">
      <div className="w-12 shrink-0 text-[10px] font-bold text-slate-600 bg-slate-100 rounded px-1.5 py-1 text-center">
        F{floor.floorNumber}
      </div>
      <div className="grid grid-cols-4 gap-1.5 flex-1">
        {floor.units.map((unit) => (
          <UnitCard key={unit.unitNumber} unit={unit} />
        ))}
      </div>
    </div>
  );
};

export default FloorUnits;
