import { UnitType } from "@/data/buildingData";

interface UnitSummaryProps {
  units: UnitType[];
}

const UnitSummary = ({ units }: UnitSummaryProps) => {
  const available = units.filter((unit) => unit.status === "available").length;
  const booked = units.filter((unit) => unit.status === "booked").length;
  const hold = units.filter((unit) => unit.status === "hold").length;

  return (
    <div className="flex gap-4 mb-4">
      <div className="bg-blue-100 p-3 rounded-lg">
        <span className="font-semibold">Available:</span> {available}
      </div>
      <div className="bg-green-100 p-3 rounded-lg">
        <span className="font-semibold">Booked:</span> {booked}
      </div>
      <div className="bg-gray-100 p-3 rounded-lg">
        <span className="font-semibold">Hold:</span> {hold}
      </div>
    </div>
  );
};

export default UnitSummary;