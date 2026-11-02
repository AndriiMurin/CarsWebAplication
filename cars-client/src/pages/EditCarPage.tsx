
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import CarForm from '../components/CarForm';
import type { NewCar } from '../models/Car';
import { getCarById, updateCar } from '../services/carService';

export default function EditCarPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [car, setCar] = useState<NewCar | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) {
      setError('Nie podano identyfikatora samochodu.');
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    async function loadCar(carId: string) {
      try {
        const data = await getCarById(carId, controller.signal);

        if (!controller.signal.aborted) {
          setCar({
            brand: data.brand,
            model: data.model,
            doorsNumber: data.doorsNumber,
            luggageCapacity: data.luggageCapacity,
            engineCapacity: data.engineCapacity,
            fuelType: data.fuelType,
            productionDate: data.productionDate,
            averageFuelConsumption: data.averageFuelConsumption,
            bodyType: data.bodyType
          });
          setError('');
        }
      } catch {
        if (!controller.signal.aborted) {
          setError('Nie udało się pobrać samochodu.');
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

  async function handleSave(updatedCar: NewCar) {
    if (!id) return;

    setSaving(true);
    setError('');

    try {
      await updateCar(id, updatedCar);
      navigate(`/cars/${id}`);
    } catch {
      setError('Nie udało się zaktualizować samochodu.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p>Ładowanie danych samochodu...</p>;
  }

  if (!car) {
    return (
      <div>
        <p role="alert">{error || 'Nie znaleziono samochodu.'}</p>
        <Link to="/cars">Powrót do listy</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Edytuj samochód</h1>

      {error && <p role="alert">{error}</p>}

      <CarForm
        key={id}
        initialValues={car}
        onSave={handleSave}
        saving={saving}
        buttonText="Zapisz zmiany"
      />

      <p>
        <Link to={`/cars/${id}`}>Anuluj</Link>
      </p>
    </div>
  );
}
