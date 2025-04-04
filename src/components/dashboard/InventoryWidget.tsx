
import { InventoryItem } from "@/types";
import { Badge } from "@/components/ui/badge";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ShoppingCart, AlertTriangle } from "lucide-react";

interface InventoryWidgetProps {
  inventoryItems: InventoryItem[];
}

const InventoryWidget: React.FC<InventoryWidgetProps> = ({ inventoryItems }) => {
  const lowStockItems = inventoryItems.filter(
    item => item.currentStock <= item.minimumThreshold
  );
  
  const calculateStockPercentage = (current: number, threshold: number) => {
    // We'll calculate based on having 3x the minimum threshold as "full stock"
    const target = threshold * 3;
    const percentage = Math.min((current / target) * 100, 100);
    return Math.round(percentage);
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">Inventory Status</CardTitle>
          {lowStockItems.length > 0 && (
            <Badge variant="destructive" className="flex items-center gap-1">
              <AlertTriangle size={14} /> Low Stock Alert
            </Badge>
          )}
        </div>
        <CardDescription>
          {lowStockItems.length === 0 
            ? "All inventory items are adequately stocked" 
            : `${lowStockItems.length} items below minimum threshold`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {inventoryItems.slice(0, 4).map(item => (
            <div key={item.id} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <div className="font-medium flex items-center">
                  {item.currentStock <= item.minimumThreshold && (
                    <AlertTriangle size={14} className="text-destructive mr-1" />
                  )}
                  {item.product}
                </div>
                <div className="text-muted-foreground">
                  {item.currentStock} / {item.minimumThreshold} min
                </div>
              </div>
              <Progress 
                value={calculateStockPercentage(item.currentStock, item.minimumThreshold)}
                className={`${item.currentStock <= item.minimumThreshold ? "bg-muted/50" : ""} 
                  ${item.currentStock <= item.minimumThreshold 
                    ? "data-[value]:bg-destructive" 
                    : item.currentStock <= item.minimumThreshold * 1.5 
                      ? "data-[value]:bg-amber-500" 
                      : "data-[value]:bg-emerald-600"
                  }`}
              />
            </div>
          ))}
        </div>
        {lowStockItems.length > 0 && (
          <div className="mt-4 flex justify-center">
            <Badge variant="outline" className="flex items-center gap-1">
              <ShoppingCart size={14} /> Reordering recommended
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InventoryWidget;
