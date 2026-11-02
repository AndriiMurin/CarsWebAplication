
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import CarForm from '../components/CarForm';
import type { NewCar } from '../models/Car';
import { createCar } from '../services/carService';

const emptyCar: NewCar = {
  brand: '',
  model: '',
  doorsNumber: 5,
  luggageCapacity: 0,
  engineCapacity: 1000,
  fuelType: 1,
  productionDate: '',
  averageFuelConsumption: 6,
  bodyType: 1
};

export default function CreateCarPage() {
  const navigate = useNavigate();

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function handleSave(car: NewCar) {
    setSaving(true);
    setError('');

    try {
      const createdCar = await createCar(car);
      navigate(`/cars/${createdCar.id}`);
    } catch {
      setError('Nie udało się dodać samochodu.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <h1>Dodaj samochód</h1>

      {error && <p role="alert">{error}</p>}

      <CarForm
        initialValues={emptyCar}
        onSave={handleSave}
        saving={saving}
        buttonText="Dodaj samochód"
      />

      <p>
        <Link to="/cars">Powrót do listy</Link>
      </p>
    </div>
  );
}
