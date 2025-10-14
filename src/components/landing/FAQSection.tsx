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
  );
};

export default FAQSection;
