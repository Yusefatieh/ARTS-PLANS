import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Package,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Download,
  Star,
  TrendingUp,
  AlertTriangle,
  FileText,
  Image,
  Box,
  Palette,
} from "lucide-react";

export default function ProductManagement() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);

  // Mock products data
  const products = [
    {
      id: 1,
      name: "Modern Villa Floor Plan",
      category: "Floor Plans",
      categoryId: "floor-plans",
      type: "DWG",
      price: 25,
      originalPrice: 35,
      creator: "ArchDesign Studio",
      downloads: 234,
      rating: 4.8,
      reviews: 45,
      status: "active",
      featured: true,
      dateAdded: "2024-01-15",
      lastModified: "2024-01-20",
      fileSize: "2.4 MB",
      tags: ["modern", "villa", "3bed"],
      image: "/placeholder.svg",
    },
    {
      id: 2,
      name: "Luxury Kitchen 3D Model",
      category: "3D Models",
      categoryId: "3d-models",
      type: "3DS",
      price: 45,
      creator: "InteriorPro",
      downloads: 156,
      rating: 4.6,
      reviews: 28,
      status: "pending",
      featured: false,
      dateAdded: "2024-01-14",
      lastModified: "2024-01-18",
      fileSize: "15.8 MB",
      tags: ["kitchen", "luxury", "modern"],
      image: "/placeholder.svg",
    },
    {
      id: 3,
      name: "Scandinavian Living Room Set",
      category: "Furniture",
      categoryId: "furniture",
      type: "DWG",
      price: 35,
      creator: "NordicDesigns",
      downloads: 89,
      rating: 4.7,
      reviews: 12,
      status: "active",
      featured: true,
      dateAdded: "2024-01-13",
      lastModified: "2024-01-19",
      fileSize: "5.2 MB",
      tags: ["scandinavian", "living-room", "minimalist"],
      image: "/placeholder.svg",
    },
    {
      id: 4,
      name: "Wood Texture Pack",
      category: "Textures",
      categoryId: "textures",
      type: "JPG",
      price: 15,
      creator: "TextureMaster",
      downloads: 445,
      rating: 4.9,
      reviews: 67,
      status: "active",
      featured: false,
      dateAdded: "2024-01-12",
      lastModified: "2024-01-16",
      fileSize: "125.4 MB",
      tags: ["wood", "texture", "material"],
      image: "/placeholder.svg",
    },
    {
      id: 5,
      name: "Office Layout Design",
      category: "Floor Plans",
      categoryId: "floor-plans",
      type: "PDF",
      price: 30,
      creator: "WorkspaceDesigns",
      downloads: 78,
      rating: 4.5,
      reviews: 15,
      status: "inactive",
      featured: false,
      dateAdded: "2024-01-11",
      lastModified: "2024-01-15",
      fileSize: "3.1 MB",
      tags: ["office", "workspace", "commercial"],
      image: "/placeholder.svg",
    },
  ];

  const categories = [
    { id: "all", name: "All Categories", count: products.length },
    {
      id: "floor-plans",
      name: "Floor Plans",
      count: products.filter((p) => p.categoryId === "floor-plans").length,
    },
    {
      id: "3d-models",
      name: "3D Models",
      count: products.filter((p) => p.categoryId === "3d-models").length,
    },
    {
      id: "furniture",
      name: "Furniture",
      count: products.filter((p) => p.categoryId === "furniture").length,
    },
    {
      id: "textures",
      name: "Textures",
      count: products.filter((p) => p.categoryId === "textures").length,
    },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.categoryId === selectedCategory;
    const matchesStatus =
      selectedStatus === "all" || product.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleSelectProduct = (productId: number) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map((p) => p.id));
    }
  };

  const handleDeleteProduct = (productId: number) => {
    setProductToDelete(productId);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      // Handle delete logic here
      console.log("Deleting product:", productToDelete);
    }
    setShowDeleteDialog(false);
    setProductToDelete(null);
  };

  const handleBulkAction = (action: string) => {
    console.log("Bulk action:", action, "for products:", selectedProducts);
    setSelectedProducts([]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case "floor-plans":
        return FileText;
      case "3d-models":
        return Box;
      case "furniture":
        return Package;
      case "textures":
        return Palette;
      default:
        return Package;
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
              Product Management
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your products, categories, and inventory
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate("/dashboard")}>
              Back to Dashboard
            </Button>
            <Button
              onClick={() => navigate("/dashboard/products/new")}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Product
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
                    Total Products
                  </p>
                  <p className="text-2xl font-bold">{products.length}</p>
                </div>
                <Package className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Active Products
                  </p>
                  <p className="text-2xl font-bold">
                    {products.filter((p) => p.status === "active").length}
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
                    Pending Review
                  </p>
                  <p className="text-2xl font-bold">
                    {products.filter((p) => p.status === "pending").length}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Downloads
                  </p>
                  <p className="text-2xl font-bold">
                    {products
                      .reduce((sum, p) => sum + p.downloads, 0)
                      .toLocaleString()}
                  </p>
                </div>
                <Download className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Products</CardTitle>
              {selectedProducts.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">
                    {selectedProducts.length} selected
                  </span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        Bulk Actions
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => handleBulkAction("activate")}
                      >
                        Activate Selected
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleBulkAction("deactivate")}
                      >
                        Deactivate Selected
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleBulkAction("feature")}
                      >
                        Mark as Featured
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleBulkAction("delete")}
                        className="text-red-600"
                      >
                        Delete Selected
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </div>

            {/* Filters */}
            <div className="flex flex-col lg:flex-row gap-4 mt-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name} ({category.count})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={selectedStatus}
                  onValueChange={setSelectedStatus}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
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
                          selectedProducts.length === filteredProducts.length &&
                          filteredProducts.length > 0
                        }
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Downloads</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date Added</TableHead>
                    <TableHead className="w-16">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => {
                    const CategoryIcon = getCategoryIcon(product.categoryId);
                    return (
                      <TableRow key={product.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedProducts.includes(product.id)}
                            onCheckedChange={() =>
                              handleSelectProduct(product.id)
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                              <CategoryIcon className="w-6 h-6 text-gray-600" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-medium">{product.name}</p>
                                {product.featured && (
                                  <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                                    Featured
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-600">
                                by {product.creator}
                              </p>
                              <div className="flex gap-1 mt-1">
                                {product.tags.slice(0, 3).map((tag) => (
                                  <Badge
                                    key={tag}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <CategoryIcon className="w-4 h-4 text-gray-500" />
                            <span>{product.category}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <span className="font-medium">
                              ${product.price}
                            </span>
                            {product.originalPrice && (
                              <span className="text-sm text-gray-500 line-through ml-1">
                                ${product.originalPrice}
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {product.downloads.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span>{product.rating}</span>
                            <span className="text-sm text-gray-500">
                              ({product.reviews})
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`${getStatusColor(product.status)} text-xs`}
                          >
                            {product.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {product.dateAdded}
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
                                  navigate(`/design/${product.id}`)
                                }
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                View Product
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  navigate(
                                    `/dashboard/products/${product.id}/edit`,
                                  )
                                }
                              >
                                <Edit className="w-4 h-4 mr-2" />
                                Edit Product
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleDeleteProduct(product.id)}
                                className="text-red-600"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete Product
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

            {filteredProducts.length === 0 && (
              <div className="text-center py-8">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <Button
                  onClick={() => navigate("/dashboard/products/new")}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Product
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Delete Confirmation Dialog */}
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Product</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this product? This action cannot
                be undone.
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
                Delete Product
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
