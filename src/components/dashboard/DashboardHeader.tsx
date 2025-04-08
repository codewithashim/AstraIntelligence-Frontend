
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendItem } from "@/types";
import { ArrowUpIcon, ArrowDownIcon, MinusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardHeaderProps {
  trends: TrendItem[];
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ trends }) => {
  const getTrendIcon = (trend: "up" | "down" | "flat") => {
    switch (trend) {
      case "up":
        return <ArrowUpIcon className="h-4 w-4 text-emerald-500" />;
      case "down":
        return <ArrowDownIcon className="h-4 w-4 text-destructive" />;
      default:
        return <MinusIcon className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getTrendColor = (trend: "up" | "down" | "flat") => {
    switch (trend) {
      case "up":
        return "text-emerald-500";
      case "down":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Your nail salon analytics and management overview.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {trends.map((item, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.name}</CardTitle>
              {getTrendIcon(item.trend)}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {item.name === "Revenue" || item.name === "Profit" 
                  ? `$${item.value.toLocaleString()}` 
                  : item.value}
              </div>
              <p className={cn("text-xs font-medium flex items-center", getTrendColor(item.trend))}>
                {item.trend !== "flat" && (item.trend === "up" ? "+" : "-")}
                {item.percentage.toFixed(1)}% from previous period
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardHeader;
