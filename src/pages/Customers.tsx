
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { customerData } from "@/data/mockData";
import { Customer } from "@/types";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, UserPlus, Mail, Calendar, Phone, Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDistanceToNow } from "date-fns";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from "recharts";

const Customers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  
  // Filter customers based on search
  const filteredCustomers = customerData.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.preferredService.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Calculate customer metrics
  const totalLifetimeSpend = customerData.reduce((sum, c) => sum + c.lifetimeSpend, 0);
  const avgLifetimeSpend = totalLifetimeSpend / customerData.length;
  
  // Calculate service popularity
  const servicePreferences: Record<string, number> = customerData.reduce(
    (acc, customer) => {
      acc[customer.preferredService] = (acc[customer.preferredService] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );
  
  // Format for chart
  const serviceChartData = Object.entries(servicePreferences).map(([name, value]) => ({
    name,
    value,
  }));
  
  // Handle customer selection
  const handleCustomerSelect = (customer: Customer) => {
    setSelectedCustomer(customer);
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Customer Management</h2>
            <p className="text-muted-foreground">
              Manage customer relationships and track visit history.
            </p>
          </div>
          <div className="space-x-2">
            <Button>
              <UserPlus size={18} className="mr-2" />
              Add Customer
            </Button>
            <Button variant="outline">
              <Mail size={18} className="mr-2" />
              Send Promotions
            </Button>
          </div>
        </div>

        {/* Customer Overview */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Total Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{customerData.length}</div>
              <p className="text-xs text-muted-foreground">
                {customerData.filter(c => c.nextAppointment).length} with upcoming appointments
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Average Customer Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${avgLifetimeSpend.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                Lifetime value per customer
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Total Customer Visits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {customerData.reduce((sum, c) => sum + c.totalVisits, 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Average: {(customerData.reduce((sum, c) => sum + c.totalVisits, 0) / customerData.length).toFixed(1)} per customer
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Top Service</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold whitespace-nowrap overflow-hidden text-ellipsis">
                {Object.entries(servicePreferences)
                  .sort((a, b) => b[1] - a[1])[0][0]}
              </div>
              <p className="text-xs text-muted-foreground">
                {Math.round((Object.entries(servicePreferences)
                  .sort((a, b) => b[1] - a[1])[0][1] / customerData.length) * 100)}% of customers prefer
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Customer List</CardTitle>
                  <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search customers..."
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
                      <TableHead>Customer</TableHead>
                      <TableHead>Last Visit</TableHead>
                      <TableHead>Preferred Service</TableHead>
                      <TableHead className="text-right">Total Visits</TableHead>
                      <TableHead className="text-right">Lifetime Spend</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCustomers.map((customer) => (
                      <TableRow 
                        key={customer.id} 
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => handleCustomerSelect(customer)}
                      >
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Avatar>
                              <AvatarFallback>{customer.name.split(' ')[0][0]}{customer.name.split(' ')[1][0]}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{customer.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center text-muted-foreground">
                            <Clock size={14} className="mr-1" />
                            <span>{formatDistanceToNow(new Date(customer.lastVisit), { addSuffix: true })}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {customer.preferredService}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">{customer.totalVisits}</TableCell>
                        <TableCell className="font-medium text-right">${customer.lifetimeSpend.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Customer Details</CardTitle>
                <CardDescription>
                  {selectedCustomer 
                    ? `Details for ${selectedCustomer.name}` 
                    : "Select a customer to view details"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedCustomer ? (
                  <div className="space-y-4">
                    <div className="flex flex-col items-center mb-4">
                      <Avatar className="h-20 w-20 mb-2">
                        <AvatarFallback className="text-xl">
                          {selectedCustomer.name.split(' ')[0][0]}
                          {selectedCustomer.name.split(' ')[1][0]}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="text-xl font-medium">{selectedCustomer.name}</h3>
                      <p className="text-muted-foreground text-sm">
                        Customer since {new Date(selectedCustomer.lastVisit).getFullYear()}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="space-y-1 col-span-2">
                        <p className="text-muted-foreground">Contact</p>
                        {selectedCustomer.phoneNumber && (
                          <div className="flex items-center">
                            <Phone size={14} className="mr-2 text-primary" />
                            <span>{selectedCustomer.phoneNumber}</span>
                          </div>
                        )}
                        {selectedCustomer.emailAddress && (
                          <div className="flex items-center">
                            <Mail size={14} className="mr-2 text-primary" />
                            <span>{selectedCustomer.emailAddress}</span>
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <p className="text-muted-foreground">Total Visits</p>
                        <p className="font-medium">{selectedCustomer.totalVisits}</p>
                      </div>
                      
                      <div>
                        <p className="text-muted-foreground">Lifetime Spend</p>
                        <p className="font-medium">${selectedCustomer.lifetimeSpend.toFixed(2)}</p>
                      </div>
                      
                      <div>
                        <p className="text-muted-foreground">Last Visit</p>
                        <p className="font-medium">{new Date(selectedCustomer.lastVisit).toLocaleDateString()}</p>
                      </div>
                      
                      <div>
                        <p className="text-muted-foreground">Avg. Spend</p>
                        <p className="font-medium">
                          ${(selectedCustomer.lifetimeSpend / selectedCustomer.totalVisits).toFixed(2)}
                        </p>
                      </div>
                      
                      <div className="col-span-2">
                        <p className="text-muted-foreground">Preferred Service</p>
                        <p className="font-medium">{selectedCustomer.preferredService}</p>
                      </div>
                      
                      {selectedCustomer.nextAppointment && (
                        <div className="col-span-2 mt-2">
                          <div className="flex items-center text-primary">
                            <Calendar size={14} className="mr-2" />
                            <span className="font-medium">
                              Next appointment: {new Date(selectedCustomer.nextAppointment).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="pt-4 mt-4 border-t flex space-x-2">
                      <Button className="flex-1" size="sm">
                        <Mail size={16} className="mr-1" />
                        Message
                      </Button>
                      <Button className="flex-1" variant="outline" size="sm">
                        <Calendar size={16} className="mr-1" />
                        Schedule
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
                    <UserPlus size={40} className="mb-2 opacity-20" />
                    <p>Select a customer to view details</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="insights" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="insights">Customer Insights</TabsTrigger>
            <TabsTrigger value="reminders">Automated Reminders</TabsTrigger>
          </TabsList>

          {/* Insights Tab */}
          <TabsContent value="insights" className="space-y-4 mt-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Service Preferences</CardTitle>
                  <CardDescription>Distribution of preferred services among customers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={serviceChartData}
                        layout="vertical"
                        margin={{ top: 20, right: 30, left: 80, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis 
                          type="category" 
                          dataKey="name" 
                          tick={{ fontSize: 12 }}
                          width={80}
                        />
                        <RechartsTooltip 
                          formatter={(value: number) => [`${value} customers`, 'Count']}
                        />
                        <Bar 
                          dataKey="value" 
                          fill="#9b87f5" 
                          radius={[0, 4, 4, 0]}
                          label={{ position: 'right', formatter: (value: number) => value }}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Customer Recommendations</CardTitle>
                  <CardDescription>Personalized marketing suggestions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">High-Value Customers</h3>
                      <p className="text-sm text-muted-foreground">
                        These customers represent the top 20% of your revenue. Consider a VIP program.
                      </p>
                      <div className="space-y-1">
                        {customerData
                          .sort((a, b) => b.lifetimeSpend - a.lifetimeSpend)
                          .slice(0, 2)
                          .map(customer => (
                            <div key={customer.id} className="flex justify-between text-sm">
                              <span className="font-medium">{customer.name}</span>
                              <span>${customer.lifetimeSpend} lifetime</span>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Re-engagement Needed</h3>
                      <p className="text-sm text-muted-foreground">
                        These customers haven't visited in over 45 days. Send them a special offer.
                      </p>
                      <div className="space-y-1">
                        {customerData
                          .filter(customer => {
                            const lastVisitDate = new Date(customer.lastVisit);
                            const now = new Date();
                            const diffTime = Math.abs(now.getTime() - lastVisitDate.getTime());
                            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                            return diffDays > 45 && !customer.nextAppointment;
                          })
                          .slice(0, 2)
                          .map(customer => (
                            <div key={customer.id} className="flex justify-between text-sm">
                              <span className="font-medium">{customer.name}</span>
                              <span>Last visit: {formatDistanceToNow(new Date(customer.lastVisit), { addSuffix: true })}</span>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Cross-Selling Opportunities</h3>
                      <p className="text-sm text-muted-foreground">
                        Suggest these customers try additional services based on their history.
                      </p>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">Sarah J.</span>
                          <span>Suggest: Gel Nails</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">Lisa R.</span>
                          <span>Suggest: Nail Art</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Customer Loyalty Program</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm">
                    Based on your customer data, implementing a loyalty program could increase customer retention by up to 25%.
                    Here's a recommended structure:
                  </p>
                  
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="border rounded-lg p-4 text-center">
                      <Badge variant="outline" className="mb-2">Basic</Badge>
                      <p className="text-lg font-bold mb-1">1-3 Visits</p>
                      <p className="text-sm text-muted-foreground mb-3">5% off retail products</p>
                      <div className="text-xs text-muted-foreground">
                        {customerData.filter(c => c.totalVisits >= 1 && c.totalVisits <= 3).length} customers
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4 text-center bg-primary/5">
                      <Badge className="mb-2">Silver</Badge>
                      <p className="text-lg font-bold mb-1">4-7 Visits</p>
                      <p className="text-sm text-muted-foreground mb-3">10% off all services</p>
                      <div className="text-xs text-muted-foreground">
                        {customerData.filter(c => c.totalVisits >= 4 && c.totalVisits <= 7).length} customers
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4 text-center bg-primary/10">
                      <Badge className="mb-2 bg-amber-500">Gold</Badge>
                      <p className="text-lg font-bold mb-1">8+ Visits</p>
                      <p className="text-sm text-muted-foreground mb-3">Free add-on with service</p>
                      <div className="text-xs text-muted-foreground">
                        {customerData.filter(c => c.totalVisits >= 8).length} customers
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reminders Tab */}
          <TabsContent value="reminders" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Automated Customer Reminders</CardTitle>
                <CardDescription>Scheduled notifications for your customers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Appointment Reminders</h3>
                    <div className="border rounded-lg p-4 bg-muted/20">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-sm font-medium">24 Hour Reminder</h4>
                          <p className="text-sm text-muted-foreground">
                            Automatically send SMS reminders 24 hours before appointments
                          </p>
                        </div>
                        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                          Active
                        </Badge>
                      </div>
                      <div className="border p-3 rounded bg-white">
                        <p className="text-sm">
                          Hi [NAME], this is a reminder about your appointment at Astra Nails tomorrow at 
                          [TIME]. Reply Y to confirm or call us to reschedule.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Re-engagement Campaigns</h3>
                    <div className="border rounded-lg p-4 bg-muted/20">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-sm font-medium">30 Day Follow-up</h4>
                          <p className="text-sm text-muted-foreground">
                            Email customers who haven't returned within 30 days of their last visit
                          </p>
                        </div>
                        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                          Active
                        </Badge>
                      </div>
                      <div className="border p-3 rounded bg-white">
                        <p className="text-sm">
                          Subject: We miss you, [NAME]!<br />
                          <br />
                          It's been a month since your last visit to Astra Nails, and we'd love to see you again!
                          Book your next appointment and enjoy 10% off any service.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Special Occasions</h3>
                    <div className="border rounded-lg p-4 bg-muted/20">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-sm font-medium">Birthday Offer</h4>
                          <p className="text-sm text-muted-foreground">
                            Send birthday offers to customers during their birthday month
                          </p>
                        </div>
                        <Badge variant="secondary">Not Set Up</Badge>
                      </div>
                      <div className="border p-3 rounded bg-white">
                        <p className="text-sm text-muted-foreground italic">
                          This feature requires collecting customer birthdays.<br />
                          <Button size="sm" variant="outline" className="mt-2">Set Up Birthday Reminders</Button>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Ready-to-Send Reminders</CardTitle>
                <CardDescription>Customers due for follow-up</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary p-3 rounded-sm bg-muted/20">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h3 className="text-sm font-bold">Lisa R.</h3>
                        <p className="text-sm text-muted-foreground">Last visit 30+ days ago with no upcoming appointment</p>
                      </div>
                      <Button size="sm">Send Reminder</Button>
                    </div>
                  </div>
                  
                  <div className="border-l-4 border-primary p-3 rounded-sm bg-muted/20">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h3 className="text-sm font-bold">Olivia K.</h3>
                        <p className="text-sm text-muted-foreground">Last visit 35+ days ago with no upcoming appointment</p>
                      </div>
                      <Button size="sm">Send Reminder</Button>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground py-4">
                    Automated reminders help increase rebooking rates by an average of 30% and reduce no-shows by up to 40%.
                  </p>
                  
                  <div className="flex justify-center">
                    <Button>
                      <Mail size={16} className="mr-2" />
                      Send All Reminders
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Customers;
