import { useState, useEffect } from "react";
import { UnitType } from "@/data/buildingData";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

interface CostSheetDetailsProps {
  unit: UnitType;
}

const PAYMENT_SCHEDULE = [
  { date: "01.09.2024", percentage: 5.00, description: "On Signing of Application" },
  { date: "08.09.2024", percentage: 5.00, description: "Within 7 days from date of Offer letter" },
  { date: "22.09.2024", percentage: 10.00, description: "Excavation" },
  { date: "22.10.2024", percentage: 10.00, description: "Foundation" },
  { date: "22.11.2024", percentage: 10.00, description: "Retaining Wall" },
  { date: "22.12.2024", percentage: 7.00, description: "1st slab" },
  { date: "22.01.2025", percentage: 7.00, description: "6th slab" },
  { date: "22.02.2025", percentage: 4.00, description: "12th slab" },
  { date: "22.03.2025", percentage: 4.00, description: "20th slab" },
  { date: "22.04.2025", percentage: 4.00, description: "28th slab" },
  { date: "22.05.2025", percentage: 4.00, description: "Terrace slab" },
  { date: "22.06.2025", percentage: 5.00, description: "Blockwork" },
  { date: "22.07.2025", percentage: 5.00, description: "Internal Plaster" },
  { date: "22.08.2025", percentage: 5.00, description: "Tiling" },
  { date: "22.09.2025", percentage: 5.00, description: "Fixing of the Windows" },
  { date: "22.10.2025", percentage: 5.00, description: "Lift,Waterpump,Transformer & Others" },
  { date: "22.11.2025", percentage: 5.00, description: "Possession" },
];

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
      total: subTotal1 + subTotal2
    };
  };

  useEffect(() => {
    const costs = calculateCosts(baseRate);
    setTotal(costs.total);
  }, [baseRate, unit.carpetArea]);

  const handleBaseRateChange = (value: string) => {
    const newBaseRate = parseFloat(value) || 0;
    setBaseRate(newBaseRate);
  };

  const handleTotalChange = (value: string) => {
    const newTotal = parseFloat(value) || 0;
    // Reverse calculate base rate from total
    const targetTotal = newTotal;
    let low = 0;
    let high = 100000;
    let mid;
    
    // Binary search to find the base rate that gives us the target total
    while (low <= high) {
      mid = Math.floor((low + high) / 2);
      const costs = calculateCosts(mid);
      
      if (Math.abs(costs.total - targetTotal) < 1) {
        setBaseRate(mid);
        break;
      }
      
      if (costs.total < targetTotal) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
  };

  const costs = calculateCosts(baseRate);

  return (
    <Tabs defaultValue="costsheet">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="costsheet">Cost Sheet</TabsTrigger>
        <TabsTrigger value="schedule">Payment Schedule</TabsTrigger>
      </TabsList>
      
      <TabsContent value="costsheet">
        <Card>
          <CardHeader>
            <CardTitle>Cost Sheet</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4 items-center">
              <span>Base Rate (Rs./Sq.Ft)</span>
              <Input 
                type="number"
                value={baseRate}
                onChange={(e) => handleBaseRateChange(e.target.value)}
                className="col-span-2"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Carpet Area</span>
                <span>{unit.carpetArea} Sq.Ft</span>
              </div>
              <div className="flex justify-between">
                <span>Flat Cost</span>
                <span>₹{costs.flatCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>MSEB/GED Charges</span>
                <span>₹{costs.msebCharges.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Gross Consideration Value</span>
                <span>₹{costs.grossValue.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Input Credit on GST Discount @ 6%</span>
                <span>₹{costs.gstDiscount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Sub-Total 1</span>
                <span>₹{costs.subTotal1.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Stamp Duty</span>
                <span>₹{costs.stampDuty.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Registration Charges</span>
                <span>₹{costs.registrationCharges.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>GST</span>
                <span>₹{costs.gst.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Legal Charges</span>
                <span>₹{costs.legalCharges.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Sub-Total 2</span>
                <span>₹{costs.subTotal2.toFixed(2)}</span>
              </div>
              <div className="grid grid-cols-3 gap-4 items-center pt-4">
                <span className="font-bold">Total</span>
                <Input 
                  type="number"
                  value={total}
                  onChange={(e) => handleTotalChange(e.target.value)}
                  className="col-span-2"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="schedule">
        <Card>
          <CardHeader>
            <CardTitle>Payment Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="text-xs">
                  <TableHead className="w-[100px]">Date</TableHead>
                  <TableHead className="w-[80px] text-right">Percentage</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Amount (₹)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-xs">
                {PAYMENT_SCHEDULE.map((item) => {
                  const amount = (total * (item.percentage / 100));
                  return (
                    <TableRow key={item.date}>
                      <TableCell>{item.date}</TableCell>
                      <TableCell className="text-right">{item.percentage.toFixed(2)}%</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell className="text-right">{amount.toLocaleString('en-IN', {
                        maximumFractionDigits: 2,
                        style: 'currency',
                        currency: 'INR'
                      })}</TableCell>
                    </TableRow>
                  );
                })}
                <TableRow className="font-bold text-xs">
                  <TableCell>Total</TableCell>
                  <TableCell className="text-right">100.00%</TableCell>
                  <TableCell></TableCell>
                  <TableCell className="text-right">{total.toLocaleString('en-IN', {
                    maximumFractionDigits: 2,
                    style: 'currency',
                    currency: 'INR'
                  })}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default CostSheetDetails;
