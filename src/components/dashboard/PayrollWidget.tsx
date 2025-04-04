
import { Employee } from "@/types";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PayrollWidgetProps {
  employees: Employee[];
}

const PayrollWidget: React.FC<PayrollWidgetProps> = ({ employees }) => {
  // Calculate total payroll
  const totalPayroll = employees.reduce((sum, employee) => sum + employee.totalPay, 0);
  
  // Get top 3 employees by pay
  const topEmployees = [...employees]
    .sort((a, b) => b.totalPay - a.totalPay)
    .slice(0, 3);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Payroll Summary</CardTitle>
        <CardDescription>
          Showing {employees.length} employees with total payroll of ${totalPayroll.toLocaleString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topEmployees.map(employee => (
            <div key={employee.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={employee.profilePicture} />
                  <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{employee.name}</p>
                  <p className="text-xs text-muted-foreground">{employee.hoursWorked} hrs @ ${employee.hourlyRate}/hr</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">${employee.totalPay.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">
                  Base: ${employee.basePay} + Tips: ${employee.tips}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PayrollWidget;
