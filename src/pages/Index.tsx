import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import ServicesSection from "@/components/landing/ServicesSection";
import HowWeWorkSection from "@/components/landing/HowWeWorkSection";
import CalculatorSection from "@/components/landing/CalculatorSection";
import SubscriptionSection from "@/components/landing/SubscriptionSection";
import OrderFormSection from "@/components/landing/OrderFormSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import FAQSection from "@/components/landing/FAQSection";
import SEOTextSection from "@/components/landing/SEOTextSection";
import Footer from "@/components/landing/Footer";
import MessengerWidgets from "@/components/landing/MessengerWidgets";

const Index = () => {
  const { toast } = useToast();
  const [area, setArea] = useState([50]);
  const [roomType, setRoomType] = useState("");
  const [cleaningType, setCleaningType] = useState("");
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
    const pricePerMeter = cleaningType === 'regular' ? 160 : cleaningType === 'general' ? 200 : 180;
    let basePrice = area[0] * pricePerMeter;

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
      comment: formData.get('comment') as string,
      marketingConsent: formData.get('marketing') === 'on',
      calculatedPrice: calculatedPrice,
      selectedExtras: extras,
      customServices: customServices,
      area: area[0],
      roomType: roomType,
      cleaningType: cleaningType
    };

    try {
      const response = await fetch('https://functions.poehali.dev/a3379f3c-450e-4abb-b46d-02d76d0c1f80', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Заявка отправлена!",
          description: "Мы свяжемся с вами в ближайшее время.",
        });
        (e.target as HTMLFormElement).reset();
      } else {
        toast({
          title: "Ошибка отправки",
          description: result.message || "Попробуйте позже или позвоните нам.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка отправки",
        description: "Проверьте подключение к интернету.",
        variant: "destructive",
      });
    }
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
        cleaningType={cleaningType}
        setCleaningType={setCleaningType}
        extras={extras}
        setExtras={setExtras}
        calculatedPrice={calculatedPrice}
        calculatePrice={calculatePrice}
        customServices={customServices}
        setCustomServices={setCustomServices}
      />
      <SubscriptionSection />
      <OrderFormSection 
        calculatedPrice={calculatedPrice} 
        handleSubmit={handleSubmit}
        customServices={customServices}
        selectedExtras={extras}
      />
      <TestimonialsSection />
      <FAQSection />
      <SEOTextSection />
      <Footer />
      <MessengerWidgets />
    </div>
  );
};

export default Index;