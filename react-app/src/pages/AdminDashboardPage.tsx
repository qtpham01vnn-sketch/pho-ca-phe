import { useState, useEffect } from 'react';
import { useOrder } from '../contexts/OrderContext';

export default function AdminDashboardPage() {
  const { orders, staffAssignments, updateStaffAssignment } = useOrder();
  
  // Real-time Clock
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Local state for editing staff assignments
  const [editingTable, setEditingTable] = useState<string | null>(null);
  const [editName, setEditName] = useState<string>('');

  const handleEditStaff = (table: string, currentName: string) => {
    setEditingTable(table);
    setEditName(currentName);
  };

  const handleSaveStaff = async (table: string) => {
    if (editName.trim()) {
      await updateStaffAssignment(table, editName.trim());
    }
    setEditingTable(null);
  };

  const totalOrders = orders.length;
  const completedOrders = orders.filter(o => o.status === 'COMPLETED' || o.status === 'READY');
  const revenue = completedOrders.reduce((sum, order) => sum + order.totalPrice, 0);

  // Calculate items sold
  const itemCounts: Record<string, number> = {};
  completedOrders.forEach(order => {
    order.items.forEach(item => {
      itemCounts[item.name] = (itemCounts[item.name] || 0) + item.quantity;
    });
  });

  const topItems = Object.entries(itemCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Calculate staff revenue
  const staffRevenue: Record<string, { revenue: number; orders: number }> = {};
  completedOrders.forEach(order => {
    const staff = order.staffName || 'Khác';
    if (!staffRevenue[staff]) {
      staffRevenue[staff] = { revenue: 0, orders: 0 };
    }
    staffRevenue[staff].revenue += order.totalPrice;
    staffRevenue[staff].orders += 1;
  });

  const topStaff = Object.entries(staffRevenue)
    .sort((a, b) => b[1].revenue - a[1].revenue);

  // Recent Orders List (Sorted by latest)
  const recentOrders = [...orders].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 10);

  return (
    <div className="p-md md:p-lg lg:max-w-7xl mx-auto pb-24">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-md mb-lg">
        <div>
          <h2 className="font-headline-xl text-headline-xl text-on-surface">
            Hệ thống Quản trị Doanh Thu
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Báo cáo chi tiết vận hành ngày {currentTime.toLocaleDateString('vi-VN')}
          </p>
        </div>
        
        {/* Live Clock Card */}
        <div className="bg-surface-container-high px-lg py-md rounded-2xl shadow-sm border border-primary/20 flex flex-col items-end">
          <div className="flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined text-[18px] animate-pulse">schedule</span>
            <span className="font-label-sm uppercase tracking-widest font-bold text-[10px]">Giờ hệ thống</span>
          </div>
          <span className="font-display-sm text-2xl font-mono font-bold text-on-surface">
            {currentTime.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-md mb-xl">
        <div className="bg-primary text-white rounded-2xl p-lg shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4 opacity-90">
              <span className="material-symbols-outlined text-3xl">payments</span>
              <span className="font-label-lg text-lg">Doanh thu hôm nay</span>
            </div>
            <h3 className="font-display-sm text-4xl font-bold">{revenue.toLocaleString('vi-VN')}đ</h3>
          </div>
          <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-[120px] opacity-10 rotate-12">trending_up</span>
        </div>

        <div className="bg-surface-container rounded-2xl p-lg shadow-sm border border-outline-variant/30 flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-3xl text-primary">receipt_long</span>
            <span className="font-label-lg text-lg text-on-surface-variant">Tổng số đơn</span>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="font-display-sm text-4xl font-bold text-on-surface">{totalOrders}</h3>
            <span className="text-outline">đơn hàng</span>
          </div>
        </div>

        <div className="bg-surface-container rounded-2xl p-lg shadow-sm border border-outline-variant/30 flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-3xl text-secondary">check_circle</span>
            <span className="font-label-lg text-lg text-on-surface-variant">Hoàn thành</span>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="font-display-sm text-4xl font-bold text-on-surface">{completedOrders.length}</h3>
            <span className="text-outline">đã phục vụ</span>
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-lg mb-xl">
        
        {/* Recent Orders List (NEW) */}
        <div className="xl:col-span-2 bg-surface-container-lowest rounded-2xl p-lg shadow-sm border border-outline-variant/30 overflow-hidden">
          <div className="flex items-center justify-between mb-md">
            <h3 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">history</span>
              Đơn hàng gần đây
            </h3>
            <span className="text-xs bg-surface-variant px-2 py-1 rounded text-on-surface-variant uppercase font-bold tracking-wider">Theo thời gian thực</span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-surface-variant text-outline uppercase text-[11px] font-bold tracking-widest">
                  <th className="pb-3 px-2">Giờ đặt</th>
                  <th className="pb-3 px-2">Bàn</th>
                  <th className="pb-3 px-2">Chi tiết</th>
                  <th className="pb-3 px-2 text-right">Tổng tiền</th>
                  <th className="pb-3 px-2 text-center">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-variant/50">
                {recentOrders.map(order => (
                  <tr key={order.id} className="hover:bg-surface-container-low transition-colors group">
                    <td className="py-4 px-2">
                      <div className="flex flex-col">
                        <span className="font-mono font-bold text-on-surface">
                          {order.createdAt.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <span className="text-[10px] text-outline">#{order.id.split('-')[1]}</span>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <span className="bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-lg text-xs font-bold">
                        Bàn {order.tableNumber}
                      </span>
                    </td>
                    <td className="py-4 px-2">
                      <p className="text-xs font-medium text-on-surface truncate max-w-[150px]">
                        {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                      </p>
                      <span className="text-[10px] text-outline block">Phục vụ: {order.staffName}</span>
                    </td>
                    <td className="py-4 px-2 text-right font-bold text-on-surface">
                      {order.totalPrice.toLocaleString('vi-VN')}đ
                    </td>
                    <td className="py-4 px-2 text-center">
                      <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${
                        order.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                        order.status === 'READY' ? 'bg-blue-100 text-blue-700' :
                        order.status === 'CANCELLED' ? 'bg-red-100 text-red-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {order.status === 'COMPLETED' ? 'Xong' : order.status === 'READY' ? 'Sẵn sàng' : order.status === 'CANCELLED' ? 'Hủy' : 'Đang làm'}
                      </span>
                    </td>
                  </tr>
                ))}
                {recentOrders.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-outline italic">Chưa có đơn hàng nào phát sinh</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Items & Staff Stats Column */}
        <div className="flex flex-col gap-lg">
          {/* Top Items */}
          <div className="bg-surface-container-lowest rounded-2xl p-lg shadow-sm border border-outline-variant/30 flex-1">
            <h3 className="font-headline-md text-headline-md text-on-surface mb-md flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">trending_up</span>
              Món bán chạy
            </h3>
            <ul className="space-y-4">
              {topItems.map(([name, count], index) => (
                <li key={name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-outline w-4">{index + 1}</span>
                    <span className="font-body-md text-on-surface truncate max-w-[120px]">{name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-16 bg-surface-variant rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${(count / topItems[0][1]) * 100}%` }}></div>
                    </div>
                    <span className="text-xs font-bold text-primary">{count}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Staff Performance */}
          <div className="bg-surface-container-lowest rounded-2xl p-lg shadow-sm border border-outline-variant/30 flex-1">
            <h3 className="font-headline-md text-headline-md text-on-surface mb-md flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">badge</span>
              Hiệu suất Nhân viên
            </h3>
            <div className="space-y-4">
              {topStaff.map(([name, stats]) => (
                <div key={name} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center text-xs font-bold">
                      {name.charAt(0)}
                    </div>
                    <div>
                      <span className="text-sm font-bold text-on-surface block leading-tight">{name}</span>
                      <span className="text-[10px] text-outline uppercase tracking-wider">{stats.orders} đơn</span>
                    </div>
                  </div>
                  <span className="font-bold text-secondary">{stats.revenue.toLocaleString('vi-VN')}đ</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Staff Assignment Settings */}
      <div className="bg-surface-container-lowest rounded-2xl p-lg shadow-sm border border-outline-variant/30">
        <div className="flex items-center justify-between mb-lg">
          <div>
            <h3 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary">assignment_ind</span>
              Phân công Trực bàn
            </h3>
            <p className="text-on-surface-variant text-sm mt-1">
              Chỉnh sửa nhân sự phụ trách từng khu vực để hệ thống tự động ghi nhận doanh số.
            </p>
          </div>
          <span className="material-symbols-outlined text-outline-variant text-4xl">chair</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-md">
          {Object.entries(staffAssignments).map(([table, name]) => (
            <div key={table} className={`rounded-xl p-md border transition-all ${editingTable === table ? 'bg-primary-container/10 border-primary shadow-md' : 'bg-surface-container border-outline-variant/20 hover:border-primary/50'}`}>
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-outline">Bàn {table}</span>
                <button 
                  onClick={() => handleEditStaff(table, name)}
                  className="material-symbols-outlined text-[16px] text-primary hover:bg-primary/10 rounded-full p-1 transition-colors"
                >
                  edit
                </button>
              </div>
              
              {editingTable === table ? (
                <div className="space-y-2">
                  <input 
                    type="text" 
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full text-xs p-1.5 border border-primary rounded-lg bg-white shadow-inner focus:outline-none"
                    autoFocus
                    onKeyDown={(e) => e.key === 'Enter' && handleSaveStaff(table)}
                  />
                  <div className="flex gap-1">
                    <button onClick={() => handleSaveStaff(table)} className="flex-1 bg-primary text-white text-[10px] py-1.5 rounded-lg font-bold">LƯU</button>
                    <button onClick={() => setEditingTable(null)} className="flex-1 bg-surface-variant text-on-surface-variant text-[10px] py-1.5 rounded-lg">HỦY</button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  <span className="font-body-sm font-bold text-on-surface truncate">
                    {name}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

