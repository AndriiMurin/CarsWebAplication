import { Link } from 'react-router';

import type { Car } from '../models/Car';
import { useAuthStore } from '../store/useAuthStore';
import { useCarUiStore } from '../store/useCarUiStore';

type CarCardProps = {
  car: Car;
  onDelete: (id: string) => void;
  deletingId: string | null;
};

export default function CarCard({
  car,
  onDelete,
  deletingId
}: CarCardProps) {
  const user = useAuthStore(
    state => state.user
  );

  const favoriteCarIdsByUser = useCarUiStore(
    state => state.favoriteCarIdsByUser
  );

  const toggleFavorite = useCarUiStore(
    state => state.toggleFavorite
  );

  const favoriteCarIds = user
    ? favoriteCarIdsByUser[user.id] ?? []
    : [];

  const isFavorite = favoriteCarIds.includes(car.id);

  const isAdmin =
    user?.roles.includes('Admin') ?? false;

  return (
    <li>
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
        type="button"
        className={
          isFavorite
            ? 'favorite-button active-favorite'
            : 'favorite-button'
        }
        onClick={() => {
          if (user) {
            toggleFavorite(user.id, car.id);
          }
        }}
      >
        {isFavorite
          ? '★ W ulubionych'
          : '☆ Do ulubionych'}
      </button>

      {isAdmin && (
        <>
          {' '}
          <button
            type="button"
            onClick={() => onDelete(car.id)}
            disabled={deletingId !== null}
          >
            {deletingId === car.id
              ? 'Usuwanie...'
              : 'Usuń'}
          </button>
        </>
      )}
    </li>
  );
}
