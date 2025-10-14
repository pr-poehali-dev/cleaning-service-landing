import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import ServicesSection from "@/components/landing/ServicesSection";
import HowWeWorkSection from "@/components/landing/HowWeWorkSection";
import CalculatorSection from "@/components/landing/CalculatorSection";
import BeforeAfterSection from "@/components/landing/BeforeAfterSection";
import OrderFormSection from "@/components/landing/OrderFormSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import FAQSection from "@/components/landing/FAQSection";
import Footer from "@/components/landing/Footer";
import MessengerWidgets from "@/components/landing/MessengerWidgets";

const Index = () => {
  const { toast } = useToast();
  const [area, setArea] = useState([50]);
  const [roomType, setRoomType] = useState("");
  const [extras, setExtras] = useState({
    windows: false,
    balcony: false,
    carpet: false,
    furniture: false,
    appliances: false,
    chandelier: false,
    afterRepair: false,
    disinfection: false,
  });
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);
  const [customServices, setCustomServices] = useState("");

  const calculatePrice = () => {
    let basePrice = area[0] * 180;

    const extrasPrices: Record<string, number> = {
      windows: 1500,
      balcony: 800,
      carpet: 2500,
      furniture: 3000,
      appliances: 1000,
      chandelier: 1200,
      afterRepair: 5000,
      disinfection: 2000,
    };

    Object.entries(extras).forEach(([key, value]) => {
      if (value) {
        basePrice += extrasPrices[key] || 0;
      }
    });

    setCalculatedPrice(basePrice);
    
    const orderForm = document.getElementById("order-form");
    if (orderForm) {
      orderForm.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Заявка отправлена!",
      description: "Мы свяжемся с вами в ближайшее время.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50/30">
      <Header />
      <HeroSection />
      <ServicesSection />
      <HowWeWorkSection />
      <CalculatorSection
        area={area}
        setArea={setArea}
        roomType={roomType}
        setRoomType={setRoomType}
        extras={extras}
        setExtras={setExtras}
        calculatedPrice={calculatedPrice}
        calculatePrice={calculatePrice}
        customServices={customServices}
        setCustomServices={setCustomServices}
      />
      <BeforeAfterSection />
      <OrderFormSection 
        calculatedPrice={calculatedPrice} 
        handleSubmit={handleSubmit}
        customServices={customServices}
        selectedExtras={extras}
      />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
      <MessengerWidgets />
    </div>
  );
};

export default Index;