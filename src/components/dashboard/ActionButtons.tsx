
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileOutput, Calendar, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface ActionButtonProps {
  actionType: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ actionType }) => {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);

  // Define button properties based on actionType
  const getButtonProps = () => {
    switch (actionType) {
      case "Add Product":
        return {
          icon: <PlusCircle className="mr-2 h-4 w-4" />,
          color: "bg-blue-500 hover:bg-blue-600",
          title: "Add Product",
          description: "Add a new product to your inventory",
          action: () => {
            toast({
              title: "Product Added",
              description: "New product has been added to inventory",
            });
            setOpen(false);
          },
        };
      case "Export":
        return {
          icon: <FileOutput className="mr-2 h-4 w-4" />,
          color: "bg-green-500 hover:bg-green-600",
          title: "Export",
          description: "Export your inventory data",
          action: () => {
            toast({
              title: "Export Started",
              description: "Your export is being processed",
            });
            setOpen(false);
          },
        };
      case "Add Employee":
        return {
          icon: <PlusCircle className="mr-2 h-4 w-4" />,
          color: "bg-purple-500 hover:bg-purple-600",
          title: "Add Employee",
          description: "Add a new employee to your team",
          action: () => {
            toast({
              title: "Employee Added",
              description: "New employee has been added",
            });
            setOpen(false);
          },
        };
      case "Export Payroll":
        return {
          icon: <FileOutput className="mr-2 h-4 w-4" />,
          color: "bg-amber-500 hover:bg-amber-600",
          title: "Export Payroll",
          description: "Export your payroll data",
          action: () => {
            toast({
              title: "Payroll Export Started",
              description: "Your payroll export is being processed",
            });
            setOpen(false);
          },
        };
      case "Export Report":
        return {
          icon: <Calendar className="mr-2 h-4 w-4" />,
          color: "bg-cyan-500 hover:bg-cyan-600",
          title: "Export Report",
          description: "Export reports for a specific date range",
          action: () => {
            toast({
              title: "Report Export Started",
              description: "Your report export is being processed",
            });
            setOpen(false);
          },
        };
      case "Export Insights":
        return {
          icon: <Calendar className="mr-2 h-4 w-4" />,
          color: "bg-indigo-500 hover:bg-indigo-600",
          title: "Export Insights",
          description: "Export analytics insights for a specific date range",
          action: () => {
            toast({
              title: "Insights Export Started",
              description: "Your insights export is being processed",
            });
            setOpen(false);
          },
        };
      case "Add Customer":
        return {
          icon: <PlusCircle className="mr-2 h-4 w-4" />,
          color: "bg-pink-500 hover:bg-pink-600",
          title: "Add Customer",
          description: "Add a new customer to your database",
          action: () => {
            toast({
              title: "Customer Added",
              description: "New customer has been added to database",
            });
            setOpen(false);
          },
        };
      case "Send Promotions":
        return {
          icon: <Send className="mr-2 h-4 w-4" />,
          color: "bg-orange-500 hover:bg-orange-600",
          title: "Send Promotions",
          description: "Send promotional messages to your customers",
          action: () => {
            toast({
              title: "Promotions Sent",
              description: "Promotional messages have been sent to your customers",
            });
            setOpen(false);
          },
        };
      default:
        return {
          icon: <PlusCircle className="mr-2 h-4 w-4" />,
          color: "bg-gray-500 hover:bg-gray-600",
          title: actionType,
          description: `Perform ${actionType} action`,
          action: () => {
            toast({
              title: "Action Performed",
              description: `${actionType} action has been performed`,
            });
            setOpen(false);
          },
        };
    }
  };

  const { icon, color, title, description, action } = getButtonProps();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className={`${color} text-white`}
          size="sm"
        >
          {icon}
          {title}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* This is a placeholder for the form fields that would be specific to each action */}
          <p className="text-sm text-gray-500">
            Form fields would go here for the {title.toLowerCase()} action.
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={action}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ActionButton;
