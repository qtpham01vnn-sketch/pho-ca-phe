import { Outlet } from 'react-router-dom';
import TopAppBar from '../components/TopAppBar';
import BottomNavBar from '../components/BottomNavBar';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-surface">
      <TopAppBar />
      <main className="pt-16 pb-24 px-4 max-w-lg mx-auto">
        <Outlet />
      </main>
      <BottomNavBar />
    </div>
  );
}
