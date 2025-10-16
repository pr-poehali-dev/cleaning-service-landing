import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import ScrollAnimation from "@/components/ScrollAnimation";

const HeroSection = () => {
  return (
    <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4">
      <div className="container mx-auto max-w-full">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="space-y-4 sm:space-y-6 animate-fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
              Клининг в Екатеринбурге от 160₽/м²
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              Профессиональная уборка квартир и офисов в Екатеринбурге. Работаем 24/7. Гарантия качества. Абонементы со скидкой до 30%.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 w-full sm:w-auto" onClick={() => document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" })}>
                Рассчитать стоимость
              </Button>
              <Button size="lg" variant="outline" className="text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 w-full sm:w-auto">
                Позвонить нам
              </Button>
            </div>
          </div>
          <div className="relative animate-fade-in">
            <img
              src="https://cdn.poehali.dev/projects/7b020bdc-b98e-4013-96c3-54c7a0a75138/files/579091d1-00e0-4d02-bf23-56149a81448a.jpg"
              alt="Профессиональный клининг"
              className="rounded-2xl shadow-2xl w-full max-w-full h-auto"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-12 sm:mt-16">
          {[
            { icon: "Shield", title: "Проверенные сотрудники", desc: "Все клинеры проходят строгий отбор" },
            { icon: "Sparkles", title: "Профессиональные средства", desc: "Безопасная химия и оборудование" },
            { icon: "CheckCircle", title: "Гарантия качества", desc: "Переделаем бесплатно при необходимости" },
            { icon: "Briefcase", title: "Работаем с ЮЛ и ФЛ", desc: "Обслуживаем юридические и физические лица" },
          ].map((item, idx) => (
            <ScrollAnimation key={idx} animation="scale-in" delay={idx * 100}>
              <Card className="border-none shadow-md hover:shadow-lg transition-all hover:-translate-y-1 h-full">
                <CardHeader className="h-full flex flex-col p-4 sm:p-6">
                  <Icon name={item.icon} size={32} className="text-primary mb-2 sm:w-10 sm:h-10" />
                  <CardTitle className="text-base sm:text-lg mb-2">{item.title}</CardTitle>
                  <CardDescription className="flex-grow text-sm">{item.desc}</CardDescription>
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