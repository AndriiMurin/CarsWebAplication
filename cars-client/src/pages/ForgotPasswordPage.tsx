import { useState, type SyntheticEvent } from 'react';
import { Link } from 'react-router';
import { forgotPassword } from '../services/authService';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(
    event: SyntheticEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      setError('');

      const result = await forgotPassword(email);

      setMessage(result);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : 'Nie udało się wysłać wiadomości.'
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="auth-page">
      <h1>Przypomnienie hasła</h1>

      <p>
        Podaj adres e-mail przypisany do konta.
      </p>

      {message && <p>{message}</p>}

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
          E-mail
          <input
            type="email"
            value={email}
            onChange={event => setEmail(event.target.value)}
            required
          />
        </label>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Wysyłanie...' : 'Wyślij instrukcję'}
        </button>
      </form>

      <p>
        <Link to="/login">Wróć do logowania</Link>
      </p>
    </section>
  );
}
