import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useOrder } from '../contexts/OrderContext';

export default function CartPage() {
  const { items, updateQuantity, totalPrice, totalItems, clearCart } = useCart();
  const { placeOrder, tableNumber } = useOrder();
  const navigate = useNavigate();

  if (totalItems === 0) {
    return (
      <div className="flex flex-col items-center justify-center pt-32 px-4 text-center">
        <span className="material-symbols-outlined text-6xl text-outline-variant mb-4">shopping_cart</span>
        <h2 className="font-headline-md text-on-surface mb-2">Giỏ hàng trống</h2>
        <p className="text-on-surface-variant text-sm mb-6">Bạn chưa chọn món nào. Hãy xem thực đơn nhé!</p>
        <button 
          onClick={() => navigate('/menu')}
          className="bg-primary text-white px-6 py-3 rounded-xl font-semibold shadow-md active:scale-95 transition-all"
        >
          Xem thực đơn
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-32">
      {/* Bàn / Vị trí */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-surface-variant flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined">table_restaurant</span>
          </div>
          <div>
            <p className="text-xs text-on-surface-variant font-medium">Vị trí phục vụ</p>
            <p className="font-headline-md font-bold text-on-surface">Bàn số {tableNumber}</p>
          </div>
        </div>
        <button className="text-sm font-semibold text-primary px-3 py-1 bg-primary/5 rounded-full hover:bg-primary/10 transition-colors">
          Thay đổi
        </button>
      </div>

      {/* Order List */}
      <section>
        <h2 className="font-headline-md font-bold text-lg mb-3">Món đã chọn ({totalItems})</h2>
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="bg-white p-3 rounded-2xl shadow-sm border border-surface-variant flex gap-3 relative overflow-hidden group">
              <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                <img
                  alt={item.name}
                  className="w-full h-full object-cover"
                  src={item.image}
                />
              </div>
              <div className="flex-1 flex flex-col justify-between py-0.5">
                <div>
                  <h3 className="font-headline-md font-semibold text-[15px] leading-tight text-on-surface">
                    {item.name}
                  </h3>
                  {item.note && <p className="text-xs text-on-surface-variant mt-1 line-clamp-1">{item.note}</p>}
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-bold text-primary">{item.price.toLocaleString('vi-VN')}đ</span>
                  {/* Quantity Control */}
                  <div className="flex items-center gap-3 bg-surface rounded-full px-2 py-1 border border-surface-variant">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="material-symbols-outlined text-[18px] text-on-surface-variant"
                    >
                      remove
                    </button>
                    <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="material-symbols-outlined text-[18px] text-primary"
                    >
                      add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={() => navigate('/menu')}
          className="w-full mt-4 py-3 border-2 border-dashed border-primary/40 text-primary font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-primary/5 transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">add_circle</span>
          Thêm món khác
        </button>
      </section>

      {/* Note for Kitchen */}
      <section>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-surface-variant">
          <label
            className="flex items-center gap-2 mb-2 font-medium text-sm text-on-surface"
            htmlFor="note"
          >
            <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
              edit_note
            </span>
            Ghi chú cho quán
          </label>
          <textarea
            className="w-full bg-surface border-none rounded-xl text-sm p-3 focus:ring-1 focus:ring-primary placeholder:text-outline-variant resize-none"
            id="note"
            placeholder="Bạn có dặn dò gì không? (VD: Lấy thêm giấy ăn...)"
            rows={2}
          ></textarea>
        </div>
      </section>

      {/* Payment Method */}
      <section>
        <h2 className="font-headline-md font-bold text-lg mb-3">Phương thức thanh toán</h2>
        <div className="space-y-2">
          <label className="flex items-center justify-between bg-white p-4 rounded-xl border border-primary ring-1 ring-primary/20 shadow-sm cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  payments
                </span>
              </div>
              <span className="font-semibold text-on-surface">Tiền mặt tại quầy</span>
            </div>
            <input
              className="w-5 h-5 text-primary border-outline-variant focus:ring-primary"
              name="payment"
              type="radio"
              defaultChecked
            />
          </label>
          <label className="flex items-center justify-between bg-white p-4 rounded-xl border border-surface-variant hover:border-outline-variant transition-colors cursor-pointer opacity-70">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-surface-variant rounded-full flex items-center justify-center text-on-surface-variant">
                <span className="material-symbols-outlined">qr_code_scanner</span>
              </div>
              <div>
                <span className="font-semibold text-on-surface block">
                  Chuyển khoản (Đang bảo trì)
                </span>
              </div>
            </div>
            <input
              className="w-5 h-5 text-primary border-outline-variant focus:ring-primary"
              disabled
              name="payment"
              type="radio"
            />
          </label>
        </div>
      </section>

      {/* Summary & Point Usage */}
      <section className="bg-white rounded-2xl p-5 shadow-sm border border-surface-variant space-y-4">
        {/* Point Toggle */}
        <div className="flex items-center justify-between pb-4 border-b border-surface-variant border-dashed">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-yellow-500"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              stars
            </span>
            <div>
              <span className="font-semibold text-sm block">Dùng điểm (+1.250 điểm)</span>
              <span className="text-xs text-on-surface-variant">
                Tối đa dùng 10.000đ (100 điểm)
              </span>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input className="sr-only peer" type="checkbox" />
            <div className="w-11 h-6 bg-surface-variant rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>

        {/* Calculations */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-on-surface-variant">
            <span>Tạm tính ({totalItems} sản phẩm)</span>
            <span>{totalPrice.toLocaleString('vi-VN')}đ</span>
          </div>
          <div className="flex justify-between text-primary font-medium">
            <span>Khuyến mãi / Giảm giá</span>
            <span>-0đ</span>
          </div>
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-surface-variant">
          <span className="font-headline-md font-bold text-on-surface">Tổng thanh toán</span>
          <span className="font-headline-md font-bold text-xl text-primary">{totalPrice.toLocaleString('vi-VN')}đ</span>
        </div>
        <p className="text-right text-xs text-secondary font-medium">
          Dự kiến tích thêm <span className="font-bold">+{Math.floor(totalPrice / 1000)} điểm</span>
        </p>
      </section>

      {/* Fixed Bottom Action */}
      <div className="fixed bottom-[88px] md:bottom-28 left-0 w-full bg-surface p-4 border-t border-surface-variant/50 shadow-[0_-8px_30px_rgba(0,0,0,0.05)] z-40">
        <div className="max-w-lg mx-auto">
          <button 
            onClick={async () => {
              try {
                const noteEl = document.getElementById('note') as HTMLTextAreaElement;
                await placeOrder(items, totalPrice, noteEl?.value || '');
                clearCart();
                navigate('/order-status');
              } catch (error) {
                alert('Có lỗi xảy ra khi đặt món. Vui lòng thử lại!');
              }
            }}
            className="w-full bg-primary hover:bg-primary/90 text-white font-headline-md font-bold text-lg py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/30 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined">send</span>
            Đặt Món • {totalPrice.toLocaleString('vi-VN')}đ
          </button>
        </div>
      </div>
    </div>
  );
}
