import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import ScrollAnimation from "@/components/ScrollAnimation";

interface OrderFormSectionProps {
  calculatedPrice: number | null;
  handleSubmit: (e: React.FormEvent) => void;
  customServices: string;
  selectedExtras: {
    windows: boolean;
    balcony: boolean;
    carpet: boolean;
    furniture: boolean;
    appliances: boolean;
    chandelier: boolean;
    afterRepair: boolean;
    disinfection: boolean;
  };
}

const OrderFormSection = ({ calculatedPrice, handleSubmit, customServices, selectedExtras }: OrderFormSectionProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const selectedServicesList = Object.entries(selectedExtras)
    .filter(([_, value]) => value)
    .map(([key, _]) => extrasLabels[key]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const orderData = {
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      address: formData.get('address') as string,
      date: formData.get('date') as string,
      time: formData.get('time') as string,
      comment: formData.get('comment') as string,
      calculatedPrice: calculatedPrice,
      customServices: customServices,
      selectedExtras: selectedExtras
    };

    try {
      const response = await fetch('https://functions.poehali.dev/a3379f3c-450e-4abb-b46d-02d76d0c1f80', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        toast({
          title: "Заявка отправлена!",
          description: "Мы свяжемся с вами в ближайшее время.",
        });
        form.reset();
        handleSubmit(e);
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      toast({
        title: "Ошибка отправки",
        description: "Попробуйте позвонить нам напрямую: +7 (952) 130-15-60",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="order-form" className="py-12 sm:py-20 px-4 bg-gradient-to-b from-white to-blue-50/50">
      <div className="container mx-auto max-w-2xl">
        <ScrollAnimation animation="fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3 sm:mb-4">Заказать уборку</h2>
          <p className="text-center text-gray-600 mb-8 sm:mb-12 text-base sm:text-lg">Оставьте заявку, и мы свяжемся с вами в течение 15 минут</p>
        </ScrollAnimation>
        <Card className="shadow-xl border-2">
          <CardContent className="pt-6">
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Ваше имя *</Label>
                <Input id="name" name="name" placeholder="Иван Иванов" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Телефон *</Label>
                <Input id="phone" name="phone" type="tel" placeholder="+7 (999) 123-45-67" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Адрес *</Label>
                <Input id="address" name="address" placeholder="ул. Ленина, д. 10, кв. 5" required />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Дата уборки *</Label>
                  <Input id="date" name="date" type="date" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Время уборки *</Label>
                  <Input id="time" name="time" type="time" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="comment">Комментарий</Label>
                <Textarea
                  id="comment"
                  name="comment"
                  placeholder="Дополнительные пожелания"
                  rows={4}
                />
              </div>
              {calculatedPrice && (
                <div className="bg-blue-50 p-4 rounded-lg space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Рассчитанная стоимость</p>
                    <p className="text-2xl font-bold text-primary">{calculatedPrice}₽</p>
                  </div>
                  {selectedServicesList.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Выбранные услуги:</p>
                      <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
                        {selectedServicesList.map((service, index) => (
                          <li key={index}>{service}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {customServices && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Дополнительно:</p>
                      <p className="text-sm text-gray-700 bg-white p-2 rounded">{customServices}</p>
                    </div>
                  )}
                </div>
              )}
              <div className="flex items-start space-x-2">
                <Checkbox id="terms" required />
                <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
                  Я согласен на обработку персональных данных и принимаю политику конфиденциальности
                </label>
              </div>
              <Button type="submit" size="lg" className="w-full text-lg" disabled={isSubmitting}>
                {isSubmitting ? 'Отправка...' : 'Заказать уборку'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default OrderFormSection;