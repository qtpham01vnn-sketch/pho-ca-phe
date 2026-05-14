import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../contexts/OrderContext';
import { useAuth } from '../contexts/AuthContext';

export default function WelcomePage() {
  const navigate = useNavigate();
  const { setTableNumber } = useOrder();
  const { login } = useAuth();
  
  // UI States
  const [tableInput, setTableInput] = useState('');
  const [showPortal, setShowPortal] = useState(false);
  const [authMode, setAuthMode] = useState<'STAFF' | 'ADMIN' | null>(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Long press logic
  const timerRef = useRef<any>(null);
  const handleLongPressStart = () => {
    timerRef.current = setTimeout(() => {
      setShowPortal(true);
    }, 2000); // 2 seconds long press to show management portal
  };
  const handleLongPressEnd = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const handleScanQR = () => {
    setTableNumber('09');
    navigate('/menu');
  };

  const handleEnterTable = (e: React.FormEvent) => {
    e.preventDefault();
    if (tableInput.trim()) {
      setTableNumber(tableInput.trim());
      navigate('/menu');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode) {
      const success = login(authMode, password);
      if (success) {
        navigate(authMode === 'ADMIN' ? '/admin/dashboard' : '/staff/barista');
      } else {
        setError('Mật khẩu không chính xác!');
        setTimeout(() => setError(''), 2000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6 text-center select-none">
      {/* Brand Section - Long press here to show management options */}
      <div 
        onMouseDown={handleLongPressStart}
        onMouseUp={handleLongPressEnd}
        onMouseLeave={handleLongPressEnd}
        onTouchStart={handleLongPressStart}
        onTouchEnd={handleLongPressEnd}
        className="cursor-pointer active:scale-95 transition-transform"
      >
        <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto">
          <span className="material-symbols-outlined text-primary text-6xl">coffee</span>
        </div>
        <h1 className="font-headline-md text-4xl text-primary font-bold mb-2 tracking-tight">Cà Phê Song Huyền</h1>
      </div>
      
      <p className="text-on-surface-variant font-body-md mb-12">Hương vị đậm đà, trải nghiệm hiện đại</p>

      {/* Customer Main Actions */}
      <div className="w-full max-w-sm space-y-6">
        <button 
          onClick={handleScanQR}
          className="w-full bg-primary text-white py-4 rounded-2xl font-headline-md text-lg shadow-xl shadow-primary/20 active:scale-95 transition-all flex items-center justify-center gap-3"
        >
          <span className="material-symbols-outlined">qr_code_scanner</span>
          Quét mã tại bàn
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-surface-variant/50"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-surface text-outline font-medium uppercase tracking-widest text-[10px]">Hoặc nhập số bàn</span>
          </div>
        </div>

        <form onSubmit={handleEnterTable} className="flex gap-2">
          <input 
            type="text" 
            value={tableInput}
            onChange={(e) => setTableInput(e.target.value)}
            placeholder="VD: 05, 12, VIP..."
            className="flex-1 px-5 py-4 rounded-2xl border border-outline-variant bg-surface-container-lowest focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-bold"
          />
          <button 
            type="submit"
            className="bg-secondary text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-secondary/20 active:scale-95 transition-all"
          >
            Vào
          </button>
        </form>
      </div>

      {/* Subtle Hint for Staff at bottom - very low contrast */}
      <div className="fixed bottom-6 text-[10px] text-outline-variant uppercase tracking-[0.2em] opacity-30">
        &copy; 2026 Cà Phê Song Huyền - Vận hành bởi Antigravity
      </div>

      {/* Management Portal Modal */}
      {showPortal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-surface-container-lowest w-full max-w-sm rounded-3xl p-8 shadow-2xl animate-scale-up">
            {!authMode ? (
              <>
                <h2 className="font-headline-md text-2xl text-on-surface mb-6">Cổng Quản trị</h2>
                <div className="grid grid-cols-1 gap-4">
                  <button 
                    onClick={() => setAuthMode('STAFF')}
                    className="flex items-center justify-between p-4 bg-surface-container rounded-2xl hover:bg-primary/5 border border-outline-variant transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <span className="material-symbols-outlined text-primary">coffee_maker</span>
                      <span className="font-bold text-on-surface">Nhân viên Bếp</span>
                    </div>
                    <span className="material-symbols-outlined text-outline group-hover:translate-x-1 transition-transform">chevron_right</span>
                  </button>
                  <button 
                    onClick={() => setAuthMode('ADMIN')}
                    className="flex items-center justify-between p-4 bg-surface-container rounded-2xl hover:bg-primary/5 border border-outline-variant transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <span className="material-symbols-outlined text-primary">admin_panel_settings</span>
                      <span className="font-bold text-on-surface">Chủ quán / Admin</span>
                    </div>
                    <span className="material-symbols-outlined text-outline group-hover:translate-x-1 transition-transform">chevron_right</span>
                  </button>
                </div>
                <button 
                  onClick={() => setShowPortal(false)}
                  className="mt-8 text-outline font-bold text-sm uppercase tracking-widest"
                >
                  Đóng
                </button>
              </>
            ) : (
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="flex items-center gap-4 mb-2">
                  <button type="button" onClick={() => {setAuthMode(null); setPassword('');}} className="material-symbols-outlined text-outline">arrow_back</button>
                  <h2 className="font-headline-md text-xl text-on-surface">
                    Nhập mật khẩu {authMode === 'ADMIN' ? 'Admin' : 'Bếp'}
                  </h2>
                </div>
                
                <div>
                  <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Nhập mã xác thực..."
                    className={`w-full px-5 py-4 rounded-2xl border ${error ? 'border-error' : 'border-outline-variant'} bg-surface focus:border-primary outline-none text-center text-2xl tracking-[0.5em] font-mono`}
                    autoFocus
                  />
                  {error && <p className="text-error text-xs mt-2 font-bold">{error}</p>}
                </div>

                <button 
                  type="submit"
                  className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-lg active:scale-95 transition-all"
                >
                  XÁC NHẬN
                </button>
                
                <p className="text-[10px] text-outline text-center">
                  Mặc định: Bếp (1122), Admin (admin2026)
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

