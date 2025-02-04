import { UnitType } from "@/data/buildingData";
import { cn } from "@/lib/utils";
import { Building, CircleDot } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import CostSheetForm from "./CostSheetForm";

interface UnitCardProps {
  unit: UnitType;
}

const UnitCard = ({ unit }: UnitCardProps) => {
  const statusColors = {
    booked: "bg-green-100 text-green-800 border-green-300",
    available: "bg-blue-100 text-blue-800 border-blue-300",
    hold: "bg-gray-100 text-gray-800 border-gray-300",
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Building className="w-4 h-4" />
          <span className="font-semibold">{unit.unitNumber}</span>
        </div>
        <div className={cn("px-2 py-1 rounded-full text-xs font-medium border flex items-center gap-1", statusColors[unit.status])}>
          <CircleDot className="w-3 h-3" />
          {unit.status.charAt(0).toUpperCase() + unit.status.slice(1)}
        </div>
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Type:</span>
          <span className="font-medium">{unit.type}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Carpet Area:</span>
          <span className="font-medium">{unit.carpetArea} sq.ft</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Value:</span>
          <span className="font-medium">₹{(unit.value / 100000).toFixed(2)} L</span>
        </div>
      </div>
      <div className="mt-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">Cost Sheet</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Cost Sheet Details</DialogTitle>
            </DialogHeader>
            <CostSheetForm unit={unit} />
          </DialogHeader>
        </Dialog>
      </div>
    </div>
  );
};

export default UnitCard;