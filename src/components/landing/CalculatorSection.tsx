import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import ScrollAnimation from "@/components/ScrollAnimation";

interface CalculatorSectionProps {
  area: number[];
  setArea: (value: number[]) => void;
  roomType: string;
  setRoomType: (value: string) => void;
  cleaningType: string;
  setCleaningType: (value: string) => void;
  extras: {
    windows: boolean;
    balcony: boolean;
    carpet: boolean;
    furniture: boolean;
    appliances: boolean;
    chandelier: boolean;
    afterRepair: boolean;
    disinfection: boolean;
  };
  setExtras: (value: {
    windows: boolean;
    balcony: boolean;
    carpet: boolean;
    furniture: boolean;
    appliances: boolean;
    chandelier: boolean;
    afterRepair: boolean;
    disinfection: boolean;
  }) => void;
  calculatedPrice: number | null;
  calculatePrice: () => void;
  customServices: string;
  setCustomServices: (value: string) => void;
  subscription: string;
  setSubscription: (value: string) => void;
}

const CalculatorSection = ({
  area,
  setArea,
  roomType,
  setRoomType,
  cleaningType,
  setCleaningType,
  extras,
  setExtras,
  calculatedPrice,
  calculatePrice,
  customServices,
  setCustomServices,
  subscription,
  setSubscription,
}: CalculatorSectionProps) => {
  const extrasPrices: Record<string, number> = {
    windows: 1500,
    balcony: 800,
    carpet: 2500,
    furniture: 3000,
    appliances: 1000,
    chandelier: 1200,
    afterRepair: 5000,
    disinfection: 2000,
  };

  const extrasLabels: Record<string, string> = {
    windows: 'Мытье окон',
    balcony: 'Уборка балкона',
    carpet: 'Химчистка ковра',
    furniture: 'Химчистка мягкой мебели',
    appliances: 'Мытье бытовой техники',
    chandelier: 'Мытье люстры',
    afterRepair: 'Уборка после ремонта',
    disinfection: 'Дезинфекция помещения',
  };

  const pricePerMeter = cleaningType === 'regular' ? 160 : cleaningType === 'general' ? 200 : 180;
  const basePrice = area[0] * pricePerMeter;
  
  const getSubscriptionDiscount = () => {
    if (cleaningType !== 'regular' || !subscription) return 0;
    
    const [frequency, duration] = subscription.split('-');
    let discount = 0;
    
    if (frequency === '1week') discount = 5;
    else if (frequency === '2week') discount = 10;
    else if (frequency === '3week') discount = 15;
    
    if (duration === '2m') discount += 3;
    else if (duration === '3m') discount += 5;
    else if (duration === '6m') discount += 10;
    else if (duration === '12m') discount += 15;
    
    return Math.min(discount, 30);
  };
  
  const discountPercent = getSubscriptionDiscount();
  const discount = Math.round(basePrice * discountPercent / 100);
  const basePriceWithDiscount = basePrice - discount;
  
  const getCleaningsPerMonth = () => {
    if (!subscription) return 0;
    const frequency = subscription.split('-')[0];
    if (frequency === '1week') return 4;
    if (frequency === '2week') return 8;
    if (frequency === '3week') return 12;
    return 0;
  };
  
  const selectedExtras = Object.entries(extras)
    .filter(([_, value]) => value)
    .map(([key, _]) => ({
      label: extrasLabels[key],
      price: extrasPrices[key],
    }));
  return (
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

              <div className="space-y-2">
                <Label htmlFor="cleaning-type">Тип уборки</Label>
                <Select onValueChange={setCleaningType}>
                  <SelectTrigger id="cleaning-type">
                    <SelectValue placeholder="Выберите тип уборки" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="regular">Регулярная (160₽/м²)</SelectItem>
                    <SelectItem value="general">Генеральная (200₽/м²)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {cleaningType === 'regular' && (
                <div className="space-y-2">
                  <Label htmlFor="subscription">Абонемент на регулярную уборку</Label>
                  <Select onValueChange={setSubscription}>
                    <SelectTrigger id="subscription">
                      <SelectValue placeholder="Разовая уборка (без скидки)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Разовая уборка</SelectItem>
                      <SelectItem value="1week-1m">1 раз/неделю — 1 месяц (скидка 5%)</SelectItem>
                      <SelectItem value="1week-2m">1 раз/неделю — 2 месяца (скидка 8%)</SelectItem>
                      <SelectItem value="1week-3m">1 раз/неделю — 3 месяца (скидка 10%)</SelectItem>
                      <SelectItem value="1week-6m">1 раз/неделю — 6 месяцев (скидка 15%)</SelectItem>
                      <SelectItem value="1week-12m">1 раз/неделю — 12 месяцев (скидка 20%)</SelectItem>
                      <SelectItem value="2week-1m">2 раза/неделю — 1 месяц (скидка 10%)</SelectItem>
                      <SelectItem value="2week-2m">2 раза/неделю — 2 месяца (скидка 13%)</SelectItem>
                      <SelectItem value="2week-3m">2 раза/неделю — 3 месяца (скидка 15%)</SelectItem>
                      <SelectItem value="2week-6m">2 раза/неделю — 6 месяцев (скидка 20%)</SelectItem>
                      <SelectItem value="2week-12m">2 раза/неделю — 12 месяцев (скидка 25%)</SelectItem>
                      <SelectItem value="3week-1m">3 раза/неделю — 1 месяц (скидка 15%)</SelectItem>
                      <SelectItem value="3week-2m">3 раза/неделю — 2 месяца (скидка 18%)</SelectItem>
                      <SelectItem value="3week-3m">3 раза/неделю — 3 месяца (скидка 20%)</SelectItem>
                      <SelectItem value="3week-6m">3 раза/неделю — 6 месяцев (скидка 25%)</SelectItem>
                      <SelectItem value="3week-12m">3 раза/неделю — 12 месяцев (скидка 30%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                      Химчистка ковра (+2500₽)
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="furniture"
                      checked={extras.furniture}
                      onCheckedChange={(checked) => setExtras({ ...extras, furniture: checked as boolean })}
                    />
                    <label htmlFor="furniture" className="text-sm font-medium cursor-pointer">
                      Химчистка мягкой мебели (+3000₽)
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="appliances"
                      checked={extras.appliances}
                      onCheckedChange={(checked) => setExtras({ ...extras, appliances: checked as boolean })}
                    />
                    <label htmlFor="appliances" className="text-sm font-medium cursor-pointer">
                      Мытье бытовой техники (+1000₽)
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="chandelier"
                      checked={extras.chandelier}
                      onCheckedChange={(checked) => setExtras({ ...extras, chandelier: checked as boolean })}
                    />
                    <label htmlFor="chandelier" className="text-sm font-medium cursor-pointer">
                      Мытье люстры (+1200₽)
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="afterRepair"
                      checked={extras.afterRepair}
                      onCheckedChange={(checked) => setExtras({ ...extras, afterRepair: checked as boolean })}
                    />
                    <label htmlFor="afterRepair" className="text-sm font-medium cursor-pointer">
                      Уборка после ремонта (+5000₽)
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="disinfection"
                      checked={extras.disinfection}
                      onCheckedChange={(checked) => setExtras({ ...extras, disinfection: checked as boolean })}
                    />
                    <label htmlFor="disinfection" className="text-sm font-medium cursor-pointer">
                      Дезинфекция помещения (+2000₽)
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="custom-services">Другие услуги (опишите своими словами)</Label>
                <Textarea
                  id="custom-services"
                  placeholder="Например: глажка белья, организация гардероба, мытье стен..."
                  value={customServices}
                  onChange={(e) => setCustomServices(e.target.value)}
                  rows={3}
                  className="resize-none"
                />
              </div>

              {calculatedPrice !== null && (
                <div className="bg-primary/10 p-6 rounded-lg border-2 border-primary animate-fade-in space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-3 font-semibold">Детализация расчёта:</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">{cleaningType === 'regular' ? 'Регулярная' : cleaningType === 'general' ? 'Генеральная' : 'Базовая'} уборка ({area[0]} м² × {pricePerMeter}₽)</span>
                        <span className="font-semibold">{basePrice}₽</span>
                      </div>
                      
                      {discount > 0 && (
                        <div className="flex justify-between items-center text-green-600">
                          <span>Скидка по абонементу (-{discountPercent}%)</span>
                          <span className="font-semibold">-{discount}₽</span>
                        </div>
                      )}
                      
                      {discount > 0 && (
                        <div className="flex justify-between items-center pt-1 border-t border-primary/20">
                          <span className="text-gray-700">Стоимость за 1 уборку</span>
                          <span className="font-semibold">{basePriceWithDiscount}₽</span>
                        </div>
                      )}
                      
                      {selectedExtras.length > 0 && (
                        <div className="pt-2 border-t border-primary/20">
                          <p className="text-gray-600 mb-2 font-medium">Дополнительные услуги:</p>
                          {selectedExtras.map((extra, index) => (
                            <div key={index} className="flex justify-between items-center ml-4">
                              <span className="text-gray-700">{extra.label}</span>
                              <span className="font-semibold">+{extra.price}₽</span>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {subscription && getCleaningsPerMonth() > 0 && (
                        <div className="pt-3 border-t-2 border-primary/30 space-y-1">
                          <div className="flex justify-between items-center text-blue-600">
                            <span className="font-medium">Уборок в месяц: {getCleaningsPerMonth()}</span>
                            <span className="font-semibold">{calculatedPrice * getCleaningsPerMonth()}₽/мес</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="pt-3 border-t-2 border-primary/30">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-800">{subscription ? 'Стоимость 1 уборки:' : 'Итого:'}</span>
                      <span className="text-4xl font-bold text-primary">{calculatedPrice}₽</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 pt-2 border-t border-primary/20">* Финальная стоимость может измениться после осмотра объекта</p>
                </div>
              )}

              <Button onClick={calculatePrice} size="lg" className="w-full text-lg" disabled={!roomType || !cleaningType}>
                Рассчитать стоимость
              </Button>
              
              <p className="text-xs text-center text-gray-500">
                * Регулярная: 160₽/м², Генеральная: 200₽/м². Финальная стоимость может измениться после осмотра
              </p>
            </CardContent>
          </Card>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default CalculatorSection;