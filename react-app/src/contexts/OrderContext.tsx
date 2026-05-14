import { createContext, useContext, useState, type ReactNode, useEffect, type Dispatch, type SetStateAction } from 'react';
import { supabase } from '../lib/supabase';
import type { CartItem } from './CartContext';

export type OrderStatus = 'PENDING' | 'PREPARING' | 'READY' | 'COMPLETED' | 'CANCELLED';

export interface Order {
  id: string;
  tableNumber: string;
  staffName?: string;
  items: CartItem[];
  totalPrice: number;
  status: OrderStatus;
  createdAt: Date;
  note?: string;
}

interface OrderContextType {
  tableNumber: string;
  setTableNumber: (table: string) => void;
  orders: Order[];
  placeOrder: (items: CartItem[], totalPrice: number, note?: string) => Promise<string>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
  cancelOrder: (orderId: string) => Promise<void>;
  currentCustomerOrder: Order | null;
  getStaffForTable: (table: string) => string;
  staffAssignments: Record<string, string>;
  setStaffAssignments: Dispatch<SetStateAction<Record<string, string>>>;
  updateStaffAssignment: (table: string, name: string) => Promise<void>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [tableNumber, setTableNumber] = useState<string>('05');
  const [orders, setOrders] = useState<Order[]>([]);
  const [staffAssignments, setStaffAssignments] = useState<Record<string, string>>({});

  // 1. Initial Data Load
  useEffect(() => {
    const fetchData = async () => {
      // Fetch Orders
      const { data: ordersData, error: ordersError } = await supabase
        .from('pcf_orders')
        .select(`
          *,
          items:pcf_order_items(*)
        `)
        .order('created_at', { ascending: false });

      if (!ordersError && ordersData) {
        const formattedOrders = ordersData.map((o: any) => ({
          ...o,
          tableNumber: o.table_number,
          totalPrice: o.total_price,
          staffName: o.staff_name,
          createdAt: new Date(o.created_at)
        }));
        setOrders(formattedOrders);
      }

      // Fetch Staff Assignments
      const { data: staffData, error: staffError } = await supabase
        .from('pcf_staff_assignments')
        .select('*');

      if (!staffError && staffData) {
        const assignments: Record<string, string> = {};
        staffData.forEach((item: any) => {
          assignments[item.table_number] = item.staff_name;
        });
        setStaffAssignments(assignments);
      }
    };

    fetchData();
  }, []);

  // 2. Real-time Subscription
  useEffect(() => {
    // Subscribe to Orders
    const orderChannel = supabase
      .channel('pcf_orders_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'pcf_orders' }, async () => {
        // When any change happens, we re-fetch the specific order or refresh list
        // For simplicity in this demo, let's just re-fetch everything to ensure items are joined
        const { data: updatedOrders, error } = await supabase
          .from('pcf_orders')
          .select(`*, items:pcf_order_items(*)`)
          .order('created_at', { ascending: false });
        
        if (!error && updatedOrders) {
          setOrders(updatedOrders.map((o: any) => ({
            ...o,
            tableNumber: o.table_number,
            totalPrice: o.total_price,
            staffName: o.staff_name,
            createdAt: new Date(o.created_at)
          })));
        }
      })
      .subscribe();

    // Subscribe to Staff Assignments
    const staffChannel = supabase
      .channel('pcf_staff_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'pcf_staff_assignments' }, (payload) => {
        if (payload.new) {
          const newItem = payload.new as any;
          setStaffAssignments(prev => ({
            ...prev,
            [newItem.table_number]: newItem.staff_name
          }));
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(orderChannel);
      supabase.removeChannel(staffChannel);
    };
  }, []);

  // 3. Extract table from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const table = params.get('table');
    if (table) {
      setTableNumber(table);
    }
  }, []);

  const getStaffForTable = (table: string) => {
    return staffAssignments[table] || 'Nhân viên Khác';
  };

  const placeOrder = async (items: CartItem[], totalPrice: number, note?: string) => {
    const orderId = `PCF-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
    const staffName = getStaffForTable(tableNumber);

    // Insert main order
    const { error: orderError } = await supabase
      .from('pcf_orders')
      .insert({
        id: orderId,
        table_number: tableNumber,
        total_price: totalPrice,
        status: 'PENDING',
        staff_name: staffName,
        note: note
      });

    if (orderError) {
      console.error('Lỗi khi đặt hàng:', orderError);
      throw orderError;
    }

    // Insert order items
    const orderItems = items.map(item => ({
      order_id: orderId,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      note: item.note
    }));

    const { error: itemsError } = await supabase
      .from('pcf_order_items')
      .insert(orderItems);

    if (itemsError) {
      console.error('Lỗi khi lưu chi tiết món:', itemsError);
      // We might want to handle partial failure here
    }

    return orderId;
  };

  const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    const { error } = await supabase
      .from('pcf_orders')
      .update({ status })
      .eq('id', orderId);

    if (error) {
      console.error('Lỗi khi cập nhật trạng thái:', error);
    }
  };

  const cancelOrder = async (orderId: string) => {
    await updateOrderStatus(orderId, 'CANCELLED');
  };

  const updateStaffAssignment = async (table: string, name: string) => {
    const { error } = await supabase
      .from('pcf_staff_assignments')
      .upsert({ table_number: table, staff_name: name });

    if (error) {
      console.error('Lỗi khi cập nhật nhân viên:', error);
    }
  };

  const currentCustomerOrder = [...orders]
    .filter(o => o.tableNumber === tableNumber && o.status !== 'CANCELLED')
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0] || null;

  return (
    <OrderContext.Provider value={{ 
      tableNumber, 
      setTableNumber, 
      orders, 
      placeOrder, 
      updateOrderStatus,
      cancelOrder,
      currentCustomerOrder,
      getStaffForTable,
      staffAssignments,
      setStaffAssignments,
      updateStaffAssignment
    }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
}

