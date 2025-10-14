import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Icon name="Sparkles" size={28} className="text-primary" />
          <span className="text-2xl font-bold text-gray-900">Чистый Стандарт</span>
        </div>
        <div className="flex items-center gap-3 md:gap-6">
          <a href="tel:+78001234567" className="text-sm md:text-lg font-semibold text-primary hover:text-primary/80 transition-colors flex items-center gap-1 md:gap-2">
            <Icon name="Phone" size={18} className="md:w-5 md:h-5" />
            <span className="whitespace-nowrap">+7 (952) 130-1560</span>
          </a>
          <Button size="lg" className="hidden md:inline-flex">Заказать расчет</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;