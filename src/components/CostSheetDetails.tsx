import { useState, useMemo } from "react";
import { UnitType } from "@/data/buildingData";
import { SCHEMES, VOUCHERS, OFFERS } from "@/data/schemes";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import {
  Building2,
  Home,
  Maximize2,
  Receipt,
  CalendarDays,
  IndianRupee,
  Pencil,
  Sparkles,
  Gift,
  Check,
  Clock,
  Coins,
  FileCheck2,
  Wallet,
  Smartphone,
} from "lucide-react";

interface CostSheetDetailsProps {
  unit: UnitType;
}

const formatINR = (value: number) =>
  value.toLocaleString("en-IN", {
    maximumFractionDigits: 0,
    style: "currency",
    currency: "INR",
  });

const VOUCHER_ICONS: Record<string, typeof Coins> = {
  gold: Coins,
  registration: FileCheck2,
  cashback: Wallet,
  iphone: Smartphone,
};

const CostSheetDetails = ({ unit }: CostSheetDetailsProps) => {
  const [baseRate, setBaseRate] = useState(7000);
  const [schemeId, setSchemeId] = useState("standard");
  const [offerId, setOfferId] = useState<string | null>(null);
  const [voucherIds, setVoucherIds] = useState<string[]>([]);

  const scheme = SCHEMES.find((s) => s.id === schemeId)!;
  const offer = OFFERS.find((o) => o.id === offerId) ?? null;
  const selectedVouchers = VOUCHERS.filter((v) => voucherIds.includes(v.id));
  const voucherValue = selectedVouchers.reduce((sum, v) => sum + v.value, 0);

  const discountPct = scheme.discountPct + (offer?.discountPct ?? 0);

  const calculateCosts = (rate: number) => {
    const grossFlatCost = unit.carpetArea * rate;
    const schemeDiscount = grossFlatCost * (discountPct / 100);
    const flatCost = grossFlatCost - schemeDiscount;
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
      grossFlatCost,
      schemeDiscount,
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

  const costs = useMemo(() => calculateCosts(baseRate), [baseRate, unit.carpetArea, discountPct]);
  const total = costs.total;

  const handleBaseRateChange = (value: string) => setBaseRate(parseFloat(value) || 0);

  const handleTotalChange = (value: string) => {
    const targetTotal = parseFloat(value) || 0;
    let low = 0;
    let high = 100000;
    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const c = calculateCosts(mid);
      if (Math.abs(c.total - targetTotal) < 1) {
        setBaseRate(mid);
        return;
      }
      if (c.total < targetTotal) low = mid + 1;
      else high = mid - 1;
    }
    setBaseRate(Math.max(low, 0));
  };

  const toggleVoucher = (id: string) =>
    setVoucherIds((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]));

  const Row = ({ label, value, muted = false }: { label: string; value: string; muted?: boolean }) => (
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
                <p className="text-sm text-muted-foreground mt-0.5">Cost sheet, schemes & payment schedule</p>
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
        <TabsList className="grid w-full max-w-lg grid-cols-2">
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
                    <span className="text-muted-foreground">Scheme</span>
                    <span className="font-medium">{scheme.name}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Offer</span>
                    <span className="font-medium">{offer ? offer.name : "None"}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Total Discount</span>
                    <span className="font-medium tabular-nums">{discountPct.toFixed(2)}%</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between">
                    <span className="text-sm font-semibold">Grand Total</span>
                    <span className="text-sm font-bold text-primary tabular-nums">{formatINR(total)}</span>
                  </div>
                  {voucherValue > 0 && (
                    <div className="flex justify-between text-xs pt-1">
                      <span className="text-muted-foreground">Voucher Benefits</span>
                      <span className="font-medium tabular-nums">{formatINR(voucherValue)}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Cost Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border divide-y">
                  <div className="p-4 space-y-1">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Agreement Value</p>
                    <Row label="Carpet Area" value={`${unit.carpetArea} Sq.Ft`} muted />
                    <Row label="Flat Cost (at base rate)" value={formatINR(costs.grossFlatCost)} />
                    {discountPct > 0 && (
                      <Row
                        label={`Scheme / Offer Discount @ ${discountPct.toFixed(2)}%`}
                        value={`- ${formatINR(costs.schemeDiscount)}`}
                        muted
                      />
                    )}
                    <Row label="Net Flat Cost" value={formatINR(costs.flatCost)} />
                    <Row label="MSEB / GED Charges" value={formatINR(costs.msebCharges)} />
                    <Row label="Gross Consideration Value" value={formatINR(costs.grossValue)} />
                    <Row label="Input Credit on GST Discount @ 6%" value={`- ${formatINR(costs.gstDiscount)}`} muted />
                    <div className="flex justify-between items-center pt-2 mt-1 border-t">
                      <span className="text-sm font-semibold">Sub-Total 1</span>
                      <span className="text-sm font-bold tabular-nums text-primary">{formatINR(costs.subTotal1)}</span>
                    </div>
                  </div>

                  <div className="p-4 space-y-1">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Other Charges</p>
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

          <div className="mt-4 space-y-4">
          {/* Payment schemes */}
          <Card className="border-benefit-scheme/25">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-benefit-scheme-soft text-benefit-scheme-foreground">
                  <Sparkles className="h-4 w-4" />
                </span>
                Payment Schemes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                {SCHEMES.map((s) => {
                  const active = s.id === schemeId;
                  const saving = costs.grossFlatCost * (s.discountPct / 100);
                  return (
                    <Button
                      key={s.id}
                      type="button"
                      variant="outline"
                      onClick={() => setSchemeId(s.id)}
                      className={`h-auto min-h-32 whitespace-normal justify-start text-left rounded-lg p-3 transition-all ${
                        active
                          ? "border-benefit-scheme bg-benefit-scheme-soft ring-2 ring-benefit-scheme/25 shadow-sm"
                          : "border-benefit-scheme/25 bg-benefit-scheme-soft/40 hover:border-benefit-scheme/60 hover:bg-benefit-scheme-soft"
                      }`}
                    >
                      <div className="w-full">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-semibold leading-tight">{s.name}</p>
                        {active && <Check className="h-4 w-4 text-benefit-scheme shrink-0" />}
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-1">{s.tagline}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-1.5 text-benefit-scheme-foreground">
                        <Badge className="border-benefit-scheme/25 bg-benefit-scheme-soft text-benefit-scheme-foreground hover:bg-benefit-scheme-soft">
                          {s.discountPct}% off
                        </Badge>
                        <span className="text-xs font-bold tabular-nums">Save {formatINR(saving)}</span>
                      </div>
                      <ul className="mt-2 space-y-0.5">
                        {s.benefits.map((b) => (
                          <li key={b} className="text-[11px] text-muted-foreground flex gap-1">
                            <span className="text-benefit-scheme">•</span> {b}
                          </li>
                        ))}
                      </ul>
                      </div>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Offers */}
          <Card className="border-benefit-offer/25">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-benefit-offer-soft text-benefit-offer-foreground">
                  <Clock className="h-4 w-4" />
                </span>
                Limited Period Booking Offers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {OFFERS.map((o) => {
                  const active = o.id === offerId;
                  const saving = costs.grossFlatCost * (o.discountPct / 100);
                  return (
                    <Button
                      key={o.id}
                      type="button"
                      variant="outline"
                      onClick={() => setOfferId(active ? null : o.id)}
                      className={`h-auto min-h-24 whitespace-normal justify-start rounded-lg p-3 text-left transition-all ${
                        active
                          ? "border-benefit-offer bg-benefit-offer-soft ring-2 ring-benefit-offer/25 shadow-sm"
                          : "border-benefit-offer/25 bg-benefit-offer-soft/40 hover:border-benefit-offer/60 hover:bg-benefit-offer-soft"
                      }`}
                    >
                      <div className="w-full">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold">{o.name}</p>
                        {active && <Check className="h-4 w-4 text-benefit-offer" />}
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-0.5">Valid: {o.window}</p>
                      <div className="mt-1 flex items-baseline justify-between gap-2 text-benefit-offer-foreground">
                        <p className="text-lg font-bold tabular-nums">{o.discountPct}% off</p>
                        <p className="text-xs font-bold tabular-nums">Save {formatINR(saving)}</p>
                      </div>
                      </div>
                    </Button>
                  );
                })}
              </div>
              <p className="text-[11px] text-muted-foreground mt-3">
                Click a selected offer again to remove it. Offer discount adds to the scheme benefit.
              </p>
            </CardContent>
          </Card>

          {/* Vouchers */}
          <Card className="border-benefit-voucher/25">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-benefit-voucher-soft text-benefit-voucher-foreground">
                  <Gift className="h-4 w-4" />
                </span>
                Vouchers
              </CardTitle>
              <Badge variant="outline" className="text-xs">
                Selected value {formatINR(voucherValue)}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {VOUCHERS.map((v) => {
                  const active = voucherIds.includes(v.id);
                  const Icon = VOUCHER_ICONS[v.id] ?? Gift;
                  return (
                    <Button
                      key={v.id}
                      type="button"
                      variant="outline"
                      onClick={() => toggleVoucher(v.id)}
                      className={`relative h-auto min-h-32 whitespace-normal justify-start text-left rounded-lg border-dashed p-3 transition-all ${
                        active
                          ? "border-benefit-voucher bg-benefit-voucher-soft ring-2 ring-benefit-voucher/25"
                          : "border-benefit-voucher/30 bg-benefit-voucher-soft/40 hover:border-benefit-voucher/60 hover:bg-benefit-voucher-soft"
                      }`}
                    >
                      <div className="w-full">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-benefit-voucher-soft text-benefit-voucher-foreground flex items-center justify-center">
                          <Icon className="h-4 w-4" />
                        </div>
                        <p className="text-sm font-semibold leading-tight">{v.name}</p>
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-2">{v.detail}</p>
                      <p className="text-sm font-bold text-benefit-voucher-foreground mt-1 tabular-nums">Benefit {formatINR(v.value)}</p>
                      <p className="text-[10px] text-muted-foreground mt-1 italic">{v.condition}</p>
                      {active && (
                        <Check className="h-4 w-4 text-benefit-voucher absolute top-3 right-3" />
                      )}
                      </div>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
          </div>
        </TabsContent>

        {/* Payment Schedule */}
        <TabsContent value="schedule" className="mt-4">
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-base">{scheme.name} — Payment Plan</CardTitle>
              <Badge variant="outline" className="text-xs">{scheme.schedule.length} Milestones</Badge>
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
                    {scheme.schedule.map((item, idx) => {
                      const amount = total * (item.percentage / 100);
                      return (
                        <TableRow key={`${item.date}-${idx}`} className="text-xs">
                          <TableCell className="text-muted-foreground">{idx + 1}</TableCell>
                          <TableCell className="font-medium">{item.date}</TableCell>
                          <TableCell>{item.description}</TableCell>
                          <TableCell className="text-right tabular-nums">
                            <Badge variant="secondary" className="font-mono text-[10px]">
                              {item.percentage.toFixed(2)}%
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right tabular-nums font-medium">{formatINR(amount)}</TableCell>
                        </TableRow>
                      );
                    })}
                    <TableRow className="bg-primary/5 hover:bg-primary/5 font-bold">
                      <TableCell colSpan={2} className="text-sm">Total</TableCell>
                      <TableCell></TableCell>
                      <TableCell className="text-right text-sm">100.00%</TableCell>
                      <TableCell className="text-right text-sm text-primary tabular-nums">{formatINR(total)}</TableCell>
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
