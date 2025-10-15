import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQSection = () => {
  return (
    <section className="py-20 px-4 bg-blue-50/50">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-4xl font-bold text-center mb-4">Частые вопросы</h2>
        <p className="text-center text-gray-600 mb-12 text-lg">Ответы на популярные вопросы</p>
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="item-1" className="bg-white rounded-lg px-6 border shadow-sm">
            <AccordionTrigger className="text-left font-semibold">
              Сколько стоит уборка квартиры в Екатеринбурге?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              Стоимость уборки в Екатеринбурге зависит от типа уборки и площади: поддерживающая уборка — от 160₽/м², генеральная — от 200₽/м², 
              после ремонта — от 180₽/м². При заказе абонемента действуют скидки до 30%. Точную цену рассчитайте в калькуляторе выше.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="bg-white rounded-lg px-6 border shadow-sm">
            <AccordionTrigger className="text-left font-semibold">
              В какие районы Екатеринбурга вы выезжаете?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              Наша клининговая компания работает во всех районах Екатеринбурга: Центр, Академический, Юго-Западный, Верх-Исетский, 
              Кировский, Ленинский, Октябрьский, Орджоникидзевский, Чкаловский. Выезд клинера — бесплатно!
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="bg-white rounded-lg px-6 border shadow-sm">
            <AccordionTrigger className="text-left font-semibold">
              Как быстро можете приехать на уборку в Екатеринбурге?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              Работаем 24/7 без выходных. При срочном заказе можем приехать в течение 2-3 часов. Обычно согласуем удобное для вас время — 
              можем выполнить уборку утром, днем, вечером или ночью. Звоните: +7 (952) 130-15-60.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4" className="bg-white rounded-lg px-6 border shadow-sm">
            <AccordionTrigger className="text-left font-semibold">
              Какие средства вы используете для уборки?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              Используем только профессиональную химию европейских брендов: Karcher, Ecover, Frosch. Все средства безопасны 
              для детей и животных, гипоаллергенны и экологичны. Профессиональное оборудование привозим с собой.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5" className="bg-white rounded-lg px-6 border shadow-sm">
            <AccordionTrigger className="text-left font-semibold">
              Нужно ли мне быть дома во время уборки?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              Нет, ваше присутствие необязательно. Многие клиенты в Екатеринбурге передают ключи или код от замка. 
              Все наши клинеры застрахованы и проходят проверку службой безопасности. Гарантируем сохранность имущества.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6" className="bg-white rounded-lg px-6 border shadow-sm">
            <AccordionTrigger className="text-left font-semibold">
              Что включает генеральная уборка квартиры?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              Генеральная уборка в Екатеринбурге включает: влажную уборку всех поверхностей, мытье полов, окон изнутри, 
              чистку сантехники, мебели, бытовой техники, люстр, вынос мусора. Дополнительно можем почистить ковры, 
              помыть окна снаружи и балкон.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;