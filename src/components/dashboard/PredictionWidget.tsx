
import { Prediction, MarketTrend } from "@/types";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { TrendingUp, CalendarClock, AlertCircle } from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  ResponsiveContainer, 
  Tooltip as RechartsTooltip 
} from "recharts";
import { Badge } from "@/components/ui/badge";

interface PredictionWidgetProps {
  predictions: Prediction[];
  marketTrends: MarketTrend[];
}

const PredictionWidget: React.FC<PredictionWidgetProps> = ({ predictions, marketTrends }) => {
  // Format data for the chart
  const chartData = predictions.map(pred => ({
    name: new Date(pred.date).toLocaleDateString(undefined, { weekday: 'short' }),
    revenue: pred.predictedRevenue,
    customers: pred.predictedCustomers,
    busy: pred.busyFactor,
  }));

  // Get the top market trend
  const topTrend = [...marketTrends].sort((a, b) => b.popularity - a.popularity)[0];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Business Forecast</CardTitle>
        <CardDescription>Predicted revenue for the next 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-32 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
              <Bar 
                dataKey="revenue" 
                fill="hsl(var(--primary))" 
                radius={[4, 4, 0, 0]} 
                barSize={20} 
              />
              <RechartsTooltip
                cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                formatter={(value: number, name: string) => [`$${value}`, name === 'revenue' ? 'Predicted Revenue' : name]}
                labelFormatter={(label: string) => `${label}`}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <CalendarClock size={16} className="mr-2 text-primary" />
            <span className="text-sm font-medium">Upcoming Busy Days</span>
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
          {predictions
            .filter(p => p.busyFactor === 'High')
            .slice(0, 2)
            .map(p => (
              <div key={p.date} className="flex items-center justify-between text-sm">
                <div>{new Date(p.date).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}</div>
                <Badge 
                  variant={p.busyFactor === 'High' ? 'default' : p.busyFactor === 'Medium' ? 'outline' : 'secondary'}
                  className="flex items-center"
                >
                  <TrendingUp size={12} className="mr-1" />
                  {p.busyFactor} - {p.predictedCustomers} customers
                </Badge>
              </div>
            ))}
        </div>
        
        <div className="flex flex-col space-y-1 mt-2 pt-2 border-t">
          <div className="flex items-center text-sm">
            <AlertCircle size={15} className="text-primary mr-2" />
            <span className="font-medium">Trending: {topTrend.trend}</span>
          </div>
          <p className="text-xs text-muted-foreground pl-6">{topTrend.description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictionWidget;
