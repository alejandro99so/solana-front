import React, { useState, FormEvent } from 'react';
import styles from './login.module.css';
import { useRouter } from 'next/navigation';
export default function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null); // Clear previous errors when a new request starts

    try {
      const formData = new FormData(event.currentTarget);
      const loginInfo = {
        email: String(formData.get('email')),
        password: String(formData.get('password')),
      };
      console.log({ loginInfo });
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        body: JSON.stringify(loginInfo),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log({ response });
      if (!response.ok) {
        throw new Error('Failed to submit the data. Please try again.');
      }

      // Handle response if necessary
      const data = await response.json();
      console.log({ data });
      if (data.message != 'ACCESS_APPROVED') {
        alert('Acceso Denegado');
      } else {
        router.push('/donar');
      }
    } catch (error) {
      // Capture the error message to display to the user
      setError(error.message);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={onSubmit} className={styles.login_form}>
        <div className={styles.login_form_content}>
          <label>Digita tu correo electronico:</label>
          <input type="text" name="email" />
        </div>
        <div className={styles.login_form_content}>
          <label>Digita tu contraseña:</label>
          <input type="text" name="password" />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
