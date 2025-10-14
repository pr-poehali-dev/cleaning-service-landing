import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import ScrollAnimation from "@/components/ScrollAnimation";

interface OrderFormSectionProps {
  calculatedPrice: number | null;
  handleSubmit: (e: React.FormEvent) => void;
}

const OrderFormSection = ({ calculatedPrice, handleSubmit }: OrderFormSectionProps) => {
  return (
    <section id="order-form" className="py-20 px-4 bg-gradient-to-b from-white to-blue-50/50">
      <div className="container mx-auto max-w-2xl">
        <ScrollAnimation animation="fade-in">
          <h2 className="text-4xl font-bold text-center mb-4">Заказать уборку</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">Оставьте заявку, и мы свяжемся с вами в течение 15 минут</p>
        </ScrollAnimation>
        <Card className="shadow-xl border-2">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Ваше имя *</Label>
                <Input id="name" placeholder="Иван Иванов" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Телефон *</Label>
                <Input id="phone" type="tel" placeholder="+7 (999) 123-45-67" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" placeholder="example@mail.ru" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="comment">Комментарий</Label>
                <Textarea
                  id="comment"
                  placeholder="Укажите адрес, тип уборки и удобное время"
                  rows={4}
                />
              </div>
              {calculatedPrice && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Рассчитанная стоимость</p>
                  <p className="text-2xl font-bold text-primary">{calculatedPrice}₽</p>
                </div>
              )}
              <div className="flex items-start space-x-2">
                <Checkbox id="terms" required />
                <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
                  Я согласен на обработку персональных данных и принимаю политику конфиденциальности
                </label>
              </div>
              <Button type="submit" size="lg" className="w-full text-lg">
                Заказать уборку
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default OrderFormSection;
