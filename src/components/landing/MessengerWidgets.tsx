import Icon from "@/components/ui/icon";

const MessengerWidgets = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <a
        href="https://wa.me/78001234567"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:scale-110 transition-all flex items-center justify-center group hover:shadow-xl"
        aria-label="WhatsApp"
      >
        <Icon name="MessageCircle" size={28} className="group-hover:scale-110 transition-transform" />
      </a>
      <a
        href="https://t.me/cleanstandard"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-[#0088cc] text-white rounded-full shadow-lg hover:scale-110 transition-all flex items-center justify-center group hover:shadow-xl"
        aria-label="Telegram"
      >
        <Icon name="Send" size={28} className="group-hover:scale-110 transition-transform" />
      </a>
    </div>
  );
};

export default MessengerWidgets;
