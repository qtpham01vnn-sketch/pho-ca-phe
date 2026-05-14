import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';

export default function AdminLayout() {
  const navigate = useNavigate();

  return (
    <div className="bg-surface-container-lowest text-on-surface font-body-md min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-surface dark:bg-surface-dim shadow-sm md:shadow-[4px_0_24px_rgba(0,0,0,0.04)] z-50 flex flex-col h-auto md:h-screen sticky top-0">
        <div className="p-4 md:p-6 flex items-center justify-between md:justify-center border-b border-surface-variant/50">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-3xl">admin_panel_settings</span>
            <h1 className="font-headline-md text-primary hidden md:block">PCF Admin</h1>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="md:hidden text-on-surface-variant p-2 rounded-full hover:bg-surface-variant"
          >
            <span className="material-symbols-outlined">logout</span>
          </button>
        </div>

        <nav className="flex-1 px-2 py-4 flex md:flex-col overflow-x-auto md:overflow-y-auto gap-2">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${
                isActive 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-on-surface hover:bg-surface-variant'
              }`
            }
          >
            <span className="material-symbols-outlined text-[20px]">dashboard</span>
            Tổng quan (Dashboard)
          </NavLink>

          <button className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap text-on-surface hover:bg-surface-variant text-left opacity-50 cursor-not-allowed">
            <span className="material-symbols-outlined text-[20px]">restaurant_menu</span>
            Quản lý Thực đơn (Sắp ra mắt)
          </button>
        </nav>

        <div className="p-4 border-t border-surface-variant/50 hidden md:block">
          <button 
            onClick={() => navigate('/')}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-error hover:bg-error-container/20 transition-all font-semibold"
          >
            <span className="material-symbols-outlined">logout</span>
            Về trang Khách
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 h-screen overflow-y-auto bg-surface-container-lowest">
        <header className="hidden md:flex bg-surface px-8 py-4 items-center justify-between shadow-sm sticky top-0 z-40">
          <h2 className="font-headline-md text-on-surface">Trang Quản Trị</h2>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="font-label-md text-on-surface">Chủ quán</p>
              <p className="font-label-sm text-outline">Admin</p>
            </div>
            <div className="w-10 h-10 bg-tertiary-container text-on-tertiary-container rounded-full flex items-center justify-center font-bold">
              <span className="material-symbols-outlined">shield_person</span>
            </div>
          </div>
        </header>
        
        <Outlet />
      </div>
    </div>
  );
}
