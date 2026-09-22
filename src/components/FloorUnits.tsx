import { FloorType } from "@/data/buildingData";
import UnitCard from "./UnitCard";

interface FloorUnitsProps {
  floor: FloorType;
}

const FloorUnits = ({ floor }: FloorUnitsProps) => {
  if (floor.units.length === 0) return null;

  return (
    <div className="grid grid-cols-[4.75rem_minmax(0,1fr)] items-stretch gap-2 mb-2">
      <div className="flex min-h-16 items-center justify-center rounded-md border bg-secondary px-2 text-center text-xs font-bold text-secondary-foreground">
        Floor {floor.floorNumber}
      </div>
      <div className="grid min-w-0 grid-cols-2 gap-2 lg:grid-cols-4">
        {floor.units.map((unit) => (
          <UnitCard key={unit.unitNumber} unit={unit} />
        ))}
      </div>
    </div>
  );
};

export default FloorUnits;
