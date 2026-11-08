import { useEffect, useState } from "react";
import axios from "axios";

import type { Car } from "../models/Car";
import { getCars, deleteCar } from "../services/carService";
import { useCarUiStore } from "../store/useCarUiStore";
import CarCard from "../components/CarCard";

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Stan interfejsu z Zustand
  const searchTerm = useCarUiStore((state) => state.searchTerm);

  const setSearchTerm = useCarUiStore((state) => state.setSearchTerm);

  const showFavoritesOnly = useCarUiStore((state) => state.showFavoritesOnly);

  const setShowFavoritesOnly = useCarUiStore(
    (state) => state.setShowFavoritesOnly,
  );

  const favoriteCarIds = useCarUiStore((state) => state.favoriteCarIds);
  const removeFavorite = useCarUiStore((state) => state.removeFavorite);

  // Pobieranie samochodów z backendu
  useEffect(() => {
    const controller = new AbortController();

    async function loadCars() {
      try {
        const data = await getCars(controller.signal);

        if (!controller.signal.aborted) {
          setCars(data);
        }
      } catch (caughtError) {
        if (axios.isCancel(caughtError)) {
          return;
        }

        if (!controller.signal.aborted) {
          setError("Nie udało się pobrać samochodów.");
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

  // Usuwanie samochodu
  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Czy na pewno chcesz usunąć ten samochód?",
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);
      setDeleteError("");

      await deleteCar(id);

      removeFavorite(id);

      setCars((prevCars) => prevCars.filter((car) => car.id !== id));
    } catch {
      setDeleteError("Nie udało się usunąć samochodu.");
    } finally {
      setDeletingId(null);
    }
  }

  // Filtrowanie samochodów
  const normalizedSearch = searchTerm.trim().toLowerCase();

  const visibleCars = cars.filter((car) => {
    const matchesSearch =
      car.brand.toLowerCase().includes(normalizedSearch) ||
      car.model.toLowerCase().includes(normalizedSearch);

    const matchesFavorite =
      !showFavoritesOnly || favoriteCarIds.includes(car.id);

    return matchesSearch && matchesFavorite;
  });

  if (loading) {
    return <p>Ładowanie samochodów...</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  return (
    <div>
      <h1>Lista samochodów</h1>

      <div className="cars-toolbar">
        <input
          type="search"
          placeholder="Szukaj po marce lub modelu..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        <label className="favorite-filter">
          <input
            type="checkbox"
            checked={showFavoritesOnly}
            onChange={(event) => setShowFavoritesOnly(event.target.checked)}
          />
          Tylko ulubione
        </label>
      </div>

      {deleteError && <p role="alert">{deleteError}</p>}

      {cars.length === 0 ? (
        <p>Brak samochodów.</p>
      ) : visibleCars.length === 0 ? (
        <p>Nie znaleziono pasujących samochodów.</p>
      ) : (
        <ul>
          {visibleCars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              onDelete={handleDelete}
              deletingId={deletingId}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
