
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ActionButton from "@/components/dashboard/ActionButtons";

const Customers = () => {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Customer Management</h2>
            <p className="text-muted-foreground">
              Manage your customer relationships and communications.
            </p>
          </div>
          <div className="space-x-2">
            <ActionButton actionType="Add Customer" />
            <ActionButton actionType="Send Promotions" />
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Customer List</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Customer content would go here...</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Customers;
