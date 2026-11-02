
import { Link } from 'react-router';

export default function HomePage() {
  return (
    <div>
      <h1>Witaj w Cars Application!</h1>

      <p>
        Aplikacja umożliwia przeglądanie, dodawanie,
        edytowanie i usuwanie samochodów.
      </p>

      <p>
        Dane samochodów są pobierane z lokalnego REST API.
      </p>

      <Link to="/cars">Przejdź do listy samochodów</Link>
    </div>
  );
}
