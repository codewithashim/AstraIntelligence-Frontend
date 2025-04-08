
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { inventoryData } from "@/data/mockData";
import { InventoryItem } from "@/types";
import { Button } from "@/components/ui/button";
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
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { AlertTriangle, FileBarChart, Package, PlusCircle, Search, ShoppingCart } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, LabelList } from "recharts";

const Inventory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter inventory data based on search
  const filteredInventory = inventoryData.filter(item =>
    item.product.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Calculate inventory metrics
  const lowStockCount = inventoryData.filter(item => 
    item.currentStock <= item.minimumThreshold
  ).length;
  
  const totalInventoryValue = inventoryData.reduce(
    (sum, item) => sum + (item.currentStock * item.costPerUnit), 0
  );
  
  // Prepare chart data
  const chartData = inventoryData.map(item => ({
    name: item.product,
    stock: item.currentStock,
    threshold: item.minimumThreshold,
    fill: item.currentStock <= item.minimumThreshold 
      ? "#e11d48" // red for low stock
      : "#9b87f5" // purple for normal stock
  }));

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Inventory Management</h2>
            <p className="text-muted-foreground">
              Track, update and analyze your salon's inventory.
            </p>
          </div>
          <div className="space-x-2">
            <Button>
              <PlusCircle size={18} className="mr-2" />
              Add Product
            </Button>
            <Button variant="outline">
              <FileBarChart size={18} className="mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Inventory Overview */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Total Inventory Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalInventoryValue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Across {inventoryData.length} items</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Low Stock Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center">
                {lowStockCount}
                {lowStockCount > 0 && (
                  <AlertTriangle size={20} className="ml-2 text-destructive" />
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {lowStockCount === 0 
                  ? "All items adequately stocked" 
                  : `${lowStockCount} items need reordering`}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Reorder Recommendation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${inventoryData
                  .filter(item => item.currentStock <= item.minimumThreshold)
                  .reduce((sum, item) => {
                    const orderAmount = Math.max(0, (item.minimumThreshold * 2) - item.currentStock);
                    return sum + (orderAmount * item.costPerUnit);
                  }, 0).toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">Estimated restock cost</p>
            </CardContent>
          </Card>
        </div>

        {/* Inventory Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Stock Levels</CardTitle>
            <CardDescription>Current inventory compared to minimum thresholds</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  layout="vertical"
                  margin={{ top: 10, right: 30, left: 80, bottom: 10 }}
                >
                  <XAxis type="number" />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    tick={{ fontSize: 12 }} 
                    width={80}
                  />
                  <Tooltip 
                    formatter={(value: number, name: string) => [
                      value, 
                      name === 'stock' ? 'Current Stock' : 'Minimum Threshold'
                    ]}
                  />
                  <Bar dataKey="stock" fill="#9b87f5" radius={[0, 4, 4, 0]}>
                    <LabelList dataKey="stock" position="right" />
                  </Bar>
                  <Bar dataKey="threshold" fill="#FFDEE2" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Inventory Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Inventory List</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
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
                  <TableHead>Product</TableHead>
                  <TableHead className="text-right">Current Stock</TableHead>
                  <TableHead className="text-right">Min. Threshold</TableHead>
                  <TableHead className="text-right">Cost Per Unit</TableHead>
                  <TableHead className="text-right">Total Value</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Restocked</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInventory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.product}</TableCell>
                    <TableCell className="text-right">{item.currentStock}</TableCell>
                    <TableCell className="text-right">{item.minimumThreshold}</TableCell>
                    <TableCell className="text-right">${item.costPerUnit.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      ${(item.currentStock * item.costPerUnit).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      {item.currentStock <= item.minimumThreshold ? (
                        <Badge variant="destructive" className="flex w-fit items-center gap-1">
                          <AlertTriangle size={12} />
                          Low Stock
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 flex w-fit items-center gap-1">
                          In Stock
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>{item.lastRestocked}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        {/* Action Recommendations */}
        {lowStockCount > 0 && (
          <Card className="border-destructive/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <ShoppingCart size={18} className="mr-2" />
                Reorder Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1">
                {inventoryData
                  .filter(item => item.currentStock <= item.minimumThreshold)
                  .map(item => (
                    <li key={`reorder-${item.id}`} className="text-sm flex justify-between">
                      <span>
                        <span className="font-medium">{item.product}</span>
                        <span className="text-muted-foreground ml-2">
                          (Currently {item.currentStock}/{item.minimumThreshold})
                        </span>
                      </span>
                      <span>
                        Order <span className="font-medium">{Math.max(0, (item.minimumThreshold * 2) - item.currentStock)} units</span>
                      </span>
                    </li>
                  ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Inventory;
