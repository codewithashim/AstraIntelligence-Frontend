import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
  predictionsData, 
  marketTrendsData,
  revenueData,
  customerData
} from "@/data/mockData";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import ActionButton from "@/components/dashboard/ActionButtons";
import { 
  TrendingUp, 
  Calendar, 
  UserRound,
  CalendarClock,
  Sparkles,
  BarChart as BarChartIcon,
  CircleDashed,
  ArrowUpRight,
  FileBarChart,
  AlertCircle
} from "lucide-react";
import { 
  LineChart, 
  Line,
  BarChart,
  Bar,
  XAxis, 
  YAxis,
  CartesianGrid,
  ResponsiveContainer, 
  Tooltip as RechartsTooltip
} from "recharts";

const Analytics = () => {
  // Format data for the forecast chart
  const forecastChartData = predictionsData.map(pred => ({
    name: new Date(pred.date).toLocaleDateString(undefined, { weekday: 'short' }),
    revenue: pred.predictedRevenue,
    customers: pred.predictedCustomers,
  }));
  
  // Find the busiest predicted day
  const busiestDay = [...predictionsData].sort((a, b) => 
    b.predictedCustomers - a.predictedCustomers
  )[0];
  
  // Sort market trends by popularity
  const sortedTrends = [...marketTrendsData].sort((a, b) => 
    b.popularity - a.popularity
  );

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Predictive Analytics</h2>
            <p className="text-muted-foreground">
              AI-powered insights and forecasts for your salon.
            </p>
          </div>
          <div className="space-x-2">
            <Button>
              <Calendar size={18} className="mr-2" />
              Date Range
            </Button>
            <ActionButton actionType="Export Insights" />
          </div>
        </div>

        <Tabs defaultValue="forecast" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="forecast">Revenue Forecast</TabsTrigger>
            <TabsTrigger value="trends">Market Trends</TabsTrigger>
            <TabsTrigger value="customers">Customer Insights</TabsTrigger>
          </TabsList>

          {/* Forecast Tab */}
          <TabsContent value="forecast" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Revenue Forecast</CardTitle>
                <CardDescription>
                  AI-powered prediction of revenue and customer volume
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={forecastChartData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <RechartsTooltip 
                        formatter={(value: number, name: string) => [
                          name === 'revenue' ? `$${value}` : value,
                          name === 'revenue' ? 'Predicted Revenue' : 'Predicted Customers'
                        ]}
                      />
                      <Line 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#9b87f5" 
                        strokeWidth={2}
                        name="revenue"
                        dot={{ r: 5 }}
                        activeDot={{ r: 7 }}
                      />
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="customers" 
                        stroke="#FFDEE2" 
                        strokeWidth={2}
                        name="customers"
                        dot={{ r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center">
                    <TrendingUp size={16} className="mr-1 text-primary" />
                    Projected Weekly Revenue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${predictionsData.reduce((sum, p) => sum + p.predictedRevenue, 0).toFixed(2)}
                  </div>
                  <p className="text-xs text-emerald-600 font-medium flex items-center">
                    <ArrowUpRight size={14} className="mr-1" />
                    12.5% increase from current week
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center">
                    <UserRound size={16} className="mr-1 text-primary" />
                    Projected Customer Visits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {predictionsData.reduce((sum, p) => sum + p.predictedCustomers, 0)}
                  </div>
                  <p className="text-xs text-emerald-600 font-medium flex items-center">
                    <ArrowUpRight size={14} className="mr-1" />
                    8.3% increase from current week
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center">
                    <CalendarClock size={16} className="mr-1 text-primary" />
                    Busiest Forecasted Day
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {new Date(busiestDay.date).toLocaleDateString(undefined, { weekday: 'long' })}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {busiestDay.predictedCustomers} customers, ${busiestDay.predictedRevenue} revenue
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Sparkles size={18} className="mr-2 text-primary" />
                  Strategic Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Staff Scheduling</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Based on forecasted customer volume, we recommend the following staffing levels:
                    </p>
                    <div className="space-y-2">
                      {predictionsData.map(day => (
                        <div key={day.date} className="grid grid-cols-2 gap-2 items-center">
                          <div className="text-sm">
                            {new Date(day.date).toLocaleDateString(undefined, { weekday: 'long' })}
                            <Badge 
                              className="ml-2"
                              variant={day.busyFactor === 'High' ? 'default' : day.busyFactor === 'Medium' ? 'outline' : 'secondary'}
                            >
                              {day.busyFactor}
                            </Badge>
                          </div>
                          <div className="text-sm">
                            {day.busyFactor === 'High' ? '4 staff members' : 
                             day.busyFactor === 'Medium' ? '3 staff members' : '2 staff members'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Pricing Optimization</h3>
                    <ul className="text-sm space-y-1 list-disc pl-5">
                      <li>Consider a 5% price increase for Acrylic Set services based on high demand</li>
                      <li>Offer a 10% discount for mid-week appointments to smooth customer flow</li>
                      <li>Create service bundles combining Gel Nails with retail products to increase average transaction value</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Market Trends Tab */}
          <TabsContent value="trends" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Market Trend Analysis</CardTitle>
                <CardDescription>
                  Real-time insights on trending nail services and products
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {sortedTrends.map((trend, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Badge variant={index === 0 ? "default" : "outline"}>
                            {index === 0 ? "Top Trend" : `#${index + 1}`}
                          </Badge>
                          <h3 className="text-lg font-medium">{trend.trend}</h3>
                        </div>
                        <span className="text-sm font-medium">
                          {trend.popularity}% popularity
                        </span>
                      </div>
                      <Progress 
                        value={trend.popularity} 
                        className="h-2" 
                      />
                      <p className="text-sm text-muted-foreground">{trend.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Implementation Recommendations</CardTitle>
                  <CardDescription>How to capitalize on current trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-4 border-primary rounded pl-4 py-2 bg-primary/5">
                      <h3 className="text-sm font-bold mb-1">Add Chrome Nails to your service menu</h3>
                      <p className="text-sm text-muted-foreground">
                        With 95% popularity rating, this could increase revenue by an estimated 15%.
                      </p>
                    </div>
                    <div className="border-l-4 border-primary rounded pl-4 py-2 bg-primary/5">
                      <h3 className="text-sm font-bold mb-1">Stock eco-friendly polish options</h3>
                      <p className="text-sm text-muted-foreground">
                        Feature them prominently and highlight their benefits to appeal to environmentally conscious customers.
                      </p>
                    </div>
                    <div className="border-l-4 border-primary rounded pl-4 py-2 bg-primary/5">
                      <h3 className="text-sm font-bold mb-1">Create nail care bundles</h3>
                      <p className="text-sm text-muted-foreground">
                        Sell take-home maintenance kits that complement your in-salon services to boost retail revenue.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Social Media Impact</CardTitle>
                  <CardDescription>Trending hashtags and social engagement</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge className="bg-pink-100 text-pink-800 hover:bg-pink-200">#ChromeNails</Badge>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200">#EcoFriendlyBeauty</Badge>
                      <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">#MinimalistNailArt</Badge>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">#GelExtensions</Badge>
                      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">#NailCare</Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Marketing Recommendations</h3>
                      <ul className="text-sm space-y-2 list-disc pl-5">
                        <li>Create social media posts featuring chrome nail designs</li>
                        <li>Highlight your eco-friendly polish options</li>
                        <li>Share minimalist nail designs for Instagram and TikTok</li>
                        <li>Record tutorials for at-home nail maintenance between visits</li>
                      </ul>
                    </div>
                    
                    <Button className="w-full mt-4">
                      <BarChartIcon size={16} className="mr-2" />
                      Generate Social Media Calendar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <AlertCircle size={18} className="mr-2 text-amber-500" />
                  Competitive Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  Based on local market analysis, here's how your salon compares to competitors in trending services:
                </p>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Chrome nails availability</span>
                      <span className="text-amber-600">Behind competitors</span>
                    </div>
                    <Progress value={30} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Eco-friendly products</span>
                      <span className="text-emerald-600">Ahead of competitors</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Minimalist designs</span>
                      <span>On par with market</span>
                    </div>
                    <Progress value={50} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Gel extensions</span>
                      <span className="text-amber-600">Behind competitors</span>
                    </div>
                    <Progress value={40} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Customer Insights Tab */}
          <TabsContent value="customers" className="space-y-4 mt-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Segmentation</CardTitle>
                  <CardDescription>Insights into your customer base</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { name: "Regulars", value: 65, color: "#9b87f5" },
                          { name: "Occasional", value: 25, color: "#7E69AB" },
                          { name: "First-time", value: 10, color: "#E5DEFF" },
                        ]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <RechartsTooltip 
                          formatter={(value: number) => [`${value}%`, 'Percentage']}
                        />
                        <Bar 
                          dataKey="value" 
                          radius={[4, 4, 0, 0]} 
                          fill="#9b87f5"
                          label={{ position: 'top', formatter: (value: number) => `${value}%` }}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Service Preferences</CardTitle>
                  <CardDescription>Most requested services by customer segment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { 
                            name: "Gel Nails", 
                            regular: 40, 
                            occasional: 30, 
                            new: 25 
                          },
                          { 
                            name: "Acrylics", 
                            regular: 25, 
                            occasional: 15, 
                            new: 30 
                          },
                          { 
                            name: "Mani & Pedi", 
                            regular: 20, 
                            occasional: 40, 
                            new: 25 
                          },
                          { 
                            name: "Nail Art", 
                            regular: 15, 
                            occasional: 15, 
                            new: 20 
                          },
                        ]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <RechartsTooltip />
                        <Bar dataKey="regular" name="Regular Customers" stackId="a" fill="#9b87f5" />
                        <Bar dataKey="occasional" name="Occasional Customers" stackId="a" fill="#7E69AB" />
                        <Bar dataKey="new" name="New Customers" stackId="a" fill="#E5DEFF" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Personalized Customer Promotions</CardTitle>
                <CardDescription>AI-generated promotional recommendations based on customer history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {customerData.slice(0, 4).map(customer => (
                    <div key={customer.id} className="border rounded-md p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium">{customer.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {customer.totalVisits} visits · ${customer.lifetimeSpend} lifetime value
                          </p>
                        </div>
                        <Badge variant="outline" className="ml-2">
                          {customer.preferredService}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CircleDashed size={16} className="text-primary" />
                          <span className="text-sm">Last visit: {new Date(customer.lastVisit).toLocaleDateString()}</span>
                        </div>
                        
                        <div className="border-l-4 border-primary pl-3 py-1">
                          <h4 className="text-sm font-medium">Recommended Offer</h4>
                          {customer.preferredService === "Acrylic Set" ? (
                            <p className="text-sm text-muted-foreground">Free nail art with next acrylic set</p>
                          ) : customer.preferredService === "Gel Nails" ? (
                            <p className="text-sm text-muted-foreground">15% off gel nail add-on services</p>
                          ) : customer.preferredService === "Manicure & Pedicure" ? (
                            <p className="text-sm text-muted-foreground">Free paraffin treatment with next mani-pedi</p>
                          ) : (
                            <p className="text-sm text-muted-foreground">10% off next service</p>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <CalendarClock size={16} className="text-primary" />
                          <span className="text-sm">
                            {customer.nextAppointment ? (
                              <>Next appointment: {new Date(customer.nextAppointment).toLocaleDateString()}</>
                            ) : (
                              <>Send appointment reminder (last visit over {
                                Math.floor((new Date().getTime() - new Date(customer.lastVisit).getTime()) / (1000 * 3600 * 24))
                              } days ago)</>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Retention Strategy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="border rounded-md p-3 bg-green-50">
                      <h3 className="text-sm font-medium text-green-800 mb-1">Customer Loyalty Program</h3>
                      <p className="text-xs text-green-700">
                        Implement a points system: 1 point per $1 spent, redeemable for discounts
                      </p>
                    </div>
                    
                    <div className="border rounded-md p-3 bg-blue-50">
                      <h3 className="text-sm font-medium text-blue-800 mb-1">Automated Reminders</h3>
                      <p className="text-xs text-blue-700">
                        Send SMS reminders 4 weeks after last visit for customers without appointments
                      </p>
                    </div>
                    
                    <div className="border rounded-md p-3 bg-purple-50">
                      <h3 className="text-sm font-medium text-purple-800 mb-1">Birthday Promotions</h3>
                      <p className="text-xs text-purple-700">
                        Offer a complimentary add-on service during the customer's birthday month
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-1">Recommended Implementation</h3>
                    <p className="text-sm">
                      Based on customer data analysis, implementing these three retention strategies could increase repeat
                      business by an estimated 24% and boost average customer lifetime value by 30%.
                    </p>
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

export default Analytics;
