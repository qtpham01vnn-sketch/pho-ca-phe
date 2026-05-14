import { useState, useEffect } from 'react';
import { useOrder } from '../contexts/OrderContext';

export default function BaristaPage() {
  const { orders, updateOrderStatus, cancelOrder } = useOrder();

  // Live Clock
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const activeOrders = orders.filter(o => o.status === 'PENDING' || o.status === 'PREPARING');
  const pendingCount = activeOrders.filter(o => o.status === 'PENDING').length;
  const preparingCount = activeOrders.filter(o => o.status === 'PREPARING').length;

  return (
    <div className="pb-24">
      <main className="px-container-margin max-w-[1400px] mx-auto">
        {/* Dashboard Header & Status */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-md mb-xl">
          <div className="flex items-center gap-lg">
            <div>
              <h2 className="font-headline-xl text-headline-xl text-on-surface">
                Hàng đợi Pha chế
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                Đang xử lý {activeOrders.length} đơn hàng
              </p>
            </div>
            
            {/* Live Clock for Staff */}
            <div className="hidden md:flex flex-col border-l border-outline-variant pl-lg">
              <span className="text-[10px] font-black uppercase tracking-widest text-outline">Giờ hiện tại</span>
              <span className="font-mono text-xl font-bold text-primary">
                {currentTime.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>

          <div className="flex gap-sm overflow-x-auto pb-2 md:pb-0">
            <div className="bg-error-container/20 border border-error/20 px-lg py-sm rounded-2xl flex flex-col items-center min-w-[100px]">
              <span className="text-[10px] font-bold text-error uppercase">Đang đợi</span>
              <span className="text-2xl font-bold text-error">{pendingCount}</span>
            </div>
            <div className="bg-primary-container/20 border border-primary/20 px-lg py-sm rounded-2xl flex flex-col items-center min-w-[100px]">
              <span className="text-[10px] font-bold text-primary uppercase">Đang làm</span>
              <span className="text-2xl font-bold text-primary">{preparingCount}</span>
            </div>
          </div>
        </div>

        {/* Order Queue Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-lg">
          {activeOrders.map(order => (
            <div key={order.id} className={`bg-surface-container-lowest rounded-2xl shadow-sm border ${order.status === 'PENDING' ? 'border-error/30 ring-1 ring-error/10' : 'border-outline-variant/30'} flex flex-col h-full overflow-hidden transition-all hover:shadow-md`}>
              {/* Card Header */}
              <div className={`p-md flex justify-between items-start border-b border-surface-variant/50 ${order.status === 'PENDING' ? 'bg-error-container/5' : 'bg-surface-container-low/50'}`}>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${order.status === 'PENDING' ? 'bg-error text-white' : 'bg-primary text-white'}`}>
                      Bàn {order.tableNumber}
                    </span>
                    <span className="text-[10px] font-bold text-outline uppercase tracking-wider">#{order.id.split('-')[1]}</span>
                  </div>
                  <span className="font-label-sm text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">person</span>
                    NV: {order.staffName || 'N/A'}
                  </span>
                </div>
                
                <div className="text-right">
                  <div className="font-mono text-lg font-black text-on-surface leading-tight">
                    {order.createdAt.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${order.status === 'PENDING' ? 'text-error animate-pulse' : 'text-primary'}`}>
                    {Math.floor((currentTime.getTime() - order.createdAt.getTime()) / 60000)}p trước
                  </span>
                </div>
              </div>

              {/* Items List */}
              <div className="p-md flex-grow space-y-md bg-white">
                <ul className="space-y-2">
                  {order.items.map(item => (
                    <li key={item.id} className="flex justify-between items-start border-b border-surface-variant/20 pb-2 last:border-0">
                      <div className="flex gap-3">
                        <span className="bg-surface-container text-on-surface w-6 h-6 rounded flex items-center justify-center font-bold text-xs shrink-0">
                          {item.quantity}
                        </span>
                        <div>
                          <span className="font-bold text-on-surface block leading-tight">{item.name}</span>
                          {item.note && (
                            <span className="text-[11px] text-error font-medium italic mt-0.5 block">
                              * {item.note}
                            </span>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                
                {order.note && (
                  <div className="bg-amber-50 border border-amber-200 text-amber-800 p-2 rounded-xl flex gap-2 items-start">
                    <span className="material-symbols-outlined text-[18px]">priority_high</span>
                    <p className="text-[11px] leading-tight font-medium">
                      {order.note}
                    </p>
                  </div>
                )}
              </div>

              {/* Action Footer */}
              <div className="p-md bg-surface-container-low border-t border-outline-variant/30 mt-auto flex gap-2">
                {order.status === 'PENDING' && (
                  <button 
                    onClick={async () => {
                      if(window.confirm('Bạn có chắc chắn muốn hủy đơn hàng này không?')) {
                        await cancelOrder(order.id);
                      }
                    }}
                    className="flex-shrink-0 bg-white border border-error/30 text-error hover:bg-error hover:text-white w-12 rounded-xl shadow-sm transition-all active:scale-95 flex items-center justify-center"
                    title="Hủy đơn"
                  >
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>
                      delete
                    </span>
                  </button>
                )}
                <button 
                  onClick={async () => {
                    await updateOrderStatus(order.id, 'READY');
                  }}
                  className="flex-grow bg-primary text-white hover:bg-primary/90 font-bold text-sm py-3 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  XÁC NHẬN XONG
                </button>
              </div>
            </div>
          ))}
          
          {activeOrders.length === 0 && (
            <div className="col-span-full py-24 text-center border-2 border-dashed border-outline-variant rounded-3xl">
              <span className="material-symbols-outlined text-6xl text-outline-variant mb-4">coffee</span>
              <p className="font-headline-md text-on-surface-variant">Hết đơn rồi, nghỉ tay thôi Barista!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

