import { UnitType } from "@/data/buildingData";

interface UnitSummaryProps {
  units: UnitType[];
}

const UnitSummary = ({ units }: UnitSummaryProps) => {
  const available = units.filter((unit) => unit.status === "available").length;
  const booked = units.filter((unit) => unit.status === "booked").length;
  const hold = units.filter((unit) => unit.status === "hold").length;
  const total = units.length;

  const getPercentage = (value: number) => {
    return total > 0 ? Math.round((value / total) * 100) : 0;
  };

  return (
    <div className="flex gap-4">
      <div className="bg-blue-100 p-2 rounded-lg text-sm">
        <span className="font-semibold">Available:</span> {available} ({getPercentage(available)}%)
      </div>
      <div className="bg-green-100 p-2 rounded-lg text-sm">
        <span className="font-semibold">Booked:</span> {booked} ({getPercentage(booked)}%)
      </div>
      <div className="bg-gray-100 p-2 rounded-lg text-sm">
        <span className="font-semibold">Hold:</span> {hold} ({getPercentage(hold)}%)
      </div>
      <div className="bg-purple-100 p-2 rounded-lg text-sm">
        <span className="font-semibold">Total:</span> {total}
      </div>
    </div>
  );
};

export default UnitSummary;