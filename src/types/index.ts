
// Inventory types
export interface InventoryItem {
  id: string;
  product: string;
  currentStock: number;
  minimumThreshold: number;
  costPerUnit: number;
  lastRestocked?: string;
  reorderRecommendation?: boolean;
}

// Employee and Payroll types
export interface Employee {
  id: string;
  name: string;
  hoursWorked: number;
  hourlyRate: number;
  basePay: number;
  bonuses: number;
  tips: number;
  totalPay: number;
  profilePicture?: string;
}

// Financial types
export interface Revenue {
  id: string;
  date: string;
  service: string;
  serviceRevenue: number;
  productRevenue: number;
  totalRevenue: number;
}

export interface Expense {
  id: string;
  category: string;
  description: string;
  amount: number;
  date: string;
}

export interface FinancialSummary {
  grossRevenue: number;
  totalExpenses: number;
  netRevenue: number;
  profitMargin: number;
}

// Customer types
export interface Customer {
  id: string;
  name: string;
  lastVisit: string;
  preferredService: string;
  totalVisits: number;
  lifetimeSpend: number;
  nextAppointment?: string;
  emailAddress?: string;
  phoneNumber?: string;
  profilePicture?: string;
}

// Prediction types
export interface Prediction {
  date: string;
  predictedRevenue: number;
  predictedCustomers: number;
  confidence: number;
  busyFactor: 'Low' | 'Medium' | 'High';
}

export interface TrendItem {
  name: string;
  value: number;
  percentage: number;
  trend: 'up' | 'down' | 'flat';
}

export interface MarketTrend {
  trend: string;
  popularity: number;
  description: string;
}
