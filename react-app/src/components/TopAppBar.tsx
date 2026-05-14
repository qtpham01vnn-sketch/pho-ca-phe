import { useNavigate } from 'react-router-dom';

export default function TopAppBar() {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 w-full z-50 flex items-center justify-between px-gutter h-16 bg-surface shadow-sm">
      <button 
        onClick={() => navigate(-1)}
        className="material-symbols-outlined text-primary hover:bg-surface-variant transition-colors p-2 rounded-full active:scale-95 duration-100"
      >
        menu
      </button>
      <button 
        onClick={() => navigate('/')}
        className="font-headline-lg-mobile text-headline-lg-mobile text-primary active:scale-95 transition-all"
        title="Quay lại trang Quét QR"
      >
        Phố Cà Phê
      </button>
      <button className="material-symbols-outlined text-primary hover:bg-surface-variant transition-colors p-2 rounded-full active:scale-95 duration-100">
        account_circle
      </button>
    </header>
  );
}
