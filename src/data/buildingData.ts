export type UnitType = {
  unitNumber: string;
  type: "2BHK" | "3BHK";
  carpetArea: number;
  value: number;
  status: "booked" | "available" | "hold";
};

export type FloorType = {
  floorNumber: number;
  units: UnitType[];
};

export type TowerType = {
  id: string;
  name: string;
  floors: FloorType[];
};

const generateUnits = (floorNumber: number, towerId: string): UnitType[] => {
  return Array.from({ length: 4 }, (_, index) => ({
    unitNumber: `${towerId}-${floorNumber}${String.fromCharCode(65 + index)}`,
    type: Math.random() > 0.5 ? "2BHK" : "3BHK",
    carpetArea: Math.random() > 0.5 ? 1200 : 1500,
    value: Math.random() > 0.5 ? 7500000 : 9000000,
    status: ["booked", "available", "hold"][Math.floor(Math.random() * 3)] as "booked" | "available" | "hold",
  }));
};

const generateTower = (id: string, name: string): TowerType => {
  return {
    id,
    name,
    floors: Array.from({ length: 30 }, (_, index) => ({
      floorNumber: index + 1,
      units: generateUnits(index + 1, id),
    })),
  };
};

export const buildings: TowerType[] = [
  generateTower("T1", "Tower 1"),
  generateTower("T2", "Tower 2"),
  generateTower("T3", "Tower 3"),
];