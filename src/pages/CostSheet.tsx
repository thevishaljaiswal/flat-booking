import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import CostSheetDetails from "@/components/CostSheetDetails";

const CostSheet = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const unit = (location.state as { unit?: any } | null)?.unit;

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

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
      </div>
      <CostSheetDetails unit={unit} />
    </div>
  );
};

export default CostSheet;