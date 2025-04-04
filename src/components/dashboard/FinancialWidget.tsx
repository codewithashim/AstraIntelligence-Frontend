
import { Revenue, Expense, FinancialSummary } from "@/types";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon, DollarSign, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip as RechartsTooltip } from "recharts";

interface FinancialWidgetProps {
  revenues: Revenue[];
  expenses: Expense[];
  summary: FinancialSummary;
}

const FinancialWidget: React.FC<FinancialWidgetProps> = ({ revenues, expenses, summary }) => {
  const { grossRevenue, totalExpenses, netRevenue, profitMargin } = summary;
  
  const pieData = [
    { name: 'Revenue', value: grossRevenue, color: '#9b87f5' },
    { name: 'Expenses', value: totalExpenses, color: '#FFDEE2' },
  ];

  const isProfitable = netRevenue >= 0;

  // Group expenses by category
  const expensesByCategory = expenses.reduce((acc: Record<string, number>, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Financial Summary</CardTitle>
        <CardDescription>Revenue vs. expenses for current period</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-start mb-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Net Revenue</p>
            <div className="text-2xl font-semibold flex items-center">
              <DollarSign size={20} className={cn(
                isProfitable ? "text-emerald-500" : "text-destructive"
              )} />
              <span>{isProfitable ? netRevenue.toLocaleString() : `(${Math.abs(netRevenue).toLocaleString()})`}</span>
            </div>
            <div className="flex items-center text-xs">
              {isProfitable ? (
                <TrendingUp size={14} className="text-emerald-500 mr-1" />
              ) : (
                <TrendingDown size={14} className="text-destructive mr-1" />
              )}
              <span className={cn(
                "font-medium",
                isProfitable ? "text-emerald-500" : "text-destructive"
              )}>
                {profitMargin.toFixed(1)}% profit margin
              </span>
            </div>
          </div>
          <div className="w-24 h-24">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={25}
                  outerRadius={40}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Revenue</p>
            <p className="text-sm font-medium">${grossRevenue.toLocaleString()}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Expenses</p>
            <p className="text-sm font-medium">${totalExpenses.toLocaleString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialWidget;
