import { useState, useEffect } from "react";
import { UnitType } from "@/data/buildingData";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Building2, Home, Maximize2, Receipt, CalendarDays, IndianRupee, Pencil } from "lucide-react";

interface CostSheetDetailsProps {
  unit: UnitType;
}

const PAYMENT_SCHEDULE = [
  { date: "01.09.2024", percentage: 5.0, description: "On Signing of Application" },
  { date: "08.09.2024", percentage: 5.0, description: "Within 7 days from date of Offer letter" },
  { date: "22.09.2024", percentage: 10.0, description: "Excavation" },
  { date: "22.10.2024", percentage: 10.0, description: "Foundation" },
  { date: "22.11.2024", percentage: 10.0, description: "Retaining Wall" },
  { date: "22.12.2024", percentage: 7.0, description: "1st slab" },
  { date: "22.01.2025", percentage: 7.0, description: "6th slab" },
  { date: "22.02.2025", percentage: 4.0, description: "12th slab" },
  { date: "22.03.2025", percentage: 4.0, description: "20th slab" },
  { date: "22.04.2025", percentage: 4.0, description: "28th slab" },
  { date: "22.05.2025", percentage: 4.0, description: "Terrace slab" },
  { date: "22.06.2025", percentage: 5.0, description: "Blockwork" },
  { date: "22.07.2025", percentage: 5.0, description: "Internal Plaster" },
  { date: "22.08.2025", percentage: 5.0, description: "Tiling" },
  { date: "22.09.2025", percentage: 5.0, description: "Fixing of the Windows" },
  { date: "22.10.2025", percentage: 5.0, description: "Lift,Waterpump,Transformer & Others" },
  { date: "22.11.2025", percentage: 5.0, description: "Possession" },
];

const formatINR = (value: number) =>
  value.toLocaleString("en-IN", {
    maximumFractionDigits: 0,
    style: "currency",
    currency: "INR",
  });

const CostSheetDetails = ({ unit }: CostSheetDetailsProps) => {
  const [baseRate, setBaseRate] = useState(7000);
  const [total, setTotal] = useState(0);

  const calculateCosts = (newBaseRate: number) => {
    const flatCost = unit.carpetArea * newBaseRate;
    const msebCharges = 20000;
    const grossValue = flatCost + msebCharges;
    const gstDiscount = grossValue * 0.06;
    const subTotal1 = grossValue - gstDiscount;
    const stampDuty = subTotal1 * 0.06;
    const registrationCharges = 30000;
    const gst = subTotal1 * 0.12;
    const legalCharges = 8850;
    const subTotal2 = stampDuty + registrationCharges + gst + legalCharges;

    return {
      flatCost,
      msebCharges,
      grossValue,
      gstDiscount,
      subTotal1,
      stampDuty,
      registrationCharges,
      gst,
      legalCharges,
      subTotal2,
      total: subTotal1 + subTotal2,
    };
  };

  useEffect(() => {
    const costs = calculateCosts(baseRate);
    setTotal(costs.total);
  }, [baseRate, unit.carpetArea]);

  const handleBaseRateChange = (value: string) => {
    setBaseRate(parseFloat(value) || 0);
  };

  const handleTotalChange = (value: string) => {
    const targetTotal = parseFloat(value) || 0;
    let low = 0;
    let high = 100000;
    let mid;
    while (low <= high) {
      mid = Math.floor((low + high) / 2);
      const costs = calculateCosts(mid);
      if (Math.abs(costs.total - targetTotal) < 1) {
        setBaseRate(mid);
        break;
      }
      if (costs.total < targetTotal) low = mid + 1;
      else high = mid - 1;
    }
  };

  const costs = calculateCosts(baseRate);

  const Row = ({
    label,
    value,
    muted = false,
  }: {
    label: string;
    value: string;
    muted?: boolean;
  }) => (
    <div className="flex justify-between items-center py-1.5">
      <span className={`text-sm ${muted ? "text-muted-foreground" : ""}`}>{label}</span>
      <span className="text-sm font-medium tabular-nums">{value}</span>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Hero / Unit summary */}
      <Card className="overflow-hidden border-0 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
        <CardContent className="p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-xl bg-primary/15 text-primary flex items-center justify-center">
                <Building2 className="h-7 w-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-semibold tracking-tight">Unit {unit.unitNumber}</h2>
                  <Badge variant="secondary" className="uppercase">{unit.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">Cost sheet & payment schedule</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <Home className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Type</p>
                  <p className="text-sm font-semibold">{unit.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Maximize2 className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Carpet Area</p>
                  <p className="text-sm font-semibold">{unit.carpetArea} Sq.Ft</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <IndianRupee className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Total Consideration</p>
                  <p className="text-sm font-semibold text-primary">{formatINR(total)}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="costsheet" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="costsheet" className="gap-2">
            <Receipt className="h-4 w-4" /> Cost Sheet
          </TabsTrigger>
          <TabsTrigger value="schedule" className="gap-2">
            <CalendarDays className="h-4 w-4" /> Payment Schedule
          </TabsTrigger>
        </TabsList>

        {/* Cost Sheet */}
        <TabsContent value="costsheet" className="mt-4">
          <div className="grid gap-4 lg:grid-cols-3">
            {/* Editable inputs */}
            <Card className="lg:col-span-1">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Pencil className="h-4 w-4 text-primary" /> Pricing Inputs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-xs text-muted-foreground">Base Rate (₹/Sq.Ft)</label>
                  <Input
                    type="number"
                    value={baseRate}
                    onChange={(e) => handleBaseRateChange(e.target.value)}
                    className="mt-1 text-lg font-semibold"
                  />
                </div>
                <Separator />
                <div>
                  <label className="text-xs text-muted-foreground">Total (Reverse Calculate)</label>
                  <Input
                    type="number"
                    value={Math.round(total)}
                    onChange={(e) => handleTotalChange(e.target.value)}
                    className="mt-1 text-lg font-semibold text-primary"
                  />
                  <p className="text-[11px] text-muted-foreground mt-1">
                    Edit total to reverse-calculate base rate.
                  </p>
                </div>
                <Separator />
                <div className="rounded-lg bg-muted/50 p-3 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Sub-Total 1</span>
                    <span className="font-medium tabular-nums">{formatINR(costs.subTotal1)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Sub-Total 2</span>
                    <span className="font-medium tabular-nums">{formatINR(costs.subTotal2)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between">
                    <span className="text-sm font-semibold">Grand Total</span>
                    <span className="text-sm font-bold text-primary tabular-nums">{formatINR(costs.total)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Breakdown */}
            <Card className="lg:col-span-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Cost Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border divide-y">
                  <div className="p-4 space-y-1">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
                      Agreement Value
                    </p>
                    <Row label="Carpet Area" value={`${unit.carpetArea} Sq.Ft`} muted />
                    <Row label="Flat Cost" value={formatINR(costs.flatCost)} />
                    <Row label="MSEB / GED Charges" value={formatINR(costs.msebCharges)} />
                    <Row label="Gross Consideration Value" value={formatINR(costs.grossValue)} />
                    <Row label="Input Credit on GST Discount @ 6%" value={`- ${formatINR(costs.gstDiscount)}`} muted />
                    <div className="flex justify-between items-center pt-2 mt-1 border-t">
                      <span className="text-sm font-semibold">Sub-Total 1</span>
                      <span className="text-sm font-bold tabular-nums text-primary">{formatINR(costs.subTotal1)}</span>
                    </div>
                  </div>

                  <div className="p-4 space-y-1">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
                      Other Charges
                    </p>
                    <Row label="Stamp Duty" value={formatINR(costs.stampDuty)} />
                    <Row label="Registration Charges" value={formatINR(costs.registrationCharges)} />
                    <Row label="GST" value={formatINR(costs.gst)} />
                    <Row label="Legal Charges" value={formatINR(costs.legalCharges)} />
                    <div className="flex justify-between items-center pt-2 mt-1 border-t">
                      <span className="text-sm font-semibold">Sub-Total 2</span>
                      <span className="text-sm font-bold tabular-nums text-primary">{formatINR(costs.subTotal2)}</span>
                    </div>
                  </div>

                  <div className="p-4 bg-primary/5">
                    <div className="flex justify-between items-center">
                      <span className="text-base font-semibold">Total Consideration</span>
                      <span className="text-xl font-bold text-primary tabular-nums">{formatINR(costs.total)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Payment Schedule */}
        <TabsContent value="schedule" className="mt-4">
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-base">Construction-Linked Payment Plan</CardTitle>
              <Badge variant="outline" className="text-xs">{PAYMENT_SCHEDULE.length} Milestones</Badge>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50 hover:bg-muted/50">
                      <TableHead className="w-12 text-xs">#</TableHead>
                      <TableHead className="w-28 text-xs">Date</TableHead>
                      <TableHead className="text-xs">Milestone</TableHead>
                      <TableHead className="w-24 text-right text-xs">%</TableHead>
                      <TableHead className="w-40 text-right text-xs">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {PAYMENT_SCHEDULE.map((item, idx) => {
                      const amount = total * (item.percentage / 100);
                      return (
                        <TableRow key={item.date} className="text-xs">
                          <TableCell className="text-muted-foreground">{idx + 1}</TableCell>
                          <TableCell className="font-medium">{item.date}</TableCell>
                          <TableCell>{item.description}</TableCell>
                          <TableCell className="text-right tabular-nums">
                            <Badge variant="secondary" className="font-mono text-[10px]">
                              {item.percentage.toFixed(2)}%
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right tabular-nums font-medium">
                            {formatINR(amount)}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    <TableRow className="bg-primary/5 hover:bg-primary/5 font-bold">
                      <TableCell colSpan={2} className="text-sm">Total</TableCell>
                      <TableCell></TableCell>
                      <TableCell className="text-right text-sm">100.00%</TableCell>
                      <TableCell className="text-right text-sm text-primary tabular-nums">
                        {formatINR(total)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CostSheetDetails;
