import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
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
  placeOrder: (items: CartItem[], totalPrice: number, note?: string) => string;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  cancelOrder: (orderId: string) => void;
  currentCustomerOrder: Order | null;
  getStaffForTable: (table: string) => string;
  staffAssignments: Record<string, string>;
  setStaffAssignments: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

// Define default staff assignments
const DEFAULT_STAFF_ASSIGNMENTS: Record<string, string> = {
  '01': 'Nguyễn Văn A',
  '02': 'Nguyễn Văn A',
  '03': 'Nguyễn Văn A',
  '04': 'Nguyễn Văn A',
  '05': 'Nguyễn Văn A',
  '06': 'Trần Thị B',
  '07': 'Trần Thị B',
  '08': 'Trần Thị B',
  '09': 'Trần Thị B',
  '10': 'Trần Thị B',
};

export function OrderProvider({ children }: { children: ReactNode }) {
  const [tableNumber, setTableNumber] = useState<string>('05'); // Default or extract from URL later
  const [orders, setOrders] = useState<Order[]>(() => {
    // Try to load from localStorage first
    try {
      const saved = localStorage.getItem('pcf_orders');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Convert string dates back to Date objects
        return parsed.map((o: any) => ({
          ...o,
          createdAt: new Date(o.createdAt)
        }));
      }
    } catch (e) {
      console.error("Could not load orders from localStorage", e);
    }
    return [];
  });

  // Load dynamically adjustable staff assignments from localStorage (or fallback to defaults)
  const [staffAssignments, setStaffAssignments] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('pcf_staff_assignments');
      return saved ? JSON.parse(saved) : DEFAULT_STAFF_ASSIGNMENTS;
    } catch (e) {
      return DEFAULT_STAFF_ASSIGNMENTS;
    }
  });

  // Sync staffAssignments to localStorage
  useEffect(() => {
    localStorage.setItem('pcf_staff_assignments', JSON.stringify(staffAssignments));
  }, [staffAssignments]);

  const getStaffForTable = (table: string) => {
    return staffAssignments[table] || 'Nhân viên Khác';
  };

  // Sync orders to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('pcf_orders', JSON.stringify(orders));
  }, [orders]);

  // Listen for changes from other tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'pcf_orders' && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          const mapped = parsed.map((o: any) => ({
            ...o,
            createdAt: new Date(o.createdAt)
          }));
          setOrders(mapped);
        } catch (error) {
          console.error("Failed to parse orders from other tab", error);
        }
      }
      
      if (e.key === 'pcf_staff_assignments' && e.newValue) {
        try {
          setStaffAssignments(JSON.parse(e.newValue));
        } catch (error) {
          console.error("Failed to parse staff assignments", error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Automatically extract table from URL parameters once when the app loads
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const table = params.get('table');
    if (table) {
      setTableNumber(table);
    }
  }, []);

  const placeOrder = (items: CartItem[], totalPrice: number, note?: string) => {
    const newOrder: Order = {
      id: `PCF-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      tableNumber,
      staffName: getStaffForTable(tableNumber), // Tag the staff at the time of order
      items,
      totalPrice,
      status: 'PENDING',
      createdAt: new Date(),
      note,
    };
    
    // Update local state, which will trigger the localStorage sync effect
    setOrders(prev => [...prev, newOrder]);
    
    // Auto transition to PREPARING after 3 seconds to simulate Kitchen accepting
    setTimeout(() => {
      setOrders(currentOrders => {
        // Only auto-transition if it hasn't been cancelled
        const currentOrder = currentOrders.find(o => o.id === newOrder.id);
        if (currentOrder && currentOrder.status === 'PENDING') {
          return currentOrders.map(order => 
            order.id === newOrder.id ? { ...order, status: 'PREPARING' } : order
          );
        }
        return currentOrders;
      });
    }, 3000);

    return newOrder.id;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  const cancelOrder = (orderId: string) => {
    updateOrderStatus(orderId, 'CANCELLED');
  };

  // For the customer, find their latest order based on the table number
  // Skip cancelled orders so they don't block the screen permanently
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
      setStaffAssignments
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
