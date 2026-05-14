import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

export default function MenuPage() {
  const { addToCart, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();
  return (
    <>
      {/* Search Bar */}
      <div className="relative mt-md mb-lg">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <span className="material-symbols-outlined text-outline">search</span>
        </div>
        <input
          className="w-full h-12 pl-12 pr-4 bg-white border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-primary font-body-md text-on-surface outline-none transition-all placeholder:text-outline/60"
          placeholder="Tìm kiếm món uống, món ăn..."
          type="text"
        />
      </div>

      {/* Featured Bento Grid Section */}
      <div className="grid grid-cols-2 grid-rows-2 gap-sm mb-xl h-[300px]">
        <div className="col-span-2 row-span-1 relative rounded-2xl overflow-hidden shadow-sm">
          <img
            className="w-full h-full object-cover"
            alt="Món mới"
            src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=600&auto=format&fit=crop"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-md">
            <span className="bg-primary text-white font-label-sm text-label-sm px-2 py-1 rounded-md w-fit mb-xs">
              Món mới
            </span>
            <h2 className="text-white font-headline-md text-headline-md">Cà Phê Muối Đặc Sản</h2>
            <p className="text-white/80 font-label-sm text-label-sm">
              Hương vị đậm đà, kem mặn khó quên
            </p>
          </div>
        </div>

        <div className="col-span-1 row-span-1 relative rounded-2xl overflow-hidden bg-secondary-container p-md flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="material-symbols-outlined text-on-secondary-container">
              local_fire_department
            </span>
            <span className="text-on-secondary-container font-label-sm text-label-sm">Hot</span>
          </div>
          <div>
            <p className="text-on-secondary-container font-label-md text-label-md">Combo Sáng</p>
            <p className="text-secondary font-headline-md text-headline-md">Tiết kiệm 20%</p>
          </div>
        </div>

        <div className="col-span-1 row-span-1 relative rounded-2xl overflow-hidden shadow-sm">
          <img
            className="w-full h-full object-cover"
            alt="Combo ăn vặt"
            src="https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=400&auto=format&fit=crop"
          />
        </div>
      </div>

      {/* Categories Tabs */}
      <div className="flex gap-sm overflow-x-auto hide-scrollbar mb-lg -mx-container-margin px-container-margin">
        <button className="flex-none px-6 py-2 bg-primary text-white font-label-md text-label-md rounded-full shadow-sm">
          Cà phê
        </button>
        <button className="flex-none px-6 py-2 bg-surface-container-high text-on-surface-variant font-label-md text-label-md rounded-full hover:bg-surface-variant transition-colors">
          Trà sữa
        </button>
        <button className="flex-none px-6 py-2 bg-surface-container-high text-on-surface-variant font-label-md text-label-md rounded-full hover:bg-surface-variant transition-colors">
          Đồ ăn vặt
        </button>
        <button className="flex-none px-6 py-2 bg-surface-container-high text-on-surface-variant font-label-md text-label-md rounded-full hover:bg-surface-variant transition-colors">
          Nước ép
        </button>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-2 gap-md">
        {/* Item 1 */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col group">
          <div className="relative h-40">
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              alt="Bạc Xỉu Đá"
              src="https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=400&auto=format&fit=crop"
            />
          </div>
          <div className="p-md flex flex-col flex-grow">
            <h3 className="font-headline-md text-[18px] text-on-surface mb-xs leading-tight">
              Bạc Xỉu Đá
            </h3>
            <p className="text-on-surface-variant font-label-sm text-label-sm mb-md line-clamp-2">
              Sự kết hợp hoàn hảo giữa cà phê, sữa và đá lạnh.
            </p>
            <div className="mt-auto flex justify-between items-center">
              <span className="text-primary font-bold font-body-lg text-body-lg">29.000đ</span>
              <button 
                onClick={() => addToCart({ id: 'item1', name: 'Bạc Xỉu Đá', price: 29000, image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=400&auto=format&fit=crop' })}
                className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center active:scale-90 transition-all shadow-md"
              >
                <span className="material-symbols-outlined">add</span>
              </button>
            </div>
          </div>
        </div>

        {/* Item 2 */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col group">
          <div className="relative h-40">
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              alt="Latte Nghệ Thuật"
              src="https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=400&auto=format&fit=crop"
            />
          </div>
          <div className="p-md flex flex-col flex-grow">
            <h3 className="font-headline-md text-[18px] text-on-surface mb-xs leading-tight">
              Latte Nghệ Thuật
            </h3>
            <p className="text-on-surface-variant font-label-sm text-label-sm mb-md line-clamp-2">
              Cà phê sữa kiểu Ý với lớp bọt mịn màng.
            </p>
            <div className="mt-auto flex justify-between items-center">
              <span className="text-secondary font-bold font-body-lg text-body-lg">45.000đ</span>
              <button 
                onClick={() => addToCart({ id: 'item2', name: 'Latte Nghệ Thuật', price: 45000, image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=400&auto=format&fit=crop' })}
                className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center active:scale-90 transition-all shadow-md"
              >
                <span className="material-symbols-outlined">add</span>
              </button>
            </div>
          </div>
        </div>

        {/* Item 3 */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col group">
          <div className="relative h-40">
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              alt="Bánh Tiramisu"
              src="https://images.unsplash.com/photo-1571115177098-24ec42ed204d?q=80&w=400&auto=format&fit=crop"
            />
            <div className="absolute top-2 left-2 flex gap-1">
              <span className="bg-surface-container-highest/90 backdrop-blur-md text-secondary font-label-sm text-[10px] px-2 py-0.5 rounded-full">
                Chay
              </span>
            </div>
          </div>
          <div className="p-md flex flex-col flex-grow">
            <h3 className="font-headline-md text-[18px] text-on-surface mb-xs leading-tight">
              Bánh Tiramisu
            </h3>
            <p className="text-on-surface-variant font-label-sm text-label-sm mb-md line-clamp-2">
              Bánh ngọt hương cà phê truyền thống.
            </p>
            <div className="mt-auto flex justify-between items-center">
              <span className="text-primary font-bold font-body-lg text-body-lg">35.000đ</span>
              <button 
                onClick={() => addToCart({ id: 'item3', name: 'Bánh Tiramisu', price: 35000, image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?q=80&w=400&auto=format&fit=crop' })}
                className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center active:scale-90 transition-all shadow-md"
              >
                <span className="material-symbols-outlined">add</span>
              </button>
            </div>
          </div>
        </div>

        {/* Item 4 */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col group">
          <div className="relative h-40">
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              alt="Trà Đào Cam Sả"
              src="https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=400&auto=format&fit=crop"
            />
          </div>
          <div className="p-md flex flex-col flex-grow">
            <h3 className="font-headline-md text-[18px] text-on-surface mb-xs leading-tight">
              Trà Đào Cam Sả
            </h3>
            <p className="text-on-surface-variant font-label-sm text-label-sm mb-md line-clamp-2">
              Giải nhiệt tức thì với trà thanh mát.
            </p>
            <div className="mt-auto flex justify-between items-center">
              <span className="text-primary font-bold font-body-lg text-body-lg">39.000đ</span>
              <button 
                onClick={() => addToCart({ id: 'item4', name: 'Trà Đào Cam Sả', price: 39000, image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=400&auto=format&fit=crop' })}
                className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center active:scale-90 transition-all shadow-md"
              >
                <span className="material-symbols-outlined">add</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FAB for Cart */}
      {totalItems > 0 && (
        <div className="fixed bottom-24 right-container-margin z-40">
          <button 
            onClick={() => navigate('/cart')}
            className="bg-primary text-white h-14 px-6 rounded-full flex items-center gap-3 shadow-lg active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined">shopping_basket</span>
            <span className="font-label-md text-label-md">{totalItems} món • {totalPrice.toLocaleString('vi-VN')}đ</span>
          </button>
        </div>
      )}
    </>
  );
}
