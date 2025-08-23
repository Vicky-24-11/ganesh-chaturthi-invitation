"use client";
import React, { useState, useEffect } from "react";
import {
  Phone,
  MapPin,
  Calendar,
  Clock,
  Star,
  Sparkles,
  MessageCircle,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { ContactPerson, familiesData, FamilyData } from "@/ultils/familiesData";

interface MousePosition {
  x: number;
  y: number;
}

const DynamicGaneshInvitation: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });
  const [scrollY, setScrollY] = useState<number>(0);
  const [currentMantra, setCurrentMantra] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [familyData, setFamilyData] = useState<FamilyData>(
    familiesData.solanki
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const pathname = usePathname();

  useEffect(() => {
    const extractFamilyFromUrl = () => {
      // 1. Check hash (#/ganesh-chaturthi-invitation/yadav)
      const hash = window.location.hash; // "#/ganesh-chaturthi-invitation/yadav"
      const hashMatch = hash.match(/\/ganesh-chaturthi-invitation\/([^\/]+)/);
      if (hashMatch && hashMatch[1]) {
        const familyKey = hashMatch[1].toLowerCase();
        if (familiesData[familyKey]) return familyKey;
      }

      // 2. Check query params (?family=solanki)
      const urlParams = new URLSearchParams(window.location.search);
      const familyParam = urlParams.get("family")?.toLowerCase();
      if (familyParam && familiesData[familyParam]) return familyParam;

      // 3. Check pathname (/ganesh-chaturthi-invitation/yadav)
      const pathMatch = pathname?.match(
        /\/ganesh-chaturthi-invitation\/([^\/]+)/
      );
      if (pathMatch && pathMatch[1]) {
        const familyKey = pathMatch[1].toLowerCase();
        if (familiesData[familyKey]) return familyKey;
      }

      // Default
      return "solanki";
    };

    const initializeFamilyData = () => {
      try {
        const familyKey = extractFamilyFromUrl();
        setFamilyData(familiesData[familyKey]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error initializing family data:", error);
        setFamilyData(familiesData.solanki);
        setIsLoading(false);
      }
    };

    initializeFamilyData();

    // React to URL changes
    window.addEventListener("popstate", initializeFamilyData);
    window.addEventListener("hashchange", initializeFamilyData);

    return () => {
      window.removeEventListener("popstate", initializeFamilyData);
      window.removeEventListener("hashchange", initializeFamilyData);
    };
  }, [pathname, familiesData]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);

      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const mantras: string[] = [
    "गणेशाय नमः",
    "गणपति बप्पा मोरया",
    "मंगलमूर्ति मोरया",
    "वक्रतुण्ड महाकाय",
    "विघ्नहर्ता गणेश",
  ];

  const generateGuestReplyMessage = (host: ContactPerson): string => {
    const message = `🙏 नमस्कार ${host.name},

आपका *गणेश चतुर्थी महोत्सव* का आमंत्रण प्राप्त हुआ।  
हम शामिल होने के लिए उत्सुक हैं।  

*गणपति बप्पा मोरया!* 🐘

- ${familyData.familyName} के निमंत्रण से`;

    return encodeURIComponent(message);
  };

  const handleWhatsAppClick = (contact: ContactPerson): void => {
    const message = generateGuestReplyMessage(contact);
    const whatsappUrl = `https://wa.me/91${contact.number}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  useEffect(() => {
    if (!isLoading) {
      setIsVisible(true);
    }

    const handleMouseMove = (e: MouseEvent): void => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = (): void => {
      setScrollY(window.scrollY);
    };

    // Rotate mantras every 3 seconds
    const mantraInterval = setInterval(() => {
      setCurrentMantra((prev) => (prev + 1) % mantras.length);
    }, 3000);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      clearInterval(mantraInterval);
    };
  }, [mantras.length, isLoading]);

  // Show loading state while determining family data
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-900 via-red-800 to-yellow-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl animate-spin mb-4">🕉️</div>
          <div className="text-2xl text-yellow-300 font-bold animate-pulse">
            Loading Sacred Invitation...
          </div>
          <div className="text-lg text-orange-200 mt-2">
            प्रतीक्षा करें • Please Wait
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic Animated Background */}
      <div className="fixed inset-0 z-0">
        {/* Multi-layer gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900 via-red-800 to-yellow-900"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-orange-600/30 to-yellow-500/20 animate-pulse"></div>
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,165,0,0.3),transparent_50%)] animate-pulse"
          style={{ animationDuration: "4s" }}
        ></div>
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,69,0,0.25),transparent_50%)] animate-pulse"
          style={{ animationDuration: "6s" }}
        ></div>
      </div>

      {/* Sacred Floating Elements - Optimized for mobile */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        {/* Divine Light Particles - Reduced for mobile */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-pulse opacity-50 sm:opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              transform: `translate(${
                Math.sin(Date.now() / 1000 + i) * 30
              }px, ${Math.cos(Date.now() / 1000 + i) * 20}px)`,
            }}
          />
        ))}

        {/* Sacred Symbols Floating - Responsive sizing */}
        {["🕉️", "🪔", "🌺", "🙏", "⭐", "✨"].map((symbol, i) => (
          <div
            key={i}
            className="absolute text-lg sm:text-2xl md:text-4xl opacity-15 sm:opacity-20 animate-bounce"
            style={{
              left: `${10 + i * 15}%`,
              top: `${5 + Math.sin(i) * 15}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${4 + i * 0.5}s`,
              transform: `rotate(${Math.sin(scrollY * 0.01 + i) * 10}deg)`,
            }}
          >
            {symbol}
          </div>
        ))}

        {/* Divine Energy Rings - Smaller for mobile */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute border-2 border-yellow-300/10 sm:border-yellow-300/20 rounded-full animate-ping"
            style={{
              left: "50%",
              top: "50%",
              width: `${100 + i * 60}px`,
              height: `${100 + i * 60}px`,
              marginLeft: `${-50 - i * 30}px`,
              marginTop: `${-50 - i * 30}px`,
              animationDelay: `${i * 1}s`,
              animationDuration: `${6 + i}s`,
            }}
          />
        ))}
      </div>

      {/* Rotating Mantra Display - Mobile optimized */}
      <div className="fixed top-2 right-2 sm:top-6 sm:right-6 z-50 max-w-[calc(100vw-1rem)] sm:max-w-none">
        <div className="bg-black/30 backdrop-blur-md text-yellow-300 px-2 py-1 sm:px-4 sm:py-2 rounded-full border border-yellow-500/30">
          <div className="text-sm sm:text-lg font-bold animate-pulse transition-all duration-1000 truncate">
            {mantras[currentMantra]}
          </div>
        </div>
      </div>

      {/* Main Sacred Content */}
      <div className="relative z-20 container mx-auto px-3 sm:px-4 py-6 sm:py-12">
        {/* Divine Header - Mobile optimized */}
        <div
          className={`text-center mb-8 sm:mb-16 transition-all duration-3000 ${
            isVisible
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 -translate-y-32 scale-75"
          }`}
        >
          <div className="relative">
            {/* Sacred AUM Symbol */}
            <div className="text-5xl sm:text-6xl md:text-9xl mb-2 sm:mb-4 animate-pulse text-yellow-300">
              🕉️
            </div>

            {/* Main Title with Divine Animation */}
            <div className="relative mb-4 sm:mb-6">
              <h1 className="text-3xl sm:text-4xl md:text-8xl font-black bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent mb-2 sm:mb-4 animate-pulse tracking-wider leading-tight">
                श्री गणेश चतुर्थी
              </h1>
              <div className="absolute -top-4 sm:-top-8 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-4">
                <Star className="w-4 h-4 sm:w-8 sm:h-8 text-yellow-300 animate-spin" />
                <Star className="w-3 h-3 sm:w-6 sm:h-6 text-orange-300 animate-ping" />
                <Star
                  className="w-4 h-4 sm:w-8 sm:h-8 text-yellow-300 animate-spin"
                  style={{ animationDirection: "reverse" }}
                />
              </div>
            </div>

            <div
              className="text-xl sm:text-2xl md:text-4xl text-yellow-200 font-bold mb-2 sm:mb-4 animate-fade-in-up tracking-wide"
              style={{ animationDelay: "0.5s" }}
            >
              GANESH CHATURTHI MAHOTSAV
            </div>

            <div
              className="text-sm sm:text-lg md:text-2xl text-orange-200 animate-fade-in-up font-semibold"
              style={{ animationDelay: "1s" }}
            >
              विघ्नहर्ता • मंगलकर्ता • सिद्धिदाता
            </div>
          </div>
        </div>

        {/* Sacred Ganesha Section with Divine Animations - Mobile optimized */}
        <div
          className={`text-center mb-12 sm:mb-20 transition-all duration-3000 delay-500 ${
            isVisible
              ? "opacity-100 scale-100 rotate-0"
              : "opacity-0 scale-50 rotate-12"
          }`}
        >
          <div className="relative inline-block">
            {/* Divine Aura */}
            <div className="absolute -inset-8 sm:-inset-16 bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-red-400/20 rounded-full blur-xl sm:blur-3xl animate-pulse"></div>

            {/* Main Ganesha Container - Responsive sizing */}
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 mx-auto">
              {/* Sacred Background Circle */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 via-orange-400 to-red-500 rounded-full shadow-2xl animate-pulse border-4 sm:border-8 border-yellow-300/50"></div>

              {/* Inner Divine Circle */}
              <div className="absolute inset-2 sm:inset-4 bg-gradient-to-br from-orange-100 via-yellow-100 to-white rounded-full shadow-inner">
                <div
                  className="w-full h-full rounded-full flex items-center justify-center text-5xl sm:text-6xl md:text-9xl animate-bounce"
                  style={{ animationDuration: "4s" }}
                >
                  🙏🏻
                </div>
              </div>

              {/* Rotating Sacred Symbols - Mobile optimized */}
              <div
                className="absolute inset-0 animate-spin"
                style={{ animationDuration: "20s" }}
              >
                {["🌺", "🪔", "🕉️", "🙏", "⭐", "✨", "🌸", "🪔"].map(
                  (symbol, i) => (
                    <div
                      key={i}
                      className="absolute text-lg sm:text-2xl md:text-4xl"
                      style={{
                        left: "50%",
                        top: "50%",
                        transform: `
                        translate(-50%, -50%) 
                        rotate(${i * 45}deg) 
                       translateY(-${90 + windowWidth * 0.05}px)
                        rotate(-${i * 45}deg)
                      `,
                      }}
                    >
                      <span className="animate-pulse">{symbol}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Divine Chant - Mobile optimized */}
          <div className="mt-4 sm:mt-8 space-y-2 sm:space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-yellow-300 animate-pulse tracking-wider">
              गणपति बप्पा मोरया!
            </h2>
            <p
              className="text-lg sm:text-xl md:text-2xl text-orange-200 font-bold animate-fade-in-up"
              style={{ animationDelay: "1.5s" }}
            >
              मंगलमूर्ति मोरया !
            </p>
          </div>
        </div>

        {/* Sacred Invitation Card - Mobile optimized */}
        <div
          className={`max-w-5xl mx-auto transition-all duration-3000 delay-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
        >
          <div className="relative">
            {/* Card Aura */}
            <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-yellow-400/30 via-orange-400/30 to-red-400/30 rounded-2xl sm:rounded-3xl blur-lg sm:blur-xl animate-pulse"></div>

            <div className="relative bg-gradient-to-br from-white/95 to-yellow-50/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 md:p-12 border-2 sm:border-4 border-yellow-300/50 hover:shadow-3xl transition-all duration-700 hover:scale-[1.02] sm:hover:scale-105">
              {/* Sacred Header - Mobile optimized */}
              <div className="text-center mb-6 sm:mb-12">
                <div className="flex justify-center items-center space-x-2 sm:space-x-4 mb-4 sm:mb-6">
                  <div className="w-8 sm:w-16 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent"></div>
                  <div className="text-2xl sm:text-4xl animate-pulse">🕉️</div>
                  <div className="w-8 sm:w-16 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent"></div>
                </div>

                <h3 className="text-2xl sm:text-3xl md:text-5xl font-black text-orange-800 mb-2 sm:mb-4 animate-fade-in-up tracking-wide">
                  पावन निमंत्रण
                </h3>
                <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-2">
                  Sacred Invitation
                </p>

                <div className="text-xl sm:text-2xl md:text-4xl font-black bg-gradient-to-r from-orange-600 via-red-600 to-yellow-600 bg-clip-text text-transparent mt-2 sm:mt-4">
                  {familyData.familyName}
                </div>
                <div className="text-lg sm:text-xl md:text-2xl font-bold text-orange-700 mt-1">
                  {familyData.familyNameHindi}
                </div>

                <div className="flex justify-center space-x-3 sm:space-x-6 mt-4 sm:mt-6 text-xl sm:text-3xl">
                  {["🙏", "🌺", "🕉️", "🌺", "🙏"].map((symbol, i) => (
                    <span
                      key={i}
                      className="animate-bounce"
                      style={{ animationDelay: `${i * 0.3}s` }}
                    >
                      {symbol}
                    </span>
                  ))}
                </div>
              </div>

              {/* Sacred Image Sections - Mobile stacked layout */}
              <div className="">
                {/* Sacred Ganesha Murti Section */}
                <div className="group">
                  <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl">
                    {/* Divine Aura */}
                    <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-orange-400/40 via-yellow-400/40 to-red-400/40 rounded-2xl sm:rounded-3xl blur-sm sm:blur-lg opacity-0 group-hover:opacity-100 transition-all duration-700"></div>

                    <div className="relative w-full h-48 sm:h-64 md:h-80 bg-gradient-to-br from-orange-200 via-yellow-200 to-red-200 flex items-center justify-center border-2 sm:border-4 border-orange-400/50 group-hover:scale-[1.02] sm:group-hover:scale-105 transition-transform duration-700 rounded-xl sm:rounded-2xl">
                      <div className="text-center">
                        <div
                          className="text-5xl sm:text-7xl md:text-9xl mb-2 sm:mb-4 animate-bounce"
                          style={{ animationDuration: "3s" }}
                        >
                          🙏🏻
                        </div>
                        <div className="bg-white/90 rounded-lg sm:rounded-xl p-2 sm:p-4 mx-2 sm:mx-4">
                          <p className="text-base sm:text-lg md:text-xl font-bold text-orange-800">
                            {familyData.familyName} की पूजा
                          </p>
                          <p className="text-sm sm:text-base md:text-lg font-semibold text-orange-700"></p>
                          <p className="text-xs sm:text-sm text-gray-600 mt-1">
                            {familyData.poojaDate}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      className="absolute top-2 sm:top-4 left-2 sm:left-4 animate-spin text-lg sm:text-3xl"
                      style={{ animationDuration: "5s" }}
                    >
                      🕉️
                    </div>
                    <div className="absolute top-2 sm:top-4 right-2 sm:right-4 animate-pulse text-base sm:text-2xl">
                      ⭐
                    </div>
                    <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 animate-bounce text-lg sm:text-3xl">
                      🪔
                    </div>
                  </div>
                  <p className="mt-2 sm:mt-4 text-base sm:text-lg md:text-xl font-bold text-orange-700 text-center animate-fade-in-up">
                    हमारे प्रिय बप्पा • Our Beloved Bappa
                  </p>
                </div>
              </div>

              {/* Sacred Event Details - Mobile optimized */}
              <div className="bg-gradient-to-r from-orange-100/80 via-yellow-100/80 to-red-100/80 rounded-2xl sm:rounded-3xl p-4 sm:p-8 mb-6 sm:mb-8 border-2 sm:border-3 border-orange-300/50 backdrop-blur-sm">
                <div className="text-center mb-4 sm:mb-6">
                  <h4 className="text-xl sm:text-2xl md:text-3xl font-black text-orange-800 mb-1 sm:mb-2">
                    उत्सव विवरण
                  </h4>
                  <p className="text-base sm:text-lg md:text-xl text-gray-700">
                    Sacred Celebration Details
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                  <div className="flex items-center space-x-3 sm:space-x-4 animate-slide-in-left">
                    <div className="bg-orange-500 p-2 sm:p-3 rounded-full">
                      <Calendar className="w-5 h-5 sm:w-8 sm:h-8 text-white animate-pulse" />
                    </div>
                    <div>
                      <p className="font-black text-gray-800 text-sm sm:text-base md:text-lg">
                        पावन तिथि • Sacred Date
                      </p>
                      <p className="text-orange-800 font-bold text-base sm:text-lg md:text-xl">
                        {familyData.eventDate}
                      </p>
                      <p className="text-orange-700 font-semibold text-sm sm:text-base">
                        {familyData.eventTimeHindi} • {familyData.eventTime}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 sm:space-x-4 animate-slide-in-right">
                    <div className="bg-red-500 p-2 sm:p-3 rounded-full">
                      <Clock className="w-5 h-5 sm:w-8 sm:h-8 text-white animate-pulse" />
                    </div>
                    <div>
                      <p className="font-black text-gray-800 text-sm sm:text-base md:text-lg">
                        उत्सव अवधि • Duration
                      </p>
                      <p className="text-red-800 font-bold text-base sm:text-lg md:text-xl">
                        {familyData.untilDay} दिन • {familyData.untilDay} Days
                        Festival
                      </p>
                      <p className="text-red-700 font-semibold text-sm sm:text-base">
                        विसर्जन: {familyData.immersionDate}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sacred Address - Mobile optimized */}
              <div className="bg-gradient-to-r from-red-100/80 via-orange-100/80 to-yellow-100/80 rounded-2xl sm:rounded-3xl p-4 sm:p-8 mb-6 sm:mb-8 border-2 sm:border-3 border-red-300/50">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="bg-red-500 p-2 sm:p-4 rounded-full animate-bounce flex-shrink-0">
                    <MapPin className="w-5 h-5 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div>
                    <p className="font-black text-gray-800 text-lg sm:text-xl md:text-2xl mb-2 sm:mb-4">
                      पावन स्थान • Sacred Address
                    </p>
                    <div className="text-red-800 font-bold text-base sm:text-lg md:text-xl space-y-1">
                      <p>{familyData.address.line1Hindi}</p>
                      <p>{familyData.address.line1}</p>
                      <p>
                        {familyData.address.line2Hindi} •{" "}
                        {familyData.address.line2}
                      </p>
                      <p>
                        {familyData.address.areaHindi} •{" "}
                        {familyData.address.area}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Custom Message Section */}
              {familyData.customMessage && (
                <div className="bg-gradient-to-r from-yellow-100/80 via-orange-100/80 to-red-100/80 rounded-2xl sm:rounded-3xl p-4 sm:p-8 mb-6 sm:mb-8 border-2 sm:border-3 border-yellow-300/50">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl mb-4 animate-pulse">
                      ✨
                    </div>
                    <p className="text-lg sm:text-xl font-bold text-orange-800 mb-2">
                      {familyData.customMessageHindi}
                    </p>
                    <p className="text-base sm:text-lg font-semibold text-gray-700">
                      {familyData.customMessage}
                    </p>
                  </div>
                </div>
              )}

              {/* Enhanced Contact Section with WhatsApp - Mobile optimized */}
              <div className="space-y-4 sm:space-y-6">
                <div className="text-center">
                  <h4 className="text-xl sm:text-2xl font-black text-orange-800 mb-2 sm:mb-4">
                    संपर्क • Contact Us
                  </h4>
                </div>

                {/* Contact Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {familyData.contacts.map((contact, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-4 border-2 border-orange-300/50 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className="text-center space-y-2 sm:space-y-3">
                        <div className="text-lg sm:text-xl font-bold text-orange-800">
                          {contact.name}
                        </div>
                        <div className="text-sm sm:text-base text-gray-600 font-semibold">
                          {contact.relation}
                        </div>

                        <div className="flex flex-col space-y-2 sm:space-y-3">
                          {/* Phone Number */}
                          <div className="flex items-center justify-center space-x-2 bg-white/80 rounded-lg p-2">
                            <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                            <span className="text-sm sm:text-base font-bold text-gray-800">
                              +91 {contact.number}
                            </span>
                          </div>

                          {/* WhatsApp Button */}
                          <button
                            onClick={() => handleWhatsAppClick(contact)}
                            className="flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 sm:py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
                          >
                            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="text-sm sm:text-base">
                              WhatsApp पर संदेश
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Alternative Contact Info */}
                <div className="text-center">
                  <div className="inline-flex items-center space-x-2 sm:space-x-4 bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 text-white px-4 sm:px-8 py-3 sm:py-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] sm:hover:scale-110 animate-pulse border-2 border-yellow-300">
                    <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 animate-pulse" />
                    <span className="font-black text-sm sm:text-base md:text-xl">
                      {` आपका स्वागत है • You're Welcome`}
                    </span>
                    <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Divine Blessings - Mobile optimized */}
              <div className="text-center mt-8 sm:mt-12 space-y-4 sm:space-y-6">
                <div className="text-2xl sm:text-3xl md:text-4xl font-black text-orange-700 animate-pulse">
                  गणेशाय नमः • श्री गणेशाय नमः
                </div>
                <div className="text-base sm:text-lg md:text-2xl text-gray-700 font-bold italic px-2">
                  {`  "Come join us in the divine celebration of our beloved Lord
                  Ganesha"`}
                </div>
                <div className="text-sm sm:text-base md:text-xl text-orange-600 font-semibold px-2">
                  आपकी उपस्थिति से हमारे उत्सव को और भी पावन बनाएं
                </div>

                {/* Animated Blessing Symbols - Mobile optimized */}
                <div className="flex justify-center flex-wrap gap-2 sm:gap-4 mt-6 sm:mt-8 text-2xl sm:text-3xl md:text-4xl">
                  {["🙏", "🕉️", "🌺", "🪔", "⭐", "🪔", "🌺", "🕉️", "🙏"].map(
                    (symbol, i) => (
                      <span
                        key={i}
                        className="animate-bounce hover:animate-pulse cursor-pointer transition-all duration-300 hover:scale-125"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      >
                        {symbol}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sacred Footer - Mobile optimized */}
        <div className="text-center mt-12 sm:mt-20 space-y-4 sm:space-y-8">
          <div className="text-2xl sm:text-3xl md:text-5xl font-black bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent animate-pulse px-2 pt-10">
            गणपति बप्पा मोरया • मंगलमूर्ति मोरया
          </div>

          <div className="text-base sm:text-lg md:text-2xl text-yellow-200 font-bold">
            विघ्नहर्ता • सिद्धिदाता • मंगलकर्ता
          </div>

          <div className="flex justify-center flex-wrap gap-2 sm:gap-4 md:gap-8 text-3xl sm:text-4xl md:text-5xl">
            {["🌺", "🪔", "🕉️", "🐘", "🕉️", "🪔", "🌺"].map((symbol, i) => (
              <span
                key={i}
                className="animate-pulse hover:animate-bounce cursor-pointer transition-all duration-300 hover:scale-150 hover:rotate-12"
                style={{ animationDelay: `${i * 0.3}s` }}
              >
                {symbol}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Custom Animations with Mobile Optimizations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes divine-glow {
          0%,
          100% {
            box-shadow: 0 0 15px rgba(255, 165, 0, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(255, 69, 0, 0.6),
              0 0 45px rgba(255, 165, 0, 0.4);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 1.5s ease-out forwards;
        }
        .animate-slide-in-left {
          animation: slide-in-left 1.2s ease-out forwards;
        }
        .animate-slide-in-right {
          animation: slide-in-right 1.2s ease-out forwards;
        }

        .hover\\:shadow-3xl:hover {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        .border-3 {
          border-width: 3px;
        }

        /* Mobile-specific optimizations */
        @media (max-width: 640px) {
          .animate-bounce {
            animation-duration: 2s;
          }

          .animate-spin {
            animation-duration: 8s;
          }

          .animate-pulse {
            animation-duration: 3s;
          }
        }

        /* Ensure text is always readable */
        @media (max-width: 480px) {
          .bg-clip-text {
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          /* Fallback for older browsers */
          @supports not (-webkit-background-clip: text) {
            .bg-clip-text {
              color: #f59e0b;
            }
          }
        }

        /* Improve touch targets on mobile */
        @media (hover: none) and (pointer: coarse) {
          button,
          .cursor-pointer {
            min-height: 44px;
            min-width: 44px;
          }
        }

        /* Reduce motion for users who prefer it */
        @media (prefers-reduced-motion: reduce) {
          .animate-spin,
          .animate-bounce,
          .animate-pulse,
          .animate-ping {
            animation: none;
          }
        }

        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          .bg-white\\/95 {
            background: rgba(255, 255, 255, 0.98);
          }
        }
      `}</style>
    </div>
  );
};

export default DynamicGaneshInvitation;
