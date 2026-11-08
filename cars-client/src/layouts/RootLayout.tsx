import { NavLink, Outlet } from "react-router";
import { useCarUiStore } from "../store/useCarUiStore";

export default function RootLayout() {
  const favoriteCount = useCarUiStore((state) => state.favoriteCarIds.length);
  return (
    <div>
      <header className="layout-header">
        <h2>Cars Application</h2>

        <nav className="menu">
          <NavLink to="/" end>
            Strona główna
          </NavLink>

          <NavLink to="/cars">Samochody</NavLink>

          <NavLink to="/cars/new">Dodaj samochód</NavLink>
          <span className="favorite-counter">
            Ulubione: {favoriteCount}
          </span>
        </nav>
      </header>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
