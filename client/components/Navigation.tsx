import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Menu,
  X,
  Globe,
  Search,
  User,
  Heart,
  Download,
  Plus,
  ShoppingCart,
  Settings,
  LogOut,
  CreditCard,
} from "lucide-react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState(3); // Mock cart items
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: "Browse", nameAr: "تصفح", href: "/browse" },
    { name: "Categories", nameAr: "الفئات", href: "/categories" },
    { name: "Shop", nameAr: "المتجر", href: "/shop" },
    { name: "Courses", nameAr: "الدورات", href: "/courses" },
    { name: "Sell", nameAr: "بيع", href: "/sell" },
  ];

  const isActive = (path: string) => location.pathname === path;
  const t = (en: string, ar: string) => (language === "ar" ? ar : en);

  return (
    <nav
      className={`bg-white border-b border-gray-200 sticky top-0 z-50 ${language === "ar" ? "rtl" : "ltr"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              loading="lazy"
              srcSet="https://cdn.builder.io/api/v1/image/assets%2Fc4aeb5da3eec4fb78b289ef49f721a3c%2F3141b580a4844d04a173ff8437c4f580?width=100 100w, https://cdn.builder.io/api/v1/image/assets%2Fc4aeb5da3eec4fb78b289ef49f721a3c%2F3141b580a4844d04a173ff8437c4f580?width=200 200w, https://cdn.builder.io/api/v1/image/assets%2Fc4aeb5da3eec4fb78b289ef49f721a3c%2F3141b580a4844d04a173ff8437c4f580?width=400 400w, https://cdn.builder.io/api/v1/image/assets%2Fc4aeb5da3eec4fb78b289ef49f721a3c%2F3141b580a4844d04a173ff8437c4f580?width=800 800w, https://cdn.builder.io/api/v1/image/assets%2Fc4aeb5da3eec4fb78b289ef49f721a3c%2F3141b580a4844d04a173ff8437c4f580?width=1200 1200w, https://cdn.builder.io/api/v1/image/assets%2Fc4aeb5da3eec4fb78b289ef49f721a3c%2F3141b580a4844d04a173ff8437c4f580?width=1600 1600w, https://cdn.builder.io/api/v1/image/assets%2Fc4aeb5da3eec4fb78b289ef49f721a3c%2F3141b580a4844d04a173ff8437c4f580?width=2000 2000w"
              style={{
                aspectRatio: "0.58",
                objectFit: "cover",
                objectPosition: "center",
                width: "100%",
                marginLeft: "10px",
                minHeight: "20px",
                minWidth: "20px",
                overflow: "hidden",
                maxWidth: "26px",
              }}
            />
            <span className="font-bold text-xl text-gray-900">
              {t("ArtsPlans", "خطط الفن")}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  isActive(item.href) ? "text-blue-600" : "text-gray-700"
                }`}
              >
                {language === "ar" ? item.nameAr : item.name}
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-700 hover:text-blue-600"
              onClick={() => navigate("/search")}
            >
              <Search className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
              {t("Search", "بحث")}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="text-gray-700 hover:text-blue-600 relative"
              onClick={() => navigate("/shop")}
            >
              <ShoppingCart className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
              {t("Cart", "سلة")}
              {cartItems > 0 && (
                <Badge className="absolute -top-1 -right-1 rtl:-left-1 rtl:right-auto bg-red-500 text-white text-xs min-w-[1.25rem] h-5">
                  {cartItems}
                </Badge>
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="text-gray-700 hover:text-blue-600"
              onClick={() => navigate("/favorites")}
            >
              <Heart className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
              {t("Favorites", "المفضلة")}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-700 hover:text-blue-600"
                >
                  <Globe className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                  {language === "ar" ? "ع" : "EN"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => setLanguage("en")}
                  className={language === "en" ? "bg-blue-50" : ""}
                >
                  English
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setLanguage("ar")}
                  className={language === "ar" ? "bg-blue-50" : ""}
                >
                  العربية
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-700 hover:text-blue-600"
                  >
                    <User className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                    {t("Account", "الحساب")}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                    <User className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                    {t("Dashboard", "لوحة التحكم")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <Settings className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                    {t("Profile Settings", "إعدادات الملف الشخصي")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/purchases")}>
                    <Download className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                    {t("My Downloads", "تحميلاتي")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/billing")}>
                    <CreditCard className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                    {t("Billing", "الفواتير")}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setIsLoggedIn(false)}>
                    <LogOut className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                    {t("Sign Out", "تسجيل الخروج")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-700 hover:text-blue-600"
                onClick={() => navigate("/auth")}
              >
                <User className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                {t("Login", "تسجيل الدخول")}
              </Button>
            )}

            <Button
              className="text-white hover:opacity-90"
              style={{ backgroundColor: "#034a29" }}
              onClick={() => navigate("/upload")}
            >
              <Plus className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
              {t("Upload", "رفع")}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  {language === "ar" ? item.nameAr : item.name}
                </Link>
              ))}

              <div className="pt-4 border-t border-gray-200 mt-4 space-y-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-gray-700"
                  onClick={() => {
                    navigate("/search");
                    setIsOpen(false);
                  }}
                >
                  <Search className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                  {t("Search", "بحث")}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-gray-700 relative"
                  onClick={() => {
                    navigate("/shop");
                    setIsOpen(false);
                  }}
                >
                  <ShoppingCart className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                  {t("Cart", "سلة")}
                  {cartItems > 0 && (
                    <Badge className="ml-auto bg-red-500 text-white">
                      {cartItems}
                    </Badge>
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-gray-700"
                  onClick={() => {
                    navigate("/favorites");
                    setIsOpen(false);
                  }}
                >
                  <Heart className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                  {t("Favorites", "المفضلة")}
                </Button>

                {!isLoggedIn ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-gray-700"
                    onClick={() => {
                      navigate("/auth");
                      setIsOpen(false);
                    }}
                  >
                    <User className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                    {t("Login", "تسجيل الدخول")}
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-gray-700"
                    onClick={() => {
                      navigate("/dashboard");
                      setIsOpen(false);
                    }}
                  >
                    <User className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                    {t("Dashboard", "لوحة التحكم")}
                  </Button>
                )}

                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => {
                    navigate("/upload");
                    setIsOpen(false);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                  {t("Upload", "رفع")}
                </Button>

                {/* Language toggle for mobile */}
                <div className="pt-2 border-t border-gray-200">
                  <div className="flex justify-center space-x-2 rtl:space-x-reverse">
                    <Button
                      variant={language === "en" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setLanguage("en")}
                      className={
                        language === "en"
                          ? "bg-blue-600 text-white"
                          : "text-gray-700"
                      }
                    >
                      English
                    </Button>
                    <Button
                      variant={language === "ar" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setLanguage("ar")}
                      className={
                        language === "ar"
                          ? "bg-blue-600 text-white"
                          : "text-gray-700"
                      }
                    >
                      العربية
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
