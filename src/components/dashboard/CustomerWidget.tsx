
import { Customer } from "@/types";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarIcon, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface CustomerWidgetProps {
  customers: Customer[];
}

const CustomerWidget: React.FC<CustomerWidgetProps> = ({ customers }) => {
  // Sort customers by most recent visit
  const sortedCustomers = [...customers].sort(
    (a, b) => new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime()
  );
  
  // Calculate the number of customers with upcoming appointments
  const upcomingAppointments = customers.filter(c => c.nextAppointment).length;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Recent Customers</CardTitle>
        <CardDescription>
          {upcomingAppointments} upcoming appointments scheduled
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedCustomers.slice(0, 3).map(customer => (
            <div key={customer.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback>{customer.name.split(' ')[0][0]}{customer.name.split(' ')[1][0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{customer.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {customer.preferredService} · ${customer.lifetimeSpend}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock size={14} className="mr-1" />
                  <span>{formatDistanceToNow(new Date(customer.lastVisit), { addSuffix: true })}</span>
                </div>
                {customer.nextAppointment && (
                  <div className="flex items-center text-xs text-primary">
                    <CalendarIcon size={12} className="mr-1" />
                    <span>{new Date(customer.nextAppointment).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerWidget;
