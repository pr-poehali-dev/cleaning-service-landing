import Icon from "@/components/ui/icon";
import ScrollAnimation from "@/components/ScrollAnimation";

const HowWeWorkSection = () => {
  return (
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
  );
};

export default HowWeWorkSection;
