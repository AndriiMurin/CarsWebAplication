
import { NavLink, Outlet } from 'react-router';

export default function RootLayout() {
  return (
    <div>
      <header className="layout-header">
        <h2>Cars Application</h2>

        <nav className="menu">
          <NavLink to="/" end>
            Strona główna
          </NavLink>

          <NavLink to="/cars">
            Samochody
          </NavLink>

          <NavLink to="/cars/new">
            Dodaj samochód
          </NavLink>
        </nav>
      </header>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
