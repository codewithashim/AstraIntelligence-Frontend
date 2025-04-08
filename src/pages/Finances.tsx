
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { revenueData, expenseData, calculateFinancialSummary } from "@/data/mockData";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  FileBarChart, 
  Calendar, 
  PieChart as PieChartIcon,
  Scissors
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line,
  XAxis, 
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer, 
  Tooltip as RechartsTooltip,
  Legend
} from "recharts";

const Finances = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Calculate financial summary
  const { grossRevenue, totalExpenses, netRevenue, profitMargin } = calculateFinancialSummary();

  // Process expense data for visualization
  const expensesByCategory: Record<string, number> = expenseData.reduce(
    (acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    },
    {} as Record<string, number>
  );
  
  const expenseCategoryData = Object.entries(expensesByCategory).map(([name, value]) => ({
    name,
    value,
    color: ["#9b87f5", "#7E69AB", "#E5DEFF", "#FFDEE2", "#D6BCFA"][
      Object.keys(expensesByCategory).indexOf(name) % 5
    ]
  }));
  
  // Revenue by service
  const revenueByService: Record<string, number> = revenueData.reduce(
    (acc, rev) => {
      acc[rev.service] = (acc[rev.service] || 0) + rev.totalRevenue;
      return acc;
    },
    {} as Record<string, number>
  );
  
  const serviceRevenueData = Object.entries(revenueByService).map(([name, value]) => ({
    name,
    value,
    color: ["#9b87f5", "#7E69AB", "#E5DEFF", "#FFDEE2"][
      Object.keys(revenueByService).indexOf(name) % 4
    ]
  }));

  // Daily revenue and expense data for the line chart
  const dailyFinancialData = revenueData.map(rev => {
    const dateExpenses = expenseData
      .filter(exp => exp.date === rev.date)
      .reduce((sum, exp) => sum + exp.amount, 0);
    
    return {
      date: new Date(rev.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      revenue: rev.totalRevenue,
      expense: dateExpenses,
      profit: rev.totalRevenue - dateExpenses
    };
  });

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Financial Analytics</h2>
            <p className="text-muted-foreground">
              Track revenue, expenses, and profit margins.
            </p>
          </div>
          <div className="space-x-2">
            <Button>
              <Calendar size={18} className="mr-2" />
              Date Range
            </Button>
            <Button variant="outline">
              <FileBarChart size={18} className="mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Financial Summary */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center">
                <DollarSign size={16} className="mr-1 text-primary" />
                Gross Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${grossRevenue.toFixed(2)}</div>
              <p className="text-xs text-emerald-600 font-medium flex items-center">
                <TrendingUp size={14} className="mr-1" />
                8.5% vs. last week
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center">
                <Scissors size={16} className="mr-1 text-primary" />
                Service Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${revenueData.reduce((sum, r) => sum + r.serviceRevenue, 0).toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                {Math.round((revenueData.reduce((sum, r) => sum + r.serviceRevenue, 0) / grossRevenue) * 100)}% of total revenue
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center">
                <TrendingDown size={16} className="mr-1 text-destructive" />
                Total Expenses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalExpenses.toFixed(2)}</div>
              <p className="text-xs text-destructive font-medium flex items-center">
                <TrendingUp size={14} className="mr-1" />
                3.2% vs. last week
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center">
                <PieChartIcon size={16} className="mr-1" />
                Net Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${netRevenue.toFixed(2)}
              </div>
              <p className={`text-xs font-medium flex items-center ${netRevenue >= 0 ? "text-emerald-600" : "text-destructive"}`}>
                {profitMargin.toFixed(1)}% profit margin
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="revenue">Revenue Analysis</TabsTrigger>
            <TabsTrigger value="expenses">Expense Analysis</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Financial Performance</CardTitle>
                <CardDescription>Daily revenue, expenses, and profit</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={dailyFinancialData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <RechartsTooltip 
                        formatter={(value: number) => [`$${value.toFixed(2)}`, '']}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#9b87f5" 
                        strokeWidth={2}
                        name="Revenue"
                        dot={{ r: 3 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="expense" 
                        stroke="#FFDEE2" 
                        strokeWidth={2}
                        name="Expenses"
                        dot={{ r: 3 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="profit" 
                        stroke="#10b981" 
                        strokeWidth={2}
                        name="Profit"
                        dot={{ r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Revenue vs. Expenses Bar Chart */}
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue by Service</CardTitle>
                  <CardDescription>Top performing services</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={serviceRevenueData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={90}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {serviceRevenueData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Legend />
                        <RechartsTooltip 
                          formatter={(value: number, name: string) => [`$${value.toFixed(2)}`, name]}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Expenses by Category</CardTitle>
                  <CardDescription>Category breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={expenseCategoryData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={90}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {expenseCategoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Legend />
                        <RechartsTooltip 
                          formatter={(value: number, name: string) => [`$${value.toFixed(2)}`, name]}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Financial Analysis */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Financial Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-1">Key Insights</h3>
                    <ul className="text-sm space-y-1 list-disc pl-5">
                      <li>Acrylic Set services generated the highest revenue at ${revenueByService["Acrylic Set"]?.toFixed(2)}</li>
                      <li>Payroll represents {Math.round((expensesByCategory["Payroll"] / totalExpenses) * 100)}% of total expenses</li>
                      <li>Net profit margin is {profitMargin.toFixed(1)}%, {profitMargin > 15 ? "above" : "below"} industry average (15%)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-1">Recommendations</h3>
                    <ul className="text-sm space-y-1 list-disc pl-5">
                      {netRevenue < 0 && (
                        <li className="text-destructive">Urgent: Business is operating at a loss. Consider cost-cutting measures.</li>
                      )}
                      <li>Promote {Object.entries(revenueByService).sort((a, b) => b[1] - a[1])[0][0]} services to maximize revenue</li>
                      <li>Review {Object.entries(expensesByCategory).sort((a, b) => b[1] - a[1])[0][0]} expenses for potential cost savings</li>
                      <li>Consider bundling services to increase average transaction value</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Revenue Tab */}
          <TabsContent value="revenue" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Details</CardTitle>
                <CardDescription>Daily revenue breakdown by service and product sales</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead className="text-right">Service Revenue</TableHead>
                      <TableHead className="text-right">Product Revenue</TableHead>
                      <TableHead className="text-right">Total Revenue</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {revenueData.map((revenue) => (
                      <TableRow key={revenue.id}>
                        <TableCell>{new Date(revenue.date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Badge variant="outline" className="mr-2">
                              {revenue.service}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">${revenue.serviceRevenue.toFixed(2)}</TableCell>
                        <TableCell className="text-right">${revenue.productRevenue.toFixed(2)}</TableCell>
                        <TableCell className="font-medium text-right">${revenue.totalRevenue.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-muted/50">
                      <TableCell colSpan={2} className="font-medium">Totals</TableCell>
                      <TableCell className="text-right font-medium">
                        ${revenueData.reduce((sum, rev) => sum + rev.serviceRevenue, 0).toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        ${revenueData.reduce((sum, rev) => sum + rev.productRevenue, 0).toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        ${grossRevenue.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Service Revenue Analysis</CardTitle>
                <CardDescription>Revenue contribution by service type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={Object.entries(revenueByService).map(([name, value]) => ({ name, value }))}
                      margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis 
                        type="category" 
                        dataKey="name" 
                        tick={{ fontSize: 12 }}
                      />
                      <RechartsTooltip 
                        formatter={(value: number) => [`$${value.toFixed(2)}`, 'Revenue']}
                      />
                      <Bar 
                        dataKey="value" 
                        fill="#9b87f5" 
                        radius={[0, 4, 4, 0]}
                        label={{ 
                          position: 'right',
                          formatter: (value: number) => `$${value}`
                        }}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Expenses Tab */}
          <TabsContent value="expenses" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Expense Details</CardTitle>
                <CardDescription>Itemized expenses by category</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {expenseData.map((expense) => (
                      <TableRow key={expense.id}>
                        <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={
                              expense.category === "Payroll" 
                                ? "bg-amber-50 text-amber-700 border-amber-200" 
                                : expense.category === "Rent" 
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : expense.category === "Supplies"
                                ? "bg-purple-50 text-purple-700 border-purple-200"
                                : ""
                            }
                          >
                            {expense.category}
                          </Badge>
                        </TableCell>
                        <TableCell>{expense.description}</TableCell>
                        <TableCell className="font-medium text-right">${expense.amount.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-muted/50">
                      <TableCell colSpan={3} className="font-medium">Total Expenses</TableCell>
                      <TableCell className="text-right font-medium">${totalExpenses.toFixed(2)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Expense Category Analysis</CardTitle>
                <CardDescription>Breakdown by expense category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={Object.entries(expensesByCategory).map(([name, value]) => ({ name, value }))}
                      margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis 
                        type="category" 
                        dataKey="name" 
                        tick={{ fontSize: 12 }}
                      />
                      <RechartsTooltip 
                        formatter={(value: number) => [`$${value.toFixed(2)}`, 'Amount']}
                      />
                      <Bar 
                        dataKey="value" 
                        fill="#FFDEE2" 
                        radius={[0, 4, 4, 0]}
                        label={{ 
                          position: 'right',
                          formatter: (value: number) => `$${value}`
                        }}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Finances;
