export interface PaymentMilestone {
  date: string;
  percentage: number;
  description: string;
}

export const STANDARD_SCHEDULE: PaymentMilestone[] = [
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

export interface Scheme {
  id: string;
  name: string;
  tagline: string;
  /** Discount on flat cost, in percent */
  discountPct: number;
  benefits: string[];
  schedule: PaymentMilestone[];
}

export const SCHEMES: Scheme[] = [
  {
    id: "standard",
    name: "Standard (CLP)",
    tagline: "Construction linked plan",
    discountPct: 0,
    benefits: ["Pay as construction progresses", "17 milestones"],
    schedule: STANDARD_SCHEDULE,
  },
  {
    id: "30-70",
    name: "30 : 70 Payment",
    tagline: "30% now, 70% on possession",
    discountPct: 1,
    benefits: ["Only 30% till slab completion", "Balance 70% on possession"],
    schedule: [
      { date: "01.09.2024", percentage: 10.0, description: "On Signing of Application" },
      { date: "08.09.2024", percentage: 20.0, description: "Within 30 days of Booking" },
      { date: "22.11.2025", percentage: 70.0, description: "On Possession" },
    ],
  },
  {
    id: "upfront",
    name: "Upfront Payment",
    tagline: "Pay 100% at booking",
    discountPct: 6,
    benefits: ["Highest price benefit (6%)", "Priority unit allotment"],
    schedule: [
      { date: "01.09.2024", percentage: 10.0, description: "On Signing of Application" },
      { date: "15.09.2024", percentage: 90.0, description: "Within 15 days of Booking" },
    ],
  },
  {
    id: "no-pre-emi",
    name: "No Pre-EMI for 1 Year",
    tagline: "Developer pays your interest",
    discountPct: 0,
    benefits: ["Pre-EMI borne by developer for 12 months", "Bank approved subvention"],
    schedule: [
      { date: "01.09.2024", percentage: 10.0, description: "On Signing of Application" },
      { date: "22.09.2024", percentage: 10.0, description: "Agreement Registration" },
      { date: "22.10.2024", percentage: 60.0, description: "Bank disbursement (No Pre-EMI for 12 months)" },
      { date: "22.11.2025", percentage: 20.0, description: "On Possession" },
    ],
  },
  {
    id: "assured-rental",
    name: "Assured Rental",
    tagline: "Rental income till possession",
    discountPct: 0,
    benefits: ["Assured rent till possession", "Payable quarterly"],
    schedule: [
      { date: "01.09.2024", percentage: 10.0, description: "On Signing of Application" },
      { date: "22.10.2024", percentage: 30.0, description: "Agreement Registration" },
      { date: "22.04.2025", percentage: 40.0, description: "Terrace slab" },
      { date: "22.11.2025", percentage: 20.0, description: "On Possession" },
    ],
  },
];

export interface Voucher {
  id: string;
  name: string;
  detail: string;
  value: number;
  condition: string;
}

export const VOUCHERS: Voucher[] = [
  { id: "gold", name: "Gold Coin Voucher", detail: "10 gm 24K gold coin", value: 85000, condition: "On completion of agreement registration" },
  { id: "registration", name: "On-Time Registration Voucher", detail: "Registration charges waived", value: 30000, condition: "Registration done within 30 days of booking" },
  { id: "cashback", name: "Payment Cashback Voucher", detail: "Cashback on every on-time instalment", value: 50000, condition: "All instalments paid on or before due date" },
  { id: "iphone", name: "iPhone Voucher", detail: "Latest iPhone on possession", value: 120000, condition: "Full payment cleared before possession" },
];

export interface Offer {
  id: string;
  name: string;
  window: string;
  discountPct: number;
}

export const OFFERS: Offer[] = [
  { id: "spot", name: "On Spot Booking", window: "Book today", discountPct: 3 },
  { id: "1week", name: "Within 1 Week", window: "7 days", discountPct: 2 },
  { id: "15days", name: "Within 15 Days", window: "15 days", discountPct: 1.5 },
  { id: "1month", name: "Within 1 Month", window: "30 days", discountPct: 1 },
];
