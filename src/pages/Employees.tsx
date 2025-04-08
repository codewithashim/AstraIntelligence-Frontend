
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { employeeData } from "@/data/mockData";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, FileBarChart, UserPlus, Star, AlertCircle } from "lucide-react";
import { 
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  Legend
} from "recharts";

const Employees = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter employee data based on search
  const filteredEmployees = employeeData.filter(employee =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Calculate payroll metrics
  const totalPayroll = employeeData.reduce((sum, emp) => sum + emp.totalPay, 0);
  const totalHours = employeeData.reduce((sum, emp) => sum + emp.hoursWorked, 0);
  const avgHourlyRate = totalHours > 0 
    ? employeeData.reduce((sum, emp) => sum + emp.hourlyRate, 0) / employeeData.length
    : 0;
  const totalTips = employeeData.reduce((sum, emp) => sum + emp.tips, 0);
  
  // Prepare chart data
  const payrollDistribution = [
    { name: "Base Pay", value: totalPayroll - totalTips, color: "#9b87f5" },
    { name: "Tips", value: totalTips, color: "#7E69AB" },
  ];
  
  const hoursDistribution = employeeData.map(emp => ({
    name: emp.name,
    value: emp.hoursWorked,
    color: ["#9b87f5", "#7E69AB", "#E5DEFF", "#FFDEE2"][employeeData.indexOf(emp) % 4]
  }));

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Payroll Management</h2>
            <p className="text-muted-foreground">
              Manage employee hours, pay, and performance.
            </p>
          </div>
          <div className="space-x-2">
            <Button>
              <UserPlus size={18} className="mr-2" />
              Add Employee
            </Button>
            <Button variant="outline">
              <FileBarChart size={18} className="mr-2" />
              Export Payroll
            </Button>
          </div>
        </div>

        {/* Payroll Overview */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Total Payroll</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalPayroll.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Current pay period</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Total Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalHours}</div>
              <p className="text-xs text-muted-foreground">
                Across {employeeData.length} employees
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Avg. Hourly Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${avgHourlyRate.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Base pay rate</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Total Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalTips.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                {((totalTips / totalPayroll) * 100).toFixed(1)}% of total pay
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Chart Cards */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Payroll Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Payroll Distribution</CardTitle>
              <CardDescription>Base pay vs. tips breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={payrollDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                      labelLine={false}
                    >
                      {payrollDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      formatter={(value: number) => [`$${value.toFixed(2)}`, 'Amount']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Hours Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Hours Distribution</CardTitle>
              <CardDescription>Hours worked by employee</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={hoursDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                      labelLine={false}
                    >
                      {hoursDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend />
                    <RechartsTooltip 
                      formatter={(value: number, name: string) => [`${value} hours`, name]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Employees Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Employee Payroll Details</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search employees..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead className="text-right">Hours</TableHead>
                  <TableHead className="text-right">Hourly Rate</TableHead>
                  <TableHead className="text-right">Base Pay</TableHead>
                  <TableHead className="text-right">Bonuses</TableHead>
                  <TableHead className="text-right">Tips</TableHead>
                  <TableHead className="text-right">Total Pay</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Avatar>
                          <AvatarImage src={employee.profilePicture} />
                          <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{employee.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{employee.hoursWorked}</TableCell>
                    <TableCell className="text-right">${employee.hourlyRate.toFixed(2)}</TableCell>
                    <TableCell className="text-right">${employee.basePay.toFixed(2)}</TableCell>
                    <TableCell className="text-right">${employee.bonuses.toFixed(2)}</TableCell>
                    <TableCell className="text-right">${employee.tips.toFixed(2)}</TableCell>
                    <TableCell className="font-medium text-right">${employee.totalPay.toFixed(2)}</TableCell>
                    <TableCell>
                      {employee.hoursWorked > 130 ? (
                        <Badge className="bg-amber-50 text-amber-700 border-amber-200 flex w-fit items-center gap-1">
                          <AlertCircle size={12} />
                          High Hours
                        </Badge>
                      ) : employee.tips > 350 ? (
                        <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 flex w-fit items-center gap-1">
                          <Star size={12} />
                          Top Performer
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="flex w-fit">
                          Normal
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-muted/50">
                  <TableCell className="font-medium">Totals</TableCell>
                  <TableCell className="text-right font-medium">{totalHours}</TableCell>
                  <TableCell className="text-right font-medium">${avgHourlyRate.toFixed(2)}</TableCell>
                  <TableCell className="text-right font-medium">
                    ${employeeData.reduce((sum, emp) => sum + emp.basePay, 0).toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    ${employeeData.reduce((sum, emp) => sum + emp.bonuses, 0).toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right font-medium">${totalTips.toFixed(2)}</TableCell>
                  <TableCell className="text-right font-medium">${totalPayroll.toFixed(2)}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        {/* Payroll Notes */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <AlertCircle size={18} className="mr-2 text-amber-500" />
              Payroll Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-sm">
                <span className="font-medium">Maria Lopez</span> - Consistent performer with balanced tips and hours.
              </div>
              <div className="text-sm">
                <span className="font-medium text-amber-600">James Wong</span> - Working 140 hours (above target). Consider reviewing workload distribution.
              </div>
              <div className="text-sm">
                <span className="font-medium text-emerald-600">Maya Johnson</span> - Highest tip earner. Consider sharing techniques with other team members.
              </div>
              <div className="text-sm mt-4 text-muted-foreground text-xs">
                * High hours may lead to burnout and reduced service quality. Review scheduling where noted.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Employees;
