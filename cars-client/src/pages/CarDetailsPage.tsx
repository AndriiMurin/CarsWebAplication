import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import type { Car } from "../models/Car";
import { getCarById } from "../services/carService";
import { useCarUiStore } from "../store/useCarUiStore";
import { useAuthStore } from "../store/useAuthStore";

export default function CarDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = useAuthStore((state) => state.user);
  const favoriteCarIdsByUser = useCarUiStore(
    (state) => state.favoriteCarIdsByUser,
  );
  const favoriteCarIds = user ? (favoriteCarIdsByUser[user.id] ?? []) : [];

  const toggleFavorite = useCarUiStore((state) => state.toggleFavorite);

  useEffect(() => {
    if (!id) {
      setError("Nie podano identyfikatora samochodu.");
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    async function loadCar(carId: string) {
      try {
        const data = await getCarById(carId, controller.signal);

        if (!controller.signal.aborted) {
          setCar(data);
          setError("");
        }
      } catch {
        if (!controller.signal.aborted) {
          setError("Nie udało się pobrać samochodu.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void loadCar(id);

    return () => controller.abort();
  }, [id]);

  const isFavorite = car !== null && favoriteCarIds.includes(car.id);

  if (loading) {
    return <p>Ładowanie samochodu...</p>;
  }

  if (error || !car) {
    return (
      <div>
        <p role="alert">{error || "Nie znaleziono samochodu."}</p>
        <Link to="/cars">Powrót do listy</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>
        {car.brand} {car.model}
      </h1>

      <button
        type="button"
        className={
          isFavorite ? "favorite-button active-favorite" : "favorite-button"
        }
        onClick={() => {
          if (user) {
            toggleFavorite(user.id, car.id);
          }
        }}
      >
        {isFavorite ? "Ulubiony" : "Ulubione"}
      </button>

      <p>
        <strong>ID:</strong> {car.id}
      </p>
      <p>
        <strong>Marka:</strong> {car.brand}
      </p>
      <p>
        <strong>Model:</strong> {car.model}
      </p>
      <p>
        <strong>Liczba drzwi:</strong> {car.doorsNumber}
      </p>
      <p>
        <strong>Pojemność bagażnika:</strong> {car.luggageCapacity} l
      </p>
      <p>
        <strong>Pojemność silnika:</strong> {car.engineCapacity} cm³
      </p>
      <p>
        <strong>Rodzaj paliwa:</strong> {car.fuelType}
      </p>
      <p>
        <strong>Data produkcji:</strong> {car.productionDate}
      </p>
      <p>
        <strong>Średnie spalanie:</strong> {car.averageFuelConsumption} l/100 km
      </p>
      <p>
        <strong>Typ nadwozia:</strong> {car.bodyType}
      </p>

      <Link to={`/cars/${car.id}/edit`}>Edytuj</Link>
      {" | "}
      <Link to="/cars">Powrót do listy</Link>
    </div>
  );
}
