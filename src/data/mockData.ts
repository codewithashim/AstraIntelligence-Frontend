
import { InventoryItem, Employee, Revenue, Expense, Customer, Prediction, MarketTrend } from "@/types";

// Inventory Data
export const inventoryData: InventoryItem[] = [
  { id: "inv1", product: "Gel Polish", currentStock: 30, minimumThreshold: 10, costPerUnit: 8, lastRestocked: "2024-03-15", reorderRecommendation: false },
  { id: "inv2", product: "Acrylic Powder", currentStock: 15, minimumThreshold: 5, costPerUnit: 12, lastRestocked: "2024-03-10", reorderRecommendation: false },
  { id: "inv3", product: "Nail Files", currentStock: 50, minimumThreshold: 20, costPerUnit: 2, lastRestocked: "2024-02-28", reorderRecommendation: false },
  { id: "inv4", product: "Nail Clippers", currentStock: 20, minimumThreshold: 10, costPerUnit: 5, lastRestocked: "2024-03-05", reorderRecommendation: false },
  { id: "inv5", product: "Cuticle Oil", currentStock: 8, minimumThreshold: 10, costPerUnit: 7, lastRestocked: "2024-03-01", reorderRecommendation: true },
  { id: "inv6", product: "Nail Tips", currentStock: 150, minimumThreshold: 100, costPerUnit: 0.5, lastRestocked: "2024-02-25", reorderRecommendation: false },
  { id: "inv7", product: "Base Coat", currentStock: 12, minimumThreshold: 15, costPerUnit: 6, lastRestocked: "2024-02-20", reorderRecommendation: true },
];

// Employee Data
export const employeeData: Employee[] = [
  { id: "emp1", name: "Maria Lopez", hoursWorked: 120, hourlyRate: 18, basePay: 2160, bonuses: 100, tips: 400, totalPay: 2660, profilePicture: "https://i.pravatar.cc/150?u=maria" },
  { id: "emp2", name: "James Wong", hoursWorked: 140, hourlyRate: 22, basePay: 3080, bonuses: 300, tips: 300, totalPay: 3680, profilePicture: "https://i.pravatar.cc/150?u=james" },
  { id: "emp3", name: "Hannah Yu", hoursWorked: 100, hourlyRate: 15, basePay: 1500, bonuses: 100, tips: 100, totalPay: 1700, profilePicture: "https://i.pravatar.cc/150?u=hannah" },
  { id: "emp4", name: "Maya Johnson", hoursWorked: 130, hourlyRate: 20, basePay: 2600, bonuses: 200, tips: 350, totalPay: 3150, profilePicture: "https://i.pravatar.cc/150?u=maya" },
];

// Revenue Data
export const revenueData: Revenue[] = [
  { id: "rev1", date: "2024-03-01", service: "Gel Nails", serviceRevenue: 700, productRevenue: 200, totalRevenue: 900 },
  { id: "rev2", date: "2024-03-02", service: "Manicure & Pedicure", serviceRevenue: 750, productRevenue: 250, totalRevenue: 1000 },
  { id: "rev3", date: "2024-03-03", service: "Acrylic Set", serviceRevenue: 1000, productRevenue: 400, totalRevenue: 1400 },
  { id: "rev4", date: "2024-03-04", service: "Nail Art", serviceRevenue: 700, productRevenue: 250, totalRevenue: 950 },
  { id: "rev5", date: "2024-03-05", service: "Gel Nails", serviceRevenue: 800, productRevenue: 300, totalRevenue: 1100 },
  { id: "rev6", date: "2024-03-06", service: "Manicure & Pedicure", serviceRevenue: 900, productRevenue: 350, totalRevenue: 1250 },
  { id: "rev7", date: "2024-03-07", service: "Nail Art", serviceRevenue: 850, productRevenue: 200, totalRevenue: 1050 },
];

// Expense Data
export const expenseData: Expense[] = [
  { id: "EX001", category: "Rent", description: "Salon lease payment", amount: 2000, date: "2024-03-01" },
  { id: "EX002", category: "Utilities", description: "Electricity & water", amount: 400, date: "2024-03-02" },
  { id: "EX003", category: "Supplies", description: "Nail polish restock", amount: 400, date: "2024-03-03" },
  { id: "EX004", category: "Marketing", description: "Social media ads", amount: 200, date: "2024-03-04" },
  { id: "EX005", category: "Payroll", description: "Employee salaries", amount: 8040, date: "2024-03-05" },
  { id: "EX006", category: "Maintenance", description: "Salon equipment repair", amount: 150, date: "2024-03-06" },
  { id: "EX007", category: "Insurance", description: "Business liability insurance", amount: 300, date: "2024-03-07" },
];

// Customer Data
export const customerData: Customer[] = [
  { id: "cus1", name: "Sarah J.", lastVisit: "2024-02-28", preferredService: "Acrylic Set", totalVisits: 5, lifetimeSpend: 500, nextAppointment: "2024-03-15", emailAddress: "sarah.j@example.com", phoneNumber: "555-123-4567" },
  { id: "cus2", name: "Emily W.", lastVisit: "2024-03-01", preferredService: "Gel Nails", totalVisits: 8, lifetimeSpend: 800, nextAppointment: "2024-03-10", emailAddress: "emily.w@example.com", phoneNumber: "555-234-5678" },
  { id: "cus3", name: "Lisa R.", lastVisit: "2024-03-03", preferredService: "Manicure & Pedicure", totalVisits: 3, lifetimeSpend: 300, emailAddress: "lisa.r@example.com", phoneNumber: "555-345-6789" },
  { id: "cus4", name: "Mia Zhang", lastVisit: "2024-03-04", preferredService: "Nail Art", totalVisits: 10, lifetimeSpend: 1200, nextAppointment: "2024-03-11", emailAddress: "mia.z@example.com", phoneNumber: "555-456-7890" },
  { id: "cus5", name: "Olivia K.", lastVisit: "2024-02-27", preferredService: "Gel Nails", totalVisits: 6, lifetimeSpend: 650, emailAddress: "olivia.k@example.com", phoneNumber: "555-567-8901" },
  { id: "cus6", name: "Taylor B.", lastVisit: "2024-03-02", preferredService: "Acrylic Set", totalVisits: 4, lifetimeSpend: 480, nextAppointment: "2024-03-16", emailAddress: "taylor.b@example.com", phoneNumber: "555-678-9012" },
];

// Prediction Data
export const predictionsData: Prediction[] = [
  { date: "2024-04-01", predictedRevenue: 1100, predictedCustomers: 12, confidence: 0.85, busyFactor: "Medium" },
  { date: "2024-04-02", predictedRevenue: 900, predictedCustomers: 10, confidence: 0.82, busyFactor: "Low" },
  { date: "2024-04-03", predictedRevenue: 1300, predictedCustomers: 14, confidence: 0.88, busyFactor: "Medium" },
  { date: "2024-04-04", predictedRevenue: 1500, predictedCustomers: 16, confidence: 0.92, busyFactor: "High" },
  { date: "2024-04-05", predictedRevenue: 1700, predictedCustomers: 18, confidence: 0.95, busyFactor: "High" },
  { date: "2024-04-06", predictedRevenue: 2000, predictedCustomers: 22, confidence: 0.90, busyFactor: "High" },
  { date: "2024-04-07", predictedRevenue: 1200, predictedCustomers: 13, confidence: 0.86, busyFactor: "Medium" },
];

// Market Trends Data
export const marketTrendsData: MarketTrend[] = [
  { trend: "Chrome nails", popularity: 95, description: "Mirror-finish metallic manicures are trending across social media" },
  { trend: "Eco-friendly polishes", popularity: 87, description: "Vegan & non-toxic nail polishes seeing increased consumer demand" },
  { trend: "Minimalist designs", popularity: 82, description: "Simple, elegant nail art with negative space is gaining popularity" },
  { trend: "Gel extensions", popularity: 90, description: "Longer-lasting, natural-looking nail extensions preferred over acrylics" },
  { trend: "Nail care bundles", popularity: 75, description: "At-home maintenance kits between salon visits are selling well" }
];

// Summary Calculation Functions
export const calculateFinancialSummary = () => {
  const grossRevenue = revenueData.reduce((sum, item) => sum + item.totalRevenue, 0);
  const totalExpenses = expenseData.reduce((sum, item) => sum + item.amount, 0);
  const netRevenue = grossRevenue - totalExpenses;
  const profitMargin = grossRevenue > 0 ? (netRevenue / grossRevenue) * 100 : 0;
  
  return {
    grossRevenue,
    totalExpenses,
    netRevenue,
    profitMargin
  };
};
