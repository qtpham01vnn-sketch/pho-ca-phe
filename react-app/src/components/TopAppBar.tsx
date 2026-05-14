import { useNavigate } from 'react-router-dom';

export default function TopAppBar() {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 w-full z-50 flex items-center justify-between px-gutter h-14 bg-white/80 backdrop-blur-md shadow-sm border-b border-surface-variant">
      <button 
        onClick={() => navigate(-1)}
        className="material-symbols-outlined text-primary hover:bg-surface-variant transition-colors p-2 rounded-full active:scale-95 duration-100"
      >
        arrow_back
      </button>
      <button 
        onClick={() => navigate('/')}
        className="font-headline-md text-primary font-bold text-lg active:scale-95 transition-all truncate"
        title="Quay lại trang chính"
      >
        Cà Phê Song Huy
      </button>
      <button className="material-symbols-outlined text-primary hover:bg-surface-variant transition-colors p-2 rounded-full active:scale-95 duration-100">
        account_circle
      </button>
    </header>
  );
}
