import { Link } from "react-router";
import type { Car } from "../models/Car";
import { useCarUiStore } from "../store/useCarUiStore";

type CarCardProps = {
  car: Car;
  onDelete: (id: string) => void;
  deletingId: string | null;
};

export default function CarCard({ car, onDelete, deletingId }: CarCardProps) {
  const isFavorite = useCarUiStore((state) =>
    state.favoriteCarIds.includes(car.id),
  );

  const toggleFavorite = useCarUiStore((state) => state.toggleFavorite);

  return (
    <li>
      <strong>
        {car.brand} {car.model}
      </strong>{" "}
      <Link to={`/cars/${car.id}`}>Szczegóły</Link>{" "}
      <Link to={`/cars/${car.id}/edit`}>Edytuj</Link>{" "}
      <button
        type="button"
        className={
          isFavorite ? "favorite-button active-favorite" : "favorite-button"
        }
        onClick={() => toggleFavorite(car.id)}
      >
        {isFavorite ? "W ulubionych" : "Do ulubionych"}
      </button>{" "}
      <button
        type="button"
        onClick={() => onDelete(car.id)}
        disabled={deletingId !== null}
      >
        {deletingId === car.id ? "Usuwanie..." : "Usuń"}
      </button>
    </li>
  );
}
