import { Button } from "@/components/ui/button";
import ScrollAnimation from "@/components/ScrollAnimation";

const BeforeAfterSection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-blue-50/50">
      <div className="container mx-auto max-w-6xl">
        <ScrollAnimation animation="fade-in">
          <h2 className="text-4xl font-bold text-center mb-4">Наши результаты</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">До и после работы наших специалистов</p>
        </ScrollAnimation>
        
        <div className="space-y-12">
          <ScrollAnimation animation="fade-in-left">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="relative group">
                <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg z-10">
                  До
                </div>
                <img
                  src="https://cdn.poehali.dev/projects/7b020bdc-b98e-4013-96c3-54c7a0a75138/files/71b5b281-9663-47d5-861e-0478308e4577.jpg"
                  alt="До уборки"
                  className="rounded-2xl shadow-lg w-full h-[300px] object-cover"
                />
              </div>
              <div className="relative group">
                <div className="absolute top-4 left-4 bg-green-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg z-10">
                  После
                </div>
                <img
                  src="https://cdn.poehali.dev/projects/7b020bdc-b98e-4013-96c3-54c7a0a75138/files/5d53d20d-a6bb-49ee-b09a-e660562a64d6.jpg"
                  alt="После уборки"
                  className="rounded-2xl shadow-lg w-full h-[300px] object-cover"
                />
              </div>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animation="fade-in-right">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="relative group order-2 md:order-1">
                <div className="absolute top-4 left-4 bg-green-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg z-10">
                  После
                </div>
                <img
                  src="https://cdn.poehali.dev/projects/7b020bdc-b98e-4013-96c3-54c7a0a75138/files/d9b7b56a-ffcf-4e86-bf91-e5ee6d9b1df9.jpg"
                  alt="После уборки кухни"
                  className="rounded-2xl shadow-lg w-full h-[300px] object-cover"
                />
              </div>
              <div className="relative group order-1 md:order-2">
                <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg z-10">
                  До
                </div>
                <img
                  src="https://cdn.poehali.dev/projects/7b020bdc-b98e-4013-96c3-54c7a0a75138/files/18aac747-5f77-4c8c-b7f5-a12e003952b5.jpg"
                  alt="До уборки кухни"
                  className="rounded-2xl shadow-lg w-full h-[300px] object-cover"
                />
              </div>
            </div>
          </ScrollAnimation>
        </div>

        <ScrollAnimation animation="fade-in">
          <div className="text-center mt-12">
            <p className="text-xl text-gray-700 mb-6 font-semibold">Убедитесь сами в качестве нашей работы!</p>
            <Button size="lg" className="text-lg px-8 py-6" onClick={() => document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" })}>
              Рассчитать стоимость
            </Button>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
