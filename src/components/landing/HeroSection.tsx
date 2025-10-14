import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import ScrollAnimation from "@/components/ScrollAnimation";

const HeroSection = () => {
  return (
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
            { icon: "Briefcase", title: "Работаем с ЮЛ и ФЛ", desc: "Обслуживаем юридические и физические лица" },
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
  );
};

export default HeroSection;
