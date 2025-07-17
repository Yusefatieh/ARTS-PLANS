import "./global.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import FloorPlans from "./pages/FloorPlans";
import Furniture from "./pages/Furniture";
import Courses from "./pages/Courses";
import Projects from "./pages/Projects";
import Caravans from "./pages/Caravans";
import Search from "./pages/Search";
import Browse from "./pages/Browse";
import Categories from "./pages/Categories";
import Sell from "./pages/Sell";
import CategoryDetail from "./pages/CategoryDetail";
import DesignDetail from "./pages/DesignDetail";
import Auth from "./pages/Auth";
import Shop from "./pages/Shop";
import Dashboard from "./pages/Dashboard";
import ProductManagement from "./pages/ProductManagement";
import CategoryManagement from "./pages/CategoryManagement";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/browse" element={<Browse />} />
              <Route path="/categories" element={<Categories />} />
              <Route
                path="/category/:categoryId"
                element={<CategoryDetail />}
              />
              <Route path="/design/:designId" element={<DesignDetail />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/sell" element={<Sell />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/login" element={<Auth />} />
              <Route path="/signup" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route
                path="/dashboard/products"
                element={<ProductManagement />}
              />
              <Route
                path="/dashboard/categories"
                element={<CategoryManagement />}
              />
              <Route path="/search" element={<Search />} />
              <Route path="/floor-plans" element={<FloorPlans />} />
              <Route path="/furniture" element={<Furniture />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/caravans" element={<Caravans />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
