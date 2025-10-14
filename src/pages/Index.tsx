import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";
import ScrollAnimation from "@/components/ScrollAnimation";

const Index = () => {
  const { toast } = useToast();
  const [area, setArea] = useState([50]);
  const [roomType, setRoomType] = useState("");
  const [extras, setExtras] = useState({
    windows: false,
    balcony: false,
    carpet: false,
  });
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);

  const calculatePrice = () => {
    let basePrice = 0;
    if (roomType === "apartment") basePrice = area[0] * 50;
    if (roomType === "house") basePrice = area[0] * 60;
    if (roomType === "office") basePrice = area[0] * 45;

    if (extras.windows) basePrice += 1500;
    if (extras.balcony) basePrice += 800;
    if (extras.carpet) basePrice += 2000;

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
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Icon name="Sparkles" size={28} className="text-primary" />
            <span className="text-2xl font-bold text-gray-900">Чистый Стандарт</span>
          </div>
          <div className="flex items-center gap-3 md:gap-6">
            <a href="tel:+78001234567" className="text-sm md:text-lg font-semibold text-primary hover:text-primary/80 transition-colors flex items-center gap-1 md:gap-2">
              <Icon name="Phone" size={18} className="md:w-5 md:h-5" />
              <span className="whitespace-nowrap">+7 (800) 123-45-67</span>
            </a>
            <Button size="lg" className="hidden md:inline-flex">Заказать расчет</Button>
          </div>
        </div>
      </header>

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight text-gray-900">
                Идеальная чистота без ваших усилий
              </h1>
              <p className="text-xl text-gray-600">
                Профессиональный клининг для вашего дома и офиса. Вернем вам время для самого важного.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="text-lg px-8 py-6" onClick={() => document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" })}>
                  Рассчитать стоимость
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                  Позвонить нам
                </Button>
              </div>
            </div>
            <div className="relative animate-fade-in">
              <img
                src="https://cdn.poehali.dev/projects/7b020bdc-b98e-4013-96c3-54c7a0a75138/files/579091d1-00e0-4d02-bf23-56149a81448a.jpg"
                alt="Профессиональный клининг"
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mt-16">
            {[
              { icon: "Shield", title: "Проверенные сотрудники", desc: "Все клинеры проходят строгий отбор" },
              { icon: "Sparkles", title: "Профессиональные средства", desc: "Безопасная химия и оборудование" },
              { icon: "CheckCircle", title: "Гарантия качества", desc: "Переделаем бесплатно при необходимости" },
              { icon: "Calendar", title: "Уборка по графику", desc: "Регулярное обслуживание в удобное время" },
            ].map((item, idx) => (
              <ScrollAnimation key={idx} animation="scale-in" delay={idx * 100}>
                <Card className="border-none shadow-md hover:shadow-lg transition-all hover:-translate-y-1 h-full">
                  <CardHeader className="h-full flex flex-col">
                    <Icon name={item.icon} size={40} className="text-primary mb-2" />
                    <CardTitle className="text-lg mb-2">{item.title}</CardTitle>
                    <CardDescription className="flex-grow">{item.desc}</CardDescription>
                  </CardHeader>
                </Card>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <ScrollAnimation animation="fade-in">
            <h2 className="text-4xl font-bold text-center mb-4">Наши услуги</h2>
            <p className="text-center text-gray-600 mb-12 text-lg">Выберите подходящий тип уборки</p>
          </ScrollAnimation>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "Home", title: "Генеральная уборка", desc: "Глубокая уборка всех помещений", price: "от 3000₽" },
              { icon: "Repeat", title: "Поддерживающая уборка", desc: "Регулярная поддержка чистоты", price: "от 2000₽" },
              { icon: "Wind", title: "Мытье окон", desc: "Профессиональная мойка окон", price: "от 1500₽" },
              { icon: "Hammer", title: "Уборка после ремонта", desc: "Устранение строительной пыли", price: "от 5000₽" },
            ].map((service, idx) => (
              <ScrollAnimation key={idx} animation="fade-in" delay={idx * 100}>
                <Card className="cursor-pointer hover:shadow-xl transition-all hover:-translate-y-2 border-2 border-transparent hover:border-primary h-full flex flex-col">
                  <CardHeader className="flex-grow flex flex-col">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <Icon name={service.icon} size={32} className="text-primary" />
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription className="min-h-[48px] flex-grow">{service.desc}</CardDescription>
                    <p className="text-2xl font-bold text-primary mt-4">{service.price}</p>
                  </CardHeader>
                </Card>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-b from-blue-50/50 to-white">
        <div className="container mx-auto max-w-4xl">
          <ScrollAnimation animation="fade-in">
            <h2 className="text-4xl font-bold text-center mb-4">Как мы работаем</h2>
            <p className="text-center text-gray-600 mb-12 text-lg">Простой процесс от заявки до идеального результата</p>
          </ScrollAnimation>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { num: "1", icon: "PhoneCall", title: "Заявка", desc: "Оставьте заявку на сайте или позвоните" },
              { num: "2", icon: "Calculator", title: "Расчет", desc: "Бесплатный расчет стоимости за 5 минут" },
              { num: "3", icon: "Users", title: "Выполнение", desc: "Наши специалисты приедут в удобное время" },
              { num: "4", icon: "Star", title: "Результат", desc: "Наслаждайтесь идеальной чистотой" },
            ].map((step, idx) => (
              <ScrollAnimation key={idx} animation="scale-in" delay={idx * 150}>
                <div className="text-center relative">
                  <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                    {step.num}
                  </div>
                  <Icon name={step.icon} size={32} className="text-primary mx-auto mb-3" />
                  <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.desc}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      <section id="calculator" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-3xl">
          <ScrollAnimation animation="fade-in">
            <h2 className="text-4xl font-bold text-center mb-4">Калькулятор стоимости</h2>
            <p className="text-center text-gray-600 mb-12 text-lg">Рассчитайте примерную стоимость уборки</p>
          </ScrollAnimation>
          <ScrollAnimation animation="scale-in">
            <Card className="shadow-xl border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Calculator" size={24} />
                Параметры помещения
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="room-type">Тип помещения</Label>
                <Select onValueChange={setRoomType}>
                  <SelectTrigger id="room-type">
                    <SelectValue placeholder="Выберите тип помещения" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Квартира</SelectItem>
                    <SelectItem value="house">Дом</SelectItem>
                    <SelectItem value="office">Офис</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label>Площадь: {area[0]} м²</Label>
                <Slider
                  value={area}
                  onValueChange={setArea}
                  min={20}
                  max={200}
                  step={5}
                  className="w-full"
                />
              </div>

              <div className="space-y-3">
                <Label>Дополнительные услуги</Label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="windows"
                      checked={extras.windows}
                      onCheckedChange={(checked) => setExtras({ ...extras, windows: checked as boolean })}
                    />
                    <label htmlFor="windows" className="text-sm font-medium cursor-pointer">
                      Мытье окон (+1500₽)
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="balcony"
                      checked={extras.balcony}
                      onCheckedChange={(checked) => setExtras({ ...extras, balcony: checked as boolean })}
                    />
                    <label htmlFor="balcony" className="text-sm font-medium cursor-pointer">
                      Уборка балкона (+800₽)
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="carpet"
                      checked={extras.carpet}
                      onCheckedChange={(checked) => setExtras({ ...extras, carpet: checked as boolean })}
                    />
                    <label htmlFor="carpet" className="text-sm font-medium cursor-pointer">
                      Химчистка ковра (+2000₽)
                    </label>
                  </div>
                </div>
              </div>

              {calculatedPrice !== null && (
                <div className="bg-primary/10 p-6 rounded-lg border-2 border-primary animate-fade-in">
                  <p className="text-sm text-gray-600 mb-1">Примерная стоимость</p>
                  <p className="text-4xl font-bold text-primary">{calculatedPrice}₽</p>
                </div>
              )}

              <Button onClick={calculatePrice} size="lg" className="w-full text-lg" disabled={!roomType}>
                Рассчитать стоимость
              </Button>
            </CardContent>
          </Card>
          </ScrollAnimation>
        </div>
      </section>

      <section id="order-form" className="py-20 px-4 bg-gradient-to-b from-white to-blue-50/50">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-4xl font-bold text-center mb-4">Заказать уборку</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">Оставьте заявку, и мы свяжемся с вами в течение 15 минут</p>
          <Card className="shadow-xl border-2">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Ваше имя *</Label>
                  <Input id="name" placeholder="Иван Иванов" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон *</Label>
                  <Input id="phone" type="tel" placeholder="+7 (999) 123-45-67" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" type="email" placeholder="example@mail.ru" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="comment">Комментарий</Label>
                  <Textarea
                    id="comment"
                    placeholder="Укажите адрес, тип уборки и удобное время"
                    rows={4}
                  />
                </div>
                {calculatedPrice && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Рассчитанная стоимость</p>
                    <p className="text-2xl font-bold text-primary">{calculatedPrice}₽</p>
                  </div>
                )}
                <div className="flex items-start space-x-2">
                  <Checkbox id="terms" required />
                  <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
                    Я согласен на обработку персональных данных и принимаю политику конфиденциальности
                  </label>
                </div>
                <Button type="submit" size="lg" className="w-full text-lg">
                  Заказать уборку
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <ScrollAnimation animation="fade-in">
            <h2 className="text-4xl font-bold text-center mb-4">Отзывы клиентов</h2>
            <p className="text-center text-gray-600 mb-12 text-lg">Что говорят о нас наши клиенты</p>
          </ScrollAnimation>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Елена Смирнова",
                text: "Отличная команда! Сделали генеральную уборку после ремонта. Все блестит, даже в самых труднодоступных местах. Рекомендую!",
                rating: 5,
              },
              {
                name: "Дмитрий Петров",
                text: "Пользуюсь услугами регулярной уборки уже полгода. Всегда приходят вовремя, работают аккуратно. Очень доволен качеством!",
                rating: 5,
              },
              {
                name: "Анна Козлова",
                text: "Заказывала мытье окон в трехкомнатной квартире. Справились за 2 часа, окна просто сияют! Цена честная, без накруток.",
                rating: 5,
              },
            ].map((review, idx) => (
              <ScrollAnimation key={idx} animation="fade-in" delay={idx * 100}>
                <Card className="shadow-md hover:shadow-lg transition-shadow h-full">
                  <CardContent className="pt-6">
                    <div className="flex gap-1 mb-4">
                      {[...Array(review.rating)].map((_, i) => (
                        <Icon key={i} name="Star" size={20} className="text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4 italic">"{review.text}"</p>
                    <p className="font-semibold text-gray-900">{review.name}</p>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-blue-50/50">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-4xl font-bold text-center mb-4">Частые вопросы</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">Ответы на популярные вопросы</p>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-white rounded-lg px-6 border shadow-sm">
              <AccordionTrigger className="text-left font-semibold">
                Как рассчитывается стоимость уборки?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Стоимость зависит от площади помещения, типа уборки и дополнительных услуг. Базовая ставка: 50₽/м² для
                квартир, 60₽/м² для домов, 45₽/м² для офисов. Точную стоимость мы рассчитаем бесплатно после осмотра.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="bg-white rounded-lg px-6 border shadow-sm">
              <AccordionTrigger className="text-left font-semibold">
                Какие средства вы используете?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Мы используем только профессиональную химию европейских брендов: Karcher, Ecover, Frosch. Все средства
                безопасны для детей и животных, гипоаллергенны и экологичны.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="bg-white rounded-lg px-6 border shadow-sm">
              <AccordionTrigger className="text-left font-semibold">
                Нужно ли мне быть дома во время уборки?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Нет, ваше присутствие необязательно. Многие наши клиенты передают ключи или код от замка. Все наши
                сотрудники застрахованы и проходят проверку службой безопасности.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="bg-white rounded-lg px-6 border shadow-sm">
              <AccordionTrigger className="text-left font-semibold">
                Что делать с ценными вещами?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Рекомендуем убрать ценные вещи, документы и деньги в недоступное место. Хотя наши сотрудники проверены,
                это стандартная мера предосторожности для вашего спокойствия.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

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
                <p className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  +7 (800) 123-45-67
                </p>
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
            <p>© 2024 Чистый Стандарт. Все права защищены.</p>
            <p className="mt-2">
              <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
            </p>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <a
          href="https://wa.me/78001234567"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:scale-110 transition-all flex items-center justify-center group hover:shadow-xl"
          aria-label="WhatsApp"
        >
          <Icon name="MessageCircle" size={28} className="group-hover:scale-110 transition-transform" />
        </a>
        <a
          href="https://t.me/cleanstandard"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-[#0088cc] text-white rounded-full shadow-lg hover:scale-110 transition-all flex items-center justify-center group hover:shadow-xl"
          aria-label="Telegram"
        >
          <Icon name="Send" size={28} className="group-hover:scale-110 transition-transform" />
        </a>
      </div>
    </div>
  );
};

export default Index;