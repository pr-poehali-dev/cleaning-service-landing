import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 flex justify-between items-center max-w-full">
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          <Icon name="Sparkles" size={24} className="text-primary flex-shrink-0 sm:w-7 sm:h-7" />
          <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 truncate">Чистый Стандарт</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 md:gap-6 flex-shrink-0">
          <a href="tel:+79521301560" className="text-xs sm:text-sm md:text-lg font-semibold text-primary hover:text-primary/80 transition-colors flex items-center gap-1 md:gap-2">
            <Icon name="Phone" size={16} className="sm:w-[18px] sm:h-[18px] md:w-5 md:h-5 flex-shrink-0" />
            <span className="hidden xs:inline whitespace-nowrap">+7 (952) 130-15-60</span>
            <span className="xs:hidden">Звонок</span>
          </a>
          <Button size="lg" className="hidden md:inline-flex">Заказать расчет</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;