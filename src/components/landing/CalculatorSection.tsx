import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Icon from "@/components/ui/icon";
import ScrollAnimation from "@/components/ScrollAnimation";

interface CalculatorSectionProps {
  area: number[];
  setArea: (value: number[]) => void;
  roomType: string;
  setRoomType: (value: string) => void;
  extras: {
    windows: boolean;
    balcony: boolean;
    carpet: boolean;
  };
  setExtras: (value: { windows: boolean; balcony: boolean; carpet: boolean }) => void;
  calculatedPrice: number | null;
  calculatePrice: () => void;
}

const CalculatorSection = ({
  area,
  setArea,
  roomType,
  setRoomType,
  extras,
  setExtras,
  calculatedPrice,
  calculatePrice,
}: CalculatorSectionProps) => {
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
                <div className="space-y-3">
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
                      Химчистка ковра (+2000₽)
                    </label>
                  </div>
                </div>
              </div>

              {calculatedPrice !== null && (
                <div className="bg-primary/10 p-6 rounded-lg border-2 border-primary animate-fade-in">
                  <p className="text-sm text-gray-600 mb-1">Примерная стоимость</p>
                  <p className="text-4xl font-bold text-primary">{calculatedPrice}₽</p>
                </div>
              )}

              <Button onClick={calculatePrice} size="lg" className="w-full text-lg" disabled={!roomType}>
                Рассчитать стоимость
              </Button>
            </CardContent>
          </Card>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default CalculatorSection;
