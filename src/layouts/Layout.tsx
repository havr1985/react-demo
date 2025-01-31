import { Menu } from '../components/menu/Menu.tsx';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <div>
      <Menu />
      <div className="container mx-auto">
        <Outlet />
      </div>
    </div>
  );
};
