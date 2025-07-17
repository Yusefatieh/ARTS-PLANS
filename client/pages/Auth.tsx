import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Check,
  Star,
  Upload,
  Download,
  GraduationCap,
  Building,
  Home,
  Globe,
} from "lucide-react";

export default function Auth() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(
    searchParams.get("mode") || "login",
  );
  const [selectedRole, setSelectedRole] = useState("customer");
  const [showPassword, setShowPassword] = useState(false);
  const [language, setLanguage] = useState("en");

  const userTypes = [
    {
      id: "customer",
      name: "Customer/Homeowner",
      nameAr: "عميل/مالك منزل",
      icon: Home,
      color: "bg-blue-100 text-blue-700",
      benefits: [
        "Download floor plans and designs",
        "Access to premium content",
        "Project execution services",
        "Personal design consultation",
      ],
      benefitsAr: [
        "تحميل المخططات والتصاميم",
        "الوصول إلى المحتوى المميز",
        "خدمات تنفيذ المشاريع",
        "استشارة تصميم شخصية",
      ],
    },
    {
      id: "student",
      name: "Student",
      nameAr: "طالب",
      icon: GraduationCap,
      color: "bg-green-100 text-green-700",
      benefits: [
        "Access to educational courses",
        "Student discounts on resources",
        "Learning materials and tutorials",
        "Portfolio building tools",
      ],
      benefitsAr: [
        "الوصول إلى الدورات التعليمية",
        "خصومات الطلاب على الموارد",
        "مواد تعليمية ودروس",
        "أدوات بناء المحفظة",
      ],
    },
    {
      id: "engineer",
      name: "Engineer/Designer",
      nameAr: "مهندس/مصمم",
      icon: Building,
      color: "bg-purple-100 text-purple-700",
      benefits: [
        "Upload and sell your designs",
        "Earn commission from sales",
        "Create and sell courses",
        "Professional networking",
      ],
      benefitsAr: [
        "تحميل وبيع تصاميمك",
        "كسب عمولة من المبيعات",
        "إنشاء وبيع الدورات",
        "الشبكات المهنية",
      ],
    },
  ];

  const t = (en: string, ar: string) => (language === "ar" ? ar : en);

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 ${language === "ar" ? "rtl" : "ltr"}`}
    >
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Language Toggle */}
        <div className="flex justify-end mb-6">
          <div className="flex bg-white rounded-lg p-1 shadow-sm border">
            <Button
              variant={language === "en" ? "default" : "ghost"}
              size="sm"
              onClick={() => setLanguage("en")}
              className={language === "en" ? "bg-blue-600 text-white" : ""}
            >
              <Globe className="w-4 h-4 mr-2" />
              English
            </Button>
            <Button
              variant={language === "ar" ? "default" : "ghost"}
              size="sm"
              onClick={() => setLanguage("ar")}
              className={language === "ar" ? "bg-blue-600 text-white" : ""}
            >
              <Globe className="w-4 h-4 mr-2" />
              العربية
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Account Types */}
          <div className="space-y-8">
            <div className="text-center lg:text-start">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t("Join ArtsPlans Community", "انضم إلى مجتمع ArtsPlans")}
              </h1>
              <p className="text-xl text-gray-600">
                {t(
                  "Choose your account type to get started with interior design resources",
                  "اختر نوع حسابك للبدء في موارد التصميم الداخلي",
                )}
              </p>
            </div>

            {/* User Type Selection */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">
                {t("I am a...", "أنا...")}
              </h2>
              <div className="grid gap-4">
                {userTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <Card
                      key={type.id}
                      className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                        selectedRole === type.id
                          ? "ring-2 ring-blue-600 bg-blue-50"
                          : ""
                      }`}
                      onClick={() => setSelectedRole(type.id)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4 rtl:space-x-reverse">
                          <div className={`p-3 rounded-lg ${type.color}`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              {language === "ar" ? type.nameAr : type.name}
                            </h3>
                            <ul className="space-y-1">
                              {(language === "ar"
                                ? type.benefitsAr
                                : type.benefits
                              )
                                .slice(0, 3)
                                .map((benefit, index) => (
                                  <li
                                    key={index}
                                    className="flex items-center text-sm text-gray-600"
                                  >
                                    <Check className="w-4 h-4 text-green-500 mr-2 rtl:ml-2 rtl:mr-0 flex-shrink-0" />
                                    {benefit}
                                  </li>
                                ))}
                            </ul>
                          </div>
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              selectedRole === type.id
                                ? "border-blue-600 bg-blue-600"
                                : "border-gray-300"
                            }`}
                          >
                            {selectedRole === type.id && (
                              <Check className="w-3 h-3 text-white" />
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">50K+</div>
                <div className="text-sm text-gray-600">
                  {t("Designers", "مصممين")}
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">10M+</div>
                <div className="text-sm text-gray-600">
                  {t("Downloads", "تحميلات")}
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">4.8</div>
                <div className="text-sm text-gray-600 flex items-center justify-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                  {t("Rating", "تقييم")}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Auth Forms */}
          <div className="w-full max-w-md mx-auto lg:max-w-none">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">
                      {t("Sign In", "تسجيل الدخول")}
                    </TabsTrigger>
                    <TabsTrigger value="signup">
                      {t("Sign Up", "إنشاء حساب")}
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="login" className="p-6">
                    <div className="space-y-4">
                      <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">
                          {t("Welcome Back", "مرحباً بعودتك")}
                        </h2>
                        <p className="text-gray-600">
                          {t(
                            "Sign in to your account",
                            "قم بتسجيل الدخول إلى حسابك",
                          )}
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t("Email", "البريد الإلكتروني")}
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="email"
                              className="w-full pl-10 rtl:pr-10 rtl:pl-3 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                              placeholder={t(
                                "your@email.com",
                                "your@email.com",
                              )}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t("Password", "كلمة المرور")}
                          </label>
                          <div className="relative">
                            <Lock className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type={showPassword ? "text" : "password"}
                              className="w-full pl-10 rtl:pr-10 pr-10 rtl:pl-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                              placeholder={t("••••••••", "••••••••")}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 rtl:left-3 rtl:right-auto top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showPassword ? (
                                <EyeOff className="w-5 h-5" />
                              ) : (
                                <Eye className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                            />
                            <span className="ml-2 rtl:mr-2 rtl:ml-0 text-sm text-gray-600">
                              {t("Remember me", "تذكرني")}
                            </span>
                          </label>
                          <button className="text-sm text-blue-600 hover:text-blue-700">
                            {t("Forgot password?", "نسيت كلمة المرور؟")}
                          </button>
                        </div>

                        <Button
                          className="w-full bg-blue-600 hover:bg-blue-700"
                          size="lg"
                        >
                          {t("Sign In", "تسجيل الدخول")}
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="signup" className="p-6">
                    <div className="space-y-4">
                      <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">
                          {t("Create Account", "إنشاء حساب")}
                        </h2>
                        <p className="text-gray-600">
                          {t(
                            "Join our community of designers",
                            "انضم إلى مجتمع المصممين لدينا",
                          )}
                        </p>
                      </div>

                      {/* Selected Role Display */}
                      <div className="mb-6">
                        <Badge
                          className={`${
                            userTypes.find((t) => t.id === selectedRole)?.color
                          } text-sm`}
                        >
                          {t("Account Type:", "نوع الحساب:")}{" "}
                          {language === "ar"
                            ? userTypes.find((t) => t.id === selectedRole)
                                ?.nameAr
                            : userTypes.find((t) => t.id === selectedRole)
                                ?.name}
                        </Badge>
                      </div>

                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              {t("First Name", "الاسم الأول")}
                            </label>
                            <input
                              type="text"
                              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                              placeholder={t("John", "أحمد")}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              {t("Last Name", "اسم العائلة")}
                            </label>
                            <input
                              type="text"
                              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                              placeholder={t("Doe", "محمد")}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t("Email", "البريد الإلكتروني")}
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="email"
                              className="w-full pl-10 rtl:pr-10 rtl:pl-3 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                              placeholder={t(
                                "your@email.com",
                                "your@email.com",
                              )}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t("Password", "كلمة المرور")}
                          </label>
                          <div className="relative">
                            <Lock className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type={showPassword ? "text" : "password"}
                              className="w-full pl-10 rtl:pr-10 pr-10 rtl:pl-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                              placeholder={t("••••••••", "••••••••")}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 rtl:left-3 rtl:right-auto top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showPassword ? (
                                <EyeOff className="w-5 h-5" />
                              ) : (
                                <Eye className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-600 mt-1"
                          />
                          <span className="ml-2 rtl:mr-2 rtl:ml-0 text-sm text-gray-600">
                            {t(
                              "I agree to the Terms of Service and Privacy Policy",
                              "أوافق على شروط الخدمة وسياسة الخصوصية",
                            )}
                          </span>
                        </div>

                        <Button
                          className="w-full bg-blue-600 hover:bg-blue-700"
                          size="lg"
                          onClick={() => {
                            // Handle signup based on selected role
                            if (selectedRole === "engineer") {
                              navigate("/dashboard/creator");
                            } else {
                              navigate("/dashboard");
                            }
                          }}
                        >
                          {t("Create Account", "إنشاء حساب")}
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Social Login */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-50 text-gray-500">
                    {t("Or continue with", "أو تابع مع")}
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button variant="outline" className="w-full">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </Button>
                <Button variant="outline" className="w-full">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
