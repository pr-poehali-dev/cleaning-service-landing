import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import ScrollAnimation from "@/components/ScrollAnimation";

const TestimonialsSection = () => {
  return (
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
  );
};

export default TestimonialsSection;
