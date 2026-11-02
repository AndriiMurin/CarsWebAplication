
import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import type { NewCar } from '../models/Car';

type CarFormProps = {
  initialValues: NewCar;
  onSave: (car: NewCar) => Promise<void>;
  saving: boolean;
  buttonText: string;
};

export default function CarForm({
  initialValues,
  onSave,
  saving,
  buttonText
}: CarFormProps) {
  const [values, setValues] = useState({
    brand: initialValues.brand,
    model: initialValues.model,
    doorsNumber: String(initialValues.doorsNumber),
    luggageCapacity: String(initialValues.luggageCapacity),
    engineCapacity: String(initialValues.engineCapacity),
    fuelType: String(initialValues.fuelType),
    productionDate: initialValues.productionDate.slice(0, 10),
    averageFuelConsumption: String(initialValues.averageFuelConsumption),
    bodyType: String(initialValues.bodyType)
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.currentTarget;

    setValues(previous => ({
      ...previous,
      [name]: value
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const car: NewCar = {
      brand: values.brand,
      model: values.model,
      doorsNumber: Number(values.doorsNumber),
      luggageCapacity: Number(values.luggageCapacity),
      engineCapacity: Number(values.engineCapacity),
      fuelType: Number(values.fuelType),
      productionDate: values.productionDate,
      averageFuelConsumption: Number(values.averageFuelConsumption),
      bodyType: Number(values.bodyType)
    };

    void onSave(car);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Marka:
          <input
            name="brand"
            value={values.brand}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div>
        <label>
          Model:
          <input
            name="model"
            value={values.model}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div>
        <label>
          Liczba drzwi:
          <input
            type="number"
            name="doorsNumber"
            value={values.doorsNumber}
            onChange={handleChange}
            min="2"
            max="5"
            required
          />
        </label>
      </div>

      <div>
        <label>
          Pojemność bagażnika (l):
          <input
            type="number"
            name="luggageCapacity"
            value={values.luggageCapacity}
            onChange={handleChange}
            min="0"
            required
          />
        </label>
      </div>

      <div>
        <label>
          Pojemność silnika (cm³):
          <input
            type="number"
            name="engineCapacity"
            value={values.engineCapacity}
            onChange={handleChange}
            min="1"
            required
          />
        </label>
      </div>

      <div>
        <label>
          Rodzaj paliwa (numer):
          <input
            type="number"
            name="fuelType"
            value={values.fuelType}
            onChange={handleChange}
            min="0"
            required
          />
        </label>
      </div>

      <div>
        <label>
          Data produkcji:
          <input
            type="date"
            name="productionDate"
            value={values.productionDate}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div>
        <label>
          Średnie spalanie (l/100 km):
          <input
            type="number"
            step="any"
            min="0.1"
            name="averageFuelConsumption"
            value={values.averageFuelConsumption}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div>
        <label>
          Typ nadwozia (numer):
          <input
            type="number"
            name="bodyType"
            value={values.bodyType}
            onChange={handleChange}
            min="0"
            required
          />
        </label>
      </div>

      <button type="submit" disabled={saving}>
        {saving ? 'Zapisywanie...' : buttonText}
      </button>
    </form>
  );
}
