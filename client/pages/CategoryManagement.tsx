import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FolderTree,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  Search,
  FileText,
  Package,
  Home,
  Utensils,
  Bed,
  Bath,
  Sofa,
  Lightbulb,
  Car,
  Building,
  Trees,
  Palette,
  Ruler,
  TrendingUp,
  Users,
  Eye,
} from "lucide-react";

export default function CategoryManagement() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);

  // Mock categories data
  const categories = [
    {
      id: 1,
      name: "Floor Plans",
      slug: "floor-plans",
      description:
        "Complete architectural floor plans for all types of buildings",
      icon: "FileText",
      color: "blue",
      parentId: null,
      productCount: 15247,
      downloads: 125000,
      revenue: 25680,
      status: "active",
      featured: true,
      dateCreated: "2024-01-01",
      lastModified: "2024-01-20",
      subcategories: [
        "Residential",
        "Commercial",
        "Industrial",
        "Apartment",
        "Villa",
        "Office",
      ],
    },
    {
      id: 2,
      name: "3D Models",
      slug: "3d-models",
      description:
        "Three-dimensional models for furniture and architectural elements",
      icon: "Package",
      color: "green",
      parentId: null,
      productCount: 8567,
      downloads: 89000,
      revenue: 45230,
      status: "active",
      featured: true,
      dateCreated: "2024-01-01",
      lastModified: "2024-01-18",
      subcategories: [
        "Furniture",
        "Lighting",
        "Appliances",
        "Decorative",
        "Architectural",
        "Electronics",
      ],
    },
    {
      id: 3,
      name: "Furniture",
      slug: "furniture",
      description: "Individual furniture pieces and complete room sets",
      icon: "Sofa",
      color: "purple",
      parentId: null,
      productCount: 12134,
      downloads: 67890,
      revenue: 32450,
      status: "active",
      featured: false,
      dateCreated: "2024-01-01",
      lastModified: "2024-01-15",
      subcategories: [
        "Seating",
        "Tables",
        "Storage",
        "Beds",
        "Desks",
        "Cabinets",
      ],
    },
    {
      id: 4,
      name: "Textures",
      slug: "textures",
      description: "Material textures and surface finishes",
      icon: "Palette",
      color: "orange",
      parentId: null,
      productCount: 6823,
      downloads: 156000,
      revenue: 18750,
      status: "active",
      featured: false,
      dateCreated: "2024-01-01",
      lastModified: "2024-01-12",
      subcategories: ["Wood", "Stone", "Metal", "Fabric", "Glass", "Ceramic"],
    },
    {
      id: 5,
      name: "Lighting",
      slug: "lighting",
      description: "Lighting plans and fixture designs",
      icon: "Lightbulb",
      color: "yellow",
      parentId: null,
      productCount: 4256,
      downloads: 34560,
      revenue: 12340,
      status: "active",
      featured: false,
      dateCreated: "2024-01-01",
      lastModified: "2024-01-10",
      subcategories: [
        "Ambient",
        "Task",
        "Accent",
        "Natural",
        "LED",
        "Chandelier",
      ],
    },
    {
      id: 6,
      name: "Outdoor",
      slug: "outdoor",
      description: "Garden and outdoor space designs",
      icon: "Trees",
      color: "emerald",
      parentId: null,
      productCount: 2891,
      downloads: 23450,
      revenue: 8920,
      status: "inactive",
      featured: false,
      dateCreated: "2024-01-01",
      lastModified: "2024-01-08",
      subcategories: [
        "Garden",
        "Patio",
        "Deck",
        "Pool",
        "Landscape",
        "Terrace",
      ],
    },
  ];

  const iconComponents = {
    FileText,
    Package,
    Sofa,
    Palette,
    Lightbulb,
    Trees,
    Home,
    Utensils,
    Bed,
    Bath,
    Car,
    Building,
    Ruler,
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSelectCategory = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };

  const handleSelectAll = () => {
    if (selectedCategories.length === filteredCategories.length) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(filteredCategories.map((c) => c.id));
    }
  };

  const handleDeleteCategory = (categoryId: number) => {
    setCategoryToDelete(categoryId);
    setShowDeleteDialog(true);
  };

  const handleEditCategory = (category: any) => {
    setEditingCategory(category);
    setShowEditDialog(true);
  };

  const confirmDelete = () => {
    if (categoryToDelete) {
      console.log("Deleting category:", categoryToDelete);
    }
    setShowDeleteDialog(false);
    setCategoryToDelete(null);
  };

  const getColorClass = (color: string) => {
    const colorClasses = {
      blue: "bg-blue-100 text-blue-800",
      green: "bg-green-100 text-green-800",
      purple: "bg-purple-100 text-purple-800",
      orange: "bg-orange-100 text-orange-800",
      yellow: "bg-yellow-100 text-yellow-800",
      emerald: "bg-emerald-100 text-emerald-800",
      red: "bg-red-100 text-red-800",
      gray: "bg-gray-100 text-gray-800",
    };
    return (
      colorClasses[color as keyof typeof colorClasses] || colorClasses.gray
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Category Management
            </h1>
            <p className="text-gray-600 mt-1">
              Organize and manage your product categories
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate("/dashboard")}>
              Back to Dashboard
            </Button>
            <Button
              onClick={() => navigate("/dashboard/categories/new")}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Categories
                  </p>
                  <p className="text-2xl font-bold">{categories.length}</p>
                </div>
                <FolderTree className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Active Categories
                  </p>
                  <p className="text-2xl font-bold">
                    {categories.filter((c) => c.status === "active").length}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Products
                  </p>
                  <p className="text-2xl font-bold">
                    {categories
                      .reduce((sum, c) => sum + c.productCount, 0)
                      .toLocaleString()}
                  </p>
                </div>
                <Package className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Revenue
                  </p>
                  <p className="text-2xl font-bold">
                    $
                    {categories
                      .reduce((sum, c) => sum + c.revenue, 0)
                      .toLocaleString()}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-emerald-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Categories</CardTitle>
              {selectedCategories.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">
                    {selectedCategories.length} selected
                  </span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        Bulk Actions
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Activate Selected</DropdownMenuItem>
                      <DropdownMenuItem>Deactivate Selected</DropdownMenuItem>
                      <DropdownMenuItem>Mark as Featured</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        Delete Selected
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </div>

            {/* Search */}
            <div className="mt-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={
                          selectedCategories.length ===
                            filteredCategories.length &&
                          filteredCategories.length > 0
                        }
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Products</TableHead>
                    <TableHead>Downloads</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Modified</TableHead>
                    <TableHead className="w-16">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCategories.map((category) => {
                    const IconComponent =
                      iconComponents[
                        category.icon as keyof typeof iconComponents
                      ] || FileText;
                    return (
                      <TableRow key={category.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedCategories.includes(category.id)}
                            onCheckedChange={() =>
                              handleSelectCategory(category.id)
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClass(category.color)}`}
                            >
                              <IconComponent className="w-6 h-6" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-medium">{category.name}</p>
                                {category.featured && (
                                  <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                                    Featured
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-600">
                                {category.description}
                              </p>
                              <div className="flex gap-1 mt-1">
                                {category.subcategories
                                  .slice(0, 3)
                                  .map((sub) => (
                                    <Badge
                                      key={sub}
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      {sub}
                                    </Badge>
                                  ))}
                                {category.subcategories.length > 3 && (
                                  <Badge
                                    variant="outline"
                                    className="text-xs text-gray-500"
                                  >
                                    +{category.subcategories.length - 3} more
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Package className="w-4 h-4 text-gray-500" />
                            <span className="font-medium">
                              {category.productCount.toLocaleString()}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {category.downloads.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">
                            ${category.revenue.toLocaleString()}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`${getStatusColor(category.status)} text-xs`}
                          >
                            {category.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {category.lastModified}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() =>
                                  navigate(`/category/${category.slug}`)
                                }
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                View Category
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleEditCategory(category)}
                              >
                                <Edit className="w-4 h-4 mr-2" />
                                Edit Category
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  navigate(
                                    `/dashboard/categories/${category.id}/subcategories`,
                                  )
                                }
                              >
                                <FolderTree className="w-4 h-4 mr-2" />
                                Manage Subcategories
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() =>
                                  handleDeleteCategory(category.id)
                                }
                                className="text-red-600"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete Category
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            {filteredCategories.length === 0 && (
              <div className="text-center py-8">
                <FolderTree className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No categories found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search or create a new category
                </p>
                <Button
                  onClick={() => navigate("/dashboard/categories/new")}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create First Category
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Delete Confirmation Dialog */}
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Category</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this category? This action will
                also affect all products in this category.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowDeleteDialog(false)}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                Delete Category
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Category Dialog */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Category</DialogTitle>
              <DialogDescription>
                Update category information and settings
              </DialogDescription>
            </DialogHeader>
            {editingCategory && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category Name
                  </label>
                  <input
                    type="text"
                    defaultValue={editingCategory.name}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    defaultValue={editingCategory.description}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Color
                    </label>
                    <select
                      defaultValue={editingCategory.color}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="blue">Blue</option>
                      <option value="green">Green</option>
                      <option value="purple">Purple</option>
                      <option value="orange">Orange</option>
                      <option value="yellow">Yellow</option>
                      <option value="emerald">Emerald</option>
                      <option value="red">Red</option>
                      <option value="gray">Gray</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      defaultValue={editingCategory.status}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox defaultChecked={editingCategory.featured} />
                  <label className="text-sm font-medium text-gray-700">
                    Featured Category
                  </label>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowEditDialog(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  console.log("Saving category:", editingCategory);
                  setShowEditDialog(false);
                }}
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
