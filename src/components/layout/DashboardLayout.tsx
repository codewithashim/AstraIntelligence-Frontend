
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Package,
  Users,
  DollarSign,
  TrendingUp,
  UserRound,
  Menu,
  X,
  Bell,
  Mail,
  Search,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { toast } = useToast();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  console.log("🚀 ~ user =========>:", user)

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: Package, label: "Inventory", path: "/inventory" },
    { icon: Users, label: "Employees", path: "/employees" },
    { icon: DollarSign, label: "Finances", path: "/finances" },
    { icon: TrendingUp, label: "Analytics", path: "/analytics" },
    { icon: UserRound, label: "Customers", path: "/customers" },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleNotificationClick = () => {
    toast({
      title: "New notifications",
      description: "You have 3 unread notifications",
    });
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-sidebar fixed inset-y-0 left-0 z-20 flex flex-col border-r transition-all duration-300",
          isSidebarOpen ? "w-64" : "w-16"
        )}
      >
        <div className="flex items-center p-4 h-16 border-b">
          {isSidebarOpen ? (
            <h1 className="text-xl font-semibold text-sidebar-foreground">Astra Nails</h1>
          ) : null}
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        <div className="flex flex-col flex-grow px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <TooltipProvider key={item.path} delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to={item.path}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start py-2",
                        !isSidebarOpen && "justify-center p-2"
                      )}
                    >
                      <item.icon
                        size={20}
                        className={isSidebarOpen ? "mr-3" : ""}
                      />
                      {isSidebarOpen && <span>{item.label}</span>}
                    </Button>
                  </Link>
                </TooltipTrigger>
                {!isSidebarOpen && (
                  <TooltipContent side="right">
                    {item.label}
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </aside>

      {/* Main content */}
      <div
        className={cn(
          "flex-grow flex flex-col transition-all duration-300",
          isSidebarOpen ? "ml-64" : "ml-16"
        )}
      >
        {/* Header */}
        <header className="h-16 px-6 border-b flex items-center justify-between bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10 sticky top-0">
          <div className="flex items-center w-full max-w-md">
            <Search size={18} className="text-muted-foreground absolute ml-3" />
            <Input
              className="pl-10 bg-muted/40"
              placeholder="Search..."
            />
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNotificationClick}
            >
              <Bell size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <Mail size={20} />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="https://i.pravatar.cc/100?img=36" />
                  <AvatarFallback>{user?.name?.substring(0, 2).toUpperCase() || 'UN'}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user?.name || 'User'}</DropdownMenuLabel>
                <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">{user?.email || ''}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-grow p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
