
import React from "react";
import ActionButton from "./ActionButtons";

const ActionPanel: React.FC = () => {
  // Define action buttons for each category
  const inventoryActions = ["Add Product", "Export"];
  const employeeActions = ["Add Employee", "Export Payroll"];
  const financeActions = ["Export Report"];
  const analyticsActions = ["Export Insights"];
  const customerActions = ["Add Customer", "Send Promotions"];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-8">
      <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Inventory</h3>
          <div className="flex flex-wrap gap-2">
            {inventoryActions.map(action => (
              <ActionButton key={action} actionType={action} />
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Employees</h3>
          <div className="flex flex-wrap gap-2">
            {employeeActions.map(action => (
              <ActionButton key={action} actionType={action} />
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Finance</h3>
          <div className="flex flex-wrap gap-2">
            {financeActions.map(action => (
              <ActionButton key={action} actionType={action} />
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Analytics</h3>
          <div className="flex flex-wrap gap-2">
            {analyticsActions.map(action => (
              <ActionButton key={action} actionType={action} />
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Customers</h3>
          <div className="flex flex-wrap gap-2">
            {customerActions.map(action => (
              <ActionButton key={action} actionType={action} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionPanel;
