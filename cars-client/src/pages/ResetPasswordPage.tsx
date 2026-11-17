import { useState, type SyntheticEvent } from 'react';
import { Link, useSearchParams } from 'react-router';
import { resetPassword } from '../services/authService';

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();

  const email = searchParams.get('email');
  const token = searchParams.get('token');

  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(
    event: SyntheticEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!email || !token) {
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      setMessage(null);

      const result = await resetPassword(
        email,
        token,
        newPassword
      );

      setMessage(result);
    } catch (caughtError) {
      if (caughtError instanceof Error) {
        setError(caughtError.message);
      } else {
        setError('Nie udało się zmienić hasła.');
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!email || !token) {
    return (
      <section className="auth-page">
        <h1>Nieprawidłowy link</h1>
        <Link to="/login">Wróć do logowania</Link>
      </section>
    );
  }

  return (
    <section className="auth-page">
      <h1>Ustaw nowe hasło</h1>

      {message && (
        <p>{message}</p>
      )}

      {error && (
        <p className="error-message" role="alert">
          {error}
        </p>
      )}

      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >
        <label>
          Nowe hasło
          <input
            type="password"
            value={newPassword}
            onChange={event =>
              setNewPassword(event.target.value)
            }
            minLength={8}
            required
          />
        </label>

        <button
          type="submit"
          disabled={isSubmitting || message !== null}
        >
          {isSubmitting ? 'Zapisywanie...' : 'Zmień hasło'}
        </button>
      </form>

      {message && (
        <p>
          <Link to="/login">Przejdź do logowania</Link>
        </p>
      )}
    </section>
  );
}
