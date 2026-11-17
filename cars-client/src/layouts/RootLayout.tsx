import { NavLink, Outlet, useNavigate } from "react-router";
import { useCarUiStore } from "../store/useCarUiStore";
import { useAuthStore } from "../store/useAuthStore";

export default function RootLayout() {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);

  const logout = useAuthStore((state) => state.logout);

  const favoriteCarIdsByUser = useCarUiStore(
    (state) => state.favoriteCarIdsByUser,
  );

  const favoriteCount = user ? (favoriteCarIdsByUser[user.id] ?? []).length : 0;

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div>
      <header className="layout-header">
        <h2>Cars Application</h2>

        <nav className="menu">
          <NavLink to="/" end>
            Strona główna
          </NavLink>

          {user && (
            <>
              <NavLink to="/cars" end>
                Samochody
              </NavLink>

              <NavLink to="/cars/new">Dodaj samochód</NavLink>
            </>
          )}

          <NavLink to="/about">O aplikacji</NavLink>

          {user ? (
            <>
              <span className="favorite-counter">
                Ulubione: {favoriteCount}
              </span>

              <div className="user-profile">
                <div className="user-avatar">
                  {user.userName.charAt(0).toUpperCase()}
                </div>

                <div className="user-details">
                  <span className="user-name">{user.userName}</span>

                  <span className="user-role">
                    {user.roles.includes("Admin")
                      ? "Administrator"
                      : "Użytkownik"}
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="nav-button"
                onClick={handleLogout}
              >
                Wyloguj
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login">Logowanie</NavLink>

              <NavLink to="/register">Rejestracja</NavLink>
            </>
          )}
        </nav>
      </header>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
