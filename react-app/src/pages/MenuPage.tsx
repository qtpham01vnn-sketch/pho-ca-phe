import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const menuItems = [
  { id: 'item1', name: 'Bạc Xỉu Đá', desc: 'Cà phê sữa đá mát lạnh', price: 29000, image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=400&auto=format&fit=crop' },
  { id: 'item2', name: 'Latte Nghệ Thuật', desc: 'Cà phê sữa kiểu Ý', price: 45000, image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=400&auto=format&fit=crop' },
  { id: 'item3', name: 'Bánh Tiramisu', desc: 'Bánh ngọt hương cà phê', price: 35000, image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?q=80&w=400&auto=format&fit=crop', tag: 'Chay' },
  { id: 'item4', name: 'Trà Đào Cam Sả', desc: 'Giải nhiệt tức thì', price: 39000, image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=400&auto=format&fit=crop' },
  { id: 'item5', name: 'Cà Phê Muối', desc: 'Đậm đà kem mặn', price: 35000, image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=400&auto=format&fit=crop', tag: 'Món mới' },
  { id: 'item6', name: 'Sinh Tố Bơ', desc: 'Bơ sáp béo ngậy', price: 42000, image: 'https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?q=80&w=400&auto=format&fit=crop' },
];

export default function MenuPage() {
  const { addToCart, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();

  return (
    <div className="pb-6">
      {/* Search Bar */}
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <span className="material-symbols-outlined text-outline text-[20px]">search</span>
        </div>
        <input
          className="w-full h-10 pl-10 pr-4 bg-white border border-outline-variant rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-outline/60"
          placeholder="Tìm kiếm món..."
          type="text"
        />
      </div>

      {/* Categories Tabs */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-4 -mx-container-margin px-container-margin">
        <button className="flex-none px-4 py-1.5 bg-primary text-white text-xs font-bold rounded-full shadow-sm">
          Cà phê
        </button>
        <button className="flex-none px-4 py-1.5 bg-surface-container-high text-on-surface-variant text-xs font-bold rounded-full">
          Trà sữa
        </button>
        <button className="flex-none px-4 py-1.5 bg-surface-container-high text-on-surface-variant text-xs font-bold rounded-full">
          Đồ ăn vặt
        </button>
        <button className="flex-none px-4 py-1.5 bg-surface-container-high text-on-surface-variant text-xs font-bold rounded-full">
          Nước ép
        </button>
      </div>

      {/* Menu Grid - optimized for mobile */}
      <div className="grid grid-cols-2 gap-3">
        {menuItems.map(item => (
          <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-surface-variant/30 flex flex-col">
            {/* Image */}
            <div className="relative h-28">
              <img
                className="w-full h-full object-cover"
                alt={item.name}
                src={item.image}
              />
              {item.tag && (
                <span className="absolute top-1.5 left-1.5 bg-white/90 backdrop-blur-sm text-primary text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {item.tag}
                </span>
              )}
            </div>
            {/* Info */}
            <div className="p-2.5 flex flex-col flex-grow">
              <h3 className="font-bold text-sm text-on-surface leading-tight mb-0.5">
                {item.name}
              </h3>
              <p className="text-on-surface-variant text-[11px] leading-tight mb-2 line-clamp-1">
                {item.desc}
              </p>
              <div className="mt-auto flex justify-between items-center">
                <span className="text-primary font-bold text-sm">{item.price.toLocaleString('vi-VN')}đ</span>
                <button 
                  onClick={() => addToCart({ id: item.id, name: item.name, price: item.price, image: item.image })}
                  className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center active:scale-90 transition-all shadow-md"
                >
                  <span className="material-symbols-outlined text-[18px]">add</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Cart Bar - positioned above bottom nav */}
      {totalItems > 0 && (
        <div className="fixed bottom-[76px] left-0 w-full px-4 z-40">
          <button 
            onClick={() => navigate('/cart')}
            className="w-full max-w-lg mx-auto bg-primary text-white h-12 px-5 rounded-2xl flex items-center justify-between shadow-lg shadow-primary/30 active:scale-[0.98] transition-all"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">shopping_basket</span>
              <span className="font-bold text-sm">{totalItems} món</span>
            </div>
            <span className="font-bold text-sm">{totalPrice.toLocaleString('vi-VN')}đ →</span>
          </button>
        </div>
      )}
    </div>
  );
}
