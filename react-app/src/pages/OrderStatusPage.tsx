import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../contexts/OrderContext';

export default function OrderStatusPage() {
  const { currentCustomerOrder, tableNumber } = useOrder();
  const navigate = useNavigate();

  if (!currentCustomerOrder) {
    return (
      <div className="flex flex-col items-center justify-center pt-32 px-4 text-center">
        <span className="material-symbols-outlined text-6xl text-outline-variant mb-4">receipt_long</span>
        <h2 className="font-headline-md text-on-surface mb-2">Chưa có đơn hàng nào</h2>
        <p className="text-on-surface-variant text-sm mb-6">Bạn chưa đặt món nào. Hãy xem thực đơn và đặt món nhé!</p>
        <button 
          onClick={() => navigate('/menu')}
          className="bg-primary text-white px-6 py-3 rounded-xl font-semibold shadow-md active:scale-95 transition-all"
        >
          Xem thực đơn
        </button>
      </div>
    );
  }

  const { id, items, totalPrice, status } = currentCustomerOrder;

  const getStatusText = () => {
    switch(status) {
      case 'PENDING': return 'Đang chờ bếp nhận';
      case 'PREPARING': return 'Đang được pha chế';
      case 'READY': return 'Đã xong, mời bạn nhận món';
      case 'COMPLETED': return 'Đã hoàn tất';
      default: return 'Đang xử lý';
    }
  };

  const getStatusMessage = () => {
    switch(status) {
      case 'PENDING': return 'Đơn hàng của bạn đã được gửi tới bếp.';
      case 'PREPARING': return 'Cảm ơn bạn đã kiên nhẫn. Barista đang chuẩn bị đồ uống cho bạn.';
      case 'READY': return 'Đồ uống của bạn đã sẵn sàng tại quầy nhận món!';
      case 'COMPLETED': return 'Chúc bạn ngon miệng!';
      default: return '';
    }
  };

  return (
    <>
      {/* Status Hero Card */}
      <section className="mb-lg">
        <div className="bg-surface-container-lowest rounded-xl p-lg shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-surface-variant/30 text-center">
          {status === 'READY' ? (
            <div className="animate-bounce w-24 h-24 mx-auto mb-md bg-secondary-container rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-on-secondary-container text-[48px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                local_cafe
              </span>
            </div>
          ) : (
            <div className="w-24 h-24 mx-auto mb-md bg-primary-container/20 rounded-full flex items-center justify-center">
              <span
                className={`material-symbols-outlined text-primary text-[48px] ${status === 'PREPARING' || status === 'PENDING' ? 'animate-pulse' : ''}`}
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {status === 'COMPLETED' ? 'check_circle' : 'restaurant_menu'}
              </span>
            </div>
          )}
          
          <h2 className={`font-headline-lg text-headline-lg mb-xs ${status === 'READY' ? 'text-secondary font-bold' : 'text-primary'}`}>
            {getStatusText()}
          </h2>
          <p className="font-body-md text-on-surface-variant mb-xl">
            {getStatusMessage()}
          </p>

          {/* Vertical Timeline */}
          <div className="relative text-left px-md max-w-xs mx-auto">
            {/* Background Line */}
            <div className="absolute left-[31px] top-4 bottom-4 w-0.5 bg-surface-variant"></div>

            {/* Step 1: PENDING */}
            <div className="relative flex items-start gap-4 mb-6">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${status === 'PENDING' ? 'bg-primary text-white shadow-md' : 'bg-primary text-white'}`}>
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>receipt_long</span>
              </div>
              <div className="pt-1">
                <h4 className={`font-label-lg ${status === 'PENDING' ? 'text-on-surface font-bold' : 'text-on-surface'}`}>Đã xác nhận đơn</h4>
                <p className="text-on-surface-variant text-sm">Đơn hàng đã được gửi tới bếp</p>
              </div>
            </div>

            {/* Step 2: PREPARING */}
            <div className="relative flex items-start gap-4 mb-6">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${status === 'PREPARING' ? 'bg-primary text-white shadow-md animate-pulse' : status === 'READY' || status === 'COMPLETED' ? 'bg-primary text-white' : 'bg-surface-variant text-outline'}`}>
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>coffee_maker</span>
              </div>
              <div className="pt-1">
                <h4 className={`font-label-lg ${status === 'PREPARING' ? 'text-primary font-bold' : status === 'READY' || status === 'COMPLETED' ? 'text-on-surface' : 'text-outline'}`}>Đang pha chế</h4>
                <p className="text-outline text-sm">Barista đang chuẩn bị đồ uống</p>
              </div>
            </div>

            {/* Step 3: READY */}
            <div className="relative flex items-start gap-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${status === 'READY' ? 'bg-secondary text-white shadow-md' : status === 'COMPLETED' ? 'bg-primary text-white' : 'bg-surface-variant text-outline'}`}>
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              </div>
              <div className="pt-1">
                <h4 className={`font-label-lg ${status === 'READY' ? 'text-secondary font-bold text-lg' : status === 'COMPLETED' ? 'text-on-surface' : 'text-outline'}`}>Đã xong - Mời nhận</h4>
                <p className="text-outline text-sm">Vui lòng đến quầy để nhận nước</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Info Grid */}
      <div className="grid grid-cols-2 gap-md mb-lg">
        {/* Time Card */}
        <div className="bg-surface-container-lowest rounded-xl p-md shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col items-center justify-center">
          <span className="font-label-sm text-on-surface-variant mb-xs">Dự kiến xong</span>
          <span className="font-headline-md text-headline-md text-secondary">~{items.length * 4} phút</span>
          <span className="font-label-sm text-outline-variant">Bàn số {tableNumber}</span>
        </div>

        {/* Support Card / Cancel Order */}
        <button 
          onClick={() => alert("Đã gửi thông báo cho Nhân viên đến bàn hỗ trợ bạn.")}
          className="bg-error-container text-on-error-container rounded-xl p-md shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col items-center justify-center hover:bg-error hover:text-white transition-all cursor-pointer active:scale-95"
        >
          <span className="material-symbols-outlined mb-xs">cancel</span>
          <span className="font-label-md text-label-md">Hủy / Đổi món</span>
          <span className="font-label-sm opacity-80">Gọi NV hỗ trợ</span>
        </button>

        {/* QR Code Verification Card */}
        <div className="col-span-2 bg-secondary-container/30 rounded-xl p-lg flex flex-col md:flex-row items-center gap-lg border border-secondary-fixed-dim/20">
          <div className="bg-white p-2 rounded-lg shadow-sm">
            <img
              alt="QR Code"
              className="w-32 h-32"
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${id}`}
            />
          </div>
          <div className="text-center md:text-left">
            <h3 className="font-headline-md text-headline-md text-on-secondary-container mb-xs">
              Mã đối chiếu
            </h3>
            <p className="font-body-md text-on-secondary-container/80 mb-md">
              Vui lòng đưa mã này cho nhân viên khi bạn nhận đồ tại quầy hoặc thanh toán.
            </p>
            <span className="bg-on-secondary-container text-white px-md py-1 rounded-full font-label-md tracking-widest">
              #{id}
            </span>
          </div>
        </div>
      </div>

      {/* Order Summary Section */}
      <section className="bg-surface-container-lowest rounded-xl p-lg shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-surface-variant/30">
        <div className="flex justify-between items-center mb-md border-b border-outline-variant pb-sm">
          <h3 className="font-headline-md text-headline-md text-on-surface">Chi tiết đơn hàng</h3>
          <span className="text-secondary font-semibold font-body-md">{items.reduce((s, i) => s + i.quantity, 0)} món</span>
        </div>

        <ul className="space-y-md">
          {items.map(item => (
            <li key={item.id} className="flex justify-between items-center">
              <div className="flex items-center gap-md">
                <div className="w-12 h-12 bg-surface-container rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    alt={item.name}
                    className="w-full h-full object-cover"
                    src={item.image}
                  />
                </div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface">{item.name}</p>
                  {item.note && <p className="font-label-sm text-outline">{item.note}</p>}
                </div>
              </div>
              <span className="font-label-md text-primary">x{item.quantity}</span>
            </li>
          ))}
        </ul>

        <div className="mt-lg pt-md border-t border-dashed border-outline-variant">
          <div className="flex justify-between font-label-md text-outline mb-xs">
            <span>Tạm tính</span>
            <span>{totalPrice.toLocaleString('vi-VN')}đ</span>
          </div>
          <div className="flex justify-between font-headline-md text-headline-md text-primary">
            <span>Tổng thanh toán</span>
            <span>{totalPrice.toLocaleString('vi-VN')}đ</span>
          </div>
        </div>
      </section>

      {/* Action Button */}
      <div className="mt-lg flex gap-md">
        <button 
          onClick={() => navigate('/menu')}
          className="flex-1 py-3 px-lg bg-primary text-white rounded-full font-headline-md text-[18px] shadow-lg hover:brightness-110 active:scale-95 transition-all"
        >
          Tiếp tục đặt món
        </button>
      </div>
    </>
  );
}
