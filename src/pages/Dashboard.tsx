
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import InventoryWidget from "@/components/dashboard/InventoryWidget";
import PayrollWidget from "@/components/dashboard/PayrollWidget";
import FinancialWidget from "@/components/dashboard/FinancialWidget";
import CustomerWidget from "@/components/dashboard/CustomerWidget";
import PredictionWidget from "@/components/dashboard/PredictionWidget";
import { 
  inventoryData, 
  employeeData, 
  revenueData, 
  expenseData, 
  customerData, 
  predictionsData, 
  marketTrendsData,
  calculateFinancialSummary 
} from "@/data/mockData";
import { TrendItem } from "@/types";

const Dashboard = () => {
  // Calculate financial summary
  const financialSummary = calculateFinancialSummary();
  
  // Calculate trend metrics
  const trends: TrendItem[] = [
    {
      name: "Revenue",
      value: financialSummary.grossRevenue,
      percentage: 12.5,
      trend: "up",
    },
    {
      name: "Customers",
      value: 42,
      percentage: 5.2,
      trend: "up",
    },
    {
      name: "Profit",
      value: financialSummary.netRevenue,
      percentage: 8.3,
      trend: "up",
    },
    {
      name: "Low Stock",
      value: inventoryData.filter(item => 
        item.currentStock <= item.minimumThreshold
      ).length,
      percentage: 3.1,
      trend: "down",
    },
  ];

  return (
    <DashboardLayout>
      <DashboardHeader trends={trends} />

      <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-2 lg:grid-cols-3">
        <InventoryWidget inventoryItems={inventoryData} />
        <PayrollWidget employees={employeeData} />
        <FinancialWidget 
          revenues={revenueData} 
          expenses={expenseData} 
          summary={financialSummary}
        />
        <CustomerWidget customers={customerData} />
        <PredictionWidget 
          predictions={predictionsData} 
          marketTrends={marketTrendsData}
        />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
