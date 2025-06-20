import Header from '../Header/header';
import { Outlet } from 'react-router-dom';

function LayoutProtegido() {
  return (
    <>
      <Header />
      <main style={{ padding: '20px' }}>
        <Outlet />
      </main>
    </>
  );
}

export default LayoutProtegido;