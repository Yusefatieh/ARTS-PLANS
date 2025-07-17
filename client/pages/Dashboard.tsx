import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  FileText,
  Users,
  Settings,
  TrendingUp,
  DollarSign,
  Download,
  Eye,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  MoreHorizontal,
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data
  const stats = {
    totalProducts: 15247,
    totalSales: 89650,
    totalUsers: 25680,
    totalDownloads: 125000,
    monthlyRevenue: 45230,
    conversionRate: 3.2,
  };

  const salesData = [
    { month: "Jan", sales: 4000, revenue: 2400 },
    { month: "Feb", sales: 3000, revenue: 1398 },
    { month: "Mar", sales: 2000, revenue: 9800 },
    { month: "Apr", sales: 2780, revenue: 3908 },
    { month: "May", sales: 1890, revenue: 4800 },
    { month: "Jun", sales: 2390, revenue: 3800 },
  ];

  const categoryData = [
    { name: "Floor Plans", value: 35, color: "#8884d8" },
    { name: "3D Models", value: 25, color: "#82ca9d" },
    { name: "Furniture", value: 20, color: "#ffc658" },
    { name: "Textures", value: 15, color: "#ff7c7c" },
    { name: "Others", value: 5, color: "#8dd1e1" },
  ];

  const recentProducts = [
    {
      id: 1,
      name: "Modern Villa Floor Plan",
      category: "Floor Plans",
      price: 25,
      downloads: 234,
      status: "active",
      dateAdded: "2024-01-15",
    },
    {
      id: 2,
      name: "Luxury Kitchen 3D Model",
      category: "3D Models",
      price: 45,
      downloads: 156,
      status: "pending",
      dateAdded: "2024-01-14",
    },
    {
      id: 3,
      name: "Scandinavian Living Room",
      category: "Furniture",
      price: 35,
      downloads: 89,
      status: "active",
      dateAdded: "2024-01-13",
    },
    {
      id: 4,
      name: "Wood Texture Pack",
      category: "Textures",
      price: 15,
      downloads: 445,
      status: "active",
      dateAdded: "2024-01-12",
    },
    {
      id: 5,
      name: "Office Layout Design",
      category: "Floor Plans",
      price: 30,
      downloads: 78,
      status: "inactive",
      dateAdded: "2024-01-11",
    },
  ];

  const recentUsers = [
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      role: "Customer",
      joinDate: "2024-01-15",
      purchases: 5,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      role: "Engineer",
      joinDate: "2024-01-14",
      uploads: 12,
    },
    {
      id: 3,
      name: "Mike Chen",
      email: "mike@example.com",
      role: "Student",
      joinDate: "2024-01-13",
      courses: 3,
    },
  ];

  const sidebarItems = [
    {
      id: "overview",
      name: "Overview",
      icon: LayoutDashboard,
      href: "/dashboard",
    },
    {
      id: "products",
      name: "Products",
      icon: Package,
      href: "/dashboard/products",
    },
    {
      id: "categories",
      name: "Categories",
      icon: FolderTree,
      href: "/dashboard/categories",
    },
    {
      id: "content",
      name: "Content",
      icon: FileText,
      href: "/dashboard/content",
    },
    {
      id: "users",
      name: "Users",
      icon: Users,
      href: "/dashboard/users",
    },
    {
      id: "settings",
      name: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white h-screen sticky top-16 border-r border-gray-200">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Admin Dashboard
            </h2>
            <nav className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      if (item.href !== "/dashboard") {
                        navigate(item.href);
                      }
                    }}
                    className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === item.id
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Dashboard Overview
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Welcome back! Here's what's happening with your platform.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={() => navigate("/dashboard/products/new")}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate("/dashboard/categories/new")}
                  >
                    <FolderTree className="w-4 h-4 mr-2" />
                    Add Category
                  </Button>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Products
                    </CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {stats.totalProducts.toLocaleString()}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-600">+12%</span> from last
                      month
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Revenue
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      ${stats.monthlyRevenue.toLocaleString()}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-600">+8%</span> from last
                      month
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Users
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {stats.totalUsers.toLocaleString()}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-600">+15%</span> from last
                      month
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Downloads
                    </CardTitle>
                    <Download className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {stats.totalDownloads.toLocaleString()}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-600">+23%</span> from last
                      month
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Sales & Revenue Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="sales"
                          stroke="#8884d8"
                          strokeWidth={2}
                        />
                        <Line
                          type="monotone"
                          dataKey="revenue"
                          stroke="#82ca9d"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Products by Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) =>
                            `${name} ${(percent * 100).toFixed(0)}%`
                          }
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Recent Products</CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate("/dashboard/products")}
                    >
                      View All
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentProducts.map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">
                              {product.name}
                            </h4>
                            <p className="text-xs text-gray-600">
                              {product.category} • ${product.price} •{" "}
                              {product.downloads} downloads
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={
                                product.status === "active"
                                  ? "default"
                                  : product.status === "pending"
                                    ? "secondary"
                                    : "destructive"
                              }
                              className="text-xs"
                            >
                              {product.status}
                            </Badge>
                            <Button size="sm" variant="ghost">
                              <Edit className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Recent Users</CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate("/dashboard/users")}
                    >
                      View All
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentUsers.map((user) => (
                        <div
                          key={user.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-xs font-medium text-blue-600">
                                {user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </span>
                            </div>
                            <div>
                              <h4 className="font-medium text-sm">
                                {user.name}
                              </h4>
                              <p className="text-xs text-gray-600">
                                {user.email} • {user.role}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-600">
                              {user.joinDate}
                            </p>
                            <p className="text-xs text-gray-500">
                              {user.purchases
                                ? `${user.purchases} purchases`
                                : user.uploads
                                  ? `${user.uploads} uploads`
                                  : `${user.courses} courses`}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
