import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Icon from "@/components/ui/icon";
import ScrollAnimation from "@/components/ScrollAnimation";

const SubscriptionSection = () => {
  const [area, setArea] = useState([50]);
  const [frequency, setFrequency] = useState("");
  const [duration, setDuration] = useState("");
  const [calculatedPrice, setCalculatedPrice] = useState<{
    pricePerCleaning: number;
    cleaningsPerMonth: number;
    monthlyPrice: number;
    totalPrice: number;
    discount: number;
    discountPercent: number;
  } | null>(null);

  const getDiscountPercent = (freq: string, dur: string) => {
    let discount = 0;
    
    if (freq === '1week') discount = 5;
    else if (freq === '2week') discount = 10;
    else if (freq === '3week') discount = 15;
    
    if (dur === '2m') discount += 3;
    else if (dur === '3m') discount += 5;
    else if (dur === '6m') discount += 10;
    else if (dur === '12m') discount += 15;
    
    return Math.min(discount, 30);
  };

  const getCleaningsPerMonth = (freq: string) => {
    if (freq === '1week') return 4;
    if (freq === '2week') return 8;
    if (freq === '3week') return 12;
    return 0;
  };

  const getDurationMonths = (dur: string) => {
    if (dur === '1m') return 1;
    if (dur === '2m') return 2;
    if (dur === '3m') return 3;
    if (dur === '6m') return 6;
    if (dur === '12m') return 12;
    return 0;
  };

  const calculateSubscription = () => {
    if (!frequency || !duration) return;

    const pricePerMeter = 160;
    const basePrice = area[0] * pricePerMeter;
    
    const discountPercent = getDiscountPercent(frequency, duration);
    const discount = Math.round(basePrice * discountPercent / 100);
    const pricePerCleaning = basePrice - discount;
    
    const cleaningsPerMonth = getCleaningsPerMonth(frequency);
    const monthlyPrice = pricePerCleaning * cleaningsPerMonth;
    const durationMonths = getDurationMonths(duration);
    const totalPrice = monthlyPrice * durationMonths;

    setCalculatedPrice({
      pricePerCleaning,
      cleaningsPerMonth,
      monthlyPrice,
      totalPrice,
      discount,
      discountPercent,
    });

    const orderForm = document.getElementById("order-form");
    if (orderForm) {
      orderForm.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getFrequencyLabel = (freq: string) => {
    if (freq === '1week') return '1 раз в неделю';
    if (freq === '2week') return '2 раза в неделю';
    if (freq === '3week') return '3 раза в неделю';
    return '';
  };

  const getDurationLabel = (dur: string) => {
    if (dur === '1m') return '1 месяц';
    if (dur === '2m') return '2 месяца';
    if (dur === '3m') return '3 месяца';
    if (dur === '6m') return '6 месяцев';
    if (dur === '12m') return '12 месяцев';
    return '';
  };

  return (
    <section id="subscription" className="py-12 sm:py-20 px-4 bg-gradient-to-b from-white to-primary/5">
      <div className="container mx-auto max-w-3xl">
        <ScrollAnimation animation="fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3 sm:mb-4">Абонементы на регулярную уборку</h2>
          <p className="text-center text-gray-600 mb-8 sm:mb-12 text-base sm:text-lg">Выгодные условия при регулярном обслуживании со скидками до 30%</p>
        </ScrollAnimation>
        <ScrollAnimation animation="scale-in">
          <Card className="shadow-xl border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="CalendarCheck" size={24} />
                Расчёт абонемента
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Площадь помещения: {area[0]} м²</Label>
                <Slider
                  value={area}
                  onValueChange={setArea}
                  min={20}
                  max={300}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>20 м²</span>
                  <span>300 м²</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="frequency">Частота уборок</Label>
                <Select onValueChange={setFrequency}>
                  <SelectTrigger id="frequency">
                    <SelectValue placeholder="Выберите частоту" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1week">1 раз в неделю (скидка от 5%)</SelectItem>
                    <SelectItem value="2week">2 раза в неделю (скидка от 10%)</SelectItem>
                    <SelectItem value="3week">3 раза в неделю (скидка от 15%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Срок абонемента</Label>
                <Select onValueChange={setDuration}>
                  <SelectTrigger id="duration">
                    <SelectValue placeholder="Выберите срок" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1m">1 месяц</SelectItem>
                    <SelectItem value="2m">2 месяца (+3% к скидке)</SelectItem>
                    <SelectItem value="3m">3 месяца (+5% к скидке)</SelectItem>
                    <SelectItem value="6m">6 месяцев (+10% к скидке)</SelectItem>
                    <SelectItem value="12m">12 месяцев (+15% к скидке)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {calculatedPrice !== null && (
                <div className="bg-primary/10 p-4 sm:p-6 rounded-lg border-2 border-primary animate-fade-in space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-3 font-semibold">Детализация абонемента:</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Площадь помещения</span>
                        <span className="font-semibold">{area[0]} м²</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Частота</span>
                        <span className="font-semibold">{getFrequencyLabel(frequency)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Срок абонемента</span>
                        <span className="font-semibold">{getDurationLabel(duration)}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-primary/20">
                        <span className="text-gray-700">Базовая стоимость (160₽/м²)</span>
                        <span className="font-semibold">{area[0] * 160}₽</span>
                      </div>
                      <div className="flex justify-between items-center text-green-600">
                        <span>Скидка по абонементу (-{calculatedPrice.discountPercent}%)</span>
                        <span className="font-semibold">-{calculatedPrice.discount}₽</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-primary/20 font-medium">
                        <span className="text-gray-800">Стоимость 1 уборки</span>
                        <span className="text-lg text-primary">{calculatedPrice.pricePerCleaning}₽</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t-2 border-primary/30 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Уборок в месяц</span>
                      <span className="font-semibold text-blue-600">{calculatedPrice.cleaningsPerMonth}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Стоимость в месяц</span>
                      <span className="font-semibold text-blue-600">{calculatedPrice.monthlyPrice}₽</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t-2 border-primary/30">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-800">Итого за период:</span>
                      <span className="text-4xl font-bold text-primary">{calculatedPrice.totalPrice}₽</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Экономия {Math.round((area[0] * 160 * calculatedPrice.cleaningsPerMonth * getDurationMonths(duration)) - calculatedPrice.totalPrice)}₽ по сравнению с разовыми уборками
                    </p>
                  </div>
                </div>
              )}

              <Button 
                onClick={calculateSubscription} 
                size="lg" 
                className="w-full text-lg" 
                disabled={!frequency || !duration}
              >
                Рассчитать абонемент
              </Button>
              
              <p className="text-xs text-center text-gray-500">
                * Абонемент оформляется на регулярную уборку (160₽/м²). Чем дольше срок и чаще уборки — тем больше скидка!
              </p>
            </CardContent>
          </Card>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default SubscriptionSection;