
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import type { Car } from '../models/Car';
import { getCars, deleteCar } from '../services/carService';

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadCars() {
      try {
        const data = await getCars(controller.signal);
        if (!controller.signal.aborted) {
          setCars(data);
        }
      } catch {
        if (!controller.signal.aborted) {
          setError('Nie udało się pobrać samochodów.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void loadCars();

    return () => controller.abort();
  }, []);

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      'Czy na pewno chcesz usunąć ten samochód?'
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);
      setDeleteError('');

      await deleteCar(id);

      setCars(prevCars =>
        prevCars.filter(car => car.id !== id)
      );
    } catch {
      setDeleteError('Nie udało się usunąć samochodu.');
    } finally {
      setDeletingId(null);
    }
  }
  const filteredCars = cars.filter(car =>
  `${car.brand} ${car.model}`
    .toLowerCase()
    .includes(search.toLowerCase())
  );

  if (loading) {
    return <p>Ładowanie samochodów...</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  return (
    <div>
      <h1>Lista samochodów</h1>
      <input
        type="text"
        placeholder="Szukaj po marce lub modelu..."
        value={search}
        onChange={event => setSearch(event.target.value)}
      />


      {deleteError && <p role="alert">{deleteError}</p>}

      {cars.length === 0 ? (
        <p>Brak samochodów.</p>
      ) : filteredCars.length === 0 ? (
        <p>Nie znaleziono pasujących samochodów.</p>
      ) : (
        <ul>
          {filteredCars.map(car => (
            <li key={car.id}>
              <strong>
                {car.brand} {car.model}
              </strong>

              {' '}

              <Link to={`/cars/${car.id}`}>
                Szczegóły
              </Link>
              {' '}

              <Link to={`/cars/${car.id}/edit`}>
                Edytuj
              </Link>

              {' '}

              <button
                onClick={() => handleDelete(car.id)}
                disabled={deletingId !== null}
              >
                {deletingId === car.id ? 'Usuwanie...' : 'Usuń'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
