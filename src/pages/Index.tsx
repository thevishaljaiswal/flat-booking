import { buildings } from "@/data/buildingData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FloorUnits from "@/components/FloorUnits";
import { ScrollArea } from "@/components/ui/scroll-area";
import UnitSummary from "@/components/UnitSummary";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Building2, Filter } from "lucide-react";

const Index = () => {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const getFilteredUnits = (units: any[]) =>
    units.filter((u) => {
      const t = selectedType === "all" || u.type === selectedType;
      const s = selectedStatus === "all" || u.status === selectedStatus;
      return t && s;
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-b border-slate-200">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.1),transparent_50%)]" />
        <div className="container mx-auto px-4 py-8 relative">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center ring-1 ring-white/20">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Flat Unit Booking</h1>
              <p className="text-sm text-slate-300 mt-0.5">Browse, filter & book units across all towers</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-6 px-4">
        <Tabs defaultValue={buildings[0].id} className="w-full">
          {/* Tower tabs + filters in one row */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-6">
            <TabsList className="bg-white border border-slate-200 shadow-sm p-1 h-auto">
              {buildings.map((b) => (
                <TabsTrigger
                  key={b.id}
                  value={b.id}
                  className="px-5 py-2 text-sm font-semibold data-[state=active]:bg-slate-900 data-[state=active]:text-white data-[state=active]:shadow"
                >
                  {b.name}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-1.5 px-2 text-xs text-slate-500">
                <Filter className="w-3.5 h-3.5" /> Filters
              </div>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-[150px] bg-white border-slate-200 shadow-sm">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="2BHK">2 BHK</SelectItem>
                  <SelectItem value="3BHK">3 BHK</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[150px] bg-white border-slate-200 shadow-sm">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="booked">Booked</SelectItem>
                  <SelectItem value="hold">On Hold</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {buildings.map((building) => {
            const buildingUnits = building.floors.flatMap((f) => f.units);
            const filteredBuildingUnits = getFilteredUnits(buildingUnits);

            return (
              <TabsContent key={building.id} value={building.id} className="mt-0">
                <UnitSummary units={filteredBuildingUnits} />
                <ScrollArea className="h-[calc(100vh-380px)] pr-4">
                  {building.floors.map((floor) => (
                    <FloorUnits
                      key={floor.floorNumber}
                      floor={{ ...floor, units: getFilteredUnits(floor.units) }}
                    />
                  ))}
                </ScrollArea>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
