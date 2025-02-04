import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import CostSheetDetails from "@/components/CostSheetDetails";

const CostSheet = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { unit } = location.state;

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