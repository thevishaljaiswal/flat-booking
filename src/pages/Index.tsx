import { buildings } from "@/data/buildingData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FloorUnits from "@/components/FloorUnits";
import { ScrollArea } from "@/components/ui/scroll-area";

const Index = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Flat Unit Booking</h1>
      
      <Tabs defaultValue={buildings[0].id} className="w-full">
        <TabsList className="w-full justify-start mb-6">
          {buildings.map((building) => (
            <TabsTrigger key={building.id} value={building.id} className="px-8">
              {building.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {buildings.map((building) => (
          <TabsContent key={building.id} value={building.id}>
            <ScrollArea className="h-[calc(100vh-200px)] pr-4">
              {building.floors.map((floor) => (
                <FloorUnits key={floor.floorNumber} floor={floor} />
              ))}
            </ScrollArea>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Index;