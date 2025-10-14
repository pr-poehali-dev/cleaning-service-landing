import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import ScrollAnimation from "@/components/ScrollAnimation";

const ServicesSection = () => {
  return (
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
  );
};

export default ServicesSection;
