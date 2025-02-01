import { FloorType } from "@/data/buildingData";
import UnitCard from "./UnitCard";

interface FloorUnitsProps {
  floor: FloorType;
}

const FloorUnits = ({ floor }: FloorUnitsProps) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">Floor {floor.floorNumber}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {floor.units.map((unit) => (
          <UnitCard key={unit.unitNumber} unit={unit} />
        ))}
      </div>
    </div>
  );
};

export default FloorUnits;