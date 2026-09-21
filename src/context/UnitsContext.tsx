import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { buildings as initialBuildings, Customer, HOLD_DURATION_MS, TowerType, UnitType } from "@/data/buildingData";

type UnitsContextValue = {
  towers: TowerType[];
  now: number;
  getUnit: (unitNumber: string) => UnitType | undefined;
  placeEOI: (unitNumber: string, customer: Customer) => void;
  allocateUnit: (unitNumber: string) => void;
  releaseUnit: (unitNumber: string) => void;
};

const UnitsContext = createContext<UnitsContextValue | null>(null);

const mapUnits = (towers: TowerType[], fn: (u: UnitType) => UnitType): TowerType[] =>
  towers.map((t) => ({
    ...t,
    floors: t.floors.map((f) => ({ ...f, units: f.units.map(fn) })),
  }));

export const UnitsProvider = ({ children }: { children: ReactNode }) => {
  const [towers, setTowers] = useState<TowerType[]>(initialBuildings);
  const [now, setNow] = useState(() => Date.now());

  // tick every second: drives countdowns and expires holds
  useEffect(() => {
    const id = setInterval(() => {
      const t = Date.now();
      setNow(t);
      setTowers((prev) => {
        let changed = false;
        const next = mapUnits(prev, (u) => {
          if (u.status === "hold" && u.holdExpiresAt && u.holdExpiresAt <= t) {
            changed = true;
            return { ...u, status: "available" as const, holdExpiresAt: undefined, customer: undefined };
          }
          return u;
        });
        return changed ? next : prev;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const update = useCallback((unitNumber: string, patch: (u: UnitType) => UnitType) => {
    setTowers((prev) => mapUnits(prev, (u) => (u.unitNumber === unitNumber ? patch(u) : u)));
  }, []);

  const value = useMemo<UnitsContextValue>(
    () => ({
      towers,
      now,
      getUnit: (unitNumber) =>
        towers.flatMap((t) => t.floors).flatMap((f) => f.units).find((u) => u.unitNumber === unitNumber),
      placeEOI: (unitNumber, customer) =>
        update(unitNumber, (u) => ({
          ...u,
          status: "hold",
          holdExpiresAt: Date.now() + HOLD_DURATION_MS,
          customer,
        })),
      allocateUnit: (unitNumber) =>
        update(unitNumber, (u) => ({ ...u, status: "allocated", holdExpiresAt: undefined })),
      releaseUnit: (unitNumber) =>
        update(unitNumber, (u) => ({
          ...u,
          status: "available",
          holdExpiresAt: undefined,
          customer: undefined,
        })),
    }),
    [towers, now, update]
  );

  return <UnitsContext.Provider value={value}>{children}</UnitsContext.Provider>;
};

export const useUnits = () => {
  const ctx = useContext(UnitsContext);
  if (!ctx) throw new Error("useUnits must be used within UnitsProvider");
  return ctx;
};

export const formatCountdown = (ms: number) => {
  const total = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
};
