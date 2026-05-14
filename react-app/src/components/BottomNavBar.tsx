import { NavLink } from 'react-router-dom';

export default function BottomNavBar() {
  return (
    <nav className="fixed bottom-0 w-full z-50 flex justify-around items-center px-2 py-2 bg-surface-container-lowest shadow-[0_-4px_20px_rgba(0,0,0,0.04)] border-t border-surface-variant/50">
      <NavLink
        to="/menu"
        className={({ isActive }) =>
          `flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
            isActive ? 'text-primary' : 'text-on-surface-variant hover:bg-surface-container-high'
          }`
        }
      >
        <span className="material-symbols-outlined">restaurant_menu</span>
        <span className="font-label-sm text-label-sm mt-1">Thực đơn</span>
      </NavLink>

      <NavLink
        to="/cart"
        className={({ isActive }) =>
          `flex flex-col items-center justify-center rounded-full px-4 py-1 transition-all active:scale-90 duration-200 ${
            isActive
              ? 'bg-primary-container text-on-primary-container'
              : 'text-on-surface-variant hover:bg-surface-container-high'
          }`
        }
      >
        {({ isActive }) => (
          <>
            <span
              className={`material-symbols-outlined ${isActive ? 'fill-icon' : ''}`}
            >
              shopping_basket
            </span>
            <span className="font-label-sm text-label-sm mt-1">Đơn hàng</span>
          </>
        )}
      </NavLink>

      <NavLink
        to="/order-status"
        className={({ isActive }) =>
          `flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
            isActive ? 'text-primary' : 'text-on-surface-variant hover:bg-surface-container-high'
          }`
        }
      >
        <span className="material-symbols-outlined">receipt_long</span>
        <span className="font-label-sm text-label-sm mt-1">Trạng thái</span>
      </NavLink>

      <NavLink
        to="/membership"
        className={({ isActive }) =>
          `flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
            isActive
              ? 'bg-primary/10 text-primary px-4 rounded-full'
              : 'text-on-surface-variant hover:bg-surface-container-high'
          }`
        }
      >
        {({ isActive }) => (
          <>
            <span
              className={`material-symbols-outlined ${isActive ? 'fill-icon' : ''}`}
            >
              person
            </span>
            <span className="font-label-sm text-label-sm mt-1">Cá nhân</span>
          </>
        )}
      </NavLink>
    </nav>
  );
}
