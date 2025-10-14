import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Icon name="Sparkles" size={28} className="text-primary" />
              <span className="text-xl font-bold">Чистый Стандарт</span>
            </div>
            <p className="text-gray-400 text-sm">Профессиональный клининг для вашего дома и офиса</p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Контакты</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <p className="flex items-center gap-2">+7 (952) 130-15-60</p>
              <p className="flex items-center gap-2">
                <Icon name="Mail" size={16} />
                info@cleanstandard.ru
              </p>
              <p className="flex items-center gap-2">
                <Icon name="MapPin" size={16} />
                г. Москва, ул. Примерная, 123
              </p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">График работы</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <p>Пн-Пт: 08:00 - 20:00</p>
              <p>Сб-Вс: 09:00 - 18:00</p>
              <p className="text-primary font-semibold mt-3">Звоните прямо сейчас!</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Мы в соцсетях</h3>
            <div className="flex gap-4">
              <Button variant="outline" size="icon" className="rounded-full bg-white/10 border-white/20 hover:bg-white/20">
                <Icon name="MessageCircle" size={20} />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full bg-white/10 border-white/20 hover:bg-white/20">
                <Icon name="Instagram" size={20} />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full bg-white/10 border-white/20 hover:bg-white/20">
                <Icon name="Send" size={20} />
              </Button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>© 2025 Чистый Стандарт. Все права защищены.</p>
          <p className="mt-2">
            <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;