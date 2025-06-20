import { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import '../styles/auth.css';
import { useTranslation } from 'react-i18next';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/courses');
    } catch {
      setError(t('error.loginFailed'));
    }
  };

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/courses');
    } catch {
      setError(t('error.registrationFailed'));
    }
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <div className="language-toggle">
        <button onClick={() => changeLanguage('pl')}>PL</button>
        <button onClick={() => changeLanguage('en')}>EN</button>
      </div>

      <div className="auth-container">
        <div className="auth-box">
          <h2>{t('login.title')}</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder={t('login.emailPlaceholder')}
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder={t('login.passwordPlaceholder')}
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">{t('login.loginButton')}</button>
          </form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <p>
            {t('login.noAccount')}{' '}
            <div onClick={handleRegister} className="link-button">
              {t('login.registerLink')}
            </div>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
