import { useState, type SyntheticEvent } from 'react';
import { Link } from 'react-router';
import { register } from '../services/authService';

export default function RegisterPage() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

      const result = await register({
        userName,
        email,
        password
      });

      setMessage(result);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : 'Nie udało się zarejestrować.'
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="auth-page">
      <h1>Rejestracja</h1>

      {message && (
        <p>{message}</p>
      )}

      {error && (
        <p className="error-message" role="alert">
          {error}
        </p>
      )}

      {!message && (
        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >
          <label>
            Nazwa użytkownika
            <input
              type="text"
              value={userName}
              onChange={event => setUserName(event.target.value)}
              required
            />
          </label>

          <label>
            E-mail
            <input
              type="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
              required
            />
          </label>

          <label>
            Hasło
            <input
              type="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
              minLength={8}
              required
            />
          </label>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Rejestrowanie...' : 'Zarejestruj się'}
          </button>
        </form>
      )}

      <p>
        Masz już konto?{' '}
        <Link to="/login">Zaloguj się</Link>
      </p>
    </section>
  );
}
