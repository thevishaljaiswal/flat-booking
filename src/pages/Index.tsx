import { buildings } from "@/data/buildingData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FloorUnits from "@/components/FloorUnits";
import { ScrollArea } from "@/components/ui/scroll-area";
import UnitSummary from "@/components/UnitSummary";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const Index = () => {
  const [selectedType, setSelectedType] = useState<string>("all");

  // Get all units across all buildings
  const allUnits = buildings.flatMap(building => 
    building.floors.flatMap(floor => floor.units)
  );

  // Filter units based on selected type
  const getFilteredUnits = (units: typeof allUnits) => {
    if (selectedType === "all") return units;
    return units.filter(unit => unit.type === selectedType);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Flat Unit Booking</h1>
      
      <div className="flex items-center justify-between mb-8">
        <UnitSummary units={getFilteredUnits(allUnits)} />
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="2BHK">2 BHK</SelectItem>
            <SelectItem value="3BHK">3 BHK</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Tabs defaultValue={buildings[0].id} className="w-full">
        <TabsList className="w-full justify-start mb-6">
          {buildings.map((building) => (
            <TabsTrigger key={building.id} value={building.id} className="px-8">
              {building.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {buildings.map((building) => {
          const buildingUnits = building.floors.flatMap(floor => floor.units);
          const filteredBuildingUnits = getFilteredUnits(buildingUnits);
          
          return (
            <TabsContent key={building.id} value={building.id}>
              <UnitSummary units={filteredBuildingUnits} />
              <ScrollArea className="h-[calc(100vh-300px)] pr-4">
                {building.floors.map((floor) => (
                  <FloorUnits 
                    key={floor.floorNumber} 
                    floor={{
                      ...floor,
                      units: getFilteredUnits(floor.units)
                    }} 
                  />
                ))}
              </ScrollArea>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

export default Index;