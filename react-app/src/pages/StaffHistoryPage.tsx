import { useOrder } from '../contexts/OrderContext';

export default function StaffHistoryPage() {
  const { orders } = useOrder();

  const completedOrders = orders.filter(o => o.status === 'READY' || o.status === 'COMPLETED');

  return (
    <div className="p-md md:p-lg lg:max-w-7xl mx-auto">
      <div className="mb-lg">
        <h2 className="font-headline-xl text-headline-xl text-on-surface">
          Lịch sử Đơn hàng
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Các đơn đã hoàn thành trong ngày hôm nay
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-lg">
        {completedOrders.map(order => (
          <div key={order.id} className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 flex flex-col h-full overflow-hidden opacity-80 hover:opacity-100 transition-opacity">
            <div className="p-md flex justify-between items-start border-b border-surface-variant">
              <div>
                <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                  Bàn số {order.tableNumber}
                </span>
                <h3 className="font-headline-md text-headline-md text-on-surface">#{order.id}</h3>
              </div>
              <div className="text-right">
                <span className="block font-label-sm text-label-sm text-on-surface-variant">
                  {order.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                <span className="bg-secondary-container text-on-secondary-container px-2 py-1 rounded text-xs font-semibold mt-1 inline-block">
                  {order.status === 'COMPLETED' ? 'Đã lấy' : 'Đã xong'}
                </span>
              </div>
            </div>

            <div className="p-md flex-grow space-y-md">
              <ul className="space-y-xs">
                {order.items.map(item => (
                  <li key={item.id} className="flex justify-between items-center">
                    <span className="font-body-sm text-body-sm">{item.quantity}x {item.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
        {completedOrders.length === 0 && (
          <div className="col-span-full py-20 text-center text-outline">
            <span className="material-symbols-outlined text-6xl mb-4">receipt_long</span>
            <p className="font-headline-md">Chưa có đơn hàng nào hoàn tất</p>
          </div>
        )}
      </div>
    </div>
  );
}
